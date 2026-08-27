import React from "react";

const researchThemes = [
    "Memory-Centric AI Systems",
    "Computing-in-Memory Technologies",
    "(and more generalized) Efficient AI",
];

const IntroSection: React.FC = () => (
    <section className="mb-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow px-4 md:px-8 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-950">
                    Memory is Intelligence
                </h1>
                <p className="mt-3 text-xl sm:text-5xl font-medium text-gray-700">
                    存储即智能
                </p>
            </div>
            <div className="text-base text-gray-700 mb-4 text-left space-y-4">
                <p>
                    The biological neural system can be regarded as a memory system. Information to be remembered is stored in the strengths of neural connections, as the physical basis of biological memory. External stimuli propagate through this memory network and are computed by neurons to generate decisions and actions. The structure of memory and the stimuli propagation through memory network are the fundamental basis of biological intelligence. This paradigm enables sophisticated intelligence with extremely low energy consumption.
                </p>
                <p>
                    Modern computers and AI systems work in a totally different way, where memory and computing units are physically separated. During inference, neural network parameters must be repeatedly transferred from memory devices to computing units. This separation not only is unnatural, but also creates a major bottleneck in AI systems. The continuous movement of data between memory and computing units introduces substantial latency and energy overhead.
                </p>
                <p>
                    Our research is fundamentally motivated by this gap. We are dedicated to building memory-centric AI systems in which memory occupies a central role. Much as it does in the brain, information is stored and computed within or at least near memory. Such systems are not only more aligned with biological neural systems, but also hold great promise for substantially improving energy efficiency and computational performance. Our research focuses on the following areas:
                </p>
            </div>
            <ul className="max-w-xl text-left list-disc pl-6">
            {researchThemes.map((theme, idx) => (
                <li key={idx} className="text-base text-stone-600">
                    {theme}
                </li>
            ))}
        </ul>
        </div>


    </section>
);

export default IntroSection;
