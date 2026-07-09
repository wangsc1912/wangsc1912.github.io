import React from "react";

interface Person {
    name: string;
    image?: string;
    homepage?: string;
    affiliation?: string;
    degree_info?: string;
    first_job?: string;
    admission_year?: string;
    research_interest?: string;
}

interface PersonCardProps {
    person: Person;
    isAlumni?: boolean;
    isPostdocOrGrad?: boolean;
}

/*
 * PersonCard: displays a person's information.
 * - Avatar is a vertical rectangle with rounded corners (not a circle).
 * - Name is a link with underline on hover if homepage exists, otherwise plain text.
 * - No separate Homepage link.
 */
const PersonCard: React.FC<PersonCardProps> = ({
    person,
    isAlumni = false,
    isPostdocOrGrad = false,
}) => {
    if (isPostdocOrGrad && !isAlumni && person.image) {
        // If homepage exists, wrap image and name in a link; otherwise, render normally
        return (
            <div className="bg-white rounded-lg shadow p-4 flex flex-row items-center">
                {person.homepage && person.homepage !== "" ? (
                    <a
                        href={person.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 mr-4 group"
                    >
                        <img
                            src={person.image.startsWith("images/") ? person.image : person.image}
                            alt={person.name}
                            className="w-24 h-36 rounded-lg object-cover border-gray-400 transition-transform duration-200 ease-in-out group-hover:scale-105"
                        />
                    </a>
                ) : (
                    <img
                        src={person.image.startsWith("images/") ? person.image : person.image}
                        alt={person.name}
                        className="w-24 h-36 rounded-lg object-cover border-gray-400 mr-4"
                    />
                )}
                <div className="flex flex-col flex-1">
                    <div className="mb-1">
                        {person.homepage && person.homepage !== "" ? (
                            <a
                                href={person.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-stone-600 text-left hover:underline hover:text-stone-400"
                                style={{ textDecorationThickness: "2px" }}
                            >
                                {person.name}
                            </a>
                        ) : (
                            <span className="text-lg font-semibold text-stone-600 text-left">{person.name}</span>
                        )}
                    </div>
                    {person.admission_year && person.admission_year !== "" && (
                        <div className="text-base text-gray-600 mb-1 text-left">
                            {person.admission_year} - Present
                        </div>
                    )}
                    {person.research_interest && person.research_interest !== "" && (
                        <div className="text-sm text-gray-600 mb-1 text-left">
                            {person.research_interest}
                        </div>
                    )}
                    {person.affiliation && (
                        <div className="text-sm text-gray-600 mb-1 text-left">{person.affiliation}</div>
                    )}
                    {person.degree_info && (
                        <div className="text-sm text-gray-600 mb-1 text-left">{person.degree_info}</div>
                    )}
                    {person.first_job && (
                        <div className="text-xs text-gray-500 mb-1 text-left">{person.first_job}</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            {!isAlumni && person.image && person.homepage && person.homepage !== "" ? (
                <a
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 group"
                >
                    <img
                        src={person.image.startsWith("images/") ? "/" + person.image : person.image}
                        alt={person.name}
                        className="w-24 h-36 rounded-lg object-cover border-1 border-gray-400 transition-transform duration-200 ease-in-out group-hover:scale-105"
                    />
                </a>
            ) : (
                !isAlumni && person.image && (
                    <img
                        src={person.image.startsWith("images/") ? "/" + person.image : person.image}
                        alt={person.name}
                        className="w-24 h-36 rounded-lg object-cover mb-2 border-1 border-gray-400"
                    />
                )
            )}
            <div className="flex items-center justify-center mb-1">
                {person.homepage && person.homepage !== "" ? (
                    <a
                        href={person.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-stone-600 text-center hover:underline hover:text-stone-400"
                        style={{ textDecorationThickness: "2px" }}
                    >
                        {person.name}
                    </a>
                ) : (
                    <span className="text-lg font-semibold text-stone-600 text-center">{person.name}</span>
                )}
            </div>
            {person.affiliation && (
                <div className="text-sm text-gray-600 mb-1 text-center">{person.affiliation}</div>
            )}
            {person.degree_info && (
                <div className="text-sm text-gray-600 mb-1 text-center">{person.degree_info}</div>
            )}
            {person.first_job && (
                <div className="text-xs text-gray-500 mb-1 text-center">{person.first_job}</div>
            )}
            {(person.admission_year && person.admission_year !== "") || (person.research_interest && person.research_interest !== "") ? (
                <div className="text-sm text-gray-600 mb-1 text-center">
                    {person.admission_year && person.admission_year !== "" && (
                        <span>({person.admission_year})</span>
                    )}
                    {person.admission_year && person.admission_year !== "" && person.research_interest && person.research_interest !== "" && " "}
                    {person.research_interest && person.research_interest !== "" && (
                        <span>{person.research_interest}</span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default PersonCard;
