import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button, Textarea, Input } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = await firebase.firestore().collection("courses").get();
      setCourses(courseCollection.docs.map((doc) => doc.data()));
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Microcourses Platform</h1>
          {courses.map((course) => (
            <div key={course.id}>
              <h3>{course.title}</h3>
              <Button onClick={() => handleCourseSelect(course)}>View Course</Button>
            </div>
          ))}
        </Route>

        <Route path="/course">
          <div>
            {selectedCourse ? (
              <div>
                <h3>{selectedCourse.title}</h3>
                <p>{selectedCourse.description}</p>
                <Textarea placeholder="Comment..." />
                <Button>Submit Comment</Button>
              </div>
            ) : (
              <p>Select a course to view</p>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;