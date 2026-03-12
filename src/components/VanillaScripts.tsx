"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VanillaScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Intersection Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Timeout ensures DOM is fully painted after Next.js hydration
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(".fade-in-up");
      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Smooth scroll for anchor links
    const handleAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#") && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector(".navbar")?.clientHeight || 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick as EventListener);
    });

    // 4. Property Filtering Logic
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    const handleFilterClick = function (this: HTMLButtonElement) {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const cardCategory = htmlCard.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          htmlCard.style.display = "block";
          setTimeout(() => {
            htmlCard.style.opacity = "1";
            htmlCard.style.transform = "translateY(0)";
          }, 50);
        } else {
          htmlCard.style.opacity = "0";
          htmlCard.style.transform = "translateY(20px)";
          setTimeout(() => {
            htmlCard.style.display = "none";
          }, 300);
        }
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", handleFilterClick as EventListener);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick as EventListener);
      });
      filterBtns.forEach((btn) => {
        btn.removeEventListener("click", handleFilterClick as EventListener);
      });
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
