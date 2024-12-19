import consumer from "./consumer";

function handleError(message) {
  alert(message);
  console.error(message);
}

function initializeChat() {
  const chatContainer = document.querySelector('.chat_container');
  
  if (chatContainer) {
    const currentUser = document.querySelector('meta[name="current-user"]');
    
    if (!currentUser) {
      handleError('エラーが発生しましたページをリロードしてください');
      return;
    }

    const audio = new Audio('/sounds/kako.mp3'); // サウンドファイルのパスを指定

    const chatId = chatContainer.dataset.chatId;
    if (!chatId) {
      handleError('チャットIDが見つかりません。ページをリロードしてください');
      return;
    }

    console.log('Chat ID:', chatId);

    const subscription = consumer.subscriptions.create({ channel: "ChatChannel", chat_id: chatId }, {
      connected() {
        console.log('Connected to chat channel ' + chatId);
      },

      disconnected() {
        console.log('Disconnected from chat channel ' + chatId);
      },

      received(data) {
        try {
          console.log('Received data:', data);

          const messages = document.querySelector('.chat_messages');
          if (!messages) {
            throw new Error('The element with class "chat_messages" was not found.');
          }

          const newMessage = document.createElement('div');
          newMessage.classList.add('chat_message');
          if (data.message.user_id == currentUser.content) {
            newMessage.classList.add('my_message');
          }
          newMessage.innerHTML = `<strong>${data.message.user_nickname}:</strong> ${data.message.content}`;
          messages.appendChild(newMessage);
          messages.scrollTop = messages.scrollHeight;
          
          audio.play(); // メッセージ受信時にサウンドを再生
        } catch (error) {
          handleError('エラーが発生しましたページをリロードしてください');
        }
      },

      speak(message) {
        console.log('Speaking:', message);
        return this.perform('speak', { message: message, chat_id: chatId });
      }
    });

    // フォームのイベントリスナーを削除してから追加する
    const form = document.querySelector('.chat_form_element');
    form.removeEventListener('submit', handleFormSubmit); // 既存のイベントリスナーを削除
    form.addEventListener('submit', handleFormSubmit); // 新しいイベントリスナーを追加

    function handleFormSubmit(event) {
      event.preventDefault();
      const messageInput = form.querySelector('.chat_input');
      const message = messageInput.value;

      if (!message.trim()) {
        handleError('メッセージが空です。再入力してください');
        return;
      }

      messageInput.value = '';
      subscription.speak(message);
    }
  }
}

// Turboのイベントリスナーを追加
document.addEventListener('turbo:load', initializeChat);
