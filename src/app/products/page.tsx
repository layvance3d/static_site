"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/ButtonComponent";
import Image from "next/image";

// 假資料：實際可串接 API 或 DB
const PRODUCTS = [
  { title: "PLA 環保線材", brand: "拓竹", material: "PLA", price: "$499", img: "/pla.jpg" },
  { title: "ABS 工程塑料", brand: "天瑞", material: "ABS", price: "$699", img: "/abs.jpg" },
  { title: "TPU 彈性材料", brand: "愛麗茲", material: "TPU", price: "$899", img: "/tpu.jpg" },
  { title: "PETG 透明線材", brand: "拓竹", material: "PETG", price: "$599", img: "/petg.jpg" },
];

// 商品卡片元件
function ProductCard({ title, price, img }: { title: string; price: string; img: string }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={img} alt={title} width={400} height={192} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{price}</p>
        <Button className="w-full mt-4">加入購物車</Button>
      </div>
    </div>
  );
}

// 商品頁面主元件
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const material = searchParams.get("material");

  // 依 query 篩選商品
  const filtered = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (brand && item.brand !== brand) return false;
      if (material && item.material !== material) return false;
      return true;
    });
  }, [brand, material]);

  return (
    <main className="min-h-screen pt-28 px-4 pb-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">商品列表</h2>
      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground">查無商品</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ProductCard key={item.title} {...item} />
          ))}
        </section>
      )}
    </main>
  );
}
