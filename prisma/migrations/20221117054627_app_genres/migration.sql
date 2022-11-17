-- CreateTable
CREATE TABLE "app_genres" (
    "appid" INTEGER NOT NULL,
    "genderid" INTEGER NOT NULL,

    CONSTRAINT "app_genres_pkey" PRIMARY KEY ("appid","genderid")
);

-- AddForeignKey
ALTER TABLE "app_genres" ADD CONSTRAINT "app_genres_appid_fkey" FOREIGN KEY ("appid") REFERENCES "app"("appid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_genres" ADD CONSTRAINT "app_genres_genderid_fkey" FOREIGN KEY ("genderid") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
