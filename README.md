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


## petテーブル（ペット情報）

|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|name              |string    |null: false                  |
|age               |integer   |null: false                  |
|type              |string    |null: false                  |
|comment           |text      |null: false                  |
|-----------------------------------------------------------|
備考
画像元：https://www.pakutaso.com/：：
ぱくたそオリジナルフリー素材

https://imageslabo.com/
imageslabo

音源
https://soundeffect-lab.info/
効果音ラボ

### petテーブルAssociation
belongs_to user