const bubbleTransitionOnIntersect = () => {
  const sections = document.querySelectorAll("section");
  const bubble = document.querySelector("nav .bubble");
  const gradients = [
    "linear-gradient(to right top, #02AAB0, #00CDAC)",
    "linear-gradient(to right top, #314755, #26a0da)",
    "linear-gradient(to right top, #e52d27, #b31217)"
  ];
  const colors = ["#00CDAC", "#26a0da", "#e52d27"];

  const options = {
    threshold: 0.7
  };
  const observer = new IntersectionObserver(navCheck, options);

  function navCheck(entries) {
    entries.forEach(entry => {
      const className = entry.target.className;
      const activeAnchor = document.querySelector(`[data-page=${className}]`);
      const gradientIndex = entry.target.getAttribute("data-index");
      console.log(gradientIndex);
      const coords = activeAnchor.getBoundingClientRect();
      const directions = {
        height: coords.height,
        width: coords.width,
        top: coords.top,
        left: coords.left
      };
      if (entry.isIntersecting) {
        bubble.style.setProperty("height", `${directions.height}px`);
        bubble.style.setProperty("width", `${directions.width}px`);
        bubble.style.setProperty("top", `${directions.top}px`);
        bubble.style.setProperty("left", `${directions.left}px`);
        bubble.style.background = colors[gradientIndex];
      }
    });
  }

  sections.forEach(section => {
    observer.observe(section);
  });
};

const navigation = () => {
  let mainNavLinks = document.querySelectorAll("nav ul li a");

  mainNavLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const className = event.target.getAttribute("data-page");
      const target = document.querySelector(`section.${className}`);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      window.scrollTo({
        behaviour: "smooth",
        left: 0,
        top: target.offsetTop - 0.1 * window.innerHeight
      });
    });
  });
};

bubbleTransitionOnIntersect();
navigation();
