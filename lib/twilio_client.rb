require "singleton"

class TwilioClient
  include Singleton

  def send_pin(phone_number, pin)
    client.messages.create(
      to: phone_number,
      from: ENV["TWILIO_PHONE_NUMBER"],
      body: "Your TrackMonkey PIN is #{pin}."
    )
  end

  def send_initial_sms(phone_number, tracking_number, tracking_status, carrier)
    client.messages.create(
      to: phone_number,
      from: ENV["TWILIO_PHONE_NUMBER"],
      body: "Your shipment (##{tracking_number}) status is currently #{tracking_status}.\n\nCheck updates on TrackMonkey:\nhttp://trackmonkey.io/tracking/#{carrier}___#{tracking_number}"
    )
  end

  def send_sms_update(phone_number, tracking_number, tracking_status, carrier)
    client.messages.create(
      to: phone_number,
      from: ENV["TWILIO_PHONE_NUMBER"],
      body: "Your shipment (##{tracking_number}) status has been updated to #{tracking_status}.\n\nVisit TrackMonkey for details:\nhttp://trackmonkey.io/tracking/#{carrier}___#{tracking_number}"
    )
  end

  private

  def client
    Twilio::REST::Client.new(
      ENV["TWILIO_ACCOUNT_SID"],
      ENV["TWILIO_AUTH_TOKEN"]
    )
  end
end
