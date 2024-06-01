#We import our packages. If you have never used any of those, intall them.

library(tidyverse)
library(openai)
library(httr)
library(googlesheets4)
library(glue)
library(jsonlite)


#We set the API key for OpenAI. You can get your own key by signing up at https://beta.openai.com/signup/.
#You can also use the key provided here, but it is recommended to get your own key.
#It's NOT a good idea to share your key with others, as it can be used to make requests on your behalf and you may be charged for them.
#I'm just doing it because I trust you all <3
#Nah, I'm kidding, I'm going to delete it after my session
Sys.setenv(
  OPENAI_API_KEY = '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'
)

#Import your dataset
#In this case I'm importing part of the program of this year dataharvest because I didn't want to waste time creating a dataset
#You can actually do this with any kind of dataset, but it needs to be in text format

data <- read_sheet("https://docs.google.com/spreadsheets/d/1cLYdghJ-uNxPOXfDiwU2Bb3inzBfQrHNbENM4CZCAI8/edit?usp=sharing")


#We need to conver the dataset to a logic that will be usesul
#In this case we are going to build a piece of text that combines: date + time + title + description + speakers

df <- data %>% 
  mutate(text = glue("{date}{time}' - {session_title}' - {speakers}. - {description}")) %>% 
  select(text)

#clean the text to not have the line breaks
df$text <- gsub("\n", " ", df$text)

#add an unique id to each row
df$id <- 1:nrow(df)



#clean empty rows
df <- df %>% 
  filter(text != "")

#remove the id column and create a new one
df <- df %>% 
  select(-id) %>% 
  mutate(id = 1:nrow(df))

#lets convert the text as an embbeding

for (i in 1:length(df$text)) {
  x <- openai::create_embedding(input = df$text[i], model = "text-embedding-ada-002")
  df$embedding[i] <- x$data$embedding
}

# then we convert it into a json to give it to the database
json_data <- df %>% 
  toJSON()


#Set up a database at Supabase
#Enable vectors extension
#Disable RSL

supabase_url <- "https://reenhemgusdocspnhvpa.supabase.co"
supabase_key <- "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZW5oZW1ndXNkb2NzcG5odnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxODI1MjgsImV4cCI6MjAzMjc1ODUyOH0.19lqsEDV8aVP60SuY7thztODIxEcpR9UkUJH_PK3NRA"
table_name <- "schedule"

# Make the POST request
response <- POST(
  url = paste0(supabase_url, "/rest/v1/", table_name),
  body = json_data,
  add_headers(`Content-Type` = "application/json", 
              `apikey` = supabase_key,
              `Authorization` = paste0("Bearer ", supabase_key))
)

# Check the response
print(content(response, "text"))




