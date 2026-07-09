import React from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";

// Layout component wraps all pages with MenuBar and Footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <MenuBar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
