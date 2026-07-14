import React from "react";

// Footer component: shared across all pages
const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-8 min-h-16">
            <div className="max-w-5xl mx-auto px-4 flex flex-col gap-1 text-xs text-gray-400">
                <span>
                    Special thanks to{" "}
                    <a
                        href="https://gracellgg.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-600"
                    >
                        Gelei Xu
                    </a>
                    ,{" "}
                    <a
                        href="https://www.nztang.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-600"
                    >
                        Ningzhi Tang
                    </a>
                    , and the {" "}
                    <a
                        href="https://scl-nd.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-600"
                    >
                        SCL
                    </a>
                    {" "} for the website design.
                </span>
                <span id="busuanzi_container_site_pv">
                    Views: <span id="busuanzi_value_site_pv" /> · Visitors:{" "}
                    <span id="busuanzi_value_site_uv" />
                </span>
            </div>
        </footer>
    );
};

export default Footer;
