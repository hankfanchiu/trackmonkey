# == Schema Information
#
# Table name: packages
#
#  id              :integer          not null, primary key
#  phone_number    :string           not null
#  pin             :string           not null
#  verified        :boolean          default(FALSE), not null
#  tracking_number :string           not null
#  alert_updates   :boolean          default(TRUE), not null
#  alert_final     :boolean          default(TRUE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
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

  def self.send_batch_updates(tracking_number, tracking_status, carrier)
    tracking_status ||= "UNKNOWN"
    url = "http://trackmonkey.io/tracking/#{carrier}___#{tracking_number}"
    packages = filter_packages(tracking_number, tracking_status)

    packages.each do |package|
      TwilioClient.instance.send_sms(
        package.phone_number,
        "The status of your package (tracking number #{tracking_number}) has been updated to #{tracking_status}. See more details here: #{url}"
      )
    end
  end

  def self.filter_packages(tracking_number, tracking_status)
    packages = self.where(verified: true, tracking_number: tracking_number)

    if tracking_status == "DELIVERED"
      packages
    else
      packages.where(alert_updates: true)
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
    update_attributes(verified: true) if self.pin == entered_pin
  end

  def send_sms_update(shippo_tracking_json)
    shippo_update_object = JSON.parse(shippo_tracking_json)
    tracking_number = shippo_update_object["tracking_number"]
    status = shippo_update_object["tracking_status"]["status"]
    carrier = shippo_update_object["carrier"]
    url = "http://trackmonkey.io/tracking/#{carrier}___#{tracking_number}"

    TwilioClient.instance.send_sms(
      self.phone_number,
      "TrackMonkey package (tracking number #{tracking_number}) status: #{status}. See more details here: #{url}"
    )
  end
end
