import './layout.css';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
const Navigation = () => {
const location = useLocation();
const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada correctamente.");
            console.log("Sesión cerrada correctamente.");
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            alert("Hubo un problema al cerrar sesión.");
        }
    };

    return (
        <nav className="nav-container">
            <ul className="nav-links">
                <li className={location.pathname === '/' ? 'link-selected' : ''}>
                    <NavLink to={'/'}>
                        Pagina Principal
                    </NavLink>
                </li>
                <li className={location.pathname === '/student' || location.pathname === '/student/form' ? 'link-selected' : ''}>
                    <NavLink to={'/student'}>
                        Alumnos
                    </NavLink>
                </li>
            </ul>
            <div className="logout-container">
                    <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
            </div>
        </nav>
    );
}

const Layout = () => {
    return (
        <div className='layout-style'>
            <div className='layout-menu'>
                <h2>Menu</h2>
                <div className='layout-nav'>
                    <Navigation />
                </div>
            </div>
            <div className='layout-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;