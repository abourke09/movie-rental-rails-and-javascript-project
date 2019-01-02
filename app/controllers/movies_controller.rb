class MoviesController < ApplicationController

  def index
    if !params[:rating].blank?
      @movies = Movie.rating_filter(params[:rating])
      respond_to do |f|
        f.html {render :index}
        f.json {render json: @movies}
      end
    else
      @movies = Movie.all
      respond_to do |f|
        f.html
        f.json {render json: @movies}
      end
    end

  end


  def show
    @movie = Movie.find(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @movie, include: "famous_quotes"}
    end
  end


end
