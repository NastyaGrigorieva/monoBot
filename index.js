const Telegraf = require('telegraf');
const telegram_bot_token = "5059680037:AAHzZMppA6ddIbuz6S2ae0CShJlsmir6tiM"
// proces.env.telegram_bot_token
// const bot = new Telegraf(telegram_bot_token)

bot.start((ctx) => {
    return ctx.reply('Hello my');
});
bot.startPolling();