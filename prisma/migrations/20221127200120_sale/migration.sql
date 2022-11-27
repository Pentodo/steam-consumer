-- CreateTable
CREATE TABLE "sale" (
    "appid" INTEGER NOT NULL,
    "discount_percent" INTEGER NOT NULL,
    "original_price" INTEGER NOT NULL,
    "final_price" INTEGER NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("appid")
);

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_appid_fkey" FOREIGN KEY ("appid") REFERENCES "app"("appid") ON DELETE CASCADE ON UPDATE CASCADE;
