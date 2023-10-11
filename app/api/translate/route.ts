import { type NextRequest } from 'next/server'
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

export async function POST(req: NextRequest) {
    const { text, target } = await req.json()
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation: any, i: any) => {
        console.log(`${text} => (${target}) ${translation}`);
    });

    return Response.json(translations)
}

//https://cloud.google.com/nodejs/docs/reference/translate/latest/translate/v2.translate