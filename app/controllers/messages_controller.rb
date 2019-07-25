class MessagesController < ApplicationController
  before_action :get_group_id, only: [:index]

  def index
    @group = Group.find(@group_id)
  end

  def create
  end

  private
  def get_group_id
    @group_id = params[:group_id]
  end

end
