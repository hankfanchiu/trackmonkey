# == Schema Information
#
# Table name: packages
#
#  id            :integer          not null, primary key
#  phone_number  :string           not null
#  pin           :string           not null
#  verified      :boolean          default(FALSE), not null
#  tracking_id   :string           not null
#  alert_updates :boolean          default(TRUE), not null
#  alert_final   :boolean          default(TRUE), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'twilio_client'

class Package < ActiveRecord::Base
  validates :phone_number,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 10 }

  validates :pin,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 4 }

  validates_presence_of :tracking_number
  validates_uniqueness_of :phone_number, { scope: :tracking_number }

  def self.send_updates(tracking_number, tracking_status, carrier)
    packages = self.where(verified: true, tracking_number: tracking_number)
    url = "http://localhost:3000/packages?tracking_number=#{tracking_number}&carrier=#{carrier}"

    packages.each do |package|
      TwilioClient.instance.send_sms(
        package.phone_number,
        "The status of your package (tracking number #{tracking_number}) has been updated to #{tracking_status}. See more details here: #{url}"
      )
    end
  end

  def generate_pin
    self.pin = rand(0000..9999).to_s.rjust(4, "0")
    save
  end

  def send_pin
    TwilioClient.instance.send_sms(phone_number, "Your PIN is #{pin}")
  end

  def verify(entered_pin)
    update(verified: true) if self.pin == entered_pin
  end
end
