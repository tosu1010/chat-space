json.id @message.id
json.{@message, :body, :image}
json.user_name @message.user.name
json.image_url @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")