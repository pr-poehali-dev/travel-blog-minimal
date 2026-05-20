import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/ffd66465-a72e-4b92-baf3-66656ab18932.jpg';
const FOREST_IMG = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/c8787bd6-4fc9-455b-8a7b-42dee17ed16e.jpg';
const TEMPLE_IMG = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/840f7945-b0b0-4def-a0cd-b78414a6d8e6.jpg';

const ARTICLES = [
  {
    id: 1,
    tag: 'Азия',
    title: 'Затерянные храмы Камбоджи',
    excerpt: 'Ранний рассвет в Ангкор-Вате — когда туристов ещё нет, а свет пробивается сквозь вековые камни.',
    date: '12 мая 2026',
    readTime: '7 мин',
    img: TEMPLE_IMG,
  },
  {
    id: 2,
    tag: 'Европа',
    title: 'Дороги, которые ведут в никуда',
    excerpt: 'Серпантины Далмации — это не способ добраться из точки А в точку Б. Это медитация за рулём.',
    date: '3 апреля 2026',
    readTime: '5 мин',
    img: FOREST_IMG,
  },
  {
    id: 3,
    tag: 'Горы',
    title: 'Выше облаков: Патагония в марте',
    excerpt: 'Ветер здесь не просто погода — он персонаж. Он будет вашим главным попутчиком на маршруте W.',
    date: '18 марта 2026',
    readTime: '9 мин',
    img: HERO_IMG,
  },
];

const TIPS = [
  { icon: 'Backpack', title: 'Упаковка', text: 'Правило одного цвета: берите вещи трёх цветов максимум — всё сочетается, никаких лишних решений.' },
  { icon: 'Clock', title: 'Время', text: 'Прилетайте на закате. Первое впечатление от города сформируется именно в тот час, когда он наиболее живой.' },
  { icon: 'CreditCard', title: 'Финансы', text: 'Два счёта в разных банках, одна карта всегда дома. Блокировка за границей — не редкость.' },
  { icon: 'MapPin', title: 'Навигация', text: 'Скачивайте офлайн-карты перед поездкой. Интернет предательски пропадает в самый нужный момент.' },
  { icon: 'Camera', title: 'Фотография', text: 'Снимайте в первый и последний день. В середине поездки вы ещё не отдохнули или уже устали.' },
  { icon: 'Coffee', title: 'Местное', text: 'Спрашивайте у таксистов, где они едят сами. Никаких туристических ресторанов — только правда.' },
];

const MAP_POINTS = [
  { id: 1,  x: 510, y: 155, name: 'Исландия',   tag: 'Арктика',         visited: true  },
  { id: 2,  x: 558, y: 182, name: 'Норвегия',    tag: 'Фьорды',          visited: true  },
  { id: 3,  x: 556, y: 210, name: 'Германия',    tag: 'Европа',          visited: true  },
  { id: 4,  x: 538, y: 228, name: 'Франция',     tag: 'Европа',          visited: true  },
  { id: 5,  x: 578, y: 255, name: 'Черногория',  tag: 'Балканы',         visited: true  },
  { id: 6,  x: 622, y: 228, name: 'Грузия',      tag: 'Кавказ',          visited: true  },
  { id: 7,  x: 676, y: 240, name: 'Иран',        tag: 'Ближний Восток',  visited: false },
  { id: 8,  x: 748, y: 255, name: 'Индия',       tag: 'Азия',            visited: true  },
  { id: 9,  x: 820, y: 258, name: 'Таиланд',     tag: 'Азия',            visited: true  },
  { id: 10, x: 848, y: 278, name: 'Камбоджа',    tag: 'Азия',            visited: true  },
  { id: 11, x: 878, y: 238, name: 'Япония',      tag: 'Азия',            visited: false },
  { id: 12, x: 338, y: 288, name: 'Марокко',     tag: 'Африка',          visited: true  },
  { id: 13, x: 328, y: 352, name: 'Перу',        tag: 'Ю. Америка',      visited: false },
  { id: 14, x: 358, y: 422, name: 'Патагония',   tag: 'Ю. Америка',      visited: true  },
  { id: 15, x: 198, y: 238, name: 'Мексика',     tag: 'Сев. Америка',    visited: true  },
];

