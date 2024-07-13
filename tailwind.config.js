import { BiBorderRadius } from "react-icons/bi";
import { TbBackground } from "react-icons/tb";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        21: "21px",
        18: "18px",
        20: "20px",
        25: "25px",
      },
      fontFamily: {
        futura: "Futura XBlk BT",
        gesstwo: "GE SS Two",
        geDinkum: "GE Dinkum",
      },
      colors: {
        navColor: "#1E1E1E",
        logoutBtnColor: "#D84B4B",
        PageNotFoundcolor: "#A0AAB5",
        customGray: "rgba(239, 239, 239, 1)",
        borderColor: "rgba(41, 41, 41, 0.21)",
        tableColor: "#ECECEC",
        btnColor: "rgba(76, 175, 80, 1)",
        iconColor: "rgba(11, 106, 14, 1)",
        borderColor:'rgba(0, 0, 0, 0.68)'
      },
      borderRadius: {
        '12px': '12px',
        '6px': '6px',
      },
      width: {
        '250px': '250px',
        '520px': '520px',
      },
    },
  },
  plugins: [],
};
