/* ============================================================
   i18n — 10 языков. EN — основной (fallback для всех).
   В списке пользователя китайский и португальский были дважды —
   десятым языком добавлен немецкий (Владимир — чемпион Германии).
   ============================================================ */

export const LANGS = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇦🇪", dir: "rtl" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
];

export const STRINGS = {
  /* ============================== EN ============================== */
  en: {
    nav: { dossier: "Dossier", stats: "Numbers", path: "Journey", media: "Media", voices: "Voices", contact: "Contact", faq: "FAQ", join: "Join" },
    contact: { kicker: "Contact / 06", t1: "Get in", t2: "touch", sub: "Seminars, private coaching, collaborations or press — write directly. I read every message and answer personally.", namePh: "Your name", emailPh: "Your email", msgPh: "Your message — what is it about?", btn: "Send message", sending: "Sending…", done: "Message sent. I’ll get back to you personally.", disc: "I answer personally. No bots." },
    hero: {
      badge: "#1 North America · #1 World — AJP ranking",
      name1: "Vladimir", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "CHAMPION OF 6 NATIONS", "#1 NORTH AMERICA · AJP", "50+ BASEBALL CHOKE FINISHES"],
      sub: "Brazilian jiu-jitsu. National champion of six countries, #1 of the AJP North America ranking and #1 in the world. Over 50 opponents finished with one and the same move — the baseball choke. Hence the nickname.",
      btnFights: "Watch fights", btnStory: "My story",
      views: "983,000+ profile views in 30 days", record: "Best reel — 1.8M views", rankChip: "AJP ranking · live",
    },
    countdown: { label: "AJP World Championship · Abu Dhabi", date: "May 29, 2026", days: "days", hours: "hours", mins: "min", secs: "sec" },
    marquee: "Geography of victories · 2022—2026",
    dossier: {
      kicker: "Dossier / 01", t1: "Why they call me", t2: "the Baseball Bat",
      sub: "Not marketing — statistics. Every claim below is backed by tournament protocols and fight footage.",
      more: "More",
      cards: [
        { title: "Baseball choke — the signature weapon", text: "Around 90% of my early finishes come from one and the same move. 50+ opponents have gone to sleep in my baseball choke — from regional opens to international Grand Slams. My Swiss team coined the nickname, and it stuck." },
        { title: "Champion of six countries", text: "National titles in Russia, Spain, Switzerland, Qatar, Latvia and Germany — plus #1 of the AJP North America ranking and #1 in the world." },
        { title: "Base: 7 years of boxing", text: "Distance, timing and a cold head under pressure come from striking. On the ground it feels like cheating." },
        { title: "Swiss school", text: "Since 2023 I train in Lausanne under Thomas Oyarzun — a true legend of the sport. The team rewired my athlete psychology." },
        { title: "Media machine", text: "1.8M views on the record reel and almost half a million accounts reached monthly. Fights people rewatch." },
        { title: "Psychology of ruthlessness", text: "In 2022 I lost every match at the ACBJJ World Championship and went out cold in the bronze final. My former coach publicly suggested “moving me to the women’s division”. I carry those words onto every mat. His students don’t beat me anymore — he doesn’t even watch those fights." },
      ],
    },
    stats: [
      { label: "AJP world ranking", trend: "also #1 North America" },
      { label: "baseball choke finishes", trend: "90% of wins — early" },
      { label: "countries — national champion", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "profile views / 30 days", trend: "record reel — 1.8M" },
    ],
    proofs: {
      kicker: "Receipts / 02", t1: "Protocols", t2: "don’t lie",
      sub: "AJP & ACBJJ result sheets and live ranking screenshots — straight from the official app.",
    },
    path: {
      kicker: "Journey / 03", t1: "From “put him in the women’s division”", t2: "to the top of the world",
      sub: "Three points that turned an average boxer into the most prolific finisher of the tour.",
      steps: [
        { title: "Boxing. Seven years", text: "I was never great at striking: some wins, some losses. But every grappling warm-up ended with the same question from teammates: “Are you sure you’ve never wrestled?”" },
        { title: "Turkey, age 15", text: "A beach gym, a stranger drilling takedowns — and the words “Brazilian jiu-jitsu” heard for the first time in my life. Back in Russia, I started training right away." },
        { title: "Switzerland, 2023", text: "New gym, new team, coach Thomas Oyarzun. My athlete psychology was rebuilt from scratch: ruthless plus technical. The result — titles in six countries and the top of the AJP rankings." },
      ],
    },
    media: {
      kicker: "Media / 04", t1: "Real footage.", t2: "No staging",
      sub: "Tournament photos, finishes and full matches — everything shot live on the mats.",
      photos: "Photos", videos: "Fights", playing: "Now playing",
    },
    voices: {
      kicker: "Voices / 05", t1: "What they say", t2: "about the Bat",
      sub: "The coach, the team and the people watching my matches from the best seats.",
      items: [
        { name: "Thomas Oyarzun", role: "Head coach · BJJ black belt", org: "Lausanne, Switzerland", date: "March 2026", text: "In twenty years on the mats I haven’t seen an athlete who turns anger into such cold precision. Vladimir doesn’t fight his opponent — he solves a problem. And the solution is always the same: the baseball choke." },
      ],
    },
    pricing: {
      kicker: "Training / 06", t1: "Train with", t2: "the №1",
      sub: "The same system that brought titles in six countries: video reviews, personal coaching and travelling seminars.",
      month: "Monthly", year: "Yearly", save: "−20%", perMonth: "/mo",
      monthNote: "billed monthly", yearNote: "billed yearly · −20%", popular: "Athletes’ choice",
      tiers: [
        { name: "Video review", desc: "Grow between sessions", priceM: "4,900 ₽", priceY: "3,900 ₽", cta: "Start the review", feats: ["2 video breakdowns of your matches / month", "Written report: mistakes and tasks", "Private Telegram chat of the team", "Finish library: 40+ baseball choke details", "1-on-1 calls", "Tournament prep plan"], excluded: 2 },
        { name: "Personal", desc: "Preparation under my control", priceM: "14,900 ₽", priceY: "11,900 ₽", cta: "Take a spot", feats: ["Everything in Video review", "4 online 1-on-1 sessions / month", "Individual tournament plan", "Opponent scouting", "Technique fixes on video", "24/7 access to me"], excluded: 0 },
        { name: "Seminar", desc: "Travelling camp for your gym", custom: "from 90,000 ₽", note: "per visit · up to 40 participants", cta: "Discuss dates", feats: ["2-day camp at your gym", "The baseball choke system, A to Z", "Defense first — then attack", "Sparring with individual feedback", "Photo & video for your gym’s socials", "Certificates for participants"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "Questions asked", t2: "most often",
      items: [
        { q: "Why “the Baseball Bat”?", a: "My Swiss team coined it: about 90% of my early wins come from the same move — the baseball choke. I’ve finished 50+ opponents with it. The name stuck, now it’s a brand." },
        { q: "Can I start BJJ from scratch as an adult?", a: "Yes. I came to jiu-jitsu at 15 with zero wrestling behind me — only seven years of boxing. In BJJ, system and technique beat “talent”, so you can start at any age." },
        { q: "Do I need a striking or wrestling base?", a: "No. BJJ is ground fighting: submissions, chokes, positional control, sweeps. Classic wrestling technique is barely used here. Any sports background helps, but none is required." },
        { q: "Where do you train and can I join?", a: "Since 2023 my main team is in Switzerland, under Thomas Oyarzun. You can join through seminars and online work: leave your email in the form below — I answer personally." },
        { q: "What’s inside the online fight review?", a: "You send footage of your matches or sparring, I break down the mistakes with timestamps and give concrete tasks for the next cycle. The Personal plan adds 1-on-1 calls and a tournament prep plan." },
      ],
    },
    cta: {
      kicker: "Subscribe / 08", t1: "The hunt", t2: "continues",
      sub: "Once a week: fight breakdowns, tournament announcements and seminar dates. No fluff — only what makes you more dangerous.",
      ph: "Your email", btn: "Subscribe", done: "You’re on the list. The first letter is on its way.", disc: "No spam. Unsubscribe in 1 click.",
    },
    footer: {
      about: "Brazilian jiu-jitsu. #1 of the AJP North America ranking and #1 in the world. National champion of six countries. Lausanne / Saint Petersburg.",
      sections: "Sections", training: "Training", contact: "Contact",
      collab: "Collaboration — DM", subscribe: "Subscribe",
      copyright: "© 2026 Vladimir Nagorianskii — The Baseball Bat. All submissions are voluntary.",
      policy: "Privacy policy",
    },
  },

  /* ============================== RU ============================== */
  ru: {
    nav: { dossier: "Досье", stats: "Цифры", path: "Путь", media: "Медиа", voices: "Слово", contact: "Связь", faq: "FAQ", join: "Написать" },
    contact: { kicker: "Связь / 06", t1: "Напиши", t2: "напрямую", sub: "Семинары, личная подготовка, сотрудничество или пресса — пиши напрямую. Я читаю каждое сообщение и отвечаю лично.", namePh: "Твоё имя", emailPh: "Твой email", msgPh: "Сообщение — по какому вопросу?", btn: "Отправить", sending: "Отправляю…", done: "Сообщение отправлено. Отвечу лично.", disc: "Отвечаю лично. Без ботов." },
    hero: {
      badge: "#1 Северная Америка · #1 мира — рейтинг AJP",
      name1: "Владимир", name2: "Нагорянский",
      typed: ["THE BASEBALL BAT", "ЧЕМПИОН 6 СТРАН", "#1 СЕВЕРНАЯ АМЕРИКА · AJP", "50+ ФИНИШЕЙ BASEBALL CHOKE"],
      sub: "Бразильское джиу-джитсу. Национальный чемпион шести стран, №1 рейтинга AJP Северной Америки и №1 в мире. Больше 50 соперников финишированы одним и тем же приёмом — baseball choke. Отсюда и прозвище.",
      btnFights: "Смотреть бои", btnStory: "Моя история",
      views: "983 000+ просмотров профиля за 30 дней", record: "Рекордный ролик — 1,8 млн", rankChip: "Рейтинг AJP · live",
    },
    countdown: { label: "Чемпионат мира AJP · Абу-Даби", date: "29 мая 2026", days: "дней", hours: "часов", mins: "мин", secs: "сек" },
    marquee: "География побед · 2022—2026",
    dossier: {
      kicker: "Досье / 01", t1: "Почему меня зовут", t2: "бейсбольной битой",
      sub: "Не маркетинг — статистика. Каждый пункт ниже подтверждён протоколами турниров и записями боёв.",
      more: "Подробнее",
      cards: [
        { title: "Baseball choke — фирменное оружие", text: "Около 90% моих досрочных побед — один и тот же приём. Больше 50 оппонентов уснули в моём baseball choke: от региональных турниров до международных Grand Slam. Швейцарская команда дала прозвище — оно прижилось и стало брендом." },
        { title: "Чемпион шести стран", text: "Национальные титулы в России, Испании, Швейцарии, Катаре, Латвии и Германии — плюс №1 рейтинга AJP Северной Америки и №1 в мире." },
        { title: "База: 7 лет бокса", text: "Дистанция, тайминг и хладнокровие под давлением — из ударки. В партере это читерство." },
        { title: "Швейцарская школа", text: "С 2023 года тренируюсь в Лозанне у Томаса Оярзуна — легенды спорта. Команда перепрошила мою психологию атлета." },
        { title: "Медиа-машина", text: "1,8 млн просмотров рекордного ролика и почти полмиллиона охваченных аккаунтов в месяц. Бои, которые пересматривают." },
        { title: "Психология беспощадности", text: "В 2022-м я проиграл все бои на чемпионате мира ACBJJ и уснул в бронзовом матче. Бывший тренер публично предложил «отдать меня в женскую категорию». Эти слова я забираю с собой на каждый татами. Его ученики больше не выигрывают у меня — он даже не смотрит эти бои." },
      ],
    },
    stats: [
      { label: "рейтинг AJP в мире", trend: "и #1 в Северной Америке" },
      { label: "финишей baseball choke", trend: "90% побед — досрочно" },
      { label: "стран — нац. чемпион", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "просмотров за 30 дней", trend: "рекордный ролик — 1,8 млн" },
    ],
    proofs: {
      kicker: "Пруфы / 02", t1: "Протоколы", t2: "не врут",
      sub: "Результаты AJP и ACBJJ и live-скриншоты рейтинга — прямо из официального приложения.",
    },
    path: {
      kicker: "Путь / 03", t1: "От «отдать в женскую категорию»", t2: "до вершины мира",
      sub: "Три точки, которые сделали из боксёра-середняка самого результативного финишера тура.",
      steps: [
        { title: "Бокс. Семь лет", text: "Я никогда не был хорош в ударке: иногда побеждал, иногда проигрывал. Но каждая борцовская разминка заканчивалась одним и тем же вопросом однокомандников: «Ты точно никогда не занимался борьбой?»" },
        { title: "Турция, 15 лет", text: "Зал на пляже, незнакомец с борцовскими упражнениями — и впервые в жизни услышанное словосочетание «бразильское джиу-джитсу». По возвращении в Россию я сразу приступил к тренировкам." },
        { title: "Швейцария, 2023", text: "Новый зал, новая команда, тренер Томас Оярзун. Психологию атлета перепрошили полностью: беспощадность плюс техника. Итог — титулы шести стран и вершина рейтинга AJP." },
      ],
    },
    media: {
      kicker: "Медиа / 04", t1: "Живые кадры.", t2: "Без постановки",
      sub: "Турнирные фото, финиши и полные бои — всё снято вживую на татами.",
      photos: "Фото", videos: "Бои", playing: "Сейчас играет",
    },
    voices: {
      kicker: "Слово / 05", t1: "Что говорят", t2: "о бите",
      sub: "Тренер, команда и люди, которые видят мои бои с лучших мест.",
      items: [
        { name: "Томас Оярзун", role: "Главный тренер · чёрный пояс BJJ", org: "Лозанна, Швейцария", date: "Март 2026", text: "За двадцать лет на татами я не видел атлета, который превращает злость в настолько холодную точность. Владимир не дерётся с соперником — он решает задачу. И решение у него всегда одно: baseball choke." },
      ],
    },
    pricing: {
      kicker: "Тренировки / 06", t1: "Тренируйся", t2: "с №1",
      sub: "Та же система, что принесла титулы шести стран: видеоразборы, личная подготовка и выездные семинары.",
      month: "Месяц", year: "Год", save: "−20%", perMonth: "/мес",
      monthNote: "помесячная оплата", yearNote: "при оплате за год · −20%", popular: "Выбор атлетов",
      tiers: [
        { name: "Видеоразбор", desc: "Расти между тренировками", priceM: "4 900 ₽", priceY: "3 900 ₽", cta: "Начать разбор", feats: ["2 видеоразбора твоих боёв в месяц", "Письменный отчёт: ошибки и задачи", "Закрытый Telegram-чат команды", "База финишей: 40+ деталей baseball choke", "Личные созвоны 1-на-1", "План подготовки к турниру"], excluded: 2 },
        { name: "Personal", desc: "Подготовка под моим контролем", priceM: "14 900 ₽", priceY: "11 900 ₽", cta: "Занять место", feats: ["Всё из тарифа «Видеоразбор»", "4 онлайн-сессии 1-на-1 в месяц", "Индивидуальный план на турнир", "Разбор будущих соперников", "Корректировка техники по видео", "Связь со мной 24/7"], excluded: 0 },
        { name: "Семинар", desc: "Выездной интенсив для зала", custom: "от 90 000 ₽", note: "за выезд · до 40 участников", cta: "Обсудить даты", feats: ["2 дня интенсива в вашем зале", "Система baseball choke от и до", "Сначала защита — потом атака", "Спарринги с разбором каждого", "Фото и видео для соцсетей зала", "Сертификаты участникам"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "Вопросы, которые задают", t2: "чаще всего",
      items: [
        { q: "Почему «бейсбольная бита»?", a: "Прозвище дала моя швейцарская команда: около 90% моих досрочных побед — один и тот же приём, baseball choke. Только им я финишировал больше 50 оппонентов. Название прижилось — теперь это бренд." },
        { q: "Можно ли начать BJJ с нуля во взрослом возрасте?", a: "Да. Я сам пришёл в джиу-джитсу в 15 лет без единого дня борьбы за спиной — до этого было только 7 лет бокса. В BJJ системность и техника бьют «талант», поэтому начинать можно в любом возрасте." },
        { q: "Нужна ли ударная или борцовская база?", a: "Нет. BJJ — это борьба в партере: болевые, удушающие, позиционный контроль, перевороты. Стандартные борцовские техники здесь почти не используются. Любой спортивный бэкграунд помогает, но не обязателен." },
        { q: "Где ты тренируешься и можно ли присоединиться?", a: "С 2023 года моя основная команда — в Швейцарии, под руководством Томаса Оярзуна. Присоединиться можно через семинары и онлайн-работу: оставь почту в форме ниже — отвечаю лично." },
        { q: "Что входит в онлайн-разбор боёв?", a: "Ты присылаешь видео боёв или спаррингов, я разбираю ошибки по таймкодам и даю конкретные задачи на следующий цикл. На тарифе Personal добавляются созвоны 1-на-1 и план подготовки к турниру." },
      ],
    },
    cta: {
      kicker: "Подписка / 08", t1: "Охота", t2: "продолжается",
      sub: "Раз в неделю: разборы боёв, анонсы турниров и даты семинаров. Без воды — только то, что делает тебя опаснее.",
      ph: "Твой email", btn: "Подписаться", done: "Ты в списке. Первое письмо уже летит.", disc: "Без спама. Отписка в 1 клик.",
    },
    footer: {
      about: "Бразильское джиу-джитсу. №1 рейтинга AJP Северной Америки и №1 в мире. Национальный чемпион шести стран. Лозанна / Санкт-Петербург.",
      sections: "Разделы", training: "Тренировки", contact: "Связь",
      collab: "Сотрудничество — в директ", subscribe: "Подписка",
      copyright: "© 2026 Владимир Нагорянский — The Baseball Bat. Все болевые — добровольные.",
      policy: "Политика конфиденциальности",
    },
  },

  /* ============================== ES ============================== */
  es: {
    nav: { dossier: "Dossier", stats: "Cifras", path: "Camino", media: "Media", voices: "Voces", contact: "Contacto", faq: "FAQ", join: "Escribir" },
    contact: { kicker: "Contacto / 06", t1: "Escríbeme", t2: "directo", sub: "Seminarios, preparación personal, colaboraciones o prensa — escribe directamente. Leo cada mensaje y respondo en persona.", namePh: "Tu nombre", emailPh: "Tu email", msgPh: "Tu mensaje — ¿de qué se trata?", btn: "Enviar mensaje", sending: "Enviando…", done: "Mensaje enviado. Te responderé personalmente.", disc: "Respondo en persona. Sin bots." },
    hero: {
      badge: "#1 Norteamérica · #1 del mundo — ranking AJP",
      name1: "Vladimir", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "CAMPEÓN DE 6 PAÍSES", "#1 NORTEAMÉRICA · AJP", "50+ BASEBALL CHOKE"],
      sub: "Jiu-jitsu brasileño. Campeón nacional de seis países, №1 del ranking AJP de Norteamérica y №1 del mundo. Más de 50 rivales finalizados con el mismo movimiento: el baseball choke. De ahí el apodo.",
      btnFights: "Ver combates", btnStory: "Mi historia",
      views: "983.000+ visitas al perfil en 30 días", record: "Reel récord — 1,8 M de visitas", rankChip: "Ranking AJP · en vivo",
    },
    countdown: { label: "Mundial AJP · Abu Dabi", date: "29 de mayo de 2026", days: "días", hours: "horas", mins: "min", secs: "seg" },
    marquee: "Geografía de victorias · 2022—2026",
    dossier: {
      kicker: "Dossier / 01", t1: "Por qué me llaman", t2: "el Bate de Béisbol",
      sub: "No es marketing, es estadística. Cada punto está respaldado por actas de torneos y vídeos de combates.",
      more: "Saber más",
      cards: [
        { title: "Baseball choke — el arma de la casa", text: "Cerca del 90% de mis victorias rápidas llegan con el mismo movimiento. Más de 50 rivales se durmieron en mi baseball choke: de torneos regionales a Grand Slams internacionales. Mi equipo suizo inventó el apodo y se quedó." },
        { title: "Campeón de seis países", text: "Títulos nacionales en Rusia, España, Suiza, Catar, Letonia y Alemania — además del №1 del ranking AJP de Norteamérica y №1 del mundo." },
        { title: "Base: 7 años de boxeo", text: "La distancia, el timing y la cabeza fría bajo presión vienen del striking. En el suelo parece trampa." },
        { title: "Escuela suiza", text: "Desde 2023 entreno en Lausana con Thomas Oyarzun, una leyenda del deporte. El equipo reprogramó mi psicología de atleta." },
        { title: "Máquina mediática", text: "1,8 M de visitas en el reel récord y casi medio millón de cuentas alcanzadas al mes. Combates que la gente vuelve a ver." },
        { title: "Psicología de la crueldad", text: "En 2022 perdí todos mis combates en el Mundial ACBJJ y quedé inconsciente en la final por el bronce. Mi exentrenador propuso públicamente «pasarme a la categoría femenina». Llevo esas palabras a cada tatami. Sus alumnos ya no me ganan — él ni siquiera mira esos combates." },
      ],
    },
    stats: [
      { label: "ranking AJP mundial", trend: "y #1 en Norteamérica" },
      { label: "finalizaciones baseball choke", trend: "90% de victorias — antes del tiempo" },
      { label: "países — campeón nacional", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "visitas / 30 días", trend: "reel récord — 1,8 M" },
    ],
    proofs: { kicker: "Pruebas / 02", t1: "Las actas", t2: "no mienten", sub: "Resultados AJP y ACBJJ y capturas del ranking en vivo — directo de la app oficial." },
    path: {
      kicker: "Camino / 03", t1: "De «pasadlo a la categoría femenina»", t2: "a la cima del mundo",
      sub: "Tres puntos que convirtieron a un boxeador del montón en el finalizador más letal del tour.",
      steps: [
        { title: "Boxeo. Siete años", text: "Nunca fui bueno golpeando: unas ganaba, otras perdía. Pero cada calentamiento de lucha terminaba con la misma pregunta: «¿Seguro que nunca has hecho lucha?»" },
        { title: "Turquía, 15 años", text: "Un gimnasio en la playa, un desconocido haciendo ejercicios de lucha — y la primera vez que oí «jiu-jitsu brasileño». Al volver a Rusia empecé a entrenar de inmediato." },
        { title: "Suiza, 2023", text: "Nuevo gimnasio, nuevo equipo, el entrenador Thomas Oyarzun. Reconstruyeron mi psicología desde cero: crueldad más técnica. Resultado — títulos en seis países y la cima del ranking AJP." },
      ],
    },
    media: { kicker: "Media / 04", t1: "Imágenes reales.", t2: "Sin montajes", sub: "Fotos de torneos, finalizaciones y combates completos — todo grabado en vivo sobre el tatami.", photos: "Fotos", videos: "Combates", playing: "Reproduciendo" },
    voices: {
      kicker: "Voces / 05", t1: "Qué dicen", t2: "del Bate",
      sub: "El entrenador, el equipo y la gente que ve mis combates desde los mejores asientos.",
      items: [
        { name: "Thomas Oyarzun", role: "Entrenador jefe · cinturón negro de BJJ", org: "Lausana, Suiza", date: "Marzo 2026", text: "En veinte años sobre el tatami no he visto un atleta que convierta la rabia en una precisión tan fría. Vladimir no pelea contra su rival: resuelve un problema. Y la solución siempre es la misma: el baseball choke." },
      ],
    },
    pricing: {
      kicker: "Entrenos / 06", t1: "Entrena con", t2: "el №1",
      sub: "El mismo sistema que trajo títulos en seis países: análisis en vídeo, preparación personal y seminarios itinerantes.",
      month: "Mes", year: "Año", save: "−20%", perMonth: "/mes",
      monthNote: "pago mensual", yearNote: "pagando el año · −20%", popular: "Elección de atletas",
      tiers: [
        { name: "Videoanálisis", desc: "Crece entre sesiones", priceM: "49 €", priceY: "39 €", cta: "Empezar", feats: ["2 análisis de tus combates al mes", "Informe escrito: errores y tareas", "Chat privado de Telegram", "Biblioteca: 40+ detalles del baseball choke", "Llamadas 1 a 1", "Plan de preparación para torneo"], excluded: 2 },
        { name: "Personal", desc: "Preparación bajo mi control", priceM: "149 €", priceY: "119 €", cta: "Reservar plaza", feats: ["Todo lo del plan «Videoanálisis»", "4 sesiones online 1 a 1 al mes", "Plan individual para el torneo", "Análisis de tus rivales", "Corrección de técnica en vídeo", "Acceso a mí 24/7"], excluded: 0 },
        { name: "Seminario", desc: "Intensivo itinerante para tu gimnasio", custom: "desde 900 €", note: "por visita · hasta 40 participantes", cta: "Hablar fechas", feats: ["2 días de intensivo en tu gimnasio", "El sistema baseball choke de la A a la Z", "Primero defensa — luego ataque", "Sparring con feedback individual", "Foto y vídeo para las redes del gimnasio", "Certificados para participantes"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "Las preguntas", t2: "más frecuentes",
      items: [
        { q: "¿Por qué «el Bate de Béisbol»?", a: "El apodo lo inventó mi equipo suizo: cerca del 90% de mis victorias rápidas llegan con el mismo movimiento, el baseball choke. He finalizado a más de 50 rivales con él. El nombre se quedó — ahora es una marca." },
        { q: "¿Puedo empezar BJJ desde cero siendo adulto?", a: "Sí. Yo llegué al jiu-jitsu a los 15 sin un solo día de lucha — solo siete años de boxeo. En BJJ el sistema y la técnica ganan al «talento», así que puedes empezar a cualquier edad." },
        { q: "¿Necesito base de striking o de lucha?", a: "No. El BJJ es lucha en el suelo: luxaciones, estrangulaciones, control posicional, raspados. La técnica clásica de lucha apenas se usa. Cualquier base deportiva ayuda, pero ninguna es obligatoria." },
        { q: "¿Dónde entrenas y puedo unirme?", a: "Desde 2023 mi equipo principal está en Suiza, con Thomas Oyarzun. Puedes unirte a través de seminarios y trabajo online: deja tu correo en el formulario — respondo personalmente." },
        { q: "¿Qué incluye el videoanálisis online?", a: "Me envías vídeos de tus combates o sparrings, desgloso los errores con marcas de tiempo y te doy tareas concretas para el siguiente ciclo. El plan Personal añade llamadas 1 a 1 y plan de torneo." },
      ],
    },
    cta: { kicker: "Suscripción / 08", t1: "La caza", t2: "continúa", sub: "Una vez por semana: análisis de combates, anuncios de torneos y fechas de seminarios. Sin paja — solo lo que te hace más peligroso.", ph: "Tu email", btn: "Suscribirme", done: "Estás en la lista. La primera carta ya vuela.", disc: "Sin spam. Baja en 1 clic." },
    footer: {
      about: "Jiu-jitsu brasileño. №1 del ranking AJP de Norteamérica y №1 del mundo. Campeón nacional de seis países. Lausana / San Petersburgo.",
      sections: "Secciones", training: "Entrenos", contact: "Contacto",
      collab: "Colaboraciones — por DM", subscribe: "Suscripción",
      copyright: "© 2026 Vladimir Nagorianskii — The Baseball Bat. Todas las luxaciones son voluntarias.",
      policy: "Política de privacidad",
    },
  },

  /* ============================== ZH ============================== */
  zh: {
    nav: { dossier: "档案", stats: "数据", path: "历程", media: "媒体", voices: "评价", contact: "联系", faq: "问答", join: "联系我" },
    contact: { kicker: "联系 / 06", t1: "直接", t2: "联系我", sub: "研讨课、私人指导、合作或媒体——请直接联系。我会阅读每一条消息并亲自回复。", namePh: "你的名字", emailPh: "你的邮箱", msgPh: "你的留言——关于什么？", btn: "发送", sending: "发送中…", done: "已发送。我会亲自回复你。", disc: "我亲自回复，绝非机器人。" },
    hero: {
      badge: "AJP排名 北美第1 · 世界第1",
      name1: "弗拉基米尔", name2: "纳戈良斯基",
      typed: ["THE BASEBALL BAT", "六国全国冠军", "北美第一 · AJP", "50+次 BASEBALL CHOKE 终结"],
      sub: "巴西柔术运动员。六个国家的全国冠军，AJP北美排名第一、世界第一。超过50名对手被同一招终结——棒球绞（baseball choke）。绰号由此而来。",
      btnFights: "观看比赛", btnStory: "我的故事",
      views: "30天内主页浏览量 983,000+", record: "最热视频 — 180万播放", rankChip: "AJP排名 · 实时",
    },
    countdown: { label: "AJP世界锦标赛 · 阿布扎比", date: "2026年5月29日", days: "天", hours: "时", mins: "分", secs: "秒" },
    marquee: "胜利版图 · 2022—2026",
    dossier: {
      kicker: "档案 / 01", t1: "为什么大家叫我", t2: "棒球棍",
      sub: "不是营销，是统计。以下每一条都有比赛记录和视频为证。",
      more: "了解更多",
      cards: [
        { title: "棒球绞 — 招牌武器", text: "我约90%的提前终结都来自同一招。从地区赛到国际大满贯，50多名对手在我的棒球绞中失去意识。瑞士队友给我起了这个绰号，从此成为标志。" },
        { title: "六国全国冠军", text: "俄罗斯、西班牙、瑞士、卡塔尔、拉脱维亚和德国的全国冠军——以及AJP北美排名第一、世界第一。" },
        { title: "根基：7年拳击", text: "距离感、时机和高压下的冷静来自站立打击。到了地面，这简直像作弊。" },
        { title: "瑞士学派", text: "2023年起在洛桑跟随传奇教练托马斯·奥亚尊训练。团队彻底重塑了我的运动员心理。" },
        { title: "媒体机器", text: "最热视频180万播放，每月触达近50万账号。人们会反复回看的比赛。" },
        { title: "无情的心理", text: "2022年ACBJJ世锦赛我输掉了所有比赛，铜牌战中被绞晕。前教练公开提议“把我转去女子组”。这句话我带上每一块垫子。他的学生再也赢不了我——他甚至不再看那些比赛。" },
      ],
    },
    stats: [
      { label: "AJP世界排名", trend: "北美同样第1" },
      { label: "棒球绞终结次数", trend: "90%的胜利提前结束" },
      { label: "国家全国冠军", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "30天浏览量", trend: "最热视频 180万" },
    ],
    proofs: { kicker: "实证 / 02", t1: "成绩单", t2: "不会说谎", sub: "AJP与ACBJJ的比赛结果和实时排名截图——直接来自官方应用。" },
    path: {
      kicker: "历程 / 03", t1: "从“送他去女子组”", t2: "到世界之巅",
      sub: "三个节点，把一名平庸的拳手变成巡回赛最高效的终结者。",
      steps: [
        { title: "拳击，七年", text: "我打击技术从来不算出色：有胜有负。但每次摔跤热身后队友都会问同一个问题：“你真的没练过摔跤？”" },
        { title: "土耳其，15岁", text: "海滩上的训练馆，一位做摔跤训练的陌生人——我第一次听到“巴西柔术”这个词。回到俄罗斯后立刻开始训练。" },
        { title: "瑞士，2023", text: "新馆、新队伍、教练托马斯·奥亚尊。运动员心理被彻底重建：无情加技术。结果——六国冠军和AJP排名之巅。" },
      ],
    },
    media: { kicker: "媒体 / 04", t1: "真实影像。", t2: "毫无摆拍", sub: "比赛照片、终结瞬间和完整比赛——全部在垫上实拍。", photos: "照片", videos: "比赛", playing: "正在播放" },
    voices: {
      kicker: "评价 / 05", t1: "人们如何评价", t2: "棒球棍",
      sub: "教练、队友以及在最佳位置观战的人。",
      items: [
        { name: "托马斯·奥亚尊", role: "主教练 · 巴西柔术黑带", org: "瑞士洛桑", date: "2026年3月", text: "在垫子上的二十年里，我从未见过能把愤怒转化为如此冷酷精准的运动员。弗拉基米尔不是在对抗对手，而是在解题。而答案永远只有一个：棒球绞。" },
      ],
    },
    pricing: {
      kicker: "训练 / 06", t1: "跟第一名", t2: "一起训练",
      sub: "正是这套体系带来了六国冠军：视频分析、私人指导和巡回研讨课。",
      month: "按月", year: "按年", save: "−20%", perMonth: "/月",
      monthNote: "按月付费", yearNote: "按年付费 · −20%", popular: "运动员之选",
      tiers: [
        { name: "视频分析", desc: "在训练之间持续进步", priceM: "¥390", priceY: "¥310", cta: "开始分析", feats: ["每月2次比赛视频分析", "书面报告：错误与任务", "团队私密Telegram群", "终结技库：40+棒球绞细节", "一对一通话", "赛前备战计划"], excluded: 2 },
        { name: "私人指导", desc: "我亲自掌控的备战", priceM: "¥1,190", priceY: "¥950", cta: "占据名额", feats: ["包含“视频分析”全部内容", "每月4次一对一在线课程", "个性化赛事计划", "对手分析", "视频纠正技术", "24/7随时联系我"], excluded: 0 },
        { name: "研讨课", desc: "上门集训营", custom: "¥7,200起", note: "每次出行 · 最多40名学员", cta: "商谈日期", feats: ["2天馆内集训", "棒球绞体系从零到精通", "先防守 — 后进攻", "实战并逐一点评", "为场馆拍摄照片和视频", "学员证书"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "问答 / 07", t1: "最常被问到的", t2: "问题",
      items: [
        { q: "为什么叫“棒球棍”？", a: "绰号来自我的瑞士队友：我约90%的提前胜利都来自同一招——棒球绞。我用它终结了50多名对手。名字流传开来，如今成了品牌。" },
        { q: "成年人能从零开始练巴西柔术吗？", a: "可以。我15岁开始练柔术，之前没有一天摔跤经验——只有七年拳击。在巴西柔术里，体系和技术胜过“天赋”，任何年龄都可以开始。" },
        { q: "需要打击或摔跤基础吗？", a: "不需要。巴西柔术是地面格斗：关节技、绞技、位置控制、翻转。传统摔跤技术在这里几乎用不上。任何运动背景都有帮助，但都不是必需。" },
        { q: "你在哪里训练？我能加入吗？", a: "2023年起我的主队在瑞士，由托马斯·奥亚尊执教。可以通过研讨课和线上指导加入：在下方表单留下邮箱——我会亲自回复。" },
        { q: "线上视频分析包含什么？", a: "你发来比赛或实战视频，我按时间点拆解错误，并给出下一周期的具体任务。私人指导套餐还包括一对一通话和赛事备战计划。" },
      ],
    },
    cta: { kicker: "订阅 / 08", t1: "狩猎", t2: "仍在继续", sub: "每周一封：比赛拆解、赛事预告和研讨课日期。没有废话——只有让你更危险的内容。", ph: "你的邮箱", btn: "订阅", done: "已加入名单。第一封邮件正在路上。", disc: "无垃圾邮件。一键退订。" },
    footer: {
      about: "巴西柔术。AJP北美排名第一、世界第一。六个国家的全国冠军。洛桑 / 圣彼得堡。",
      sections: "栏目", training: "训练", contact: "联系",
      collab: "合作请私信", subscribe: "订阅",
      copyright: "© 2026 弗拉基米尔·纳戈良斯基 — The Baseball Bat。所有降服都是自愿的。",
      policy: "隐私政策",
    },
  },

  /* ============================== TR ============================== */
  tr: {
    nav: { dossier: "Dosya", stats: "Rakamlar", path: "Yolculuk", media: "Medya", voices: "Yorumlar", contact: "İletişim", faq: "SSS", join: "Yaz" },
    contact: { kicker: "İletişim / 06", t1: "Doğrudan", t2: "yaz", sub: "Seminerler, kişisel hazırlık, iş birlikleri veya basın — doğrudan yaz. Her mesajı okur, bizzat yanıtlarım.", namePh: "Adın", emailPh: "E-postan", msgPh: "Mesajın — konu nedir?", btn: "Mesaj gönder", sending: "Gönderiliyor…", done: "Mesaj gönderildi. Sana bizzat döneceğim.", disc: "Bizzat yanıtlıyorum. Bot yok." },
    hero: {
      badge: "AJP sıralaması: Kuzey Amerika #1 · Dünya #1",
      name1: "Vladimir", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "6 ÜLKENİN ŞAMPİYONU", "KUZEY AMERİKA #1 · AJP", "50+ BASEBALL CHOKE BİTİRİŞ"],
      sub: "Brezilya jiu-jitsusu. Altı ülkenin milli şampiyonu, AJP Kuzey Amerika 1 ve dünya 1 numara. 50’den fazla rakip aynı teknikle bitirildi — baseball choke. Lakap da buradan geliyor.",
      btnFights: "Maçları izle", btnStory: "Hikayem",
      views: "30 günde 983.000+ profil görüntülenmesi", record: "Rekor video — 1,8 M izlenme", rankChip: "AJP sıralaması · canlı",
    },
    countdown: { label: "AJP Dünya Şampiyonası · Abu Dabi", date: "29 Mayıs 2026", days: "gün", hours: "saat", mins: "dk", secs: "sn" },
    marquee: "Zafer coğrafyası · 2022—2026",
    dossier: {
      kicker: "Dosya / 01", t1: "Bana neden", t2: "Beyzbol Sopası diyorlar",
      sub: "Pazarlama değil — istatistik. Aşağıdaki her madde turnuva tutanakları ve maç kayıtlarıyla kanıtlı.",
      more: "Detaylar",
      cards: [
        { title: "Baseball choke — imza silah", text: "Erken bitirdiğim maçların yaklaşık %90’ı aynı teknikle geliyor. Bölgesel turnuvalardan uluslararası Grand Slam’lere kadar 50’den fazla rakip baseball choke’umda uyudu. Lakabı İsviçreli takımım taktı ve kaldı." },
        { title: "Altı ülkenin şampiyonu", text: "Rusya, İspanya, İsviçre, Katar, Letonya ve Almanya’da milli şampiyonluk — ayrıca AJP Kuzey Amerika 1 ve dünya 1 numara." },
        { title: "Temel: 7 yıl boks", text: "Mesafe, zamanlama ve baskı altında soğukkanlılık striking’den geliyor. Yerde bu resmen hile gibi." },
        { title: "İsviçre ekolü", text: "2023’ten beri Lozan’da sporun efsanesi Thomas Oyarzun’la çalışıyorum. Takım, sporcu psikolojimi baştan yazdı." },
        { title: "Medya makinesi", text: "Rekor videoda 1,8 M izlenme, ayda yarım milyona yakın ulaşılan hesap. Tekrar tekrar izlenen maçlar." },
        { title: "Acımasızlık psikolojisi", text: "2022’de ACBJJ Dünya Şampiyonası’nda bütün maçlarımı kaybettim, bronz maçında boğmayla bayıldım. Eski koçum beni alenen “kadınlar kategorisine vermeyi” önerdi. O sözleri her tatamiye yanımda taşıyorum. Öğrencileri artık beni yenemiyor — o maçları izlemiyor bile." },
      ],
    },
    stats: [
      { label: "AJP dünya sıralaması", trend: "ayrıca Kuzey Amerika 1" },
      { label: "baseball choke bitirişi", trend: "galibiyetlerin %90’ı erken" },
      { label: "ülkede milli şampiyon", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "görüntülenme / 30 gün", trend: "rekor video — 1,8 M" },
    ],
    proofs: { kicker: "Kanıtlar / 02", t1: "Tutanaklar", t2: "yalan söylemez", sub: "AJP ve ACBJJ sonuç sayfaları ile canlı sıralama ekran görüntüleri — doğrudan resmi uygulamadan." },
    path: {
      kicker: "Yolculuk / 03", t1: "“Kadınlar kategorisine verin”den", t2: "dünyanın zirvesine",
      sub: "Sıradan bir boksörü turun en üretken bitiricisine dönüştüren üç nokta.",
      steps: [
        { title: "Boks. Yedi yıl", text: "Striking’de hiç parlak değildim: bazen kazandım, bazen kaybettim. Ama her güreş ısınması takım arkadaşlarımın aynı sorusuyla bitiyordu: “Gerçekten hiç güreşmedin mi?”" },
        { title: "Türkiye, 15 yaş", text: "Plajdaki spor salonu, güreş egzersizleri yapan bir yabancı — ve hayatımda ilk kez duyduğum “Brezilya jiu-jitsusu” sözü. Rusya’ya döner dönmez antrenmana başladım." },
        { title: "İsviçre, 2023", text: "Yeni salon, yeni takım, koç Thomas Oyarzun. Sporcu psikolojim sıfırdan yazıldı: acımasızlık artı teknik. Sonuç — altı ülkede şampiyonluk ve AJP zirvesi." },
      ],
    },
    media: { kicker: "Medya / 04", t1: "Gerçek kareler.", t2: "Kurgu yok", sub: "Turnuva fotoğrafları, bitirişler ve tam maçlar — hepsi tatamide canlı çekildi.", photos: "Fotoğraflar", videos: "Maçlar", playing: "Şimdi oynuyor" },
    voices: {
      kicker: "Yorumlar / 05", t1: "Sopa hakkında", t2: "ne diyorlar",
      sub: "Koç, takım ve maçlarımı en iyi koltuklardan izleyenler.",
      items: [
        { name: "Thomas Oyarzun", role: "Başantrenör · BJJ siyah kuşak", org: "Lozan, İsviçre", date: "Mart 2026", text: "Tatamide geçen yirmi yılda öfkeyi bu kadar soğuk bir isabete dönüştüren sporcu görmedim. Vladimir rakibiyle dövüşmüyor — problem çözüyor. Ve çözüm hep aynı: baseball choke." },
      ],
    },
    pricing: {
      kicker: "Antrenman / 06", t1: "Bir numarayla", t2: "çalış",
      sub: "Altı ülkede şampiyonluk getiren sistemin aynısı: video analizler, kişisel hazırlık ve gezici seminerler.",
      month: "Aylık", year: "Yıllık", save: "−20%", perMonth: "/ay",
      monthNote: "aylık ödeme", yearNote: "yıllık ödemede · −20%", popular: "Sporcuların tercihi",
      tiers: [
        { name: "Video analiz", desc: "Antrenmanlar arasında geliş", priceM: "₺1.900", priceY: "₺1.500", cta: "Analize başla", feats: ["Ayda 2 maç analizi", "Yazılı rapor: hatalar ve görevler", "Takımın özel Telegram sohbeti", "Bitiriş kütüphanesi: 40+ baseball choke detayı", "Birebir görüşmeler", "Turnuva hazırlık planı"], excluded: 2 },
        { name: "Personal", desc: "Benim kontrolümde hazırlık", priceM: "₺5.900", priceY: "₺4.700", cta: "Yer kap", feats: ["“Video analiz” paketindeki her şey", "Ayda 4 birebir online seans", "Kişiye özel turnuva planı", "Rakip analizi", "Videoda teknik düzeltme", "Bana 7/24 erişim"], excluded: 0 },
        { name: "Seminer", desc: "Salonunuza gezici kamp", custom: "₺36.000’den", note: "ziyaret başına · en fazla 40 katılımcı", cta: "Tarih konuşalım", feats: ["Salonunuzda 2 günlük kamp", "Baseball choke sistemi A’dan Z’ye", "Önce savunma — sonra atak", "Birebir geri bildirimli idmanlar", "Salonunuzun sosyal medyası için foto/video", "Katılımcılara sertifika"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "SSS / 07", t1: "En sık sorulan", t2: "sorular",
      items: [
        { q: "Neden “Beyzbol Sopası”?", a: "Lakabı İsviçreli takımım taktı: erken galibiyetlerimin yaklaşık %90’ı aynı teknikten — baseball choke. Onunla 50’den fazla rakibi bitirdim. İsim tuttu, artık bir marka." },
        { q: "Yetişkin yaşta sıfırdan BJJ’ye başlanır mı?", a: "Evet. Ben jiu-jitsuya 15 yaşında, tek gün güreş geçmişim olmadan geldim — sadece yedi yıl boks vardı. BJJ’de sistem ve teknik “yeteneği” yener; her yaşta başlanır." },
        { q: "Striking ya da güreş temeli şart mı?", a: "Hayır. BJJ yer mücadelesidir: kilitler, boğmalar, pozisyon kontrolü, süpürmeler. Klasik güreş teknikleri burada neredeyse kullanılmaz. Her spor geçmişi faydalı ama hiçbiri zorunlu değil." },
        { q: "Nerede çalışıyorsun, katılabilir miyim?", a: "2023’ten beri ana takımım İsviçre’de, Thomas Oyarzun yönetiminde. Seminerler ve online çalışmayla katılabilirsin: aşağıdaki forma e-postanı bırak — bizzat cevaplıyorum." },
        { q: "Online maç analizinde ne var?", a: "Maç ya da idman videolarını gönderiyorsun; hataları zaman damgalarıyla ayrıştırıp bir sonraki döngü için somut görevler veriyorum. Personal pakette birebir görüşmeler ve turnuva planı da var." },
      ],
    },
    cta: { kicker: "Abonelik / 08", t1: "Av", t2: "devam ediyor", sub: "Haftada bir: maç analizleri, turnuva duyuruları ve seminer tarihleri. Boş laf yok — sadece seni daha tehlikeli yapan şeyler.", ph: "E-postan", btn: "Abone ol", done: "Listedesin. İlk e-posta yolda.", disc: "Spam yok. Tek tıkla çık." },
    footer: {
      about: "Brezilya jiu-jitsusu. AJP Kuzey Amerika sıralamasında 1, dünyada 1 numara. Altı ülkenin milli şampiyonu. Lozan / St. Petersburg.",
      sections: "Bölümler", training: "Antrenman", contact: "İletişim",
      collab: "İş birliği — DM’den", subscribe: "Abonelik",
      copyright: "© 2026 Vladimir Nagorianskii — The Baseball Bat. Tüm kilitlenmeler gönüllüdür.",
      policy: "Gizlilik politikası",
    },
  },

  /* ============================== LV ============================== */
  lv: {
    nav: { dossier: "Dosjē", stats: "Skaitļi", path: "Ceļš", media: "Mediji", voices: "Atsauksmes", contact: "Kontakti", faq: "BUJ", join: "Rakstīt" },
    contact: { kicker: "Kontakti / 06", t1: "Raksti", t2: "tieši", sub: "Semināri, personīgā sagatavošana, sadarbība vai prese — raksti tieši. Es izlasu katru ziņu un atbildu personīgi.", namePh: "Tavs vārds", emailPh: "Tavs e-pasts", msgPh: "Tava ziņa — par ko?", btn: "Sūtīt ziņu", sending: "Sūta…", done: "Ziņa nosūtīta. Atbildēšu personīgi.", disc: "Atbildu personīgi. Bez botiem." },
    hero: {
      badge: "AJP rangs: #1 Ziemeļamerikā · #1 pasaulē",
      name1: "Vladimirs", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "6 VALSTU ČEMPIONS", "#1 ZIEMEĻAMERIKĀ · AJP", "50+ BASEBALL CHOKE FINIŠI"],
      sub: "Brazīliešu džiu-džitsu. Sešu valstu nacionālais čempions, AJP Ziemeļamerikas ranga №1 un pasaulē №1. Vairāk nekā 50 pretinieku pabeigti ar vienu un to pašu paņēmienu — baseball choke. No tā arī iesauka.",
      btnFights: "Skatīties cīņas", btnStory: "Mans stāsts",
      views: "983 000+ profila skatījumu 30 dienās", record: "Rekordvideo — 1,8 milj. skatījumu", rankChip: "AJP rangs · tiešraidē",
    },
    countdown: { label: "AJP Pasaules čempionāts · Abū Dabī", date: "2026. gada 29. maijs", days: "dienas", hours: "stundas", mins: "min", secs: "sek" },
    marquee: "Uzvaru ģeogrāfija · 2022—2026",
    dossier: {
      kicker: "Dosjē / 01", t1: "Kāpēc mani sauc par", t2: "beisbola nūju",
      sub: "Tas nav mārketings — tā ir statistika. Katrs punkts apstiprināts ar turnīru protokoliem un cīņu ierakstiem.",
      more: "Vairāk",
      cards: [
        { title: "Baseball choke — paraksta ierocis", text: "Apmēram 90% manu priekšlaicīgo uzvaru nāk no viena un tā paša paņēmiena. Vairāk nekā 50 pretinieku aizmiguši manā baseball choke — no reģionālajiem turnīriem līdz starptautiskiem Grand Slam. Iesauku izdomāja mana Šveices komanda, un tā pielipa." },
        { title: "Sešu valstu čempions", text: "Nacionālie tituli Krievijā, Spānijā, Šveicē, Katarā, Latvijā un Vācijā — plus AJP Ziemeļamerikas №1 un pasaulē №1." },
        { title: "Pamats: 7 gadi boksā", text: "Distance, taimings un vēss prāts zem spiediena nāk no sitienu cīņas. Uz zemes tas šķiet kā krāpšanās." },
        { title: "Šveices skola", text: "Kopš 2023. gada trenējos Lozannā pie Tomasa Ojarzuna — īstas sporta leģendas. Komanda pārrakstīja manu sportista psiholoģiju." },
        { title: "Mediju mašīna", text: "1,8 milj. skatījumu rekordvideo un gandrīz pusmiljons sasniegtu kontu mēnesī. Cīņas, kuras skatās atkārtoti." },
        { title: "Nežēlības psiholoģija", text: "2022. gadā ACBJJ Pasaules čempionātā zaudēju visas cīņas un bronzas mačā zaudēju samaņu žņaugšanā. Bijušais treneris publiski ieteica “atdot mani sieviešu kategorijai”. Šos vārdus es ņemu līdzi uz katru tatami. Viņa audzēkņi mani vairs neuzvar — viņš tās cīņas pat neskatās." },
      ],
    },
    stats: [
      { label: "AJP pasaules rangs", trend: "arī #1 Ziemeļamerikā" },
      { label: "baseball choke finiši", trend: "90% uzvaru — priekšlaicīgi" },
      { label: "valstis — nacionālais čempions", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "skatījumi / 30 dienās", trend: "rekordvideo — 1,8 milj." },
    ],
    proofs: { kicker: "Pierādījumi / 02", t1: "Protokoli", t2: "nemelo", sub: "AJP un ACBJJ rezultātu lapas un ranga ekrānuzņēmumi — tieši no oficiālās lietotnes." },
    path: {
      kicker: "Ceļš / 03", t1: "No “atdodiet viņu sieviešu kategorijai”", t2: "līdz pasaules virsotnei",
      sub: "Trīs punkti, kas viduvēju bokseri pārvērta par tūres ražīgāko finišētāju.",
      steps: [
        { title: "Bokss. Septiņi gadi", text: "Sitienos nekad nebiju izcils: dažreiz uzvarēju, dažreiz zaudēju. Bet katra cīņas iesildīšanās beidzās ar vienu un to pašu komandas biedru jautājumu: “Tu tiešām nekad neesi cīkstējies?”" },
        { title: "Turcija, 15 gadi", text: "Sporta zāle pludmalē, svešinieks ar cīkstoņa vingrinājumiem — un pirmo reizi dzirdētie vārdi “brazīliešu džiu-džitsu”. Atgriezies Krievijā, uzreiz sāku trenēties." },
        { title: "Šveice, 2023", text: "Jauna zāle, jauna komanda, treneris Tomass Ojarzuns. Sportista psiholoģija pārbūvēta no nulles: nežēlība plus tehnika. Rezultāts — tituli sešās valstīs un AJP ranga virsotne." },
      ],
    },
    media: { kicker: "Mediji / 04", t1: "Īsti kadri.", t2: "Bez inscenējuma", sub: "Turnīru foto, finiši un pilnas cīņas — viss filmēts dzīvajā uz tatami.", photos: "Foto", videos: "Cīņas", playing: "Tagad skan" },
    voices: {
      kicker: "Atsauksmes / 05", t1: "Ko saka", t2: "par nūju",
      sub: "Treneris, komanda un cilvēki, kas manas cīņas redz no labākajām vietām.",
      items: [
        { name: "Tomass Ojarzuns", role: "Galvenais treneris · BJJ melnā josta", org: "Lozanna, Šveice", date: "2026. gada marts", text: "Divdesmit gados uz tatami neesmu redzējis sportistu, kas dusmas pārvērš tik aukstā precizitātē. Vladimirs necīnās ar pretinieku — viņš risina uzdevumu. Un risinājums vienmēr ir viens: baseball choke." },
      ],
    },
    pricing: {
      kicker: "Treniņi / 06", t1: "Trenējies ar", t2: "numuru 1",
      sub: "Tā pati sistēma, kas atnesa titulus sešās valstīs: video analīzes, personīgā sagatavošana un izbraukuma semināri.",
      month: "Mēnesis", year: "Gads", save: "−20%", perMonth: "/mēn.",
      monthNote: "maksājums ik mēnesi", yearNote: "maksājot par gadu · −20%", popular: "Sportistu izvēle",
      tiers: [
        { name: "Video analīze", desc: "Audz starp treniņiem", priceM: "45 €", priceY: "36 €", cta: "Sākt analīzi", feats: ["2 tavu cīņu analīzes mēnesī", "Rakstisks pārskats: kļūdas un uzdevumi", "Slēgts komandas Telegram čats", "Finišu bibliotēka: 40+ baseball choke detaļas", "Zvani 1 pret 1", "Turnīra sagatavošanās plāns"], excluded: 2 },
        { name: "Personal", desc: "Sagatavošana manā kontrolē", priceM: "139 €", priceY: "111 €", cta: "Aizņemt vietu", feats: ["Viss no “Video analīzes”", "4 tiešsaistes sesijas 1 pret 1 mēnesī", "Individuāls turnīra plāns", "Pretinieku analīze", "Tehnikas labojumi video", "Piekļuve man 24/7"], excluded: 0 },
        { name: "Seminārs", desc: "Izbraukuma nometne tavai zālei", custom: "no 850 €", note: "par izbraukumu · līdz 40 dalībniekiem", cta: "Sarunāt datumus", feats: ["2 dienu nometne jūsu zālē", "Baseball choke sistēma no A līdz Z", "Vispirms aizsardzība — tad uzbrukums", "Sparingi ar individuālu analīzi", "Foto un video zāles sociālajiem tīkliem", "Sertifikāti dalībniekiem"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "BUJ / 07", t1: "Biežāk uzdotie", t2: "jautājumi",
      items: [
        { q: "Kāpēc “beisbola nūja”?", a: "Iesauku izdomāja mana Šveices komanda: apmēram 90% manu priekšlaicīgo uzvaru nāk no viena paņēmiena — baseball choke. Ar to esmu pabeidzis vairāk nekā 50 pretinieku. Vārds pielipa — tagad tas ir zīmols." },
        { q: "Vai pieaugušais var sākt BJJ no nulles?", a: "Jā. Es džiu-džitsu sāku 15 gados bez nevienas cīkstēšanās dienas — tikai septiņi gadi boksa. BJJ sistēma un tehnika uzvar “talantu”, tāpēc sākt var jebkurā vecumā." },
        { q: "Vai vajadzīga sitienu vai cīkstēšanās bāze?", a: "Nē. BJJ ir cīņa uz zemes: sāpju paņēmieni, žņaugšanas, pozīciju kontrole, apgāšanas. Klasiskās cīkstēšanās tehnikas šeit gandrīz neizmanto. Jebkura sporta pieredze palīdz, bet nav obligāta." },
        { q: "Kur tu trenējies un vai var pievienoties?", a: "Kopš 2023. gada mana galvenā komanda ir Šveicē, Tomasa Ojarzuna vadībā. Pievienoties var caur semināriem un tiešsaistes darbu: atstāj e-pastu formā zemāk — atbildu personīgi." },
        { q: "Kas ietilpst tiešsaistes cīņu analīzē?", a: "Tu atsūti savu cīņu vai sparingu video, es izanalizēju kļūdas ar laika zīmogiem un dodu konkrētus uzdevumus nākamajam ciklam. Personal plānā klāt nāk zvani 1 pret 1 un turnīra plāns." },
      ],
    },
    cta: { kicker: "Abonēšana / 08", t1: "Medības", t2: "turpinās", sub: "Reizi nedēļā: cīņu analīzes, turnīru paziņojumi un semināru datumi. Bez ūdens — tikai tas, kas padara tevi bīstamāku.", ph: "Tavs e-pasts", btn: "Abonēt", done: "Tu esi sarakstā. Pirmā vēstule jau lido.", disc: "Bez mēstulēm. Atrakstīšanās ar 1 klikšķi." },
    footer: {
      about: "Brazīliešu džiu-džitsu. AJP Ziemeļamerikas ranga №1, pasaulē №1. Sešu valstu nacionālais čempions. Lozanna / Sanktpēterburga.",
      sections: "Sadaļas", training: "Treniņi", contact: "Kontakti",
      collab: "Sadarbība — rakstiet DM", subscribe: "Abonēšana",
      copyright: "© 2026 Vladimirs Nagorianskii — The Baseball Bat. Visi sāpju paņēmieni — brīvprātīgi.",
      policy: "Privātuma politika",
    },
  },

  /* ============================== PT ============================== */
  pt: {
    nav: { dossier: "Dossiê", stats: "Números", path: "Jornada", media: "Mídia", voices: "Vozes", contact: "Contato", faq: "FAQ", join: "Escrever" },
    contact: { kicker: "Contato / 06", t1: "Fale", t2: "comigo", sub: "Seminários, preparação pessoal, parcerias ou imprensa — escreva diretamente. Leio cada mensagem e respondo pessoalmente.", namePh: "Seu nome", emailPh: "Seu e-mail", msgPh: "Sua mensagem — sobre o quê?", btn: "Enviar mensagem", sending: "Enviando…", done: "Mensagem enviada. Vou te responder pessoalmente.", disc: "Respondo pessoalmente. Sem bots." },
    hero: {
      badge: "Ranking AJP: #1 América do Norte · #1 mundial",
      name1: "Vladimir", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "CAMPEÃO DE 6 PAÍSES", "#1 AMÉRICA DO NORTE · AJP", "50+ BASEBALL CHOKE"],
      sub: "Jiu-jitsu brasileiro. Campeão nacional de seis países, №1 do ranking AJP da América do Norte e №1 do mundo. Mais de 50 adversários finalizados com o mesmo golpe — o baseball choke. Daí o apelido.",
      btnFights: "Ver lutas", btnStory: "Minha história",
      views: "983.000+ visualizações do perfil em 30 dias", record: "Reel recorde — 1,8 mi de views", rankChip: "Ranking AJP · ao vivo",
    },
    countdown: { label: "Mundial AJP · Abu Dhabi", date: "29 de maio de 2026", days: "dias", hours: "horas", mins: "min", secs: "seg" },
    marquee: "Geografia das vitórias · 2022—2026",
    dossier: {
      kicker: "Dossiê / 01", t1: "Por que me chamam de", t2: "Taco de Beisebol",
      sub: "Não é marketing — é estatística. Cada item abaixo é comprovado por súmulas de torneios e vídeos das lutas.",
      more: "Saiba mais",
      cards: [
        { title: "Baseball choke — a arma registrada", text: "Cerca de 90% das minhas vitórias rápidas vêm do mesmo golpe. Mais de 50 adversários apagaram no meu baseball choke — de opens regionais a Grand Slams internacionais. Minha equipe suíça criou o apelido, e ele pegou." },
        { title: "Campeão de seis países", text: "Títulos nacionais na Rússia, Espanha, Suíça, Catar, Letônia e Alemanha — além do №1 do ranking AJP da América do Norte e №1 do mundo." },
        { title: "Base: 7 anos de boxe", text: "Distância, timing e cabeça fria sob pressão vêm da trocação. No chão, parece trapaça." },
        { title: "Escola suíça", text: "Desde 2023 treino em Lausanne com Thomas Oyarzun — uma lenda do esporte. A equipe reprogramou minha psicologia de atleta." },
        { title: "Máquina de mídia", text: "1,8 mi de views no reel recorde e quase meio milhão de contas alcançadas por mês. Lutas que as pessoas reveem." },
        { title: "Psicologia da impiedade", text: "Em 2022 perdi todas as lutas no Mundial ACBJJ e apaguei na disputa do bronze. Meu ex-treinador sugeriu publicamente “me passar para a categoria feminina”. Levo essas palavras para cada tatame. Os alunos dele não me vencem mais — ele nem assiste a essas lutas." },
      ],
    },
    stats: [
      { label: "ranking AJP mundial", trend: "e #1 América do Norte" },
      { label: "finalizações baseball choke", trend: "90% das vitórias — antes do tempo" },
      { label: "países — campeão nacional", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "views / 30 dias", trend: "reel recorde — 1,8 mi" },
    ],
    proofs: { kicker: "Provas / 02", t1: "As súmulas", t2: "não mentem", sub: "Resultados AJP e ACBJJ e prints do ranking ao vivo — direto do app oficial." },
    path: {
      kicker: "Jornada / 03", t1: "De «coloquem ele na categoria feminina»", t2: "ao topo do mundo",
      sub: "Três pontos que transformaram um boxeador mediano no finalizador mais letal do tour.",
      steps: [
        { title: "Boxe. Sete anos", text: "Nunca fui bom na trocação: às vezes ganhava, às vezes perdia. Mas todo aquecimento de luta agarrada terminava com a mesma pergunta: “Certeza que você nunca lutou wrestling?”" },
        { title: "Turquia, 15 anos", text: "Uma academia na praia, um desconhecido fazendo exercícios de luta — e a primeira vez que ouvi “jiu-jitsu brasileiro”. De volta à Rússia, comecei a treinar imediatamente." },
        { title: "Suíça, 2023", text: "Nova academia, nova equipe, o treinador Thomas Oyarzun. Minha psicologia de atleta foi reconstruída do zero: impiedade mais técnica. Resultado — títulos em seis países e o topo do ranking AJP." },
      ],
    },
    media: { kicker: "Mídia / 04", t1: "Imagens reais.", t2: "Sem encenação", sub: "Fotos de torneios, finalizações e lutas completas — tudo filmado ao vivo no tatame.", photos: "Fotos", videos: "Lutas", playing: "Tocando agora" },
    voices: {
      kicker: "Vozes / 05", t1: "O que dizem", t2: "sobre o Taco",
      sub: "O treinador, a equipe e as pessoas que assistem às minhas lutas dos melhores lugares.",
      items: [
        { name: "Thomas Oyarzun", role: "Treinador-chefe · faixa-preta de BJJ", org: "Lausanne, Suíça", date: "Março 2026", text: "Em vinte anos de tatame nunca vi um atleta que transforme raiva em uma precisão tão fria. Vladimir não luta contra o adversário — ele resolve um problema. E a solução é sempre a mesma: o baseball choke." },
      ],
    },
    pricing: {
      kicker: "Treinos / 06", t1: "Treine com", t2: "o №1",
      sub: "O mesmo sistema que trouxe títulos em seis países: análises em vídeo, preparação pessoal e seminários itinerantes.",
      month: "Mensal", year: "Anual", save: "−20%", perMonth: "/mês",
      monthNote: "cobrança mensal", yearNote: "pagando o ano · −20%", popular: "Escolha dos atletas",
      tiers: [
        { name: "Análise em vídeo", desc: "Evolua entre os treinos", priceM: "R$ 290", priceY: "R$ 230", cta: "Começar", feats: ["2 análises das suas lutas por mês", "Relatório escrito: erros e tarefas", "Chat privado da equipe no Telegram", "Biblioteca: 40+ detalhes do baseball choke", "Calls 1 a 1", "Plano de preparação para campeonato"], excluded: 2 },
        { name: "Personal", desc: "Preparação sob meu controle", priceM: "R$ 890", priceY: "R$ 710", cta: "Garantir vaga", feats: ["Tudo do plano «Análise em vídeo»", "4 sessões online 1 a 1 por mês", "Plano individual de campeonato", "Estudo dos adversários", "Correção de técnica em vídeo", "Acesso a mim 24/7"], excluded: 0 },
        { name: "Seminário", desc: "Camp itinerante para sua academia", custom: "a partir de R$ 5.400", note: "por visita · até 40 participantes", cta: "Combinar datas", feats: ["Camp de 2 dias na sua academia", "O sistema baseball choke de A a Z", "Primeiro defesa — depois ataque", "Sparring com feedback individual", "Foto e vídeo para as redes da academia", "Certificados para participantes"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "As perguntas mais", t2: "frequentes",
      items: [
        { q: "Por que “Taco de Beisebol”?", a: "O apelido veio da minha equipe suíça: cerca de 90% das minhas vitórias rápidas vêm do mesmo golpe — o baseball choke. Já finalizei mais de 50 adversários com ele. O nome pegou, agora é uma marca." },
        { q: "Dá para começar BJJ do zero na idade adulta?", a: "Sim. Cheguei ao jiu-jitsu aos 15, sem um dia de wrestling — só sete anos de boxe. No BJJ, sistema e técnica vencem o “talento”, então dá para começar em qualquer idade." },
        { q: "Preciso de base de trocação ou wrestling?", a: "Não. O BJJ é luta de chão: finalizações, estrangulamentos, controle posicional, raspagens. A técnica clássica de wrestling quase não é usada. Qualquer base esportiva ajuda, mas nenhuma é obrigatória." },
        { q: "Onde você treina e posso me juntar?", a: "Desde 2023 minha equipe principal fica na Suíça, com Thomas Oyarzun. Você pode participar por seminários e trabalho online: deixe seu e-mail no formulário abaixo — eu respondo pessoalmente." },
        { q: "O que tem na análise de lutas online?", a: "Você envia vídeos das suas lutas ou treinos, eu destrincho os erros com timestamps e passo tarefas concretas para o próximo ciclo. O plano Personal adiciona calls 1 a 1 e plano de campeonato." },
      ],
    },
    cta: { kicker: "Assinatura / 08", t1: "A caçada", t2: "continua", sub: "Uma vez por semana: análises de lutas, anúncios de campeonatos e datas de seminários. Sem enrolação — só o que te deixa mais perigoso.", ph: "Seu e-mail", btn: "Assinar", done: "Você está na lista. A primeira carta já está a caminho.", disc: "Sem spam. Cancele com 1 clique." },
    footer: {
      about: "Jiu-jitsu brasileiro. №1 do ranking AJP da América do Norte e №1 do mundo. Campeão nacional de seis países. Lausanne / São Petersburgo.",
      sections: "Seções", training: "Treinos", contact: "Contato",
      collab: "Parcerias — chama no DM", subscribe: "Assinatura",
      copyright: "© 2026 Vladimir Nagorianskii — The Baseball Bat. Todas as finalizações são voluntárias.",
      policy: "Política de privacidade",
    },
  },

  /* ============================== AR (UAE) ============================== */
  ar: {
    nav: { dossier: "الملف", stats: "الأرقام", path: "المسيرة", media: "الوسائط", voices: "آراء", contact: "تواصل", faq: "الأسئلة", join: "راسلني" },
    contact: { kicker: "تواصل / 06", t1: "راسلني", t2: "مباشرة", sub: "ندوات، إعداد شخصي، تعاون أو صحافة — راسلني مباشرة. أقرأ كل رسالة وأرد بنفسي.", namePh: "اسمك", emailPh: "بريدك الإلكتروني", msgPh: "رسالتك — بخصوص ماذا؟", btn: "إرسال الرسالة", sending: "جارٍ الإرسال…", done: "تم إرسال الرسالة. سأرد عليك بنفسي.", disc: "أرد بنفسي. بلا روبوتات." },
    hero: {
      badge: "تصنيف AJP: الأول في أمريكا الشمالية · الأول عالمياً",
      name1: "فلاديمير", name2: "ناغوريانسكي",
      typed: ["THE BASEBALL BAT", "بطل 6 دول", "الأول في أمريكا الشمالية · AJP", "50+ إنهاء بـ BASEBALL CHOKE"],
      sub: "جوجيتسو برازيلي. بطل وطني لست دول، والأول في تصنيف AJP لأمريكا الشمالية والأول عالمياً. أكثر من 50 خصماً أُنهوا بالحركة نفسها — خنقة البيسبول. ومن هنا جاء اللقب.",
      btnFights: "شاهد النزالات", btnStory: "قصتي",
      views: "+983,000 مشاهدة للملف خلال 30 يوماً", record: "الفيديو الأشهر — 1.8 مليون مشاهدة", rankChip: "تصنيف AJP · مباشر",
    },
    countdown: { label: "بطولة العالم AJP · أبوظبي", date: "29 مايو 2026", days: "يوم", hours: "ساعة", mins: "دقيقة", secs: "ثانية" },
    marquee: "جغرافيا الانتصارات · 2022—2026",
    dossier: {
      kicker: "الملف / 01", t1: "لماذا يلقبونني", t2: "بمضرب البيسبول",
      sub: "ليست دعاية — بل إحصاءات. كل بند أدناه موثّق بمحاضر البطولات وتسجيلات النزالات.",
      more: "المزيد",
      cards: [
        { title: "خنقة البيسبول — السلاح المميز", text: "نحو 90% من انتصاراتي المبكرة تأتي من الحركة نفسها. أكثر من 50 خصماً فقدوا الوعي في خنقتي — من البطولات الإقليمية إلى الجراند سلام الدولية. فريقي السويسري أطلق اللقب، وبقي." },
        { title: "بطل ست دول", text: "ألقاب وطنية في روسيا وإسبانيا وسويسرا وقطر ولاتفيا وألمانيا — بالإضافة إلى الأول في تصنيف AJP لأمريكا الشمالية والأول عالمياً." },
        { title: "الأساس: 7 سنوات ملاكمة", text: "المسافة والتوقيت وبرودة الأعصاب تحت الضغط من الملاكمة. على الأرض يبدو ذلك كالغش." },
        { title: "المدرسة السويسرية", text: "منذ 2023 أتدرب في لوزان مع توماس أويارزون — أسطورة حقيقية لهذه الرياضة. الفريق أعاد برمجة عقليتي الرياضية." },
        { title: "آلة إعلامية", text: "1.8 مليون مشاهدة للفيديو الأشهر ونصف مليون حساب يتم الوصول إليه شهرياً تقريباً. نزالات يعيد الناس مشاهدتها." },
        { title: "سيكولوجيا اللارحمة", text: "في 2022 خسرت كل نزالاتي في بطولة العالم ACBJJ وفقدت الوعي في نزال البرونزية. اقترح مدربي السابق علناً «نقلي إلى فئة النساء». أحمل تلك الكلمات معي إلى كل بساط. تلاميذه لم يعودوا يهزمونني — وهو لم يعد يشاهد تلك النزالات." },
      ],
    },
    stats: [
      { label: "التصنيف العالمي AJP", trend: "والأول في أمريكا الشمالية" },
      { label: "إنهاءات بخنقة البيسبول", trend: "90% من الانتصارات مبكرة" },
      { label: "دول — بطل وطني", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "مشاهدات / 30 يوماً", trend: "الفيديو الأشهر — 1.8 مليون" },
    ],
    proofs: { kicker: "الأدلة / 02", t1: "المحاضر", t2: "لا تكذب", sub: "نتائج AJP و ACBJJ ولقطات شاشة حية للتصنيف — مباشرة من التطبيق الرسمي." },
    path: {
      kicker: "المسيرة / 03", t1: "من «انقلوه إلى فئة النساء»", t2: "إلى قمة العالم",
      sub: "ثلاث محطات حوّلت ملاكماً عادياً إلى أكثر المنهين فتكاً في الجولة.",
      steps: [
        { title: "الملاكمة. سبع سنوات", text: "لم أكن بارعاً في اللكمات: أفوز أحياناً وأخسر أحياناً. لكن كل إحماء مصارعة كان ينتهي بالسؤال نفسه من زملائي: «متأكد أنك لم تمارس المصارعة من قبل؟»" },
        { title: "تركيا، 15 عاماً", text: "صالة على الشاطئ، غريبٌ يؤدي تمارين مصارعة — وسمعت لأول مرة في حياتي عبارة «الجوجيتسو البرازيلي». وبعودتي إلى روسيا بدأت التدريب فوراً." },
        { title: "سويسرا، 2023", text: "صالة جديدة وفريق جديد والمدرب توماس أويارزون. أُعيد بناء عقليتي الرياضية من الصفر: لا رحمة زائد تقنية. النتيجة — ألقاب في ست دول وقمة تصنيف AJP." },
      ],
    },
    media: { kicker: "الوسائط / 04", t1: "لقطات حقيقية.", t2: "بلا إخراج", sub: "صور البطولات والإنهاءات والنزالات الكاملة — كلها مصوّرة مباشرة على البساط.", photos: "صور", videos: "نزالات", playing: "يعرض الآن" },
    voices: {
      kicker: "آراء / 05", t1: "ماذا يقولون", t2: "عن المضرب",
      sub: "المدرب والفريق ومن يشاهدون نزالاتي من أفضل المقاعد.",
      items: [
        { name: "توماس أويارزون", role: "المدرب الرئيسي · حزام أسود BJJ", org: "لوزان، سويسرا", date: "مارس 2026", text: "في عشرين عاماً على البساط لم أرَ رياضياً يحوّل الغضب إلى دقة باردة كهذه. فلاديمير لا يقاتل خصمه — بل يحل مسألة. والحل دائماً واحد: خنقة البيسبول." },
      ],
    },
    pricing: {
      kicker: "التدريب / 06", t1: "تدرّب مع", t2: "الرقم 1",
      sub: "النظام نفسه الذي جلب ألقاب ست دول: تحليلات فيديو وإعداد شخصي وندوات متنقلة.",
      month: "شهري", year: "سنوي", save: "−20%", perMonth: "/شهر",
      monthNote: "دفع شهري", yearNote: "بالدفع السنوي · −20%", popular: "اختيار الرياضيين",
      tiers: [
        { name: "تحليل فيديو", desc: "تطوّر بين الحصص", priceM: "180 د.إ", priceY: "144 د.إ", cta: "ابدأ التحليل", feats: ["تحليلان لنزالاتك شهرياً", "تقرير مكتوب: الأخطاء والمهام", "دردشة تيليجرام خاصة بالفريق", "مكتبة الإنهاءات: +40 تفصيلة لخنقة البيسبول", "مكالمات فردية", "خطة إعداد للبطولة"], excluded: 2 },
        { name: "شخصي", desc: "إعداد تحت إشرافي المباشر", priceM: "550 د.إ", priceY: "440 د.إ", cta: "احجز مكانك", feats: ["كل ما في باقة «تحليل فيديو»", "4 جلسات أونلاين فردية شهرياً", "خطة بطولة فردية", "دراسة الخصوم", "تصحيح التقنية عبر الفيديو", "تواصل معي 24/7"], excluded: 0 },
        { name: "ندوة", desc: "معسكر متنقل لصالتك", custom: "من 3,300 د.إ", note: "لكل زيارة · حتى 40 مشاركاً", cta: "ناقش المواعيد", feats: ["معسكر يومين في صالتك", "نظام خنقة البيسبول من الألف إلى الياء", "الدفاع أولاً — ثم الهجوم", "سبارينغ مع ملاحظات فردية", "صور وفيديو لحسابات صالتك", "شهادات للمشاركين"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "الأسئلة / 07", t1: "الأسئلة الأكثر", t2: "تكراراً",
      items: [
        { q: "لماذا «مضرب البيسبول»؟", a: "اللقب من فريقي السويسري: نحو 90% من انتصاراتي المبكرة تأتي من الحركة نفسها — خنقة البيسبول. أنهيت بها أكثر من 50 خصماً. اللقب بقي — وأصبح اليوم علامة." },
        { q: "هل يمكن بدء الجوجيتسو من الصفر في سن متأخرة؟", a: "نعم. أنا بدأت في الخامسة عشرة دون يوم مصارعة واحد — فقط سبع سنوات ملاكمة. في الجوجيتسو، المنهج والتقنية يتغلبان على «الموهبة»، فابدأ في أي عمر." },
        { q: "هل أحتاج إلى أساس ضرب أو مصارعة؟", a: "لا. الجوجيتسو قتال أرضي: إخضاعات وخنق وتحكم بالمواقع وقلبات. تقنيات المصارعة الكلاسيكية تكاد لا تُستخدم هنا. أي خلفية رياضية تساعد لكنها ليست شرطاً." },
        { q: "أين تتدرب وهل يمكنني الانضمام؟", a: "منذ 2023 فريقي الأساسي في سويسرا بقيادة توماس أويارزون. يمكنك الانضمام عبر الندوات والعمل أونلاين: اترك بريدك في النموذج أدناه — أرد بنفسي." },
        { q: "ماذا يتضمن تحليل النزالات أونلاين؟", a: "ترسل تسجيلات نزالاتك أو تدريباتك، فأفكك الأخطاء بطوابع زمنية وأعطيك مهاماً محددة للدورة التالية. باقة «شخصي» تضيف مكالمات فردية وخطة بطولة." },
      ],
    },
    cta: { kicker: "الاشتراك / 08", t1: "المطاردة", t2: "مستمرة", sub: "مرة في الأسبوع: تحليلات نزالات وإعلانات بطولات ومواعيد ندوات. بلا حشو — فقط ما يجعلك أخطر.", ph: "بريدك الإلكتروني", btn: "اشترك", done: "أنت في القائمة. الرسالة الأولى في طريقها.", disc: "بلا رسائل مزعجة. إلغاء بنقرة واحدة." },
    footer: {
      about: "جوجيتسو برازيلي. الأول في تصنيف AJP لأمريكا الشمالية والأول عالمياً. بطل وطني لست دول. لوزان / سانت بطرسبرغ.",
      sections: "الأقسام", training: "التدريب", contact: "تواصل",
      collab: "للتعاون — راسلنا مباشرة", subscribe: "الاشتراك",
      copyright: "© 2026 فلاديمير ناغوريانسكي — The Baseball Bat. كل الإخضاعات طوعية.",
      policy: "سياسة الخصوصية",
    },
  },

  /* ============================== JA ============================== */
  ja: {
    nav: { dossier: "プロフィール", stats: "数字", path: "歩み", media: "メディア", voices: "証言", contact: "連絡", faq: "FAQ", join: "連絡する" },
    contact: { kicker: "連絡 / 06", t1: "直接", t2: "ご連絡を", sub: "セミナー、パーソナル指導、コラボ、取材——直接ご連絡ください。すべてのメッセージに目を通し、私が直接返信します。", namePh: "お名前", emailPh: "メールアドレス", msgPh: "メッセージ — ご用件は？", btn: "送信する", sending: "送信中…", done: "送信しました。私から直接ご返信します。", disc: "私が直接返信します。ボットではありません。" },
    hero: {
      badge: "AJPランキング 北米1位・世界1位",
      name1: "ウラジーミル", name2: "ナゴリャンスキー",
      typed: ["THE BASEBALL BAT", "6カ国チャンピオン", "北米1位 · AJP", "BASEBALL CHOKE 50+"],
      sub: "ブラジリアン柔術。6カ国のナショナルチャンピオン、AJP北米ランキング1位・世界1位。50人以上の対戦相手を同じ技で仕留めてきた——ベースボールチョーク。ニックネームの由来である。",
      btnFights: "試合を見る", btnStory: "私のストーリー",
      views: "30日間でプロフィール閲覧 983,000+", record: "最高記録のリール — 180万再生", rankChip: "AJPランキング · ライブ",
    },
    countdown: { label: "AJP世界選手権 · アブダビ", date: "2026年5月29日", days: "日", hours: "時間", mins: "分", secs: "秒" },
    marquee: "勝利の地図 · 2022—2026",
    dossier: {
      kicker: "プロフィール / 01", t1: "なぜ私は", t2: "バットと呼ばれるのか",
      sub: "マーケティングではなく統計。以下の全項目は大会記録と試合映像で裏付けられている。",
      more: "詳しく",
      cards: [
        { title: "ベースボールチョーク — 代名詞の武器", text: "一本勝ちの約90%が同じ技。地方大会から国際グランドスラムまで、50人以上が私のベースボールチョークで落ちた。スイスのチームメイトが付けたあだ名が、そのまま定着した。" },
        { title: "6カ国のチャンピオン", text: "ロシア、スペイン、スイス、カタール、ラトビア、ドイツでのナショナルタイトル——さらにAJP北米ランキング1位・世界1位。" },
        { title: "土台はボクシング7年", text: "距離感、タイミング、プレッシャー下の冷静さは打撃から。寝技ではほぼチート。" },
        { title: "スイス仕込み", text: "2023年からローザンヌでトーマス・オヤルズン——この競技の生けるレジェンド——に師事。チームはアスリートとしての心理を作り替えた。" },
        { title: "メディアマシン", text: "最高記録のリールは180万再生、月間リーチは約50万アカウント。何度も見返される試合。" },
        { title: "非情の心理学", text: "2022年、ACBJJ世界選手権で全敗し、3位決定戦で絞め落とされた。元コーチは公然と「女子カテゴリーに回せ」と言った。その言葉を毎回マットに持ち込んでいる。彼の教え子はもう私に勝てない——彼はその試合を見もしない。" },
      ],
    },
    stats: [
      { label: "AJP世界ランキング", trend: "北米も1位" },
      { label: "ベースボールチョークでの一本", trend: "勝利の90%が一本勝ち" },
      { label: "カ国のナショナル王者", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "30日間の閲覧数", trend: "最高リール — 180万" },
    ],
    proofs: { kicker: "証拠 / 02", t1: "記録は", t2: "嘘をつかない", sub: "AJPとACBJJのリザルトとライブランキングのスクリーンショット——公式アプリから直接。" },
    path: {
      kicker: "歩み / 03", t1: "「女子カテゴリーに回せ」から", t2: "世界の頂点へ",
      sub: "平凡なボクサーをツアー屈指のフィニッシャーへ変えた3つの転機。",
      steps: [
        { title: "ボクシング、7年", text: "打撃では決して優秀ではなかった。勝ったり負けたり。だがレスリングのウォームアップの度に、チームメイトから同じ質問をされた。「本当にレスリング未経験か？」" },
        { title: "トルコ、15歳", text: "ビーチのジム、レスリングのドリルをする見知らぬ男——そして人生で初めて聞いた「ブラジリアン柔術」という言葉。ロシアに戻るとすぐに練習を始めた。" },
        { title: "スイス、2023", text: "新しいジム、新しいチーム、コーチのトーマス・オヤルズン。アスリート心理はゼロから書き換えられた。非情さと技術。結果——6カ国のタイトルとAJPランキングの頂点。" },
      ],
    },
    media: { kicker: "メディア / 04", t1: "リアルな映像。", t2: "演出なし", sub: "大会写真、フィニッシュ、フルマッチ——すべて畳の上でライブ撮影。", photos: "写真", videos: "試合", playing: "再生中" },
    voices: {
      kicker: "証言 / 05", t1: "バットについて", t2: "人々が語ること",
      sub: "コーチ、チーム、そして最高の席から試合を見る人々。",
      items: [
        { name: "トーマス・オヤルズン", role: "ヘッドコーチ · BJJ黒帯", org: "スイス・ローザンヌ", date: "2026年3月", text: "畳の上で20年、怒りをこれほど冷たい正確さに変える選手を見たことがない。ウラジーミルは相手と戦っているのではない——問題を解いている。そして答えはいつも同じ。ベースボールチョークだ。" },
      ],
    },
    pricing: {
      kicker: "トレーニング / 06", t1: "No.1と", t2: "トレーニングする",
      sub: "6カ国のタイトルをもたらした同じシステム：ビデオ分析、パーソナル指導、出張セミナー。",
      month: "月払い", year: "年払い", save: "−20%", perMonth: "/月",
      monthNote: "月額課金", yearNote: "年払い · −20%", popular: "アスリートの選択",
      tiers: [
        { name: "ビデオ分析", desc: "練習の合間に成長する", priceM: "¥7,900", priceY: "¥6,300", cta: "分析を始める", feats: ["月2回の試合ビデオ分析", "文書レポート：ミスと課題", "チーム限定Telegramチャット", "フィニッシュ集：ベースボールチョークの40+のディテール", "1対1の通話", "大会準備プラン"], excluded: 2 },
        { name: "パーソナル", desc: "私の管理下での準備", priceM: "¥23,900", priceY: "¥19,100", cta: "枠を確保", feats: ["「ビデオ分析」の全内容", "月4回のオンライン1対1セッション", "個別の大会プラン", "対戦相手の研究", "ビデオでの技術修正", "24時間365日の連絡", ], excluded: 0 },
        { name: "セミナー", desc: "あなたのジムへの出張キャンプ", custom: "¥150,000〜", note: "1回の訪問 · 最大40名", cta: "日程を相談", feats: ["ジムでの2日間キャンプ", "ベースボールチョークの体系をAからZまで", "まず防御 — 次に攻撃", "個別フィードバック付きスパーリング", "ジムのSNS用の写真と動画", "参加者への修了証"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "よくある", t2: "質問",
      items: [
        { q: "なぜ「ベースボールバット」？", a: "スイスのチームが名付けた。一本勝ちの約90%が同じ技——ベースボールチョーク。これで50人以上を仕留めた。名前は定着し、今ではブランドになった。" },
        { q: "大人からゼロでBJJを始められる？", a: "可能。私自身、レスリング経験ゼロの15歳で柔術を始めた——あったのは7年のボクシングだけ。BJJでは体系と技術が「才能」に勝つ。何歳からでも始められる。" },
        { q: "打撃やレスリングの土台は必要？", a: "不要。BJJは寝技の格闘技：関節技、絞め技、ポジションコントロール、スイープ。クラシックなレスリング技術はほぼ使わない。スポーツ経験は何でも役立つが、必須ではない。" },
        { q: "どこで練習している？参加できる？", a: "2023年からメインのチームはスイス、トーマス・オヤルズンの指導下にある。セミナーとオンライン指導で参加できる。下のフォームにメールを残してほしい——私が直接返信する。" },
        { q: "オンライン試合分析には何が含まれる？", a: "試合やスパーの動画を送ってもらい、タイムスタンプ付きでミスを分解し、次のサイクルへの具体的な課題を出す。パーソナルプランには1対1通話と大会準備プランが加わる。" },
      ],
    },
    cta: { kicker: "購読 / 08", t1: "狩りは", t2: "続く", sub: "週1回：試合分析、大会情報、セミナー日程。無駄話なし——あなたをより危険にするものだけ。", ph: "メールアドレス", btn: "購読する", done: "リストに登録された。最初のレターはもう飛んでいる。", disc: "スパムなし。ワンクリックで解除。" },
    footer: {
      about: "ブラジリアン柔術。AJP北米ランキング1位、世界1位。6カ国のナショナルチャンピオン。ローザンヌ / サンクトペテルブルク。",
      sections: "セクション", training: "トレーニング", contact: "連絡先",
      collab: "コラボはDMで", subscribe: "購読",
      copyright: "© 2026 ウラジーミル・ナゴリャンスキー — The Baseball Bat. すべてのサブミッションは自発的なものです。",
      policy: "プライバシーポリシー",
    },
  },

  /* ============================== DE ============================== */
  de: {
    nav: { dossier: "Dossier", stats: "Zahlen", path: "Weg", media: "Medien", voices: "Stimmen", contact: "Kontakt", faq: "FAQ", join: "Schreiben" },
    contact: { kicker: "Kontakt / 06", t1: "Schreib", t2: "direkt", sub: "Seminare, persönliches Coaching, Kooperationen oder Presse — schreib direkt. Ich lese jede Nachricht und antworte persönlich.", namePh: "Dein Name", emailPh: "Deine E-Mail", msgPh: "Deine Nachricht — worum geht’s?", btn: "Nachricht senden", sending: "Senden…", done: "Nachricht gesendet. Ich melde mich persönlich.", disc: "Ich antworte persönlich. Keine Bots." },
    hero: {
      badge: "AJP-Ranking: #1 Nordamerika · #1 weltweit",
      name1: "Vladimir", name2: "Nagorianskii",
      typed: ["THE BASEBALL BAT", "CHAMPION VON 6 LÄNDERN", "#1 NORDAMERIKA · AJP", "50+ BASEBALL CHOKE FINISHES"],
      sub: "Brasilianisches Jiu-Jitsu. Nationaler Champion von sechs Ländern, Nr. 1 des AJP-Rankings Nordamerika und Nr. 1 der Welt. Über 50 Gegner mit ein und demselben Griff beendet — dem Baseball Choke. Daher der Spitzname.",
      btnFights: "Kämpfe ansehen", btnStory: "Meine Geschichte",
      views: "983.000+ Profilaufrufe in 30 Tagen", record: "Rekord-Reel — 1,8 Mio. Views", rankChip: "AJP-Ranking · live",
    },
    countdown: { label: "AJP-Weltmeisterschaft · Abu Dhabi", date: "29. Mai 2026", days: "Tage", hours: "Std.", mins: "Min.", secs: "Sek." },
    marquee: "Geographie der Siege · 2022—2026",
    dossier: {
      kicker: "Dossier / 01", t1: "Warum man mich", t2: "den Baseballschläger nennt",
      sub: "Kein Marketing — Statistik. Jeder Punkt ist durch Turnierprotokolle und Kampfaufnahmen belegt.",
      more: "Mehr",
      cards: [
        { title: "Baseball Choke — die Signaturwaffe", text: "Rund 90 % meiner vorzeitigen Siege kommen durch ein und denselben Griff. Über 50 Gegner sind in meinem Baseball Choke eingeschlafen — von regionalen Turnieren bis zu internationalen Grand Slams. Mein Schweizer Team erfand den Spitznamen, und er blieb." },
        { title: "Champion von sechs Ländern", text: "Nationale Titel in Russland, Spanien, Schweiz, Katar, Lettland und Deutschland — plus Nr. 1 des AJP-Rankings Nordamerika und Nr. 1 der Welt." },
        { title: "Basis: 7 Jahre Boxen", text: "Distanz, Timing und ein kühler Kopf unter Druck kommen vom Striking. Am Boden fühlt sich das wie Cheaten an." },
        { title: "Schweizer Schule", text: "Seit 2023 trainiere ich in Lausanne bei Thomas Oyarzun — einer echten Legende des Sports. Das Team hat meine Athletenpsyche neu programmiert." },
        { title: "Medienmaschine", text: "1,8 Mio. Views auf dem Rekord-Reel und fast eine halbe Million erreichte Accounts pro Monat. Kämpfe, die man mehrfach anschaut." },
        { title: "Psychologie der Gnadenlosigkeit", text: "2022 verlor ich bei der ACBJJ-WM jeden Kampf und wurde im Bronze-Match bewusstlos gewürgt. Mein Ex-Trainer schlug öffentlich vor, „mich in die Frauenklasse zu stecken“. Diese Worte nehme ich auf jede Matte mit. Seine Schüler besiegen mich nicht mehr — er schaut sich diese Kämpfe nicht einmal an." },
      ],
    },
    stats: [
      { label: "AJP-Weltrangliste", trend: "auch #1 Nordamerika" },
      { label: "Baseball-Choke-Finishes", trend: "90 % der Siege — vorzeitig" },
      { label: "Länder — nationaler Champion", trend: "RU · ES · CH · QA · LV · DE" },
      { label: "Aufrufe / 30 Tage", trend: "Rekord-Reel — 1,8 Mio." },
    ],
    proofs: { kicker: "Belege / 02", t1: "Protokolle", t2: "lügen nicht", sub: "AJP- und ACBJJ-Ergebnislisten sowie Live-Ranking-Screenshots — direkt aus der offiziellen App." },
    path: {
      kicker: "Weg / 03", t1: "Von „steckt ihn in die Frauenklasse“", t2: "an die Weltspitze",
      sub: "Drei Punkte, die aus einem mittelmäßigen Boxer den produktivsten Finisher der Tour machten.",
      steps: [
        { title: "Boxen. Sieben Jahre", text: "Im Striking war ich nie überragend: mal gewann ich, mal verlor ich. Aber jedes Ringer-Warm-up endete mit derselben Frage der Teamkollegen: „Bist du sicher, dass du nie gerungen hast?“" },
        { title: "Türkei, 15 Jahre", text: "Ein Gym am Strand, ein Fremder mit Ringerübungen — und zum ersten Mal im Leben die Worte „brasilianisches Jiu-Jitsu“. Zurück in Russland begann ich sofort zu trainieren." },
        { title: "Schweiz, 2023", text: "Neues Gym, neues Team, Trainer Thomas Oyarzun. Die Athletenpsyche wurde von Grund auf neu aufgebaut: Gnadenlosigkeit plus Technik. Das Ergebnis — Titel in sechs Ländern und die Spitze des AJP-Rankings." },
      ],
    },
    media: { kicker: "Medien / 04", t1: "Echte Aufnahmen.", t2: "Nichts gestellt", sub: "Turnierfotos, Finishes und komplette Kämpfe — alles live auf der Matte gefilmt.", photos: "Fotos", videos: "Kämpfe", playing: "Läuft gerade" },
    voices: {
      kicker: "Stimmen / 05", t1: "Was man über", t2: "den Schläger sagt",
      sub: "Der Trainer, das Team und die Leute, die meine Kämpfe von den besten Plätzen sehen.",
      items: [
        { name: "Thomas Oyarzun", role: "Cheftrainer · BJJ-Schwarzgurt", org: "Lausanne, Schweiz", date: "März 2026", text: "In zwanzig Jahren auf der Matte habe ich keinen Athleten gesehen, der Wut in derart kalte Präzision verwandelt. Vladimir kämpft nicht gegen seinen Gegner — er löst eine Aufgabe. Und die Lösung ist immer dieselbe: der Baseball Choke." },
      ],
    },
    pricing: {
      kicker: "Training / 06", t1: "Trainiere mit", t2: "der Nr. 1",
      sub: "Dasselbe System, das Titel in sechs Ländern brachte: Videoanalysen, persönliche Vorbereitung und Reiseseminare.",
      month: "Monatlich", year: "Jährlich", save: "−20%", perMonth: "/Mon.",
      monthNote: "monatliche Zahlung", yearNote: "bei Jahreszahlung · −20%", popular: "Wahl der Athleten",
      tiers: [
        { name: "Videoanalyse", desc: "Wachse zwischen den Einheiten", priceM: "49 €", priceY: "39 €", cta: "Analyse starten", feats: ["2 Videoanalysen deiner Kämpfe pro Monat", "Schriftlicher Report: Fehler und Aufgaben", "Privater Telegram-Chat des Teams", "Finish-Bibliothek: 40+ Baseball-Choke-Details", "1:1-Calls", "Turniervorbereitungsplan"], excluded: 2 },
        { name: "Personal", desc: "Vorbereitung unter meiner Kontrolle", priceM: "149 €", priceY: "119 €", cta: "Platz sichern", feats: ["Alles aus „Videoanalyse“", "4 Online-1:1-Sessions pro Monat", "Individueller Turnierplan", "Gegneranalyse", "Technikkorrektur per Video", "24/7-Zugang zu mir"], excluded: 0 },
        { name: "Seminar", desc: "Reisecamp für dein Gym", custom: "ab 850 €", note: "pro Besuch · bis 40 Teilnehmer", cta: "Termine besprechen", feats: ["2-Tage-Camp in deinem Gym", "Das Baseball-Choke-System von A bis Z", "Erst Verteidigung — dann Angriff", "Sparring mit individuellem Feedback", "Foto & Video für die Kanäle des Gyms", "Zertifikate für Teilnehmer"], excluded: 0 },
      ],
    },
    faq: {
      kicker: "FAQ / 07", t1: "Die häufigsten", t2: "Fragen",
      items: [
        { q: "Warum „der Baseballschläger“?", a: "Den Spitznamen erfand mein Schweizer Team: Rund 90 % meiner vorzeitigen Siege kommen durch denselben Griff — den Baseball Choke. Über 50 Gegner habe ich damit beendet. Der Name blieb, jetzt ist er eine Marke." },
        { q: "Kann ich als Erwachsener bei null mit BJJ anfangen?", a: "Ja. Ich kam mit 15 zum Jiu-Jitsu, ohne einen einzigen Tag Ringen — nur mit sieben Jahren Boxen. Im BJJ schlagen System und Technik das „Talent“, also kann man in jedem Alter anfangen." },
        { q: "Brauche ich eine Striking- oder Ringer-Basis?", a: "Nein. BJJ ist Bodenkampf: Hebel, Würgegriffe, Positionskontrolle, Sweeps. Klassische Ringertechnik wird hier kaum genutzt. Jeder sportliche Hintergrund hilft, keiner ist Pflicht." },
        { q: "Wo trainierst du und kann ich mitmachen?", a: "Seit 2023 ist mein Hauptteam in der Schweiz, unter Thomas Oyarzun. Einstieg über Seminare und Online-Arbeit: Hinterlasse deine E-Mail im Formular unten — ich antworte persönlich." },
        { q: "Was steckt in der Online-Kampfanalyse?", a: "Du schickst Videos deiner Kämpfe oder Sparrings, ich zerlege die Fehler mit Zeitstempeln und gebe konkrete Aufgaben für den nächsten Zyklus. Der Personal-Plan ergänzt 1:1-Calls und einen Turnierplan." },
      ],
    },
    cta: { kicker: "Abo / 08", t1: "Die Jagd", t2: "geht weiter", sub: "Einmal pro Woche: Kampfanalysen, Turnierankündigungen und Seminartermine. Kein Geschwafel — nur das, was dich gefährlicher macht.", ph: "Deine E-Mail", btn: "Abonnieren", done: "Du bist auf der Liste. Der erste Brief ist unterwegs.", disc: "Kein Spam. Abmeldung mit 1 Klick." },
    footer: {
      about: "Brasilianisches Jiu-Jitsu. Nr. 1 des AJP-Rankings Nordamerika und Nr. 1 der Welt. Nationaler Champion von sechs Ländern. Lausanne / St. Petersburg.",
      sections: "Bereiche", training: "Training", contact: "Kontakt",
      collab: "Kooperationen — per DM", subscribe: "Abo",
      copyright: "© 2026 Vladimir Nagorianskii — The Baseball Bat. Alle Hebel sind freiwillig.",
      policy: "Datenschutz",
    },
  },
};

/* deep merge: en → lang → overrides */
export function deepMerge(base, ...layers) {
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const layer of layers) {
    if (!layer) continue;
    for (const k of Object.keys(layer)) {
      const v = layer[k];
      if (v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])) {
        out[k] = deepMerge(out[k], v);
      } else if (v !== undefined && v !== "") {
        out[k] = v;
      }
    }
  }
  return out;
}

export function getStrings(lang, overrides) {
  return deepMerge(STRINGS.en, STRINGS[lang] || {}, overrides || {});
}
