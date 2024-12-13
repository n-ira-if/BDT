Rails.application.routes.draw do
  devise_for :users

  root 'homes#index'

  resources :pets, only: [:new, :create, :show]
end
