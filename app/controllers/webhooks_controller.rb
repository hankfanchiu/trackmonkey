class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    tracking_number = params[:tracking_number]
    tracking_status = params[:tracking_status]

    if tracking_number && !tracking_status.nil?
      send_batch_updates

      render json: {}, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  private

  def send_batch_updates
    tracking_number = params[:tracking_number]
    tracking_status = params[:tracking_status]
    carrier = params[:carrier]

    return unless tracking_status.is_a?(Hash)

    status = tracking_status[:status]

    Package.send_batch_updates(tracking_number, status, carrier)
  end
end
