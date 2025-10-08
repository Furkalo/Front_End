// вимога 4: tooltip праворуч поля "Детально" керований JS
(function () {
  var wrap = document.querySelector('.details-wrap');
  var area = document.querySelector('textarea[name="details"]');
  var tip = document.getElementById('details-tip');
  if (!wrap || !area || !tip) return;

  var TIP_TEXT = 'Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка';
  tip.textContent = '';

  function activate() {
    wrap.classList.add('details-active');
    tip.textContent = TIP_TEXT;
  }
  function deactivate() {
    wrap.classList.remove('details-active');
    tip.textContent = '';
  }

  area.addEventListener('mouseenter', activate);
  area.addEventListener('focus', activate);
  area.addEventListener('mouseleave', deactivate);
  area.addEventListener('blur', deactivate);
})();


