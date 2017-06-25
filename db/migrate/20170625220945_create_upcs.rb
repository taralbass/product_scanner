class CreateUpcs < ActiveRecord::Migration[5.1]
  def change
    create_table :upcs do |t|
      t.references :product, null: false
      t.string :code, null: false
      t.timestamps
    end

    add_index :upcs, :code, unique: true
  end
end
