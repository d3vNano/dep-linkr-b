-- NOME DO BANCO DE DADOS LOCAL = linkr_db

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	username VARCHAR(50) NOT NULL,
	picture_url TEXT NOT NULL,
	created_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
	id SERIAL PRIMARY KEY,
	token TEXT NOT NULL,
	user_id INTEGER NOT NULL REFERENCES "users"("id"),
	state BOOLEAN NOT NULL DEFAULT FALSE,
	created_at DATE NOT NULL DEFAULT NOW()
)

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	link TEXT NOT NULL,
	description TEXT NOT NULL,
	user_id INTEGER NOT NULL REFERENCES "users"("id"),
	likes INTEGER NOT NULL DEFAULT 0,
	created_at DATE NOT NULL DEFAULT NOW()
)

CREATE TABLE likes_info (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES "users"("id"),
	post_id INTEGER NOT NULL REFERENCES "posts"("id"),
	created_at DATE NOT NULL DEFAULT NOW()
)

CREATE TABLE hashtags(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW()
)

CREATE TABLE post_hashtags (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES "posts"("id"),
    hashtag_id INTEGER NOT NULL REFERENCES "hashtags"("id"),
    created_at DATE NOT NULL DEFAULT NOW()
)

CREATE TABLE follows (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES "users"("id"),
	follow_user_id INTEGER NOT NULL REFERENCES "users"("id"),
	created_at DATE NOT NULL DEFAULT NOW()
)