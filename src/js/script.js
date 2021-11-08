const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const popup_body = document.querySelector(".popup__body");
const popContent = document.querySelector(".popup__content ");
const formContainer = document.querySelector(".popup__form");
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".input");
const popup_btn = document.querySelector(".popup__button");
const order_btn = document.querySelector(".book_now");
const burger = document.querySelector(".icon_menu");
const menu = document.querySelector(".watch_and_book");
const close_on_mobile = document.querySelector(".close_on_mobile");


popup_body.addEventListener("click", closePopup);
order_btn.addEventListener("click", openPopup);
popup_btn.addEventListener("click", closePopup);
form.addEventListener("input", checkInput);
close_on_mobile.addEventListener("click", closePopup);

burger.addEventListener("click", (e) => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  if (burger.classList.contains("active")) {
    body.style.position = "fixed";
    body.style.overflowY = "scroll";
  } else {
    body.style.position = "static";
    body.style.overflowY = "visible";
  }
});

function checkInput() {
  let disabled = false;

  for (let i of inputs) {
    console.log(i);
    const res = validateData(i);
    if (!res) {
      disabled = true;
      break;
    }
  }

  if (disabled) {
    popup_btn.setAttribute("disabled", "disabled");
  } else {
    popup_btn.removeAttribute("disabled");
  }
}

function openPopup() {
  burger.classList.remove("active");
  menu.classList.remove("active");
  popup.classList.add("open");
  popup_btn.setAttribute("disabled", "disabled");
  document.body.style.position = "fixed";
  body.style.overflowY = "scroll";
  document.body.style.top = `-${window.scrollY}px`;
}

function validateData(input) {
  let validated = false;

  if (input.type === "text") {
    const res = input.value.trim().match(/^[\p{L}'-]+(\s{1}[\p{L}'-]+)*$/u);
    if (res) {
      isSuccess(input);
      validated = true;
    } else {
      isError(input, "Please enter your name");
      validated = false;
    }
  }
  if (input.type === "email") {
    const res = isEmail(input.value.trim());
    if (res) {
      isSuccess(input);
      validated = true;
    } else {
      isError(input, "Invalid email");
      validated = false;
    }
  }
  return validated;
}

function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isSuccess(input) {
  const formControl = input.parentElement;

  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
  formControl.classList.add("success");
}

function isError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  if (formControl.classList.contains("success")) {
    formControl.classList.remove("success");
  }

  small.textContent = message;
  formControl.classList.add("error");
}

function closePopup() {
  inputs.forEach(function (input) {
    input.value = "";
    const formControl = input.parentElement;
    if (formControl.classList.contains("error")) {
      formControl.classList.remove("error");
    }
    if (formControl.classList.contains("success")) {
      formControl.classList.remove("success");
    }
  });
  popup.classList.remove("open");

  const scrollY = document.body.style.top;
  body.style.position = "static";
  body.style.overflowY = "visible";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  popup_btn.removeAttribute("disabled");
}

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  grabCursor: true,
  speed: 950,

  freeMode: {
    enabled: true,
    sticky: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 605px
    605: {
      slidesPerView: 1,
    },
    // when window width is >= 993px
    993: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    dynamicBullets: true,
  },
});

const animItems = document.querySelectorAll(".anim_item");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  setTimeout(() => {
    animOnScroll();
  }, 500);
}

function animOnScroll() {
  for (let i = 0; i < animItems.length; i++) {
    let anim_item = animItems[i];
    const animItemHeight = anim_item.offsetHeight;
    const animItemOffset = offset(anim_item).top;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (
      pageYOffset > animItemOffset - animItemPoint &&
      pageYOffset < animItemOffset + animItemHeight
    ) {
      anim_item.classList.add("animated");
    } else {
      if (!anim_item.classList.contains("anim_no_hide")) {
        anim_item.classList.remove("animated");
      }
    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

