const EMAIL_ENDPOINT_URL =
  "https://www.greatfrontend.com/api/projects/challenges/newsletter";

// Initial get DOM elements
const formEl = document.getElementById("form");
const emailInputEl = document.getElementById("email");
const errorMessageEl = document.querySelector(".footer__form-error");
const toastNotificationEl = document.querySelector(".toast__notification");
const toastNotificationStatusEl = document.querySelector(
  ".toast__notification-status"
);
const toastNotificationMessageEl = document.querySelector(
  ".toast__notification-message"
);
const copyRightsYearEl = document.querySelector(".footer__copyright-year");

// Set current year
const year = new Date().getFullYear();
copyRightsYearEl.textContent = year;

// submit email
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = emailInputEl.value.trim();

  if (validateEmail(email)) {
    clearMessage();
    submitEmail(email);
  } else {
    emailInputEl.classList.add("email--error");
  }
});

function validateEmail(email) {
  const requiredEmailMsg = "Email address is required.";
  const invalidEmailMsg = "Please enter a valid email address.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    errorMessageEl.textContent = requiredEmailMsg;
    return false;
  }

  if (!emailRegex.test(email)) {
    errorMessageEl.textContent = invalidEmailMsg;
    return false;
  }
  return true;
}

async function submitEmail(email) {
  try {
    const response = await fetch(EMAIL_ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    displayNotification("Success", data.message);
  } catch (error) {
    console.error("Failed to submit email", error);
    displayNotification("Error");
  }
}

//Alert Notification
function displayNotification(status, message = "") {
  const baseErrorMessage =
    "Failed to subscribe. Please ensure your email is correct or try again later.";

  toastNotificationStatusEl.textContent = status;
  toastNotificationMessageEl.textContent = message || baseErrorMessage;

  toastNotificationEl.classList.add(
    `toast__notification--${status.toLowerCase()}`
  );
  toastNotificationEl.style.opacity = "1";

  setTimeout(() => {
    toastNotificationEl.style.opacity = "0";
  }, 4000);
}

function clearMessage() {
  errorMessageEl.textContent = "";
  emailInputEl.value = "";
  emailInputEl.classList.remove("email--error");
}
