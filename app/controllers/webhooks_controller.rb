class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    p params

    tracking = params[:tracking]

    Package.send_updates(tracking)

    render json: { test: "test", status: :ok }
  end
end
