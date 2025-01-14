class Chat < ApplicationRecord
  has_many :user_chats, dependent: :destroy
  has_many :users, through: :user_chats
  has_many :messages, dependent: :destroy
  
  validates :chat_name, presence: true, format: { with: /\A[a-zA-Z0-9一-龥ぁ-んァ-ヶー]+\z/}

end
