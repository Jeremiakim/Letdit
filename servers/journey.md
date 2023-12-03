# Journey

## Day 1

### Setup Project: Tema Aplikasi, Apollo Server, GraphQL

Silahkan setup project aplikasi server kamu:

- [Y] Install MongoDB database pada komputer kamu atau menggunakan MongoDB Atlas
- [Y] Install package yang dibutuhkan: @apollo/server, graphql dan mongodb sebagai MongoDB driver
- [Y] Pilih tema sesuai dengan pilihan dan kesepakatan instructor, tuliskan dalam README github kamu
- [Y] Buatlah aplikasi server GraphQL menggunakan Apollo Server dengan PORT default: 3000

### GraphQL - Apollo Server

Buatlah Aplikasi server GraphQL dengan menggunakan Apollo Server yang memiliki fungsi sebagai berikut:

- [Y] Register (Mutation)
- [Y] Login (Query)
- [Y] Get Post (Query)
- [Y] Add Post (Mutation)
- [Y] Comment Post (Mutation)
- [Y] Search User (Query)
- [Y] Follow (Mutation)
- [Y] Get User (Query)
- [Y] Like Post (Mutation)

### MongoDB 1

Buatlah fungsi/method pada aplikasi server GraphQL kamu yang menghubungkan dengan database MongoDB dengan fungsi sebagai berikut:

- [Y] Add user: untuk kebutuhan register
- [Y] Get user by username dan password: untuk kebutuhan login
- [Y] Search users by name/username: untuk kebutuhan mencari user berdasarkan nama atau username
- [Y] Follow User: untuk kebutuhan memfollow user
- [Y] Get User by Id: untuk menampilkan profile user
- [Y] Add Post: untuk menambahkan post baru
- [Y] Get Posts: mengambil daftar post berdasarkan yang terbaru
- [Y] Get Post by Id: mengambil post berdasarkan id
- [Y] Comment Post: untuk menambahkan komentar pada post
- [Y] Like Post: untuk menambahkan like pada post

## Day 2

### MongoDB 2

Buatlah lookup/relasi pada method/fungsi yang berhubungan dengan MongoDB yang sudah kamu buat dengan rincian sebagai berikut:

- [Y] Get Post by Id: mengambil post berdasarkan id

  - [Y] Menampilkan nama/username user pada data komentar

- [Y] Get User by Id: untuk menampilkan profile user
  - [Y] Menampilkan list nama/username user follower
  - [Y] Menampilkan list nama/username user following

### Redis - Cache

Implementasikan cache pada aplikasi GraphQL server yang sudah dibuat dengan detail sebagai berikut:

- [ ] Implementasikan cache pada Get Post (Query)
- [ ] Invalidate cache pada Add Post (Mutation)

## Day 3

### React Native

Buatlah aplikasi mobile React-Native dengan menggunakan expo. Aplikasi ini adalah client side dari challenge My Social Media App.
Pada aplikasi ini kamu perlu membuat screen sebagai berikut:

- [Y] Unauthenticate screen

  - [Y] Login Screen: Menampilkan form untuk login
  - [Y] Register Screen: Menampilkan form untuk register

- [Y] Authenticate screen
  - [Y] Home screen: Menampilkan list post
  - [Y] Create Post: Menampilkan form untuk menambahkan post baru
  - [Y] Post Detail Screen: Menampilkan post detail berdasarkan id dan form untuk komentar
  - [Y] Search Screen: Menampilkan form pencarian untuk mencari user (bisa digabung dengan screen lain)
  - [Y] Profile Screen: Menampilkan profile user berdasarkan id, serta menampilkan jumlah followings dan followers user.

### React Navigation

- [ ] Implementasikan navigasi pada screen yang sudah kamu buat dengan menggunakan React Navigation.

## Day 4

### GraphQL - Apollo Client

Lakukan komunikasi Aplikasi Mobile (react-native) menggunakan apollo client ke server GraphQL yang sudah dibuat. Dan Implementasikan query dan mutation sesuai dengan kebutuhan.

- [Y] Register (Mutation)
- [Y] Login (Query)
- [Y] Get Post (Query)
- [Y] Add Post (Mutation)
- [ ] Comment Post (Mutation)
- [Y] Search User (Query)
- [ ] Follow (Mutation)
- [Y] Get User (Query)
- [ ] Like Post (Mutation)
