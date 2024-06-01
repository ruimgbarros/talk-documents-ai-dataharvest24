# So, do you wanna talk with your documents using AI?

## Instructions

On this repo you will have three folders:
 - `slides` - that contains the slides of the presentation;
 - `data` - that contains the data and the R script to put it on a database
 - `chat` - that contains a simple chat interface built with svelte to allow you to speak with your documents.

## Links
[Demo site](https://talk-documents-ai-dataharvest24.vercel.app/)
[Slides](https://docs.google.com/presentation/d/1)


## 🚧 Things you should be aware of

- To make everyone's life easier, I did something that you SHOULD never do in a real project: I put the database credentials on the code. This is a huge security flaw, but I did it to make it easier for you to run the code. Please, never do this in a real project.
- Keep in mind that everytime you run something with MY KEY you are using my money. If you can afford it, please change it into a key of yours. If not, use it, but be aware that I can run out of money and I might not have money to get back to Portugal 🇵🇹

## Supabase snippet
```
drop function if exists public.match_maker (
  query_embedding VECTOR (1536),
  similarity_threshold float,
  match_count int
);

create
or replace function public.match_maker (
  query_embedding VECTOR (1536),
  similarity_threshold float,
  match_count int
) returns table (id bigint, text text, similarity float) language sql as $$ SELECT id, text, 1 - (schedule.embedding <-> query_embedding) AS similarity FROM schedule WHERE 1 - (schedule.embedding <-> query_embedding) > similarity_threshold ORDER BY schedule.embedding <-> query_embedding LIMIT match_count; $$;
```

## 🚀 Running the chat

To run the chat, you will need to have node installed on your machine. If you don't have it, you can download it [here](https://nodejs.org/en/).

After you have node installed, you can run the following commands on your terminal:

```bash
cd chat
npm install
npm run dev
```

After that, you will be able to access the chat on your browser.

## Putting data on the database

To put the data on the database, you will need to have R installed on your machine. If you don't have it, you can download it [here](https://www.r-project.org/).

After you have R installed, you can run the following commands on your terminal:

```bash
cd data
Rscript data.R
```

Or, you can open the `data.R` file on RStudio and run the script.

After that, you will have the data on the database and you will be able to chat with your documents.

## What if I don't want to use R?

You can actually use any language to do an API call to OpenAI and put the data on the database.

## What if I don't want to use Supabase?

You can use any database you want. You just need to change the connection string on the `data.R` file and learn how to do a similarity search on your database. If you are using PostgreSQL, you can use the `pg_similarity` extension to do so.

## What if I don't want to use OpenAI?

You can use any other API that does the same thing. You just need to change the API call on the `data.R` file. There are several other APIs that do the same thing.

## What if I don't want to use Svelte?

You can use any other frontend framework you want. You just need to change the code on the `chat` folder.

## What if my documents are not in English?

OpenAI API is kinda language agnostic, so you can use any language you want.

## What if I have a lot of documents?

It will cost you more money. Be aware of that.

## Can I trust the results?
Always double-check the results. AI is not perfect and it can make mistakes. Also, you better spend some time refining your initial prompt to get better results. It's always a good idea to have the model identify, for example, the page of the document that the answer is in, so that you can double-check it.

## Can I use this in production so that my readers can talk with the documents from an investigation?

I would not recommend it. This is a simple example and it has a lot of things you should not do in a real project. But thats something you could fix easily. There are two main things you should be aware of:
1. The model can ruin your reputation. We all have seen when GPT goes crazy and starts saying things that are not true. You should always double-check the results. You cannot do that if the model is talking with your readers.
2. People might start use the model to do things that are not on the documents. Everytime I see an LLM on a website I always ask it to write me a script in Python to solve my homework. It usually does it. You should be aware of that.
3. The price of the APIcan get out of control. If you have a lot of readers, you might not be able to afford it.
