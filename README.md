# 📢 NanoToast

A lightweight and customizable toast notification library for JavaScript with support for **success, error, info, warning, message descriptions, async promise handling**, and **positioning**.

<a href="https://pkg-size.dev/@iamsabbir/nanotoast"><img src="https://pkg-size.dev/badge/install/15506" title="Install size for @iamsabbir/nanotoast"></a>
<a href="https://pkg-size.dev/@iamsabbir/nanotoast"><img src="https://pkg-size.dev/badge/bundle/1819" title="Bundle size for @iamsabbir/nanotoast"></a>

## 🚀 Features

✅ Simple and easy-to-use API  
✅ Supports **success, error, warning, info** toasts  
✅ **Custom duration, position, and closable toasts**  
✅ **Promise-based toasts** (`toast.promise()`)  
✅ **Lightweight (~3KB)** with no dependencies  
✅ **CSS scoped styles** to prevent conflicts  
✅ Works in **Vanilla JS, React, Vue, Alpine.js, etc.**  

---

## 📦 Installation

### Using NPM
```sh
npm install @iamsabbir/nanotoast
```

### Using Yarn
```sh
yarn add @iamsabbir/nanotoast
```

### Using a CDN (No installation required)
```html
<!-- Add the javascript -->
<script src="https://unpkg.com/@iamsabbir/nanotoast/dist/nanotoast.js"></script>
<!-- Or if you want esm module -->
<script src="https://unpkg.com/@iamsabbir/nanotoast/dist/nanotoast.esm.js"></script>

<!-- Add the css -->
<link rel="stylesheet" href="https://unpkg.com/@iamsabbir/nanotoast/dist/nanotoast.css">
```

---

## 📌 Basic Usage


### Import `@iamsabbir/nanotoast`
```js
import toast from "@iamsabbir/nanotoast";
import "@iamsabbir/nanotoast/src/styles.css"; // Ensure you import styles
```

### 🔥 Show a Basic Toast
```js
toast("This is a simple toast!");
```

### 🎨 Success, Error, Warning, and Info Toasts
```js
toast.success("Action was successful!");
toast.error("Something went wrong!");
toast.warning("Warning: Low disk space!");
toast.info("This is an info message.");
```

### 📜 Message with Description
```js
toast.message("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
  closeable: true,
  position: "bottom-right",
});
```

### ⏳ **Promise-based Toasts**
Show a **loading** toast while a promise is in progress, then update it on success/error.
```js
const fetchData = () =>
  new Promise((resolve) => setTimeout(() => resolve({ name: "NanoToast" }), 2000));

toast.promise(fetchData(), {
  loading: "Fetching data...",
  success: (data) => `${data.name} has been loaded!`,
  error: "Failed to fetch data",
});
```

---

## 🎯 Customization Options

### ⏱ Custom Duration
```js
toast.success("Short message", { duration: 1500 }); // 1.5s
toast.error("Longer message", { duration: 5000 });  // 5s
```

### ❌ Closable Toast
```js
toast.info("Click to close this toast", { closeable: true });
```

### 📍 Toast Positions
Toasts can be positioned in **six locations**:

- `top-left`
- `top-right` *(default)*
- `top-center`
- `bottom-left`
- `bottom-right`
- `bottom-center`

```js
toast.success("Top Center", { position: "top-center" });
toast.error("Bottom Center", { position: "bottom-center" });
```

---

## 🎨 Styling & Customization

### Modify Styles via CSS
You can customize styles by overriding the default CSS.
```css
.nanotoast.success {
  background: #28a745; /* Change success color */
}

.nanotoast {
  font-size: 16px;
  border-radius: 8px;
}
```

---

## 💻 Works With Frameworks

### 🌍 **Vanilla JS**
```js
import toast from "nanotoast";
toast.success("Hello, Vanilla JS!");
```

### or if you use regular build from `cdn`

```js
// Basic Toast
NanoToast.toast("This is a simple toast!");

// Success, Error, Warning, and Info Toasts
NanoToast.toast.success("Action was successful!");
NanoToast.toast.error("Something went wrong!");
NanoToast.toast.warning("Warning: Low disk space!");
NanoToast.toast.info("This is an info message.");

// Promise
const fetchData = () =>
  new Promise((resolve) => setTimeout(() => resolve({ name: "NanoToast" }), 2000));

NanoToast.toast.promise(fetchData(), {
  loading: "Fetching data...",
  success: (data) => `${data.name} has been loaded!`,
  error: "Failed to fetch data",
});
```

### ⚛️ **React**
```jsx
import toast from "nanotoast";

const App = () => {
  return <button onClick={() => toast.success("React is awesome!")}>Show Toast</button>;
};
```

### 🔺 **Vue**
```vue
<script setup>
import toast from "nanotoast";

const showToast = () => {
  toast.success("Hello from Vue!");
};
</script>

<template>
  <button @click="showToast">Show Toast</button>
</template>
```

### 🏔 **Alpine.js**
```html
<button x-data @click="toast.success('Alpine.js toast!')">Show Toast</button>
```

---

## 📜 License

```md
MIT License © 2025 [Sabbir Hasan] 🚀
```

---

## 🙌 Support & Contribution

- Found a bug? Open an [issue](https://github.com/sh-sabbir/nanotoast/issues).
- Want to contribute? Fork and submit a pull request!
- Star ⭐ the repo if you find it useful!

---

## 🎉 That's it!
Now you have a **fully documented** and **ready-to-publish** toast notification package! 🚀🎯

