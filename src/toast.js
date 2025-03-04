/**
 * @fileoverview Toast notification system for displaying messages with various states.
 *
 * This module provides functions to display and update toast notifications.
 * It includes methods for default toasts, success, error, warning, info, and promise-based notifications.
 *
 * @module toast
 * @version 0.0.1
 */

import "./styles.css";

/**
 * Default configuration for nanoToast notifications.
 *
 * @type {Object}
 * @property {string} position - Default position for the toast container.
 * @property {number} duration - Default display duration of a toast in milliseconds.
 * @property {boolean} closeable - Determines if the toast includes a close button.
 *
 * @since 0.0.4
 */
let nanoToastDefaults = {
  position: "top-right",
  duration: 3000,
  closeable: false,
};

/**
 * Duration for fade transitions in milliseconds.
 * @constant {number}
 *
 * @since 0.0.1
 */
const FADE_DUR = 500;

/**
 * DOM element ID for the toast container.
 * @constant {string}
 *
 * @since 0.0.1
 */
const CONTAINER_ID = "nanotoast-container";

/**
 * Reference to the toast container DOM element.
 * @type {HTMLElement}
 *
 * @since 0.0.1
 */
let toastContain;

/**
 * Creates or updates the toast container element.
 *
 * If the container does not exist, it creates a new container with the specified position.
 * If the container already exists, it updates its position class.
 *
 * @param {string} position - Position for the toast container (e.g., "top-right", "bottom-left").
 *
 * @since 0.0.1
 */
function createToastContainer(position) {
  if (!toastContain) {
    toastContain = document.createElement("div");
    toastContain.id = CONTAINER_ID;
    toastContain.classList.add("nanotoast-container", position);
    document.body.appendChild(toastContain);
  } else {
    // Update container position if it already exists
    toastContain.className = `nanotoast-container ${position}`;
  }
}

/**
 * Displays a toast notification.
 *
 * This function creates a toast element with the provided message, type, and options,
 * then animates it into view. It handles auto-dismissal or manual closing based on options.
 *
 * @param {string} message - The primary message to display.
 * @param {string} [type='info'] - The type of toast (e.g., "info", "success", "error", "warning", "loading").
 * @param {Object} [options={}] - Additional options for the toast.
 * @param {number} [options.duration] - How long the toast remains visible (milliseconds).
 * @param {string} [options.position] - Position for the toast container.
 * @param {boolean} [options.closeable] - If true, the toast includes a close button.
 * @param {string} [options.description] - Optional description to display below the main message.
 * @param {string|null} [options.id] - An optional identifier for updating an existing toast.
 *
 * @since 0.0.1
 */
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

  // Add slide-in animation class based on container position
  if (["top-right", "top-center", "top-left"].includes(position))
    EL.classList.add("toastDown");
  if (["bottom-right", "bottom-center", "bottom-left"].includes(position))
    EL.classList.add("toastUp");

  if (id) EL.dataset.id = id; // Attach identifier for later updates

  toastContain.prepend(EL);
  setTimeout(() => EL.classList.add("open"), 10);

  // Automatically dismiss non-closeable toast after the specified duration
  if (!closeable) {
    setTimeout(() => EL.classList.remove("open"), duration);
    setTimeout(() => EL.remove(), duration + FADE_DUR);
  }

  // Attach click event to close button for closeable toast
  if (closeable) {
    EL.querySelector(".nanotoast-close").addEventListener("click", () => {
      EL.classList.remove("open");
      setTimeout(() => EL.remove(), FADE_DUR);
    });
  }
}

/**
 * Generates the HTML content for a toast notification.
 *
 * This function returns a string of HTML that includes an icon, the message,
 * an optional description, and a close button if the toast is closeable.
 *
 * @param {string} message - The main message to display.
 * @param {string} description - An optional description text.
 * @param {string} type - The type of toast (affects icon selection).
 * @param {boolean} closeable - Determines if a close button is included.
 * @returns {string} The HTML string for the toast.
 *
 * @since 0.0.1
 */
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

  const iconHTML = icons[type] || icons.default;
  const htmlParts = [];

  htmlParts.push(`<div class="nanotoast-icon">${iconHTML}</div>`);
  htmlParts.push(`<div class="nanotoast-content">`);
  htmlParts.push(`  <div class="nanotoast-message">${message}</div>`);
  if (description) {
    htmlParts.push(`  <div class="nanotoast-description">${description}</div>`);
  }
  htmlParts.push(`</div>`);
  if (closeable) {
    htmlParts.push(`<button class="nanotoast-close">${icons.close}</button>`);
  }
  return htmlParts.join("");
}

/**
 * Handles a promise by showing a loading toast and updating it on resolution.
 *
 * This function displays a loading toast immediately and then updates the toast with a
 * success or error message depending on whether the promise resolves or rejects.
 *
 * @param {Promise} promise - The promise to monitor.
 * @param {Object} messages - An object with messages for different states.
 * @param {string|function} messages.loading - Message (or function returning a message) to show while pending.
 * @param {string|function} messages.success - Message (or function returning a message) for a resolved promise.
 * @param {string|function} messages.error - Message (or function returning a message) for a rejected promise.
 *
 * @since 0.0.1
 */
function toastPromise(promise, { loading, success, error }) {
  const id = `toast-${Date.now()}`;

  // Show loading toast
  showToast(loading, "loading", { id, closeable: true });

  promise
    .then((data) => {
      const message = typeof success === "function" ? success(data) : success;
      updateToast(id, message, "success");
    })
    .catch((data) => {
      const message = typeof error === "function" ? error(data) : error;
      updateToast(id, message, "error");
    });
}

/**
 * Updates an existing toast notification.
 *
 * Finds the toast element by its identifier and updates its content and styling,
 * then schedules it for removal.
 *
 * @param {string} id - The identifier of the toast to update.
 * @param {string} message - The new message to display.
 * @param {string} type - The new type for the toast (e.g., "success", "error").
 *
 * @since 0.0.1
 */
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

/**
 * Displays a default toast notification.
 *
 * @param {string} message - The message to display.
 * @param {Object} [options={}] - Additional options for the toast.
 * @returns {void}
 */
const toast = (message, options = {}) => showToast(message, "default", options);

// Shortcut methods for displaying different toast types.
toast.success = (message, options = {}) =>
  showToast(message, "success", options);
toast.error = (message, options = {}) => showToast(message, "error", options);
toast.warning = (message, options = {}) =>
  showToast(message, "warning", options);
toast.info = (message, options = {}) => showToast(message, "info", options);
toast.message = (message, options = {}) => showToast(message, "info", options);
toast.promise = toastPromise;

/**
 * Configures default settings for toast notifications.
 *
 * Merges the provided new defaults with the existing configuration.
 *
 * @param {Object} newDefaults - New default settings (e.g., position, duration, closeable).
 * @returns {void}
 */
toast.configure = function (newDefaults = {}) {
  nanoToastDefaults = { ...nanoToastDefaults, ...newDefaults };
};

export default toast;
