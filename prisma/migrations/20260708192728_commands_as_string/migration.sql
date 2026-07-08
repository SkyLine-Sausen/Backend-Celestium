-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Delivery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerName" TEXT NOT NULL,
    "orderId" TEXT,
    "productId" TEXT,
    "commands" TEXT NOT NULL DEFAULT '[]',
    "server" TEXT NOT NULL DEFAULT 'main',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" DATETIME,
    CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Delivery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("commands", "createdAt", "deliveredAt", "id", "orderId", "playerName", "productId", "server", "status") SELECT "commands", "createdAt", "deliveredAt", "id", "orderId", "playerName", "productId", "server", "status" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE INDEX "Delivery_server_status_idx" ON "Delivery"("server", "status");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "tag" TEXT,
    "rating" REAL NOT NULL DEFAULT 0.0,
    "commands" TEXT NOT NULL DEFAULT '[]',
    "server" TEXT NOT NULL DEFAULT 'main',
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("available", "categoryId", "commands", "description", "id", "image", "name", "price", "rating", "server", "tag") SELECT "available", "categoryId", "commands", "description", "id", "image", "name", "price", "rating", "server", "tag" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
