import React from "react";
import peopleData from "../../data/people.json";
import DirectorSection from "./DirectorSection";
import PersonCard from "./PersonCard";

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

interface PeopleSubgroup {
    title: string;
    people: Person[];
}

interface PeopleGroup {
    group: string;
    people: Person[];
    subgroups?: PeopleSubgroup[];
}

const groups = peopleData as PeopleGroup[];

/*
 * PeoplePage: renders all people grouped by group.
 * Only renders groups/subgroups if they have people.
 */
const PeoplePage: React.FC = () => (
    <>
        <DirectorSection />
        <div className="space-y-10 max-w-5xl mx-auto">
            {groups.map((group, idx) => {
                // Check if group has people
                const hasPeople = group.people && group.people.length > 0;
                // Check if group has subgroups with people
                const hasSubgroupsWithPeople =
                    group.subgroups &&
                    group.subgroups.length > 0 &&
                    group.subgroups.some((sub) => sub.people && sub.people.length > 0);

                // Only render group if it has people or at least one subgroup with people
                if (!hasPeople && !hasSubgroupsWithPeople) {
                    return null;
                }

                return (
                    <div key={group.group || idx}>
                        <h2 className="text-2xl font-bold text-stone-700 text-gray-700 mb-1">{group.group}</h2>
                        {group.group === "Alumni" && (
                            <p className="text-sm text-gray-500 mb-3">* Positions listed are first job placements.</p>
                        )}
                        {/* Main people */}
                        {hasPeople && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
                                {group.people.map((person, i) => (
                                    <PersonCard
                                        key={person.name + i}
                                        person={person}
                                        isPostdocOrGrad={group.group === "Postdoc Scholars" || group.group === "Graduate Students"}
                                    />
                                ))}
                            </div>
                        )}
                        {/* Subgroups (for Alumni) */}
                        {group.subgroups && group.subgroups.length > 0 && (
                            <div className="space-y-6">
                                {group.subgroups.map((sub, j) => {
                                    // Only render subgroup if it has people
                                    if (!sub.people || sub.people.length === 0) {
                                        return null;
                                    }
                                    return (
                                        <div key={sub.title || j}>
                                            <h3 className="text-lg font-semibold text-gray-500 mb-2">{sub.title}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-2">
                                                {sub.people.map((person, k) => (
                                                    <PersonCard key={person.name + k} person={person} isAlumni={true} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </>
);

export default PeoplePage;
