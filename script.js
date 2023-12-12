const slides = document.querySelectorAll('.slide');
const sideBar = document.querySelector('.side--bar');
const menu = document.querySelector('.menu img');
const mode = document.querySelector('.mode');
const body = document.querySelector('body');
const header = document.querySelector('header');
const productsContainer = document.querySelector('.products');
const productsSection = document.querySelector('.product-section');
const content = document.querySelector('.content');
const input = document.querySelector('.search--bar input');
const searchIcon = document.querySelector('.search--bar img');
const list = document.querySelector('.list');
const addToCartBtn = document.querySelector('.cart-btn');
const contentSecHeading = document.querySelector('.content-sec-heading');
const loadMoreBtn = document.querySelector('.load-more-btn');
const cartPopup = document.querySelector('.cart-popup');
const logo = document.querySelector('.logo');
const cartNum = document.querySelector('.cart-num');
const cartBtnIcon = document.querySelector('.cart-btn-icon');
const cartSection = document.querySelector('.cart-section');
const productPreviewSection = document.querySelector(
  '.product-preview-section'
);
productPreviewSection.classList.add('hidden');
cartNum.classList.add('hidden');
cartPopup.classList.add('hidden');
cartSection.classList.add('hidden');

let numberOfItems = 12;
let searchItemData = [];

/////////////////////////////   Slider
let counter = 0;
slides.forEach((slide, index) => {
  slide.style.bottom = `${100 * index}%`;
});

const goNext = function () {
  counter >= slides.length - 1 ? (counter = 0) : counter++;
  slideImage();
};
const slideImage = function () {
  slides.forEach(slide => {
    slide.style.transform = `translateY(${100 * counter}%)`;
  });
};

const autoSlide = function () {};
setInterval(() => {
  goNext();
}, 3500);

///////////////////////////   side bar
const showSideBar = function () {
  sideBar.style.right = '0vw';
  mode.style.display = 'block';
};
const hideSideBar = function () {
  sideBar.style.right = '-31vw';
  mode.style.display = 'none';
};

///////////////////////   adding Products in dom
const addProducts = function (products) {
  contentSecHeading.classList.remove('hidden');
  content.classList.remove('hidden');

  products = products.filter(product => product.id <= numberOfItems);
  productsContainer.innerHTML = '';
  products.forEach(pro => {
    let title = pro.title;
    const infoRateingFunc = function (num) {
      // console.log(num);
      num1 = Math.trunc(num);
      let arr = [];
      for (let i = 0; i < num1; i++) {
        arr.push(' <i class="fas fa-star"></i>');
      }
      const halfStar = `${num}`.substr(2);
      arr.join(' ');
      return `${arr.join(' ')} ${
        halfStar <= 90 && halfStar
          ? '<i class="fa-solid fa-star-half"></i>'
          : halfStar > 90
          ? '<i class="fas fa-star"></i>'
          : ''
      } ${num}`;
    };

    const itemRating = infoRateingFunc(pro.rating);

    const html = ` <div class="product" data-id='${pro.id}'>
    <div class="product--img">
      <img src="${pro.thumbnail}" />
    </div>
    <div class="product--info">
      <h3 class="category--name">${
        pro.category.substr(0, 1).toUpperCase() + pro.category.substr(1)
      }</h3>
      <p class="product--title">${title.slice(0)}</p>
      <h4 class="product--price">$${pro.price}</h4>
      <p class="product--rating">${itemRating}</p>
      <!-- Button trigger modal -->
    </div>
  </div>`;

    productsContainer.insertAdjacentHTML('beforeend', html);
  });
  if (products.length < numberOfItems) {
    loadMoreBtn.classList.add('hidden');
  }
  if (products.length === 0) {
    contentSecHeading.classList.add('hidden');
    productsContainer.innerHTML = `<h2>No Data Found!</h2>`;
  }
  showItemDetails(products);
};

/////////////// Auto Suggetion in search bar
const removeItems = function () {
  list.innerHTML = '';
  list.style.display = 'none';
};
const setItem = function (value) {
  input.value = value;
  list.innerHTML = '';
  list.style.display = 'none';
  input.focus();
};
list.style.display = 'none';

suggestion = [];

