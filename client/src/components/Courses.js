import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Courses = () => {

    const [courses, setCourses] = useState([]);


    /**
     * Try block fetches the courses data and update the courses variable
     * If any error is received from the server - console log the error message
     */

    const fetchCourses = async () => {
        try {
            const URL = 'http://localhost:5000/api/courses';
            const response = await fetch(URL);
            const data = await response.json();
            // console.log("🚀 ~ data:", data);

            setCourses(data);
        } catch (error) {
            console.error('Error fetching course', error);
        }
    }

    /**
     * The useEffect hook uses the fetchCourses helper function to display the course detail
     * If error is received from the server - display the error message to the console
     */

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                await fetchCourses();
            } catch (error) {
                console.error('Error with useEffect hook', error);
            }
        }
        fetchCourseData();
    }, []);


    /**
     * The return statement displays the html elements
     */

    return (
        <div className="wrap main--grid">
            {courses.map((course, index) => (
                <NavLink className="course--module course--NavLink" to={`courses/${course.id}`} key={index} >
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>
            ))
            }

            <NavLink className="course--module course--add--module" to="courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </NavLink>
        </div >
    );
}

export default Courses;