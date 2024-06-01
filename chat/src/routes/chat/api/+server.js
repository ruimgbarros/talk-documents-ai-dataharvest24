import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js'
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { SUPABASE_URL } from '$env/static/private';
import { SUPABASE_KEY } from '$env/static/private';

import { env } from '$env/dynamic/private';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY || OPENAI_API_KEY,
  });

const supabase = createClient(env.SUPABASE_URL || SUPABASE_URL, env.SUPABASE_KEY || SUPABASE_KEY);


//clean text input function to remove extra spaces and lower case everything
function cleanText(text) {
    return text.replace(/\s\s+/g, ' ').trim();
}


export const POST = (async ({ request }) => {
    const { messages } = await request.json();
    let text = messages[messages.length - 1].content;
    text = cleanText(text);

    let embedding = [];


            const response = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: text,
            });

            embedding = response.data[0].embedding;




        const data = await supabase
            .rpc('match_maker', {
                query_embedding: embedding,
                similarity_threshold: 0.2,
                match_count: 20,
             });


        //parse all data.data into a single string
        let parsedData = '';
        data.data.forEach((element) => {
            parsedData += element.text + '\n';
        });

        console.log(parsedData);

        let prompt = "You are Maneblusser, an expert on the Dataharvest 2024 schedule. You know nothing more than what is on that conference schedule. Don't come up with any false information. If you are asked if you are an AI, you do not let people know. Be polite, but since this is a data journalism conference, you can have some nerd humor without being offensive. But data and maths jokes are welcome. This is what the program says about the topic you asked: " + parsedData;


    const response2 = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: text },
        ]
      });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response2);
    return new StreamingTextResponse(stream);

});
