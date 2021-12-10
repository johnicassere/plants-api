-- CreateTable
CREATE TABLE "_PlantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlantToUser_AB_unique" ON "_PlantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlantToUser_B_index" ON "_PlantToUser"("B");

-- AddForeignKey
ALTER TABLE "_PlantToUser" ADD FOREIGN KEY ("A") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
