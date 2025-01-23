import { Cart } from './shoppingCart.js';
import showMenu from './showMenu.js';
import stickyMenu from './sticky_menu.js';
import purchaseFormValidation from './validationForm.js';

const d = document;

const purchase = new Cart();
const $client = d.getElementById('client'),
  $email = d.getElementById('email'),
  $card = d.getElementById('card'),
  $expDate = d.getElementById('exp'),
  $ccv = d.getElementById('ccv'),
  $processPurchaseBtn = d.getElementById('process-purchase'),
  $purchaseList = d.getElementById('purchase-list');

purchase.calculateTotal();

d.addEventListener('DOMContentLoaded', () => {
  purchase.readLocalStoragePurchase();
  showMenu('.menu__btn', '.site__nav a');
  purchaseFormValidation();
});

$purchaseList.addEventListener('click', (e) => {
  purchase.deleteProduct(e);
});

$processPurchaseBtn.addEventListener('click', (e) => {
  processPurchase(e);
});

window.addEventListener('scroll', () => {
  stickyMenu();
});

function processPurchase(e) {
  e.preventDefault();

  if (purchase.getProductsLS().length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Ooppss...',
      text: 'Please select any product...',
      timer: 3000,
      showConfirmButton: false,
    }).then(function () {
      window.location = 'index.html#products';
    });
  } else if (
    $client.value === '' ||
    $email.value === '' ||
    $card.value === '' ||
    $expDate.value === '' ||
    $ccv.value === ''
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Ooppss...',
      text: 'All the fields are required...',
      timer: 3000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Order Completed Succesfully!!!',
      showConfirmButton: false,
      timer: 2500,
    });
    setTimeout(() => {
      purchase.clearCart();
      window.location = 'index.html';
    }, 5000);
  }
}
