// tailwind.config.js

module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0b6e4f",
                secondary: "#c5e90b",
                background: "#f0f0f0",
                foreground: "#ececec",
                title: "#474747",
                body: "#8e918f",
                shadow: "#000000",
                icon: "#0b6e4f"
            },
            size:{
              stitle:"100px"
            },
            fontFamily: {
          

                extraBold: "Poppins-ExtraBold",
                extraBoldItalic: "Poppins-ExtraBoldItalic",
                extraLight: "Poppins-ExtraLight",
                extraLightItalic: "Poppins-ExtraLightItalic",
                semiBold: "Poppins-SemiBold",
                semiBoldItalic: "Poppins-SemiBoldItalic"
            }
        }
    },
    plugins: []
};
