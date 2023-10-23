-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "water_tips" TEXT NOT NULL,
    "water_amount" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "frequency_time" INTEGER NOT NULL,
    "frequency_repeat_everyday" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "appleIdentityToken" TEXT,
    "appleUserId" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant_User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "custom_name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "water_tips" TEXT NOT NULL,
    "water_amount" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "environment_plant" TEXT NOT NULL,
    "frequency_time" INTEGER NOT NULL,
    "frequency_repeat" TEXT NOT NULL,
    "reminder_time" TEXT NOT NULL,
    "reminder_time_in_date" TEXT NOT NULL,
    "lastWatered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plant_User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_appleIdentityToken_key" ON "User"("appleIdentityToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_appleUserId_key" ON "User"("appleUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Plant_User" ADD CONSTRAINT "Plant_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
