class RentalsController < ApplicationController
  before_action :no_url_hacking, only: [:index]
#  skip_before_action :verify_authenticity_token 

  def show
    @rental = Rental.find(params[:id])
  #  render json: @rental, status: 200
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @rental}
    end
  end

  def index
    if params[:customer_id]
      @customer = Customer.find_by(id: params[:customer_id])
      if @customer.nil?
        redirect_to "/"
      else
        @checked_out = @customer.rentals.checked_out
        @past_rentals = @customer.rentals.past_rentals
        respond_to do |f|
          f.html {render :index}
          f.json {render json: @customer}
        end
      end
    else
      redirect_to "/"
    end
  end

  def create
    binding.pry
    @rental = Rental.create(
          :customer_id => params[:customer_id],
          :movie_id => params[:movie_id]
        )
    @message = @rental.rent_movie
    redirect_to customer_rentals_path(@rental.customer), :notice => @message
  end

  def update
    @rental = Rental.find_by(id: params[:rental_id])
    @rental.update(:status => "returned")
    @rental.save

    @message = "Thank you for returning #{@rental.movie.title}."
    redirect_to customer_rentals_path(@rental.customer), :notice => @message
  end

  private

  def no_url_hacking
    redirect_to '/' unless current_user.id.to_s == params[:customer_id]
  end

end
