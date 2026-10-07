import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import brandArtwork from "@/assets/pixelforge-official-brand.jpg.asset.json";
import gingerImage from "@/assets/ginger-concept.webp";
import fitnessImage from "@/assets/fitness-concept.webp";
import learningImage from "@/assets/learning-concept.webp";
import { PORTFOLIO_CONFIG, PRICING_CONFIG, SITE_CONFIG } from "@/lib/site-config";

const navItems = [
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const services = [
  ["01", "WEB DESIGN", "Modern, responsive websites built around the actual business."],
  ["02", "DIGITAL EXPERIENCES", "Interactive experiences people remember."],
  ["03", "PROMOTIONAL REELS", "Short-form promotional videos for Reels and YouTube Shorts."],
  ["04", "MOBILE-FIRST DESIGN", "Designed beautifully for the device your customers use most."],
  ["05", "WHATSAPP + MAPS", "Make it simple to get in touch and find your business."],
  ["06", "WEBSITE MAINTENANCE", "Updates, improvements and ongoing support when needed."],
];

const audiences = [
  "Restaurants",
  "Cafés",
  "Bakeries",
  "Gyms",
  "Fitness centres",
  "Salons",
  "Coaching",
  "Tuition",
  "Clinics",
  "Retail",
  "Local brands",
  "Startups",
];

const principles = [
  ["01", "BUILT FOR YOUR BUSINESS", "Designed around your business, not forced into a generic template."],
  ["02", "PREMIUM, WITHOUT THE OVERHEAD", "Professional digital design without unnecessary complexity."],
  ["03", "FAST & RESPONSIVE", "Thoughtfully made for modern users, especially on mobile."],
  ["04", "DESIGNED TO CONVERT", "Clear calls to action and straightforward customer journeys."],
];

const steps = [
  ["01", "DISCOVER", "We understand your business, customers and goals."],
  ["02", "DESIGN", "We shape the visual direction and experience."],
  ["03", "BUILD", "We develop your responsive website."],
  ["04", "REFINE", "We test, polish and optimise each detail."],
  ["05", "LAUNCH", "We deploy your finished website."],
];

const projectTypeOptions = [
  "Business Website",
  "Restaurant Website",
  "Gym Website",
  "Coaching Website",
  "Promotional Reel",
  "Interactive Experience",
  "E-commerce",
  "Other",
];

function whatsappLink() {
  const digits = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  return digits.length > 0 ? `https://wa.me/${digits}` : undefined;
}

function ConfiguredDemo({ url, children }: { url: string; children: string }) {
  return url ? (
    <a className="text-link" href={url} target="_blank" rel="noreferrer">
      {children} <ArrowUpRight aria-hidden="true" />
    </a>
  ) : (
    <span className="demo-label">CONCEPT / COMING SOON</span>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PixelForge Studio — Premium Digital Experiences for Local Businesses" },
      {
        name: "description",
        content:
          "PixelForge Studio creates premium, modern, mobile-first websites, digital experiences and promotional content for local businesses.",
      },
      {
        property: "og:title",
        content: "PixelForge Studio — Premium Digital Experiences for Local Businesses",
      },
      {
        property: "og:description",
        content:
          "Premium, modern, mobile-first websites, digital experiences and promotional content for local businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "PixelForge Studio — Premium Digital Experiences for Local Businesses",
      },
      {
        name: "twitter:description",
        content:
          "Premium, modern, mobile-first websites, digital experiences and promotional content for local businesses.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formFeedback, setFormFeedback] = useState("");
  const whatsapp = whatsappLink();

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Project type: ${project}`,
      "",
      message,
    ].join("\n");
    setFormFeedback("Your email app is opening with your project details ready to send.");
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Project enquiry — ${project}`)}&body=${encodeURIComponent(body)}`;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement-bar">
        <span>INDEPENDENT DIGITAL STUDIO</span>
        <span>CRAFTING PREMIUM DIGITAL EXPERIENCES</span>
        <a href={`mailto:${SITE_CONFIG.email}`}>AVAILABLE FOR SELECT PROJECTS <ArrowUpRight aria-hidden="true" /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="PixelForge Studio home">
          <img src={brandArtwork.url} alt="PixelForge Studio PF monogram" width="40" height="40" />
          <span>PIXELFORGE<span className="wordmark-small">STUDIO</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#contact">LET’S TALK <ArrowUpRight aria-hidden="true" /></a>
        <Button
          className="menu-toggle"
          variant="outline"
          size="icon"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item.label} href={item.href} onClick={closeMenu}>{item.label}<ArrowUpRight aria-hidden="true" /></a>)}
        </nav>
      )}

      <div id="main-content" />
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-index"><span>PF—001</span><span>INDEPENDENT BY DESIGN</span></div>
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow"><span className="status-dot" /> A DIGITAL STUDIO FOR AMBITIOUS LOCAL BUSINESS</span>
          <h1 id="hero-title">A better way<br />to <span>show up.</span></h1>
          <div className="hero-bottom">
            <div className="hero-brandline"><span>PIXELFORGE STUDIO</span><span>CRAFTING PREMIUM DIGITAL EXPERIENCES</span></div>
            <div className="hero-actions">
              <a className="button-primary" href="#studio">EXPLORE PIXELFORGE <ArrowDown aria-hidden="true" /></a>
              <span className="hero-aside">FOR BUSINESSES<br />READY TO STAND OUT.</span>
            </div>
          </div>
        </div>
        <a className="hero-scroll" href="#studio"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
        <span className="hero-vertical" aria-hidden="true">DESIGN — DETAIL — DIGITAL</span>
      </section>

      <section className="intro-section section-wrap" id="studio">
        <div className="intro-meta"><span className="eyebrow">01 / THE STUDIO</span><span className="section-mark">A DIGITAL PARTNER FOR THE NEXT STEP.</span></div>
        <div className="intro-copy">
          <h2>We don’t just build websites.<br /><span>We build digital experiences.</span></h2>
          <div className="intro-lower"><span className="gold-rule" /><p>Designed for businesses that want to be noticed. Made with care, built for real customers, and tailored to your business from the first click.</p><a className="text-link" href="#services">MEET THE STUDIO <ArrowDown aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="services-section section-wrap" id="services">
        <div className="section-heading"><div><span className="eyebrow">02 / OUR PRACTICE</span><h2>What we<br /><span>create.</span></h2></div><p>Everything your business needs to make a more thoughtful impression online.</p></div>
        <div className="service-list">{services.map(([number, name, description]) => <article className="service-row" key={number}><span className="service-number">{number}</span><h3>{name}</h3><p>{description}</p><ArrowUpRight className="service-arrow" aria-hidden="true" /></article>)}</div>
      </section>

      <section className="audience-section" id="who-we-create-for">
        <div className="audience-wrap"><div className="audience-copy"><span className="eyebrow">03 / WHO WE WORK WITH</span><h2>Built for<br /><span>local business.</span></h2><p>Your customers are already online. Your digital presence should give them a reason to choose you.</p><a className="text-link" href="#contact">TELL US WHAT YOU DO <ArrowUpRight aria-hidden="true" /></a></div><div className="audience-list" aria-label="Industries we work with">{audiences.map((audience, index) => <span className="audience-item" key={audience}><span>{String(index + 1).padStart(2, "0")}</span>{audience}<ArrowUpRight aria-hidden="true" /></span>)}</div></div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="work-heading"><div><span className="eyebrow">04 / SELECTED WORK</span><h2>See it.<br /><span>Don’t just take our word for it.</span></h2></div><p>Concept projects created to show what considered, category-specific digital design can feel like.</p></div>
        <div className="project-list">
          {[
            { no: "01", name: "GINGER RESTAURANT", category: "RESTAURANT / DIGITAL EXPERIENCE", description: "An atmospheric restaurant concept designed around discovery, dining and the little details that make a place memorable.", image: gingerImage, alt: "Concept preview of an intimate restaurant, designed for the Ginger Restaurant portfolio concept", configUrl: PORTFOLIO_CONFIG.gingerDemoUrl, theme: "restaurant" },
            { no: "02", name: "LOCAL GYM & FITNESS", category: "FITNESS / WELLNESS", description: "A confident, mobile-first concept for a neighborhood gym and its growing community.", image: fitnessImage, alt: "Concept preview of a thoughtfully designed local gym and fitness studio", configUrl: PORTFOLIO_CONFIG.gymDemoUrl, theme: "fitness" },
            { no: "03", name: "COACHING & TUITION", category: "EDUCATION / LOCAL BUSINESS", description: "A clear, welcoming concept to help an institute introduce its people and learning programmes.", image: learningImage, alt: "Concept preview of a welcoming, contemporary coaching and tuition classroom", configUrl: PORTFOLIO_CONFIG.coachingDemoUrl, theme: "education" },
          ].map((project) => <article className={`project project-${project.theme}`} key={project.no}><a className="project-visual" href="#contact" aria-label={`Discuss a project like ${project.name}`}><img src={project.image} alt={project.alt} width="1440" height="960" loading="lazy" /><span className="project-image-index">PF / PROJECT {project.no}</span><span className="project-image-open"><ArrowUpRight aria-hidden="true" /></span></a><div className="project-meta"><span className="eyebrow">{project.category}</span><span className="demo-label">{project.no} / CONCEPT PROJECT</span></div><div className="project-copy"><div><h3>{project.name}</h3><p>{project.description}</p></div><ConfiguredDemo url={project.configUrl}>VIEW LIVE DEMO</ConfiguredDemo></div></article>)}
        </div>
      </section>

      <section className="principles-section" id="about"><div className="principles-wrap"><div className="principles-intro"><span className="eyebrow">05 / THE PIXELFORGE DIFFERENCE</span><h2>Thoughtful by<br /><span>nature.</span></h2><p>Good digital work should feel right for your business, your customers and the way people use the web today.</p></div><div className="principle-list">{principles.map(([number, title, text]) => <article className="principle-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check aria-hidden="true" /></article>)}</div></div></section>

      <section className="reels-section section-wrap"><div className="reels-heading"><span className="eyebrow">06 / A LITTLE MORE MOTION</span><span className="reels-coordinates">VERTICAL STORYTELLING · 9:16</span></div><div className="reels-main"><span className="reel-index">PF / MOTION</span><h2>Your business.<br /><span>Moving.</span></h2><div className="reels-info"><p>Short-form promotional videos for Instagram Reels and YouTube Shorts. Made to bring the products, services and stories behind your business to life.</p><span className="demo-label">EXAMPLES COMING SOON</span></div></div><div className="reels-tags">{["FOOD", "PRODUCTS", "OFFERS", "SERVICES", "EVENTS", "BRANDS"].map((item) => <span key={item}>{item} <ArrowUpRight aria-hidden="true" /></span>)}</div></section>

      <section className="process-section" id="process"><div className="process-wrap"><div className="process-title"><span className="eyebrow">07 / A CLEARER WAY FORWARD</span><h2>From idea<br /><span>to launch.</span></h2><p>A considered process. No mystery. Every step moves your project closer to something you’re proud to share.</p></div><div className="process-steps">{steps.map(([number, name, description]) => <article className="process-step" key={number}><span className="step-number">{number}</span><span className="step-rule" /><div><h3>{name}</h3><p>{description}</p></div><ArrowDown aria-hidden="true" /></article>)}</div></div></section>

      <section className="pricing-section section-wrap" id="pricing"><div className="pricing-intro"><span className="eyebrow">08 / STRAIGHTFORWARD PRICING</span><h2>Simple pricing.<br /><span>No confusion.</span></h2><p>Professional websites without unnecessary complexity. Start with what your business needs now.</p><a className="text-link" href="#contact">QUESTIONS? LET’S TALK <ArrowDown aria-hidden="true" /></a></div><div className="price-list"><article className="price-plan"><div className="price-top"><span className="eyebrow">A STRONG PLACE TO START</span><span className="plan-number">01 / ESSENTIAL</span></div><div className="price-title"><h3>Essential</h3><p>For local businesses that need a strong online presence.</p></div><div className="price-amount">{PRICING_CONFIG.essential}<span>ONE-TIME STARTING PRICE</span></div><ul><li>1-page mobile-first website</li><li>Premium responsive design</li><li>WhatsApp inquiry button</li><li>Google Maps integration</li><li>Business information and contact section</li><li>Basic SEO setup</li><li>Fast-loading structure</li></ul><a className="text-link" href="#contact">GET STARTED <ArrowRight aria-hidden="true" /></a></article><article className="price-plan price-custom"><div className="price-top"><span className="eyebrow">MORE ROOM TO MAKE IT YOURS</span><span className="plan-number">02 / CUSTOM</span></div><div className="price-title"><h3>Custom</h3><p>For businesses ready for a more tailored digital experience.</p></div><div className="price-amount">{PRICING_CONFIG.custom}<span>ONE-TIME STARTING PRICE</span></div><ul><li>Fully custom website</li><li>Multiple sections or pages</li><li>Premium visual design</li><li>WhatsApp and Google Maps integration</li><li>Custom interactions</li><li>Mobile optimisation</li><li>SEO-ready structure</li></ul><a className="text-link" href="#contact">START A PROJECT <ArrowRight aria-hidden="true" /></a></article></div></section>

      <section className="belief-section"><span className="eyebrow">09 / A BELIEF WORTH BUILDING ON</span><h2>Your business deserves<br /><span>more than a template.</span></h2><div className="belief-bottom"><span className="gold-rule" /><p>Local businesses deserve the same attention to design that major brands receive. We bring thoughtful creative direction and modern technology together to build digital experiences that feel intentional.</p><span className="belief-signature">PIXELFORGE STUDIO<br />DESIGN FOR WHAT’S NEXT.</span></div></section>

      <section className="connect-section section-wrap" id="connect"><div className="connect-heading"><span className="eyebrow">10 / KEEP IN TOUCH</span><h2>Let’s<br /><span>connect.</span></h2><p>Have an idea? Have a business that deserves a better digital presence? Let’s talk.</p></div><div className="connect-links"><a className="connect-item" href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer"><span className="connect-no">01 / SOCIAL</span><span className="connect-name">Instagram</span><span className="connect-handle">{SITE_CONFIG.instagramHandle}</span><span className="connect-arrow"><ArrowUpRight aria-hidden="true" /></span><span className="connect-action">EXPLORE INSTAGRAM</span></a><a className="connect-item" href={SITE_CONFIG.xUrl} target="_blank" rel="noreferrer"><span className="connect-no">02 / SOCIAL</span><span className="connect-name">X</span><span className="connect-handle">{SITE_CONFIG.xHandle}</span><span className="connect-arrow"><ArrowUpRight aria-hidden="true" /></span><span className="connect-action">FOLLOW ON X</span></a><a className="connect-item connect-email" href={`mailto:${SITE_CONFIG.email}`}><span className="connect-no">03 / EMAIL</span><span className="connect-name">A conversation</span><span className="connect-handle">{SITE_CONFIG.email}</span><span className="connect-arrow"><ArrowUpRight aria-hidden="true" /></span><span className="connect-action">START A CONVERSATION</span></a></div></section>

      <section className="contact-section" id="contact"><div className="contact-wrap"><div className="contact-copy"><span className="eyebrow">11 / YOUR NEXT CHAPTER</span><h2>Let’s build<br /><span>something.</span></h2><p>Tell us about your business and what you’d like to create. Your email app will open with your project details ready to send.</p><div className="contact-direct"><span>OR WRITE TO US DIRECTLY</span><a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email} <ArrowUpRight aria-hidden="true" /></a></div>{whatsapp ? <a className="contact-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">CHAT WITH US ON WHATSAPP <ArrowUpRight aria-hidden="true" /></a> : <span className="whatsapp-unconfigured">WHATSAPP CONTACT COMING SOON</span>}</div><form className="contact-form" onSubmit={handleContact} onChange={() => setFormFeedback("")}><label className="form-field" htmlFor="contact-name"><span>YOUR NAME <b>*</b></span><input id="contact-name" name="name" autoComplete="name" placeholder="What should we call you?" required /></label><label className="form-field" htmlFor="contact-business"><span>BUSINESS NAME</span><input id="contact-business" name="business" autoComplete="organization" placeholder="Your business or brand" /></label><label className="form-field" htmlFor="contact-email"><span>EMAIL ADDRESS <b>*</b></span><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label className="form-field" htmlFor="contact-project"><span>PROJECT TYPE <b>*</b></span><select id="contact-project" name="project" defaultValue="" required><option value="" disabled>Choose what you have in mind</option>{projectTypeOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="form-field form-message" htmlFor="contact-message"><span>TELL US A LITTLE MORE <b>*</b></span><textarea id="contact-message" name="message" rows={4} placeholder="What would you like to create?" required /></label><div className="form-submit"><Button className="button-primary" type="submit">START THE CONVERSATION <ArrowRight aria-hidden="true" /></Button><span>This opens an email addressed to {SITE_CONFIG.email}.</span></div><p className="form-feedback" role="status" aria-live="polite">{formFeedback}</p></form></div></section>

      <section className="final-cta"><span className="eyebrow">PIXELFORGE STUDIO / PROJECTS 2026</span><h2>Your business<br /><span>could be next.</span></h2><p>Ready to build a digital presence people remember?</p><div className="final-actions"><a className="button-primary" href="#contact">START A PROJECT <ArrowRight aria-hidden="true" /></a>{whatsapp && <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">CHAT ON WHATSAPP <ArrowUpRight aria-hidden="true" /></a>}</div><span className="final-index">PF—STUDIO · EST. 2026</span></section>

      <footer className="site-footer"><div className="footer-top"><a className="footer-wordmark" href="#home"><img src={brandArtwork.url} alt="" width="48" height="48" /><span>PIXELFORGE<br /><small>STUDIO</small></span></a><p>CRAFTING PREMIUM<br />DIGITAL EXPERIENCES.</p><nav aria-label="Footer navigation">{navItems.map((item) => <a key={item.label} href={item.label === "Studio" ? "#studio" : item.href}>{item.label}</a>)}</nav></div><div className="footer-bottom"><span>© 2026 PIXELFORGE STUDIO. ALL RIGHTS RESERVED.</span><a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a><a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight aria-hidden="true" /></a><a href={SITE_CONFIG.xUrl} target="_blank" rel="noreferrer">X <ArrowUpRight aria-hidden="true" /></a></div></footer>
    </main>
  );
}