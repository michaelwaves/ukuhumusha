import OpenAI from "openai"

const openai = new OpenAI()
openai.apiKey = process.env.OPENAI_API_KEY || ""

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json()

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    })

    // Return the response from the API
    return Response.json(response.choices[0].message.content)
}