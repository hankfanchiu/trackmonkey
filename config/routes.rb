Rails.application.routes.draw do
  resources :packages, only: [:create, :index]
  post 'packages/verify' => "packages#verify"
end
