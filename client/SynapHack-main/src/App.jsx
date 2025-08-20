import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import React from "react";
 // Assuming you have a Tailwind CSS setup
import LandingPage from "./pages/LandingPage.jsx";
import EventDetails from "./pages/EventDetail.jsx";
import EventListing from "./pages/EventListing.jsx";
import Registration from "./pages/Register.jsx";
import ProjectSubmission from "./pages/SubmitProject.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import JudgeDashboard from "./pages/JudgeDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventLive from "./pages/EventLive.jsx";

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<EventListing />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/live" element={<EventLive />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/submit" element={<ProjectSubmission />} />
            {/* Event-specific leaderboard */}
            <Route path="/events/:id/leaderboard" element={<Leaderboard />} />
            {/* Judge-only dashboard */}
            <Route
              path="/judge"
              element={
                <ProtectedRoute allow={["judge"]}>
                  <JudgeDashboard />
                </ProtectedRoute>
              }
            />
            {/* Organizer dashboard */}
            <Route
              path="/organizer"
              element={
                <ProtectedRoute allow={["organizer"]}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
