class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :user, foregin_key: true
      t.references :group, foregin_key: true
      t.timestamps
    end
  end
end
