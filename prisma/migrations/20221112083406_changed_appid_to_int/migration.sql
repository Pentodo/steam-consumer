/*
  Warnings:

  - The primary key for the `app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `appid` on the `app` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `app_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `appid` on the `app_details` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "app_details" DROP CONSTRAINT "app_details_appid_fkey";

-- AlterTable
ALTER TABLE "app" DROP CONSTRAINT "app_pkey",
ALTER COLUMN "appid" SET DATA TYPE INTEGER,
ADD CONSTRAINT "app_pkey" PRIMARY KEY ("appid");

-- AlterTable
ALTER TABLE "app_details" DROP CONSTRAINT "app_details_pkey",
ALTER COLUMN "appid" SET DATA TYPE INTEGER,
ADD CONSTRAINT "app_details_pkey" PRIMARY KEY ("appid");

-- AddForeignKey
ALTER TABLE "app_details" ADD CONSTRAINT "app_details_appid_fkey" FOREIGN KEY ("appid") REFERENCES "app"("appid") ON DELETE CASCADE ON UPDATE CASCADE;
