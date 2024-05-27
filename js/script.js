function helloWorld() {
  setTimeout(function () {
    alert("Hello, world!");
  }, 5000);
}

const submitButton = document.querySelector(".submit-button");

// textArea limitation

const textArea = document.querySelector("#comments");

textArea.addEventListener("input", symbolsToGo);

function symbolsToGo() {
  const maxLength = textArea.getAttribute("maxlength");
  const toGoCounter = document.querySelector(".comments__symbols-left span");
  let symbolCounter = textArea.value.length;
  let symbolToGo = maxLength - symbolCounter;

  toGoCounter.innerHTML = symbolToGo;

  if (symbolToGo == 0) {
    document
      .querySelector(".comments__symbols-left")
      .classList.add("red-blinking");
  } else {
    document
      .querySelector(".comments__symbols-left")
      .classList.remove("red-blinking");
  }
}

// sex validation

const sexRadios = document.getElementsByName("sex");
const sexErrorMeaasge = document.querySelector(".sex__error-message");

submitButton.addEventListener("click", function (event) {
  let isSelected = false;

  for (let i = 0; i < sexRadios.length; i++) {
    if (sexRadios[i].checked) {
      isSelected = true;
      break;
    }
  }

  if (!isSelected) {
    event.preventDefault();
    sexErrorMeaasge.style.display = "block";
  } else {
    sexErrorMeaasge.style.display = "none";
  }
});

sexRadios.forEach((element) => {
  element.addEventListener("focus", function () {
    sexErrorMeaasge.style.display = "none";
  });
});

// name validation

const nameField = document.querySelector(".input__name");
const nameErrorMessage = document.querySelector(".name__error-message");

submitButton.addEventListener("click", function nameFieldValidation(event) {
  if (nameField.value == "") {
    event.preventDefault();
    nameErrorMessage.style.display = "block";
  }
});
nameField.addEventListener("focus", function () {
  nameErrorMessage.style.display = "none";
});

// surname validation

const surnameField = document.querySelector(".input__surname");
const surnameErrorMessage = document.querySelector(".surname__error-message");

submitButton.addEventListener("click", function surnameFieldValidation(event) {
  if (surnameField.value == "") {
    event.preventDefault();
    surnameErrorMessage.style.display = "block";
  }
});
surnameField.addEventListener("focus", function () {
  surnameErrorMessage.style.display = "none";
});

// license validation
const confirmationUpload = document.querySelector(".confirmation__upload");

submitButton.addEventListener("click", function (event) {
  if (!confirmationUpload.files[0]) {
    event.preventDefault();
    document
      .getElementById("license-notification")
      .classList.add("red-blinking");
  }
});

confirmationUpload.addEventListener("change", function () {
  let uploadedFile = confirmationUpload.files[0];
  let uploadedFileUrl = URL.createObjectURL(uploadedFile);

  document
    .getElementById("license-notification")
    .classList.remove("red-blinking");

  confirmationUpload.parentElement.insertAdjacentHTML(
    "afterbegin",
    `<div class='confirmation__image'>
      <img class='confirmation__image_file' src='${uploadedFileUrl}' alt='file' title='${uploadedFile.name}'>
    </div>`
  );
});

// !!!login validation

const loginField = document.querySelector(".login__input");
const loginErrorMessage = document.querySelector(".login__error-message");
const loginIncorrectMessage = document.querySelector(
  ".login__incorrect-message"
);

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

submitButton.addEventListener("click", function (event) {
  if (loginField.value == "") {
    event.preventDefault();
    loginErrorMessage.style.display = "block";
  } else if (!validateEmail(loginField.value)) {
    event.preventDefault();
    loginIncorrectMessage.style.display = "block";
  }
});

loginField.addEventListener("focus", function () {
  loginErrorMessage.style.display = "none";
  loginIncorrectMessage.style.display = "none";
});

// password validation

