import React from "react";

const RecruitmentSection: React.FC = () => (
    <section className="mb-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow px-4 md:px-8 py-8">
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Recruitment</h2>
            <div className="text-base text-gray-700 space-y-4">
                <p>
                    We are looking for highly self-motivated Master's/Ph.D. students/postdoctoral researchers/research assistants interested in memory-centric AI systems, computing-in-memory technologies, hardware/software co-design, and efficient AI hardware.
                </p>
                <p>
                    Prospective PhD students, master students, postdoctoral researchers, research assistants, and visiting students are welcome to contact us with a CV, transcripts, and publications if any.
                </p>
                <p>
                    Please email{" "}
                    <a
                        href="mailto:scwang@pku.edu.cn"
                        className="text-stone-700 underline hover:text-stone-900"
                    >
                        scwang [at] pku.edu.cn
                    </a>
                    .
                </p>
            </div>
        </div>
    </section>
);

export default RecruitmentSection;
