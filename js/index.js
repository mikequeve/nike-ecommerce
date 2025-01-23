import heroSlider from './heroSlider.js';
import showCart from './showCart.js';
import showMenu from './showMenu.js';
import { Cart } from './shoppingCart.js';
import stickyMenu from './sticky_menu.js';

const d = document;
const shoppingCart = new Cart();
const $products = d.getElementById('products-list');
const $cart = d.getElementById('cart');
const $checkoutBtn = d.getElementById('process-order');

$products.addEventListener('click', (e) => {
  shoppingCart.addProduct(e, '.add-to-cart');
});

$cart.addEventListener('click', (e) => {
  shoppingCart.deleteProduct(e);
});

$checkoutBtn.addEventListener('click', (e) => {
  shoppingCart.processOrder(e);
});

d.addEventListener('DOMContentLoaded', (e) => {
  shoppingCart.readLocalStorage();
  showMenu('.menu__btn', '.site__nav a');
  showCart();
  heroSlider();
});

window.addEventListener('scroll', () => {
  stickyMenu();
});