const passwordField = document.querySelector(".password__input");
const passwordErrorMessage = document.querySelector(".password__error-message");

submitButton.addEventListener("click", function (event) {
  if (passwordField.value == "") {
    event.preventDefault();
    passwordErrorMessage.style.display = "block";
  }
});
passwordField.addEventListener("focus", function () {
  passwordErrorMessage.style.display = "none";
});

// breweries modal

const modalBrewery = document.querySelector(".modal__wrap");
const buttonBrewrey = document.querySelector(".brewery__button");
const closeButton = document.querySelector(".close");

function showModal() {
  modalBrewery.style.display = "block";
}
function closeModal() {
  modalBrewery.style.display = "none";
}

buttonBrewrey.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
window.onclick = function (event) {
  if (event.target == modalBrewery) {
    modalBrewery.style.display = "none";
  }
};

const breweryContainer = document.querySelector(".modal__content");

buttonBrewrey.addEventListener("click", function () {
  fetch("https://api.openbrewerydb.org/v1/breweries")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomBrewery = data[randomIndex];
      displayBrewery(randomBrewery);
    })
    .catch((error) => {
      console.error("Error fetching brewery data:", error);
    });
});

function displayBrewery(brewery) {
  breweryContainer.innerHTML = "";

  const breweryElement = document.createElement("div");
  breweryElement.classList.add("brewery");

  const nameElement = document.createElement("h2");
  nameElement.classList.add("brewery__heading");
  nameElement.textContent = brewery.name;
  breweryElement.appendChild(nameElement);

  const typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${brewery.brewery_type}`;
  breweryElement.appendChild(typeElement);

  const cityElement = document.createElement("p");
  cityElement.textContent = `City: ${brewery.city}`;
  breweryElement.appendChild(cityElement);

  const stateElement = document.createElement("p");
  stateElement.textContent = `State: ${brewery.state}`;
  breweryElement.appendChild(stateElement);

  if (brewery.website_url) {
    const websiteElement = document.createElement("a");
    websiteElement.href = brewery.website_url;
    websiteElement.textContent = "Visit Website";
    websiteElement.target = "_blank";
    breweryElement.appendChild(websiteElement);
  }

  breweryContainer.appendChild(breweryElement);
}

// promocodes

const addPromocodeButton = document.querySelector(".promocodes__button_add");
const removePromocodeButton = document.querySelector(
  ".promocodes__button_remove"
);
const promocodeList = document.querySelector(".promocodes__list");
removePromocodeButton.style.display = "none";

function addPromocode(event) {
  event.preventDefault();
  // const promocodeItem = document.createElement('li');
  // promocodeItem.innerHTML = "<input type='text' class='promocode__item' placeholder='enter your promocode'></input>";
  // promocodeList.appendChild(promocodeItem);
  promocodeList.insertAdjacentHTML(
    "beforeend",
    `<li>
      <input type='text' class='promocode__item' placeholder='enter your promocode'></input>
    </li>`
  );
  buttonAddToggle();
  buttonRemoveToggle();
}

function removePromocode(event) {
  event.preventDefault();
  if (promocodeList.children.length > 0) {
    promocodeList.lastChild.remove();
    buttonAddToggle();
    buttonRemoveToggle();
  }
}

function buttonRemoveToggle() {
  if (promocodeList.children.length === 0) {
    removePromocodeButton.setAttribute("disabled", "");
  } else {
    removePromocodeButton.removeAttribute("disabled", "");
  }
  if (promocodeList.children.length > 0) {
    removePromocodeButton.style.display = "inline-block";
  }
}

function buttonAddToggle() {
  if (promocodeList.children.length < 3) {
    addPromocodeButton.removeAttribute("disabled", "");
  } else {
    addPromocodeButton.setAttribute("disabled", "");
  }
}

addPromocodeButton.addEventListener("click", addPromocode);
removePromocodeButton.addEventListener("click", removePromocode);

buttonAddToggle();
buttonRemoveToggle();
