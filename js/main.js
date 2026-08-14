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
      { cat:"phrases", ar:"تحية (مرحباً)", fadicca:"مسكاقنا / سليمو", kenzi:"مسكاقرو / سليمو" },
      { cat:"phrases", ar:"شكرًا", fadicca:"أورا / أورونج", kenzi:"أورا / أورون" },
      { cat:"phrases", ar:"الحب", fadicca:"دولّي", kenzi:"دولّي" },
      { cat:"phrases", ar:"البيت", fadicca:"كا", kenzi:"كا" },
      { cat:"phrases", ar:"الماء", fadicca:"أمان (Aman)", kenzi:"أسي (Essi)" },
      // أساسيات
      { cat:"basics", ar:"أنا", fadicca:"أي (Ay)", kenzi:"أي (Ay)" },
      { cat:"basics", ar:"أنتَ / أنتِ", fadicca:"إير (Ir)", kenzi:"إير (Ir)" },
      { cat:"basics", ar:"نعم", fadicca:"أي / أيو", kenzi:"أيو" },
      { cat:"basics", ar:"لا", fadicca:"ملا (Mala) / مالانق", kenzi:"أون (Oun) / مالا" },
      { cat:"basics", ar:"لا يوجد / بلاش", fadicca:"ملا / مانقا", kenzi:"مونا / سيكام" },
      { cat:"basics", ar:"لسه", fadicca:"جيل", kenzi:"جيل" },
      { cat:"basics", ar:"كفاية", fadicca:"يكّي / كورك", kenzi:"يكّي" },
      { cat:"basics", ar:"من؟", fadicca:"ني (Nee)", kenzi:"ني (Nee)" },
      { cat:"basics", ar:"ماذا؟", fadicca:"مين (Min)", kenzi:"مين (Min)" },
      { cat:"basics", ar:"أين؟", fadicca:"مينتو", kenzi:"مينتو / سيكّي" },
      { cat:"basics", ar:"متى؟", fadicca:"هومين", kenzi:"شومين" },
      { cat:"basics", ar:"الآن", fadicca:"إشكولا / آكا", kenzi:"إشكولا" },
      { cat:"basics", ar:"اليوم", fadicca:"إينال / إيتو", kenzi:"إيتو (Eeto)" },
      { cat:"basics", ar:"بكرة", fadicca:"بيا (Beya)", kenzi:"بيا (Beya)" },
      { cat:"basics", ar:"أمس", fadicca:"صو", kenzi:"صو / سو" },
      // أفعال
      { cat:"verbs", ar:"تعال", fadicca:"كير (Kiir)", kenzi:"كير (Kiir)" },
      { cat:"verbs", ar:"اذهب / امشِ", fadicca:"موق (Mog)", kenzi:"موق (Mog)" },
      { cat:"verbs", ar:"كُل", fadicca:"كالي (Kalli)", kenzi:"كالي (Kalli)" },
      { cat:"verbs", ar:"اشرب", fadicca:"ني (Ni)", kenzi:"ناي (Nai)" },
      { cat:"verbs", ar:"نَم", fadicca:"جير / نيير", kenzi:"جير / نيير" },
      { cat:"verbs", ar:"اجلس", fadicca:"تقو / آك", kenzi:"أوقو" },
      { cat:"verbs", ar:"اسمع", fadicca:"مسك / أوكي", kenzi:"أوكي (Ukki)" },
      { cat:"verbs", ar:"انظر", fadicca:"نال (Nal)", kenzi:"نال (Nal)" },
      { cat:"verbs", ar:"تكلم", fadicca:"ويقي", kenzi:"ويقير" },
      { cat:"verbs", ar:"هات / أعطِ", fadicca:"دين / تِي", kenzi:"تِي / دين" },
      { cat:"verbs", ar:"خذ", fadicca:"طاو (Taw)", kenzi:"طاو (Taw)" },
      { cat:"verbs", ar:"ادخل", fadicca:"جين (Jeen)", kenzi:"جين (Jeen)" },
      { cat:"verbs", ar:"اخرج", fadicca:"بال / وسكيل", kenzi:"وسكيل" },
      { cat:"verbs", ar:"اغسل", fadicca:"جوك / شوك", kenzi:"شوك" },
      { cat:"verbs", ar:"العب", fadicca:"أور (Our)", kenzi:"أور (Our)" },
      { cat:"verbs", ar:"اعمل / اشتغل", fadicca:"صو / أوج", kenzi:"أوج" },
      { cat:"verbs", ar:"اضحك", fadicca:"جيل (Jeel)", kenzi:"جيل (Jeel)" },
      { cat:"verbs", ar:"اعرف", fadicca:"كيب / ارسك", kenzi:"كيب / ارسك" },
      // العائلة
      { cat:"family", ar:"أمي", fadicca:"إنَّا (Enna)", kenzi:"إنَّا (Enna)" },
      { cat:"family", ar:"أبي", fadicca:"أپَّا / آبا", kenzi:"أپَّا / آبا" },
      { cat:"family", ar:"أخي", fadicca:"فاي (Fayi)", kenzi:"أَمْبا (Amba)" },
      { cat:"family", ar:"أختي", fadicca:"داوس", kenzi:"داوس" },
      { cat:"family", ar:"ولد / ابن", fadicca:"تود (Tod)", kenzi:"تود (Tod)" },
      { cat:"family", ar:"بنت / ابنة", fadicca:"بور (Bour)", kenzi:"بور (Bour)" },
      { cat:"family", ar:"طفل", fadicca:"كورا / تود", kenzi:"بورو" },
      { cat:"family", ar:"رجل", fadicca:"أوقج (Ougij)", kenzi:"أوقج (Ougij)" },
      { cat:"family", ar:"امرأة", fadicca:"إدين / إدنا", kenzi:"إدين" },
      { cat:"family", ar:"ضيف", fadicca:"إشكي", kenzi:"إشكي" },
      { cat:"family", ar:"صاحب / جار", fadicca:"كورسي / أورسي", kenzi:"أورسي" },
      { cat:"family", ar:"إنسان", fadicca:"إد (Id)", kenzi:"إد (Id)" },
      // أجزاء الجسم
      { cat:"body", ar:"رأس", fadicca:"أور (Ur)", kenzi:"أور (Ur)" },
      { cat:"body", ar:"عين", fadicca:"ميس (Miss)", kenzi:"كال (Kal)" },
      { cat:"body", ar:"أذن", fadicca:"أوي (Uyi)", kenzi:"أوي (Uyi)" },
      { cat:"body", ar:"فم", fadicca:"أوق (Oug)", kenzi:"أوق (Oug)" },
      { cat:"body", ar:"يد", fadicca:"إيد (Eed)", kenzi:"إيد (Eed)" },
      { cat:"body", ar:"رجل (قدم)", fadicca:"أوس (Ous)", kenzi:"أوس (Ous)" },
      { cat:"body", ar:"قلب", fadicca:"آي (Aay)", kenzi:"آي (Aay)" },
      { cat:"body", ar:"بطن", fadicca:"تو (Too)", kenzi:"تو (Too)" },
      { cat:"body", ar:"شعر", fadicca:"ديل / صوم", kenzi:"صوم" },
      { cat:"body", ar:"لسان", fadicca:"نال / نيد", kenzi:"نيد (Need)" },
      // البيت والطعام
      { cat:"house", ar:"بيت", fadicca:"كا (Ka)", kenzi:"كا (Ka)" },
      { cat:"house", ar:"باب", fadicca:"كورو (Kourou)", kenzi:"كورو (Kourou)" },
      { cat:"house", ar:"ماء", fadicca:"أمان (Aman)", kenzi:"أسي (Essi)" },
      { cat:"house", ar:"لبن", fadicca:"إرتي (Erti)", kenzi:"إرتي (Erti)" },
      { cat:"house", ar:"شاي", fadicca:"شاي", kenzi:"شاي" },
      { cat:"house", ar:"خبز", fadicca:"كابِدة / شادي", kenzi:"كابِدة / شادي" },
      { cat:"house", ar:"تمر", fadicca:"فينتي (Finti)", kenzi:"فينتي (Finti)" },
      { cat:"house", ar:"نخلة", fadicca:"فينتي كُو", kenzi:"فينتي كور" },
      { cat:"house", ar:"نار", fadicca:"إق (Iq)", kenzi:"إق (Iq)" },
      { cat:"house", ar:"ملح", fadicca:"أجر (Ajir)", kenzi:"أجر (Ajir)" },
      { cat:"house", ar:"لحم", fadicca:"كوس (Koos)", kenzi:"كوس (Koos)" },
      { cat:"house", ar:"سمك", fadicca:"أمان كاري", kenzi:"أسي كاري" },
      { cat:"house", ar:"فلوس / ذهب", fadicca:"أوري (فلوس) / نوب (ذهب)", kenzi:"أوري (فلوس)" },
      // صفات
      { cat:"qualities", ar:"جميل", fadicca:"مسقاني / مشكا", kenzi:"مشكا (Mishka)" },
      { cat:"qualities", ar:"سيء / وحش", fadicca:"ملان (Malan)", kenzi:"ملان (Malan)" },
      { cat:"qualities", ar:"كبير", fadicca:"دُو (Dou)", kenzi:"أورا / داو" },
      { cat:"qualities", ar:"صغير", fadicca:"كينو (Keeno) / كورا", kenzi:"كين (Keen)" },
      { cat:"qualities", ar:"كثير", fadicca:"ماني / جيك", kenzi:"كادي" },
      { cat:"qualities", ar:"طويل", fadicca:"فور (Four)", kenzi:"فور (Four)" },
      { cat:"qualities", ar:"قصير", fadicca:"كور (Kour)", kenzi:"كور (Kour)" },
      { cat:"qualities", ar:"أبيض", fadicca:"أرو (Aroo)", kenzi:"أرو (Aroo)" },
      { cat:"qualities", ar:"أسود", fadicca:"أُدّي (Uddi)", kenzi:"أُدّي (Uddi)" },
      { cat:"qualities", ar:"أحمر", fadicca:"جيل (Jeel)", kenzi:"جيل (Jeel)" },
      { cat:"qualities", ar:"بارد", fadicca:"أوقوج (Ougouj)", kenzi:"أوقوج (Ougouj)" },
      { cat:"qualities", ar:"سريع", fadicca:"بيرا (Beera)", kenzi:"بيرا (Beera)" },
      // الأرقام
      { cat:"numbers", ar:"١ (واحد)", fadicca:"وِير (Weer)", kenzi:"وِير (Weer)" },
      { cat:"numbers", ar:"٢ (اثنين)", fadicca:"أُوو (Oww)", kenzi:"أُوو (Oww)" },
      { cat:"numbers", ar:"٣ (ثلاثة)", fadicca:"طوسكو (Tosko)", kenzi:"طوسكو (Tosko)" },
      { cat:"numbers", ar:"٤ (أربعة)", fadicca:"كِمسو (Kemsou)", kenzi:"كِمسو (Kemsou)" },
      { cat:"numbers", ar:"٥ (خمسة)", fadicca:"دِجو (Dijjou)", kenzi:"دِجو (Dijjou)" },
      { cat:"numbers", ar:"٦ (ستة)", fadicca:"قورو (Gorou)", kenzi:"قورو (Gorou)" },
      { cat:"numbers", ar:"٧ (سبعة)", fadicca:"كولود (Kolod)", kenzi:"كولود (Kolod)" },
      { cat:"numbers", ar:"٨ (ثمانية)", fadicca:"إدِوو (Iddiww)", kenzi:"إدِوو (Iddiww)" },
      { cat:"numbers", ar:"٩ (تسعة)", fadicca:"إسكود (Iskod)", kenzi:"إسكود (Iskod)" },
      { cat:"numbers", ar:"١٠ (عشرة)", fadicca:"ديمِر (Dimir)", kenzi:"ديمِر (Dimir)" },
    ],
  };

  /* =======================================================================
     DATA — Gallery (every file from /assets, tagged + captioned)
     ======================================================================= */
  const GALLERY = [
    { base:"nile-terrace-building", tag:"architecture", label:"العمارة", alt:"مبنى نوبي على ضفاف النيل" },
    { base:"village-west-suhail", tag:"architecture", label:"العمارة", alt:"قرية غرب سهيل النوبية الشهيرة بألوانها" },
    { base:"architecture-house-facade", tag:"architecture", label:"العمارة", alt:"واجهة بيت نوبي مزينة برسوم هندسية" },
    { base:"architecture-desert-house", tag:"architecture", label:"العمارة", alt:"منزل نوبي بالطراز الصحراوي التقليدي" },
    { base:"architecture-guesthouse-terrace", tag:"architecture", label:"العمارة", alt:"تراس بيت ضيافة نوبي يطل على النيل" },
    { base:"architecture-guesthouse-archway", tag:"architecture", label:"العمارة", alt:"بوابة مقنطرة تطل على النيل في قرية نوبية" },
    { base:"architecture-water-jars", tag:"architecture", label:"العمارة", alt:"قلل فخارية تقليدية لتبريد الماء في حائط البيت" },
    { base:"architecture-decorated-stairs", tag:"architecture", label:"العمارة", alt:"درجات سلم مزخرفة أمام مدخل بيت نوبي" },
    { base:"clothes-women-headscarves", tag:"culture", label:"لحظات ثقافية", alt:"سيدتان نوبيتان يرتديان الأزياء التقليدية الملونة" },
    { base:"history-ancient-nubians-painting", tag:"history", label:"آثار وتاريخ", alt:"لوحة أثرية تصوّر مشهدًا من حضارة النوبة القديمة" },
    { base:"history-ancient-papyrus-art", tag:"history", label:"آثار وتاريخ", alt:"فن مصري قديم يصوّر ملامح من الحضارة النوبية" },
    { base:"history-archer-figurines", tag:"history", label:"آثار وتاريخ", alt:"نماذج خشبية أثرية لجنود نوبيين حاملي الأقواس" },
    { base:"museum-ramses-statue", tag:"history", label:"آثار وتاريخ", alt:"تمثال حجري لرمسيس الثاني في متحف النوبة" },
    { base:"music-band-daf", tag:"music", label:"الموسيقى والرقص", alt:"فرقة موسيقية نوبية تؤدي بالدفوف" },
    { base:"music-nile-musicians", tag:"music", label:"الموسيقى والرقص", alt:"عازفان نوبيان يعزفان بجوار النيل" },
    { base:"music-tanbur-instrument", tag:"music", label:"الموسيقى والرقص", alt:"التنبور هو الآلة الوترية المقدسة في الموسيقى النوبية، يصنع منها الفنان أغانيَ للفرح والحب والحنين، وتتوارثه الأجيال كما تتوارث الأرض والاسم." },
    { base:"music-tar-players", tag:"music", label:"الموسيقى والرقص", alt:"يتوارث النوبيون العزف على الدفوف والطبول جيلًا بعد جيل، في جلسات غير رسمية يعلّم فيها الكبار الصغار" },
    { base:"music-drum-generations", tag:"music", label:"الموسيقى والرقص", alt:"جيلان يعزفان الدفوف معًا في جلسة غير رسمية" },
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
    { key:"architecture", label:"العمارة" },
    { key:"music", label:"الموسيقى" },
    { key:"crafts", label:"الحرف" },
    { key:"history", label:"آثار وتاريخ" },
    { key:"culture", label:"لحظات ثقافية" },
  ];

  /* =======================================================================
     DATA — Nubian video archive (6-video interactive gallery, Music section)
     Local video files, NOT YouTube. Each video's file lives at assets/videos/
     — see assets/videos/README.txt for exact filenames expected.
     Poster images are auto-extracted from each video file (see build step).
     ======================================================================= */
