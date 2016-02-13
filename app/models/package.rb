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

class Package < ActiveRecord::Base
  validates :phone,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 10 }

  validates :pin,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 4 }

  validates_presence_of :tracking_id
  validates_uniqueness_of :phone, { scope: :tracking_id }
end
