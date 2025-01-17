class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show]

  def show
    @user_pet = current_user.pets
  end
  
end
