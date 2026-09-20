import { useNavigate } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <div className="landing-logo">
          <FaMoneyBill style={{ color: "orange" }} size={30} />

          <h2>Splitease</h2>
        </div>

        <div className="landing-nav-buttons">
          <button
            className="landing-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="landing-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="landing-content">
        <div className="landing-text">
          <p className="landing-small-title">SIMPLE. FAIR. SPLIT.</p>

          <h1>
            Split expenses.
            <br />
            <span>Stay together.</span>
          </h1>

          <p className="landing-description">
            Splitease makes it simple to manage shared expenses, split bills
            with friends, and keep track of who owes what.
          </p>

          <div className="landing-actions">
            <button
              className="landing-primary-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>

            <button
              className="landing-secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="landing-card">
          <div className="landing-card-header">
            <span>Trip</span>
            <span>₹3,000</span>
          </div>

          <div className="landing-expense">
            <div>
              <h3>Dinner</h3>
              <p>Paid by Kadhir</p>
            </div>

            <strong>₹1,500</strong>
          </div>

          <div className="landing-expense">
            <div>
              <h3>Hotel</h3>
              <p>Paid by Niranjan</p>
            </div>

            <strong>₹1,200</strong>
          </div>

          <div className="landing-expense">
            <div>
              <h3>Cab</h3>
              <p>Paid by Naveen</p>
            </div>

            <strong>₹300</strong>
          </div>

          <div className="landing-total">
            <span>Your Share</span>
            <strong>₹1,000</strong>
          </div>
        </div>
      </main>

      <div className="landing-features">
        <div>
          <span>01</span>
          <h3>Create Groups</h3>
          <p>Create groups for trips, friends, or everyday expenses.</p>
        </div>

        <div>
          <span>02</span>
          <h3>Split Expenses</h3>
          <p>Assign expenses and shares to the right members.</p>
        </div>

        <div>
          <span>03</span>
          <h3>Track Payments</h3>
          <p>Know exactly what you owe and what you should receive.</p>
        </div>
      </div>
    </div>
  );
}
