class PetsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @pet = Pet.new
  end

  def create
    @pet = Pet.new(pet_params)
    if @pet.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

    private

    def pet_params
      params.require(:pet).permit(:name, :age, :pet_type, :comment).merge(user_id: current_user.id)
    end

end
