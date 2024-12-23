class ChatsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :show]
  def index
    @chat = Chat.all
  end

  def new
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      UserChat.create(user_id: current_user.id, chat_id: @chat.id)
      redirect_to chats_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @chat = Chat.find(params[:id])
    @messages = @chat.messages
    chat_creator_ids = UserChat.where(chat_id: @chat.id).pluck(:user_id)
    chat_creators = User.where(id: chat_creator_ids)
    message_users = User.joins(:messages).where(messages: { chat_id: @chat.id }).distinct
    @join_user = (message_users + chat_creators).uniq
  end


  private

  def chat_params
    params.require(:chat).permit(:chat_name).merge(user_id: current_user.id)
  end
end
