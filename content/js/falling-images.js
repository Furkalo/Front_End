// вимога 1: падіння зображень у шапці
(function () {
  var layer = document.querySelector(".falling-layer");
  var brandText = document.querySelector(".brand-text");
  if (!layer || !brandText) return;

  var productImages = [
    "../image/WhatsAppImage2025-05-01at7.13.50PM_2.webp",
    "../image/images.jfif",
    "../image/1114.800.jpg",
  ];

  function getCapHeightPx() {
    var rect = brandText.getBoundingClientRect();
    var computed = getComputedStyle(brandText);
    var lineHeight = parseFloat(computed.lineHeight);
    if (!isFinite(lineHeight)) lineHeight = rect.height;
    return Math.max(12, Math.min(rect.height, lineHeight)) * 0.7;
  }

  function spawnOne() {
    if (!layer.isConnected) return;
    var img = document.createElement("img");
    img.className = "falling-item";
    img.alt = "";
    img.decoding = "async";
    img.loading = "lazy";
    img.src = productImages[Math.floor(Math.random() * productImages.length)];

    var cap = getCapHeightPx();
    var maxH = Math.max(16, Math.min(2 * cap, 120));
    var heightPx = (0.7 + Math.random() * 0.3) * maxH;
    img.style.height = heightPx.toFixed(0) + "px";

    var screenWidth = window.innerWidth;
    var left = Math.random() * (screenWidth - 20);
    img.style.left = Math.max(0, left).toFixed(0) + "px";
    var rot = (Math.random() * 16 - 8).toFixed(2) + "deg";
    img.style.setProperty("--rot", rot);

    var duration = 4500 + Math.random() * 3000;
    img.style.animation = "fallDownSoft " + duration.toFixed(0) + "ms linear forwards";

    img.addEventListener("animationend", function () {
      if (img && img.parentNode) img.parentNode.removeChild(img);
    });

    layer.appendChild(img);
  }

  var minInterval = 900;
  var maxInterval = 1700;
  var maxConcurrent = 6;

  function scheduleNext() {
    var delay = minInterval + Math.random() * (maxInterval - minInterval);
    setTimeout(function () {
      if (layer.childElementCount < maxConcurrent) spawnOne();
      scheduleNext();
    }, delay);
  }

  if (document.readyState === "complete") scheduleNext();
  else window.addEventListener("load", scheduleNext, { once: true });
})();


