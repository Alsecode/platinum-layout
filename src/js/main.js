// Бургер-меню
const toggle = document.querySelector('#burger-toggle');
const menu = document.querySelector('.header__mobile-nav');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

//Слайдер отзывов
const url = 'src/data/reviews.json';

const response = await fetch(url);
const reviewsData = await response.json();
const reviewsCount = Object.keys(reviewsData).length;

const currentReview = document.querySelector('[data-review-status="current"] > .review__text');
const prevReview = document.querySelector('[data-review-status="prev"] > .review__text');
const nextReview = document.querySelector('[data-review-status="next"] > .review__text');

const controlButtons = document.querySelectorAll('[data-review-id]');

controlButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentNum = btn.dataset.reviewId;
    const prevNum = (currentNum - 2 + reviewsCount) % reviewsCount + 1;
    const nextNum = (currentNum % reviewsCount) + 1;

    console.log(currentNum, prevNum, nextNum);

    const btnClass = 'reviews-section__button_active';
    const prevBtn = document.querySelector(`.${btnClass}`);
    prevBtn.classList.remove(btnClass);
    btn.classList.add(btnClass);

    const reviews = document.querySelectorAll('[data-review-status]');
    reviews.forEach(container => container.classList.add("text-fade-out"));

    setTimeout(function() {
      currentReview.innerHTML = reviewsData[currentNum].text;
      prevReview.innerHTML = reviewsData[prevNum].text;
      nextReview.innerHTML = reviewsData[nextNum].text;
      
      reviews.forEach(container => container.classList.remove("text-fade-out"));
    }, 250);
  }
  )
});