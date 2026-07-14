import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import publicationsBib from "../../data/publications.bib?raw";
import PublicationItem, { bibEntryToPublication } from "./PublicationItem";
import type { Publication } from "./PublicationItem";
import { parseBibTeX } from "./bibtex";

const sectionTitles: Record<string, string> = {
    book_chapter: "Book Chapters",
    journal: "Journal Articles",
    conference: "Conference Papers",
    preprint: "Preprints",
    workshop: "Workshop Papers",
};

const sectionPrefixes: Record<string, string> = {
    book_chapter: "B",
    journal: "J",
    conference: "C",
    preprint: "P",
    workshop: "W",
};

const sectionOrder = ["conference", "journal", "preprint", "book_chapter", "workshop"];

function getSectionKey(publication: Publication) {
    if (publication.type === "article") {
        return "journal";
    }
    if (publication.type === "inproceedings") {
        return "conference";
    }
    if (publication.type === "inbook" || publication.type === "incollection" || publication.type === "book") {
        return "book_chapter";
    }
    if (publication.type === "misc" || publication.type === "unpublished") {
        return "preprint";
    }
    return "workshop";
}

function groupBySection(publications: Publication[]) {
    const grouped: Record<string, Publication[]> = {
        conference: [],
        journal: [],
        preprint: [],
        book_chapter: [],
        workshop: [],
    };

    publications.forEach(publication => {
        grouped[getSectionKey(publication)].push(publication);
    });

    Object.values(grouped).forEach(section => {
        section.sort((a, b) => {
            if (b.year !== a.year) {
                return b.year - a.year;
            }
            return a.title.localeCompare(b.title);
        });
    });

    return grouped;
}

function groupByYear(publications: Publication[]) {
    const groups: Record<number, Publication[]> = {};
    publications.forEach(publication => {
        if (!groups[publication.year]) {
            groups[publication.year] = [];
        }
        groups[publication.year].push(publication);
    });

    return Object.entries(groups)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, pubs]) => ({ year: Number(year), pubs }));
}

