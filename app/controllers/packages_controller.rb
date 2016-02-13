class PackagesController < ApplicationController
  def index
    tracking_id = params[:tracking_id]
    carrier = params[:carrier]

    url = URI.parse("https://api.goshippo.com/v1/tracks/#{carrier}/#{tracking_id}/")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    http.start do |http|
      request = Net::HTTP::Get.new(url.path)
      response = http.request(request)
    end

    render json: response.body
  end
end
