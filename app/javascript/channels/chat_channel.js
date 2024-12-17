import consumer from "./consumer"

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector('.chat_container');

  if (chatContainer) {
    const chatId = chatContainer.dataset.chatId;
    console.log('Chat ID:', chatId); // デバッグ用のログ

    const subscription = consumer.subscriptions.create({ channel: "ChatChannel", chat_id: chatId }, {
      connected() {
        console.log('Connected to chat channel ' + chatId);
      },

      disconnected() {
        console.log('Disconnected from chat channel ' + chatId);
      },

      received(data) {
        console.log('Received data:', data); // 受信したデータのログ
        const messages = document.querySelector('.chat_messages');
        if (messages) {
          messages.insertAdjacentHTML('beforeend', data.message); // メッセージを画面に追加
        } else {
          console.error('The element with class "chat_messages" was not found.');
        }
      },

      speak(message) {
        console.log('Speaking:', message);
        return this.perform('speak', { message: message, chat_id: chatId });
      }
    });

    const form = document.querySelector('.chat_form_element');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageInput = form.querySelector('.chat_input');
      const message = messageInput.value;
      messageInput.value = '';
      subscription.speak(message);
    });
  } else {
    console.error('The element with class "chat_container" was not found.');
  }
});
