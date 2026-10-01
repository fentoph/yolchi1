"use client";

import { useEffect, useRef, useState } from "react";

export default function Landing() {
  const [visits, setVisits] = useState<number | null>(null);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/visits", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setVisits(typeof data.visits === "number" ? data.visits : 0))
      .catch(() => setVisits(0));

    const root = pageRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-motion]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) (entry.target as HTMLElement).dataset.visible = "true";
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="landing">
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="hero-content" data-motion>
          <div className="eyebrow">SHAHAR ICHIDA HARAKATLANISHNING YANGI USULI</div>
          <h1>YO‘LCHI</h1>
          <p className="hero-title">Kelishamiz. Boramiz.</p>
          <p className="hero-copy">
            Yo‘lingiz bor. Bo‘sh joyingiz bor. Yo‘lchi orqali bir-biringizni toping.
          </p>

          <a className="primary-button" href="yolchi://">
            Hoziroq sinab ko‘rish <span>↗</span>
          </a>
        </div>

        <div className="hero-visits" aria-label="Sahifaga tashriflar soni">
          <span>{visits === null ? "—" : visits.toLocaleString("uz-UZ")}</span>
          <small>SAHIFAGA TASHRIF</small>
        </div>

        <div className="scroll-hint">
          PASTGA AYLANITIRING <span>↓</span>
        </div>
      </section>

      <section className="statement">
        <p data-motion className="reveal-scale">
          Har kuni minglab avtomobillar yo‘lga chiqadi.
        </p>
        <p data-motion className="reveal-scale muted">
          Ularning ayrimlarida esa bo‘sh joy bor.
        </p>
      </section>

      <section className="feature">
        <div data-motion className="feature-number">01</div>
        <h2 data-motion className="reveal-scale">
          Bo‘sh joyingizni yo‘lga aylantiring.
        </h2>
        <p data-motion>
          Qayerdan chiqayotganingizni, qayerga borayotganingizni va nechta joy
          borligini belgilang. Qolganini Yo‘lchi ko‘rsatadi.
        </p>
      </section>

      <section className="feature dark">
        <div data-motion className="feature-number">02</div>
        <h2 data-motion className="reveal-scale">
          Bir yo‘l. Bir nechta imkoniyat.
        </h2>
        <p data-motion>
          Yaqiningizdagi faol yo‘nalishlarni xaritada ko‘ring va o‘zingizga
          mos keladigan yo‘lni toping.
        </p>
      </section>

      <section className="closing">
        <div data-motion className="reveal-scale">
          <p className="eyebrow">YO‘LCHI</p>
          <h2>Yo‘l bor.<br />Kelishamiz.</h2>
        </div>
      </section>

      <style jsx>{`
        * { box-sizing: border-box; }
        .landing { background:#f4f4f0; color:#101010; overflow:hidden; }
        .hero,.statement,.feature,.closing { min-height:100vh; position:relative; display:flex; flex-direction:column; justify-content:center; padding:clamp(28px,6vw,96px); }
        .hero { align-items:center; text-align:center; background:#f4f4f0; }
        .hero-content { max-width:980px; position:relative; z-index:2; opacity:0; transform:translateY(40px) scale(.92); transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1); }
        [data-motion][data-visible="true"] { opacity:1; transform:translateY(0) scale(1); }
        .eyebrow { font-size:11px; letter-spacing:.22em; font-weight:800; opacity:.6; }
        h1 { margin:18px 0 0; font-size:clamp(82px,18vw,250px); line-height:.78; letter-spacing:-.08em; font-weight:950; }
        .hero-title { margin:34px 0 0; font-size:clamp(32px,5vw,70px); font-weight:800; letter-spacing:-.05em; }
        .hero-copy { max-width:650px; margin:22px auto 0; font-size:clamp(17px,2vw,22px); line-height:1.65; opacity:.62; }
        .primary-button { display:inline-flex; align-items:center; gap:22px; margin-top:38px; padding:18px 25px; border-radius:999px; background:#101010; color:#fff; text-decoration:none; font-weight:800; font-size:16px; transition:transform .25s ease,box-shadow .25s ease; }
        .primary-button:hover { transform:translateY(-4px); box-shadow:0 18px 45px rgba(0,0,0,.18); }
        .primary-button span { font-size:20px; }
        .hero-visits { position:absolute; right:clamp(28px,6vw,96px); top:clamp(28px,5vw,60px); z-index:3; text-align:right; }
        .hero-visits span { display:block; font-size:clamp(24px,3vw,42px); font-weight:900; letter-spacing:-.05em; }
        .hero-visits small { font-size:9px; letter-spacing:.16em; opacity:.5; }
        .scroll-hint { position:absolute; bottom:28px; font-size:10px; letter-spacing:.18em; opacity:.45; }
        .scroll-hint span { margin-left:8px; font-size:16px; }
        .hero-glow { position:absolute; width:42vw; height:42vw; border-radius:50%; filter:blur(80px); opacity:.25; animation:float 8s ease-in-out infinite alternate; }
        .glow-one { background:#c7d8ff; top:-15%; left:-12%; }
        .glow-two { background:#ffd7a8; bottom:-18%; right:-10%; animation-delay:-3s; }
        .statement { align-items:center; text-align:center; gap:20px; }
        .statement p { max-width:1100px; margin:0; font-size:clamp(42px,8vw,110px); line-height:.95; letter-spacing:-.065em; font-weight:900; }
        .reveal-scale { opacity:0; transform:translateY(80px) scale(.72); transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.2s cubic-bezier(.16,1,.3,1); }
        .muted { opacity:.15 !important; }
        .statement [data-visible="true"].muted { opacity:.25 !important; }
        .feature { max-width:1200px; margin:auto; align-items:flex-start; }
        .feature-number { font-size:13px; font-weight:900; letter-spacing:.2em; margin-bottom:50px; opacity:.45; }
        .feature h2 { max-width:1000px; margin:0; font-size:clamp(50px,9vw,125px); line-height:.9; letter-spacing:-.065em; }
        .feature p { max-width:620px; margin:50px 0 0 auto; font-size:clamp(18px,2.2vw,25px); line-height:1.6; opacity:.58; }
        .dark { max-width:none; background:#101010; color:#f4f4f0; }
        .dark h2,.dark p { max-width:1000px; }
        .closing { min-height:90vh; align-items:center; text-align:center; }
        .closing h2 { margin:18px 0 0; font-size:clamp(65px,12vw,170px); line-height:.82; letter-spacing:-.075em; }
        @keyframes float { from { transform:translate3d(-15px,-10px,0) scale(1); } to { transform:translate3d(20px,20px,0) scale(1.12); } }
        @media (max-width:700px) {
          .hero,.statement,.feature,.closing { min-height:92vh; padding:28px; }
          h1 { font-size:25vw; }
          .feature p { margin-left:0; }
          .hero-visits { right:28px; top:22px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-content,.reveal-scale,[data-motion] { transition:none !important; transform:none !important; opacity:1 !important; }
          .hero-glow { animation:none; }
        }
      `}</style>
    </main>
  );
}
