const {Telegraf} = require('telegraf');
const axios = require("axios");
const {code} = require('currency-codes');


const TELEGRAM_BOT_TOKEN = process.env.telegram_bot_token || "5059680037:AAHzZMppA6ddIbuz6S2ae0CShJlsmir6tiM"
const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

bot.start((ctx) => {
    return ctx.reply("Hello my");
});
bot.hears(/^[A-Z]+$/i, async ctx => {
    const clientCurCode = ctx.message.text;
    const currensy = code(clientCurCode);
    //check for existing currensy
    if (!currensy) {
        return ctx.reply('Currency didnt found');
    }

    try {
        const currencyObj = await axios.get('https://api.monobank.ua/bank/currency');

        const foundCurrensy = currencyObj.data.find((cur) => {
            return cur.currencyCodeA.toString() === currensy.number
        });



        if (!foundCurrensy || !foundCurrensy.rateBuy || !foundCurrensy.rateSell) {
            return ctx.reply('Currency didnt found in Monobank');
        }

        return ctx.replyWithMarkdown(`
            CURRENCY: *${currensy.code}*
RATE BUY: *${foundCurrensy.rateBuy}*
RATE SELL: *${foundCurrensy.rateSell}*
        `);
    } catch (error) {
        return ctx.reply(error)
    }
    //     .then(res => {
    //         console.log(res.data)
    //         return ctx.reply(res.data[0]);
    //     }).

});
bot.startPolling();