import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { SUPABASE_URL } from '$env/static/private';
import { SUPABASE_KEY } from '$env/static/private';

import { env } from '$env/dynamic/private';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY || OPENAI_API_KEY,
});

const supabase = createClient(env.SUPABASE_URL || SUPABASE_URL, env.SUPABASE_KEY || SUPABASE_KEY);

async function checkContentExists(contentToCheck) {
    let { data, error } = await supabase
        .rpc('check_if_content_exists', { input_content: contentToCheck });

    if (error) {
        console.error('Error:', error);
        return false;
    } else {
        return data;
    }
}

// Clean text input function to remove extra spaces and lower case everything
function cleanText(text) {
    return text.replace(/\s\s+/g, ' ').trim();
}

export const POST = async ({ request }) => {
    try {
        const { messages } = await request.json();
        let text = messages[messages.length - 1].content;
        text = cleanText(text);

        let embedding = [];

        // Check if the content already exists
        const contentExists = await checkContentExists(text);
        if (contentExists) {
            embedding = contentExists;
        } else {
            const response = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: text,
            });

            embedding = response.data[0].embedding;
        }

        // Return the embedding to the front end
        return new Response(JSON.stringify({ embedding }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
