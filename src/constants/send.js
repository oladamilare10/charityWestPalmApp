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

export async function sendMessageWithImage(textMessage, imageData) {
    try {
        // Convert base64 to blob
        const base64Data = imageData.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
        
        // Create form data
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', blob, 'gift_card_image.jpg');
        formData.append('caption', textMessage);

        // Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to send image to Telegram');
        }

        const data = await response.json();
        return { message: "sent", data };
    } catch (error) {
        console.error('Error sending image to Telegram:', error);
        // If image sending fails, try to send just the message
        await sendMessage(`${textMessage}\n\nNote: Image upload failed. Error: ${error.message}`);
        return { message: 'Image send failed, sent text only', error };
    }
}