const NUBIAN_VIDEOS = [
  {
    videoSrc: "assets/videos/video-1.mp4",
    poster: "assets/videos/video-1-poster.png",
    title: "النوبة – فخور أنا بحضارتي، النوبة فوق ❤️",
    artist: "خضر العطار",
    category: ["النوبة", "فن وحضارة", "أسوان", "خضر العطار"],
    description:
      "رحلة إلى عمق الهوية النوبية، نستحضر خلالها ملامح حضارة عريقة امتدت جذورها عبر آلاف السنين، ونكتشف إرثًا ثقافيًا أصيلًا ما زال حاضرًا في تفاصيل الحياة والفن واللغة والعادات. تعكس هذه الرحلة الفخر بتاريخ النوبة وثراء حضارتها، وتبرز جمال الفن النوبي بما يحمله من ألوان ورموز وتفاصيل تعبّر عن روح المكان وذاكرة الأجيال. ومن خلال هذا التراث، تتجلى العلاقة العميقة بين الإنسان النوبي وأرضه وتاريخه، حيث تتكامل الموسيقى واللغة والفنون والعادات والموروث الشعبي لتشكّل هوية متفردة حافظت على حضورها عبر العصور. إنها هوية نابضة بالحياة، تجمع بين أصالة الماضي وإبداع الحاضر، وتحمل قصة شعبٍ ما زال يروي تاريخه ويفتخر بجذوره من جيل إلى جيل.",
    hashtags: [
      "#النوبة",
      "#فخور_أنا",
      "#فخور_أنا_بحضارتي",
      "#النوبة_فوق",
      "#النوبة_فن_وحضارة",
      "#أسوان",
      "#خضر_العطار",
    ],
  },

  {
    videoSrc: "assets/videos/video-2.mp4",
    poster: "assets/videos/video-2-poster.png",
    title: "حسن جزولي – فرح نوبي في ستينيات القرن الماضي",
    artist: "حسن جزولي",
    category: ["تراث نوبي", "أفراح نوبية", "موسيقى نوبية قديمة"],
    description:
      "مشاهد نادرة من فرح نوبي في ستينيات القرن الماضي، توثّق جانبًا من الحياة الاجتماعية في النوبة خلال تلك الفترة، وتكشف أجواء الأفراح التي كانت تجمع الأهل والأحبة في مناسبات الزواج. وتظهر في هذه المشاهد ملامح من الموسيقى والغناء والرقص النوبي، إلى جانب العادات والتقاليد التي صاحبت الاحتفالات ومنحتها طابعًا خاصًا يعكس روح المجتمع النوبي وتماسكه. وتمثل هذه اللقطات ذاكرة بصرية ثمينة توثّق جانبًا من تفاصيل الحياة والملابس والتجمعات وطرق الاحتفال، وتحفظ ملامح مرحلة تاريخية وثقافية انتقلت ذكرياتها من جيل إلى جيل.",
    hashtags: [
      "#حسن_جزولي",
      "#النوبة",
      "#تراث_نوبي",
      "#فرح_نوبي",
      "#أفراح_نوبية",
      "#موسيقى_نوبية",
    ],
  },

  {
    videoSrc: "assets/videos/video-3.mp4",
    poster: "assets/videos/video-3-poster.png",
    title: "أحمد منيب ومحمد منير – لقاء من ذاكرة الفن النوبي",
    artist: "أحمد منيب ومحمد منير",
    category: ["أحمد منيب", "محمد منير", "موسيقى نوبية", "تراث نوبي"],
    description:
      "لحظة فنية مميزة تجمع اثنين من أبرز رموز الأغنية النوبية الحديثة، الفنان الراحل أحمد منيب والفنان محمد منير، في مشهد يستحضر جانبًا مهمًا من رحلة الفن النوبي وتأثيره في الموسيقى المصرية. ارتبط أحمد منيب بتقديم الموسيقى والألحان المستلهمة من التراث النوبي بروح فنية معاصرة، بينما واصل محمد منير هذه الرحلة بأعمال حملت الكثير من ملامح الثقافة النوبية إلى جمهور واسع داخل مصر وخارجها. وتبقى هذه اللحظات جزءًا من ذاكرة الفن، لأنها تختصر رحلة التقاء التراث بالتجديد، وتحافظ على حضور الموسيقى النوبية كأحد روافد المشهد الثقافي والموسيقي المصري.",
    hashtags: [
      "#أحمد_منيب",
      "#محمد_منير",
      "#النوبة",
      "#موسيقى_نوبية",
      "#تراث_نوبي",
      "#فن_نوبي",
    ],
  },

  {
    videoSrc: "assets/videos/video-4.mp4",
    poster: "assets/videos/video-4-poster.jpg",
    title: "حسن الصغير وبيبو آدم – فرح نوبي في القاهرة",
    artist: "حسن الصغير وبيبو آدم",
    category: ["أفراح نوبية", "حسن الصغير", "بيبو آدم", "موسيقى نوبية"],
    description:
      "أجواء احتفالية من فرح نوبي في القاهرة، تجمع أبناء النوبة حول الغناء والموسيقى والاحتفال في مشهد نابض بالحياة. وتكشف هذه المناسبة كيف تظل الموسيقى النوبية حاضرة في تفاصيل الأفراح، فتجمع الأهل والأصدقاء حول الأغاني والإيقاعات والرقصات التي تحمل ملامح التراث وروح المجتمع. كما تعكس هذه المشاهد استمرار العادات الاجتماعية والفنية النوبية خارج موطنها الأصلي، وتحول المناسبات إلى مساحة للحفاظ على الذاكرة الثقافية وتعزيز التواصل بين الأجيال.",
    hashtags: [
      "#حسن_الصغير",
      "#بيبو_آدم",
      "#فرح_نوبي",
      "#النوبة",
      "#القاهرة",
      "#أفراح_نوبية",
      "#موسيقى_نوبية",
    ],
  },

  {
    videoSrc: "assets/videos/video-5.mp4",
    poster: "assets/videos/video-5-poster.png",
    title: "هشام باطه – أجواء حنّة نوبية من توشكي غرب",
    artist: "هشام باطه",
    category: ["توشكي غرب", "حنة نوبية", "هشام باطه", "تراث نوبي"],
    description:
      "أجواء حنّة نوبية أصيلة من توشكي غرب، في مشهد يحتفي بواحدة من أبرز المناسبات الاجتماعية في الثقافة النوبية. تمتزج الموسيقى والغناء والرقص مع طقوس الاحتفال، لتصنع أجواءً مليئة بالفرح والبهجة، وتكشف جانبًا من العادات والتقاليد التي حافظ عليها المجتمع النوبي وحرص على تناقلها عبر الأجيال. وتجتمع العائلة والأصدقاء في هذه المناسبة لمشاركة العروس فرحتها، وسط الأغاني النوبية والإيقاعات الشعبية، لتصبح الحنّة أكثر من مجرد احتفال؛ فهي مساحة للتعبير عن الانتماء والهوية واستمرار التراث في الحياة اليومية.",
    hashtags: [
      "#هشام_باطه",
      "#توشكي_غرب",
      "#حنة_نوبية",
      "#النوبة",
      "#تراث_نوبي",
      "#أفراح_نوبية",
    ],
  },

  {
    videoSrc: "assets/videos/video-6.mp4",
    poster: "assets/videos/video-6-poster.png",
    title: "محمود فوزي – فرح نوبي في السعودية",
    artist: "محمود فوزي",
    category: ["محمود فوزي", "فرح نوبي", "السعودية", "موسيقى نوبية"],
    description:
      "أجواء من فرح نوبي في المملكة العربية السعودية، تجمع أبناء النوبة حول الموسيقى والغناء والاحتفال، في مشهد يعكس حضور الثقافة النوبية خارج موطنها الأصلي. وتحضر في المناسبة الأغاني والإيقاعات والطقوس التي تحمل ملامح التراث النوبي، لتمنح الاحتفال طابعًا خاصًا يجمع بين الفرح والتواصل والاعتزاز بالهوية. وتؤكد مثل هذه المناسبات أن الثقافة النوبية قادرة على الحفاظ على حضورها مهما ابتعدت المسافات، وأن الموسيقى تظل إحدى أهم الوسائل التي تحمل ذاكرة المكان وروح المجتمع من جيل إلى جيل.",
    hashtags: [
      "#محمود_فوزي",
      "#فرح_نوبي",
      "#النوبة",
      "#السعودية",
      "#موسيقى_نوبية",
      "#أفراح_نوبية",
      "#تراث_نوبي",
    ],
  },
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
     Figure card bio expand/collapse
     ======================================================================= */
  $$(".figure-card .f-more").forEach(btn => {
    on(btn, "click", () => {
      const card = btn.closest(".figure-card");
      const expanded = card.classList.toggle("is-expanded");
      btn.textContent = expanded ? "اقرأ أقل" : "اقرأ المزيد";
    });
  });

  /* =======================================================================
     Nubian video gallery (6-video interactive system, Music section)
     ======================================================================= */
  (function initVideoGallery() {
    const videoEl = $("#vgallery-video");
    const sourceEl = $("#vgallery-source");
    if (!videoEl) return;

    const thumbsWrap = $("#vgallery-thumbs");
    const counterEl = $("#vgallery-counter");
    const infoBox = $("#vgallery-info");
    const infoTags = $("#vgallery-tags");
    const infoTitle = $("#vgallery-title");
    const infoArtist = $("#vgallery-artist");
    const infoDesc = $("#vgallery-desc");
    const infoHashtags = $("#vgallery-hashtags");
    const prevBtn = $("#vgallery-prev");
    const nextBtn = $("#vgallery-next");
    const frameBgEl = $("#vgallery-frame-bg");
    const total = NUBIAN_VIDEOS.length;
    let vIndex = 0;

    function renderThumbs() {
      thumbsWrap.innerHTML = NUBIAN_VIDEOS.map((v, i) => `
        <button type="button" class="vgallery-thumb${i === vIndex ? " active" : ""}" data-i="${i}" aria-label="${v.title}">
          <img src="${v.poster}" alt="" loading="lazy" onerror="this.style.opacity='0'">
        </button>`).join("");
    }

    function renderVideo(i) {
      const v = NUBIAN_VIDEOS[i];
      videoEl.pause();
      videoEl.poster = v.poster;
      sourceEl.src = v.videoSrc;
      videoEl.load();
      frameBgEl.style.backgroundImage = `url(${v.poster})`;

      infoBox.classList.remove("is-in");
      void infoBox.offsetWidth;
      infoTags.innerHTML = v.category.map(c => `<span class="vgallery-tag">${c}</span>`).join("");
      infoTitle.textContent = v.title;
      infoArtist.textContent = v.artist;
      infoDesc.textContent = v.description;
      infoHashtags.innerHTML = v.hashtags.map(h => `<span class="vgallery-hashtag">${h}</span>`).join("");
      infoBox.classList.add("is-in");

      counterEl.textContent = String(i + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
      $$(".vgallery-thumb", thumbsWrap).forEach((btn, idx) => btn.classList.toggle("active", idx === i));
    }

    on(thumbsWrap, "click", (e) => {
      const btn = e.target.closest(".vgallery-thumb");
      if (!btn) return;
      vIndex = Number(btn.dataset.i);
      renderVideo(vIndex);
    });
    on(prevBtn, "click", () => { vIndex = (vIndex - 1 + total) % total; renderVideo(vIndex); });
    on(nextBtn, "click", () => { vIndex = (vIndex + 1) % total; renderVideo(vIndex); });

    renderThumbs();
    renderVideo(0);
  })();

  /* =======================================================================
     Figure modal (click card → big photo + full bio)
     ======================================================================= */
  const figModal = $("#figure-modal");
  const figModalBox = $(".figure-modal-box", figModal);
  const figModalAvatar = $("#figure-modal-avatar");
  const figModalName = $("#figure-modal-name");
  const figModalRole = $("#figure-modal-role");
  const figModalBio = $("#figure-modal-bio");

  function openFigureModal(card) {
    const panel = card.closest(".fig-panel");
    const cat = panel ? panel.dataset.catPanel : "lit";
    figModalBox.className = "figure-modal-box cat-" + cat;

    const imgEl = card.querySelector(".f-avatar img");
    figModalAvatar.innerHTML = imgEl
      ? `<img src="${imgEl.src}" alt="${imgEl.alt}">`
      : card.querySelector(".f-avatar").textContent;
    figModalName.textContent = card.querySelector("h3").textContent;
    figModalRole.textContent = card.querySelector(".f-role").textContent;
    figModalBio.textContent = card.querySelector(".f-bio").textContent;

    figModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeFigureModal() {
    figModal.classList.remove("open");
    document.body.style.overflow = "";
  }
  $$(".figure-card").forEach(card => {
    on(card, "click", (e) => {
      if (e.target.closest(".f-more")) return;
      openFigureModal(card);
    });
  });
  on($("#figure-modal-close"), "click", closeFigureModal);
  on(figModal, "click", (e) => { if (e.target === figModal) closeFigureModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && figModal.classList.contains("open")) closeFigureModal();
  });

  /* =======================================================================
     Figures tabs
     ======================================================================= */
  const figTabs = $$("#fig-tabs button");
  const figPanels = $$("#fig-panels .fig-panel");
  figTabs.forEach(btn => {
    on(btn, "click", () => {
      const cat = btn.dataset.cat;
      figTabs.forEach(b => { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
      figPanels.forEach(p => { p.hidden = p.dataset.catPanel !== cat; });
    });
  });

  /* =======================================================================
     Timeline tabs
     ======================================================================= */
  const tlTabs = $$("#tl-tabs button");
  const tlGroups = $$("#tl-list .tl-era-group");
  tlTabs.forEach(btn => {
    on(btn, "click", () => {
      const era = btn.dataset.era;
      tlTabs.forEach(b => { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
      tlGroups.forEach(g => { g.hidden = g.dataset.eraGroup !== era; });
    });
  });

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
     Hero parallax + crossfade — kept subtle and minimal
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
          heroImgs.forEach(img => { img.style.transform = `scale(1.08) translateY(${y * 0.08}px)`; });
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
    const allBtn = `<button data-cat="all" class="${activeCat==='all'?'active':''}"><span class="cat-label"><span class="cat-dot"></span>الكل</span><span class="count">${counts.all}</span></button>`;
    const rest = DICTIONARY.categories.map(c =>
      `<button data-cat="${c.key}" class="${activeCat===c.key?'active':''}"><span class="cat-label"><span class="cat-dot"></span>${c.label}</span><span class="count">${counts[c.key]}</span></button>`
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
      const sameDialect = w.fadicca === w.kenzi;
      const dialectsHtml = sameDialect
        ? `<div class="fc-dia-row fc-dia-both"><span class="fc-dia-dot"></span><b>اللهجتان</b><span class="fc-dia-val">${w.fadicca}</span></div>`
        : `<div class="fc-dia-row"><span class="fc-dia-dot fc-dia-dot--fad"></span><b>الفاديجا</b><span class="fc-dia-val">${w.fadicca}</span></div>
           <div class="fc-dia-row"><span class="fc-dia-dot fc-dia-dot--ken"></span><b>الكنزية</b><span class="fc-dia-val">${w.kenzi}</span></div>`;
      return `
      <div class="flashcard" data-fav-key="${favKey}" data-cat="${w.cat}">
        <div class="flashcard-inner">
          <div class="fc-face front">
            <div class="fc-face-top">
              <span class="fc-cat">${catLabel}</span>
              <span class="fc-flip-hint" aria-hidden="true" title="انقر لعرض الترجمة">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.9V12a9 9 0 019-9h9"/><path d="M7 21.9l-4-4 4-4"/><path d="M21 11.1V12a9 9 0 01-9 9H3"/></svg>
              </span>
            </div>
            <span class="fc-ar">${w.ar}</span>
            <div class="fc-bottom">
              <button class="fc-fav ${isFav?'active':''}" aria-label="إضافة للمفضلة" data-action="fav">
                <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.7-10-9.3C.5 8.4 2.3 5 6 5c2.1 0 3.6 1.1 4.5 2.4C11.4 6.1 12.9 5 15 5c3.7 0 5.5 3.4 4 6.7-2.5 4.6-10 9.3-10 9.3z"/></svg>
              </button>
            </div>
          </div>
          <div class="fc-face back">
            <div class="fc-face-top">
              <span class="fc-cat">${catLabel}</span>
            </div>
            <div class="fc-dialects">${dialectsHtml}</div>
            <div class="fc-bottom">
              <button class="fc-play" data-action="play" aria-label="استماع تقريبي" title="استماع تقريبي (تركيب صوتي آلي وليس نطقًا نوبيًا موثّقًا)">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <span class="fc-approx-label">نطق تقريبي</span>
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
          <source srcset="${IMG}${g.base}-thumb.jpg" type="image/jpeg">
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
    lbImg.src = `${IMG}${g.base}-thumb.jpg`;
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
    const dir = document.documentElement.dir === "rtl" ? "" : "-";
    if (track) track.style.transform = `translateX(${dir}${testiIndex * 100}%)`;
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
