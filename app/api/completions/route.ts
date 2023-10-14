import OpenAI from "openai"

const openai = new OpenAI()
openai.apiKey = process.env.OPENAI_API_KEY || ""

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { prompt } = await req.json()

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 10,
        temperature: 0
    })

    // Return the response from the API
    return Response.json(response.choices[0].text)
}