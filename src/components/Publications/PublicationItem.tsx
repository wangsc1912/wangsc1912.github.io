import React from "react";
import type { BibEntry } from "./bibtex";

export interface Publication {
    key: string;
    type: string;
    title: string;
    authors: string[];
    year: number;
    venue?: string;
    location?: string;
    notes?: string;
    url?: string;
    code?: string;
}

interface PublicationItemProps {
    publication: Publication;
    paperIndex?: number;
    paperPrefix?: string;
}

const TARGET_AUTHORS = new Set(["shaocong wang", "wang shaocong"]);

function normalizeName(name: string) {
    return name.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
}

function formatAuthorName(name: string) {
    const [lastName, firstName] = name.split(",").map(part => part.trim());
    if (!firstName || !lastName) {
        return name;
    }
    return `${firstName} ${lastName}`;
}

function renderAuthors(authors: string[]) {
    return authors.map((author, index) => {
        const displayName = formatAuthorName(author);
        const content = TARGET_AUTHORS.has(normalizeName(displayName)) ? <strong>{displayName}</strong> : displayName;
        const suffix = index === authors.length - 1 ? "" : ", ";
        return (
            <React.Fragment key={`${author}-${index}`}>
                {content}
                {suffix}
            </React.Fragment>
        );
    });
}

export function bibEntryToPublication(entry: BibEntry): Publication {
    return {
        key: entry.key,
        type: entry.type,
        title: entry.fields.title ?? entry.key,
        authors: (entry.fields.author ?? "")
            .split(/\sand\s/gi)
            .map(author => author.trim())
            .filter(Boolean),
        year: Number(entry.fields.year ?? 0),
        venue: entry.fields.journal ?? entry.fields.booktitle ?? entry.fields.publisher,
        location: entry.fields.address,
        notes: entry.fields.note,
        url: entry.fields.url,
        code: entry.fields.code,
    };
}

const PublicationItem: React.FC<PublicationItemProps> = ({ publication, paperIndex, paperPrefix }) => (
    <div className="rounded bg-white p-4 shadow">
        <div className="mb-1">
            <span className="align-top">
                {typeof paperIndex === "number" && paperPrefix && (
                    <span className="mb-0.5 block text-xs font-bold text-gray-500">
                        {paperPrefix}
                        {paperIndex}
                    </span>
                )}
                <span className="block font-semibold text-stone-500">{publication.title}</span>
            </span>
        </div>
        <div className="mb-1 text-sm text-gray-700">{renderAuthors(publication.authors)}</div>
        <div className="text-sm text-gray-700">
            {publication.venue && <span>{publication.venue}, </span>}
            {publication.location && <span>{publication.location}, </span>}
            <span>{publication.year}</span>
            {publication.notes && <span className="ml-2 text-gray-500">{publication.notes}</span>}
        </div>
        {(publication.url || publication.code) && (
            <div className="mt-3 flex flex-wrap gap-2">
                {publication.url && (
                    <a
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded border border-stone-300 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-50"
                    >
                        Paper
                    </a>
                )}
                {publication.code && (
                    <a
                        href={publication.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded border border-stone-300 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-50"
                    >
                        Code
                    </a>
                )}
            </div>
        )}
    </div>
);

export default PublicationItem;
