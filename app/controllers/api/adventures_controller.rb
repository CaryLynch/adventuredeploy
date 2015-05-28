module Api

  class AdventuresController < ApplicationController

    def index
      adventures = Adventure.all
      render json: adventures
    end

    def show
      adventure = Adventure.find(params[:id])
      render json: adventure
    end

    def create
      # binding.pry
      adventure = Adventure.create(location: params[:location], activity: params[:activity], business: params[:business], comments: params[:comments])
      render json: adventure
    end

    # def new
    #   adventures = Adventure.new
    #   render json: adventure
    # end

    # def edit
    #   adventures = Adventure.new
    #   render json: adventure
    # end


    def update
      adventure = Adventure.find(params[:id])
      adventure.update(id: params[:id], location: params[:location], activity: params[:activity], business: params[:business], comments: params[:comments])
      render json: adventure
    end

    def destroy
      adventure = Adventure.find(params[:id])
      adventure.destroy
      render json: adventure
    end
    
  protect_from_forgery with: :exception
  end

end