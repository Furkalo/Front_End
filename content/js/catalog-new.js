// вимога 2
(function () {
  var NEW_TEXT = "Новинка!";
  var nodes = document.querySelectorAll('.product h3[data-new] .new-badge');
  if (!nodes.length) return;

  nodes.forEach(function (badge, idx) {
    var i = 0;
    function type() {
      if (i <= NEW_TEXT.length) {
        badge.textContent = NEW_TEXT.slice(0, i);
        i++;
        setTimeout(type, 60 + Math.random() * 80);
      }
    }
    setTimeout(type, idx * 250);
  });
})();


