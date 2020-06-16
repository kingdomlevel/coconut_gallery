class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.boolean :flagged_innapropriate
      t.string :picture
      t.boolean :moderated
      t.timestamps
    end
  end
end
