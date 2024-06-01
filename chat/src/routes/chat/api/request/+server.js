import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY, SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

import { env } from '$env/dynamic/private';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY || OPENAI_API_KEY,
});

const supabase = createClient(env.SUPABASE_URL || SUPABASE_URL, env.SUPABASE_KEY || SUPABASE_KEY);

// Clean text input function to remove extra spaces and lower case everything
function cleanText(text) {
    return text.replace(/\s\s+/g, ' ').trim().toLowerCase();
}

export const POST = async ({ request }) => {
    try {
        const { messages } = await request.json();
        let text = messages[messages.length - 1].content;
        text = cleanText(text);

        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text,
        });

        const embedding = response.data[0].embedding;

        const { data, error } = await supabase
            .rpc('match_maker', {
                query_embedding: embedding,
                similarity_threshold: 0.35,
                match_count: 20,
            });

        if (error) {
            throw new Error(error.message);
        }

        // Parse all data.data into a single string
        let parsedData = '';
        data.forEach((element) => {
            parsedData += element.text + '\n';
        });

        // Return the parsed data
        return new Response(JSON.stringify({ parsedData }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};
