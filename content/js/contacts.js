// вимога 1 (допоміжний скрипт контактів на головній)
(function () {
  var contacts = document.getElementById("contacts");
  if (!contacts) return;
  var enhanceTimer = null;
  function within(node, ancestor) {
    while (node) {
      if (node === ancestor) return true;
      node = node.parentNode;
    }
    return false;
  }
  document.addEventListener("selectionchange", function () {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    var anchorNode = sel.anchorNode;
    var focusNode = sel.focusNode;
    if (within(anchorNode, contacts) || within(focusNode, contacts)) {
      clearTimeout(enhanceTimer);
      enhanceTimer = setTimeout(function () {
        contacts.classList.add("enhanced");
      }, 2000);
    }
  });
  document.addEventListener("mouseup", function () {
    setTimeout(function () {
      contacts.classList.remove("enhanced");
    }, 800);
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") contacts.classList.remove("enhanced");
  });
})();


