import React from "react";

export interface Publication {
    authors: string;
    title: string;
    year: number;
    venue?: string;
    book_title?: string;
    editors?: string;
    publisher?: string;
    location?: string;
    notes?: string;
    highlight?: string;
}

interface PublicationItemProps {
    publication: Publication;
    paperIndex?: number;
    paperPrefix?: string;
}

/**
 * PublicationItem: displays a single publication entry.
 * Title is on the first line, authors on the second line, all other info on the third line.
 */
const PublicationItem: React.FC<PublicationItemProps> = ({ publication, paperIndex, paperPrefix }) => (
    <div className="bg-white rounded shadow p-4">
        <div className="mb-1">
            <span className="align-top">
                {typeof paperIndex === "number" && paperPrefix && (
                    <span className="block text-xs font-bold text-gray-500 mb-0.5">
                        {paperPrefix}{paperIndex}
                    </span>
                )}
                <span className="block font-semibold text-stone-500">{publication.title}</span>
            </span>
        </div>
        {publication.highlight && (
            <div className="text-xs font-semibold text-red-600 bg-red-100 rounded px-2 py-0.5 mb-2 inline-block">
                {publication.highlight}
            </div>
        )}
        <div className="text-sm text-gray-700 mb-1">{publication.authors}</div>
        <div className="text-sm text-gray-700">
            {publication.venue && <span>{publication.venue}, </span>}
            {publication.book_title && <span>{publication.book_title}, </span>}
            {publication.publisher && <span>{publication.publisher}, </span>}
            {publication.location && <span>{publication.location}, </span>}
            <span>{publication.year}</span>
            {publication.notes && <span className="ml-2 text-gray-500">{publication.notes}</span>}
        </div>
        {publication.book_title && publication.editors && (
            <div className="text-sm text-gray-500">Editors: {publication.editors}</div>
        )}
    </div>
);

export default PublicationItem;
