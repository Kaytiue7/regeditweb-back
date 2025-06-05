-- CreateTable
CREATE TABLE "MainPageSection" (
    "id" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "MainPageSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainPageSection_sectionName_key" ON "MainPageSection"("sectionName");
