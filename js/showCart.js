export default function showCart() {
  const d = document;

  let $cartBtn = d.querySelector('.cart__btn');

  $cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    d.querySelector('.cart__content').classList.toggle('active');
  });
}
