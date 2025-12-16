"use client";
import React, { useEffect, useState } from "react";
import gsap, { Power4, Power2 } from "gsap";

interface Stat {
  value: string;
  label: string;
}

// Helper function to parse stat value and determine suffix
const parseStatValue = (value: string): { number: number; suffix: string } => {
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) {
    return {
      number: parseInt(trimmed.replace('%', '')) || 0,
      suffix: '%'
    };
  } else if (trimmed.endsWith('+')) {
    return {
      number: parseInt(trimmed.replace('+', '')) || 0,
      suffix: '+'
    };
  } else {
    // Try to parse as number
    const num = parseInt(trimmed) || 0;
    return { number: num, suffix: '' };
  }
};

export default function OurResults() {
  const [stats, setStats] = useState<Stat[]>([
    { value: "72+", label: "Happy Clients" },
    { value: "128+", label: "Projects" },
    { value: "57+", label: "Team Members" },
    { value: "99%", label: "Satisfaction" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats", {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.stats && data.stats.length > 0) {
            setStats(data.stats.map((stat: any) => ({
              value: stat.value,
              label: stat.label,
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep default stats on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    // Wait a bit for DOM to update
    setTimeout(() => {
      gsap.utils.toArray("h1[data-count]").forEach((el: any) => {
        const countValue = el.getAttribute("data-count");
        if (countValue) {
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: countValue,
              duration: 2,
              ease: "power1.out",
              snap: { innerText: 1 },
              onUpdate: () => {
                el.innerText = Math.ceil(el.innerText);
              },
            }
          );
        }
      });
    }, 100);
  }, [isLoading, stats]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50/50">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h1
          data-animation="fade-in-y"
          className="text-xl font-medium md:font-normal opacity-0 mb-8 lg:mb-12"
        >
          Our results in numbers
        </h1>

        <div className="flex flex-wrap gap-8 lg:gap-20 justify-center items-center">
          {stats.map((stat, idx) => {
            const { number, suffix } = parseStatValue(stat.value);
            return (
              <div
                key={idx}
                className="flex flex-shrink-0 gap-1 flex-col w-fit items-center"
              >
                <div className="flex items-center">
                  <h1 data-count={number} className="text-3xl lg:text-5xl font-medium">
                    {number}
                  </h1>
                  {suffix && (
                    <p className={`text-2xl lg:text-4xl font-medium text-primary ${suffix === '%' ? '' : ''}`}>
                      {suffix}
                    </p>
                  )}
                </div>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
