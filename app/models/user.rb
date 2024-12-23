class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         has_many :pets, dependent: :destroy
         has_many :user_chats, dependent: :destroy
         has_many :chats, through: :user_chats
         has_many :messages, dependent: :destroy

   validates :nickname, presence: true, length: { maximum: 8 }, format: { with: /\A[a-zA-Z0-9一-龥ぁ-んァ-ヶー]+\z/ }


   extend ActiveHash::Associations::ActiveRecordExtensions
   belongs_to_active_hash :region
       
       
   validates :region_id, presence: true, numericality: { only_integer: true, other_than: 1 }
       
end
