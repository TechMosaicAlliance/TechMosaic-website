"use client";
import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAddNewsletter } from "../hooks";

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { mutate, isPending } = useAddNewsletter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      acf: {
        email: formData.email,
      },
    });
    // Reset form after successful submission
    setFormData({ email: "" });
  };

  return (
    <div id="newsletter-section" className="pt-[6rem] pb-[4rem] mt-[4rem]">
      <section className="max-w-5xl mx-auto">
        <div className="relative w-full pb-12 lg:pb-16 flex overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between w-full px-6 lg:px-12 py-12 lg:py-16 z-10">
            <div className="flex-1 max-w-2xl">
              <div className="space-y-5">
                <div className="inline-block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    Newsletter
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight text-neutral-900">
                  Subscribe To Our
                  <br /> Newsletter{" "}
                  <span className="playfair-display italic text-primary"> & Join 2K+</span>
                  <br />
                  <span className="playfair-display italic text-primary">
                    Community of Superstars
                  </span>
                </h2>
                <p className="text-neutral-700 text-base lg:text-lg leading-relaxed max-w-lg">
                  Stay updated with the latest insights, tips, and industry news delivered straight to your inbox.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[440px]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <label htmlFor="blog-newsletter-email" className="text-neutral-900 text-sm font-semibold block">
                    Email Address
                  </label>
                  <div className="flex items-center relative group">
                    <input
                      id="blog-newsletter-email"
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="youremail@domain.com"
                      className="w-full px-5 py-4 pr-16 bg-white border-2 border-neutral-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-neutral-900 placeholder-neutral-400 shadow-sm hover:border-primary/50"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="absolute right-2 p-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                      aria-label="Subscribe to newsletter"
                    >
                      {isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

