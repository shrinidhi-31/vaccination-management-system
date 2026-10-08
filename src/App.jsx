import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import VaccinationRecords from "./pages/patient/VaccinationRecords";
import BookingConfirmation from "./pages/patient/BookingConfirmation";

import CenterFinder from "./components/CenterFinder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient/dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="/patient/book-appointment"
          element={<BookAppointment />}
        />

        <Route
          path="/patient/records"
          element={<VaccinationRecords />}
        />

        <Route
          path="/patient/booking-confirmation"
          element={<BookingConfirmation />}
        />

        <Route
          path="/center-finder"
          element={<CenterFinder />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;