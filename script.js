const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  setCookie('theme', isDark ? 'dark' : 'light', 365);
});
const burger = document.querySelector(".nav__burger")
const nav = document.querySelector(".nav")
burger.addEventListener("click", ()=>{
  burger.classList.toggle("open")
  nav.classList.toggle("open")
})
const slides = document.querySelectorAll(".carousel__slide")
let currentSlide = 0
const showSlide = i=>{
  slides.forEach(s=> s.classList.remove("active"))
  slides[i].classList.add("active")
}
document.querySelector(".carousel__prev").addEventListener("click", ()=>{
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
})
document.querySelector(".carousel__next").addEventListener("click", ()=>{
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
})
setInterval(()=>{
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}, 5000)
const testimonials = document.querySelectorAll(".testimonial__card")
let currentTest = 0
const showTestimonial = i=>{
  testimonials.forEach(t=> t.classList.remove("active"))
  testimonials[i].classList.add("active")
}
document.querySelector(".testimonials__prev").addEventListener("click", ()=>{
  currentTest = (currentTest - 1 + testimonials.length) % testimonials.length
  showTestimonial(currentTest)
})
document.querySelector(".testimonials__next").addEventListener("click", ()=>{
  currentTest = (currentTest + 1) % testimonials.length
  showTestimonial(currentTest)
})
setInterval(()=>{
  currentTest = (currentTest + 1) % testimonials.length
  showTestimonial(currentTest)
}, 7000)

const header = document.querySelector('.header');
const headerHeight = () => header.getBoundingClientRect().height;

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    // Calculate where to scroll (so your section isn't hidden under the header)
    const topPos = target.getBoundingClientRect().top
                 + window.pageYOffset
                 - headerHeight();

    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });

    // close mobile menu
    if (burger.classList.contains('open')) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
});


function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*24*60*60*1000)
    .toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

function getCookie(name) {
  // returns the cookie value or null
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );
  return match ? match[1] : null;
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = getCookie('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  const firstProduct = document.querySelector('#product-details .detail');
  if (firstProduct) firstProduct.classList.add('active');

  const firstArticle = document.querySelector('#article-details .article-detail');
  if (firstArticle) firstArticle.classList.add('active');

  const subscribeForm = document.querySelector('.subscribe__form');
  subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('u submitted');
  });
});

const productBtns = document.querySelectorAll('.product__btn');
productBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.closest('.product__card')
      .querySelector('.product__name')
      .textContent
      .toLowerCase()
      .replace(/\s+/g, '-');
    document.querySelectorAll('#product-details .detail')
      .forEach(d => d.classList.remove('active'));
    const detail = document.getElementById(`detail-${name}`);
    if (detail) detail.classList.add('active');
    document.getElementById('product-details')
      .scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.articles__item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const detailId = item.dataset.detail;

    document.querySelectorAll('#article-details .article-detail')
      .forEach(d => d.classList.remove('active'));

    const detail = document.getElementById(detailId);
    if (detail) detail.classList.add('active');

    document.getElementById('article-details')
      .scrollIntoView({ behavior: 'smooth' });
  });
});

const pricingCards = document.querySelectorAll('.pricing__card');
pricingCards.forEach(card => {
  card.addEventListener('click', () => {
    pricingCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});
