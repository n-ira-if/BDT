class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params['chat_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    @chat = Chat.find(data['chat_id'])
    @message = @chat.messages.create!(message: data['message'], user: current_user)

    # 修正箇所: データフォーマットを変更
    ActionCable.server.broadcast("chat_#{data['chat_id']}_channel", {
      message: {
        user_id: @message.user.id,
        user_nickname: @message.user.nickname,
        content: @message.message
      }
    })
  end
end

