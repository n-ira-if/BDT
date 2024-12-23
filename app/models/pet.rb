class Pet < ApplicationRecord
  belongs_to :user


  validates :name, presence: true
  validates :age, presence: true
  validates :pet_type, presence: true
  validates :comment, presence: true
end
