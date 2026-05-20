import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG   = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/ffd66465-a72e-4b92-baf3-66656ab18932.jpg';
const FOREST_IMG = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/c8787bd6-4fc9-455b-8a7b-42dee17ed16e.jpg';
const TEMPLE_IMG = 'https://cdn.poehali.dev/projects/cc961e8d-6422-4a98-91a4-ce7556294de8/files/840f7945-b0b0-4def-a0cd-b78414a6d8e6.jpg';

const POSTS = [
  {
    id: 1,
    category: 'Азия',
    title: 'Ангкор на рассвете: как попасть туда раньше всех',
    lead: 'Я проснулся в 4:15. Мотоциклист ждал у отеля — за два доллара он довёз меня до ворот ещё в кромешной темноте. Когда небо только начинало светлеть, я уже стоял у главного водоёма один. Совершенно один.',
    body: `Ангкор-Ват — это место, которое убивают туристы. Не намеренно, но убивают — своими телефонами, селфи-палками и нескончаемыми очередями у каждого портика. Единственный способ увидеть его настоящим — прийти раньше них.\n\nВ 5:30 утра я уже сидел на берегу рефлекторного пруда. Силуэт храма медленно проявлялся из темноты, вода была идеально неподвижной. Ни одного человека. Только цикады и запах влажного камня.\n\nЧерез сорок минут пришли первые группы с гидами. Через час — всё было кончено. Магия испарилась, уступив место фотосессиям. Но я успел. Те сорок минут стоили всей поездки.`,
    date: '12 мая 2026',
    readTime: '7 мин',
    location: 'Сием Рип, Камбоджа',
    img: TEMPLE_IMG,
    featured: true,
  },
  {
    id: 2,
    category: 'Европа',
    title: 'Далмация без навигатора',
    lead: 'Я выбросил телефон в бардачок после Сплита. Не буквально — просто перестал смотреть на карту. И вот тогда началось настоящее.',
    body: `Далматинское побережье придумано не для того, чтобы ехать из точки А в точку Б. Оно придумано для того, чтобы останавливаться у каждого съезда, открывать дверь машины и просто смотреть вниз — на бирюзу, на рыбацкие лодки, на белые деревни, прилепившиеся к скалам.\n\nЯ проехал 340 километров за три дня. По навигатору это четыре часа. По-человечески — три дня открытий.`,
    date: '3 апреля 2026',
    readTime: '5 мин',
    location: 'Далмация, Хорватия',
    img: FOREST_IMG,
    featured: false,
  },
  {
    id: 3,
    category: 'Горы',
    title: 'Маршрут W: что никто не говорит заранее',
    lead: 'Все пишут про виды. Никто не пишет про ветер. А это именно тот персонаж, который определяет всё — расписание, маршрут, настроение и количество слоёв одежды.',
    body: `Торрес-дель-Пайне — это не поход. Это переговоры с природой. Ты предлагаешь план, она смеётся и предлагает свой.\n\nЯ шёл маршрут W пять дней. На третий день ветер был такой силы, что я буквально шёл под углом сорок пять градусов. Рюкзак превратился в парус. Фотографировать было невозможно — телефон вырывало из рук.`,
    date: '18 марта 2026',
    readTime: '9 мин',
    location: 'Torres del Paine, Чили',
    img: HERO_IMG,
    featured: false,
  },
  {
    id: 4,
    category: 'Кавказ',
    title: 'Тбилиси за четыре дня: честный маршрут',
    lead: 'Не Нарикала и не проспект Руставели. Настоящий Тбилиси — это Авлабари в семь утра, когда старики играют в нарды и никто не знает, что сюда вообще ездят туристы.',
    body: `Я был в Тбилиси трижды. Первый раз — как турист, второй — как путешественник, третий — уже почти как местный. Между этими тремя состояниями — пропасть.\n\nГород открывается медленно. Сначала ты видишь открыточную картинку: балконы, Мтацминда, хинкали. Потом начинаешь замечать детали — облупившуюся штукатурку, дворы-колодцы, запах свежего лаваша в шесть утра.`,
    date: '2 февраля 2026',
    readTime: '11 мин',
    location: 'Тбилиси, Грузия',
    img: FOREST_IMG,
    featured: false,
  },
  {
    id: 5,
    category: 'Советы',
    title: 'Как я планирую поездки: система за 10 лет',
    lead: 'Я не пользуюсь турагентствами. Не потому что дорого — а потому что моя система работает лучше. Вот она целиком.',
    body: `Всё начинается с «окна» — даты, когда я свободен. Потом я смотрю куда дешевле всего лететь именно в эти даты. Не наоборот. Именно это меняет всё.\n\nЯ никогда не планирую каждый день. Я планирую точки входа и выхода, одну-две «якорных» вещи (ради которых едеу) и оставляю остальное открытым. Лучшее в поездках всегда случается не по плану.`,
    date: '15 января 2026',
    readTime: '6 мин',
    location: 'Где угодно',
    img: HERO_IMG,
    featured: false,
  },
];

