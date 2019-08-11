json.array! @users do |user|
  if user.id == current_user.id
    json.id ""
  else
    json.id user.id
    json.name user.name
  end
end