const ROUTES = [
  {
    id: 1,
    name: 'Балканский треугольник',
    duration: '21 день',
    countries: 'Хорватия → Черногория → Албания',
    difficulty: 'Лёгкий',
    steps: ['Дубровник — старый город и стены', 'Котор и Боко-Которский залив', 'Скадарское озеро', 'Тирана и горный север Албании'],
  },
  {
    id: 2,
    name: 'Кавказская одиссея',
    duration: '14 дней',
    countries: 'Грузия → Армения',
    difficulty: 'Средний',
    steps: ['Тбилиси — 4 дня в столице', 'Кахетия и монастыри', 'Казбеги и военная дорога', 'Ереван и вид на Арарат'],
  },
  {
    id: 3,
    name: 'Патагония: маршрут W',
    duration: '10 дней',
    countries: 'Чили',
    difficulty: 'Сложный',
    steps: ['Пунта-Аренас — базовый лагерь', 'Лагуна-Амарга и первый вид', 'Долина французов', 'Торрес-дель-Пайне на рассвете'],
  },
];

const GALLERY_ITEMS = [
  { img: HERO_IMG,   location: 'Патагония', big: true  },
  { img: TEMPLE_IMG, location: 'Камбоджа',  big: false },
  { img: FOREST_IMG, location: 'Далмация',  big: false },
  { img: FOREST_IMG, location: 'Норвегия',  big: false },
  { img: TEMPLE_IMG, location: 'Индия',     big: false },
];

type SectionId = 'hero' | 'articles' | 'tips' | 'map' | 'gallery' | 'routes' | 'contacts';

