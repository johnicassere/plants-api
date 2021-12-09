-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "linkImagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "nomeCientifico" TEXT NOT NULL,
    "nomePopular" TEXT NOT NULL,
    "reino" TEXT NOT NULL,
    "divisao" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "ordem" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "subfamilia" TEXT NOT NULL,
    "linkImagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_nomeCientifico_key" ON "Plant"("nomeCientifico");
