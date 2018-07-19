class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :name
      t.integer :age
      t.integer :money
      t.string :password_digest

      t.timestamps
    end
  end
end
