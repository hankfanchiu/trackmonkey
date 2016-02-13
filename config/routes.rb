Rails.application.routes.draw do
  root 'packages#new'

  resource :packages, only: [:new, :create, :index] do
    post '/verify' => "packages#verify"
  end

  resource :webhooks, only: [:create]
end
