class WebhooksController < ApplicationController
  def create
    tracking = params[:tracking]
    
    Package.send_updates(tracking)
  end
end
