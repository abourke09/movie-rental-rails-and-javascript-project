class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @customer = Customer.new
    @customers = Customer.all
  end

  def create
    if request.env['omniauth.auth']
      @customer = Customer.find_or_create_by(email: auth['info']['email']) do |c|
        c.name = auth['info']['name']
        c.email = auth['info']['email']
        c.password = auth['uid']
      end

      @customer.save
      session[:customer_id] = @customer.id
      redirect_to '/'
    else
      @customer = Customer.find_by(email: params[:customer][:email])

      if @customer && @customer.authenticate(params[:customer][:password])
        session[:customer_id] = @customer.id
      #  redirect_to '/'
      else
        redirect_to '/login'
      end
    end
  end

  def destroy
    session.delete :customer_id
  #  redirect_to '/'
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
