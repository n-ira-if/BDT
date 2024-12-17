# app/channels/chat_channel.rb
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

    # 修正箇所: broadcast メソッドに引数を正しく渡す
    ActionCable.server.broadcast("chat_#{data['chat_id']}_channel", { message: render_message(@message) })
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
