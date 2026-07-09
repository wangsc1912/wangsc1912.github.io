import React from "react";

interface Course {
    code: string;
    name: string;
    level: string;
    semester: string;
}

interface CourseItemProps {
    course: Course;
}

// CourseItem: displays a single course entry
const CourseItem: React.FC<CourseItemProps> = ({ course }) => (
    <li className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <span className="font-semibold text-stone-600">{course.code}</span>
            <span className="ml-2">{course.name}</span>
            <span className="ml-2 text-gray-500 text-sm">({course.level})</span>
        </div>
        <div className="text-gray-600 text-sm mt-1 sm:mt-0">{course.semester}</div>
    </li>
);

export default CourseItem;
