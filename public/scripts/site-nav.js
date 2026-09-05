const opener = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
const closer = document.querySelector('.menu-close');
if (opener && menu && closer) {
  opener.hidden = false;
  const close = () => menu.close();
  opener.addEventListener('click', () => { menu.showModal(); opener.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; closer.focus(); });
  closer.addEventListener('click', close);
  menu.addEventListener('close', () => { opener.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; opener.focus(); });
  menu.addEventListener('click', event => { if (event.target === menu) close(); });
  menu.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const items = Array.from(menu.querySelectorAll('a[href],button:not([disabled])'));
    const first = items[0]; const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  const desktop = matchMedia('(min-width: 1100px)');
  desktop.addEventListener('change', () => { if (desktop.matches && menu.open) close(); });
}
