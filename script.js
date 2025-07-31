document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const scrollSetups = [
    {
      wrapperId: "history-scroll-wrapper",
      slideClass: "history-slide",
      type: "horizontal"
    },
    {
      wrapperId: "algorithm-scroll-wrapper",
      slideClass: "algorithm-slide",
      type: "vertical"
    },
    {
      wrapperId: "info-scroll-wrapper",
      slideClass: "info-slide",
      type: "horizontal"
    }
  ];

  scrollSetups.forEach(({ wrapperId, slideClass, type }) => {
    const container = document.getElementById(wrapperId);
    const slides = container.querySelectorAll(`.${slideClass}`);

    // Skip if no slides found
    if (!slides.length) return;

    const isHorizontal = type === "horizontal";

    // Scroll animation
    const animation = gsap.to(slides, {
      xPercent: isHorizontal ? -100 * (slides.length - 1) : 0,
      yPercent: !isHorizontal ? -100 * (slides.length - 1) : 0,
