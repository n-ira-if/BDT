class MessagesController < ApplicationController
  def create
    @chat = Chat.find(params[:chat_id])
    @message = @chat.messages.new(message_params)
    @message.user = current_user
    if @message.save
      UserChat.find_or_create_by(user_id: current_user.id, chat_id: @chat.id)
      redirect_to chat_path(@chat)
    else
      redirect_to chat_path(@chat), alert: 'メッセージの送信に失敗しました。'
    end
  end

  private

  def message_params
    params.require(:message).permit(:message)
  end
end
