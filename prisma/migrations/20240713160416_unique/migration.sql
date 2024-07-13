/*
  Warnings:

  - A unique constraint covering the columns `[city,name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Place_city_name_key" ON "Place"("city", "name");
