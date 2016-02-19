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

require "twilio_client"

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
    packages = filter_packages(tracking_number, tracking_status)

    packages.each do |package|
      TwilioClient.instance.send_sms_update(
        package.phone_number,
        tracking_number,
        tracking_status,
        carrier
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
    TwilioClient.instance.send_pin(self.phone_number, self.pin)
  end

  def verify(entered_pin)
    self.update_attributes(verified: true) if self.pin == entered_pin
  end

  def send_initial_sms(shippo_tracking_json)
    shippo_tracking = JSON.parse(shippo_tracking_json)

    return unless self.tracking_number == shippo_tracking["tracking_number"]
    return unless shippo_tracking["tracking_status"].is_a?(Hash)

    TwilioClient.instance.send_initial_sms(
      self.phone_number,
      self.tracking_number,
      shippo_tracking["tracking_status"]["status"],
      shippo_tracking["carrier"]
    )
  end
end
