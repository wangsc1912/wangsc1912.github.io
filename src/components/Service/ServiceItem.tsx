import React from "react";

interface ServiceItemProps {
    year: string;
    content: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ year, content }) => (
    <div className="text-gray-800">
        {year && (
            <span className="inline-block bg-stone-200 text-stone-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded whitespace-nowrap">
                {year}
            </span>
        )}
        {content}
    </div>
);

export default ServiceItem;
