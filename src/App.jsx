import { DartsList } from './DartsList';
import { DartsSingle } from './DartsSingle';
import { BrowserRouter as Router, NavLink, Routes, Route} from 'react-router-dom';
import './App.css';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Darts játékosok</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-darts">Új darts játékos</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/darts/:dartsId" element={<DartsSingle />} />
        <Route path="/" element={<DartsList />} />
      </Routes>
    </Router>
  );
}