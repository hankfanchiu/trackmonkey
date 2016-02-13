class PackagesController < ApplicationController
  def new
    @phone_number = Package.new
  end

  def create
    @phone_number = Package.find_or_create_by(phone_number: params[:package][:phone_number])
    @phone_number.generate_pin
    @phone_number.send_pin
    respond_to do |format|
      format.js # render app/views/phone_numbers/create.js.erb
    end
  end

  def verify
    @phone_number = Package.find_by(phone_number: params[:hidden_phone_number])
    @phone_number.verify(params[:pin])
    respond_to do |format|
      format.js
    end
  end
end
