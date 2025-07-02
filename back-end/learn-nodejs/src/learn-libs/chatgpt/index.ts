import { OpenAI } from 'openai';

process.env.OPENAI_API_KEY = '';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function askChatGPT(message: string, model = 'gpt-4o'): Promise<string> {
    let toReturn = '';
    const response = await openai.chat.completions
        .create({
            model: model, // hoặc "gpt-3.5-turbo"
            messages: [
                {
                    role: 'system',
                    content: 'Bạn là trợ lý AI thông minh.',
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
            user: 'haind-user1',
            max_completion_tokens: 3,
        })
        .catch((e) => {
            console.warn('e1', e);
            return null as any;
        });
    toReturn = response?.choices?.[0]?.message?.content || 'Không có phản hồi';

    // const response2 = await openai.responses
    //     .create({
    //         model: 'gpt-4.1',
    //         input: message,
    //         max_output_tokens: 3,
    //         user: 'haind-user1',
    //     })
    //     .catch((e) => {
    //         console.warn('e1', e);
    //         return null as any;
    //     });

    // toReturn = response2?.output_text;

    console.log('🚀 ~ askChatGPT ~ response:', toReturn);
    return toReturn;
}
askChatGPT('cách lấy API key của chatgpt', 'gpt-3.5-turbo');
