Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :packages, only: [:index, :create, :update]
  resource :webhooks, only: [:create]

  get '*path', to: 'static_pages#root'
end
