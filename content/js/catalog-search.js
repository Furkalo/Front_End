// вимога 3: пошук товарів за назвою
(function () {
  var input = document.getElementById("productSearch");
  var hint = document.getElementById("searchHint");
  var cards = Array.prototype.slice.call(document.querySelectorAll('.product'));
  if (!input || !cards.length) return;

  function normalize(str) {
    return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function getTitle(el) {
    var link = el.querySelector('h3 a');
    return link ? link.textContent.trim() : "";
  }

  function applyFilter(value) {
    var q = normalize(value);
    var visible = 0;
    cards.forEach(function (card) {
      var title = normalize(getTitle(card));
      var match = !q || title.indexOf(q) !== -1;
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });
    if (hint) {
      if (!q) hint.textContent = "";
      else hint.textContent = "Знайдено: " + visible;
    }
  }

  input.addEventListener('input', function () { applyFilter(input.value); });
})();


