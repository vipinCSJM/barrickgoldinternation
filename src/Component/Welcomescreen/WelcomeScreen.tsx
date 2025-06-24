import React, { useState, useEffect, useRef } from "react";
import {  Link, useNavigate} from "react-router-dom";
import "./WelcomeScreen.scss";
import { dynamicImage } from "../../Service";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
// import { FaAnglesRight } from "react-icons/fa6";
const screens = [
  {
    title: "Digital Gold?",
    description: "A new way to own real gold — digitally.",
    video: dynamicImage("D-gold-min.jpg"),
    TopTital: "Welcome to Barrick Gold.",
  },
  {
    title: "Investment Problem?",
    description: "Gold seems safe but brings hidden costs, risks, and low flexibility.",
    video: dynamicImage("Goldinvestment-min.jpg"),
    TopTital: "Your money, your secure future.",
  },
  {
    title: "Digital Solution?",
    description: "You own actual, physical gold — digitally accessible",
    video: dynamicImage("D-solutions-min.jpg"),
    TopTital: "Fully Digital, Fully Real",
  },
  {
    title: "Assets Security & Transparency",
    description: "Gold assets are securely vaulted and insured",
    video: dynamicImage("D-security-min.jpg"),
    TopTital: "Redemption available on-demand",
  },
];

const WelcomeScreen = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("clientId")) {
  //     navigate(`${import.meta.env.BASE_URL}/dashboard`);
  //   }
  // }, []);

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [animateClass, setAnimateClass] = useState("animate-in");
  const current = screens[index];

  const triggerAnimation = () => {
    setAnimateClass(""); // Remove class
    setTimeout(() => setAnimateClass("animate-in"), 1000); // Re-add after short delay
  };

  const nextScreen = () => {
    if (index < screens.length - 1) {
      setIndex(index + 1);
      triggerAnimation();
    }
  };

  const prevScreen = () => {
    if (index > 0) {
      setIndex(index - 1);
      triggerAnimation();
    }
  };

  const skip = () => setIndex(screens.length - 1);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const threshold = 50; // Minimum swipe distance

      if (distance > threshold) {
        // Left swipe
        nextScreen();
      } else if (distance < -threshold) {
        // Right swipe
        prevScreen();
      }
    }
  };

  return (
    <div
      className="welcome-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* <video
      className="background-video"
      autoPlay
      loop
      muted
      playsInline
      key={current.video}
    >
      <source src={current.video} type="video/mp4" />
    </video> */}
      <img
        src={current.video} // Note: `video` key is now image path
        alt={current.title}
        className="background-video"
      />

      <div className="overlay" />
      <h3 className="fade-heading">{current.TopTital}</h3>

      <div className={`welcome-card ${animateClass}`}>
        {/* Navigation Buttons - Left (Prev) and Right (Next) */}
        {index > 0 && (
          <button className="nav-btn left" onClick={prevScreen}>
            <FaAngleLeft />
          </button>
        )}
        {index < screens.length - 1 && (
          <button className="nav-btn right" onClick={nextScreen}>
            <FaAngleRight />
          </button>
        )}

        <div className="welcome-card-content">
          <h2 className="title">{current.title}</h2>
          <p className="description">{current.description}</p>
          {/* Progress Dots */}
          <div className="progress-dots">
            {screens.map((_, i) => (
              <span key={i} className={`dot ${i === index ? "active" : ""}`} />
            ))}
          </div>
          <div className="controls">
            {index < screens.length - 1 ? (
              <>
                <button className="btn primary" onClick={nextScreen}>
                  {index === 0 ? "Let's Go" : "Next"}
                </button>
                <button className="btn skip" onClick={skip}>
                  {index === 0 ? "Your journey begins now" : "Skip"}
                </button>
              </>
            ) : (
              <>
                <Link  to="/Register" className="btn primary">
                  Get Started
                </Link>
                <p className="login-text">
                  Already have an account?
                  <Link to="/login"> Log In</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
