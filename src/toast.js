import "./styles.css";

const FADE_DUR = 500;
const DEFAULT_DISPLAY_DUR = 3000;
const CONTAINER_ID = "nanotoast-container";
let toastContain;

// Default positions for toasts
const DEFAULT_POSITION = "top-center";

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
    description = "",
    duration = DEFAULT_DISPLAY_DUR,
    position = DEFAULT_POSITION,
    closeable = false,
    id = null,
  } = options;

  createToastContainer(position);

  const EL = document.createElement("div");
  EL.classList.add("nanotoast", type);
  EL.innerHTML = getToastHTML(message, description, type, closeable);

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
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
    loading: "⏳",
  };

  return `
    <div class="nanotoast-icon">${icons[type] || "🔔"}</div>
    <div class="nanotoast-content">
      <div class="nanotoast-message">${message}</div>
      ${description ? `<div class="nanotoast-description">${description}</div>` : ""}
    </div>
    ${closeable ? '<button class="nanotoast-close">✖</button>' : ""}
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

    setTimeout(() => toastEl.classList.remove("open"), DEFAULT_DISPLAY_DUR);
    setTimeout(() => toastEl.remove(), DEFAULT_DISPLAY_DUR + FADE_DUR);
  }
}

// === EXPORT TOAST ===
const toast = (message, options = {}) => showToast(message, "info", options);
toast.success = (message, options = {}) => showToast(message, "success", options);
toast.error = (message, options = {}) => showToast(message, "error", options);
toast.warning = (message, options = {}) => showToast(message, "warning", options);
toast.info = (message, options = {}) => showToast(message, "info", options);
toast.message = (message, options = {}) => showToast(message, "info", options);
toast.promise = toastPromise;

export default toast;
