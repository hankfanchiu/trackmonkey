class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    tracking_number = params[:tracking_number]
    tracking_status = params[:tracking_status]
    carrier = params[:carrier]

    return unless tracking_number && tracking_status

    Package.send_updates(tracking_number, tracking_status, carrier)

    render json: {}, status: :ok
  end
end
