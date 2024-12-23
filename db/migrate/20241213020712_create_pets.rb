class CreatePets < ActiveRecord::Migration[7.0]
  def change
    create_table :pets do |t|
      t.string :name, null: false
      t.integer :age, null: false
      t.string :pet_type, null: false
      t.text :comment, null: false
      t.references :user
      t.timestamps
    end
  end
end
