class CreateAdventures < ActiveRecord::Migration
  def change
    create_table :adventures do |t|
      t.string :location
      t.string :activity
      t.string :business
      t.text :comments

      t.timestamps null: false
    end
  end
end
