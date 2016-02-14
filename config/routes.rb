Rails.application.routes.draw do
  root to: 'static_pages#root'
  root 'packages#new'

  resource :packages, only: [:index, :new, :create] do
    post 'verify' => "packages#update"
  end

  resource :webhooks, only: [:create]
end
