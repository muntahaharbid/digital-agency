
// Contact form validation
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  const fields = [
    {
      input: document.getElementById("contactName"),
      error: document.getElementById("nameError"),
      validate: (input) => {
        const value = input.value.trim();
        if (value.length < 2) {
          return "Please enter your name (at least 2 characters).";
        }
        if (value.length > 80) {
          return "Your name must be 80 characters or fewer.";
        }
        return "";
      }
    },
    {
      input: document.getElementById("contactEmail"),
      error: document.getElementById("emailError"),
      validate: (input) => {
        const value = input.value.trim();
        if (!value || input.validity.typeMismatch) {
          return "Please enter a valid email address.";
        }
        if (value.length > 254) {
          return "Your email address is too long.";
        }
        return "";
      }
    },
    {
      input: document.getElementById("contactSubject"),
      error: document.getElementById("subjectError"),
      validate: (input) => {
        const value = input.value.trim();
        if (value.length < 3) {
          return "Please enter a subject (at least 3 characters).";
        }
        if (value.length > 120) {
          return "Your subject must be 120 characters or fewer.";
        }
        return "";
      }
    },
    {
      input: document.getElementById("contactMessage"),
      error: document.getElementById("messageError"),
      validate: (input) => {
        const value = input.value.trim();
        if (value.length < 10) {
          return "Please enter a message of at least 10 characters.";
        }
        if (value.length > 2000) {
          return "Your message must be 2000 characters or fewer.";
        }
        return "";
      }
    }
  ];

  function validateField(field) {
    const message = field.validate(field.input);
    const isValid = message === "";

    field.input.classList.toggle("is-invalid", !isValid);
    field.input.classList.toggle("is-valid", isValid);
    field.input.setAttribute("aria-invalid", String(!isValid));
    field.error.textContent = message || getDefaultMessage(field.input.id);

    return isValid;
  }

  function getDefaultMessage(inputId) {
    const defaults = {
      contactName: "Please enter your name (at least 2 characters).",
      contactEmail: "Please enter a valid email address.",
      contactSubject: "Please enter a subject (at least 3 characters).",
      contactMessage: "Please enter a message of at least 10 characters."
    };

    return defaults[inputId] || "Please check this field.";
  }

  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      if (field.input.classList.contains("is-invalid")) {
        validateField(field);
      }

      formSuccess.classList.add("d-none");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = fields.map((field) => validateField(field));
    const allValid = results.every(Boolean);

    if (!allValid) {
      formSuccess.classList.add("d-none");

      const firstInvalidField = fields.find(
        (field) => !field.input.checkValidity() ||
          field.input.classList.contains("is-invalid")
      );

      if (firstInvalidField) {
        firstInvalidField.input.focus();
      }

      return;
    }

    formSuccess.classList.remove("d-none");
    formSuccess.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}
console.log("Nova Digital JavaScript is working!");


const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
