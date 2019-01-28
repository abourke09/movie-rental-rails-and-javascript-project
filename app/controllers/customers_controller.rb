class CustomersController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:new, :create]
#  skip_before_action :verify_authenticity_token , only: [:update]
  before_action :no_url_hacking, only: [:show, :edit, :update]

  def get_current_user
    render json: current_user
  end

  def show
    @customer = Customer.find(params[:id])
    @age_check = @customer.check_for_age
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @customer}
    end
  end

  def new
    @customer = Customer.new
  end

  def create
    @customer = Customer.new(customer_params)
    if @customer.save
      session[:customer_id] = @customer.id
    #  redirect_to customer_path(@customer)
    else
      render :new
    end
  end

  def edit
    @customer = Customer.find(params[:id])
  end

  def update
    @customer = Customer.find(params[:id])
    if @customer.update(customer_params)
      @customer = Customer.find(params[:id])
      #redirect_to customer_path(@customer)
    else
      render :edit
    end
  end

  private

  def customer_params
    params.require(:customer).permit(:name, :age, :email, :password)
  end

  def require_login
    redirect_to '/' unless logged_in?
  end

  def no_url_hacking
    redirect_to '/' unless current_user.id.to_s == params[:id]
  end

end