input.addEventListener('keyup', function (e) {
  removeItems();
  for (i of new Set(suggestion)) {
    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value !== ''
    ) {
      list.style.display = 'block';

      const word = `<li onclick='setItem("${i}")'><b>${i.substr(
        0,
        input.value.length
      )}</b>${i.substr(input.value.length)}</li> `;
      list.insertAdjacentHTML('beforeend', word);
    }
  }
});

/////////////////////    hide products list
const hideList = function (e) {
  if (!e.target.classList.contains('search--bar')) {
    list.innerHTML = '';
    list.style.display = 'none';
  }
};
const homePage = function (data) {
  window.scrollTo(0, 0);
  productPreviewSection.classList.add('hidden');
  header.classList.remove('hidden');
  content.classList.remove('hidden');

  cartPopup.classList.add('hidden');
  productPreviewSection.classList.add('hidden');
  cartSection.classList.add('hidden');
  numberOfItems = 12;
  loadMoreBtn.classList.remove('hidden');
  addProducts(data);
};

////////////////////    event listener
body.addEventListener('click', hideList);
menu.addEventListener('click', showSideBar);
mode.addEventListener('click', hideSideBar);

///////////////////////////   show search data
const showSearchData = function (data) {
  window.scrollTo(0, 0);
  productPreviewSection.classList.add('hidden');

  showItemDetails(data.products);

  content.style.marginTop = '6rem';
  header.classList.add('hidden');
  data.products.forEach(product => {
    if (
      product.title.toLowerCase().includes(input.value.toLowerCase()) ||
      product.category.toLowerCase().includes(input.value.toLowerCase())
    ) {
      searchItemData.push(product);
    }
    // showHideDetails(searchItemData);
    // console.log(searchItemData);
  });

  numberOfItems = data.products.length;
  addProducts(searchItemData);
  contentSecHeading.textContent = 'Your Search Content!';
  searchItemData = [];
};

///////////////////////////   show item details
function showHideDetails(item) {
  window.scrollTo(0, 0);
  console.log(item);
  productPreviewSection.classList.remove('hidden');
  header.classList.add('hidden');
  content.classList.add('hidden');

  ////////////// img section //////////////////
  const mainImg = document.querySelector('.main-img img');
  const subImg1 = document.querySelector('.sub-img-1');
  const subImg2 = document.querySelector('.sub-img-2');
  const subImg3 = document.querySelector('.sub-img-3');
  subImg1.addEventListener('mouseover', function () {
    mainImg.src = item.thumbnail;
  });
  subImg2.addEventListener('mouseover', function () {
    mainImg.src = item.images[0] || item.thumbnail;
  });
  subImg3.addEventListener('mouseover', function () {
    mainImg.src = item.images[1] || item.thumbnail;
  });
  mainImg.src = item.thumbnail;
  subImg1.src = item.thumbnail;
  subImg2.src = item.images[0] || item.thumbnail;
  subImg3.src = item.images[1] || item.thumbnail;

  ///////////////// info section////////////////
  const infoRateingFunc = function (num) {
    // console.log(num);
    num1 = Math.trunc(num);
    let arr = [];
    for (let i = 0; i < num1; i++) {
      arr.push(' <i class="fas fa-star"></i>');
    }
    const halfStar = `${num}`.substr(2);
    arr.join(' ');
    return `${arr.join(' ')} ${
      halfStar <= 90 && halfStar
        ? '<i class="fa-solid fa-star-half"></i>'
        : halfStar > 90
        ? '<i class="fas fa-star"></i>'
        : ''
    } ${num}`;
  };
  const infoTitle = document.querySelector(
    '.product-preview-info .product--title'
  );
  const infoCategoryName = document.querySelector(
    '.product-preview-info .category--name'
  );
  const infoRating = document.querySelector('.product-preview-info .star');
  const infoBrandName = document.querySelector(
    '.product-preview-info .brand-name'
  );
  const infoPrice = document.querySelector(
    '.product-preview-info .product--price'
  );
  const infoStock = document.querySelector('.product-preview-info .item-stock');
  const product = document.querySelector('.product-preview');

  infoTitle.textContent = item.title;
  infoCategoryName.innerHTML = `<div><b>Caterory</b> : ${
    item.category.substr(0, 1).toUpperCase() + item.category.substr(1)
  }</div>`;
  infoRating.innerHTML = infoRateingFunc(item.rating);
  infoPrice.textContent = `$${item.price}`;
  infoBrandName.innerHTML = `<b>Brand : </b> ${item.brand}`;
  infoStock.innerHTML = `<b>Stock : </b> ${item.stock}`;
  product.setAttribute('data-id', item.id);
}
////////////////////   get cards add event listeners
function showItemDetails(data) {
  console.log(data);
  let cards = document.querySelectorAll('.product');
  console.log(cards);
  cards.forEach(card => {
    card.addEventListener('click', e => {
      const clickedCardId = e.target.closest('.product');
      const clicked = data.find(
        pro => pro.id === Number(clickedCardId.dataset.id)
      );
      showHideDetails(clicked);
    });
  });
}
let num = 0;

