import Database from "./pages/Database";
import Exam from "./pages/Exam";
import StudentLog from "./pages/StudentLog";
import AddStudent from "./pages/AddStudent";
import Login from "./pages/Login";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<Database />} />
            <Route path="/add_students" element={<AddStudent />} />
            <Route path="/exam_invigilation" element={<Exam />} />
            <Route path="/logbook/:id" element={<StudentLog />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
