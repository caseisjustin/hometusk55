import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot("7075195371:AAFmSvWeK9E3jzRdnhLHk9h7Cy8HDyCBcoc", { polling: true });

export const sendTelegramOtp = async (phone, otp) => {
    // Code to send OTP via Telegram
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Please share your phone number.', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Share Contact',
                        request_contact: true
                    }
                ]
            ],
            one_time_keyboard: true
        }
    });
});

bot.on('contact', async (msg) => {
    const phone = msg.contact.phone_number;
    // Code to verify phone number via API and respond to user
});
