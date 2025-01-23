export default function stickyMenu() {
  const $header = document.querySelector('.site__header');
  $header.classList.toggle('sticky', window.scrollY > 150);
}
