import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./Components/EventCard.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // 🌀 Loading state
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/events`);
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Sydney Events</h1>

      {loading ? (
        <div style={styles.spinnerWrapper}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Fetching amazing events for you...</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  spinnerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3rem",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #ccc",
    borderTop: "6px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#555",
  },
};

// Inject keyframes animation
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default App;
