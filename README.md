オリジナルアプリ：ペット情報共有リアルタイムチャットBindung der Tiere（BDT）

・リアルタイムチャットを使用して多数の人と交流、情報交換が可能なアプリです。

--------------------------------------------------------------------------
# URL及びテストアカウント

  http://54.92.15.28

テストアカウント１
ID: testtest@test

PW: r123456789

テストアカウント２
ID: test@test

PW: r123456789

--------------------------------------------------------------------------
# 使用技術

Ruby  3.2.0

Ruby on Rails 7.0.0

Javascript

MySQL2

AWS

Unicorn

Action Cable

--------------------------------------------------------------------------
# 機能一覧

ユーザー登録、ログイン機能（Devise）

リアルタイムチャット機能（Action Cable）

--------------------------------------------------------------------------
# 今後導入したい機能

・マイページ機能

・ペット情報を登録する事で他ユーザーが自分のマイページ上でペットを閲覧できる機能

・サイト内キーワード検索機能

--------------------------------------------------------------------------
# 作成経緯

自分と同じペットを飼っている飼い主が少なく情報が集めずらいため手軽に使えるチャットのような物があれば情報を集めるうえで最適ではないかと思い開発した。

--------------------------------------------------------------------------



# テーブル関係

## usersテーブル（ユーザー情報）

|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|nickname          |string    |null: false                  |
|email             |string    |null: false, unique: true    |
|encrypted_password|string    |null: false                  |
|region_id         |integer   |null: false                  |
|-----------------------------------------------------------|
備考

### userテーブルAssociation
has_many pets
has_many user_chats
has_many chats
has_many messages


## petテーブル（ペット情報）

|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|name              |string    |null: false                  |
|age               |integer   |null: false                  |
|type              |string    |null: false                  |
|comment           |text      |null: false                  |
|user              |references|null: false,foreign_key: true|
|-----------------------------------------------------------|


### petテーブルAssociation
belongs_to user

## chatテーブル（チャットルーム情報）
|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|chat_name         |string    |null: false                  |
|user              |references|null: false,foreign_key: true|
|-----------------------------------------------------------|

### chatテーブルAssociation
has_many user_chats
has_many users
has_many messages

## user_chatテーブル
|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|chat              |references|null: false,foreign_key: true|
|user              |references|null: false,foreign_key: true|
|-----------------------------------------------------------|

### user_chatテーブルAssociation
belongs_to chat
belongs_to user

## messageテーブル
|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|chat              |references|null: false,foreign_key: true|
|user              |references|null: false,foreign_key: true|
|message           |text      |null: false                  |
|-----------------------------------------------------------|

### messageテーブルAssociation
belongs_to user
belongs_to chat





















## 備考
備考
画像元：https://www.pakutaso.com/
ぱくたそオリジナルフリー素材

https://imageslabo.com/
imageslabo

音源
https://soundeffect-lab.info/
効果音ラボ
