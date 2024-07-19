const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        "c-lightgreen": "#388F36",
        "c-muchlightgreen": "#A7CDA6",
        "c-gray": "#373737",
        "c-pendingblue": "#009EC1",
        "c-pendingyellow": "#E9872B",
        "whitesmoke": "#F5F5F5",
      },

      backgroundImage: {
        "signuprightImage": "url('/src/assets/Rectangle 8.png')"
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

