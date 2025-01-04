import consumer from '/assets/channels/consumer-ddd750356b482683d4d14e20b337d6016515b5bad20270b3dee5ba39b0e8986c.js';

function handleError(message) {
  alert(message);
  console.error(message);
}

let subscription;

function initializeChat() {
  const chatContainer = document.querySelector('.chat_container');
  
  if (!chatContainer) {
    console.log("Chat container not found.");
    return; // チャットページでない場合はスクリプトを終了する
  }

  console.log("Initializing chat...");

  const currentUser = document.querySelector('meta[name="current-user"]');
  
  if (!currentUser) {
    handleError('エラーが発生しましたページをリロードしてください');
    console.log("Current user meta tag not found.");
    return;
  }

  const audio = new Audio('/sounds/kako.mp3');
  const chatId = chatContainer.dataset.chatId;

  if (!chatId) {
    handleError('チャットIDが見つかりません。ページをリロードしてください');
    console.log("Chat ID not found.");
    return;
  }

  console.log('Chat ID:', chatId);

  subscription = consumer.subscriptions.create({ channel: "ChatChannel", chat_id: chatId }, {
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
        
        // 自分が送った場合にのみ音を鳴らす
        if (data.message.user_id == currentUser.content) {
          audio.play().catch((error) => console.error('Failed to play audio:', error));
        }
      } catch (error) {
        handleError('エラーが発生しましたページをリロードしてください');
      }
    },

    speak(message) {
      console.log('Speaking:', message);
      return this.perform('speak', { message: message, chat_id: chatId });
    }
  });

  const form = document.querySelector('.chat_form_element');
  form.removeEventListener('submit', handleFormSubmit); // 既存のイベントリスナーを削除
  form.addEventListener('submit', handleFormSubmit); // 新しいイベントリスナーを追加
}

function handleFormSubmit(event) {
  event.preventDefault();
  const messageInput = event.target.querySelector('.chat_input');
  const message = messageInput.value;

  if (!message.trim()) {
    handleError('メッセージが空です。再入力してください');
    return;
  }

  messageInput.value = '';
  if (subscription) {
    subscription.speak(message);
  }
}

function cleanupChat() {
  console.log("Cleaning up chat...");
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
  const form = document.querySelector('.chat_form_element');
  if (form) {
    form.removeEventListener('submit', handleFormSubmit); // イベントリスナーを削除
  }
}

document.addEventListener('turbo:load', initializeChat);
document.addEventListener('turbo:before-cache', cleanupChat);