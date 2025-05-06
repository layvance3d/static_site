"use client";

import React, { useState, useRef } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/SheetComponent";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/AccordionComponent";
import { Button } from "@/components/ui/ButtonComponent";
import { usePathname, useSearchParams } from "next/navigation";

// NavbarView 導覽列元件
export default function NavbarView() {
  // 購物車商品種類數量
  const cartItemTypes = 3;

  // 導覽選單資料
  const menu = [
    { label: "首頁", link: "/" },
    { label: "所有商品", link: "/products" },
    {
      label: "線材品牌",
      children: [
        { label: "拓竹", link: "/products?brand=拓竹" },
        { label: "天瑞", link: "/products?brand=天瑞" },
        { label: "愛麗茲", link: "/products?brand=愛麗茲" },
      ],
    },
    {
      label: "線材材質",
      children: [
        { label: "PLA", link: "/products?material=PLA" },
        { label: "PETG", link: "/products?material=PETG" },
        { label: "ABS", link: "/products?material=ABS" },
      ],
    },
  ];

  // 依據路徑與 query 判斷當前頁面
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = "首頁";
  if (pathname.startsWith("/products")) {
    const brand = searchParams.get("brand");
    const material = searchParams.get("material");
    if (brand) currentPage = brand;
    else if (material) currentPage = material;
    else currentPage = "所有商品";
  }

  // 桌面版子選單展開狀態與延遲收合控制
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 控制延遲收合

  // 處理滑鼠移到主選項或子選單時，清除延遲收合
  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  // 處理滑鼠離開主選項與子選單時，延遲 1 秒收合
  const handleDropdownLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 1000);
  };

  // 桌面版選單渲染
  const renderDesktopMenu = () => (
    <nav className="hidden md:flex flex-1 justify-center gap-6 relative">
      {menu.map((item) =>
        item.children ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleDropdownEnter(item.label)}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`font-medium px-4 py-2 rounded transition-colors whitespace-nowrap
                ${openDropdown === item.label ? "text-primary" : ""}
                ${currentPage === item.label ? "bg-primary/10 shadow-[0_2px_10px_0_rgba(0,0,0,0.08)] text-primary" : "hover:text-primary"}`}
              tabIndex={0}
              type="button"
              onFocus={() => handleDropdownEnter(item.label)}
              onBlur={handleDropdownLeave}
            >
              {item.label}
            </button>
            {/* 子選單：只在 hover/focus 時顯示，絕對定位於主選項下方 */}
            {openDropdown === item.label && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[140px] w-max bg-white rounded shadow z-30"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <ul>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a
                        href={child.link}
                        className="block px-4 py-2 hover:bg-gray-100 rounded whitespace-nowrap"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <a
            key={item.label}
            href={item.link}
            className={`font-medium px-4 py-2 rounded transition-colors whitespace-nowrap
              ${currentPage === item.label ? "bg-primary/10 shadow-[0_2px_10px_0_rgba(0,0,0,0.08)] text-primary" : "hover:text-primary"}`}
          >
            {item.label}
          </a>
        )
      )}
    </nav>
  );

  // 手機版導覽列渲染
  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden ml-2">
          {/* 漢堡圖示 */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6 pb-0 font-bold text-xl border-b">LAYVANCE 3D</div>
        <Accordion type="multiple" className="w-full">
          {/* 所有商品選項（手機版） */}
          <div>
            <a
              href="/products"
              className={`block px-6 py-3 text-base font-medium ${currentPage === "所有商品" ? "text-primary" : "hover:text-primary"}`}
            >
              所有商品
            </a>
          </div>
          {menu.filter(item => item.label !== "所有商品").map((item) =>
            item.children ? (
              <AccordionItem key={item.label} value={item.label}>
                <AccordionTrigger className="px-6 py-3 text-base font-medium">
                  <a href={item.children[0].link.split('?')[0]} className="w-full text-left block">{item.label}</a>
                </AccordionTrigger>
                <AccordionContent className="px-0">
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.link}
                          className="block px-10 py-2 text-sm hover:bg-gray-100"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ) : (
              item.label !== "首頁" && (
                <div key={item.label}>
                  <a
                    href={item.link}
                    className={`block px-6 py-3 text-base font-medium ${currentPage === item.label ? "text-primary" : "hover:text-primary"}`}
                  >
                    {item.label}
                  </a>
                </div>
              )
            )
          )}
        </Accordion>
        {/* 關閉按鈕 */}
        <SheetClose asChild>
          <Button variant="outline" className="w-11/12 mx-auto mt-6">關閉選單</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="fixed top-0 left-0 w-full flex items-center px-6 py-4 border-b bg-white shadow-md z-10">
      {/* LOGO 置左 */}
      <h1 className="text-2xl font-bold flex-1">LAYVANCE 3D</h1>
      {/* 桌面版選單（md 以上顯示） */}
      {renderDesktopMenu()}
      {/* 購物車按鈕置右 */}
      <div className="flex-1 flex justify-end items-center">
        <button className="relative flex items-center px-4 py-2 rounded hover:bg-gray-100 transition">
          {/* 購物車 SVG 圖示 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 106 0m-6 0V6.75A2.25 2.25 0 019.75 4.5h4.5A2.25 2.25 0 0116.5 6.75v7.5m-9 0h12.218c.978 0 1.711-.958 1.509-1.915l-1.2-5.387A1.125 1.125 0 0118.922 6H6.477" />
          </svg>
          {/* 商品種類數量徽章 */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
            {cartItemTypes}
          </span>
        </button>
        {/* 手機版漢堡選單（md 以下顯示） */}
        {renderMobileMenu()}
      </div>
    </header>
  );
}
