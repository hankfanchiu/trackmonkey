class DefaultAlertUpdatesToFalse < ActiveRecord::Migration
  def up
    change_column_default(:packages, :alert_updates, false)
  end

  def down
    change_column_default(:packages, :alert_updates, true)
  end
end
