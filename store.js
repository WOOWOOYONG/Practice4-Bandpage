const removeCartItemButtons = document.querySelectorAll(".btn-danger");

for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

const quantityInputs = document.querySelectorAll(".cart-quantity-input");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

//加入購物車按鈕
const addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

document
  .querySelector(".btn-purchase")
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("Thank you for your purchase");
  const cartItems = document.querySelector(".cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(e) {
  let button = e.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.querySelector(".shop-item-title").innerText;
  let price = shopItem.querySelector(".shop-item-price").innerText;
  let imageSrc = shopItem.querySelector(".shop-item-image").src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

//將商品加入購物車
function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }

  let cartRowContents = `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src="${imageSrc}" width="100" height="100" >
  <span class="cart-item-title">${title}</span>
</div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger cart-quantity-button" type="button">REMOVE</button>
</div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".cart-items");
  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.querySelector(".cart-price");
    let quantityElement = cartRow.querySelector(".cart-quantity-input");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerText = `$ ${total}`;
}
