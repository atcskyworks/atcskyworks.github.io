// ATC SkyWorks — main.js
(function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Portfolio filters
  var buttons = document.querySelectorAll('.filters button[data-filter]');
  var items = document.querySelectorAll('.pf-item[data-cat]');
  if (buttons.length && items.length) {
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        items.forEach(function (item) {
          item.style.display = (f === 'all' || item.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  // Quote form: compose an email to info@atcskyworks.com (stage 1).
  // Stage 3: replace with a hosted form handler so no mail app is needed.
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = [
        'Name: ' + (d.get('name') || ''),
        'Email: ' + (d.get('email') || ''),
        'Service needed: ' + (d.get('service') || ''),
        'Property address or location: ' + (d.get('location') || ''),
        'Timeline: ' + (d.get('timeline') || ''),
        '',
        'Project details:',
        (d.get('details') || '')
      ];
      var subject = encodeURIComponent('Quote request — ' + (d.get('service') || 'ATC SkyWorks'));
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:info@atcskyworks.com?subject=' + subject + '&body=' + body;
    });
  }
})();
