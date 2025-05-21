import { useState } from "react";
import axios from "axios";

const EventCard = ({ title, date, url, index, activeIndex, setActiveIndex }) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false);

  const isActive = index === activeIndex;

  const handleGetTickets = () => {
    setActiveIndex(index); // Show email input only for this card
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
        email,
        link,
      });
      window.open(url, "_blank");
      setActiveIndex(null)
    } catch (err) {
      setError("Subscription failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
      }}
      className="event-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{title}</h3>
      <p>{new Date(date).toLocaleString()}</p>

      {!isActive ? (
        <button onClick={handleGetTickets} style={styles.button}>
          Get Tickets
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? "Submitting..." : "Continue"
          }
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.02)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.6rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default EventCard;
