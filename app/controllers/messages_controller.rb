class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
  
  def create
    @message = @group.messages.new(message_params)
    @messages = @group.messages.includes(:user)
    if @message.save
      respond_to do |format|
        # format.html { render :index }
        format.json
      end
      # redirect_to group_messages_path(@group), notice: "メッセージを送信しました"
    else
      @messages = @group.messages.includes(:user)
      flash[:alert] = "メッセージを入力してください。"
      render :index
    end
  end
  
  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
end
