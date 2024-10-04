const token = import.meta.env.VITE_TOKEN_ID;
const chatId = import.meta.env.VITE_CHAT_ID;

export function sendMessage(textMessage) {
    const botUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textMessage)}`;
    fetch(botUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return ({message: "sent"})
    })
    .catch(error => {
        return ({message: 'There was a problem with the fetch operation:'});
    });
}