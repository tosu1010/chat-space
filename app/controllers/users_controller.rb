class UsersController < ApplicationController
  
  def index
    user_ids = []
    if user_params_name_id[:user_ids]
      user_ids.push(user_params_name_id[:user_ids])
    end
    @users = User.where("name LIKE(?)", "%#{user_params_name_id[:name]}%").where.not(id: user_ids)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params_name_id
    params.permit(:name, user_ids: [])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
