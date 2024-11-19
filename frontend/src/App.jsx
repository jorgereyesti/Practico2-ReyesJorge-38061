import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import StudentPage from './pages/students/StudentPage';
import FormStudentPage from './pages/students/FormStudentPage';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
return (
    <Router>
    <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con Layout */}
        <Route
        path="/"
        element={
            <ProtectedRoute>
            <Layout />
            </ProtectedRoute>
        }
        >
          {/* Rutas internas */}
        <Route index element={<MainPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="student/form" element={<FormStudentPage />} />
        </Route>
    </Routes>
    </Router>
);
};
export default App;