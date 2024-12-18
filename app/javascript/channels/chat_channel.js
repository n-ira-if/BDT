import consumer from "./consumer";

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector('.chat_container');
  const currentUser = document.querySelector('meta[name="current-user"]').content;
  const audio = new Audio('/sounds/kako.mp3'); // 公開フォルダ内のパスを指定

  if (chatContainer) {
    const chatId = chatContainer.dataset.chatId;
    console.log('Chat ID:', chatId);

    const subscription = consumer.subscriptions.create({ channel: "ChatChannel", chat_id: chatId }, {
      connected() {
        console.log('Connected to chat channel ' + chatId);
      },

      disconnected() {
        console.log('Disconnected from chat channel ' + chatId);
      },

      received(data) {
        console.log('Received data:', data);

        const messages = document.querySelector('.chat_messages');
        if (messages) {
          const newMessage = document.createElement('div');
          newMessage.classList.add('chat_message');
          if (data.message.user_id == currentUser) {
            newMessage.classList.add('my_message');
          }
          newMessage.innerHTML = `<strong>${data.message.user_nickname}:</strong> ${data.message.content}`;
          messages.appendChild(newMessage);
          messages.scrollTop = messages.scrollHeight;
          audio.play(); // メッセージ受信時にサウンドを再生
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

