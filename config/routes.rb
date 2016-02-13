Rails.application.routes.draw do

  resources :packages, only: [:new, :create]
  post 'packages/verify' => "packages#verify"

end
