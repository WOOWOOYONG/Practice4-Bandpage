//購物車商品移除按鈕
const removeCartItemButtons = document.querySelectorAll(".btn-danger");

for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}
//購物車商品數量變更按鈕
const quantityInputs = document.querySelectorAll(".cart-quantity-input");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

//商品加入購物車按鈕
const addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

//結帳後清空購物車更新金額
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

//將商品從購物車移除
function removeCartItem(e) {
  const buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

//購物車數量不可小於1
function quantityChanged(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//將商品加入購物車
function addToCartClicked(e) {
  const button = e.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.querySelector(".shop-item-title").innerText;
  const price = shopItem.querySelector(".shop-item-price").innerText;
  const imageSrc = shopItem.querySelector(".shop-item-image").src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.querySelector(".cart-items");
  const cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }

  const cartRowContents = `
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

//更新購物車金額
function updateCartTotal() {
  const cartItemContainer = document.querySelector(".cart-items");
  const cartRows = cartItemContainer.querySelectorAll(".cart-row");
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
