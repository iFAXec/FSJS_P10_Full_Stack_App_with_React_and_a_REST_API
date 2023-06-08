import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import UserContext from '../context/UserContext';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';



const CourseDetail = () => {

    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();



    useEffect(() => {

        const fetchCourseDetail = async () => {
            try {
                const URL = `http://localhost:5000/api/courses/${id}`;
                const response = await fetch(URL);
                const data = await response.json();
                setCourseDetail(data);

            } catch (error) {
                console.error('Error fetching course detail', error);
                navigate('/notfound');

            }
        }
        fetchCourseDetail();
    }, [id]);

    // console.log(courseDetail)

    if (courseDetail === null) {
        return <div>Loading...</div>
    }

    console.log("🚀 ~ courseDetail:", courseDetail);
    let navBar;

    if (authUser && authUser.id === courseDetail.userId) {
        navBar = (
            <div>
                <div className="actions--bar">
                    <div className="wrap">
                        <NavLink className="button" to={'update'}>Update Course</NavLink>
                        <NavLink className="button" to="/">Delete Course</NavLink>
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                </div>
            </div>
        )

    } else {

        navBar = (
            <div>
                <div className="actions--bar">
                    <div className="wrap">
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                </div>
            </div>
        )

    }

    //Convert the jsx to string before using in the reactMarkdown tags
    const descriptionString = ReactDOMServer.renderToString(courseDetail.description);
    const contentString = ReactDOMServer.renderToString(courseDetail.materialsNeeded);

    return (
        <div>
            <div>{navBar}</div>

            <div className="wrap">
                <h2>Course Detail</h2>

                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetail.title}</h4>
                            <p>By {courseDetail.User.firstName} {courseDetail.User.lastName}</p>
                            <ReactMarkdown>{descriptionString}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetail.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{contentString}</ReactMarkdown>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CourseDetail;