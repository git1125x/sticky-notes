class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.string :body
      t.string :colors
      t.string :position

      t.timestamps
    end
  end
end
