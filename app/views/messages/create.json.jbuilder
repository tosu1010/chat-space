json.id @message.id
json.body @message.body
json.user_name @message.user.name
json.image_url @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")