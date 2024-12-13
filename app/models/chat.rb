class Chat < ApplicationRecord
  has_many :users
  has_many :user_chats
  
  validates :chat_name, presence: true, format: { with: /\A[a-zA-Z0-9一-龥ぁ-んァ-ヶー]+\z/}

end
