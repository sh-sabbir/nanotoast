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

function getIcon(icon) {
  return `<svg viewBox="0 0 24 24">${icon}</svg>`;
}

function getToastHTML(message, description, type, closeable) {
  const icons = {
    close: `<path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06"/>`,
    default: `<path fill-rule="evenodd" clip-rule="evenodd" d="M18.22 2.441a.75.75 0 0 1 1.059.059 9.75 9.75 0 0 1 2.35 4.875.75.75 0 0 1-1.478.25A8.25 8.25 0 0 0 18.16 3.5a.75.75 0 0 1 .058-1.059Zm-12.418.001a.75.75 0 0 1 .056 1.06 8.25 8.25 0 0 0-1.999 4.125.75.75 0 0 1-1.478-.254 9.75 9.75 0 0 1 2.361-4.875.75.75 0 0 1 1.06-.056Zm1.425 1.785A6.75 6.75 0 0 1 18.75 9v.742a8.25 8.25 0 0 0 2.117 5.536.75.75 0 0 1-.299 1.206 24.752 24.752 0 0 1-4.828 1.234 3.75 3.75 0 1 1-7.48 0 24.074 24.074 0 0 1-4.832-1.245.75.75 0 0 1-.296-1.205A8.25 8.25 0 0 0 5.25 9.75V9a6.75 6.75 0 0 1 1.977-4.773Zm2.525 13.672c1.495.136 3 .136 4.496 0a2.25 2.25 0 1 1-4.496 0ZM12 3.75A5.25 5.25 0 0 0 6.75 9v.75a9.75 9.75 0 0 1-1.81 5.66c1.375.44 2.805.748 4.289.925 1.84.221 3.701.221 5.542 0h.001c1.455-.171 2.89-.48 4.286-.92a9.75 9.75 0 0 1-1.808-5.676V9A5.25 5.25 0 0 0 12 3.75Z" fill="currentColor"/>`,
    success: `<path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0m13.36-1.81a.75.75 0 1 0-1.22-.88l-3.24 4.53-1.62-1.62a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.1z"/>`,
    error: `<path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0M12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/>`,
    warning: `<path clip-rule="evenodd" fill-rule="evenodd" d="M9.4 3a3 3 0 0 1 5.2 0l7.35 12.75a3 3 0 0 1-2.6 4.5H4.65a3 3 0 0 1-2.6-4.5zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/>`,
    info: `<path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0m8.7-1.44a1.5 1.5 0 0 1 2.13 1.7l-.7 2.84.03-.02a.75.75 0 0 1 .67 1.34l-.04.02a1.5 1.5 0 0 1-2.12-1.7l.7-2.84-.03.02a.75.75 0 1 1-.67-1.34zM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/>`,
    loading: `<path opacity=".1" d="m16.657 2.495-2.28 3.949a.72.72 0 1 0 1.246.72l2.28-3.95a.72.72 0 1 0-1.246-.72Z" fill="#555"/><path opacity=".2" d="m20.785 6.096-3.949 2.28a.72.72 0 1 0 .72 1.248l3.95-2.28a.72.72 0 1 0-.72-1.248Z" fill="#555"/><path opacity=".3" d="M22.56 11.28H18a.72.72 0 0 0 0 1.44h4.56a.72.72 0 0 0 0-1.44ZM21.505 16.657l-3.949-2.28a.72.72 0 1 0-.72 1.246l3.95 2.28a.72.72 0 1 0 .72-1.246Z" fill="#555"/><path opacity=".4" d="m17.904 20.785-2.28-3.949a.72.72 0 1 0-1.248.72l2.28 3.95a.72.72 0 1 0 1.248-.72Z" fill="#555"/><path opacity=".5" d="M12.72 22.56V18a.72.72 0 0 0-1.44 0v4.56a.72.72 0 0 0 1.44 0Z" fill="#555"/><path opacity=".6" d="m7.344 21.505 2.28-3.949a.72.72 0 0 0-1.248-.72l-2.28 3.95a.72.72 0 0 0 1.248.72Z" fill="#555"/><path opacity=".7" d="m3.215 17.904 3.949-2.28a.72.72 0 1 0-.72-1.248l-3.95 2.28a.72.72 0 1 0 .72 1.248Z" fill="#555"/><path opacity=".8" d="M1.44 12.72H6a.72.72 0 0 0 0-1.44H1.44a.72.72 0 0 0 0 1.44ZM2.495 7.344l3.949 2.28a.72.72 0 0 0 .72-1.248l-3.95-2.28a.72.72 0 0 0-.72 1.248Z" fill="#555"/><path opacity=".9" d="m6.096 3.215 2.28 3.949a.72.72 0 1 0 1.248-.72l-2.28-3.95a.72.72 0 0 0-1.248.72Z" fill="#555"/>`,
  };

  const iconHTML = icons[type] || icons.default;
  const htmlParts = [];

  htmlParts.push(`<div class="nanotoast-icon">${getIcon(iconHTML)}</div>`);
  htmlParts.push(`<div class="nanotoast-content">`);
  htmlParts.push(`  <div class="nanotoast-message">${message}</div>`);
  if (description) {
    htmlParts.push(`  <div class="nanotoast-description">${description}</div>`);
  }
  htmlParts.push(`</div>`);
  if (closeable) {
    htmlParts.push(`<button class="nanotoast-close">${getIcon(icons.close)}</button>`);
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
