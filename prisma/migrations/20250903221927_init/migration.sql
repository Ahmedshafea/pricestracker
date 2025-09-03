-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "price" DOUBLE PRECISION,
    "availability" BOOLEAN,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_url_key" ON "public"."Product"("url");
