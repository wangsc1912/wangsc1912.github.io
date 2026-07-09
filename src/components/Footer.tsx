import React from "react";

// Footer component: shared across all pages
const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-8 h-16">
            <span className="max-w-5xl mx-auto px-4 flex flex-col text-xs text-gray-400">&copy; {new Date().getFullYear()} Special thanks to Gelei Xu, Ningzhi Tang, and the Sustainable Computing Lab (SCL) for the website design.</span>
        </footer>
    );
};

export default Footer;
