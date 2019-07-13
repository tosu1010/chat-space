# README

## userテーブル
|Column|Type|Options|
|:--|:--|:--|
|name|string|null: false|
|email|integer|null: false, unique: true|
|password|string|null:false|

### Assosiation
- has_many :groups, through: :members
- has_many :members
- has_many :messages

### Index
- add_index :name

## membersテーブル
|Column|Type|Options|
|:--|:--|:--|
|user_id|integer|null: false, foregin_key: true|
|group_id|ingeger|null: false, foregin_key: true|

### Assosiation
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|Options|
|:--|:--|:--|
|name|string|null: false|

### Assosiation
- has_many :users, through: :members
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|:--|:--|:--|
|body|text||
|image|string||
|user_id|integer|null: false, foregin_key: true|
|group_id|integer|null: false, foregin_key: true|

### Assosiation
- belongs_to :user
- belongs_to :group
