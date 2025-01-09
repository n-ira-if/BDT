Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'homes#index'

  resources :pets, only: [:new, :create, :show]
  resources :chats, only: [:index, :new, :create, :show] do
    resources :messages, only: [:create]
  end
  resources :users, only: [:show]
end
