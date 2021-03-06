class PackagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if Package.find_by(package_params)
      render json: { error: "Already tracking package" }
    else
      package = Package.new(package_params)
      package.generate_pin
      package.send_pin

      render json: { package_id: package.id }
    end
  end

  def update
    package = Package.find(params[:id])

    if package.verify(package_params[:pin])
      shippo_tracking_json = request_shippo_updates
      package.send_initial_sms(shippo_tracking_json)

      render json: { tracking: shippo_tracking_json }
    else
      render json: { error: "Incorrect pin" }
    end
  end

  private

  def package_params
    params.require(:package)
      .permit(:phone_number, :tracking_number, :pin, :alert_updates)
  end

  def request_shippo_updates
    url = URI.parse("https://api.goshippo.com/v1/tracks/")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    response = http.start do |http|
      request = Net::HTTP::Post.new(url.path)
      request["Authorization"] = "ShippoToken #{ENV["SHIPPO_API_KEY"]}"
      request.set_form_data(
        tracking_number: package_params[:tracking_number],
        carrier: params[:package][:carrier]
      )

      http.request(request)
    end

    response.body
  end
end
