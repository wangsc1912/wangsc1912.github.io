import React from "react";
import teachingData from "../../data/teaching.json";
import CourseItem from "./CourseItem";

// TeachingPage: renders all courses using CourseItem
const TeachingPage: React.FC = () => (
    <>
        <div className="max-w-3xl mx-auto">
            <ul className="divide-y divide-gray-200">
                {teachingData.map((course, idx) => (
                    <CourseItem key={course.code + course.semester + idx} course={course} />
                ))}
            </ul>
        </div>
    </>
);

export default TeachingPage;
