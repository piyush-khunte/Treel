import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, mapMongoToPersonal } from "@/lib/commerce/product-storage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandParam = (searchParams.get("brand") || "").toLowerCase().trim();
    
    // Default to "personal" for Personal TPMS storefront unless "suraksha" or "all" is explicitly requested
    const targetBrand: "personal" | "suraksha" | "all" =
      brandParam === "suraksha" ? "suraksha" : brandParam === "all" ? "all" : "personal";

    const mongoProducts = await getAllProducts(true, targetBrand);

    // If suraksha or all, return full mongoProducts; for personal, map with mapMongoToPersonal
    const responseData = targetBrand === "personal" 
      ? mongoProducts.map(mapMongoToPersonal)
      : mongoProducts;

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=1, stale-while-revalidate=59",
      },
    });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
