import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const DARK = "#0D0B07";
const CHARCOAL = "#1A1710";
const CREAM = "#F5EDD6";
const MUTED = "#8A7E6A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: ${GOLD};
    --dark: ${DARK};
    --charcoal: ${CHARCOAL};
    --cream: ${CREAM};
    --muted: ${MUTED};
    scroll-behavior: smooth;
  }

  body { background: var(--dark); color: var(--cream); font-family: 'Josefin Sans', sans-serif; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 3rem;
    background: linear-gradient(to bottom, rgba(13,11,7,0.95) 0%, transparent 100%);
    backdrop-filter: blur(4px);
    transition: background 0.4s;
  }
  .nav.scrolled { background: rgba(13,11,7,0.97); border-bottom: 1px solid rgba(201,168,76,0.15); }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 300; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a { color: var(--cream); text-decoration: none; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 300; transition: color 0.3s; }
  .nav-links a:hover { color: var(--gold); }
  .nav-reserve { background: var(--gold); color: var(--dark) !important; padding: 0.55rem 1.4rem; font-weight: 400 !important; letter-spacing: 0.12em !important; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { width: 24px; height: 1px; background: var(--cream); transition: all 0.3s; }

  /* HERO */
  .hero {
    position: relative; height: 100vh; min-height: 600px;
    display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80') center/cover no-repeat;
    transform: scale(1.05);
    animation: heroZoom 20s ease-in-out infinite alternate;
  }
  @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(13,11,7,0.55) 0%, rgba(13,11,7,0.4) 40%, rgba(13,11,7,0.85) 100%); }
  .hero-content { position: relative; z-index: 2; max-width: 780px; padding: 0 2rem; }
  .hero-pre { font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; animation: fadeUp 1s 0.3s both; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 7vw, 5.5rem); font-weight: 300; line-height: 1.1; color: var(--cream); margin-bottom: 1rem; animation: fadeUp 1s 0.5s both; }
  .hero-title em { color: var(--gold); font-style: italic; }
  .hero-tagline { font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,214,0.7); margin-bottom: 2.8rem; animation: fadeUp 1s 0.7s both; }
  .hero-divider { width: 40px; height: 1px; background: var(--gold); margin: 0 auto 2.8rem; animation: fadeUp 1s 0.9s both; }
  .hero-btns { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; animation: fadeUp 1s 1.1s both; }
  .btn-primary { background: var(--gold); color: var(--dark); padding: 0.9rem 2.4rem; font-family: 'Josefin Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; border: none; cursor: pointer; font-weight: 400; transition: all 0.3s; text-decoration: none; display: inline-block; }
  .btn-primary:hover { background: #d4b05c; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
  .btn-outline { border: 1px solid rgba(201,168,76,0.6); color: var(--cream); background: transparent; padding: 0.9rem 2.4rem; font-family: 'Josefin Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; font-weight: 300; transition: all 0.3s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .hero-scroll { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; animation: fadeUp 1s 1.4s both; }
  .hero-scroll span { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); }
  .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2s infinite; }
  @keyframes scrollPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

  /* SECTION COMMON */
  section { padding: 7rem 3rem; }
  .section-label { font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 300; color: var(--cream); line-height: 1.15; }
  .section-title em { color: var(--gold); font-style: italic; }
  .gold-line { width: 40px; height: 1px; background: var(--gold); margin: 1.6rem 0; }

  /* ABOUT */
  .about { background: var(--charcoal); display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .about-img-wrap { position: relative; }
  .about-img { width: 100%; height: 520px; object-fit: cover; }
  .about-img-accent { position: absolute; bottom: -1.5rem; right: -1.5rem; width: 60%; height: 60%; border: 1px solid rgba(201,168,76,0.3); z-index: -1; }
  .about-text p { color: rgba(245,237,214,0.72); font-size: 0.9rem; line-height: 1.9; letter-spacing: 0.04em; font-weight: 300; margin-bottom: 1rem; }
  .about-stats { display: flex; gap: 2.5rem; margin-top: 2.5rem; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 300; color: var(--gold); line-height: 1; }
  .stat-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 0.3rem; }

  /* MENU */
  .menu { background: var(--dark); text-align: center; }
  .menu-header { margin-bottom: 3.5rem; }
  .menu-header .gold-line { margin: 1.6rem auto; }
  .menu-tabs { display: flex; justify-content: center; gap: 0; margin-bottom: 3rem; border: 1px solid rgba(201,168,76,0.2); display: inline-flex; }
  .menu-tab { padding: 0.75rem 2rem; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; background: transparent; border: none; color: var(--muted); font-family: 'Josefin Sans', sans-serif; }
  .menu-tab.active { background: var(--gold); color: var(--dark); }
  .menu-tab:hover:not(.active) { color: var(--gold); }
  .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .menu-card { background: var(--charcoal); overflow: hidden; text-align: left; transition: transform 0.3s; position: relative; }
  .menu-card:hover { transform: translateY(-6px); }
  .menu-card-img { width: 100%; height: 220px; object-fit: cover; }
  .menu-card-body { padding: 1.5rem; }
  .menu-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 400; color: var(--cream); margin-bottom: 0.4rem; }
  .menu-card-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.7; letter-spacing: 0.04em; margin-bottom: 1rem; font-weight: 300; }
  .menu-card-price { font-size: 0.85rem; letter-spacing: 0.1em; color: var(--gold); font-weight: 300; }
  .menu-card-tag { position: absolute; top: 1rem; right: 1rem; background: var(--gold); color: var(--dark); font-size: 0.6rem; letter-spacing: 0.15em; padding: 0.25rem 0.6rem; text-transform: uppercase; }

  /* GALLERY */
  .gallery { background: var(--charcoal); }
  .gallery-header { margin-bottom: 3rem; }
  .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: 240px 240px; gap: 0.8rem; }
  .gallery-item { overflow: hidden; cursor: pointer; }
  .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; filter: brightness(0.88); }
  .gallery-item:hover img { transform: scale(1.06); filter: brightness(1); }

  /* REVIEWS */
  .reviews { background: var(--dark); text-align: center; }
  .reviews-header { margin-bottom: 3.5rem; }
  .reviews-header .gold-line { margin: 1.6rem auto; }
  .reviews-platforms { display: flex; justify-content: center; gap: 3rem; margin-bottom: 3.5rem; flex-wrap: wrap; }
  .platform-badge { display: flex; align-items: center; gap: 1rem; background: var(--charcoal); padding: 1.2rem 2rem; border: 1px solid rgba(201,168,76,0.15); }
  .platform-name { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .platform-rating { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: var(--gold); line-height: 1; }
  .stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 0.1em; }
  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .review-card { background: var(--charcoal); padding: 2rem; text-align: left; border-bottom: 2px solid var(--gold); }
  .review-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; color: rgba(245,237,214,0.85); line-height: 1.75; margin-bottom: 1.5rem; font-weight: 300; }
  .review-author { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .review-source { font-size: 0.62rem; letter-spacing: 0.15em; color: var(--gold); margin-top: 0.2rem; }

  /* RESERVATION */
  .reservation { background: linear-gradient(135deg, var(--charcoal) 0%, #12100A 100%); display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .res-info p { color: rgba(245,237,214,0.65); font-size: 0.88rem; line-height: 1.9; font-weight: 300; letter-spacing: 0.04em; margin-bottom: 2rem; }
  .res-contact { display: flex; flex-direction: column; gap: 1rem; }
  .res-contact-item { display: flex; align-items: center; gap: 1rem; color: var(--cream); text-decoration: none; transition: color 0.3s; }
  .res-contact-item:hover { color: var(--gold); }
  .res-icon { width: 40px; height: 40px; border: 1px solid rgba(201,168,76,0.3); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  .res-contact-text span { display: block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .res-contact-text strong { font-size: 0.85rem; font-weight: 300; letter-spacing: 0.05em; }
  .res-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label { font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); }
  .form-input { background: rgba(245,237,214,0.04); border: 1px solid rgba(201,168,76,0.2); padding: 0.9rem 1.2rem; color: var(--cream); font-family: 'Josefin Sans', sans-serif; font-size: 0.85rem; font-weight: 300; letter-spacing: 0.05em; outline: none; transition: border 0.3s; }
  .form-input:focus { border-color: var(--gold); }
  .form-input::placeholder { color: rgba(245,237,214,0.25); }
  .form-submit { background: var(--gold); color: var(--dark); border: none; padding: 1.1rem; font-family: 'Josefin Sans', sans-serif; font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; font-weight: 400; transition: all 0.3s; margin-top: 0.5rem; }
  .form-submit:hover { background: #d4b05c; box-shadow: 0 8px 24px rgba(201,168,76,0.25); }
  .form-success { display: flex; align-items: center; gap: 0.8rem; padding: 1rem 1.5rem; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); color: var(--gold); font-size: 0.78rem; letter-spacing: 0.08em; margin-top: 0.5rem; }

  /* LOCATION */
  .location { background: var(--dark); display: grid; grid-template-columns: 1fr 1.4fr; gap: 0; align-items: stretch; padding: 0; }
  .location-info { padding: 6rem 4rem; display: flex; flex-direction: column; justify-content: center; }
  .location-info p { color: rgba(245,237,214,0.65); font-size: 0.88rem; line-height: 1.9; font-weight: 300; margin-bottom: 2.5rem; }
  .location-details { display: flex; flex-direction: column; gap: 1.5rem; }
  .location-item { display: flex; gap: 1.2rem; align-items: flex-start; }
  .location-icon { font-size: 1rem; color: var(--gold); margin-top: 0.1rem; flex-shrink: 0; }
  .location-item-text span { display: block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.3rem; }
  .location-item-text p { color: var(--cream); font-size: 0.85rem; font-weight: 300; line-height: 1.6; margin: 0; }
  .map-wrap { height: 100%; min-height: 480px; background: #1a1a1a; overflow: hidden; }
  .map-wrap iframe { width: 100%; height: 100%; border: none; filter: grayscale(40%) contrast(1.05); min-height: 480px; }

  /* CONTACT / FOOTER */
  .footer { background: #070604; padding: 4rem 3rem 2rem; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; border-bottom: 1px solid rgba(201,168,76,0.1); padding-bottom: 3rem; }
  .footer-brand .nav-logo { display: block; margin-bottom: 1rem; font-size: 1.2rem; }
  .footer-brand p { color: var(--muted); font-size: 0.8rem; line-height: 1.8; font-weight: 300; max-width: 280px; }
  .footer-col h4 { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-col ul li { color: var(--muted); font-size: 0.8rem; font-weight: 300; letter-spacing: 0.04em; }
  .footer-col ul li a { color: var(--muted); text-decoration: none; transition: color 0.3s; }
  .footer-col ul li a:hover { color: var(--gold); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-bottom p { color: var(--muted); font-size: 0.7rem; letter-spacing: 0.08em; }
  .footer-social { display: flex; gap: 1rem; }
  .social-link { width: 34px; height: 34px; border: 1px solid rgba(201,168,76,0.2); display: flex; align-items: center; justify-content: center; color: var(--muted); text-decoration: none; font-size: 0.8rem; transition: all 0.3s; }
  .social-link:hover { border-color: var(--gold); color: var(--gold); }

  /* MOBILE */
  @media (max-width: 900px) {
    .nav { padding: 1.2rem 1.5rem; }
    .nav-links { display: none; }
    .nav-links.open { display: flex; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(13,11,7,0.98); justify-content: center; align-items: center; gap: 2.5rem; z-index: 99; }
    .nav-links.open li { font-size: 1.1rem; }
    .hamburger { display: flex; z-index: 100; }
    section { padding: 5rem 1.5rem; }
    .about { grid-template-columns: 1fr; gap: 2.5rem; }
    .about-img { height: 300px; }
    .about-img-accent { display: none; }
    .menu-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
    .reviews-grid { grid-template-columns: 1fr; }
    .reservation { grid-template-columns: 1fr; gap: 3rem; }
    .form-row { grid-template-columns: 1fr; }
    .location { grid-template-columns: 1fr; }
    .location-info { padding: 4rem 1.5rem; }
    .footer-top { grid-template-columns: 1fr; gap: 2rem; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .hero-btns { flex-direction: column; align-items: center; }
    .about-stats { gap: 1.5rem; }
  }
  @media (max-width: 600px) {
    .menu-grid { grid-template-columns: 1fr; }
    .reviews-platforms { flex-direction: column; align-items: center; }
    .gallery-grid { grid-template-columns: 1fr; }
    .gallery-item:nth-child(1) { grid-column: span 1; }
    .hero-title { font-size: 2.4rem; }
  }
`;

const menuData = {
  Starters: [
    { name: "Gilafi Seekh Kebab", desc: "Minced lamb with herbs, wrapped in peppers, grilled on charcoal", price: "₹ 520", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80", tag: "Chef's Pick" },
    { name: "Crispy Paneer Tikka", desc: "Chargrilled cottage cheese with saffron marinade and mint chutney", price: "₹ 420", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80" },
    { name: "Prawns Koliwada", desc: "Spiced coastal prawns in chickpea batter, lime aioli", price: "₹ 680", img: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80", tag: "Bestseller" },
  ],
  "Main Course": [
    { name: "Raan-e-Aja", desc: "Slow-braised whole leg of lamb, 48-hour marination, saffron jus", price: "₹ 1,450", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80", tag: "Signature" },
    { name: "Butter Chicken Royale", desc: "Kasoori methi cream gravy, coal-smoked tender chicken", price: "₹ 680", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80", tag: "Bestseller" },
    { name: "Dal Makhani Noir", desc: "24-hour black lentils, cultured cream, hand-churned butter", price: "₹ 480", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80" },
  ],
  Desserts: [
    { name: "Gulab Jamun Soufflé", desc: "Warm rosewater soufflé, cardamom ice cream, pistachio dust", price: "₹ 380", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80", tag: "Chef's Pick" },
    { name: "Saffron Panna Cotta", desc: "Kesar-infused Italian custard, mango coulis, gold leaf", price: "₹ 320", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80" },
    { name: "Kulfi Tart", desc: "Buttery shell with pistachio kulfi, rose gel, fennel brittle", price: "₹ 290", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  ],
};

const galleryImgs = [
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80", alt: "Ambience" },
  { url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80", alt: "Food" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Dish" },
  { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80", alt: "Interior" },
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Fine dining" },
];

const reviews = [
  { text: "Aja World is a revelation. The Raan-e-Aja melted off the bone and the ambience made us feel like royalty. Easily the finest dining experience in Chandigarh.", author: "Priya S.", source: "Zomato — ★★★★★" },
  { text: "From the moment we walked in, we were transported. Impeccable service, breathtaking plating, and flavours that linger long after the evening ends.", author: "Rahul M.", source: "TripAdvisor — ★★★★★" },
  { text: "A hidden gem that deserves all its accolades. The butter chicken royale and dal makhani are worth every rupee. Cannot wait to return.", author: "Simran K.", source: "Zomato — ★★★★★" },
];

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Starters");
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.date || !form.time) return;
    const msg = `Hello! I'd like to reserve a table at Aja World Chandigarh.%0AName: ${form.name}%0APhone: ${form.phone}%0ADate: ${form.date}%0ATime: ${form.time}%0AGuests: ${form.guests || "2"}`;
    window.open(`https://wa.me/911234567890?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <span className="nav-logo">Aja World</span>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {["about", "menu", "gallery", "reviews", "reservation", "location"].map(s => (
            <li key={s}><a href={`#${s}`} onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
          ))}
          <li><a className="nav-reserve" href="#reservation" onClick={() => scrollTo("reservation")}>Reserve</a></li>
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}} />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-pre">Chandigarh's Finest Dining</p>
          <h1 className="hero-title">Aja World<br /><em>Chandigarh</em></h1>
          <div className="hero-divider" />
          <p className="hero-tagline">Experience Flavours Like Never Before</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("menu")}>View Menu</button>
            <button className="btn-outline" onClick={() => scrollTo("reservation")}>Reserve a Table</button>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-img-wrap">
          <img className="about-img" src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80" alt="Restaurant ambience" />
          <div className="about-img-accent" />
        </div>
        <div className="about-text">
          <p className="section-label">Our Story</p>
          <h2 className="section-title">Where Every Meal<br />Becomes a <em>Memory</em></h2>
          <div className="gold-line" />
          <p>Aja World Chandigarh is more than a restaurant — it is an experience carefully curated for those who believe dining is an art form. Nestled in the heart of Chandigarh, our doors open to a world where bold Indian flavours meet refined culinary craft.</p>
          <p>Our chefs draw from ancient recipes and modern technique, sourcing the finest seasonal ingredients to create plates that surprise and delight. Whether an intimate dinner or a grand celebration, every visit is attended to with the same devotion to excellence.</p>
          <p>We believe in slowing down, savouring each bite, and leaving with memories that linger far beyond dessert.</p>
          <div className="about-stats">
            <div className="stat"><div className="stat-num">4.8</div><div className="stat-label">Zomato Rating</div></div>
            <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Reviews</div></div>
            <div className="stat"><div className="stat-num">8</div><div className="stat-label">Years of Excellence</div></div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu" id="menu">
        <div className="menu-header">
          <p className="section-label">Culinary Journey</p>
          <h2 className="section-title">Menu <em>Highlights</em></h2>
          <div className="gold-line" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="menu-tabs">
            {Object.keys(menuData).map(tab => (
              <button key={tab} className={`menu-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item, i) => (
            <div key={i} className="menu-card">
              {item.tag && <span className="menu-card-tag">{item.tag}</span>}
              <img className="menu-card-img" src={item.img} alt={item.name} loading="lazy" />
              <div className="menu-card-body">
                <div className="menu-card-name">{item.name}</div>
                <div className="menu-card-desc">{item.desc}</div>
                <div className="menu-card-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="gallery-header">
          <p className="section-label">Visual Story</p>
          <h2 className="section-title">A Feast for the <em>Eyes</em></h2>
          <div className="gold-line" />
        </div>
        <div className="gallery-grid">
          {galleryImgs.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img.url} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews">
        <div className="reviews-header">
          <p className="section-label">What Guests Say</p>
          <h2 className="section-title">Loved Across <em>Every Table</em></h2>
          <div className="gold-line" />
        </div>
        <div className="reviews-platforms">
          <div className="platform-badge">
            <div>
              <div className="platform-name">Zomato</div>
              <div className="platform-rating">4.8</div>
              <div className="stars">★★★★★</div>
            </div>
          </div>
          <div className="platform-badge">
            <div>
              <div className="platform-name">TripAdvisor</div>
              <div className="platform-rating">4.7</div>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">{r.author}</div>
              <div className="review-source">{r.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section className="reservation" id="reservation">
        <div className="res-info">
          <p className="section-label">Book Your Evening</p>
          <h2 className="section-title">Reserve a <em>Table</em></h2>
          <div className="gold-line" />
          <p>Secure your table directly with us for the most seamless experience. No third-party platforms, no extra fees — just an evening crafted entirely around you.</p>
          <div className="res-contact">
            <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="res-contact-item">
              <div className="res-icon">📱</div>
              <div className="res-contact-text"><span>WhatsApp</span><strong>+91 98765 43210</strong></div>
            </a>
            <a href="tel:+911234567890" className="res-contact-item">
              <div className="res-icon">📞</div>
              <div className="res-contact-text"><span>Call Us</span><strong>+91 98765 43210</strong></div>
            </a>
            <div className="res-contact-item">
              <div className="res-icon">🕐</div>
              <div className="res-contact-text"><span>Open Daily</span><strong>12:00 PM — 11:30 PM</strong></div>
            </div>
          </div>
        </div>
        <div>
          <div className="res-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" placeholder="+91 —" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input className="form-input" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <input className="form-input" placeholder="e.g. 2" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} />
            </div>
            <button className="form-submit" onClick={handleSubmit}>Confirm via WhatsApp →</button>
            {submitted && <div className="form-success">✓ &nbsp;Opening WhatsApp — we'll confirm your table shortly!</div>}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location" id="location" style={{ padding: 0 }}>
        <div className="location-info">
          <p className="section-label">Find Us</p>
          <h2 className="section-title">At the Heart of <em>Chandigarh</em></h2>
          <div className="gold-line" />
          <p>Located in the vibrant pulse of Chandigarh, Aja World is easy to reach and hard to forget. Ample parking and valet service available.</p>
          <div className="location-details">
            <div className="location-item">
              <span className="location-icon">📍</span>
              <div className="location-item-text"><span>Address</span><p>SCO 123-124, Sector 17C, Chandigarh, 160017</p></div>
            </div>
            <div className="location-item">
              <span className="location-icon">🕐</span>
              <div className="location-item-text"><span>Hours</span><p>Mon–Sun: 12:00 PM – 11:30 PM<br />Bar closes at 12:00 AM</p></div>
            </div>
            <div className="location-item">
              <span className="location-icon">📞</span>
              <div className="location-item-text"><span>Contact</span><p>+91 98765 43210</p></div>
            </div>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Aja World Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4560786022636!2d76.77600!3d30.73550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ef96b%3A0xa5ff67f9527d5207!2sSector%2017%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="nav-logo">Aja World Chandigarh</span>
            <p>A premium dining destination where culinary artistry meets timeless hospitality. Every evening is an occasion at Aja World.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {["about", "menu", "gallery", "reviews", "reservation"].map(s => (
                <li key={s}><a href={`#${s}`} onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>+91 98765 43210</li>
              <li>hello@ajaworld.in</li>
              <li>SCO 123-124, Sector 17C</li>
              <li>Chandigarh — 160017</li>
              <li style={{ marginTop: "0.5rem", color: GOLD }}>12 PM – 11:30 PM Daily</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Aja World Chandigarh. All rights reserved.</p>
          <div className="footer-social">
            <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">ig</a>
            <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">fb</a>
            <a className="social-link" href="https://wa.me/911234567890" target="_blank" rel="noreferrer" title="WhatsApp">wa</a>
          </div>
        </div>
      </footer>
    </>
  );
}