const addNum = function () {
  cartNum.classList.remove('hidden');
  num++;
  cartNum.textContent = num;
};

function addCartItem(e, data) {
  addNum();
  cartPopup.classList.remove('hidden');
  const { id } = e.target.closest('.product-preview').dataset;
  data.forEach(pro => {
    if (Number(id) === pro.id) {
      const infoRateingFunc = function (num) {
        // console.log(num);
        num1 = Math.trunc(num);
        let arr = [];
        for (let i = 0; i < num1; i++) {
          arr.push(' <i class="fas fa-star"></i>');
        }
        const halfStar = `${num}`.substr(2);
        arr.join(' ');
        return `${arr.join(' ')} ${
          halfStar <= 90 && halfStar
            ? '<i class="fa-solid fa-star-half"></i>'
            : halfStar > 90
            ? '<i class="fas fa-star"></i>'
            : ''
        } ${num}`;
      };

      const html = `
      <div class="cart">
        <div class="cart--img">
          <img src="${pro.thumbnail}" alt="img">
        </div>
        <div class="cart-info">
          <p class="cart--title">${pro.title}</p>
          <p class="cart--brand"><b>Brand :</b> ${pro.brand}</p>
        </div>
        <div class="cart-info--2">
          <p class="cart--price">$${pro.price}</p>
          <p class="cart--rating">${infoRateingFunc(pro.rating)}</p>
        </div>
        <div class="cart-info--3">
          <h3>Quantity</h3>
          <p class="cart--quantity">1</p>
        </div>
    
    </div>`;
      const cartContainer = document.querySelector('.carts');
      cartContainer.insertAdjacentHTML('afterbegin', html);
    }
  });
}
const showCart = function () {
  window.scrollTo(0, 0);
  cartPopup.classList.add('hidden');
  content.classList.add('hidden');
  header.classList.add('hidden');
  productPreviewSection.classList.add('hidden');
  cartSection.classList.remove('hidden');
};
cartPopup.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('cart-popup')) {
    cartPopup.classList.add('hidden');
  }
  if (e.target.classList.contains('gotocart')) {
    showCart();
  }
});
cartBtnIcon.addEventListener('click', () => {
  showCart();
});
///////////////////////////   add to cart

//////////////////     get dat from api
fetch('https://dummyjson.com/products')
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.products.forEach(product =>
      suggestion.push(product.title, product.category)
    );

    loadMoreBtn.addEventListener('click', function () {
      numberOfItems += 12;
      addProducts(data.products);
      if (data.products.length <= numberOfItems) {
        loadMoreBtn.classList.add('hidden');
      }
      showItemDetails(data.products);
    });
    logo.addEventListener('click', () => {
      homePage(data.products);
    });

    addProducts(data.products);
    searchIcon.addEventListener('click', () => showSearchData(data));
    input.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showSearchData(data);
        list.innerHTML = '';
        list.style.display = 'none';
      }
    });
    showItemDetails(data.products);
    addToCartBtn.addEventListener('click', e => {
      addCartItem(e, data.products);
    });
  })
  .catch(error => {
    productsSection.innerHTML = `<h2>${error.message}!</h2> <h1>No Internet connection!</h1>  <button onclick="location.reload()" class="reload-page-btn">Relaod Page</button>`;
    productsSection.style.height = '16rem';
    content.style.minHeight = '16rem';
    // content.style.overflow = 'hidden';
  });
