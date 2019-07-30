FactoryBot.define do

  factory :message do
    body {Faker::Lorem.sentence}
    image { File.open("#{Rails.root}/spec/images/sample.JPG") }
    user
    group
  end
end