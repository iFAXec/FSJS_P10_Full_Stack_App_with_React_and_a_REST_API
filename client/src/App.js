import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//App Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';


const App = () => {



  return (

    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='/courses/create' element={<CreateCourse />} />
        <Route path='//courses/:id/update' element={<UpdateCourse />} />
        <Route path='/error' element={<Error />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/signin' element={<UserSignIn />} />
        <Route path='/signout' element={<UserSignOut />} /> {/* //FIXME - complete the signout components */}
      </Routes>
    </div>
  );
}

export default App;









