# == Schema Information
#
# Table name: packages
#
#  id            :integer          not null, primary key
#  phone         :string           not null
#  pin           :string           not null
#  verified      :boolean          default(FALSE), not null
#  tracking_id   :string           not null
#  alert_updates :boolean          default(TRUE), not null
#  alert_final   :boolean          default(TRUE), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class PackageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
