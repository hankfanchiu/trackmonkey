class WebhooksController < ApplicationController
  def create
    p params

    tracking = params[:tracking]

    Package.send_updates(tracking)

    render json: { test: "test", status: :ok }
  end
end
