/**
 * Utility to send notifications to a Telegram Bot.
 * 
 * SETUP:
 * 1. Create a bot via @BotFather on Telegram.
 * 2. Get the BOT_TOKEN.
 * 3. Start a chat with your bot (or add it to a group) and get the CHAT_ID.
 * 4. Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID to your .env file.
 * 
 * WARNING: Exposing Bot Token in frontend .env allows anyone to inspect it. 
 * For high security, this should be done via a backend proxy or Edge Function.
 * For this project scope, client-side is acceptable if spam risk is managed.
 */

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendTelegramNotification = async (message: string) => {
    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('Telegram credentials not found. Skipping notification.');
        return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API Error:', errorData);
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
};
