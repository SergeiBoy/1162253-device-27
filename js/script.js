
var button = document.querySelector(".our-contacts .write-us");

var popup = document.querySelector(".modal-message");
var close = popup.querySelector(".close-cross");

var form = popup.querySelector(".message-form");
var personName = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var text = popup.querySelector("[name=text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

var mapButton = document.querySelector(".our-contacts .map-address");
var mapPopup = document.querySelector(".modal-map-wrapper");
var mapInPopup = mapPopup.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".close-cross-map");


try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

button.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-message-close");
  popup.offsetWidth = popup.offsetWidth;
  popup.classList.add("modal-message-show");

  if (storageName) {
    personName.value = storageName;
    email.focus();
  }
  if (storageEmail) {
    email.value = storageEmail;
    text.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-message-show");
  popup.classList.remove("modal-message-error");
  popup.offsetWidth = popup.offsetWidth;
  popup.classList.add("modal-message-close");
  personName.required = false;
  email.required = false;
});

form.addEventListener("submit", function (evt) {
  if (!personName.value || !email.value) {
    evt.preventDefault();
      if (!personName.value) {
        personName.required = true;
      }
      if (!email.value) {
        email.required = true;
      }
    popup.classList.remove("modal-message-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-message-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", personName.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-message-show")) {
      popup.classList.remove("modal-message-show");
      popup.classList.remove("modal-message-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-message-close");
      personName.required = false;
      email.required = false;
    }
    if (mapPopup.style.display === "flex") {
      mapPopup.style.display = "none";
    }
  }
});


mapButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.style.display = "flex";
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.style.display = "none";
});

function initMap() {
  var uluru = {lat: 55.686995, lng: 37.529564};
  var map = new google.maps.Map(mapInPopup, {zoom: 17, center: uluru});
  var marker = new google.maps.Marker({position: uluru, map: map});
};

var script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3BpFqzWP_ymtXwTlGLCK0ujLH9BBKCJo&callback=initMap";
script.async = true;
script.defer = true;
document.body.appendChild(script);


