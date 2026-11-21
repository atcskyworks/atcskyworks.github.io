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

  // Portfolio lightbox: click a photo for a full-screen preview.
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbTitle = lb.querySelector('.lb-cap strong');
    var lbText = lb.querySelector('.lb-cap span');
    var lbCount = lb.querySelector('.lb-count');
    var lbItems = document.querySelectorAll('.pf-item');
    var current = [];
    var idx = 0;
    function visibleItems() {
      return Array.prototype.filter.call(lbItems, function (it) { return it.style.display !== 'none'; });
    }
    function show(i) {
      idx = (i + current.length) % current.length;
      var item = current[idx];
      var img = item.querySelector('img.photo');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      var h = item.querySelector('.pf-body h3');
      var p = item.querySelector('.pf-body p');
      lbTitle.textContent = h ? h.textContent : '';
      lbText.textContent = p ? p.textContent : '';
      lbCount.textContent = (idx + 1) + ' / ' + current.length;
    }
    lbItems.forEach(function (item) {
      var img = item.querySelector('img.photo');
      if (!img) return;
      img.addEventListener('click', function () {
        current = visibleItems();
        show(current.indexOf(item));
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
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