const CATEGORIES = ['Все', 'Азия', 'Европа', 'Горы', 'Кавказ', 'Советы'];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [openPost, setOpenPost] = useState<typeof POSTS[0] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = activeCategory === 'Все'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory);

  const featured = POSTS.find(p => p.featured)!;
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EE', color: '#1A1612' }}>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header style={{
        borderBottom: '1px solid rgba(26,22,18,0.1)',
        background: '#F7F4EE',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        {/* Top bar */}
        <div style={{
          borderBottom: '1px solid rgba(26,22,18,0.08)',
          padding: '8px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(26,22,18,0.45)', textTransform: 'uppercase', fontFamily: "'Golos Text', sans-serif" }}>
            Дневник путешественника
          </span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(26,22,18,0.4)', fontFamily: "'Golos Text', sans-serif" }}>
            20 мая 2026
          </span>
        </div>

        {/* Logo row */}
        <div style={{ padding: '20px 40px', textAlign: 'center', position: 'relative' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '0.18em',
            color: '#1A1612',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: 0,
          }}>
            Wanderlust
          </h1>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '0.72rem', letterSpacing: '0.22em', color: 'rgba(26,22,18,0.45)', textTransform: 'uppercase', marginTop: '6px' }}>
            Истории о местах, людях и дорогах
          </p>
          {/* Social icons */}
          <div style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(26,22,18,0.45)', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1A1612')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,22,18,0.45)')}>
              <Icon name="Instagram" size={16} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(26,22,18,0.45)', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1A1612')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,22,18,0.45)')}>
              <Icon name="Send" size={16} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(26,22,18,0.45)', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1A1612')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,22,18,0.45)')}>
              <Icon name="Search" size={16} />
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav style={{ padding: '0 40px', display: 'flex', gap: '0', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '12px 20px',
                fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: "'Golos Text', sans-serif", fontWeight: 400,
                color: activeCategory === cat ? '#1A1612' : 'rgba(26,22,18,0.45)',
                borderBottom: activeCategory === cat ? '2px solid #1A1612' : '2px solid transparent',
                background: 'none', border: 'none',
                borderBottom: activeCategory === cat ? '2px solid #C9A96E' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── FEATURED POST ─────────────────────────────────────── */}
        {(activeCategory === 'Все') && (
          <section style={{ padding: '60px 0 50px', borderBottom: '1px solid rgba(26,22,18,0.1)' }}>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setOpenPost(featured)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ paddingTop: '66%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={featured.img}
                    alt={featured.title}
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: '#C9A96E', color: '#1A1612',
                  padding: '4px 12px', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: "'Golos Text', sans-serif", fontWeight: 500,
                }}>
                  {featured.category}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A96E', fontFamily: "'Golos Text', sans-serif", marginBottom: '16px' }}>
                  Главная история
                </p>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.2,
                  color: '#1A1612', marginBottom: '20px',
                }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26,22,18,0.65)', marginBottom: '28px', fontWeight: 300 }}>
                  {featured.lead}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="MapPin" size={13} color="rgba(26,22,18,0.4)" />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{featured.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="Calendar" size={13} color="rgba(26,22,18,0.4)" />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{featured.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="Clock" size={13} color="rgba(26,22,18,0.4)" />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{featured.readTime} чтения</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpenPost(featured)}
                  style={{
                    marginTop: '28px',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontFamily: "'Golos Text', sans-serif", color: '#1A1612', fontWeight: 500,
                  }}
                >
                  Читать пост
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── POST GRID ─────────────────────────────────────────── */}
        <section style={{ padding: '50px 0' }}>
          {activeCategory !== 'Все' && (
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#1A1612' }}>{activeCategory}</h2>
              <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.4)', letterSpacing: '0.1em', fontFamily: "'Golos Text', sans-serif" }}>
                {filtered.length} {filtered.length === 1 ? 'пост' : 'поста'}
              </span>
            </div>
          )}

          {/* Large first + small others layout */}
          <div style={{ display: 'grid', gap: '0' }}>
            {filtered.map((post, i) => (
              <article
                key={post.id}
                onClick={() => setOpenPost(post)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i === 0 && activeCategory !== 'Все' ? '1fr' : '280px 1fr',
                  gap: i === 0 && activeCategory !== 'Все' ? '0' : '40px',
                  padding: '36px 0',
                  borderBottom: '1px solid rgba(26,22,18,0.08)',
                  cursor: 'pointer',
                  alignItems: 'start',
                }}
              >
                {/* Image */}
                <div style={{
                  overflow: 'hidden',
                  ...(i === 0 && activeCategory !== 'Все'
                    ? { width: '100%', paddingTop: '45%', position: 'relative', marginBottom: '28px' }
                    : { width: '280px', paddingTop: '190px', position: 'relative', flexShrink: 0 }
                  ),
                }}>
                  <img
                    src={post.img}
                    alt={post.title}
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: '#C9A96E', fontFamily: "'Golos Text', sans-serif", fontWeight: 500,
                    }}>{post.category}</span>
                    <span style={{ width: '20px', height: '1px', background: 'rgba(26,22,18,0.2)', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.68rem', color: 'rgba(26,22,18,0.4)', fontFamily: "'Golos Text', sans-serif" }}>{post.date}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                      fontSize: i === 0 && activeCategory !== 'Все' ? '2rem' : '1.55rem',
                      lineHeight: 1.25, color: '#1A1612', margin: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#5C3D11')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = '#1A1612')}
                  >
                    {post.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Golos Text', sans-serif", fontWeight: 300,
                    fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(26,22,18,0.6)',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>
                    {post.lead}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Icon name="MapPin" size={12} color="rgba(26,22,18,0.35)" />
                      <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.45)', fontFamily: "'Golos Text', sans-serif" }}>{post.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Icon name="Clock" size={12} color="rgba(26,22,18,0.35)" />
                      <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.45)', fontFamily: "'Golos Text', sans-serif" }}>{post.readTime} чтения</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SIDEBAR STRIP ─────────────────────────────────────── */}
        {activeCategory === 'Все' && (
          <section style={{
            padding: '50px 0',
            borderTop: '1px solid rgba(26,22,18,0.1)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '60px',
          }}>
            {/* About */}
            <div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, marginBottom: '12px', color: '#1A1612' }}>
                Об авторе
              </h4>
              <div style={{ width: '30px', height: '1px', background: '#C9A96E', marginBottom: '16px' }} />
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '0.875rem', lineHeight: 1.85, color: 'rgba(26,22,18,0.6)', fontWeight: 300 }}>
                Меня зовут Максим. Я пишу о путешествиях с 2015 года. За это время — 40+ стран, несколько тысяч фотографий и одна простая мысль: лучшие места — те, о которых не пишут в путеводителях.
              </p>
              <button style={{
                marginTop: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: "'Golos Text', sans-serif", color: '#1A1612', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                Подробнее <Icon name="ArrowRight" size={12} />
              </button>
            </div>

            {/* Popular */}
            <div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, marginBottom: '12px', color: '#1A1612' }}>
                Популярное
              </h4>
              <div style={{ width: '30px', height: '1px', background: '#C9A96E', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {POSTS.slice(0, 4).map((post, i) => (
                  <div
                    key={post.id}
                    onClick={() => setOpenPost(post)}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}
                  >
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.8rem', fontWeight: 300,
                      color: 'rgba(26,22,18,0.12)', lineHeight: 1,
                      minWidth: '28px', flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 300,
                        color: '#1A1612', lineHeight: 1.3, margin: 0, transition: 'color 0.2s',
                      }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.color = '#5C3D11')}
                        onMouseLeave={e => ((e.target as HTMLElement).style.color = '#1A1612')}
                      >{post.title}</p>
                      <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '0.65rem', color: 'rgba(26,22,18,0.4)', marginTop: '3px' }}>
                        {post.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, marginBottom: '12px', color: '#1A1612' }}>
                Письма раз в месяц
              </h4>
              <div style={{ width: '30px', height: '1px', background: '#C9A96E', marginBottom: '16px' }} />
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '0.875rem', lineHeight: 1.85, color: 'rgba(26,22,18,0.6)', fontWeight: 300, marginBottom: '20px' }}>
                Один новый маршрут и несколько честных советов. Без рекламы.
              </p>
              <input
                placeholder="ваш email"
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', borderBottom: '1px solid rgba(26,22,18,0.25)',
                  padding: '8px 0', fontFamily: "'Golos Text', sans-serif",
                  fontSize: '0.875rem', color: '#1A1612', outline: 'none',
                  marginBottom: '12px', transition: 'border-color 0.3s',
                }}
                onFocus={e => (e.target.style.borderBottomColor = '#C9A96E')}
                onBlur={e => (e.target.style.borderBottomColor = 'rgba(26,22,18,0.25)')}
              />
              <button style={{
                width: '100%', background: '#1A1612', border: 'none',
                color: '#F7F4EE', padding: '12px',
                fontFamily: "'Golos Text', sans-serif", fontSize: '0.72rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background 0.3s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#C9A96E')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#1A1612')}
              >
                Подписаться
              </button>
            </div>
          </section>
        )}
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(26,22,18,0.1)',
        padding: '28px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        background: '#F7F4EE',
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(26,22,18,0.5)' }}>
          Wanderlust
        </span>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: '0.68rem', color: 'rgba(26,22,18,0.3)', letterSpacing: '0.08em' }}>
          © 2026 · Личный блог о путешествиях
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Instagram', 'Send', 'Mail'].map(ic => (
            <button key={ic} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,22,18,0.35)', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1A1612')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,22,18,0.35)')}
            >
              <Icon name={ic} size={15} fallback="Link" />
            </button>
          ))}
        </div>
      </footer>

      {/* ── POST MODAL ───────────────────────────────────────────── */}
      {openPost && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(26,22,18,0.7)', backdropFilter: 'blur(6px)',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            overflowY: 'auto', padding: '40px 20px',
            animation: 'fadeIn 0.25s ease',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpenPost(null); }}
        >
          <div style={{
            background: '#F7F4EE', width: '100%', maxWidth: '760px',
            position: 'relative',
            animation: 'fadeInUp 0.3s ease both',
          }}>
            {/* Close */}
            <button
              onClick={() => setOpenPost(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                background: 'rgba(26,22,18,0.06)', border: 'none', cursor: 'pointer',
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(26,22,18,0.15)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(26,22,18,0.06)')}
            >
              <Icon name="X" size={16} />
            </button>

            {/* Cover image */}
            <div style={{ width: '100%', paddingTop: '50%', position: 'relative', overflow: 'hidden' }}>
              <img
                src={openPost.img}
                alt={openPost.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,18,0.4) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '28px' }}>
                <span style={{
                  background: '#C9A96E', color: '#1A1612',
                  padding: '4px 12px', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: "'Golos Text', sans-serif", fontWeight: 500,
                }}>
                  {openPost.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '44px 52px 52px' }}>
              {/* Meta */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Icon name="MapPin" size={12} color="rgba(26,22,18,0.4)" />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{openPost.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Icon name="Calendar" size={12} color="rgba(26,22,18,0.4)" />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{openPost.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Icon name="Clock" size={12} color="rgba(26,22,18,0.4)" />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(26,22,18,0.5)', fontFamily: "'Golos Text', sans-serif" }}>{openPost.readTime} чтения</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2,
                color: '#1A1612', marginBottom: '24px',
              }}>
                {openPost.title}
              </h2>

              {/* Lead */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                fontSize: '1.2rem', lineHeight: 1.8, color: 'rgba(26,22,18,0.7)',
                borderLeft: '3px solid #C9A96E', paddingLeft: '20px',
                marginBottom: '32px',
              }}>
                {openPost.lead}
              </p>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(26,22,18,0.1)' }} />
                <span style={{ fontSize: '1rem', color: '#C9A96E' }}>✦</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(26,22,18,0.1)' }} />
              </div>

              {/* Body */}
              {openPost.body.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Golos Text', sans-serif", fontWeight: 300,
                    fontSize: '1rem', lineHeight: 1.9, color: 'rgba(26,22,18,0.75)',
                    marginBottom: '20px',
                  }}
                >
                  {para}
                </p>
              ))}

              {/* Share */}
              <div style={{
                marginTop: '40px', paddingTop: '28px',
                borderTop: '1px solid rgba(26,22,18,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,22,18,0.4)', fontFamily: "'Golos Text', sans-serif" }}>
                  Поделиться
                </span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Instagram', 'Send', 'Link2'].map(ic => (
                    <button key={ic} style={{
                      background: 'rgba(26,22,18,0.06)', border: 'none', cursor: 'pointer',
                      width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(26,22,18,0.5)', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A96E'; (e.currentTarget as HTMLElement).style.color = '#1A1612'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,22,18,0.06)'; (e.currentTarget as HTMLElement).style.color = 'rgba(26,22,18,0.5)'; }}
                    >
                      <Icon name={ic} size={14} fallback="Link" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
