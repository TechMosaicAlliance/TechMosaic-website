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
    ],
  },
  {
    name: "Services",
    url: "/services",
  },
  {
    name: "Blog",
    url: "/blogs",
  },
  {
    name: "Careers",
    url: "/career",
  },
];

function NavDropdownMenu({
  item,
  className,
}: {
  item: any;
  className: string;
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
    }, 150); // Small delay to allow moving to dropdown content
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
        className="relative"
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center uppercase text-accent border-none focus:ring-0 focus:border-none focus-visible:outline-none  focus:outline-none text-sm",
              className
            )}
          >
            {item.name}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 mt-2 z-[99999]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.caseStudies.map((study: any, idx: number) => (
            <DropdownMenuItem className="" key={idx} asChild>
              <Link href={study.url} className="w-full ">
                {study.name}
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
        className="w-full z-[99999] pt-[5rem] sm:w-[400px]"
      >
        <nav className="flex flex-col h-full  items-center gap-7">
          {navData.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="text-lg font-medium hover:underline"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className="mt-4">
            <Button className="w-full">
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "transition-all duration-300 z-[99999]  border-primary-foreground/50 border-b-[0.05rem]",
        isSticky
          ? "bg-background  border-foreground/10 border-b-[0.05rem]  self-start fixed top-0 left-0 right-0 w-full"
          : "bg-transparent   border-primary-foreground/40"
      )}
    >
      <div className="flex container max-w-7xl mx-auto items-center p-4 justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {isSticky ? (
            <LogoSvg className="md:w-[14rem] w-[12rem] fill-foreground" />
          ) : (
            <LogoSvg className="md:w-[14rem] w-[12rem]" />
          )}
        </Link>
        <div className="hidden md:flex uppercase md:items-center md:space-x-4 lg:space-x-6">
          {navData.map((item, idx) =>
            item.caseStudies ? (
              <NavDropdownMenu
                key={idx}
                item={item}
                className={cn(
                  isSticky
                    ? "text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                    : "text-sm font-medium transition-colors  hover:text-accent/90 text-accent"
                )}
              />
            ) : (
              <Link
                key={idx}
                href={item.url}
                className={cn(
                  "text-sm px-2 font-medium transition-colors ",
                  isSticky
                    ? pathname === item.url
                      ? "text-foreground font-semibold hover:text-foreground/80 border-b-2 border-foreground"
                      : "text-foreground/60 hover:text-foreground/80"
                    : " hover:text-accent/90 text-accent"
                )}
              >
                {item.name}
              </Link>
            )
          )}
          <Link href="/contact">
            <Button className="group">
              CONTACT US
              <ArrowRightSvg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <MobileMenu open={open} setOpen={setOpen} className="" />
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
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                  key={idx}
                  item={item}
                />
              ) : (
                <Link
                  key={idx}
                  href={item.url}
                  className={cn(
                    "text-sm px-2 font-medium transition-colors hover:text-foreground/80",
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
