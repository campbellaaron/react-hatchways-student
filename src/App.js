import React, {useState, setState} from "react";
import axios from "axios";


function App() {

  const apiUrl = `https://api.hatchways.io/assessment/students`

  const [studentList, setData] = useState({})
  const [searchName, setSearchName] = useState("")
  const [show, setShow] = useState(false)

  axios.get(apiUrl).then((response) => {
    for (let i = 0; i < response.data.students.length; i++){
      response.data.students[i].tag = [""];
    }
    setData(response.data.students);
  })
  .catch(err => {
      console.log(err);
  });

  if (!studentList) return null;

  return (
    <div className="App">
      <div className="student-app mx-auto mt-5">
        <input type="text" className="search-field w-100 p-3 mb-4" placeholder="Search by name" onChange={event => {setSearchName(event.target.value)}}/>
            <div className="container">
            {
              
              Array.isArray(studentList) ? (studentList).filter((val => {
                if (searchName === "") {
                  return val;
                } else if (val.firstName.toLowerCase().includes(searchName.toLowerCase())) {
                  return val;
                }
              })).map((student, x) => 
              
              <div key={student.id} className="studentDiv card mb-4 p-1">
                <div className="row g-1">
                  <div className="col-md-2">
                    <img src={student.pic} alt="Student icon" className="student-img"/>
                  </div>
                  <div className="col-md-8">
                    <h3 className="display-5 fw-normal">{student.firstName} {student.lastName}</h3>
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {getAverage(student.grades)}%</p>
                    <input type="text" 
                      className="submit-tag w-50 py-2 mb-4" 
                      placeholder="Add new tag" 
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          console.log(e.target.value);
                        }
                      }} 
                      />
                    <ul className="individual-scores-list">
                      
                    {student.grades && student.grades.length > 0 ? student.grades.map((grade, i) => 
                        <li key={i}>Test {i + 1}: {grade}%</li>
                        ) : null}
                    </ul>
                  </div>
                </div>
              </div>
              
              ) : null
            }
            </div>
      </div>
    </div>
  );
}

const getAverage = (grades) => {
  let total = 0;

  // Convert grade to float for averaging
  for (const grade of grades) {
    total = total + parseFloat(grade);
  }

  let gradeAvg = total / grades.length;

  // get grade average
  return gradeAvg.toFixed(2);
};

export default App;
