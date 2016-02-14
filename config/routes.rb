Rails.application.routes.draw do
  root 'packages#new'

  resources :packages, only: [:index, :new, :create] do
    post 'verify' => "packages#update"
  end

  resource :webhooks, only: [:create]
end
