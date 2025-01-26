const $productsList = document.querySelector('.product__container');
const $purchaseList = document.getElementById('purchase-list');

export class Cart {
  addProduct(e, cartBtn) {
    e.preventDefault();
    if (e.target.matches(`${cartBtn} *`)) {
      const product = e.target.parentElement.parentElement.parentElement;
      this.readProductData(product);
    }
  }

  readProductData(product) {
    const productInfo = {
      img: product.querySelector('img').src,
      title: product.querySelector('h3').textContent,
      price: product.querySelector('.product__card-price span').textContent,
      id: product.querySelector('a').getAttribute('data-id'),
      quantity: 1,
    };

    let productsLS;
    productsLS = this.getProductsLS();
    productsLS.forEach(function (productLS) {
      if (productLS.id === productInfo.id) {
        productsLS = productLS.id;
      }
    });
    if (productsLS === productInfo.id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product already added...',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      this.insertToCart(productInfo);
    }
  }

  insertToCart(product) {
    const $row = document.createElement('article');
    $row.innerHTML = `
    <aside class="d-flex product__row">
      <img src="${product.img}" alt="sneaker image" width="50px">
      <h4>${product.title}</h4>
      <p>$ ${product.price}</p>
      <a data-id="${product.id}"><img src="/assets/logos/delete-icon.png" alt="" class="delete__product" ></a>
    </aside>
    `;
    $productsList.appendChild($row);
    this.saveProductLS(product);
  }

  deleteProduct(e) {
    e.preventDefault();
    let $product, $productId;
    if (e.target.classList.contains('delete__product')) {
      e.target.parentElement.parentElement.parentElement.remove();
      $product = e.target.parentElement.parentElement;
      $productId = $product.querySelector('a').getAttribute('data-id');
    }
    this.deleteProductLS($productId);
    this.calculateTotal();
  }

  // Local Storage
  saveProductLS(product) {
    let products;
    products = this.getProductsLS();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProductsLS() {
    let productLS;
    if (localStorage.getItem('products') === null) {
      productLS = [];
    } else {
      productLS = JSON.parse(localStorage.getItem('products'));
    }
    return productLS;
  }

  deleteProductLS($productID) {
    let productsLS;
    productsLS = this.getProductsLS();
    productsLS.forEach(function (productLS, index) {
      if (productLS.id === $productID) {
        productsLS.splice(index, 1);
      }
    });
    localStorage.setItem('products', JSON.stringify(productsLS));
  }

  readLocalStorage() {
    let productsLS = this.getProductsLS();
    productsLS.forEach(function (product) {
      const $row = document.createElement('article');
      $row.innerHTML = `
        <aside class="d-flex product__row">
          <img src="${product.img}" alt="sneaker image" width="50px">
          <h4>${product.title}</h4>
          <p>$${product.price}</p>
          <a data-id="${product.id}"><img src="/assets/logos/delete-icon.png" alt="" class="delete__product"></a>
        </aside>
      `;
      $productsList.appendChild($row);
    });
  }

  readLocalStoragePurchase() {
    let productsLS;
    productsLS = this.getProductsLS();
    productsLS.forEach(function (product) {
      const $row = document.createElement('div');
      $row.innerHTML = `
        <aside class="d-flex product__row">
          <img src="${product.img}" alt="sneaker image" width="50px">
          <h4>${product.title}</h4>
          <p>$${product.price}</p>
          <a data-id="${product.id}"><img src="/assets/logos/delete-icon.png" alt="" class="delete__product"></a>
        </aside>
      `;
      $purchaseList.appendChild($row);
    });
  }

  clearCart() {
    localStorage.clear();
  }

  processOrder(e) {
    e.preventDefault();
    if (this.getProductsLS().length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty, please add some product...',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      location.href = 'cart.html';
    }
  }

  calculateTotal() {
    let productLS = this.getProductsLS();
    let $deliveryForm = document.getElementById('delivery-form');
    let total = 0,
      subtotal = 0,
      $delivery = 0;

    for (let i = 0; i < productLS.length; i++) {
      let element = Number(productLS[i].price * productLS[i].quantity);
      total += element;
    }

    $deliveryForm.addEventListener('change', function () {
      let $selected = this.options[$deliveryForm.selectedIndex];
      if (!$selected.value === '5') {
        $delivery = 0;
      } else {
        $delivery = Number($selected.value);
        document.getElementById('delivery').innerHTML = '$ ' + $delivery;
        document.getElementById('total').value = '$ ' + (total + $delivery).toFixed(2);
      }
    });

    subtotal = parseFloat(total).toFixed(2);
    document.getElementById('subtotal').innerHTML = '$ ' + subtotal;
    document.getElementById('delivery').innerHTML = '$ ' + $delivery;
    document.getElementById('total').value = '$ ' + (total + $delivery).toFixed(2);
  }
}
