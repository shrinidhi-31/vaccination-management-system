import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Vaccinations from "./pages/Vaccinations";
import VaccineStock from "./pages/VaccineStock";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <div className="logo">
            🏥 <span>HealthCare</span>
          </div>

          <nav className="navigation">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              📊 <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              📅 <span>Appointments</span>
            </NavLink>

            <NavLink
              to="/patients"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              👥 <span>Patients</span>
            </NavLink>

            <NavLink
              to="/vaccinations"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              💉 <span>Vaccinations</span>
            </NavLink>

            <NavLink
              to="/vaccine-stock"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              📦 <span>Vaccine Stock</span>
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              📈 <span>Reports</span>
            </NavLink>

          </nav>

          <button
            className="logout"
            onClick={() => alert("Admin logged out")}
          >
            🚪 <span>Logout</span>
          </button>

        </aside>


        {/* MAIN AREA */}
        <main className="main-content">

          {/* HEADER */}
          <header className="header">

            <div>
              <h1>Admin Dashboard</h1>
              <p>Healthcare Management System</p>
            </div>

            <div className="admin-profile">
              👤 <span>Admin</span>
            </div>

          </header>


          {/* ROUTES */}
          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/appointments"
              element={<Appointments />}
            />

            <Route
              path="/patients"
              element={<Patients />}
            />

            <Route
              path="/vaccinations"
              element={<Vaccinations />}
            />

            <Route
              path="/vaccine-stock"
              element={<VaccineStock />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;