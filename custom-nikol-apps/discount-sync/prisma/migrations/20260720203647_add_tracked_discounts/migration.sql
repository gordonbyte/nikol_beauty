-- CreateTable
CREATE TABLE "TrackedDiscount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "discountId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "valueType" TEXT,
    "value" REAL,
    "currency" TEXT,
    "appliedProducts" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackedDiscount_shop_discountId_key" ON "TrackedDiscount"("shop", "discountId");
