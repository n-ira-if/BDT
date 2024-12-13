Rails.application.routes.draw do
  devise_for :users

  root 'homes#index'

  resources :pets, only: [:new, :create, :show]
  resources :chats, only: [:index, :new, :create, :show]
end
