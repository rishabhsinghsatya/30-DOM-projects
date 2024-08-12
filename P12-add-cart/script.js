document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "boAt Rockerz 450 Bluetooth Headphone",
      imageUrl: "assets/fl-earbud.webp",
      price: 1499,
      originalPrice: 3990,
      discount: 62,
      rating: 4.3,
      reviews: 6278,
    },
    {
      id: 2,
      name: "Mi Smart Band 5",
      imageUrl: "assets/fl-smartband.webp",
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      rating: 4.5,
      reviews: 1234,
    },
    {
      id: 3,
      name: "Ambrane 10000mAh Power Bank",
      imageUrl: "assets/fl-ambrane.webp",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      rating: 4.1,
      reviews: 3456,
    },
    {
      id: 4,
      name: "Xiaomi Mi Wireless Charger",
      imageUrl: "assets/fl-charger.webp",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      rating: 4.2,
      reviews: 789,
    },
    {
      id: 5,
      name: "TP-Link Tapo C200 Smart Security Camera",
      imageUrl: "assets/fl-camera.webp",
      price: 2799,
      originalPrice: 3499,
      discount: 20,
      rating: 4.4,
      reviews: 2345,
    },
  ];

  const productGrid = document.getElementById("product-grid");
  const cartModal = document.getElementById("cart-modal");
  const closeCartModal = document.getElementById("close-cart-modal");
  const cartItems = document.getElementById("cart-items");
  const dropArea = document.getElementById("drop-area");
  const notificationCount = document.getElementById("notification-count");
  let cart = [];

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.draggable = true;
    productCard.dataset.id = product.id;
    productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
          <div class="product-name">${product.name}</div>
          <div class="product-price">₹${product.price} <span>₹${product.originalPrice}</span></div>
          <div class="product-rating">${product.rating} ★</div>
          <div class="product-reviews">${product.reviews} reviews</div>
      `;
    productCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", product.id);
      e.target.classList.add("dragging");
    });
    productCard.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
    productGrid.appendChild(productCard);
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#406b25";
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#e0e0e0";
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData("text/plain");
    const product = products.find((p) => p.id == productId);
    if (product) {
      cart.push(product);
      notificationCount.textContent = cart.length;
      updateCartModal();
    }
    dropArea.style.backgroundColor = "#e0e0e0";
  });

  document.getElementById("cart-icon").addEventListener("click", () => {
    cartModal.style.display = "flex";
  });

  closeCartModal.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  function updateCartModal() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
              ${item.name} - ₹${item.price} 
              <button class="remove-btn" data-id="${item.id}">Remove</button>
          `;
      cartItems.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        cart = cart.filter((item) => item.id !== productId);
        notificationCount.textContent = cart.length;
        updateCartModal();
      });
    });
  }
});
