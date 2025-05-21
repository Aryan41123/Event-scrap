import { useState } from "react";
import { subscribeEmail } from "../../api";

const SubscribeForm = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await subscribeEmail(email);
            setMsg("Subscribed successfully!");
            setEmail("");
         
        } catch (err) {
            setMsg(err.response?.data?.message || "Subscription failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ padding: "8px", width: "250px" }}
            />
            <button type="submit" style={{ marginLeft: "10px", padding: "8px 16px" }}>
                Subscribe
            </button>
            {msg && <p>{msg}</p>}
        </form>
    );
};

export default SubscribeForm;
