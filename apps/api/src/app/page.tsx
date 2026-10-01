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
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="landing">
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <nav className="nav">
          <strong>YO‘LDAMAN</strong>
          <a href="#yuklab-olish">Ilovani yuklab olish ↗</a>
        </nav>

        <div className="hero-content" data-motion>
          <div className="eyebrow">SHAHARDA HARAKATLANISHNING YANGI USULI</div>
          <h1>YO‘LDAMAN</h1>
          <p className="hero-title">Yo‘lga chiqing. Yo‘lingizni toping.</p>
          <p className="hero-copy">
            Yo‘ldaman — yo‘lovchi va haydovchini birlashtiradigan zamonaviy safar platformasi.
            Kerakli manzilni tanlang yoki haydovchi sifatida yo‘lga chiqing.
          </p>
          <a className="primary-button" href="#yuklab-olish">
            Ilovani yuklab olish <span>↓</span>
          </a>
        </div>

        <div className="hero-visits" aria-label="Sahifaga tashriflar soni">
          <span>{visits === null ? "—" : visits.toLocaleString("uz-UZ")}</span>
          <small>SAHIFAGA TASHRIF</small>
        </div>

        <div className="scroll-hint">PASTGA AYLANITIRING <span>↓</span></div>
      </section>

      <section className="statement">
        <p data-motion className="reveal-scale">
          Bir manzil.
        </p>
        <p data-motion className="reveal-scale muted">
          Minglab yo‘llar.
        </p>
        <p data-motion className="reveal-scale">
          Yo‘ldaman.
        </p>
      </section>

      <section className="feature">
        <div data-motion className="feature-number">01 / YO‘LOVCHI</div>
        <h2 data-motion className="reveal-scale">
          Kerakli joyga qulay yetib boring.
        </h2>
        <p data-motion>
          Olib ketish joyi va manzilni belgilang. Yaqin atrofdagi haydovchini toping,
          safarni kuzating va manzilingizga yetib boring.
        </p>
      </section>

      <section className="feature dark">
        <div data-motion className="feature-number">02 / HAYDOVCHI</div>
        <h2 data-motion className="reveal-scale">
          Avtomobilingiz bilan yo‘lga chiqing.
        </h2>
        <p data-motion>
          Haydovchi bo‘lish uchun ro‘yxatdan o‘ting, ma’lumot va avtomobil hujjatlaringizni
          yuboring. Tasdiqlangandan so‘ng buyurtmalarni qabul qilib, safarlarni boshqaring.
        </p>
      </section>

      <section id="yuklab-olish" className="downloads">
        <div className="download-intro" data-motion>
          <div className="eyebrow">YO‘LDAMAN ILOVALARI</div>
          <h2>Qaysi tomondasiz?</h2>
          <p>Yo‘lovchi sifatida safar qiling yoki haydovchi sifatida yo‘lga chiqing.</p>
        </div>

        <div className="download-grid">
          <article className="download-card" data-motion>
            <div className="card-index">01</div>
            <div className="card-icon">↗</div>
            <h3>Yo‘lovchi</h3>
            <p>Safar buyurtma qiling, haydovchini kuting va yo‘lingizni kuzating.</p>
            <a href="#yuklab-olish" aria-label="Yo‘lovchi ilovasini yuklab olish">
              Tez orada yuklab olish <span>↓</span>
            </a>
          </article>

          <article className="download-card driver-card" data-motion>
            <div className="card-index">02</div>
            <div className="card-icon">◆</div>
            <h3>Haydovchi</h3>
            <p>Ro‘yxatdan o‘ting, tasdiqlaning va buyurtmalar bilan yo‘lga chiqing.</p>
            <a href="#haydovchi" aria-label="Haydovchi ilovasini yuklab olish">
              Haydovchi bo‘lish <span>↓</span>
            </a>
          </article>
        </div>

        <p className="apk-note">Android ilovalari APK ko‘rinishida shu yerga joylashtiriladi.</p>
      </section>

      <section id="haydovchi" className="driver-join">
        <div data-motion className="reveal-scale">
          <div className="eyebrow">HAYDOVCHI BO‘LISH</div>
          <h2>Yo‘lga chiqishga tayyormisiz?</h2>
          <p>
            Haydovchi bo‘lish uchun ro‘yxatdan o‘ting. Shaxsiy ma’lumotlaringiz,
            avtomobilingiz va kerakli hujjatlar tekshirilgach, platformada ishlashni boshlaysiz.
          </p>
          <a className="outline-button" href="#yuklab-olish">Haydovchi ilovasini olish ↗</a>
        </div>
      </section>

      <section id="support" className="support">
        <div className="support-head" data-motion>
          <div className="eyebrow">YORDAM VA ALOQA</div>
          <h2>Savolingiz bormi?</h2>
          <p>
            Ilova, safar yoki haydovchilik bo‘yicha savollaringiz bo‘lsa,
            biz bilan qulay usulda bog‘laning.
          </p>
        </div>
        <div className="support-grid">
          <a className="support-card" href="mailto:aslbekqoziboyev536@gmail.com" data-motion>
            <span className="support-label">EMAIL</span>
            <strong>aslbekqoziboyev536@gmail.com</strong>
            <span className="support-action">Xat yuborish ↗</span>
          </a>
          <a className="support-card" href="https://t.me/fentophceo" target="_blank" rel="noreferrer" data-motion>
            <span className="support-label">TELEGRAM</span>
            <strong>@fentophceo</strong>
            <span className="support-action">Telegramda yozish ↗</span>
          </a>
          <a className="support-card" href="tel:+998878118917" data-motion>
            <span className="support-label">TELEFON</span>
            <strong>+998 87 811 89 17</strong>
            <span className="support-action">Qo‘ng‘iroq qilish ↗</span>
          </a>
        </div>
      </section>

      <section className="closing">
        <div data-motion className="reveal-scale">
          <p className="eyebrow">YO‘LDAMAN</p>
          <h2>Yo‘l sizniki.<br />Biz birgamiz.</h2>
        </div>
      </section>

      <footer>
        <strong>YO‘LDAMAN</strong>
        <span>© {new Date().getFullYear()} Yo‘ldaman</span>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .landing { background:#f4f4f0; color:#101010; overflow:hidden; }
        .hero,.statement,.feature,.downloads,.driver-join,.closing {
          min-height:100vh; position:relative; display:flex; flex-direction:column;
          justify-content:center; padding:clamp(28px,6vw,96px);
        }
        .hero { align-items:center; text-align:center; background:#f4f4f0; }
        .nav {
          position:absolute; top:0; left:0; right:0; padding:28px clamp(28px,6vw,96px);
          display:flex; align-items:center; justify-content:space-between; z-index:4;
          font-size:12px; letter-spacing:.12em;
        }
        .nav strong { font-size:14px; letter-spacing:-.03em; }
        .nav a { color:inherit; text-decoration:none; opacity:.65; }
        .nav a:hover { opacity:1; }
        .hero-content {
          max-width:1050px; position:relative; z-index:2; opacity:0; transform:translateY(40px) scale(.92);
          transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1);
        }
        [data-motion][data-visible="true"] { opacity:1; transform:translateY(0) scale(1); }
        .eyebrow { font-size:10px; letter-spacing:.22em; font-weight:850; opacity:.55; }
        h1 {
          margin:20px 0 0; font-size:clamp(68px,17vw,225px); line-height:.78;
          letter-spacing:-.085em; font-weight:950;
        }
        .hero-title { margin:38px 0 0; font-size:clamp(30px,5vw,68px); font-weight:850; letter-spacing:-.055em; }
        .hero-copy {
          max-width:720px; margin:22px auto 0; font-size:clamp(16px,2vw,21px);
          line-height:1.65; opacity:.6;
        }
        .primary-button,.outline-button {
          display:inline-flex; align-items:center; gap:20px; margin-top:38px; padding:18px 25px;
          border-radius:999px; text-decoration:none; font-weight:800; font-size:15px;
          transition:transform .25s ease,box-shadow .25s ease;
        }
        .primary-button { background:#101010; color:#fff; }
        .outline-button { border:1px solid currentColor; color:inherit; }
        .primary-button:hover,.outline-button:hover { transform:translateY(-4px); box-shadow:0 18px 45px rgba(0,0,0,.14); }
        .primary-button span,.outline-button span { font-size:19px; }
        .hero-visits {
          position:absolute; right:clamp(28px,6vw,96px); top:clamp(80px,8vw,110px);
          z-index:3; text-align:right;
        }
        .hero-visits span { display:block; font-size:clamp(24px,3vw,42px); font-weight:900; letter-spacing:-.05em; }
        .hero-visits small { font-size:9px; letter-spacing:.16em; opacity:.5; }
        .scroll-hint { position:absolute; bottom:28px; font-size:10px; letter-spacing:.18em; opacity:.45; }
        .scroll-hint span { margin-left:8px; font-size:16px; }
        .hero-glow {
          position:absolute; width:42vw; height:42vw; border-radius:50%; filter:blur(80px);
          opacity:.25; animation:float 8s ease-in-out infinite alternate;
        }
        .glow-one { background:#c7d8ff; top:-15%; left:-12%; }
        .glow-two { background:#ffd7a8; bottom:-18%; right:-10%; animation-delay:-3s; }
        .statement { align-items:center; text-align:center; gap:18px; }
        .statement p {
          max-width:1100px; margin:0; font-size:clamp(46px,9vw,120px); line-height:.9;
          letter-spacing:-.07em; font-weight:900;
        }
        .reveal-scale {
          opacity:0; transform:translateY(80px) scale(.72);
          transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .muted { opacity:.15 !important; }
        .statement [data-visible="true"].muted { opacity:.25 !important; }
        .feature { max-width:1200px; margin:auto; align-items:flex-start; }
        .feature-number { font-size:12px; font-weight:900; letter-spacing:.2em; margin-bottom:50px; opacity:.45; }
        .feature h2 { max-width:1050px; margin:0; font-size:clamp(50px,9vw,125px); line-height:.9; letter-spacing:-.065em; }
        .feature p { max-width:650px; margin:50px 0 0 auto; font-size:clamp(18px,2.2vw,25px); line-height:1.6; opacity:.58; }
        .dark { max-width:none; background:#101010; color:#f4f4f0; }
        .dark h2,.dark p { max-width:1050px; }
        .downloads { background:#e9e9e3; align-items:center; }
        .download-intro { max-width:1000px; width:100%; text-align:center; }
        .download-intro h2 { margin:18px 0 0; font-size:clamp(52px,9vw,120px); line-height:.9; letter-spacing:-.07em; }
        .download-intro p { margin:25px auto 0; max-width:600px; font-size:19px; line-height:1.6; opacity:.6; }
        .download-grid { width:100%; max-width:1050px; display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:70px; }
        .download-card {
          min-height:370px; padding:30px; border-radius:30px; background:#f4f4f0; position:relative;
          display:flex; flex-direction:column; align-items:flex-start; opacity:0; transform:translateY(60px) scale(.96);
          transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);
        }
        .download-card[data-visible="true"] { opacity:1; transform:none; }
        .driver-card { background:#101010; color:#f4f4f0; transition-delay:.08s; }
        .card-index { font-size:11px; font-weight:900; letter-spacing:.18em; opacity:.45; }
        .card-icon { margin-top:35px; font-size:28px; }
        .download-card h3 { margin:20px 0 0; font-size:42px; letter-spacing:-.055em; }
        .download-card p { max-width:390px; margin:14px 0 0; line-height:1.55; opacity:.6; }
        .download-card a { margin-top:auto; padding-top:30px; color:inherit; text-decoration:none; font-weight:800; }
        .download-card a span { margin-left:8px; }
        .apk-note { margin:28px 0 0; font-size:11px; letter-spacing:.08em; opacity:.4; text-align:center; }
        .driver-join { min-height:80vh; align-items:center; text-align:center; }
        .driver-join > div { max-width:900px; }
        .driver-join h2 { margin:20px 0 0; font-size:clamp(55px,9vw,125px); line-height:.9; letter-spacing:-.07em; }
        .driver-join p { max-width:650px; margin:30px auto 0; font-size:19px; line-height:1.65; opacity:.6; }
        .support { min-height:78vh; padding:clamp(60px,8vw,110px) clamp(28px,6vw,96px); background:#e9e9e3; display:flex; flex-direction:column; justify-content:center; }
        .support-head { max-width:900px; }
        .support-head h2 { margin:20px 0 0; font-size:clamp(55px,9vw,125px); line-height:.88; letter-spacing:-.07em; font-weight:900; }
        .support-head p { max-width:620px; margin:28px 0 0; font-size:18px; line-height:1.65; opacity:.58; }
        .support-grid { width:100%; max-width:1100px; display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:55px auto 0; }
        .support-card { min-height:220px; padding:26px; border:1px solid rgba(16,16,16,.12); border-radius:24px; color:#101010; text-decoration:none; background:#f4f4f0; display:flex; flex-direction:column; align-items:flex-start; transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease; }
        .support-card:hover { transform:translateY(-7px); border-color:rgba(16,16,16,.3); box-shadow:0 20px 50px rgba(0,0,0,.08); }
        .support-label { font-size:10px; font-weight:900; letter-spacing:.2em; opacity:.45; }
        .support-card strong { margin-top:34px; font-size:clamp(20px,2vw,27px); line-height:1.15; letter-spacing:-.035em; overflow-wrap:anywhere; }
        .support-action { margin-top:auto; padding-top:25px; font-size:12px; font-weight:850; opacity:.6; }
        .closing { min-height:80vh; align-items:center; text-align:center; }
        .closing h2 { margin:18px 0 0; font-size:clamp(65px,12vw,170px); line-height:.82; letter-spacing:-.075em; }
        footer {
          display:flex; justify-content:space-between; padding:25px clamp(28px,6vw,96px);
          font-size:10px; letter-spacing:.1em; opacity:.5;
        }
        @keyframes float {
          from { transform:translate3d(-15px,-10px,0) scale(1); }
          to { transform:translate3d(20px,20px,0) scale(1.12); }
        }
        @media (max-width:700px) {
          .hero,.statement,.feature,.downloads,.driver-join,.closing { min-height:92vh; padding:28px; }
          h1 { font-size:22vw; }
          .nav a { display:none; }
          .hero-visits { right:28px; top:75px; }
          .download-grid { grid-template-columns:1fr; margin-top:45px; }
          .download-card { min-height:330px; }
          .feature p { margin-left:0; }
          .support { min-height:auto; padding:70px 28px; }
          .support-grid { grid-template-columns:1fr; margin-top:38px; }
          .support-card { min-height:190px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-content,.reveal-scale,[data-motion],.download-card { transition:none !important; transform:none !important; opacity:1 !important; }
          .hero-glow { animation:none; }
        }
      `}</style>
    </main>
  );
}
