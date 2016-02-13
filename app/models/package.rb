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

class Package < ActiveRecord::Base
  validates :phone_number,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 10 }

  validates :pin,
    presence: true,
    format: { with: /[0-9]+/ },
    length: { is: 4 }

  validates_presence_of :tracking_id
  validates_uniqueness_of :phone_number, { scope: :tracking_id }

  def generate_pin
    self.pin = rand(0000..9999).to_s.rjust(4, "0")
    save
  end

  def twilio_client
    Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
  end

  def send_pin
    twilio_client.messages.create(
      to: phone_number,
      from: ENV['TWILIO_PHONE_NUMBER'],
      body: "Your PIN is #{pin}"
    )
  end

  def verify(entered_pin)
    update(verified: true) if self.pin == entered_pin
  end
end
