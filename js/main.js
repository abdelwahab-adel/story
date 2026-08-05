/* =========================================================================
   النوبة · أسوان — data + interactions
   No backend, no localStorage (keeps the page fully portable + artifact-safe).
   All state lives in memory for the duration of the visit.
   ========================================================================= */

(() => {
  "use strict";

  const IMG = "assets/images/";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =======================================================================
     DATA — Nubian dictionary (Fadicca / Kenzi), transcribed from the source
     content document. Numbers use a single traditional form for both.
     ======================================================================= */
  const DICTIONARY = {
    categories: [
      { key: "phrases",  label: "عبارات أساسية" },
      { key: "basics",   label: "أساسيات" },
      { key: "verbs",    label: "أفعال" },
      { key: "family",   label: "العائلة" },
      { key: "body",     label: "أجزاء الجسم" },
      { key: "house",    label: "البيت والطعام" },
      { key: "qualities",label: "صفات" },
      { key: "numbers",  label: "الأرقام" },
    ],
    words: [
      // عبارات أساسية
      { cat:"phrases", ar:"تحية", fadicca:"كوريج أنجا ناليه", kenzi:"كوريج أنجا ناليه" },
      { cat:"phrases", ar:"شكرًا", fadicca:"سُكِران", kenzi:"سُكِران" },
      { cat:"phrases", ar:"الحب", fadicca:"مِري", kenzi:"مِري" },
      { cat:"phrases", ar:"البيت", fadicca:"نُو", kenzi:"نُو" },
      { cat:"phrases", ar:"الماء", fadicca:"أسي", kenzi:"أسي" },
      // أساسيات
      { cat:"basics", ar:"أنا", fadicca:"آي (Ai)", kenzi:"آي (Ai)" },
      { cat:"basics", ar:"أنتَ / أنتِ", fadicca:"إير (Er)", kenzi:"إير (Er)" },
      { cat:"basics", ar:"نعم", fadicca:"إيو (Eio)", kenzi:"إيو (Eio)" },
      { cat:"basics", ar:"لا", fadicca:"ماني (Mani)", kenzi:"ماني (Mani)" },
      { cat:"basics", ar:"لا يوجد / بلاش", fadicca:"مارس (Mars)", kenzi:"مارس (Mars)" },
      { cat:"basics", ar:"لسه", fadicca:"الجونة (El-gouna)", kenzi:"الجونة (El-gouna)" },
      { cat:"basics", ar:"كفاية", fadicca:"بركة (Baraka)", kenzi:"بركة (Baraka)" },
      { cat:"basics", ar:"من؟", fadicca:"ناي (Nai)", kenzi:"ناي (Nai)" },
      { cat:"basics", ar:"ماذا؟", fadicca:"ناينا (Naina)", kenzi:"نارا (Nara)" },
      { cat:"basics", ar:"أين؟", fadicca:"مِنقاي (Mingai)", kenzi:"مِنا (Mena)" },
      { cat:"basics", ar:"متى؟", fadicca:"مِنقاي (Mingai)", kenzi:"مِنا (Mena)" },
      { cat:"basics", ar:"الآن", fadicca:"سِيك (Seek)", kenzi:"إينقا (Inga)" },
      { cat:"basics", ar:"اليوم", fadicca:"إن (In)", kenzi:"إن (In)" },
      { cat:"basics", ar:"بكرة", fadicca:"سلون (Slon)", kenzi:"سلون (Slon)" },
      { cat:"basics", ar:"أمس", fadicca:"أوور (Owor)", kenzi:"أوور (Owor)" },
      // أفعال
      { cat:"verbs", ar:"تعال", fadicca:"كار (Kar)", kenzi:"كار (Kar)" },
      { cat:"verbs", ar:"اذهب / امشِ", fadicca:"جو (Go)", kenzi:"جو (Go)" },
      { cat:"verbs", ar:"كُل", fadicca:"كب (Kab)", kenzi:"كب (Kab)" },
      { cat:"verbs", ar:"اشرب", fadicca:"ني (Ni)", kenzi:"سِوي (Siwi)" },
      { cat:"verbs", ar:"نَم", fadicca:"نير (Neer)", kenzi:"نير (Neer)" },
      { cat:"verbs", ar:"اجلس", fadicca:"تي (Ti)", kenzi:"تي (Ti)" },
      { cat:"verbs", ar:"اسمع", fadicca:"كيري (Kiri)", kenzi:"كيري (Kiri)" },
      { cat:"verbs", ar:"انظر", fadicca:"قِج (Gij)", kenzi:"نَل (Nal)" },
      { cat:"verbs", ar:"تكلم", fadicca:"بانتشي (Bantchi)", kenzi:"وِي (Wai)" },
      { cat:"verbs", ar:"هات / أعطِ", fadicca:"تير (Ter)", kenzi:"تير (Ter)" },
      { cat:"verbs", ar:"خذ", fadicca:"دام (Dam)", kenzi:"دام (Dam)" },
      { cat:"verbs", ar:"ادخل", fadicca:"تير (Teer)", kenzi:"تير (Teer)" },
      { cat:"verbs", ar:"اخرج", fadicca:"بال (Bal)", kenzi:"بِن (Bin)" },
      { cat:"verbs", ar:"اغسل", fadicca:"سوي (Sowi)", kenzi:"سوي (Sowi)" },
      { cat:"verbs", ar:"العب", fadicca:"هَب (Hab)", kenzi:"هَب (Hab)" },
      { cat:"verbs", ar:"اعمل / اشتغل", fadicca:"وير (Wair)", kenzi:"وير (Wair)" },
      { cat:"verbs", ar:"اضحك", fadicca:"جول (Gol)", kenzi:"جول (Gol)" },
      { cat:"verbs", ar:"اعرف", fadicca:"إيري (Eree)", kenzi:"إيري (Eree)" },
      // العائلة
      { cat:"family", ar:"أمي", fadicca:"أنان (Anan)", kenzi:"إندي (Inde)" },
      { cat:"family", ar:"أبي", fadicca:"أبو (Abboo)", kenzi:"أمباب (Ambab)" },
      { cat:"family", ar:"أخي", fadicca:"نيسي (Nesi)", kenzi:"أمباني (Ambani)" },
      { cat:"family", ar:"أختي", fadicca:"إيجسي (Egsi)", kenzi:"إنيسي (Inesi)" },
      { cat:"family", ar:"ولد / ابن", fadicca:"تود (Tod)", kenzi:"تود (Tod)" },
      { cat:"family", ar:"بنت / ابنة", fadicca:"برو (Bro)", kenzi:"برو (Bro)" },
      { cat:"family", ar:"طفل", fadicca:"نوتشي (Notchi)", kenzi:"كِني (Keni)" },
      { cat:"family", ar:"رجل", fadicca:"أوغج (Ogj)", kenzi:"أوغج (Ogj)" },
      { cat:"family", ar:"امرأة", fadicca:"تين (Teen)", kenzi:"تين (Teen)" },
      { cat:"family", ar:"ضيف", fadicca:"إسكر (Isker)", kenzi:"إسكر (Isker)" },
      { cat:"family", ar:"صاحب / جار", fadicca:"سمل (Semil)", kenzi:"سمل (Semil)" },
      { cat:"family", ar:"إنسان", fadicca:"إيدم (Edim)", kenzi:"إيدم (Edim)" },
      // أجزاء الجسم
      { cat:"body", ar:"رأس", fadicca:"أور (Oor)", kenzi:"أور (Oor)" },
      { cat:"body", ar:"عين", fadicca:"ميسي (Messi)", kenzi:"ميسي (Messi)" },
      { cat:"body", ar:"أذن", fadicca:"أولوغ (Olog)", kenzi:"أولوغ (Olog)" },
      { cat:"body", ar:"فم", fadicca:"أغل (Agil)", kenzi:"آجيل (Agil)" },
      { cat:"body", ar:"يد", fadicca:"إي (Ee)", kenzi:"إي (Ee)" },
      { cat:"body", ar:"رجل (قدم)", fadicca:"أوس (Oos)", kenzi:"أوس (Oos)" },
      { cat:"body", ar:"قلب", fadicca:"أور (Oor)", kenzi:"أور (Oor)" },
      { cat:"body", ar:"بطن", fadicca:"تو (Too)", kenzi:"تو (Too)" },
      { cat:"body", ar:"شعر", fadicca:"سير (Seer)", kenzi:"سير (Seer)" },
      { cat:"body", ar:"لسان", fadicca:"نت (Net)", kenzi:"نيد (Ned)" },
      // البيت والطعام
      { cat:"house", ar:"بيت", fadicca:"نو (Noo)", kenzi:"نو (Noo)" },
      { cat:"house", ar:"باب", fadicca:"كولو (Kolo)", kenzi:"كولو (Kolo)" },
      { cat:"house", ar:"ماء", fadicca:"أسي (Asi)", kenzi:"إيس (Ees)" },
      { cat:"house", ar:"لبن", fadicca:"كول (Kool)", kenzi:"جيله (Gila)" },
      { cat:"house", ar:"شاي", fadicca:"إتشي (Itchi)", kenzi:"إتشي (Itchi)" },
      { cat:"house", ar:"خبز", fadicca:"كاب (Kab)", kenzi:"كاب (Kab)" },
      { cat:"house", ar:"تمر", fadicca:"بيل (Beel)", kenzi:"بيل (Beel)" },
      { cat:"house", ar:"نخلة", fadicca:"فيت (Fet)", kenzi:"فيت (Fet)" },
      { cat:"house", ar:"نار", fadicca:"إيج (Iig)", kenzi:"إيج (Iig)" },
      { cat:"house", ar:"ملح", fadicca:"كوج (Koog)", kenzi:"كوج (Koog)" },
      { cat:"house", ar:"لحم", fadicca:"كوس (Koos)", kenzi:"كوس (Koos)" },
      { cat:"house", ar:"سمك", fadicca:"كاري (Kare)", kenzi:"كاري (Kare)" },
      { cat:"house", ar:"فلوس / ذهب", fadicca:"نوب (Nob)", kenzi:"نوب (Nob)" },
      // صفات
      { cat:"qualities", ar:"جميل", fadicca:"أشري (Ashree)", kenzi:"كيتا (Keta)" },
      { cat:"qualities", ar:"سيء / وحش", fadicca:"ديبا (Deba)", kenzi:"ساوما (Sawma)" },
      { cat:"qualities", ar:"كبير", fadicca:"دو (Do)", kenzi:"جاو (Gaw)" },
      { cat:"qualities", ar:"صغير", fadicca:"كودا (Koda)", kenzi:"كِني (Keni)" },
      { cat:"qualities", ar:"كثير", fadicca:"دِك (Dik)", kenzi:"مِلُ (Milo)" },
      { cat:"qualities", ar:"طويل", fadicca:"جيس (Gees)", kenzi:"جيس (Gees)" },
      { cat:"qualities", ar:"قصير", fadicca:"مور (Mor)", kenzi:"مور (Mor)" },
      { cat:"qualities", ar:"أبيض", fadicca:"أرو (Aro)", kenzi:"أرو (Aro)" },
      { cat:"qualities", ar:"أسود", fadicca:"أوروم (Orom)", kenzi:"أوروم (Orom)" },
      { cat:"qualities", ar:"أحمر", fadicca:"جيله (Gila)", kenzi:"جيله (Gila)" },
      { cat:"qualities", ar:"بارد", fadicca:"أورو (Oro)", kenzi:"أورو (Oro)" },
      { cat:"qualities", ar:"سريع", fadicca:"توري (Tori)", kenzi:"توري (Tori)" },
      // الأرقام
      { cat:"numbers", ar:"١ (واحد)", fadicca:"وير", kenzi:"وير" },
      { cat:"numbers", ar:"٢ (اثنين)", fadicca:"أوو", kenzi:"أوو" },
      { cat:"numbers", ar:"٣ (ثلاثة)", fadicca:"توسكي", kenzi:"توسكي" },
      { cat:"numbers", ar:"٤ (أربعة)", fadicca:"كميس", kenzi:"كميس" },
      { cat:"numbers", ar:"٥ (خمسة)", fadicca:"ديجي", kenzi:"ديجي" },
      { cat:"numbers", ar:"٦ (ستة)", fadicca:"قورنج", kenzi:"قورنج" },
      { cat:"numbers", ar:"٧ (سبعة)", fadicca:"كولود", kenzi:"كولود" },
      { cat:"numbers", ar:"٨ (ثمانية)", fadicca:"إديو", kenzi:"إديو" },
      { cat:"numbers", ar:"٩ (تسعة)", fadicca:"إسكود", kenzi:"إسكود" },
      { cat:"numbers", ar:"١٠ (عشرة)", fadicca:"ديمين", kenzi:"ديمين" },
    ],
  };

  /* =======================================================================
     DATA — Gallery (every file from /assets, tagged + captioned)
     ======================================================================= */
  const GALLERY = [
    { base:"hero-nile-feluccas", tag:"nile", label:"الطبيعة والنيل", alt:"مراكب شراعية على النيل في أسوان" },
    { base:"nile-terrace-building", tag:"nile", label:"الطبيعة والنيل", alt:"مبنى نوبي على ضفاف النيل" },
    { base:"hero-village-camels", tag:"villages", label:"القرى النوبية", alt:"جمال أمام بيت نوبي ملون في أسوان" },
    { base:"village-west-suhail", tag:"villages", label:"القرى النوبية", alt:"قرية غرب سهيل النوبية الشهيرة بألوانها" },
    { base:"clothes-women-headscarves", tag:"people", label:"الناس", alt:"سيدتان نوبيتان يرتديان الأزياء التقليدية الملونة" },
    { base:"history-ancient-nubians-painting", tag:"history", label:"آثار وتاريخ", alt:"لوحة أثرية تصوّر مشهدًا من حضارة النوبة القديمة" },
    { base:"history-ancient-papyrus-art", tag:"history", label:"آثار وتاريخ", alt:"فن مصري قديم يصوّر ملامح من الحضارة النوبية" },
    { base:"history-archer-figurines", tag:"history", label:"آثار وتاريخ", alt:"نماذج خشبية أثرية لجنود نوبيين حاملي الأقواس" },
    { base:"museum-ramses-statue", tag:"history", label:"آثار وتاريخ", alt:"تمثال حجري لرمسيس الثاني في متحف النوبة" },
    { base:"music-band-daf", tag:"music", label:"الموسيقى والرقص", alt:"فرقة موسيقية نوبية تؤدي بالدفوف" },
    { base:"music-nile-musicians", tag:"music", label:"الموسيقى والرقص", alt:"عازفان نوبيان يعزفان بجوار النيل" },
    { base:"architecture-house-facade", tag:"architecture", label:"العمارة", alt:"واجهة بيت نوبي مزينة برسوم هندسية" },
    { base:"architecture-desert-house", tag:"architecture", label:"العمارة", alt:"منزل نوبي بالطراز الصحراوي التقليدي" },
    { base:"architecture-guesthouse-terrace", tag:"architecture", label:"العمارة", alt:"تراس بيت ضيافة نوبي يطل على النيل" },
    { base:"architecture-guesthouse-archway", tag:"architecture", label:"العمارة", alt:"بوابة مقنطرة تطل على النيل في قرية نوبية" },
    { base:"architecture-water-jars", tag:"architecture", label:"العمارة", alt:"قلل فخارية تقليدية لتبريد الماء في حائط البيت" },
    { base:"architecture-decorated-stairs", tag:"architecture", label:"العمارة", alt:"درجات سلم مزخرفة أمام مدخل بيت نوبي" },
    { base:"handicrafts-market-street", tag:"crafts", label:"الحرف اليدوية", alt:"شارع وسوق نوبي للحرف والهدايا" },
    { base:"handicrafts-souvenir-stall", tag:"crafts", label:"الحرف اليدوية", alt:"كشك تذكارات نوبي بالدفوف والمنحوتات الخشبية" },
    { base:"handicrafts-baskets-product", tag:"crafts", label:"الحرف اليدوية", alt:"سلال وحقائب منسوجة يدويًا بألوان زاهية" },
    { base:"handicrafts-basket-product", tag:"crafts", label:"الحرف اليدوية", alt:"سلة مصنوعة يدويًا من الخوص الملوّن" },
    { base:"handicrafts-hanging-pottery", tag:"crafts", label:"الحرف اليدوية", alt:"أوعية فخارية معلّقة بزخارف نسيجية" },
    { base:"handicrafts-basket-weaving-hands", tag:"crafts", label:"الحرف اليدوية", alt:"سيدة نوبية تصنع سلة من سعف النخيل" },
    { base:"tourism-abu-simbel-performers", tag:"culture", label:"لحظات ثقافية", alt:"فرقة نوبية بالزي التقليدي أمام معبد أبو سمبل" },
    { base:"museum-clothing-diorama", tag:"culture", label:"لحظات ثقافية", alt:"مجسم متحفي يوثّق الزي النوبي التقليدي" },
    { base:"language-learning-chart", tag:"culture", label:"لحظات ثقافية", alt:"لوحة تعليمية لعبارات باللغة النوبية" },
    { base:"culture-majlis-diorama", tag:"culture", label:"لحظات ثقافية", alt:"مجسم متحفي لمجلس نوبي تقليدي" },
    { base:"culture-majlis-gathering", tag:"culture", label:"لحظات ثقافية", alt:"تجمع أهالي في مجلس نوبي" },
    { base:"culture-cafe-mural", tag:"culture", label:"لحظات ثقافية", alt:"جدارية فنية على واجهة مقهى نوبي" },
    { base:"wedding-art-wall", tag:"culture", label:"لحظات ثقافية", alt:"جدارية فنية تحكي تقاليد الزفاف النوبي" },
    { base:"wedding-procession-real", tag:"culture", label:"لحظات ثقافية", alt:"موكب زفة نوبية في إحدى القرى" },
    { base:"legend-crocodile-real", tag:"culture", label:"لحظات ثقافية", alt:"تمساح النيل الذي تدور حوله إحدى حكايات النوبة" },
    { base:"daily-life-village-painting", tag:"culture", label:"لحظات ثقافية", alt:"لوحة فنية تصوّر مشهدًا من الحياة النوبية" },
  ];
  const GALLERY_FILTERS = [
    { key:"all", label:"الكل" },
    { key:"nile", label:"الطبيعة والنيل" },
    { key:"villages", label:"القرى" },
    { key:"people", label:"الناس" },
    { key:"music", label:"الموسيقى" },
    { key:"architecture", label:"العمارة" },
    { key:"crafts", label:"الحرف" },
    { key:"history", label:"آثار وتاريخ" },
    { key:"culture", label:"لحظات ثقافية" },
  ];

  /* =======================================================================
     DATA — Quiz (from the source document, verbatim questions/answers)
     ======================================================================= */
  const QUIZ = [
    { q:"ماذا تعني كلمة «نوب» في اللغة المصرية القديمة؟", options:["الماء","الذهب","الشمس"], correct:1 },
    { q:"ما الاسم الذي أطلقه النوبيون على أرضهم ويعني «أرض القوس»؟", options:["كوش","تا-سيتي","ميدجاي"], correct:1 },
    { q:"من هو الملك النوبي الذي وحّد وادي النيل وحكم مصر؟", options:["بعنخي","رمسيس الثاني","إخناتون"], correct:0 },
    { q:"ما الآلة الموسيقية التي تعتبر «روح» الموسيقى النوبية؟", options:["العود","الطنبور (الكيسر)","الناي"], correct:1 },
    { q:"ماذا يرمز «المثلث» في الزخارف النوبية؟", options:["النيل","الأهرامات أو الحماية","النخيل"], correct:1 },
  ];

  /* =======================================================================
     Utilities
     ======================================================================= */
  const $  = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);

  /* =======================================================================
     Loader
     ======================================================================= */
  window.addEventListener("load", () => {
    const loader = $("#loader");
    if (!loader) return;
    setTimeout(() => loader.classList.add("hide"), 550);
  });
  // Safety: never trap the user behind the loader
  setTimeout(() => { const l = $("#loader"); if (l) l.classList.add("hide"); }, 3200);

  /* =======================================================================
     Reading progress + nav scroll state + back-to-top
     ======================================================================= */
  const progressBar = $("#reading-progress");
  const nav = $("#site-nav");
  const backToTop = $("#back-to-top");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? scrollTop / docH : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${pct})`;
    if (nav) nav.classList.toggle("scrolled", scrollTop > 60);
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 900);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  on(backToTop, "click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));

  /* =======================================================================
     Mobile drawer
     ======================================================================= */
  const menuBtn = $("#btn-menu");
  const drawer = $("#mobile-drawer");
  on(menuBtn, "click", () => drawer.classList.toggle("open"));
  $$(".mobile-drawer a").forEach(a => on(a, "click", () => drawer.classList.remove("open")));

  /* =======================================================================
     Theme toggle (in-memory only — safe for artifact previews & portable use)
     ======================================================================= */
  let theme = "light";
  const themeBtn = $("#btn-theme");
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
  }
  on(themeBtn, "click", () => {
    theme = theme === "light" ? "dark" : "light";
    applyTheme();
  });
  applyTheme();

  /* =======================================================================
     Language toggle (AR default / EN chrome layer)
     Structure is translation-ready: any element with data-en gets swapped.
     ======================================================================= */
  let lang = "ar";
  const langButtons = $$(".lang-switch button");
  function applyLang() {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    langButtons.forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    $$("[data-en]").forEach(el => {
      if (lang === "en") {
        if (!el.dataset.arOriginal) el.dataset.arOriginal = el.innerHTML;
        el.innerHTML = el.dataset.en;
      } else if (el.dataset.arOriginal) {
        el.innerHTML = el.dataset.arOriginal;
      }
    });
    const notice = $("#en-notice");
    if (notice) notice.style.display = lang === "en" ? "flex" : "none";
    $$(".counter-num[data-count]").forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (el.textContent !== "0") el.textContent = target.toLocaleString(lang === "en" ? "en-US" : "ar-EG");
    });
  }
  langButtons.forEach(b => on(b, "click", () => { lang = b.dataset.lang; applyLang(); }));
  applyLang();

  /* =======================================================================
     Scroll reveal (IntersectionObserver)
     ======================================================================= */
  const revealItems = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.03, rootMargin: "0px 0px -4% 0px" });
    revealItems.forEach((el, i) => { el.style.setProperty("--i", i % 8); io.observe(el); });
    // Safety net: never let content stay stuck invisible (slow JS, odd viewport
    // resizes, edge-case browsers). Anything still hidden after a beat just shows.
    setTimeout(() => {
      revealItems.forEach(el => el.classList.add("is-visible"));
    }, 2500);
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  // Pattern dividers draw themselves in
  const dividers = $$(".pattern-divider");
  if ("IntersectionObserver" in window) {
    const dio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); dio.unobserve(e.target); } });
    }, { threshold: 0.1 });
    dividers.forEach(d => dio.observe(d));
    setTimeout(() => { dividers.forEach(d => d.classList.add("is-visible")); }, 2500);
  } else {
    dividers.forEach(d => d.classList.add("is-visible"));
  }

  /* =======================================================================
     Active nav link highlighting
     ======================================================================= */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-links a, .mobile-drawer a");
  if ("IntersectionObserver" in window && sections.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => navIo.observe(s));
  }

  /* =======================================================================
     Animated counters
     ======================================================================= */
  const counters = $$(".counter-num");
  function localeFor() { return lang === "en" ? "en-US" : "ar-EG"; }
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString(localeFor());
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString(localeFor());
    }
    if (prefersReducedMotion) { el.textContent = target.toLocaleString(localeFor()); return; }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* =======================================================================
     Hero parallax + crossfade + mouse glow
     ======================================================================= */
  const heroImgs = $$(".hero-media img");
  if (heroImgs.length && !prefersReducedMotion) {
    let ticking = false;
    document.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroImgs.forEach(img => { img.style.transform = `scale(1.12) translateY(${y * 0.18}px)`; });
        }
        ticking = false;
      });
    }, { passive: true });
  }
  // crossfade between two hero images for cinematic ambiance
  if (heroImgs.length > 1) {
    let idx = 0;
    setInterval(() => {
      heroImgs[idx].classList.remove("show");
      idx = (idx + 1) % heroImgs.length;
      heroImgs[idx].classList.add("show");
    }, 6000);
  }

  const glow = $("#cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches && !prefersReducedMotion) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    on(window, "pointermove", (e) => { gx = e.clientX; gy = e.clientY; });
    function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* =======================================================================
     Generic pill tabs  [data-tabs="group"] buttons + [data-panel="group:key"]
     ======================================================================= */
  $$("[data-tabs]").forEach(group => {
    const name = group.dataset.tabs;
    const buttons = $$("button", group);
    const panels = $$(`[data-panel^="${name}:"]`);
    buttons.forEach(btn => on(btn, "click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.dataset.tab;
      panels.forEach(p => p.classList.toggle("active", p.dataset.panel === `${name}:${key}`));
    }));
  });

  /* =======================================================================
     Dictionary
     ======================================================================= */
  const dictGrid = $("#dict-grid");
  const dictCats = $("#dict-categories");
  const dictSearch = $("#dict-search-input");
  const dictCount = $("#dict-count");
  const favorites = new Set();
  let activeCat = "all";

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* no-op: speech synthesis unsupported */ }
  }

  function renderDictCategories() {
    if (!dictCats) return;
    const counts = { all: DICTIONARY.words.length };
    DICTIONARY.categories.forEach(c => counts[c.key] = DICTIONARY.words.filter(w => w.cat === c.key).length);
    const allBtn = `<button data-cat="all" class="${activeCat==='all'?'active':''}">الكل <span class="count">${counts.all}</span></button>`;
    const rest = DICTIONARY.categories.map(c =>
      `<button data-cat="${c.key}" class="${activeCat===c.key?'active':''}">${c.label} <span class="count">${counts[c.key]}</span></button>`
    ).join("");
    dictCats.innerHTML = allBtn + rest;
    $$("button", dictCats).forEach(b => on(b, "click", () => { activeCat = b.dataset.cat; renderDictCategories(); renderDictGrid(); }));
  }

  function renderDictGrid() {
    if (!dictGrid) return;
    const q = (dictSearch && dictSearch.value.trim().toLowerCase()) || "";
    const list = DICTIONARY.words.filter(w => {
      const matchesCat = activeCat === "all" || w.cat === activeCat;
      const hay = `${w.ar} ${w.fadicca} ${w.kenzi}`.toLowerCase();
      const matchesQ = !q || hay.includes(q);
      return matchesCat && matchesQ;
    });
    if (dictCount) dictCount.textContent = `${list.length.toLocaleString("ar-EG")} كلمة`;
    if (!list.length) {
      dictGrid.innerHTML = `<div class="dict-empty">لا توجد نتائج مطابقة لبحثك — جرّب كلمة أخرى.</div>`;
      return;
    }
    dictGrid.innerHTML = list.map((w, i) => {
      const catLabel = (DICTIONARY.categories.find(c => c.key === w.cat) || {}).label || "";
      const favKey = `${w.cat}-${i}-${w.ar}`;
      const isFav = favorites.has(favKey);
      return `
      <div class="flashcard" data-fav-key="${favKey}">
        <div class="flashcard-inner">
          <div class="fc-face front">
            <span class="fc-cat">${catLabel}</span>
            <span class="fc-ar">${w.ar}</span>
            <div class="fc-bottom">
              <button class="fc-fav ${isFav?'active':''}" aria-label="إضافة للمفضلة" data-action="fav">
                <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.7-10-9.3C.5 8.4 2.3 5 6 5c2.1 0 3.6 1.1 4.5 2.4C11.4 6.1 12.9 5 15 5c3.7 0 5.5 3.4 4 6.7-2.5 4.6-10 9.3-10 9.3z"/></svg>
              </button>
              <span style="font-size:.72rem;color:var(--text-soft);">اقلب البطاقة</span>
            </div>
          </div>
          <div class="fc-face back">
            <span class="fc-cat">${catLabel}</span>
            <div class="fc-dialects">
              <div><b>الفاديجا:</b> ${w.fadicca}</div>
              <div style="margin-top:6px;"><b>الكنزية:</b> ${w.kenzi}</div>
            </div>
            <div class="fc-bottom">
              <button class="fc-play" data-action="play" aria-label="استماع تقريبي" title="استماع تقريبي (تركيب صوتي آلي وليس نطقًا نوبيًا موثّقًا)">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <span style="font-size:.7rem;color:var(--text-soft);">نطق تقريبي</span>
            </div>
          </div>
        </div>
      </div>`;
    }).join("");

    $$(".flashcard", dictGrid).forEach(card => {
      on(card, "click", (e) => {
        if (e.target.closest("[data-action]")) return;
        card.classList.toggle("flipped");
      });
      const favBtn = $("[data-action='fav']", card);
      on(favBtn, "click", (e) => {
        e.stopPropagation();
        const key = card.dataset.favKey;
        if (favorites.has(key)) { favorites.delete(key); favBtn.classList.remove("active"); favBtn.querySelector("svg").setAttribute("fill","none"); }
        else { favorites.add(key); favBtn.classList.add("active"); favBtn.querySelector("svg").setAttribute("fill","currentColor"); }
      });
      const playBtn = $("[data-action='play']", card);
      on(playBtn, "click", (e) => {
        e.stopPropagation();
        const ar = card.querySelector(".fc-ar")?.textContent || "";
        speak(ar);
      });
    });
  }

  on(dictSearch, "input", renderDictGrid);
  renderDictCategories();
  renderDictGrid();

  // Word of the day — deterministic by day-of-year, no server needed
  const wordOfDayEl = $("#word-of-day-content");
  if (wordOfDayEl) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000);
    const w = DICTIONARY.words[dayOfYear % DICTIONARY.words.length];
    wordOfDayEl.innerHTML = `<div class="wd-word">${w.ar}</div><div class="wd-mean">الفاديجا: ${w.fadicca} · الكنزية: ${w.kenzi}</div>`;
  }

  /* =======================================================================
     Dictionary mini-game (guess the correct Nubian equivalent)
     ======================================================================= */
  const gameArea = $("#dict-game");
  const gameStartBtn = $("#dict-game-start");
  let gameRound = 0, gameScore = 0, gameRounds = [];

  function shuffled(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  function startGame() {
    gameRound = 0; gameScore = 0;
    gameRounds = shuffled(DICTIONARY.words.filter(w => w.cat !== "numbers")).slice(0, 5);
    renderGameRound();
  }
  function renderGameRound() {
    if (!gameArea) return;
    if (gameRound >= gameRounds.length) {
      gameArea.innerHTML = `
        <div class="game-result">أحسنت! نتيجتك ${gameScore} من ${gameRounds.length} 🌟</div>
        <div class="btn-row" style="justify-content:center;margin-top:20px;">
          <button class="btn btn-primary" id="dict-game-restart">إعادة اللعب</button>
        </div>`;
      on($("#dict-game-restart"), "click", startGame);
      return;
    }
    const current = gameRounds[gameRound];
    const distractors = shuffled(DICTIONARY.words.filter(w => w.ar !== current.ar)).slice(0, 3).map(w => w.fadicca);
    const options = shuffled([current.fadicca, ...distractors]);
    gameArea.innerHTML = `
      <div class="game-progress">${gameRounds.map((_, i) => `<span class="${i < gameRound ? 'done' : ''}"></span>`).join("")}</div>
      <div class="game-word">${current.ar}</div>
      <div class="game-hint">ما مقابل هذه الكلمة باللهجة الفاديجا؟</div>
      <div class="game-options">${options.map(o => `<button data-val="${o}">${o}</button>`).join("")}</div>
    `;
    $$(".game-options button", gameArea).forEach(btn => on(btn, "click", () => {
      const correct = btn.dataset.val === current.fadicca;
      $$(".game-options button", gameArea).forEach(b => {
        b.disabled = true;
        if (b.dataset.val === current.fadicca) b.classList.add("correct");
        else if (b === btn) b.classList.add("wrong");
      });
      if (correct) gameScore++;
      setTimeout(() => { gameRound++; renderGameRound(); }, 900);
    }));
  }
  on(gameStartBtn, "click", () => { gameArea.style.display = "block"; gameStartBtn.parentElement.style.display = "none"; startGame(); });

  /* =======================================================================
     Gallery masonry + filters + lightbox
     ======================================================================= */
  const galleryGrid = $("#gallery-grid");
  const galleryFilters = $("#gallery-filters");
  let galleryActive = "all";

  function renderGalleryFilters() {
    if (!galleryFilters) return;
    galleryFilters.innerHTML = GALLERY_FILTERS.map(f =>
      `<button class="${galleryActive===f.key?'active':''}" data-filter="${f.key}">${f.label}</button>`
    ).join("");
    $$("button", galleryFilters).forEach(b => on(b, "click", () => {
      galleryActive = b.dataset.filter;
      renderGalleryFilters();
      applyGalleryFilter();
    }));
  }
  function applyGalleryFilter() {
    $$(".masonry-item", galleryGrid).forEach(item => {
      const show = galleryActive === "all" || item.dataset.tag === galleryActive;
      item.classList.toggle("hidden", !show);
    });
  }
  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = GALLERY.map((g, i) => `
      <div class="masonry-item" data-tag="${g.tag}" data-index="${i}">
        <picture>
          <source srcset="${IMG}${g.base}-thumb.webp" type="image/webp">
          <img src="${IMG}${g.base}-thumb.jpg" alt="${g.alt}" loading="lazy" width="480" height="360">
        </picture>
        <div class="m-overlay">${g.alt}</div>
      </div>`).join("");
    $$(".masonry-item", galleryGrid).forEach(item => on(item, "click", () => openLightbox(parseInt(item.dataset.index, 10))));
  }

  // Lightbox
  const lightbox = $("#lightbox");
  const lbImg = $("#lightbox-img");
  const lbCaption = $("#lightbox-caption");
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function updateLightbox() {
    const g = GALLERY[lbIndex];
    lbImg.src = `${IMG}${g.base}.jpg`;
    lbImg.alt = g.alt;
    lbCaption.textContent = `${g.alt} — ${g.label}`;
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  on($("#lightbox-close"), "click", closeLightbox);
  on(lightbox, "click", (e) => { if (e.target === lightbox) closeLightbox(); });
  on($("#lightbox-prev"), "click", () => { lbIndex = (lbIndex - 1 + GALLERY.length) % GALLERY.length; updateLightbox(); });
  on($("#lightbox-next"), "click", () => { lbIndex = (lbIndex + 1) % GALLERY.length; updateLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % GALLERY.length; updateLightbox(); }
    if (e.key === "ArrowLeft") { lbIndex = (lbIndex - 1 + GALLERY.length) % GALLERY.length; updateLightbox(); }
  });

  renderGalleryFilters();
  renderGallery();

  /* =======================================================================
     Tourism: attraction list <-> map
     ======================================================================= */
  const mapFrame = $("#tourism-map");
  $$(".attraction-item").forEach(item => on(item, "click", () => {
    $$(".attraction-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    const q = item.dataset.mapQuery;
    if (mapFrame && q) mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  }));

  /* =======================================================================
     Testimonials slider
     ======================================================================= */
  const testiSlides = $$(".testi-slide");
  const testiDotsWrap = $("#testi-dots");
  let testiIndex = 0;
  function renderTestiDots() {
    if (!testiDotsWrap) return;
    testiDotsWrap.innerHTML = testiSlides.map((_, i) => `<button class="${i===testiIndex?'active':''}" data-i="${i}"></button>`).join("");
    $$("button", testiDotsWrap).forEach(b => on(b, "click", () => { testiIndex = parseInt(b.dataset.i, 10); updateTesti(); }));
  }
  function updateTesti() {
    const track = $("#testi-track");
    if (track) track.style.transform = `translateX(${document.documentElement.dir === "rtl" ? "" : "-"}${testiIndex * 100}%)`;
    if (track && document.documentElement.dir === "rtl") track.style.transform = `translateX(${testiIndex * 100}%)`;
    renderTestiDots();
  }
  on($("#testi-prev"), "click", () => { testiIndex = (testiIndex - 1 + testiSlides.length) % testiSlides.length; updateTesti(); });
  on($("#testi-next"), "click", () => { testiIndex = (testiIndex + 1) % testiSlides.length; updateTesti(); });
  if (testiSlides.length) {
    renderTestiDots();
    if (!prefersReducedMotion) {
      let testiTimer = setInterval(() => { testiIndex = (testiIndex + 1) % testiSlides.length; updateTesti(); }, 6500);
      const testiSection = $("#testimonials");
      on(testiSection, "mouseenter", () => clearInterval(testiTimer));
      on(testiSection, "mouseleave", () => { testiTimer = setInterval(() => { testiIndex = (testiIndex + 1) % testiSlides.length; updateTesti(); }, 6500); });
    }
  }

  /* =======================================================================
     FAQ accordion
     ======================================================================= */
  $$(".faq-item").forEach(item => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    on(q, "click", () => {
      const isOpen = item.classList.contains("open");
      $$(".faq-item").forEach(i => { i.classList.remove("open"); $(".faq-a", i).style.maxHeight = null; });
      if (!isOpen) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* =======================================================================
     Quiz
     ======================================================================= */
  const quizStart = $("#quiz-start");
  const quizPlay = $("#quiz-play");
  const quizFinal = $("#quiz-final");
  let quizIndex = 0, quizScore = 0;

  function renderQuiz() {
    const q = QUIZ[quizIndex];
    $("#quiz-progress-label").textContent = `سؤال ${quizIndex + 1} من ${QUIZ.length}`;
    $("#quiz-question").textContent = q.q;
    $("#quiz-options").innerHTML = q.options.map((opt, i) => `<button data-i="${i}">${opt}</button>`).join("");
    $$("#quiz-options button").forEach(btn => on(btn, "click", () => {
      const i = parseInt(btn.dataset.i, 10);
      $$("#quiz-options button").forEach(b => {
        b.disabled = true;
        if (parseInt(b.dataset.i, 10) === q.correct) b.classList.add("correct");
        else if (b === btn) b.classList.add("wrong");
      });
      if (i === q.correct) quizScore++;
      setTimeout(() => {
        quizIndex++;
        if (quizIndex < QUIZ.length) renderQuiz();
        else showQuizFinal();
      }, 1000);
    }));
  }
  function showQuizFinal() {
    quizPlay.style.display = "none";
    quizFinal.style.display = "block";
    $("#quiz-score-num").textContent = `${quizScore}/${QUIZ.length}`;
    let msg = "بداية جميلة في رحلة التعرف على النوبة!";
    if (quizScore === QUIZ.length) msg = "مبهر! أنت خبير في تراث النوبة 🏆";
    else if (quizScore >= QUIZ.length - 1) msg = "رائع! معرفتك بالنوبة عميقة جدًا.";
    $("#quiz-final-msg").textContent = msg;
  }
  on($("#quiz-start-btn"), "click", () => {
    quizIndex = 0; quizScore = 0;
    quizStart.style.display = "none";
    quizFinal.style.display = "none";
    quizPlay.style.display = "block";
    renderQuiz();
  });
  on($("#quiz-restart-btn"), "click", () => {
    quizIndex = 0; quizScore = 0;
    quizFinal.style.display = "none";
    quizPlay.style.display = "block";
    renderQuiz();
  });

  /* =======================================================================
     Newsletter (front-end only demo, no backend)
     ======================================================================= */
  const newsletterForm = $("#newsletter-form");
  on(newsletterForm, "submit", (e) => {
    e.preventDefault();
    const input = $("input", newsletterForm);
    const note = $("#newsletter-note");
    if (input && input.value.trim()) {
      note.textContent = "شكرًا لانضمامك — سنراسلك بجديد حكايات النوبة.";
      input.value = "";
    } else if (note) {
      note.textContent = "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
    }
  });

  /* =======================================================================
     Current year in footer
     ======================================================================= */
  const yearEl = $("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
