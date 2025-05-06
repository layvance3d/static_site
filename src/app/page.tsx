import { Button } from "@/components/ui/ButtonComponent";
import Image from "next/image";
import HeroView from "@/components/HeroView";

// 首頁
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-30 px-4 py-10 space-y-20">

      {/* Hero */}
      <HeroView />

      {/* 商品區塊 */}
      <HomeProductSectionView />

      {/* Footer */}
      <HomeFooterView />
    </main>
  );
}

// 商品區塊元件
function HomeProductSectionView() {
  // 商品資料
  const products = [
    { title: "PLA 環保線材", price: "$499", img: "/pla.jpg" },
    { title: "ABS 工程塑料", price: "$699", img: "/abs.jpg" },
    { title: "TPU 彈性材料", price: "$899", img: "/tpu.jpg" },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl w-full">
      {products.map((item) => (
        <HomeProductCardView key={item.title} title={item.title} price={item.price} img={item.img} />
      ))}
    </section>
  );
}

// 商品卡片元件
function HomeProductCardView({ title, price, img }: { title: string; price: string; img: string }) {
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

// Footer 元件
function HomeFooterView() {
  return (
    <footer className="text-center text-xs text-muted-foreground border-t pt-4 w-full">
      &copy; 2025 LAYVANCE 3D. All rights reserved.
    </footer>
  );
}
