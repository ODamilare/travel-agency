-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "badge" TEXT,
    "description" TEXT,
    "bg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deal_slug_key" ON "Deal"("slug");
