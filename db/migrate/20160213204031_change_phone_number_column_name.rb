class ChangePhoneNumberColumnName < ActiveRecord::Migration
  def change
    rename_column :packages, :phone, :phone_number
  end
end
