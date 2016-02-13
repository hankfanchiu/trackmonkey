class PackagesController < ApplicationController
  def index
    tracking = params[:tracking_number]
    carrier = params[:carrier]

    url = URI.parse("https://api.goshippo.com/v1/tracks/#{carrier}/#{tracking}/")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    response = http.start do |http|
      request = Net::HTTP::Get.new(url.path)
      http.request(request)
    end

    render json: response.body
  end

  def new
    @phone_number = Package.new
  end

  def create
    @phone_number = Package.new(package_params)
    if @phone_number.generate_pin
      @phone_number.send_pin

      respond_to do |format|
        format.js # render app/views/phone_numbers/create.js.erb
      end
    else
      render json: { status: :error }
    end
  end

  def verify
    @phone_number = Package.find_by(phone_number: params[:hidden_phone_number])
    @phone_number.verify(params[:pin])

    respond_to do |format|
      format.js
    end
  end

  private

  def package_params
    params.require(:package).permit(:phone_number, :tracking_number)
  end
end
