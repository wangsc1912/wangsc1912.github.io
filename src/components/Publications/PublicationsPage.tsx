import React from "react";
import publicationData from "../../data/publications.json";
import PublicationItem from "./PublicationItem";
import type { Publication } from "./PublicationItem";

// Mapping of keys to display names
const sectionTitles: Record<string, string> = {
    book_chapter: "Book Chapters",
    journal: "Selected Journal Articles",
    conference: "Selected Conference Papers",
    workshop: "Workshop Papers",
};

const sectionPrefixes: Record<string, string> = {
    book_chapter: "B",
    journal: "J",
    conference: "C",
    workshop: "W",
};

const PublicationsPage: React.FC = () => {
    // Helper to group by year, descending
    function groupByYear(publications: Publication[]) {
        const groups: Record<number, Publication[]> = {};
        publications.forEach(pub => {
            const y = pub.year;
            if (!groups[y]) groups[y] = [];
            groups[y].push(pub);
        });
        return Object.entries(groups)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, pubs]) => ({ year: Number(year), pubs }));
    }

    // Section-wide counters
    const sectionCounters: Record<string, number> = {
        book_chapter: 1,
        journal: 1,
        conference: 1,
        workshop: 1,
    };

    // Enforced section order
    const sectionOrder = ['conference', 'journal', 'book_chapter', 'workshop'];

    return (
        <>
            <div className="flex max-w-5xl mx-auto">
                <div className="flex-1 space-y-10">
                    <p className="text-base text-gray-700">
                        Pleas see the full publication list on{" "}
                        <a
                            href="https://scholar.google.com/citations?user=NCj3MZoAAAAJ&hl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-700 underline hover:text-stone-900"
                        >
                            Google Scholar
                        </a>
                        .
                    </p>
                    {/* Global Year Navigation removed as per user request */}
                    {sectionOrder.map((key) => {
                        const publications = publicationData[key as keyof typeof publicationData];
                        if (!publications) return null;
                        const prefix = sectionPrefixes[key] || "";
                        if (key === "journal" || key === "conference") {
                            const yearGroups = groupByYear(publications as Publication[]);
                            return (
                                <section key={key}>
                                    <h2 className="text-2xl font-bold text-stone-700 mb-4 scroll-mt-24" id={key}>{sectionTitles[key] || key}</h2>
                                    {yearGroups.map(({ year, pubs }) => (
                                        <div key={year}>
                                            <h3
                                                id={`${key}-${year}`}
                                                className="text-lg font-semibold text-gray-600 my-4 scroll-mt-24"
                                            >
                                                {(key === "journal" || key === "conference") && year === 2018 ? "2018 and earlier" : year}
                                            </h3>
                                            <ul className="space-y-4">
                                                {pubs.map((pub, idx) => {
                                                    const paperIndex = sectionCounters[key]++;
                                                    return (
                                                        <li key={idx}>
                                                            <PublicationItem publication={pub} paperIndex={paperIndex} paperPrefix={prefix} />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </section>
                            );
                        } else {
                            return (
                                <section key={key}>
                                    <h2 className="text-2xl font-bold text-stone-700 mb-4" id={key}>{sectionTitles[key] || key}</h2>
                                    <ul className="space-y-4">
                                        {(publications as Publication[]).map((pub, idx) => {
                                            const paperIndex = sectionCounters[key]++;
                                            return (
                                                <li key={idx}>
                                                    <PublicationItem publication={pub} paperIndex={paperIndex} paperPrefix={prefix} />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </section>
                            );
                        }
                    })}
                </div>
                {/* Sidebar */}
                <Sidebar sectionOrder={sectionOrder} />
            </div>
        </>
    );
};

// Sidebar with active highlight and custom style
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
    sectionOrder: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ sectionOrder }) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const sectionIds: string[] = [];
        sectionOrder.forEach((key) => {
            const publications = publicationData[key as keyof typeof publicationData];
            if (!publications) return;
            sectionIds.push(key);
            if (key === "journal" || key === "conference") {
                const years = Array.from(
                    new Set((publications as Publication[]).map(pub => pub.year))
                ).sort((a, b) => b - a);
                years.forEach(year => {
                    sectionIds.push(`${key}-${year}`);
                });
            }
        });

        const handleScroll = () => {
            let found: string | null = null;
            for (let i = 0; i < sectionIds.length; i++) {
                const el = document.getElementById(sectionIds[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        found = sectionIds[i];
                    }
                }
            }
            setActiveId(found);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionOrder]);

    // Scroll to section if hash is present in location
    React.useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 0);
        }
    }, [location.hash]);

    // Helper to handle sidebar navigation
    const handleNav = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/publications#${id}`);
    };

    return (
        <nav className="w-40 ml-8 hidden lg:block sticky top-24 self-start">
            <ul className="bg-white text-sm pl-2">
                {sectionOrder.map((key) => {
                    const publications = publicationData[key as keyof typeof publicationData];
                    if (!publications) return null;
                    const sectionLabel = sectionTitles[key] || key;
                    const isSectionActive = activeId === key || (activeId && activeId.startsWith(key + "-"));
                    if (key === "journal" || key === "conference") {
                        const years = Array.from(
                            new Set((publications as Publication[]).map(pub => pub.year))
                        ).sort((a, b) => b - a);
                        const after2018 = years.filter(y => y > 2018);
                        const beforeOr2018 = years.filter(y => y <= 2018);
                        return (
                            <li key={key} className="mb-2">
                                <a
                                    href={`#${key}`}
                                    onClick={handleNav(key)}
                                    className={`block font-semibold px-2 py-1 transition-colors duration-200 ${isSectionActive
                                        ? "text-stone-700 bg-stone-100"
                                        : "text-gray-800 hover:text-stone-700 hover:bg-stone-200"
                                        }`}
                                >
                                    {sectionLabel}
                                </a>
                                <ul className="ml-4 mt-1 space-y-0.5">
                                    {after2018.map(year => {
                                        const isActive = activeId === `${key}-${year}`;
                                        return (
                                            <li key={year}>
                                                <a
                                                    href={`#${key}-${year}`}
                                                    onClick={handleNav(`${key}-${year}`)}
                                                    className={`block px-2 py-0.5 rounded transition-colors duration-200 ${isActive
                                                        ? "text-stone-700 bg-stone-100 font-bold"
                                                        : "text-gray-600 hover:text-stone-700 hover:bg-stone-200"
                                                        }`}
                                                >
                                                    {year}
                                                </a>
                                            </li>
                                        );
                                    })}
                                    {beforeOr2018.length > 0 && (
                                        <li key="before2018">
                                            <a
                                                href={`#${key}-2018`}
                                                onClick={handleNav(`${key}-2018`)}
                                                className={`block px-2 py-0.5 rounded transition-colors duration-200 ${beforeOr2018.some(y => activeId === `${key}-${y}`) || activeId === `${key}-2018`
                                                    ? "text-stone-700 bg-stone-100 font-bold"
                                                    : "text-gray-600 hover:text-stone-700 hover:bg-stone-200"
                                                    }`}
                                            >
                                                2018 and earlier
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        );
                    } else {
                        return (
                            <li key={key} className="mb-2">
                                <a
                                    href={`#${key}`}
                                    onClick={handleNav(key)}
                                    className={`block font-semibold px-2 py-1 transition ${activeId === key
                                        ? "text-stone-700 bg-stone-100"
                                        : "text-gray-800 hover:text-stone-700"
                                        }`}
                                >
                                    {sectionLabel}
                                </a>
                            </li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
};

export default PublicationsPage;
