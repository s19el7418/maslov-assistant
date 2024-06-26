import { GoogleGenerativeAI } from '@google/generative-ai';
import { Telegraf } from 'telegraf';

console.log('Maslov Assistant server is active!');

const GEMINI_API_KEY = 'YOUR KEY';
const TELEGRAM_API_KEY = 'YOUR KEY';

const bot = new Telegraf(TELEGRAM_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

bot.on('text', async (ctx) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = ctx.message.text;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        ctx.reply(text);
    } catch (error) {
        console.log(error);
        ctx.reply(error);
    }
})

bot.launch();
