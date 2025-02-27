class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.string :chat_name, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
