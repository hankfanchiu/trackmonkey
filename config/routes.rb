Rails.application.routes.draw do
  resource :packages, only: [:new, :create, :index] do
    post '/verify' => "packages#verify"
  end
end
