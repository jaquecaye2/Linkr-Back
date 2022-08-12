CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(100)  NOT NULL,
	"email" varchar(120) UNIQUE NOT NULL,
	"password_hash" TEXT NOT NULL,
	"picture" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"description" TEXT DEFAULT NULL,
	"link_title" TEXT NOT NULL,
	"link_description" TEXT,
	"link_image" TEXT NOT NULL,
	"user_id" INTEGER NOT NULL REFERENCES "users"("id"),
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);



CREATE TABLE "hastags" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"views" INTEGER DEFAULT 0
);



CREATE TABLE "posts_hastgs" (
	"id" SERIAL PRIMARY KEY,
	"post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
	"hastag_id" INTEGER NOT NULL REFERENCES "hastags"("id")
);


CREATE TABLE "likes_posts" (
	"id" SERIAL PRIMARY KEY,
	"post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
	"user_id" INTEGER NOT NULL REFERENCES "users"("id")
);