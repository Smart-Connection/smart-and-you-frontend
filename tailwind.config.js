/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    "bg-green-500",
    "bg-gray-300",
    "lg:grid-cols-2",
    "grid-cols-2"
  ]
}
