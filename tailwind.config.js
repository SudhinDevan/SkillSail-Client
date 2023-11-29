/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-bg-color": "#111927",
        "custom-btnColor": "#9FEF00",
        "custom-cyan": "#04D2C8",
        "profile-card-color": "#004787",
        "dashboard-bg": "#d1d5db",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        homeBanner: "80vh",
        "homeBanner-sm": "60vh",
        "screen+50": "150vh",
      },
      fontSize: {
        verySmall: "0.625rem",
        "verySmall-1": "0.725rem",
        veryLarge: "2.5rem",
      },
      colors: {
        "profile-color": "#4d44b5",
        dashboard: "#9FEF00",
      },
    },
  },
  plugins: [],
};
