class ChangePhoneNumberColumnName < ActiveRecord::Migration
  def change
    rename_column :packages, :phone, :phone_number
    rename_column :packages, :tracking_id, :tracking_number
  end
end
