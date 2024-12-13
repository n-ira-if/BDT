## usersテーブル（ユーザー情報）

|Column            |Type      |Options                      |
|------------------|----------|-----------------------------|
|nickname          |string    |null: false                  |
|email             |string    |null: false, unique: true    |
|encrypted_password|string    |null: false                  |
|region_id         |integer   |null: false                  |
|-----------------------------------------------------------|
備考
セキュリティ向上のためnicknameカラム特殊文字制限

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
画像元：https://www.pakutaso.com/20231006299post-36453.html#google_vignett：：
ぱくたそオリジナルフリー素材

### petテーブルAssociation
belongs_to user