import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./Components/EventCard.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/events`);
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Sydney Events</h1>

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
};

export default App;
