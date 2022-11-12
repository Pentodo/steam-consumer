/*
  Warnings:

  - Added the required column `release_date` to the `app_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_details" ADD COLUMN     "release_date" VARCHAR NOT NULL;