const PublicationsPage: React.FC = () => {
    const publicationData = React.useMemo(() => {
        const entries = parseBibTeX(publicationsBib).map(bibEntryToPublication);
        return groupBySection(entries);
    }, []);

    const sectionCounters: Record<string, number> = {
        book_chapter: 1,
        journal: 1,
        conference: 1,
        preprint: 1,
        workshop: 1,
    };

    return (
        <div className="flex max-w-5xl mx-auto">
            <div className="flex-1 space-y-10 text-lg ">
                <p className="text-lg text-orange-700 font-bold">
                    Please see the full list on{" "}
                    <a
                        href="https://scholar.google.com/citations?user=NCj3MZoAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-700 underline hover:text-stone-900"
                    >
                        Google Scholar
                    </a>
                    .
                </p>
                <p>
                    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">#</code> stands for co-first author, and <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">*</code> stands for corresponding author.
                </p>
                {sectionOrder.map((key) => {
                    const publications = publicationData[key];
                    if (!publications || publications.length === 0) {
                        return null;
                    }

                    const prefix = sectionPrefixes[key] ?? "";
                    if (key === "journal" || key === "conference") {
                        const yearGroups = groupByYear(publications);
                        return (
                            <section key={key}>
                                <h2 className="mb-4 scroll-mt-24 text-2xl font-bold text-stone-700" id={key}>
                                    {sectionTitles[key] ?? key}
                                </h2>
                                {yearGroups.map(({ year, pubs }) => (
                                    <div key={year}>
                                        <h3
                                            id={`${key}-${year}`}
                                            className="my-4 scroll-mt-24 text-lg font-semibold text-gray-600"
                                        >
                                            {year === 2018 ? "2018 and earlier" : year}
                                        </h3>
                                        <ul className="space-y-4">
                                            {pubs.map((publication) => {
                                                const paperIndex = sectionCounters[key]++;
                                                return (
                                                    <li key={publication.key}>
                                                        <PublicationItem
                                                            publication={publication}
                                                            paperIndex={paperIndex}
                                                            paperPrefix={prefix}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        );
                    }

                    return (
                        <section key={key}>
                            <h2 className="mb-4 text-2xl font-bold text-stone-700" id={key}>
                                {sectionTitles[key] ?? key}
                            </h2>
                            <ul className="space-y-4">
                                {publications.map((publication) => {
                                    const paperIndex = sectionCounters[key]++;
                                    return (
                                        <li key={publication.key}>
                                            <PublicationItem
                                                publication={publication}
                                                paperIndex={paperIndex}
                                                paperPrefix={prefix}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </div>
            <Sidebar publicationData={publicationData} sectionOrder={sectionOrder} />
        </div>
    );
};

interface SidebarProps {
    publicationData: Record<string, Publication[]>;
    sectionOrder: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ publicationData, sectionOrder }) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const sectionIds: string[] = [];
        sectionOrder.forEach((key) => {
            const publications = publicationData[key];
            if (!publications || publications.length === 0) {
                return;
            }

            sectionIds.push(key);
            if (key === "journal" || key === "conference") {
                const years = Array.from(new Set(publications.map(pub => pub.year))).sort((a, b) => b - a);
                years.forEach(year => {
                    sectionIds.push(`${key}-${year}`);
                });
            }
        });

        const handleScroll = () => {
            let found: string | null = null;
            sectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (!element) {
                    return;
                }

                if (element.getBoundingClientRect().top <= 120) {
                    found = id;
                }
            });
            setActiveId(found);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [publicationData, sectionOrder]);

    React.useEffect(() => {
        if (!location.hash) {
            return;
        }

        const id = location.hash.replace("#", "");
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 0);
    }, [location.hash]);

    const handleNav = (id: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/publications#${id}`);
    };

    return (
        <nav className="sticky top-24 ml-8 hidden w-40 self-start lg:block">
            <ul className="bg-white pl-2 text-sm">
                {sectionOrder.map((key) => {
                    const publications = publicationData[key];
                    if (!publications || publications.length === 0) {
                        return null;
                    }

                    const sectionLabel = sectionTitles[key] ?? key;
                    const isSectionActive = activeId === key || activeId?.startsWith(`${key}-`);
                    if (key === "journal" || key === "conference") {
                        const years = Array.from(new Set(publications.map(pub => pub.year))).sort((a, b) => b - a);
                        const after2018 = years.filter(year => year > 2018);
                        const beforeOr2018 = years.filter(year => year <= 2018);

                        return (
                            <li key={key} className="mb-2">
                                <a
                                    href={`#${key}`}
                                    onClick={handleNav(key)}
                                    className={`block px-2 py-1 font-semibold transition-colors duration-200 ${
                                        isSectionActive
                                            ? "bg-stone-100 text-stone-700"
                                            : "text-gray-800 hover:bg-stone-200 hover:text-stone-700"
                                    }`}
                                >
                                    {sectionLabel}
                                </a>
                                <ul className="mt-1 ml-4 space-y-0.5">
                                    {after2018.map((year) => {
                                        const isActive = activeId === `${key}-${year}`;
                                        return (
                                            <li key={year}>
                                                <a
                                                    href={`#${key}-${year}`}
                                                    onClick={handleNav(`${key}-${year}`)}
                                                    className={`block rounded px-2 py-0.5 transition-colors duration-200 ${
                                                        isActive
                                                            ? "bg-stone-100 font-bold text-stone-700"
                                                            : "text-gray-600 hover:bg-stone-200 hover:text-stone-700"
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
                                                className={`block rounded px-2 py-0.5 transition-colors duration-200 ${
                                                    beforeOr2018.some(year => activeId === `${key}-${year}`) ||
                                                    activeId === `${key}-2018`
                                                        ? "bg-stone-100 font-bold text-stone-700"
                                                        : "text-gray-600 hover:bg-stone-200 hover:text-stone-700"
                                                }`}
                                            >
                                                2018 and earlier
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        );
                    }

                    return (
                        <li key={key} className="mb-2">
                            <a
                                href={`#${key}`}
                                onClick={handleNav(key)}
                                className={`block px-2 py-1 font-semibold transition ${
                                    activeId === key ? "bg-stone-100 text-stone-700" : "text-gray-800 hover:text-stone-700"
                                }`}
                            >
                                {sectionLabel}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default PublicationsPage;
