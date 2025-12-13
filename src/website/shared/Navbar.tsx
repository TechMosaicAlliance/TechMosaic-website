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
    name: "Home",
    url: "/",
  },
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
              "relative flex items-center uppercase border-none focus:ring-0 focus:border-none focus-visible:outline-none focus:outline-none text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2.5",
              className,
              "hover:bg-foreground/5",
              "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:bg-[#451842] after:w-0 after:transition-all after:duration-300",
              "hover:after:w-[60%]"
            )}
          >
            {item.name}
            <ChevronDown className={cn(
              "ml-1.5 h-3.5 w-3.5 transition-transform duration-300",
              open && "rotate-180"
            )} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mt-2 z-[99999] border border-foreground/10 bg-background/95 backdrop-blur-xl rounded-lg p-1.5 shadow-lg shadow-foreground/5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.caseStudies.map((study: any, idx: number) => (
            <DropdownMenuItem 
              key={idx} 
              className="px-4 py-2.5 cursor-pointer rounded-md focus:bg-[#451842]/10 hover:bg-[#451842]/10 transition-all duration-200 group/item focus-visible:outline-none" 
              asChild
            >
              <Link href={study.url} className="w-full text-sm font-medium flex items-center justify-between text-foreground/80 hover:text-foreground">
                <span className="group-hover/item:translate-x-1 transition-transform duration-200">{study.name}</span>
                <span className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 text-[#451842] font-semibold">→</span>
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
              className="w-full text-lg font-medium px-4 py-3 hover:bg-foreground/5 transition-all duration-200 hover:translate-x-2 hover:text-[#451842]"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className="mt-6 w-full px-4">
            <Button className="w-full bg-[#451842] text-white hover:bg-[#451842]/90">
              CONTACT US
              <ArrowRightSvg className="ml-2 h-4 w-4" />
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
        "transition-all duration-500 z-[99999]",
        isSticky
          ? "bg-background/80 backdrop-blur-lg border-b border-foreground/10 shadow-sm self-start fixed top-0 left-0 right-0 w-full"
          : "bg-transparent border-b border-foreground/5"
      )}
    >
      <div className="flex container max-w-7xl mx-auto items-center px-5 lg:px-8 py-4 lg:py-5 justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <LogoSvg className="md:w-[14rem] w-[12rem] fill-foreground transition-opacity duration-300 hover:opacity-80" />
        </Link>
        <div className="hidden md:flex uppercase md:items-center md:gap-0.5 lg:gap-1">
          {navData.map((item, idx) =>
            item.caseStudies ? (
              <NavDropdownMenu
                key={idx}
                item={item}
                isSticky={isSticky}
                className={cn(
                  "text-sm font-medium tracking-wide",
                  "text-foreground/70 hover:text-foreground transition-colors duration-300"
                )}
              />
            ) : (
              <Link
                key={idx}
                href={item.url}
                className={cn(
                  "group relative text-sm px-4 py-2.5 font-medium tracking-wide transition-all duration-300",
                  "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                  pathname === item.url
                    ? "text-foreground font-semibold bg-foreground/5"
                    : ""
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.url && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[60%] bg-[#451842]" />
                )}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-[#451842] transition-all duration-300 group-hover:w-[60%]" />
              </Link>
            )
          )}
          <div className="ml-3 lg:ml-5 pl-3 lg:pl-5 border-l border-foreground/10">
            <Link href="/contact">
              <Button 
                className={cn(
                  "group relative overflow-hidden px-7 py-2.5 text-sm font-semibold tracking-wide",
                  "bg-[#451842] text-white",
                  "hover:bg-[#451842]/95 hover:scale-105",
                  "active:scale-95 transition-all duration-300",
                  "before:absolute before:inset-0 before:bg-white/0 hover:before:bg-white/5 before:transition-all before:duration-300"
                )}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  CONTACT US
                  <ArrowRightSvg className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
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
            <LogoSvg className="md:w-[14rem] w-[12rem] fill-foreground" />
          </Link>
          <div className="hidden md:flex uppercase md:items-center md:space-x-4 lg:space-x-6">
            {navData.map((item, idx) =>
              item.caseStudies ? (
                <NavDropdownMenu
                  className="text-xs font-medium transition-colors hover:text-foreground/80 text-foreground"
                  key={idx}
                  item={item}
                />
              ) : (
                <Link
                  key={idx}
                  href={item.url}
                  className={cn(
                    "text-sm px-2 font-medium transition-colors hover:text-foreground",
                    pathname === item.url
                      ? "text-foreground font-semibold border-b-2 border-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
            <Link href="/contact">
              <Button className="border-white border group ">
                CONTACT US
                <ArrowRightSvg className="ml-1 w-4 h-4  transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <MobileMenu open={open} setOpen={setOpen} className="stroke-black" />
        </div>
      </nav>
    </>
  );
}
