import "./styles.css";

let nanoToastDefaults = {
  position: "top-right",
  duration: 3000,
  closeable: false,
};

const FADE_DUR = 500;
const CONTAINER_ID = "nanotoast-container";
let toastContain;

function createToastContainer(position) {
  if (!toastContain) {
    toastContain = document.createElement("div");
    toastContain.id = CONTAINER_ID;
    toastContain.classList.add("nanotoast-container", position);
    document.body.appendChild(toastContain);
  } else {
    // Update position if already exists
    toastContain.className = `nanotoast-container ${position}`;
  }
}

function showToast(message, type = "info", options = {}) {
  const {
    duration = nanoToastDefaults.duration,
    position = nanoToastDefaults.position,
    closeable = nanoToastDefaults.closeable,
    description = "",
    id = null,
  } = options;

  createToastContainer(position);

  const EL = document.createElement("div");
  EL.classList.add("nanotoast", type);
  EL.innerHTML = getToastHTML(message, description, type, closeable);

  if (["top-right", "top-center", "top-left"].includes(position))
    EL.classList.add("toastDown");
  if (["bottom-right", "bottom-center", "bottom-left"].includes(position))
    EL.classList.add("toastUp");

  if (id) EL.dataset.id = id; // Attach ID for updating

  toastContain.prepend(EL);
  setTimeout(() => EL.classList.add("open"), 10);

  if (!closeable) {
    setTimeout(() => EL.classList.remove("open"), duration);
    setTimeout(() => EL.remove(), duration + FADE_DUR);
  }

  if (closeable) {
    EL.querySelector(".nanotoast-close").addEventListener("click", () => {
      EL.classList.remove("open");
      setTimeout(() => EL.remove(), FADE_DUR);
    });
  }
}

function getToastHTML(message, description, type, closeable) {
  const icons = {
    close: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06"/></svg>`,
    default: `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14.86 17.08a24 24 0 0 0 5.45-1.3A9 9 0 0 1 18 9.74V9A6 6 0 0 0 6 9v.75a9 9 0 0 1-2.31 6.02q2.6.97 5.45 1.31m5.72 0a24 24 0 0 1-5.72 0m5.72 0a3 3 0 1 1-5.72 0M3.12 7.5A9 9 0 0 1 5.3 3m13.42 0a9 9 0 0 1 2.17 4.5"/></svg>`,
    success: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0m13.36-1.81a.75.75 0 1 0-1.22-.88l-3.24 4.53-1.62-1.62a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.1z"/></svg>`,
    error: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0M12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/></svg>`,
    warning: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M9.4 3a3 3 0 0 1 5.2 0l7.35 12.75a3 3 0 0 1-2.6 4.5H4.65a3 3 0 0 1-2.6-4.5zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/></svg>`,
    info: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0m8.7-1.44a1.5 1.5 0 0 1 2.13 1.7l-.7 2.84.03-.02a.75.75 0 0 1 .67 1.34l-.04.02a1.5 1.5 0 0 1-2.12-1.7l.7-2.84-.03.02a.75.75 0 1 1-.67-1.34zM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/></svg>`,
    loading: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#555" height="6" opacity=".1" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".2" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".3" rx="3" ry="3" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".3" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".4" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".6" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".7" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".8" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".8" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/><rect fill="#555" height="6" opacity=".9" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/></svg>`,
  };

  return `
    <div class="nanotoast-icon">${icons[type] || "🔔"}</div>
    <div class="nanotoast-content">
      <div class="nanotoast-message">${message}</div>
      ${
        description
          ? `<div class="nanotoast-description">${description}</div>`
          : ""
      }
    </div>
    ${
      closeable
        ? `<button class="nanotoast-close">${icons["close"]}</button>`
        : ""
    }
  `;
}

// === PROMISE TOAST HANDLER ===
function toastPromise(promise, { loading, success, error }) {
  const id = `toast-${Date.now()}`;

  // Show loading toast
  showToast(loading, "loading", { id, closeable: false });

  promise
    .then((data) => {
      const message = typeof success === "function" ? success(data) : success;
      updateToast(id, message, "success");
    })
    .catch(() => {
      updateToast(id, error, "error");
    });
}

// === UPDATE TOAST FUNCTION ===
function updateToast(id, message, type) {
  const toastEl = document.querySelector(`.nanotoast[data-id="${id}"]`);
  if (toastEl) {
    toastEl.innerHTML = getToastHTML(message, "", type, false);
    toastEl.classList.remove("loading");
    toastEl.classList.add(type);

    setTimeout(
      () => toastEl.classList.remove("open"),
      nanoToastDefaults.duration
    );
    setTimeout(() => toastEl.remove(), nanoToastDefaults.duration + FADE_DUR);
  }
}

// === EXPORT TOAST ===
const toast = (message, options = {}) => showToast(message, "default", options);
toast.success = (message, options = {}) =>
  showToast(message, "success", options);
toast.error = (message, options = {}) => showToast(message, "error", options);
toast.warning = (message, options = {}) =>
  showToast(message, "warning", options);
toast.info = (message, options = {}) => showToast(message, "info", options);
toast.message = (message, options = {}) => showToast(message, "info", options);
toast.promise = toastPromise;

/**
 * Configure default toast settings (position, duration, closeable, etc.).
 * @param {Object} newDefaults - The new default settings to merge.
 */
toast.configure = function (newDefaults = {}) {
  // Merge any new defaults
  nanoToastDefaults = { ...nanoToastDefaults, ...newDefaults };
};

export default toast;
