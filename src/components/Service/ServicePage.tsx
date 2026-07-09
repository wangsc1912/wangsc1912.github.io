import React from "react";
import serviceData from "../../data/service.json";
import ServiceItem from "./ServiceItem";

type Service = {
    category: string;
    year: string;
    content: string;
};

const ServicePage: React.FC = () => {
    // 按 category 分组
    const groupedData = serviceData.reduce<Record<string, Service[]>>(
        (acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        },
        {}
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {Object.entries(groupedData).map(([category, services]) => (
                <div key={category}>
                    {/* category 标题 */}
                    <h2 className="text-lg font-semibold uppercase tracking-wide mb-2">
                        {category}
                    </h2>

                    <ul className="list-disc pl-6 space-y-2">
                        {services.map((service, idx) => (
                            <ServiceItem
                                key={idx}
                                year={service.year}
                                content={service.content}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ServicePage;
