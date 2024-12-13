class ChatsController < ApplicationController

  def index
    @chat = Chat.all
  end

  def new
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      redirect_to chats_path
    else
      render :new, status: :unprocessable_entity
    end
  end


  private

  def chat_params
    params.require(:chat).permit(:chat_name)
  end
end
