class WebhooksController < ApplicationController
  def create
    p params

    tracking = params[:tracking]

    Package.send_updates(tracking)
  end
end
