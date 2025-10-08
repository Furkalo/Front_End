// вимога 5: вертикальна навігація праворуч ≤768px, інакше горизонтальна зверху
(function () {
  var nav = document.querySelector("nav");
  var main = document.querySelector("main");
  if (!nav || !main) return;

  var isVertical = null; // поточний режим

  function applyVertical() {
    if (isVertical) return; // вже вертикально
    nav.dataset.initialStyle = nav.getAttribute("style") || "";
    main.dataset.initialStyle = main.getAttribute("style") || "";

    nav.style.position = "fixed";
    nav.style.top = "0";
    nav.style.right = "0";
    nav.style.bottom = "0";
    nav.style.width = "180px";
    nav.style.height = "100%";
    nav.style.background = "#fff";
    nav.style.boxShadow = "-2px 0 6px rgba(0,0,0,0.08)";
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.padding = "12px";
    nav.style.gap = "8px";
    nav.style.textAlign = "left";
    nav.style.zIndex = "3";

    // посилання вертикально
    nav.querySelectorAll("a").forEach(function (a) {
      a.style.display = "block";
      a.style.padding = "6px 8px";
      a.style.borderRadius = "4px";
      a.style.background = "transparent";
    });

    // прибираємо текстові роздільники "|"
    Array.from(nav.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
    });

    main.style.paddingRight = "196px";

    isVertical = true;
  }

  function applyHorizontal() {
    if (!isVertical && isVertical !== null) return; // вже горизонтально
    // відновлюємо початкові стилі
    nav.setAttribute("style", nav.dataset.initialStyle || "");
    main.setAttribute("style", main.dataset.initialStyle || "");
    nav.querySelectorAll("a").forEach(function (a) {
      a.removeAttribute("style");
    });

    // додаємо роздільники "|"
    var links = Array.from(nav.querySelectorAll("a"));
    nav.textContent = "";
    links.forEach(function (a, idx) {
      nav.appendChild(a);
      if (idx < links.length - 1)
        nav.appendChild(document.createTextNode(" | "));
    });

    isVertical = false;
  }

  function updateLayout() {
    if (window.innerWidth <= 768) {
      applyVertical();
    } else {
      applyHorizontal();
    }
  }

  window.addEventListener("resize", updateLayout);
  window.addEventListener("orientationchange", updateLayout);
  updateLayout();
})();
