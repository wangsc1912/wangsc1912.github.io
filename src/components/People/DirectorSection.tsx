import React from "react";

// DirectorSection: Director photo, name, and bio.
const DirectorSection: React.FC = () => (
    <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto bg-white rounded-lg shadow px-2 md:px-6 py-6">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <div className="flex justify-center">
                    <img
                        src="images/Shaocong.jpg"
                        alt="Shaocong Wang"
                        className="w-32 h-44 rounded-lg object-cover border-gray-400"
                    />
                </div>
                <figcaption className="text-center text-base text-gray-600 mt-2">Dr. Shaocong Wang</figcaption>
                <div className="flex justify-center">
                    <p>scwang [at] pku.edu.cn </p>

                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-stone-500 mb-2">Director</h3>
                <p className="text-gray-700 mb-2 text-sm">
                    Shaocong is currently an Assisitant Professor in the School of Electronic and Computer Engineering at Peking University Shenzhen Graduate School. He was a Postdoctoral Researcher at the University of Notre Dame. He obtained his PhD from the University of Hong Kong. Prior to that, he obtained his Master's degree and Bachelor degree from Chinese Academy of Sciences and Jilin University, respectively.

                </p>
                <p className="text-gray-700 mb-2 text-sm">
                    王少聪，北京大学信息工程学院任助理教授，国家高层次青年人才。他于香港大学获得博士学位，回国前于美国圣母大学担任博士后研究员。研究方向为围绕存算一体系统的软硬件协同设计、电子设计自动化、以及加速器架构设计。以一作及共一身份发表 Nature 子刊多篇，包含 Nature Machine Intelligence 封面文章（1 篇）、Nature Electronics (1 篇)、Nature Computational Science (1 篇)、Nature Communications (2 篇)，以及顶级会议 DAC、VLSI等多篇，三篇文章入选 ESI 高被引论文。他还担任 Nature、Nature Communications 等期刊的审稿人，以及 DAC、ICCAD 等会议的程序委员会成员。
                </p>
            </div>
        </div>
    </section>
);

export default DirectorSection;
