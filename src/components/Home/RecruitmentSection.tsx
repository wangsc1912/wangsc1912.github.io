import React from "react";

const RecruitmentSection: React.FC = () => (
    <section className="mb-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow px-4 md:px-8 py-8">
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Recruitment</h2>
            <div className="text-base text-gray-700 space-y-4">
                <p>
                    We are looking for highly self-motivated Ph.D./Master's students and research assistants interested in memory-centric AI systems, computing-in-memory technologies, hardware/software co-design, and efficient AI hardware.
                    Feel free to reach out with a CV, transcripts, and publications if any.
                </p>

                <p>We are also actively recruiting Postdocs, with an annual salary of RMB 300,000. Outstanding candidates may apply for Boya Postdoctoral Fellowship, which offers a total annual package of at least RMB 500,000.</p>
                <p>
                    Email: {" "}
                    <a
                        href="mailto:scwang@pku.edu.cn"
                        className="text-stone-700 underline hover:text-stone-900"
                    >
                        scwang [at] pku.edu.cn
                    </a>
                    .
                </p>
                <p>Please accept my apologies if I am unable to respond to every email.</p>
            </div>
        </div>
    </section>
);

export default RecruitmentSection;
