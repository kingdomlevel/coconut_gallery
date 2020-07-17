class CreateDrawings < ActiveRecord::Migration[6.0]
  def change
    create_table :drawings do |t|
      t.string :picture
      t.belongs_to :photo
      t.boolean :flagged_innapropriate
      t.boolean :moderated

      t.timestamps
    end
  end
end
