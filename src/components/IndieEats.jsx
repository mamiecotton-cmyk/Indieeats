import { useState } from "react";
import { supabase } from "../lib/supabase.js";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #F2F0FF; color: #1A1640; }
  .ie-page { min-height: 100vh; overflow-x: hidden; }

  .ie-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2.5rem;
    background: rgba(242,240,255,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(91,79,232,0.1);
  }
  .ie-nav-logo { display: flex; align-items: center; gap: 10px; }
  .ie-nav-wordmark { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; color: #1A1640; letter-spacing: -0.03em; }
  .ie-nav-wordmark span { color: #5B4FE8; }
  .ie-nav-cta {
    background: #5B4FE8; color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500;
    padding: 0.6rem 1.25rem; border-radius: 6px; transition: background 0.2s;
  }
  .ie-nav-cta:hover { background: #4a3fd4; }

  .ie-hero {
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 8rem 2rem 5rem;
    position: relative; background: #1A1640; overflow: hidden;
  }
  .ie-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .ie-hero-circle1 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(91,79,232,0.3) 0%, transparent 70%);
    top: -200px; left: -150px;
  }
  .ie-hero-circle2 {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,92,53,0.2) 0%, transparent 70%);
    bottom: -100px; right: -100px;
  }
  .ie-hero-circle3 {
    position: absolute; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%);
    top: 40%; right: 10%;
  }
  .ie-hero-eyebrow {
    font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: #00C896; margin-bottom: 1.5rem;
    display: inline-flex; align-items: center; gap: 8px; position: relative;
  }
  .ie-hero-eyebrow::before, .ie-hero-eyebrow::after {
    content: ''; display: block; width: 24px; height: 1px; background: #00C896;
  }
  .ie-hero-h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    line-height: 1.05; letter-spacing: -0.03em;
    color: #F2F0FF; margin-bottom: 1.5rem; position: relative;
  }
  .ie-hero-h1 em { color: #FF5C35; font-style: normal; }
  .ie-hero-h1 strong { color: #FFD166; font-weight: 800; }
  .ie-hero-sub {
    font-size: 1.125rem; color: rgba(242,240,255,0.65);
    max-width: 520px; line-height: 1.7; margin-bottom: 2.5rem; position: relative;
  }
  .ie-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; }
  .ie-btn-primary {
    background: #FF5C35; color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
    padding: 0.875rem 2rem; border-radius: 6px; transition: transform 0.15s, background 0.2s;
  }
  .ie-btn-primary:hover { background: #e84d27; transform: translateY(-1px); }
  .ie-btn-secondary {
    background: transparent; color: #F2F0FF;
    border: 1px solid rgba(242,240,255,0.3); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 400;
    padding: 0.875rem 2rem; border-radius: 6px; transition: border-color 0.2s, background 0.2s;
  }
  .ie-btn-secondary:hover { border-color: rgba(242,240,255,0.6); background: rgba(242,240,255,0.05); }
  .ie-hero-stats {
    display: flex; gap: 3rem; margin-top: 4rem; position: relative;
    border-top: 1px solid rgba(242,240,255,0.1); padding-top: 2rem;
  }
  .ie-stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700; color: #F2F0FF; }
  .ie-stat-num span { color: #5B4FE8; }
  .ie-stat-label { font-size: 0.8rem; color: rgba(242,240,255,0.45); margin-top: 2px; }

  .ie-section { padding: 6rem 2rem; }
  .ie-section-inner { max-width: 1100px; margin: 0 auto; }
  .ie-section-tag {
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
    color: #5B4FE8; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;
  }
  .ie-section-tag::before { content: ''; display: block; width: 20px; height: 1px; background: #5B4FE8; }
  .ie-section-h2 {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    letter-spacing: -0.02em; line-height: 1.15; color: #1A1640; margin-bottom: 1rem;
  }
  .ie-section-sub { font-size: 1rem; color: #5A5880; line-height: 1.7; max-width: 520px; }

  .ie-hiw { background: #fff; }
  .ie-hiw-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-top: 3.5rem; }
  .ie-hiw-card {
    background: #F2F0FF; border-radius: 12px; padding: 2rem;
    border: 1px solid rgba(91,79,232,0.1); transition: transform 0.2s, box-shadow 0.2s;
  }
  .ie-hiw-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(91,79,232,0.1); }
  .ie-hiw-num { font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; color: rgba(91,79,232,0.15); line-height: 1; margin-bottom: 1rem; }
  .ie-hiw-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.25rem; }
  .ie-hiw-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 1.1rem; color: #1A1640; margin-bottom: 0.5rem; }
  .ie-hiw-desc { font-size: 0.9rem; color: #5A5880; line-height: 1.6; }

  .ie-pricing { background: #1A1640; }
  .ie-pricing .ie-section-h2 { color: #F2F0FF; }
  .ie-pricing .ie-section-sub { color: rgba(242,240,255,0.55); }
  .ie-pricing .ie-section-tag { color: #00C896; }
  .ie-pricing .ie-section-tag::before { background: #00C896; }
  .ie-compare-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-top: 3.5rem; }
  .ie-compare-card { border-radius: 12px; padding: 2rem; border: 1px solid rgba(242,240,255,0.08); background: rgba(242,240,255,0.04); }
  .ie-compare-card.featured { background: #5B4FE8; border-color: #5B4FE8; position: relative; }
  .ie-compare-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: #FF5C35; color: #fff;
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 14px; border-radius: 20px;
  }
  .ie-compare-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; color: rgba(242,240,255,0.5); margin-bottom: 1.5rem; }
  .ie-compare-card.featured .ie-compare-name { color: rgba(242,240,255,0.85); }
  .ie-compare-fee { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 3rem; line-height: 1; margin-bottom: 0.25rem; color: rgba(242,240,255,0.3); }
  .ie-compare-card.featured .ie-compare-fee { color: #FFD166; }
  .ie-compare-fee-label { font-size: 0.8rem; color: rgba(242,240,255,0.3); margin-bottom: 1.5rem; }
  .ie-compare-card.featured .ie-compare-fee-label { color: rgba(242,240,255,0.7); }
  .ie-compare-item { display: flex; align-items: flex-start; gap: 8px; font-size: 0.875rem; color: rgba(242,240,255,0.4); margin-bottom: 0.75rem; line-height: 1.4; }
  .ie-compare-card.featured .ie-compare-item { color: rgba(242,240,255,0.9); }
  .ie-compare-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
  .ie-savings-bar {
    margin-top: 3rem; background: rgba(242,240,255,0.04);
    border: 1px solid rgba(242,240,255,0.08); border-radius: 12px; padding: 2rem;
    display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
  }
  .ie-savings-label { font-size: 0.875rem; color: rgba(242,240,255,0.5); flex: 1; min-width: 200px; }
  .ie-savings-label strong { color: #FFD166; font-size: 1.5rem; font-family: 'Syne', sans-serif; display: block; }
  .ie-savings-example { font-size: 0.8rem; color: rgba(242,240,255,0.3); margin-top: 4px; }

  .ie-forms { background: #F2F0FF; }
  .ie-forms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3.5rem; }
  .ie-form-card { background: #fff; border-radius: 16px; padding: 2.5rem; border: 1px solid rgba(91,79,232,0.1); }
  .ie-form-card.restaurant { border-top: 4px solid #5B4FE8; }
  .ie-form-card.customer { border-top: 4px solid #FF5C35; }
  .ie-form-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.3rem; color: #1A1640; margin-bottom: 0.4rem; }
  .ie-form-sub { font-size: 0.875rem; color: #5A5880; margin-bottom: 1.75rem; line-height: 1.5; }
  .ie-input {
    width: 100%; padding: 0.75rem 1rem;
    border: 1px solid rgba(91,79,232,0.2); border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #1A1640;
    background: #F2F0FF; margin-bottom: 0.75rem; outline: none; transition: border-color 0.2s;
  }
  .ie-input:focus { border-color: #5B4FE8; background: #fff; }
  .ie-input::placeholder { color: #9B94F5; }
  .ie-input.error { border-color: #FF5C35; }
  .ie-error-msg { font-size: 0.8rem; color: #FF5C35; margin-bottom: 0.5rem; margin-top: -0.5rem; }
  .ie-submit-restaurant {
    width: 100%; padding: 0.875rem;
    background: #5B4FE8; color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
    border-radius: 8px; margin-top: 0.5rem; transition: background 0.2s, transform 0.15s;
  }
  .ie-submit-restaurant:hover:not(:disabled) { background: #4a3fd4; transform: translateY(-1px); }
  .ie-submit-restaurant:disabled { opacity: 0.6; cursor: not-allowed; }
  .ie-submit-customer {
    width: 100%; padding: 0.875rem;
    background: #FF5C35; color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
    border-radius: 8px; margin-top: 0.5rem; transition: background 0.2s, transform 0.15s;
  }
  .ie-submit-customer:hover:not(:disabled) { background: #e84d27; transform: translateY(-1px); }
  .ie-submit-customer:disabled { opacity: 0.6; cursor: not-allowed; }
  .ie-success { text-align: center; padding: 2rem; color: #00C896; font-weight: 500; font-family: 'Syne', sans-serif; font-size: 1.1rem; }
  .ie-success-sub { font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #5A5880; font-weight: 400; margin-top: 4px; }

  .ie-footer {
    background: #1A1640; padding: 2rem 2.5rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .ie-footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #F2F0FF; letter-spacing: -0.02em; }
  .ie-footer-logo span { color: #5B4FE8; }
  .ie-footer-text { font-size: 0.8rem; color: rgba(242,240,255,0.3); }
  .ie-footer-alyra { font-size: 0.75rem; color: rgba(242,240,255,0.2); }

  @media (max-width: 768px) {
    .ie-nav { padding: 1rem 1.25rem; }
    .ie-hero-stats { gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
    .ie-compare-grid { grid-template-columns: 1fr; }
    .ie-forms-grid { grid-template-columns: 1fr; }
    .ie-hiw-grid { grid-template-columns: 1fr; }
  }
`;

const TableIcon = ({ size = 44, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <rect x="12" y="58" width="72" height="7" rx="3.5" fill={dark ? "#F2F0FF" : "#5B4FE8"} />
    <rect x="16" y="65" width="10" height="22" rx="3" fill="#9B94F5" />
    <rect x="70" y="65" width="10" height="22" rx="3" fill="#9B94F5" />
    <ellipse cx="48" cy="52" rx="22" ry="6" fill="none" stroke="#FF5C35" strokeWidth="2" />
    <ellipse cx="48" cy="52" rx="14" ry="4" fill="#FFD166" fillOpacity="0.25" />
    <path d="M34 42 Q36 36 34 30" stroke="#00C896" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 40 Q50 34 48 28" stroke="#00C896" strokeWidth="2" strokeLinecap="round" />
    <path d="M62 42 Q64 36 62 30" stroke="#00C896" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 30 Q36 26 34 22" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M48 28 Q50 24 48 20" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M62 30 Q64 26 62 22" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

function RestaurantForm() {
  const [form, setForm] = useState({ name: "", restaurant: "", city: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.from("restaurant_signups").insert([{
      name: form.name,
      restaurant: form.restaurant,
      city: form.city,
      email: form.email,
    }]);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        setError("This email is already registered. We'll be in touch!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div className="ie-success">
      You're on the list!
      <div className="ie-success-sub">We'll be in touch before launch. Spread the word.</div>
    </div>
  );

  return (
    <form onSubmit={submit}>
      <input className="ie-input" name="name" placeholder="Your name" value={form.name} onChange={handle} required />
      <input className="ie-input" name="restaurant" placeholder="Restaurant name" value={form.restaurant} onChange={handle} required />
      <input className="ie-input" name="city" placeholder="City" value={form.city} onChange={handle} />
      <input className="ie-input" name="email" type="email" placeholder="Email address" value={form.email} onChange={handle} required />
      {error && <div className="ie-error-msg">{error}</div>}
      <button type="submit" className="ie-submit-restaurant" disabled={loading}>
        {loading ? "Submitting..." : "Join as a restaurant →"}
      </button>
    </form>
  );
}

function CustomerForm() {
  const [form, setForm] = useState({ email: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.from("customer_waitlist").insert([{
      email: form.email,
      city: form.city,
    }]);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        setError("You're already on the waitlist!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div className="ie-success">
      You're on the waitlist!
      <div className="ie-success-sub">We'll let you know when IndieEats launches in your area.</div>
    </div>
  );

  return (
    <form onSubmit={submit}>
      <input className="ie-input" name="email" type="email" placeholder="Your email address" value={form.email} onChange={handle} required />
      <input className="ie-input" name="city" placeholder="Your city" value={form.city} onChange={handle} />
      {error && <div className="ie-error-msg">{error}</div>}
      <button type="submit" className="ie-submit-customer" disabled={loading}>
        {loading ? "Submitting..." : "Join the waitlist →"}
      </button>
    </form>
  );
}

export default function IndieEats() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{styles}</style>
      <div className="ie-page">

        <nav className="ie-nav">
          <div className="ie-nav-logo">
            <TableIcon size={32} />
            <span className="ie-nav-wordmark">Indie<span>Eats</span></span>
          </div>
          <button className="ie-nav-cta" onClick={() => scrollTo("signup")}>Get early access</button>
        </nav>

        <section className="ie-hero">
          <div className="ie-hero-bg">
            <div className="ie-hero-circle1" />
            <div className="ie-hero-circle2" />
            <div className="ie-hero-circle3" />
          </div>
          <div className="ie-hero-eyebrow">Not your usual catering</div>
          <h1 className="ie-hero-h1">
            Catering from restaurants<br />
            <em>worth</em> <strong>talking about</strong>
          </h1>
          <p className="ie-hero-sub">
            IndieEats connects you with independent local restaurants offering catering that actually stands out — and gives those restaurants a fairer deal.
          </p>
          <div className="ie-hero-actions">
            <button className="ie-btn-primary" onClick={() => scrollTo("signup")}>List my restaurant</button>
            <button className="ie-btn-secondary" onClick={() => scrollTo("signup")}>Find local catering</button>
          </div>
          <div className="ie-hero-stats">
            <div>
              <div className="ie-stat-num">6<span>%</span></div>
              <div className="ie-stat-label">Our commission</div>
            </div>
            <div>
              <div className="ie-stat-num">25<span>%</span></div>
              <div className="ie-stat-label">The big guys charge</div>
            </div>
            <div>
              <div className="ie-stat-num">100<span>%</span></div>
              <div className="ie-stat-label">Independent restaurants</div>
            </div>
          </div>
        </section>

        <section className="ie-section ie-hiw" id="how">
          <div className="ie-section-inner">
            <div className="ie-section-tag">For restaurants</div>
            <h2 className="ie-section-h2">Built for restaurants that deserve better</h2>
            <p className="ie-section-sub">Stop getting buried on platforms that favor chains. IndieEats puts independent restaurants front and center.</p>
            <div className="ie-hiw-grid">
              {[
                { num: "01", icon: "📋", bg: "#EEEDFE", title: "List your restaurant", desc: "Create your profile in minutes. Add your catering menu, photos, and story. No hidden setup fees." },
                { num: "02", icon: "🔍", bg: "#FFF0EE", title: "Get discovered", desc: "Customers searching for something different find you first. Our algorithm never buries independents under chains." },
                { num: "03", icon: "📦", bg: "#EFFFFA", title: "Receive orders", desc: "Orders come straight to you. Accept, manage, and track everything from your dashboard." },
                { num: "04", icon: "🚗", bg: "#FFFBE8", title: "We handle delivery", desc: "Use our Uber Direct integration or handle your own. Either way, the customer experience is seamless." },
              ].map((s) => (
                <div key={s.num} className="ie-hiw-card">
                  <div className="ie-hiw-num">{s.num}</div>
                  <div className="ie-hiw-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div className="ie-hiw-title">{s.title}</div>
                  <div className="ie-hiw-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ie-section ie-pricing" id="pricing">
          <div className="ie-section-inner">
            <div className="ie-section-tag">Pricing</div>
            <h2 className="ie-section-h2">Finally, a platform that's on your side</h2>
            <p className="ie-section-sub">The math speaks for itself. Keep more of every order you earn.</p>
            <div className="ie-compare-grid">
              {[
                { name: "EZ Cater", fee: "25%", label: "per order commission", items: ["High commission on every order", "Pay-to-play visibility", "Lost among chain restaurants", "Limited support"], dot: "rgba(242,240,255,0.2)", featured: false },
                { name: "IndieEats", fee: "6%", label: "per order + flat monthly", items: ["Low 6% commission only", "Independent-first visibility", "Your story, front and center", "Real support from real people"], dot: "#FFD166", featured: true },
                { name: "DoorDash", fee: "30%", label: "per order commission", items: ["Highest fees in the market", "Built for fast food chains", "Zero indie restaurant focus", "No catering specialization"], dot: "rgba(242,240,255,0.2)", featured: false },
              ].map((c) => (
                <div key={c.name} className={`ie-compare-card${c.featured ? " featured" : ""}`}>
                  {c.featured && <div className="ie-compare-badge">Best for you</div>}
                  <div className="ie-compare-name">{c.name}</div>
                  <div className="ie-compare-fee">{c.fee}</div>
                  <div className="ie-compare-fee-label">{c.label}</div>
                  {c.items.map((item) => (
                    <div key={item} className="ie-compare-item">
                      <div className="ie-compare-dot" style={{ background: c.dot }} />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="ie-savings-bar">
              <div className="ie-savings-label">
                <strong>$95 saved</strong>
                on every $500 catering order vs EZ Cater
                <div className="ie-savings-example">EZ Cater takes $125 · IndieEats takes $30 · You keep the difference</div>
              </div>
              <button className="ie-btn-primary" onClick={() => scrollTo("signup")}>List my restaurant free →</button>
            </div>
          </div>
        </section>

        <section className="ie-section ie-forms" id="signup">
          <div className="ie-section-inner">
            <div className="ie-section-tag">Early access</div>
            <h2 className="ie-section-h2">Be first on IndieEats</h2>
            <p className="ie-section-sub">We're launching soon. Get on the list — whether you're a restaurant ready for a better deal, or a customer ready for better food.</p>
            <div className="ie-forms-grid">
              <div className="ie-form-card restaurant">
                <div className="ie-form-title">For restaurants</div>
                <div className="ie-form-sub">Join free. Keep more of every order. Get found by customers who actually want something different.</div>
                <RestaurantForm />
              </div>
              <div className="ie-form-card customer">
                <div className="ie-form-title">For customers</div>
                <div className="ie-form-sub">Skip the chains. Get notified when IndieEats launches in your city and be first to discover something worth ordering.</div>
                <CustomerForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="ie-footer">
          <div>
            <div className="ie-footer-logo">Indie<span>Eats</span></div>
            <div className="ie-footer-alyra">A product by Alyra Solutions</div>
          </div>
          <div className="ie-footer-text">© 2026 IndieEats · getindieeats.com</div>
        </footer>

      </div>
    </>
  );
}
