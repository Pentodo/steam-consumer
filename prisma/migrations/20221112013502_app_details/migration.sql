-- CreateTable
CREATE TABLE "app_details" (
    "appid" BIGINT NOT NULL,
    "type" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR NOT NULL,
    "header" VARCHAR NOT NULL,
    "background" VARCHAR NOT NULL,

    CONSTRAINT "app_details_pkey" PRIMARY KEY ("appid")
);

-- AddForeignKey
ALTER TABLE "app_details" ADD CONSTRAINT "app_details_appid_fkey" FOREIGN KEY ("appid") REFERENCES "app"("appid") ON DELETE CASCADE ON UPDATE CASCADE;
