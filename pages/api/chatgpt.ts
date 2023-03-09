import type { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

const callGPT = async (chat: string, chara: string) => {
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: chara
        },{ role: "user", content: chat }],
  });
  
    const resmessage = completion.data.choices[0].message.content;
    return resmessage
}




const chatgpt = async(
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const reqmessage = req.query.chat as string;
    const reqchara = req.query.chara as string;
    
    if(reqmessage.length <= 0) {
        res.status(500).json({ error:'メッセージがありません…' });
        return;
    }
    res.status(200).json({ chat: await callGPT(reqmessage, reqchara) });
}

export default chatgpt