export default function Index() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.25 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'hero',     label: 'Главная'   },
    { id: 'articles', label: 'Статьи'    },
    { id: 'tips',     label: 'Советы'    },
    { id: 'map',      label: 'Карта'     },
    { id: 'gallery',  label: 'Галерея'   },
    { id: 'routes',   label: 'Маршруты'  },
    { id: 'contacts', label: 'Контакты'  },
  ];

  const handleDotHover = (point: typeof MAP_POINTS[0], e: React.MouseEvent<SVGGElement>) => {
    setHoveredPoint(point.id);
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const vbW = 1100, vbH = 550;
      setTooltipPos({
        x: (point.x / vbW) * rect.width,
        y: (point.y / vbH) * rect.height,
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0E1117', color: '#EDE8DC' }}>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 40px',
          background: 'linear-gradient(to bottom, rgba(14,17,23,0.97) 0%, rgba(14,17,23,0) 100%)',
        }}
      >
        <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.4rem', letterSpacing: '0.08em', color: '#EDE8DC' }}>
            Wanderlust
          </span>
        </button>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(237,232,220,0.7)' }}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#161B24', borderBottom: '1px solid rgba(201,169,110,0.15)',
            animation: 'fadeInUp 0.2s ease both',
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '16px 32px', background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: '1px solid rgba(201,169,110,0.06)',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        id="hero"
        ref={(el) => { sectionRefs.current['hero'] = el; }}
        style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,17,23,0.55) 0%, rgba(14,17,23,0.2) 40%, rgba(14,17,23,0.88) 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' }}>
          <p className="section-label animate-fade-in" style={{ justifyContent: 'center', marginBottom: '32px' }}>
            Личный дневник исследователя
          </p>
          <h1
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              fontWeight: 300, lineHeight: 1.0,
              letterSpacing: '0.015em',
              color: '#EDE8DC',
              textShadow: '0 4px 40px rgba(0,0,0,0.7)',
              marginBottom: '1.5rem',
            }}
          >
            Мир слишком<br />
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>велик</em> для одного<br />
            маршрута
          </h1>
          <p
            className="animate-fade-in-up delay-400"
            style={{ color: 'rgba(237,232,220,0.65)', fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 2.5rem' }}
          >
            Истории о дальних дорогах, честные советы и маршруты, которые стоит пройти хоть раз
          </p>
          <div className="animate-fade-in-up delay-600" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-travel-filled" onClick={() => scrollTo('articles')}>Читать блог</button>
            <button className="btn-travel" onClick={() => scrollTo('map')}>Смотреть карту</button>
          </div>
        </div>

        <div
          className="animate-float"
          onClick={() => scrollTo('articles')}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.45, cursor: 'pointer' }}
        >
          <Icon name="ChevronDown" size={22} color="#C9A96E" />
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────── */}
      <section
        id="articles"
        ref={(el) => { sectionRefs.current['articles'] = el; }}
        style={{ padding: '7rem 2rem', background: '#0E1117' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Свежие истории</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#EDE8DC' }}>
              Статьи
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {ARTICLES.map((article, i) => (
              <article
                key={article.id}
                className={`card-article hover-lift cursor-pointer animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
                  <img
                    src={article.img}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', display: 'block' }}
                    onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1.07)')}
                    onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <span className="tag">{article.tag}</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#EDE8DC', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'rgba(237,232,220,0.5)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.08em' }}>{article.date}</span>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(237,232,220,0.3)', letterSpacing: '0.08em' }}>{article.readTime} чтения</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-travel">Все статьи</button>
          </div>
        </div>
      </section>

      <div style={{ padding: '16px 0' }}><div className="section-divider" /></div>

      {/* ── TIPS ─────────────────────────────────────── */}
      <section
        id="tips"
        ref={(el) => { sectionRefs.current['tips'] = el; }}
        style={{ padding: '7rem 2rem', background: '#161B24' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Из личного опыта</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#EDE8DC' }}>
              Советы путешественника
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TIPS.map((tip, i) => (
              <div
                key={tip.icon}
                className={`animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{
                  padding: '2rem',
                  border: '1px solid rgba(201,169,110,0.1)',
                  background: 'rgba(14,17,23,0.5)',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.4)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.1)')}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <Icon name={tip.icon} size={20} color="#C9A96E" fallback="Star" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#EDE8DC', marginBottom: '0.75rem' }}>
                  {tip.title}
                </h3>
                <p style={{ color: 'rgba(237,232,220,0.5)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding: '16px 0' }}><div className="section-divider" /></div>

      {/* ── MAP ──────────────────────────────────────── */}
      <section
        id="map"
        ref={(el) => { sectionRefs.current['map'] = el; }}
        style={{ padding: '7rem 2rem', background: '#0E1117' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Интерактивная</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#EDE8DC', marginBottom: '0.75rem' }}>
              Карта путешествий
            </h2>
            <p style={{ color: 'rgba(237,232,220,0.4)', fontSize: '0.82rem', letterSpacing: '0.06em' }}>
              <span style={{ color: '#C9A96E' }}>●</span>&nbsp; Посещённые &nbsp;&nbsp;
              <span style={{ color: 'rgba(237,232,220,0.3)' }}>○</span>&nbsp; В планах
            </p>
          </div>

          <div style={{ position: 'relative', background: '#0D1520', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '2px' }}>
            <svg ref={svgRef} viewBox="0 0 1100 550" style={{ display: 'block', width: '100%' }}>
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#0D1A2E" />
                  <stop offset="100%" stopColor="#080E18" />
                </radialGradient>
              </defs>
              <rect width="1100" height="550" fill="url(#bgGrad)" />

              {/* Ocean grid lines */}
              <g stroke="rgba(30,60,100,0.25)" strokeWidth="0.5">
                {[100,200,300,400,500].map(y => <line key={y} x1="0" y1={y} x2="1100" y2={y} />)}
                {[150,300,450,600,750,900].map(x => <line key={x} x1={x} y1="0" x2={x} y2="550" />)}
              </g>

              {/* Continents */}
              <g fill="#1C2E42" stroke="#243850" strokeWidth="0.7">
                {/* North America */}
                <path d="M75,105 L95,90 L130,85 L175,88 L220,95 L260,105 L285,125 L300,155 L295,190 L280,220 L265,250 L240,270 L215,285 L190,305 L170,325 L155,350 L148,365 L140,358 L132,335 L118,305 L100,278 L80,255 L68,228 L62,195 L65,160 L72,130 Z" />
                {/* Greenland */}
                <path d="M370,55 L410,48 L440,55 L445,75 L430,90 L405,92 L380,82 L365,68 Z" />
                {/* South America */}
                <path d="M195,298 L230,288 L270,292 L305,308 L325,335 L338,368 L348,405 L355,440 L348,470 L332,490 L308,498 L282,490 L262,468 L245,440 L228,410 L210,378 L195,348 L188,320 Z" />
                {/* Europe */}
                <path d="M488,112 L510,105 L545,102 L578,106 L608,115 L628,132 L632,152 L618,168 L598,178 L570,184 L545,182 L518,172 L500,158 L488,140 Z" />
                {/* UK */}
                <path d="M505,120 L518,113 L524,122 L518,132 L506,128 Z" />
                {/* Africa */}
                <path d="M498,195 L540,185 L578,188 L608,200 L628,222 L638,255 L642,295 L638,340 L625,378 L605,408 L580,428 L555,432 L530,422 L510,398 L492,362 L482,325 L482,285 L488,248 L492,218 Z" />
                {/* Asia */}
                <path d="M618,95 L680,82 L750,78 L820,82 L878,90 L928,102 L962,120 L972,145 L958,172 L930,192 L892,205 L848,214 L808,218 L768,220 L728,225 L692,222 L658,212 L635,198 L618,180 L610,158 L612,130 Z" />
                {/* Japan */}
                <path d="M870,152 L886,144 L895,152 L892,168 L878,172 L868,162 Z" />
                {/* Australia */}
                <path d="M818,328 L875,318 L925,325 L958,345 L965,375 L952,402 L922,418 L885,420 L855,410 L832,390 L818,365 L814,342 Z" />
                {/* New Zealand */}
                <path d="M960,390 L972,382 L978,392 L972,402 L960,398 Z" />
              </g>

              {/* Routes */}
              <g stroke="rgba(201,169,110,0.15)" strokeWidth="1" fill="none" strokeDasharray="5,7">
                <path d="M558,182 Q648,208 748,255" />
                <path d="M748,255 Q798,252 848,278" />
                <path d="M558,210 Q540,230 340,288" />
                <path d="M558,210 Q590,218 622,228" />
                <path d="M198,238 Q262,265 328,352" />
                <path d="M328,352 Q340,388 358,422" />
              </g>

              {/* Dots */}
              {MAP_POINTS.map((point) => (
                <g
                  key={point.id}
                  className="map-dot"
                  onMouseEnter={(e) => handleDotHover(point, e)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {point.visited ? (
                    <>
                      <circle cx={point.x} cy={point.y} r={10} fill="rgba(201,169,110,0.06)" className="pulse" />
                      <circle cx={point.x} cy={point.y} r={4} fill="#C9A96E" opacity={0.9} />
                      <circle cx={point.x} cy={point.y} r={4} fill="none" stroke="#C9A96E" strokeWidth="1" opacity={0.4} />
                    </>
                  ) : (
                    <circle cx={point.x} cy={point.y} r={4} fill="none" stroke="rgba(237,232,220,0.3)" strokeWidth={1.2} />
                  )}
                </g>
              ))}

              {/* Stats */}
              <text x="20" y="535" fill="rgba(201,169,110,0.4)" fontSize="10" fontFamily="Golos Text, sans-serif" letterSpacing="1.5">
                {MAP_POINTS.filter(p => p.visited).length} СТРАН ПОСЕЩЕНО · {MAP_POINTS.filter(p => !p.visited).length} В ПЛАНАХ
              </text>
            </svg>

            {hoveredPoint !== null && (() => {
              const point = MAP_POINTS.find(p => p.id === hoveredPoint);
              if (!point) return null;
              return (
                <div style={{
                  position: 'absolute',
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  transform: 'translate(-50%, -130%)',
                  background: '#161B24',
                  border: '1px solid rgba(201,169,110,0.4)',
                  padding: '8px 14px',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}>
                  <div style={{ fontSize: '0.6rem', color: '#C9A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px', fontFamily: "'Golos Text', sans-serif" }}>
                    {point.tag}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#EDE8DC' }}>
                    {point.name}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────── */}
      <section
        id="gallery"
        ref={(el) => { sectionRefs.current['gallery'] = el; }}
        style={{ padding: '7rem 2rem', background: '#161B24' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Из объектива</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#EDE8DC' }}>
              Галерея
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 230px)', gap: '8px' }}>
            <div className="gallery-item" style={{ gridColumn: '1 / 3', gridRow: '1 / 3', height: '100%' }}>
              <img src={GALLERY_ITEMS[0].img} alt={GALLERY_ITEMS[0].location} />
              <div className="gallery-overlay">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#EDE8DC', fontStyle: 'italic' }}>
                  {GALLERY_ITEMS[0].location}
                </span>
              </div>
            </div>
            {GALLERY_ITEMS.slice(1).map((item, i) => (
              <div key={i} className="gallery-item" style={{ height: '100%' }}>
                <img src={item.img} alt={item.location} />
                <div className="gallery-overlay">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#EDE8DC', fontStyle: 'italic' }}>
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding: '16px 0' }}><div className="section-divider" /></div>

      {/* ── ROUTES ───────────────────────────────────── */}
      <section
        id="routes"
        ref={(el) => { sectionRefs.current['routes'] = el; }}
        style={{ padding: '7rem 2rem', background: '#0E1117' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Проверено лично</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#EDE8DC' }}>
              Маршруты
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,169,110,0.15)', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {ROUTES.map((route, i) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(i)}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: "'Golos Text', sans-serif", fontWeight: 400,
                  color: selectedRoute === i ? '#C9A96E' : 'rgba(237,232,220,0.38)',
                  borderBottom: selectedRoute === i ? '1px solid #C9A96E' : '1px solid transparent',
                  marginBottom: '-1px',
                  background: 'transparent', cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  border: 'none',
                  outline: 'none',
                }}
              >
                {route.name}
              </button>
            ))}
          </div>

          {ROUTES.map((route, i) =>
            selectedRoute === i ? (
              <div key={route.id} className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span className="tag">{route.difficulty}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(237,232,220,0.45)', letterSpacing: '0.08em' }}>{route.duration}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(201,169,110,0.55)', letterSpacing: '0.05em' }}>{route.countries}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 300, color: '#EDE8DC', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                    {route.name}
                  </h3>
                  <p style={{ color: 'rgba(237,232,220,0.45)', fontSize: '0.875rem', lineHeight: 1.85 }}>
                    Этот маршрут прошёл лично — от первой точки до последней. Ниже ключевые остановки в том порядке, в котором они имеют смысл.
                  </p>
                  <div style={{ marginTop: '2.5rem' }}>
                    <button className="btn-travel">Скачать маршрут</button>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', marginBottom: '2rem' }}>
                    Ключевые точки
                  </p>
                  <div>
                    {route.steps.map((step, j) => (
                      <div key={j} className="route-step">
                        <div style={{ fontSize: '0.6rem', color: 'rgba(201,169,110,0.4)', letterSpacing: '0.12em', marginBottom: '3px' }}>
                          {String(j + 1).padStart(2, '0')}
                        </div>
                        <p style={{ color: '#EDE8DC', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.1rem' }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* ── CONTACTS ─────────────────────────────────── */}
      <section
        id="contacts"
        ref={(el) => { sectionRefs.current['contacts'] = el; }}
        style={{ padding: '7rem 2rem', background: '#161B24' }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Обратная связь</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#EDE8DC', lineHeight: 1.1 }}>
              Есть вопрос или история?<br />
              <em style={{ color: '#C9A96E' }}>Напишите мне</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.65)', display: 'block', marginBottom: '8px' }}>Имя</label>
                  <input className="input-travel" placeholder="Как вас зовут" value={formName} onChange={e => setFormName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.65)', display: 'block', marginBottom: '8px' }}>Email</label>
                  <input className="input-travel" placeholder="your@email.com" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.65)', display: 'block', marginBottom: '8px' }}>Сообщение</label>
                  <textarea
                    placeholder="Ваша история или вопрос..."
                    rows={4}
                    value={formMsg}
                    onChange={e => setFormMsg(e.target.value)}
                    style={{
                      background: 'transparent', border: 'none',
                      borderBottom: '1px solid rgba(201,169,110,0.3)',
                      color: '#EDE8DC', padding: '10px 0', width: '100%',
                      fontFamily: "'Golos Text', sans-serif", fontWeight: 300, fontSize: '0.9rem',
                      outline: 'none', resize: 'none', transition: 'border-color 0.3s ease',
                    }}
                    onFocus={e => (e.target.style.borderBottomColor = '#C9A96E')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(201,169,110,0.3)')}
                  />
                </div>
                <div><button className="btn-travel-filled">Отправить</button></div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(237,232,220,0.45)', fontSize: '0.875rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  Я отвечаю на все письма — обычно в течение пары дней. Если хотите предложить совместный маршрут или просто поделиться историей — пишите.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: 'Instagram', text: '@wanderlust.diary' },
                    { icon: 'Send',      text: 't.me/wanderlust'   },
                    { icon: 'Mail',      text: 'hello@wanderlust.blog' },
                  ].map((c) => (
                    <div key={c.icon} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <Icon name={c.icon} size={16} color="rgba(201,169,110,0.55)" fallback="Link" />
                      <span style={{ fontSize: '0.875rem', color: 'rgba(237,232,220,0.4)', transition: 'color 0.3s' }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.color = '#EDE8DC')}
                        onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(237,232,220,0.4)')}
                      >{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
                <p style={{ fontSize: '0.68rem', color: 'rgba(237,232,220,0.22)', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  Раз в месяц письмо о новом маршруте
                </p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <input className="input-travel" placeholder="Email" style={{ flex: 1 }} />
                  <button className="btn-travel" style={{ padding: '10px 18px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Подписаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ background: '#0E1117', borderTop: '1px solid rgba(201,169,110,0.1)', padding: '2rem 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(237,232,220,0.35)' }}>
            Wanderlust
          </span>
          <p style={{ fontSize: '0.68rem', color: 'rgba(237,232,220,0.2)', letterSpacing: '0.08em' }}>
            © 2026 · Блог о путешествиях
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontSize: '0.62rem' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}