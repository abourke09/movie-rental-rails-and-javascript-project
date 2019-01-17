class FamousQuotesController < ApplicationController
  def show
    @famous_quote = FamousQuote.find(params[:id])
    render json: @famous_quote, status: 200
  end

  def new
    @movie = Movie.find_by(id: params[:movie_id])
    @famous_quote = FamousQuote.new
  end

  def create
    @movie = Movie.find_by(id: params[:movie_id])
    @famous_quote = FamousQuote.create(
      :quote => famous_quote_params[:quote],
      :actor => famous_quote_params[:actor],
      :movie_id => params[:movie_id]
    )

    if @famous_quote.save
      @message = "Thank you for adding a quote to #{@famous_quote.movie.title}"
      flash.now[:alert] = @message
      #redirect_to movie_path(@famous_quote.movie), :notice => @message
    else
      render :new
    end
  end

  private

  def famous_quote_params
    params.require(:famous_quote).permit(:quote, :actor, :movie_id)
  end
end
