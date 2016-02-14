class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    tracking_number = params[:tracking_number]
    tracking_status = params[:tracking_status]
    carrier = params[:carrier]

    if tracking_number && tracking_status != "null"
      Package.send_batch_updates(
        tracking_number,
        tracking_status,
        carrier
      )

      render json: {}, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
