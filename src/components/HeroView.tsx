"use client";
import { Button } from "@/components/ui/ButtonComponent";
import Image from "next/image";
// @ts-ignore
import anime from 'animejs';
import { useRef, useState } from "react";
import heroContent from "@/data/heroContent.json";

// 型別定義
interface HeroContent {
  title: string;
  description: string;
}

// Hero 元件（首頁專用）
export default function HeroView() {
  // 取得按鈕 DOM 節點
  const btnRef = useRef<HTMLButtonElement>(null);
  // 狀態管理，預設值來自本地 JSON
  const [content] = useState<HeroContent>({
    title: heroContent.title,
    description: heroContent.description,
  });

  // 滑鼠移入動畫
  const handleMouseEnter = () => {
    if (btnRef.current) {
      anime({
        targets: btnRef.current,
        scale: 1.13,
        boxShadow: '0 8px 32px 0 rgba(16, 102, 255, 0.22)',
        duration: 380,
        easing: 'easeOutBack',
      });
    }
  };

  // 滑鼠移出動畫
  const handleMouseLeave = () => {
    if (btnRef.current) {
      anime({
        targets: btnRef.current,
        scale: 1,
        boxShadow: '0 8px 24px 0 rgba(16, 102, 255, 0.13)',
        duration: 420,
        easing: 'easeOutExpo',
      });
    }
  };

  // 背景圖樣式
  // 僅優化背景圖顯示（Aspect Fit），按鈕排版完全維持你原本設計，手機桌機都置中
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 py-20 px-6 bg-gradient-to-br from-primary/10 via-white to-sky-50 rounded-3xl shadow-2xl mb-14 border border-primary/10 animate-fade-in overflow-hidden">
      {/* 背景圖層（Aspect Fit） */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: -10 }}>
        <Image
          src="/home_background.jpg"
          alt="背景圖"
          fill
          className="object-contain w-full h-full brightness-110 opacity-70 select-none pointer-events-none"
          priority
        />
        {/* 白色半透明遮罩 */}
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
      </div>
      {/* 內容區塊（左） */}
      <div className="flex-1 flex flex-col items-center text-center space-y-8 z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-primary drop-shadow-xl animate-fade-in-up whitespace-pre-line">
          {content.title}
        </h2>
        <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up delay-200" dangerouslySetInnerHTML={{ __html: content.description }} />
        <Button
          ref={btnRef}
          className="px-8 py-3 text-lg font-semibold shadow-md transition-transform"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          立即體驗
        </Button>
      </div>
      {/* 右側形象圖（桌機顯示） */}
      <div className="hidden md:flex flex-1 justify-center items-center animate-fade-in-up delay-150">
        <div className="relative w-[320px] h-[260px] md:w-[420px] md:h-[340px] bg-white/80 rounded-2xl shadow-2xl border border-primary/10 flex items-center justify-center overflow-hidden">
          <Image
            src="/homeMainImage.jpg"
            alt="首頁主圖"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
          {/* 漂浮彩色裝飾球 */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-300/40 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-primary/20 rounded-full blur-2xl animate-pulse delay-300" />
        </div>
      </div>
    </section>
  );
}
