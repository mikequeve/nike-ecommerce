const d = document;
export default function showMenu(menuBtn, navLink) {
  let $siteMenu = d.querySelector('.site__nav');
  d.addEventListener('click', (e) => {
    if (e.target.matches(menuBtn) || e.target.matches(`${menuBtn} *`)) {
      $siteMenu.classList.toggle('visible');
    }

    if (e.target.matches(navLink)) {
      $siteMenu.classList.remove('visible');
    }
  });
}
