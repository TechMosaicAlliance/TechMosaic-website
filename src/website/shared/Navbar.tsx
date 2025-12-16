"use client";

import NavIconSvg, { ArrowRightSvg, LogoSvg } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

const navData = [
  {
    name: "About",
    url: "/about-us",
  },
  {
    name: "Portfolio",
    url: "/portfolio",
    caseStudies: [
      { name: "Our Portfolio", url: "/portfolio" },
      { name: "Case Studies", url: "/casestudy" },
      { name: "blog", url: "/blogs" },
    ],
  },
  {
    name: "What We Do",
    url: "/services",
  },
  {
    name: "Project Management",
    url: "/project-management",
  },
  {
    name: "Careers",
    url: "/career",
  },
];

function NavDropdownMenu({
  item,
  className,
  isSticky = false,
}: {
  item: any;
  className: string;
  isSticky?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative group"
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "relative flex items-center uppercase border-none focus:ring-0 focus:border-none focus-visible:outline-none focus:outline-none text-xs font-semibold tracking-wider transition-all duration-300 px-3 py-2 rounded-lg",
              className,
              "bg-gradient-to-r from-transparent via-transparent to-transparent",
              "hover:from-[#451842]/5 hover:via-[#451842]/10 hover:to-[#451842]/5",
              "hover:shadow-[0_2px_8px_rgba(69,24,66,0.15)]",
              "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:h-[2.5px] after:bg-gradient-to-r after:from-transparent after:via-[#451842] after:to-transparent after:w-0 after:transition-all after:duration-300 after:rounded-full",
              "hover:after:w-[70%]",
              "before:absolute before:inset-0 before:rounded-lg before:border before:border-transparent before:transition-all before:duration-300",
              "hover:before:border-[#451842]/20"
            )}
          >
            <span className="relative z-10">{item.name}</span>
            <ChevronDown className={cn(
              "ml-1.5 h-3 w-3 transition-all duration-300 text-[#451842]/60",
              open && "rotate-180 text-[#451842]"
            )} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-52 mt-3 z-[99999] border border-[#451842]/20 bg-gradient-to-br from-background/98 via-background/95 to-background/98 backdrop-blur-xl rounded-xl p-1.5 shadow-2xl shadow-[#451842]/10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.caseStudies.map((study: any, idx: number) => (
            <DropdownMenuItem 
              key={idx} 
              className="px-3.5 py-2 cursor-pointer rounded-lg focus:bg-gradient-to-r focus:from-[#451842]/10 focus:to-[#451842]/5 hover:bg-gradient-to-r hover:from-[#451842]/10 hover:to-[#451842]/5 transition-all duration-300 group/item focus-visible:outline-none border border-transparent hover:border-[#451842]/10 hover:shadow-sm" 
              asChild
            >
              <Link href={study.url} className="w-full text-xs font-semibold flex items-center justify-between text-foreground/70 hover:text-[#451842] transition-colors duration-300">
                <span className="group-hover/item:translate-x-1.5 transition-transform duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#451842]/0 group-hover/item:bg-[#451842] transition-all duration-300"></span>
                  {study.name}
                </span>
                <span className="opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-[#451842] font-bold transform group-hover/item:translate-x-0.5">→</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}

function MobileMenu({
  className,
  open,
  setOpen,
}: {
  className: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<any>>;
}) {
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetTrigger asChild>
        <Button
          className="md:hidden hover:bg-transparent"
          variant="ghost"
          size="icon"
        >
          <NavIconSvg className={className} />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full z-[99999] pt-[5rem] sm:w-[400px] bg-background/98 backdrop-blur-xl"
      >
        <nav className="flex flex-col h-full items-start gap-1 px-4">
          {navData.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="w-full text-base font-semibold px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#451842]/10 hover:to-[#451842]/5 transition-all duration-300 hover:translate-x-2 hover:text-[#451842] hover:shadow-sm border border-transparent hover:border-[#451842]/10"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className="mt-6 w-full px-4">
            <Button className="w-full bg-gradient-to-r from-[#451842] via-[#451842] to-[#5a1f55] text-white hover:from-[#5a1f55] hover:via-[#451842] hover:to-[#5a1f55] hover:shadow-[0_4px_12px_rgba(69,24,66,0.4)] font-bold tracking-wider transition-all duration-300">
              CONTACT US
              <ArrowRightSvg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    // Check on mount
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "transition-all duration-500 z-[99999] fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto rounded-2xl",
        isSticky
          ? "bg-background/30 backdrop-blur-xl border border-foreground/10 shadow-lg"
          : "bg-background/20 backdrop-blur-lg border border-foreground/5 shadow-md"
      )}
    >
      <div className="flex items-center px-5 lg:px-8 py-3 lg:py-4 justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <LogoSvg className="md:w-[12rem] w-[10rem] fill-foreground transition-opacity duration-300 hover:opacity-80" />
        </Link>
        <div className="hidden md:flex uppercase md:items-center md:gap-0 lg:gap-0.5">
          {navData.map((item, idx) =>
            item.caseStudies ? (
              <NavDropdownMenu
                key={idx}
                item={item}
                isSticky={isSticky}
                className={cn(
                  "text-xs font-semibold tracking-wider",
                  "text-foreground/70 hover:text-[#451842] transition-colors duration-300"
                )}
              />
            ) : (
              <Link
                key={idx}
                href={item.url}
                className={cn(
                  "group relative text-xs px-3 py-2 font-semibold tracking-wider transition-all duration-300 rounded-lg",
                  "text-foreground/70",
                  pathname === item.url
                    ? "text-[#451842] bg-gradient-to-r from-[#451842]/10 via-[#451842]/15 to-[#451842]/10 shadow-[0_2px_8px_rgba(69,24,66,0.15)]"
                    : "hover:text-[#451842] hover:bg-gradient-to-r hover:from-[#451842]/5 hover:via-[#451842]/10 hover:to-[#451842]/5 hover:shadow-[0_2px_8px_rgba(69,24,66,0.1)]"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.url && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] w-[70%] bg-gradient-to-r from-transparent via-[#451842] to-transparent rounded-full" />
                )}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] w-0 bg-gradient-to-r from-transparent via-[#451842] to-transparent transition-all duration-300 group-hover:w-[70%] rounded-full" />
                <span className={cn(
                  "absolute inset-0 rounded-lg border border-transparent transition-all duration-300",
                  pathname === item.url ? "border-[#451842]/20" : "group-hover:border-[#451842]/15"
                )} />
              </Link>
            )
          )}
          <div className="ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-[#451842]/20">
            <Link href="/contact">
              <Button 
                className={cn(
                  "group relative overflow-hidden px-5 py-2 text-xs font-bold tracking-wider rounded-lg",
                  "bg-gradient-to-r from-[#451842] via-[#451842] to-[#5a1f55] text-white",
                  "hover:from-[#5a1f55] hover:via-[#451842] hover:to-[#5a1f55]",
                  "hover:scale-105 hover:shadow-[0_4px_12px_rgba(69,24,66,0.4)]",
                  "active:scale-95 transition-all duration-300",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300",
                  "after:absolute after:inset-0 after:bg-white/0 hover:after:bg-white/5 after:transition-all after:duration-300"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  CONTACT US
                  <ArrowRightSvg className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <MobileMenu open={open} setOpen={setOpen} className="stroke-foreground" />
      </div>
    </nav>
  );
}

export function NavbarVariant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="top-0  bg-background  sticky self-start  border-foreground/10 border-b-[0.05rem] z-[9999]">
        <div className="flex container mx-auto items-center p-4 justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <LogoSvg className="md:w-[12rem] w-[10rem] fill-foreground" />
          </Link>
          <div className="hidden md:flex uppercase md:items-center md:space-x-2 lg:space-x-3">
            {navData.map((item, idx) =>
              item.caseStudies ? (
                <NavDropdownMenu
                  className="text-xs font-semibold tracking-wider transition-colors hover:text-[#451842] text-foreground"
                  key={idx}
                  item={item}
                />
              ) : (
                <Link
                  key={idx}
                  href={item.url}
                  className={cn(
                    "text-xs px-3 py-2 font-semibold tracking-wider transition-all duration-300 rounded-lg relative",
                    pathname === item.url
                      ? "text-[#451842] bg-gradient-to-r from-[#451842]/10 via-[#451842]/15 to-[#451842]/10 shadow-[0_2px_8px_rgba(69,24,66,0.15)] border border-[#451842]/20"
                      : "text-foreground/60 hover:text-[#451842] hover:bg-gradient-to-r hover:from-[#451842]/5 hover:via-[#451842]/10 hover:to-[#451842]/5 hover:shadow-[0_2px_8px_rgba(69,24,66,0.1)]"
                  )}
                >
                  {item.name}
                  {pathname === item.url && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] w-[70%] bg-gradient-to-r from-transparent via-[#451842] to-transparent rounded-full" />
                  )}
                </Link>
              )
            )}
            <Link href="/contact">
              <Button className="border-[#451842]/30 border-2 group px-4 py-2 text-xs font-bold tracking-wider rounded-lg bg-gradient-to-r from-[#451842] via-[#451842] to-[#5a1f55] text-white hover:from-[#5a1f55] hover:via-[#451842] hover:to-[#5a1f55] hover:scale-105 hover:shadow-[0_4px_12px_rgba(69,24,66,0.4)] transition-all duration-300">
                CONTACT US
                <ArrowRightSvg className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </div>
          <MobileMenu open={open} setOpen={setOpen} className="stroke-black" />
        </div>
      </nav>
    </>
  );
}
