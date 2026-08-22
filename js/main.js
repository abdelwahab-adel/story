/* =========================================================================
   النوبة · أسوان    data + interactions
   No backend, no localStorage (keeps the page fully portable + artifact-safe).
   All state lives in memory for the duration of the visit.
   ========================================================================= */

(() => {
  "use strict";

  const IMG = "assets/images/";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =======================================================================
     DATA    Nubian dictionary (Fadicca / Kenzi), transcribed from the source
     content document. Numbers use a single traditional form for both.
     ======================================================================= */
  const DICTIONARY = {
    categories: [
      { key: "phrases",  label: "عبارات أساسية", en: "Basic phrases" },
      { key: "basics",   label: "أساسيات", en: "Basics" },
      { key: "verbs",    label: "أفعال", en: "Verbs" },
      { key: "family",   label: "العائلة", en: "Family" },
      { key: "body",     label: "أجزاء الجسم", en: "Body parts" },
      { key: "house",    label: "البيت والطعام", en: "Home & food" },
      { key: "qualities",label: "صفات", en: "Qualities" },
      { key: "numbers",  label: "الأرقام", en: "Numbers" },
    ],
    words: [
  // عبارات أساسية
  { cat:"phrases", ar:"تحية (مرحباً)", en:"Greeting (Hello)", fadicca:"مسكاقنا / سليمو", kenzi:"مسكاقرو / سليمو" },

  { cat:"phrases", ar:"شكرًا", en:"Thank you", fadicca:"أورا / أورونج", kenzi:"أورا / أورون" },

  { cat:"phrases", ar:"الحب", en:"Love", fadicca:"دولّي", kenzi:"دولّي" },

  { cat:"phrases", ar:"البيت", en:"Home", fadicca:"كا (Ka)", kenzi:"كا (Ka)" },


  { cat:"phrases", ar:"الماء", en:"Water", fadicca:"أمان (Aman)", kenzi:"أسي (Essi)" },

  // أساسيات
  { cat:"basics", ar:"أنا", en:"I / me", fadicca:"أي (Ay)", kenzi:"أي (Ay)" },

  { cat:"basics", ar:"أنتَ / أنتِ", en:"You", fadicca:"إير (Ir)", kenzi:"إير (Ir)" },

  { cat:"basics", ar:"نعم", en:"Yes", fadicca:"أي / أيو (Ay / Ayo)", kenzi:"أيو (Ayo)" },

  { cat:"basics", ar:"لا", en:"No", fadicca:"ملا (Mala) / مالانق (Malanq)", kenzi:"أون (Oun) / مالا (Mala)" },

  { cat:"basics", ar:"لا يوجد / بلاش", en:"There isn't / don't", fadicca:"ملا / مانقا (Mala / Manga)", kenzi:"مونا / سيكام (Mona / Sekam)" },

  { cat:"basics", ar:"لسه", en:"Not yet", fadicca:"جيل (Jil)", kenzi:"جيل (Jil)" },

  { cat:"basics", ar:"كفاية", en:"Enough", fadicca:"يكّي (Yikki) / كورك (Kourk)", kenzi:"يكّي (Yikki)" },

  { cat:"basics", ar:"من؟", en:"Who?", fadicca:"ني (Nee)", kenzi:"ني (Nee)" },

  { cat:"basics", ar:"ماذا؟", en:"What?", fadicca:"مين (Min)", kenzi:"مين (Min)" },

  { cat:"basics", ar:"أين؟", en:"Where?", fadicca:"مينتو (Minto)", kenzi:"مينتو (Minto) / سيكّي (Sikki)" },

  { cat:"basics", ar:"متى؟", en:"When?", fadicca:"هومين (Homin)", kenzi:"شومين (Shomin)" },

  { cat:"basics", ar:"الآن", en:"Now", fadicca:"إشكولا (Ishkola) / آكا (Aka)", kenzi:"إشكولا (Ishkola)" },

  { cat:"basics", ar:"اليوم", en:"Today", fadicca:"إينال (Inal) / إيتو (Eeto)", kenzi:"إيتو (Eeto)" },

  { cat:"basics", ar:"بكرة", en:"Tomorrow", fadicca:"بيا (Beya)", kenzi:"بيا (Beya)" },

  { cat:"basics", ar:"أمس", en:"Yesterday", fadicca:"صو (So)", kenzi:"صو (So) / سو (Su)" },

  // أفعال
  { cat:"verbs", ar:"تعال", en:"Come", fadicca:"كير (Kiir)", kenzi:"كير (Kiir)" },

  { cat:"verbs", ar:"اذهب / امشِ", en:"Go / walk", fadicca:"موق (Mog)", kenzi:"موق (Mog)" },

  { cat:"verbs", ar:"كُل", en:"Eat", fadicca:"كالي (Kalli)", kenzi:"كالي (Kalli)" },

  { cat:"verbs", ar:"اشرب", en:"Drink", fadicca:"ني (Ni)", kenzi:"ناي (Nai)" },

  { cat:"verbs", ar:"نَم", en:"Sleep", fadicca:"جير (Jeer) / نيير (Nier)", kenzi:"جير (Jeer) / نيير (Nier)" },

  { cat:"verbs", ar:"اجلس", en:"Sit", fadicca:"تقو (Tegu) / آك (Ak)", kenzi:"أوقو (Ougo)" },

  { cat:"verbs", ar:"اسمع", en:"Listen", fadicca:"مسك (Misk) / أوكي (Ukki)", kenzi:"أوكي (Ukki)" },

  { cat:"verbs", ar:"انظر", en:"Look", fadicca:"نال (Nal)", kenzi:"نال (Nal)" },

  { cat:"verbs", ar:"تكلم", en:"Speak", fadicca:"ويقي (Weeqi)", kenzi:"ويقير (Weeqir)" },

  { cat:"verbs", ar:"هات / أعطِ", en:"Give / bring", fadicca:"دين (Deen) / تِي (Tee)", kenzi:"تِي (Tee) / دين (Deen)" },

  { cat:"verbs", ar:"خذ", en:"Take", fadicca:"طاو (Taw)", kenzi:"طاو (Taw)" },

  { cat:"verbs", ar:"ادخل", en:"Enter", fadicca:"جين (Jeen)", kenzi:"جين (Jeen)" },

  { cat:"verbs", ar:"اخرج", en:"Go out", fadicca:"بال (Bal) / وسكيل (Woskiil)", kenzi:"وسكيل (Woskiil)" },

  { cat:"verbs", ar:"اغسل", en:"Wash", fadicca:"جوك (Jook) / شوك (Shook)", kenzi:"شوك (Shook)" },

  { cat:"verbs", ar:"العب", en:"Play", fadicca:"أور (Our)", kenzi:"أور (Our)" },

  { cat:"verbs", ar:"اعمل / اشتغل", en:"Work", fadicca:"صو (So) / أوج (Ouj)", kenzi:"أوج (Ouj)" },

  { cat:"verbs", ar:"اضحك", en:"Laugh", fadicca:"جيل (Jeel)", kenzi:"جيل (Jeel)" },

  { cat:"verbs", ar:"اعرف", en:"Know", fadicca:"كيب (Kib) / ارسك (Arsk)", kenzi:"كيب (Kib) / ارسك (Arsk)" },

  // العائلة
  { cat:"family", ar:"أمي", en:"My mother", fadicca:"إنَّا (Enna)", kenzi:"إنَّا (Enna)" },

  { cat:"family", ar:"أبي", en:"My father", fadicca:"أپَّا (Appa) / آبا (Aba)", kenzi:"أپَّا (Appa) / آبا (Aba)" },

  { cat:"family", ar:"أخي", en:"My brother", fadicca:"فاي (Fayi)", kenzi:"أَمْبا (Amba)" },

  { cat:"family", ar:"أختي", en:"My sister", fadicca:"داوس (Dawes)", kenzi:"داوس (Dawes)" },

  { cat:"family", ar:"ولد / ابن", en:"Boy / son", fadicca:"تود (Tod)", kenzi:"تود (Tod)" },

  { cat:"family", ar:"بنت / ابنة", en:"Girl / daughter", fadicca:"بور (Bour)", kenzi:"بور (Bour)" },

  { cat:"family", ar:"طفل", en:"Child", fadicca:"كورا (Kora) / تود (Tod)", kenzi:"بورو (Bouro)" },

  { cat:"family", ar:"رجل", en:"Man", fadicca:"أوقج (Ougij)", kenzi:"أوقج (Ougij)" },

  { cat:"family", ar:"امرأة", en:"Woman", fadicca:"إدين (Idin) / إدنا (Idna)", kenzi:"إدين (Idin)" },

  { cat:"family", ar:"ضيف", en:"Guest", fadicca:"إشكي (Ishki)", kenzi:"إشكي (Ishki)" },

  { cat:"family", ar:"صاحب / جار", en:"Friend / neighbor", fadicca:"كورسي (Koursi) / أورسي (Oursi)", kenzi:"أورسي (Oursi)" },

  { cat:"family", ar:"إنسان", en:"Person", fadicca:"إد (Id)", kenzi:"إد (Id)" },

  // أجزاء الجسم
  { cat:"body", ar:"رأس", en:"Head", fadicca:"أور (Ur)", kenzi:"أور (Ur)" },

  { cat:"body", ar:"عين", en:"Eye", fadicca:"ميس (Miss)", kenzi:"كال (Kal)" },

  { cat:"body", ar:"أذن", en:"Ear", fadicca:"أوي (Uyi)", kenzi:"أوي (Uyi)" },

  { cat:"body", ar:"فم", en:"Mouth", fadicca:"أوق (Oug)", kenzi:"أوق (Oug)" },

  { cat:"body", ar:"يد", en:"Hand", fadicca:"إيد (Eed)", kenzi:"إيد (Eed)" },

  { cat:"body", ar:"رجل (قدم)", en:"Leg / foot", fadicca:"أوس (Ous)", kenzi:"أوس (Ous)" },

  { cat:"body", ar:"قلب", en:"Heart", fadicca:"آي (Aay)", kenzi:"آي (Aay)" },

  { cat:"body", ar:"بطن", en:"Stomach", fadicca:"تو (Too)", kenzi:"تو (Too)" },

  { cat:"body", ar:"شعر", en:"Hair", fadicca:"ديل (Deel) / صوم (Soom)", kenzi:"صوم (Soom)" },

  { cat:"body", ar:"لسان", en:"Tongue", fadicca:"نال (Nal) / نيد (Need)", kenzi:"نيد (Need)" },

  // البيت والطعام
  { cat:"house", ar:"بيت", en:"House", fadicca:"كا (Ka)", kenzi:"كا (Ka)" },

  { cat:"house", ar:"باب", en:"Door", fadicca:"كورو (Kourou)", kenzi:"كورو (Kourou)" },

  { cat:"house", ar:"ماء", en:"Water", fadicca:"أمان (Aman)", kenzi:"أسي (Essi)" },

  { cat:"house", ar:"لبن", en:"Milk", fadicca:"إرتي (Erti)", kenzi:"إرتي (Erti)" },

  { cat:"house", ar:"شاي", en:"Tea", fadicca:"شاي (Shai)", kenzi:"شاي (Shai)" },

  { cat:"house", ar:"خبز", en:"Bread", fadicca:"كابِدة (Kabida) / شادي (Shadi)", kenzi:"كابِدة (Kabida) / شادي (Shadi)" },

  { cat:"house", ar:"تمر", en:"Dates", fadicca:"فينتي (Finti)", kenzi:"فينتي (Finti)" },

  { cat:"house", ar:"نخلة", en:"Palm tree", fadicca:"فينتي كُو (Finti Koo)", kenzi:"فينتي كور (Finti Kour)" },

  { cat:"house", ar:"نار", en:"Fire", fadicca:"إق (Iq)", kenzi:"إق (Iq)" },

  { cat:"house", ar:"ملح", en:"Salt", fadicca:"أجر (Ajir)", kenzi:"أجر (Ajir)" },

  { cat:"house", ar:"لحم", en:"Meat", fadicca:"كوس (Koos)", kenzi:"كوس (Koos)" },

  { cat:"house", ar:"سمك", en:"Fish", fadicca:"أمان كاري (Aman Kari)", kenzi:"أسي كاري (Essi Kari)" },

  { cat:"house", ar:"فلوس / ذهب", en:"Money / gold", fadicca:"أوري (فلوس) (Oori) / نوب (ذهب) (Noob)", kenzi:"أوري (فلوس) (Oori)" },

  // صفات
  { cat:"qualities", ar:"جميل", en:"Beautiful", fadicca:"مسقاني (Miskani) / مشكا (Mishka)", kenzi:"مشكا (Mishka)" },

  { cat:"qualities", ar:"سيء / وحش", en:"Bad / ugly", fadicca:"ملان (Malan)", kenzi:"ملان (Malan)" },

  { cat:"qualities", ar:"كبير", en:"Big", fadicca:"دُو (Dou)", kenzi:"أورا (Ora) / داو (Dao)" },

  { cat:"qualities", ar:"صغير", en:"Small", fadicca:"كينو (Keeno) / كورا (Kora)", kenzi:"كين (Keen)" },

  { cat:"qualities", ar:"كثير", en:"Much / many", fadicca:"ماني (Mani) / جيك (Jeek)", kenzi:"كادي (Kadi)" },

  { cat:"qualities", ar:"طويل", en:"Long / tall", fadicca:"فور (Four)", kenzi:"فور (Four)" },

  { cat:"qualities", ar:"قصير", en:"Short", fadicca:"كور (Kour)", kenzi:"كور (Kour)" },

  { cat:"qualities", ar:"أبيض", en:"White", fadicca:"أرو (Aroo)", kenzi:"أرو (Aroo)" },

  { cat:"qualities", ar:"أسود", en:"Black", fadicca:"أُدّي (Uddi)", kenzi:"أُدّي (Uddi)" },

  { cat:"qualities", ar:"أحمر", en:"Red", fadicca:"جيل (Jeel)", kenzi:"جيل (Jeel)" },

  { cat:"qualities", ar:"بارد", en:"Cold", fadicca:"أوقوج (Ougouj)", kenzi:"أوقوج (Ougouj)" },

  { cat:"qualities", ar:"سريع", en:"Fast", fadicca:"بيرا (Beera)", kenzi:"بيرا (Beera)" },

  // الأرقام
  { cat:"numbers", ar:"١ (واحد)", en:"1 (one)", fadicca:"وِير (Weer)", kenzi:"وِير (Weer)" },

  { cat:"numbers", ar:"٢ (اثنين)", en:"2 (two)", fadicca:"أُوو (Oww)", kenzi:"أُوو (Oww)" },

  { cat:"numbers", ar:"٣ (ثلاثة)", en:"3 (three)", fadicca:"طوسكو (Tosko)", kenzi:"طوسكو (Tosko)" },

  { cat:"numbers", ar:"٤ (أربعة)", en:"4 (four)", fadicca:"كِمسو (Kemsou)", kenzi:"كِمسو (Kemsou)" },

  { cat:"numbers", ar:"٥ (خمسة)", en:"5 (five)", fadicca:"دِجو (Dijjou)", kenzi:"دِجو (Dijjou)" },

  { cat:"numbers", ar:"٦ (ستة)", en:"6 (six)", fadicca:"قورو (Gorou)", kenzi:"قورو (Gorou)" },

  { cat:"numbers", ar:"٧ (سبعة)", en:"7 (seven)", fadicca:"كولود (Kolod)", kenzi:"كولود (Kolod)" },

  { cat:"numbers", ar:"٨ (ثمانية)", en:"8 (eight)", fadicca:"إدِوو (Iddiww)", kenzi:"إدِوو (Iddiww)" },

  { cat:"numbers", ar:"٩ (تسعة)", en:"9 (nine)", fadicca:"إسكود (Iskod)", kenzi:"إسكود (Iskod)" },

  { cat:"numbers", ar:"١٠ (عشرة)", en:"10 (ten)", fadicca:"ديمِر (Dimir)", kenzi:"ديمِر (Dimir)" },
],
  };

  /* =======================================================================
     DATA    Gallery (every file from /assets, tagged + captioned)
     ======================================================================= */
  const GALLERY = [
    { base:"nile-terrace-building", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"مبنى نوبي على ضفاف النيل", alt_en:"A Nubian building on the banks of the Nile" },
    { base:"village-west-suhail", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"قرية غرب سهيل النوبية الشهيرة بألوانها", alt_en:"The West Seheil Nubian village, famous for its colors" },
    { base:"architecture-house-facade", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"واجهة بيت نوبي مزينة برسوم هندسية", alt_en:"A Nubian house facade decorated with geometric patterns" },
    { base:"architecture-desert-house", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"منزل نوبي بالطراز الصحراوي التقليدي", alt_en:"A Nubian house in the traditional desert style" },
    { base:"architecture-guesthouse-terrace", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"تراس بيت ضيافة نوبي يطل على النيل", alt_en:"The terrace of a Nubian guesthouse overlooking the Nile" },
    { base:"architecture-guesthouse-archway", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"بوابة مقنطرة تطل على النيل في قرية نوبية", alt_en:"An arched gateway overlooking the Nile in a Nubian village" },
    { base:"architecture-water-jars", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"قلل فخارية تقليدية لتبريد الماء في حائط البيت", alt_en:"Traditional clay water jars set into a house wall to cool the water" },
    { base:"architecture-decorated-stairs", tag:"architecture", label:"العمارة", label_en:"Architecture", alt:"درجات سلم مزخرفة أمام مدخل بيت نوبي", alt_en:"Decorated steps in front of a Nubian house entrance" },
    { base:"clothes-women-headscarves", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"سيدتان نوبيتان يرتديان الأزياء التقليدية الملونة", alt_en:"Two Nubian women wearing colorful traditional dress" },
    { base:"history-ancient-nubians-painting", tag:"history", label:"آثار وتاريخ", label_en:"History & antiquities", alt:"لوحة أثرية تصوّر مشهدًا من حضارة النوبة القديمة", alt_en:"An artwork depicting a scene from ancient Nubian civilization" },
    { base:"history-ancient-papyrus-art", tag:"history", label:"آثار وتاريخ", label_en:"History & antiquities", alt:"فن مصري قديم يصوّر ملامح من الحضارة النوبية", alt_en:"Ancient Egyptian art depicting features of Nubian civilization" },
    { base:"history-archer-figurines", tag:"history", label:"آثار وتاريخ", label_en:"History & antiquities", alt:"نماذج خشبية أثرية لجنود نوبيين حاملي الأقواس", alt_en:"Ancient wooden figurines of Nubian archer soldiers" },
    { base:"museum-ramses-statue", tag:"history", label:"آثار وتاريخ", label_en:"History & antiquities", alt:"تمثال حجري لرمسيس الثاني في متحف النوبة", alt_en:"A stone statue of Ramesses II at the Nubian Museum" },
    { base:"music-band-daf", tag:"music", label:"الموسيقى والرقص", label_en:"Music & dance", alt:"فرقة موسيقية نوبية تؤدي بالدفوف", alt_en:"A Nubian musical troupe performing with frame drums" },
    { base:"music-nile-musicians", tag:"music", label:"الموسيقى والرقص", label_en:"Music & dance", alt:"عازفان نوبيان يعزفان بجوار النيل", alt_en:"Two Nubian musicians playing by the Nile" },
    { base:"music-tanbur-instrument", tag:"music", label:"الموسيقى والرقص", label_en:"Music & dance", alt:"التنبور هو الآلة الوترية المقدسة في الموسيقى النوبية، يصنع منها الفنان أغانيَ للفرح والحب والحنين، وتتوارثه الأجيال كما تتوارث الأرض والاسم.", alt_en:"The tanbur is the sacred stringed instrument of Nubian music    artists shape from it songs of joy, love and longing, and it is handed down through generations like land and name." },
    { base:"music-tar-players", tag:"music", label:"الموسيقى والرقص", label_en:"Music & dance", alt:"يتوارث النوبيون العزف على الدفوف والطبول جيلًا بعد جيل، في جلسات غير رسمية يعلّم فيها الكبار الصغار", alt_en:"Nubians pass down frame-drum and drum playing generation after generation, in informal sessions where elders teach the young" },
    { base:"music-drum-generations", tag:"music", label:"الموسيقى والرقص", label_en:"Music & dance", alt:"جيلان يعزفان الدفوف معًا في جلسة غير رسمية", alt_en:"Two generations playing frame drums together in an informal session" },
    { base:"handicrafts-market-street", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"شارع وسوق نوبي للحرف والهدايا", alt_en:"A Nubian street market for crafts and gifts" },
    { base:"handicrafts-souvenir-stall", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"كشك تذكارات نوبي بالدفوف والمنحوتات الخشبية", alt_en:"A Nubian souvenir stall with frame drums and wooden carvings" },
    { base:"handicrafts-baskets-product", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"سلال وحقائب منسوجة يدويًا بألوان زاهية", alt_en:"Hand-woven baskets and bags in vivid colors" },
    { base:"handicrafts-basket-product", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"سلة مصنوعة يدويًا من الخوص الملوّن", alt_en:"A basket hand-made from colored palm leaves" },
    { base:"handicrafts-hanging-pottery", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"أوعية فخارية معلّقة بزخارف نسيجية", alt_en:"Hanging clay pots with woven decoration" },
    { base:"handicrafts-basket-weaving-hands", tag:"crafts", label:"الحرف اليدوية", label_en:"Handicrafts", alt:"سيدة نوبية تصنع سلة من سعف النخيل", alt_en:"A Nubian woman weaving a basket from palm fronds" },
    { base:"tourism-abu-simbel-performers", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"فرقة نوبية بالزي التقليدي أمام معبد أبو سمبل", alt_en:"A Nubian troupe in traditional dress in front of Abu Simbel temple" },
    { base:"museum-clothing-diorama", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"مجسم متحفي يوثّق الزي النوبي التقليدي", alt_en:"A museum diorama documenting traditional Nubian dress" },
    { base:"language-learning-chart", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"لوحة تعليمية لعبارات باللغة النوبية", alt_en:"An educational chart of Nubian-language phrases" },
    { base:"culture-majlis-diorama", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"مجسم متحفي لمجلس نوبي تقليدي", alt_en:"A museum diorama of a traditional Nubian gathering (majlis)" },
    { base:"culture-majlis-gathering", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"تجمع أهالي في مجلس نوبي", alt_en:"Villagers gathered at a Nubian majlis" },
    { base:"culture-cafe-mural", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"جدارية فنية على واجهة مقهى نوبي", alt_en:"An artistic mural on the facade of a Nubian café" },
    { base:"wedding-art-wall", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"جدارية فنية تحكي تقاليد الزفاف النوبي", alt_en:"A mural depicting Nubian wedding traditions" },
    { base:"wedding-procession-real", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"موكب زفة نوبية في إحدى القرى", alt_en:"A Nubian wedding procession in a village" },
    { base:"legend-crocodile-real", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"تمساح النيل الذي تدور حوله إحدى حكايات النوبة", alt_en:"The Nile crocodile at the center of a Nubian legend" },
    { base:"daily-life-village-painting", tag:"culture", label:"لحظات ثقافية", label_en:"Cultural moments", alt:"لوحة فنية تصوّر مشهدًا من الحياة النوبية", alt_en:"An artwork depicting a scene from daily Nubian life" },
  ];
  const GALLERY_FILTERS = [
    { key:"all", label:"الكل", label_en:"All" },
    { key:"architecture", label:"العمارة", label_en:"Architecture" },
    { key:"music", label:"الموسيقى", label_en:"Music" },
    { key:"crafts", label:"الحرف", label_en:"Crafts" },
    { key:"history", label:"آثار وتاريخ", label_en:"History" },
    { key:"culture", label:"لحظات ثقافية", label_en:"Cultural moments" },
  ];

  /* =======================================================================
     DATA    Nubian video archive (6-video interactive gallery, Music section)
     Local video files, NOT YouTube. Each video's file lives at assets/videos/
        see assets/videos/README.txt for exact filenames expected.
     Poster images are auto-extracted from each video file (see build step).
     ======================================================================= */
const NUBIAN_VIDEOS = [
  {
    videoSrc: "assets/videos/video-1.mp4",
    poster: "assets/videos/video-1-poster.png",
    title: "النوبة – فخور أنا بحضارتي، النوبة فوق ❤️",
    title_en: "Nubia – Proud of My Civilization, Nubia Above All ❤️",
    artist: "خضر العطار",
    artist_en: "Khedr El-Attar",
    category: ["النوبة", "فن وحضارة", "أسوان", "خضر العطار"],
    category_en: ["Nubia", "Art & Civilization", "Aswan", "Khedr El-Attar"],
    description:
      "رحلة إلى عمق الهوية النوبية، نستحضر خلالها ملامح حضارة عريقة امتدت جذورها عبر آلاف السنين، ونكتشف إرثًا ثقافيًا أصيلًا ما زال حاضرًا في تفاصيل الحياة والفن واللغة والعادات. تعكس هذه الرحلة الفخر بتاريخ النوبة وثراء حضارتها، وتبرز جمال الفن النوبي بما يحمله من ألوان ورموز وتفاصيل تعبّر عن روح المكان وذاكرة الأجيال. ومن خلال هذا التراث، تتجلى العلاقة العميقة بين الإنسان النوبي وأرضه وتاريخه، حيث تتكامل الموسيقى واللغة والفنون والعادات والموروث الشعبي لتشكّل هوية متفردة حافظت على حضورها عبر العصور. إنها هوية نابضة بالحياة، تجمع بين أصالة الماضي وإبداع الحاضر، وتحمل قصة شعبٍ ما زال يروي تاريخه ويفتخر بجذوره من جيل إلى جيل.",
    description_en:
      "A journey into the depths of Nubian identity, evoking the features of an ancient civilization whose roots stretch back thousands of years, and uncovering an authentic cultural legacy still present in the details of daily life, art, language and custom. This journey reflects pride in Nubia's history and the richness of its civilization, and highlights the beauty of Nubian art with its colors, symbols and details that express the spirit of the place and the memory of its generations. Through this heritage, the deep bond between the Nubian people, their land and their history becomes clear, as music, language, the arts, customs and folk tradition come together to form a distinctive identity that has endured across the ages    a living identity that blends the authenticity of the past with the creativity of the present, carrying the story of a people who still tell their history and take pride in their roots from generation to generation.",
    hashtags: [
      "#النوبة",
      "#فخور_أنا",
      "#فخور_أنا_بحضارتي",
      "#النوبة_فوق",
      "#النوبة_فن_وحضارة",
      "#أسوان",
      "#خضر_العطار",
    ],
    hashtags_en: [
      "#Nubia",
      "#ProudOfMyCivilization",
      "#NubiaAboveAll",
      "#NubianArtAndCivilization",
      "#Aswan",
      "#KhedrElAttar",
    ],
  },

  {
    videoSrc: "assets/videos/video-2.mp4",
    poster: "assets/videos/video-2-poster.png",
    title: "حسن جزولي – فرح نوبي في ستينيات القرن الماضي",
    title_en: "Hassan Gozouli – A Nubian Wedding in the 1960s",
    artist: "حسن جزولي",
    artist_en: "Hassan Gozouli",
    category: ["تراث نوبي", "أفراح نوبية", "موسيقى نوبية قديمة"],
    category_en: ["Nubian Heritage", "Nubian Weddings", "Vintage Nubian Music"],
    description:
      "مشاهد نادرة من فرح نوبي في ستينيات القرن الماضي، توثّق جانبًا من الحياة الاجتماعية في النوبة خلال تلك الفترة، وتكشف أجواء الأفراح التي كانت تجمع الأهل والأحبة في مناسبات الزواج. وتظهر في هذه المشاهد ملامح من الموسيقى والغناء والرقص النوبي، إلى جانب العادات والتقاليد التي صاحبت الاحتفالات ومنحتها طابعًا خاصًا يعكس روح المجتمع النوبي وتماسكه. وتمثل هذه اللقطات ذاكرة بصرية ثمينة توثّق جانبًا من تفاصيل الحياة والملابس والتجمعات وطرق الاحتفال، وتحفظ ملامح مرحلة تاريخية وثقافية انتقلت ذكرياتها من جيل إلى جيل.",
    description_en:
      "Rare footage from a Nubian wedding in the 1960s, documenting a slice of Nubian social life in that era and revealing the festive atmosphere that brought family and loved ones together for marriage celebrations. The footage shows glimpses of Nubian music, singing and dance, alongside the customs and traditions that accompanied the celebrations and gave them a distinctive character reflecting the cohesion of Nubian society. These scenes form a precious visual record, documenting details of daily life, dress, gatherings and ways of celebrating, and preserving the features of a historical and cultural period whose memories passed from generation to generation.",
    hashtags: [
      "#حسن_جزولي",
      "#النوبة",
      "#تراث_نوبي",
      "#فرح_نوبي",
      "#أفراح_نوبية",
      "#موسيقى_نوبية",
    ],
    hashtags_en: [
      "#HassanGozouli",
      "#Nubia",
      "#NubianHeritage",
      "#NubianWedding",
      "#NubianWeddings",
      "#NubianMusic",
    ],
  },

  {
    videoSrc: "assets/videos/video-3.mp4",
    poster: "assets/videos/video-3-poster.png",
    title: "أحمد منيب ومحمد منير – لقاء من ذاكرة الفن النوبي",
    title_en: "Ahmed Mounib & Mohamed Mounir – A Moment from Nubian Art's Memory",
    artist: "أحمد منيب ومحمد منير",
    artist_en: "Ahmed Mounib & Mohamed Mounir",
    category: ["أحمد منيب", "محمد منير", "موسيقى نوبية", "تراث نوبي"],
    category_en: ["Ahmed Mounib", "Mohamed Mounir", "Nubian Music", "Nubian Heritage"],
    description:
      "لحظة فنية مميزة تجمع اثنين من أبرز رموز الأغنية النوبية الحديثة، الفنان الراحل أحمد منيب والفنان محمد منير، في مشهد يستحضر جانبًا مهمًا من رحلة الفن النوبي وتأثيره في الموسيقى المصرية. ارتبط أحمد منيب بتقديم الموسيقى والألحان المستلهمة من التراث النوبي بروح فنية معاصرة، بينما واصل محمد منير هذه الرحلة بأعمال حملت الكثير من ملامح الثقافة النوبية إلى جمهور واسع داخل مصر وخارجها. وتبقى هذه اللحظات جزءًا من ذاكرة الفن، لأنها تختصر رحلة التقاء التراث بالتجديد، وتحافظ على حضور الموسيقى النوبية كأحد روافد المشهد الثقافي والموسيقي المصري.",
    description_en:
      "A memorable artistic moment bringing together two of the foremost figures of modern Nubian song, the late Ahmed Mounib and Mohamed Mounir, in a scene that evokes an important chapter of Nubian art's journey and its influence on Egyptian music. Ahmed Mounib was known for composing music and melodies inspired by Nubian heritage with a contemporary artistic spirit, while Mohamed Mounir carried that journey forward with work that brought many features of Nubian culture to a wide audience in Egypt and beyond. These moments remain part of art's memory, distilling the encounter between heritage and renewal, and keeping Nubian music present as one of the currents feeding Egypt's cultural and musical scene.",
    hashtags: [
      "#أحمد_منيب",
      "#محمد_منير",
      "#النوبة",
      "#موسيقى_نوبية",
      "#تراث_نوبي",
      "#فن_نوبي",
    ],
    hashtags_en: [
      "#AhmedMounib",
      "#MohamedMounir",
      "#Nubia",
      "#NubianMusic",
      "#NubianHeritage",
      "#NubianArt",
    ],
  },

  {
    videoSrc: "assets/videos/video-4.mp4",
    poster: "assets/videos/video-4-poster.jpg",
    title: "حسن الصغير وبيبو آدم – فرح نوبي في القاهرة",
    title_en: "Hassan El-Sagheer & Bebo Adam – A Nubian Wedding in Cairo",
    artist: "حسن الصغير وبيبو آدم",
    artist_en: "Hassan El-Sagheer & Bebo Adam",
    category: ["أفراح نوبية", "حسن الصغير", "بيبو آدم", "موسيقى نوبية"],
    category_en: ["Nubian Weddings", "Hassan El-Sagheer", "Bebo Adam", "Nubian Music"],
    description:
      "أجواء احتفالية من فرح نوبي في القاهرة، تجمع أبناء النوبة حول الغناء والموسيقى والاحتفال في مشهد نابض بالحياة. وتكشف هذه المناسبة كيف تظل الموسيقى النوبية حاضرة في تفاصيل الأفراح، فتجمع الأهل والأصدقاء حول الأغاني والإيقاعات والرقصات التي تحمل ملامح التراث وروح المجتمع. كما تعكس هذه المشاهد استمرار العادات الاجتماعية والفنية النوبية خارج موطنها الأصلي، وتحول المناسبات إلى مساحة للحفاظ على الذاكرة الثقافية وتعزيز التواصل بين الأجيال.",
    description_en:
      "A festive atmosphere from a Nubian wedding in Cairo, bringing Nubians together around song, music and celebration in a scene full of life. The occasion shows how Nubian music remains present in the details of weddings, gathering family and friends around songs, rhythms and dances that carry the marks of heritage and community spirit. These scenes also reflect the continuity of Nubian social and artistic customs outside their homeland, turning such occasions into a space for preserving cultural memory and strengthening ties between generations.",
    hashtags: [
      "#حسن_الصغير",
      "#بيبو_آدم",
      "#فرح_نوبي",
      "#النوبة",
      "#القاهرة",
      "#أفراح_نوبية",
      "#موسيقى_نوبية",
    ],
    hashtags_en: [
      "#HassanElSagheer",
      "#BeboAdam",
      "#NubianWedding",
      "#Nubia",
      "#Cairo",
      "#NubianWeddings",
      "#NubianMusic",
    ],
  },

  {
    videoSrc: "assets/videos/video-5.mp4",
    poster: "assets/videos/video-5-poster.png",
    title: "هشام باطه – أجواء حنّة نوبية من توشكي غرب",
    title_en: "Hisham Bataa – A Nubian Henna Night from Toshka West",
    artist: "هشام باطه",
    artist_en: "Hisham Bataa",
    category: ["توشكي غرب", "حنة نوبية", "هشام باطه", "تراث نوبي"],
    category_en: ["Toshka West", "Nubian Henna Night", "Hisham Bataa", "Nubian Heritage"],
    description:
      "أجواء حنّة نوبية أصيلة من توشكي غرب، في مشهد يحتفي بواحدة من أبرز المناسبات الاجتماعية في الثقافة النوبية. تمتزج الموسيقى والغناء والرقص مع طقوس الاحتفال، لتصنع أجواءً مليئة بالفرح والبهجة، وتكشف جانبًا من العادات والتقاليد التي حافظ عليها المجتمع النوبي وحرص على تناقلها عبر الأجيال. وتجتمع العائلة والأصدقاء في هذه المناسبة لمشاركة العروس فرحتها، وسط الأغاني النوبية والإيقاعات الشعبية، لتصبح الحنّة أكثر من مجرد احتفال؛ فهي مساحة للتعبير عن الانتماء والهوية واستمرار التراث في الحياة اليومية.",
    description_en:
      "An authentic Nubian henna night from Toshka West, celebrating one of the most important social occasions in Nubian culture. Music, singing and dance blend with the rituals of celebration to create an atmosphere full of joy, revealing customs and traditions that Nubian society has preserved and made a point of passing down through the generations. Family and friends gather on this occasion to share the bride's happiness amid Nubian songs and folk rhythms, making the henna night more than a celebration    a space for expressing belonging and identity, and for keeping heritage alive in everyday life.",
    hashtags: [
      "#هشام_باطه",
      "#توشكي_غرب",
      "#حنة_نوبية",
      "#النوبة",
      "#تراث_نوبي",
      "#أفراح_نوبية",
    ],
    hashtags_en: [
      "#HishamBataa",
      "#ToshkaWest",
      "#NubianHenna",
      "#Nubia",
      "#NubianHeritage",
      "#NubianWeddings",
    ],
  },

  {
    videoSrc: "assets/videos/video-6.mp4",
    poster: "assets/videos/video-6-poster.png",
    title: "محمود فوزي – فرح نوبي في السعودية",
    title_en: "Mahmoud Fawzy – A Nubian Wedding in Saudi Arabia",
    artist: "محمود فوزي",
    artist_en: "Mahmoud Fawzy",
    category: ["محمود فوزي", "فرح نوبي", "السعودية", "موسيقى نوبية"],
    category_en: ["Mahmoud Fawzy", "Nubian Wedding", "Saudi Arabia", "Nubian Music"],
    description:
      "أجواء من فرح نوبي في المملكة العربية السعودية، تجمع أبناء النوبة حول الموسيقى والغناء والاحتفال، في مشهد يعكس حضور الثقافة النوبية خارج موطنها الأصلي. وتحضر في المناسبة الأغاني والإيقاعات والطقوس التي تحمل ملامح التراث النوبي، لتمنح الاحتفال طابعًا خاصًا يجمع بين الفرح والتواصل والاعتزاز بالهوية. وتؤكد مثل هذه المناسبات أن الثقافة النوبية قادرة على الحفاظ على حضورها مهما ابتعدت المسافات، وأن الموسيقى تظل إحدى أهم الوسائل التي تحمل ذاكرة المكان وروح المجتمع من جيل إلى جيل.",
    description_en:
      "Scenes from a Nubian wedding in Saudi Arabia, bringing Nubians together around music, song and celebration, in a scene that reflects the presence of Nubian culture far from its homeland. The occasion features songs, rhythms and rituals that carry the marks of Nubian heritage, giving the celebration a distinctive character that combines joy, connection and pride in identity. Such occasions confirm that Nubian culture can maintain its presence no matter the distance, and that music remains one of the most important vessels carrying the memory of place and the spirit of community from generation to generation.",
    hashtags: [
      "#محمود_فوزي",
      "#فرح_نوبي",
      "#النوبة",
      "#السعودية",
      "#موسيقى_نوبية",
      "#أفراح_نوبية",
      "#تراث_نوبي",
    ],
    hashtags_en: [
      "#MahmoudFawzy",
      "#NubianWedding",
      "#Nubia",
      "#SaudiArabia",
      "#NubianMusic",
      "#NubianWeddings",
      "#NubianHeritage",
    ],
  },
];
  /* =======================================================================
     DATA    Quiz (from the source document, verbatim questions/answers)
     ======================================================================= */
  const QUIZ = [
    { q:"ماذا تعني كلمة «نوب» في اللغة المصرية القديمة؟", q_en:"What does the word \"Nub\" mean in the ancient Egyptian language?", options:["الماء","الذهب","الشمس"], options_en:["Water","Gold","The sun"], correct:1 },
    { q:"ما الاسم الذي أطلقه النوبيون على أرضهم ويعني «أرض القوس»؟", q_en:"What name did the Nubians give their land, meaning \"the land of the bow\"?", options:["كوش","تا-سيتي","ميدجاي"], options_en:["Kush","Ta-Seti","Medjay"], correct:1 },
    { q:"من هو الملك النوبي الذي وحّد وادي النيل وحكم مصر؟", q_en:"Which Nubian king unified the Nile Valley and ruled Egypt?", options:["بعنخي","رمسيس الثاني","إخناتون"], options_en:["Piye","Ramesses II","Akhenaten"], correct:0 },
    { q:"ما الآلة الموسيقية التي تعتبر «روح» الموسيقى النوبية؟", q_en:"Which instrument is considered the \"soul\" of Nubian music?", options:["العود","الطنبور (الكيسر)","الناي"], options_en:["The oud","The tanbur (kissar)","The nay flute"], correct:1 },
    { q:"ماذا يرمز «المثلث» في الزخارف النوبية؟", q_en:"What does the \"triangle\" symbolize in Nubian decoration?", options:["النيل","الأهرامات أو الحماية","النخيل"], options_en:["The Nile","Pyramids or protection","Palm trees"], correct:1 },
    //    أُضيفت الأسئلة التالية بالاعتماد على محتوى الموقع نفسه كمرجع أساسي   
    { q:"ما أول دولة مركزية قامت في أفريقيا جنوب الصحراء؟", q_en:"What was the first centralized state in sub-Saharan Africa?", options:["مملكة كرمة","مملكة مروي","مملكة نبتة"], options_en:["The Kingdom of Kerma","The Kingdom of Meroë","The Kingdom of Napata"], correct:0 },
    { q:"بأي صناعة اشتهرت مملكة مروي، إلى جانب بناء مئات الأهرامات؟", q_en:"For which industry was the Kingdom of Meroë famous, besides building hundreds of pyramids?", options:["صناعة الحديد","صناعة الزجاج","صناعة الورق"], options_en:["Ironworking","Glassmaking","Papermaking"], correct:0 },
    { q:"بين أي عامين حكم ملوك الأسرة الخامسة والعشرين، الملقّبون بـ«الفراعنة السود»، مصر والنوبة معًا؟", q_en:"Between which years did the kings of the 25th Dynasty, known as the \"Black Pharaohs,\" rule Egypt and Nubia together?", options:["٧٤٤–٦٥٦ ق.م","١٠٧٠–٧٥٠ ق.م","٣٥٠–٥٥٠ م"], options_en:["744–656 BCE","1070–750 BCE","350–550 CE"], correct:0 },
    { q:"في أي قرن اعتنقت الممالك النوبية الثلاث (نوباتيا، المقرة، علوة) المسيحية؟", q_en:"In which century did the three Nubian kingdoms (Nobatia, Makuria, Alodia) adopt Christianity?", options:["القرن السادس الميلادي","القرن الثاني الميلادي","القرن الحادي عشر الميلادي"], options_en:["The 6th century CE","The 2nd century CE","The 11th century CE"], correct:0 },
    { q:"بين أي عامين أدى بناء السد العالي إلى غرق بلاد النوبة القديمة وتهجير أهلها؟", q_en:"Between which years did the building of the High Dam flood ancient Nubia and displace its people?", options:["١٩٦٠–١٩٧٠ م","١٩٠٢–١٩١٣ م","١٨٩٩–١٩٠٥ م"], options_en:["1960–1970 CE","1902–1913 CE","1899–1905 CE"], correct:0 },
    { q:"ما اسم اللهجة النوبية التي يتحدث بها نوبيو الجنوب؟", q_en:"What is the name of the Nubian dialect spoken by southern Nubians?", options:["الفاديجا","الكنزية","النوباتية"], options_en:["Fadicca","Kenzi","Nobatian"], correct:0 },
    { q:"من الذي اقترح استخدام اللغة النوبية كشفرة عسكرية في حرب أكتوبر ١٩٧٣؟", q_en:"Who proposed using the Nubian language as a military code in the October 1973 war?", options:["أحمد إدريس","محمد خليل قاسم","المشير طنطاوي"], options_en:["Ahmed Idris","Mohamed Khalil Qasim","Field Marshal Tantawy"], correct:0 },
    { q:"ما اسم أشهر رقصة نوبية جماعية تُؤدى بحركة الأكتاف والتصفيق الإيقاعي المتناغم؟", q_en:"What is the name of the best-known Nubian group dance, performed with shoulder movements and rhythmic clapping?", options:["رقصة الأراجيد","رقصة التنورة","رقصة السمسمية"], options_en:["The Aragid dance","The Tanoura dance","The Simsimiyya dance"], correct:0 },
    { q:"ماذا يرمز رسم «العقرب» على واجهات البيوت النوبية؟", q_en:"What does the \"scorpion\" motif on Nubian house facades symbolize?", options:["منع الحسد","الحماية من اللصوص","الخصوبة والبركة"], options_en:["Warding off envy","Protection from thieves","Fertility and blessing"], correct:0 },
    { q:"ما الاستخدام الأساسي لـ«المصطبة» في البيت النوبي؟", q_en:"What is the main use of the \"mastaba\" bench in a Nubian house?", options:["الجلوس واستقبال الضيوف","تخزين المياه","حفظ المحاصيل"], options_en:["Sitting and receiving guests","Storing water","Storing crops"], correct:0 },
    { q:"ما اسم موكب الزفاف الراقص الذي يُختتم به الزفاف النوبي؟", q_en:"What is the name of the dancing procession that concludes a Nubian wedding?", options:["الزفّة","السبوع","ليلة الحناء"], options_en:["The Zaffa","The Sabou'","Henna night"], correct:0 },
    { q:"ماذا تُسمّى حقيبة الهدايا الضخمة التي يقدّمها العريس النوبي؟", q_en:"What is the large bag of gifts presented by a Nubian groom called?", options:["الشيلة","الجرجار","القايمة"], options_en:["The Sheela","The Gargar","The Qayma"], correct:0 },
    { q:"أي رقم يُعتبر مقدّسًا في الطقوس النوبية القديمة، ويوافق تاريخ يوم النوبة العالمي؟", q_en:"Which number is considered sacred in ancient Nubian rituals, and matches the date of World Nubia Day?", options:["٧","٩","١٢"], options_en:["7","9","12"], correct:0 },
    { q:"ماذا يعني طبق «الملتوت» النوبي؟", q_en:"What is the Nubian dish \"Multot\"?", options:["العيش الشمسي التقليدي","مرقة اللحم","حلوى بالعسل"], options_en:["Traditional sun-baked bread","Meat stew","Honey sweets"], correct:0 },
    { q:"على أي مكوّن أساسي يعتمد المطبخ النوبي بشكل رئيسي؟", q_en:"What main ingredient does Nubian cuisine rely on most?", options:["الويكة (البامية المجففة المطحونة)","الأرز الأبيض","السمك المملح"], options_en:["Weka (ground dried okra)","White rice","Salted fish"], correct:0 },
    { q:"ما اسم الأواني الفخارية التقليدية التي تُستخدم لحفظ المياه وتبريدها طبيعيًا؟", q_en:"What are the traditional clay vessels used to store and naturally cool water called?", options:["الزير والقِلال","الطار والدف","الشيلة والجرجار"], options_en:["The zir and qilal","The tar and daf drums","The sheela and gargar"], correct:0 },
    { q:"من مؤلف رواية «الشمندورة» التي تناولت حياة النوبيين وتجربة التهجير؟", q_en:"Who wrote the novel \"El-Shamandoura,\" about Nubian life and the displacement experience?", options:["محمد خليل قاسم","إدريس علي","حجاج أدول"], options_en:["Mohamed Khalil Qasim","Idris Ali","Haggag Oddoul"], correct:0 },
    { q:"أي فنان نوبي عالمي نقل الموسيقى النوبية إلى المسارح العالمية عبر العزف على العود؟", q_en:"Which internationally acclaimed Nubian artist brought Nubian music to world stages through the oud?", options:["حمزة علاء الدين","علي كوبان","بحر أبو جريشة"], options_en:["Hamza El Din","Ali Kuban","Bahr Abu Gresha"], correct:0 },
    { q:"لأي إلهة كُرّس معبد فيلة؟", q_en:"To which goddess was the Temple of Philae dedicated?", options:["إيزيس","حتحور","نفرتيتي"], options_en:["Isis","Hathor","Nefertiti"], correct:0 },
    { q:"من مؤلف كتاب «اللغة النوبية: كيف نكتبها؟»", q_en:"Who wrote the book \"The Nubian Language: How Do We Write It?\"", options:["د. مختار خليل كبارة","محيي الدين شريف","إبراهيم شعراوي"], options_en:["Dr. Mokhtar Khalil Kabbara","Mohyeldin Sherif","Ibrahim Shaarawy"], correct:0 },
  ];
  const QUIZ_ROUND_SIZE = 8; // عدد الأسئلة المعروضة في كل محاولة (يُختار عشوائيًا من بنك الأسئلة الكامل)

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
     Theme toggle (in-memory only    safe for artifact previews & portable use)
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
  function isEn() { return lang === "en"; }
  const langButtons = $$(".lang-switch button");

  // Any JS-driven section (dictionary, gallery, quiz, video gallery…) that
  // needs to redraw its own text when the language changes registers a
  // callback here. Static markup is handled generically below via [data-en].
  const langRefreshHooks = [];
  function onLangChange(fn) { langRefreshHooks.push(fn); }

  // Generic attribute swap for things that aren't innerHTML: placeholder,
  // aria-label, title, alt. Element opts in with data-en-<attr>="English text".
  const ATTR_SWAPS = [
    ["placeholder", "enPlaceholder", "arPlaceholder"],
    ["aria-label",  "enAriaLabel",   "arAriaLabel"],
    ["title",       "enTitle",       "arTitle"],
    ["alt",         "enAlt",         "arAlt"],
  ];
  function swapAttr(el, attr, enKey, arKey) {
    if (lang === "en") {
      if (!el.dataset[arKey]) el.dataset[arKey] = el.getAttribute(attr) || "";
      el.setAttribute(attr, el.dataset[enKey]);
    } else if (el.dataset[arKey]) {
      el.setAttribute(attr, el.dataset[arKey]);
    }
  }

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
    ATTR_SWAPS.forEach(([attr, enKey, arKey]) => {
      $$(`[data-en-${attr}]`).forEach(el => swapAttr(el, attr, enKey, arKey));
    });
    const notice = $("#en-notice");
    if (notice) notice.style.display = lang === "en" ? "flex" : "none";
    const titleAr = "النوبة · حضارة تمتد لآلاف السنين";
    const titleEn = "Nubia · A Civilization Spanning Thousands of Years";
    document.title = lang === "en" ? titleEn : titleAr;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", lang === "en"
        ? "Discover the ancient civilization of Nubia    history, culture, language, crafts, cuisine and landmarks in Aswan"
        : "اكتشف حضارة النوبة العريقة    التاريخ، الثقافة، اللغة، الحرف، المطبخ، والمعالم في أسوان");
    }
    $$(".counter-num[data-count]").forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (el.textContent !== "0") el.textContent = target.toLocaleString(lang === "en" ? "en-US" : "ar-EG");
    });
    // Re-render every JS-driven dynamic section in the newly selected language.
    langRefreshHooks.forEach(fn => { try { fn(); } catch (e) { /* keep going even if one hook fails */ } });
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
  function readMoreLabel(expanded) {
    if (isEn()) return expanded ? "Read less" : "Read more";
    return expanded ? "اقرأ أقل" : "اقرأ المزيد";
  }
  $$(".figure-card .f-more").forEach(btn => {
    on(btn, "click", () => {
      const card = btn.closest(".figure-card");
      const expanded = card.classList.toggle("is-expanded");
      btn.textContent = readMoreLabel(expanded);
    });
  });
  onLangChange(() => {
    $$(".figure-card .f-more").forEach(btn => {
      const card = btn.closest(".figure-card");
      btn.textContent = readMoreLabel(card.classList.contains("is-expanded"));
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
        <button type="button" class="vgallery-thumb${i === vIndex ? " active" : ""}" data-i="${i}" aria-label="${isEn() ? v.title_en : v.title}">
          <img src="${v.poster}" alt="" loading="lazy" onerror="this.style.opacity='0'">
        </button>`).join("");
    }

    // Updates only the text/info panel for video i, in the current language   
    // does NOT touch the <video> element, so switching language never
    // interrupts or restarts a video the visitor is currently watching.
    function renderInfo(i) {
      const v = NUBIAN_VIDEOS[i];
      infoBox.classList.remove("is-in");
      void infoBox.offsetWidth;
      const cats = isEn() ? v.category_en : v.category;
      const tags = isEn() ? v.hashtags_en : v.hashtags;
      infoTags.innerHTML = cats.map(c => `<span class="vgallery-tag">${c}</span>`).join("");
      infoTitle.textContent = isEn() ? v.title_en : v.title;
      infoArtist.textContent = isEn() ? v.artist_en : v.artist;
      infoDesc.textContent = isEn() ? v.description_en : v.description;
      infoHashtags.innerHTML = tags.map(h => `<span class="vgallery-hashtag">${h}</span>`).join("");
      infoBox.classList.add("is-in");
      counterEl.textContent = String(i + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    }

    function renderVideo(i) {
      const v = NUBIAN_VIDEOS[i];
      videoEl.pause();
      videoEl.poster = v.poster;
      sourceEl.src = v.videoSrc;
      videoEl.load();
      frameBgEl.style.backgroundImage = `url(${v.poster})`;
      renderInfo(i);
      $$(".vgallery-thumb", thumbsWrap).forEach((btn, idx) => btn.classList.toggle("active", idx === i));
    }

    onLangChange(() => { renderThumbs(); renderInfo(vIndex); });

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
     Hero parallax + crossfade    kept subtle and minimal
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
      u.lang = isEn() ? "en-US" : "ar-EG";
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* no-op: speech synthesis unsupported */ }
  }

  function renderDictCategories() {
    if (!dictCats) return;
    const counts = { all: DICTIONARY.words.length };
    DICTIONARY.categories.forEach(c => counts[c.key] = DICTIONARY.words.filter(w => w.cat === c.key).length);
    const allLabel = isEn() ? "All" : "الكل";
    const allBtn = `<button data-cat="all" class="${activeCat==='all'?'active':''}"><span class="cat-label"><span class="cat-dot"></span>${allLabel}</span><span class="count">${counts.all}</span></button>`;
    const rest = DICTIONARY.categories.map(c =>
      `<button data-cat="${c.key}" class="${activeCat===c.key?'active':''}"><span class="cat-label"><span class="cat-dot"></span>${isEn() ? c.en : c.label}</span><span class="count">${counts[c.key]}</span></button>`
    ).join("");
    dictCats.innerHTML = allBtn + rest;
    $$("button", dictCats).forEach(b => on(b, "click", () => { activeCat = b.dataset.cat; renderDictCategories(); renderDictGrid(); }));
  }

  function renderDictGrid() {
    if (!dictGrid) return;
    const q = (dictSearch && dictSearch.value.trim().toLowerCase()) || "";
    const list = DICTIONARY.words.filter(w => {
      const matchesCat = activeCat === "all" || w.cat === activeCat;
      const hay = `${w.ar} ${w.en} ${w.fadicca} ${w.kenzi}`.toLowerCase();
      const matchesQ = !q || hay.includes(q);
      return matchesCat && matchesQ;
    });
    if (dictCount) {
      dictCount.textContent = isEn()
        ? `${list.length.toLocaleString("en-US")} word${list.length === 1 ? "" : "s"}`
        : `${list.length.toLocaleString("ar-EG")} كلمة`;
    }
    if (!list.length) {
      dictGrid.innerHTML = isEn()
        ? `<div class="dict-empty">No matches for your search    try another word.</div>`
        : `<div class="dict-empty">لا توجد نتائج مطابقة لبحثك    جرّب كلمة أخرى.</div>`;
      return;
    }
    const bothLabel = isEn() ? "Both dialects" : "اللهجتان";
    const fadLabel = isEn() ? "Fadicca" : "الفاديجا";
    const kenLabel = isEn() ? "Kenzi" : "الكنزية";
    const flipHint = isEn() ? "Tap to see the translation" : "انقر لعرض الترجمة";
    const favLabel = isEn() ? "Add to favorites" : "إضافة للمفضلة";
    const playAriaTitle = isEn() ? "Approximate pronunciation" : "استماع تقريبي";
    const playApproxLabel = isEn() ? "Approximate pronunciation" : "نطق تقريبي";
    const playTitle = isEn()
      ? "Approximate pronunciation (synthesized speech, not verified Nubian pronunciation)"
      : "استماع تقريبي (تركيب صوتي آلي وليس نطقًا نوبيًا موثّقًا)";
    dictGrid.innerHTML = list.map((w, i) => {
      const cat = DICTIONARY.categories.find(c => c.key === w.cat) || {};
      const catLabel = isEn() ? (cat.en || "") : (cat.label || "");
      // favKey always keyed on the stable Arabic form, so favorites survive a language switch
      const favKey = `${w.cat}-${i}-${w.ar}`;
      const isFav = favorites.has(favKey);
      const frontWord = isEn() ? w.en : w.ar;
      const sameDialect = w.fadicca === w.kenzi;
      const dialectsHtml = sameDialect
        ? `<div class="fc-dia-row fc-dia-both"><span class="fc-dia-dot"></span><b>${bothLabel}</b><span class="fc-dia-val">${w.fadicca}</span></div>`
        : `<div class="fc-dia-row"><span class="fc-dia-dot fc-dia-dot--fad"></span><b>${fadLabel}</b><span class="fc-dia-val">${w.fadicca}</span></div>
           <div class="fc-dia-row"><span class="fc-dia-dot fc-dia-dot--ken"></span><b>${kenLabel}</b><span class="fc-dia-val">${w.kenzi}</span></div>`;
      return `
      <div class="flashcard" data-fav-key="${favKey}" data-cat="${w.cat}">
        <div class="flashcard-inner">
          <div class="fc-face front">
            <div class="fc-face-top">
              <span class="fc-cat">${catLabel}</span>
              <span class="fc-flip-hint" aria-hidden="true" title="${flipHint}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.9V12a9 9 0 019-9h9"/><path d="M7 21.9l-4-4 4-4"/><path d="M21 11.1V12a9 9 0 01-9 9H3"/></svg>
              </span>
            </div>
            <span class="fc-ar">${frontWord}</span>
            <div class="fc-bottom">
              <button class="fc-fav ${isFav?'active':''}" aria-label="${favLabel}" data-action="fav">
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
              <button class="fc-play" data-action="play" aria-label="${playAriaTitle}" title="${playTitle}">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <span class="fc-approx-label">${playApproxLabel}</span>
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
        const word = card.querySelector(".fc-ar")?.textContent || "";
        speak(word);
      });
    });
  }

  on(dictSearch, "input", renderDictGrid);
  renderDictCategories();
  renderDictGrid();
  onLangChange(() => { renderDictCategories(); renderDictGrid(); });

  // Word of the day    deterministic by day-of-year, no server needed
  const wordOfDayEl = $("#word-of-day-content");
  function renderWordOfDay() {
    if (!wordOfDayEl) return;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000);
    const w = DICTIONARY.words[dayOfYear % DICTIONARY.words.length];
    const word = isEn() ? w.en : w.ar;
    const meanLabel = isEn() ? `Fadicca: ${w.fadicca} · Kenzi: ${w.kenzi}` : `الفاديجا: ${w.fadicca} · الكنزية: ${w.kenzi}`;
    wordOfDayEl.innerHTML = `<div class="wd-word">${word}</div><div class="wd-mean">${meanLabel}</div>`;
  }
  renderWordOfDay();
  onLangChange(renderWordOfDay);

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
      const resultMsg = isEn()
        ? `Well done! Your score: ${gameScore} / ${gameRounds.length} 🌟`
        : `أحسنت! نتيجتك ${gameScore} من ${gameRounds.length} 🌟`;
      const restartLabel = isEn() ? "Play again" : "إعادة اللعب";
      gameArea.innerHTML = `
        <div class="game-result">${resultMsg}</div>
        <div class="btn-row" style="justify-content:center;margin-top:20px;">
          <button class="btn btn-primary" id="dict-game-restart">${restartLabel}</button>
        </div>`;
      on($("#dict-game-restart"), "click", startGame);
      return;
    }
    const current = gameRounds[gameRound];
    const distractors = shuffled(DICTIONARY.words.filter(w => w.ar !== current.ar)).slice(0, 3).map(w => w.fadicca);
    const options = shuffled([current.fadicca, ...distractors]);
    const hint = isEn() ? "What is this word's Fadicca equivalent?" : "ما مقابل هذه الكلمة باللهجة الفاديجا؟";
    gameArea.innerHTML = `
      <div class="game-progress">${gameRounds.map((_, i) => `<span class="${i < gameRound ? 'done' : ''}"></span>`).join("")}</div>
      <div class="game-word">${isEn() ? current.en : current.ar}</div>
      <div class="game-hint">${hint}</div>
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
  onLangChange(() => { if (gameArea && gameArea.style.display === "block") renderGameRound(); });

  /* =======================================================================
     Gallery masonry + filters + lightbox
     ======================================================================= */
  const galleryGrid = $("#gallery-grid");
  const galleryFilters = $("#gallery-filters");
  let galleryActive = "all";

  function renderGalleryFilters() {
    if (!galleryFilters) return;
    galleryFilters.innerHTML = GALLERY_FILTERS.map(f =>
      `<button class="${galleryActive===f.key?'active':''}" data-filter="${f.key}">${isEn() ? f.label_en : f.label}</button>`
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
    galleryGrid.innerHTML = GALLERY.map((g, i) => {
      const alt = isEn() ? g.alt_en : g.alt;
      return `
      <div class="masonry-item" data-tag="${g.tag}" data-index="${i}">
        <picture>
          <source srcset="${IMG}${g.base}-thumb.jpg" type="image/jpeg">
          <img src="${IMG}${g.base}-thumb.jpg" alt="${alt}" loading="lazy" width="480" height="360">
        </picture>
        <div class="m-overlay">${alt}</div>
      </div>`;
    }).join("");
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
    const alt = isEn() ? g.alt_en : g.alt;
    const label = isEn() ? g.label_en : g.label;
    lbImg.src = `${IMG}${g.base}-thumb.jpg`;
    lbImg.alt = alt;
    lbCaption.textContent = `${alt}    ${label}`;
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
  onLangChange(() => {
    renderGalleryFilters();
    renderGallery();
    applyGalleryFilter();
    if (lightbox && lightbox.classList.contains("open")) updateLightbox();
  });

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

    if (track) {
        track.style.transform = `translate3d(-${testiIndex * 100}%, 0, 0)`;
    }

    renderTestiDots();
}
 on($("#testi-prev"), "click", () => {
    testiIndex =
        (testiIndex - 1 + testiSlides.length) % testiSlides.length;

    updateTesti();
});

on($("#testi-next"), "click", () => {
    testiIndex =
        (testiIndex + 1) % testiSlides.length;

    updateTesti();
}); if (testiSlides.length) {
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
  let quizRound = QUIZ; // مجموعة الأسئلة الفعلية للمحاولة الحالية (عيّنة عشوائية من بنك الأسئلة)

  function renderQuiz() {
    const q = quizRound[quizIndex];
    $("#quiz-progress-label").textContent = isEn()
      ? `Question ${quizIndex + 1} of ${quizRound.length}`
      : `سؤال ${quizIndex + 1} من ${quizRound.length}`;
    $("#quiz-question").textContent = isEn() ? q.q_en : q.q;
    const opts = isEn() ? q.options_en : q.options;
    $("#quiz-options").innerHTML = opts.map((opt, i) => `<button data-i="${i}">${opt}</button>`).join("");
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
        if (quizIndex < quizRound.length) renderQuiz();
        else showQuizFinal();
      }, 1000);
    }));
  }
  function quizFinalMessage() {
    if (quizScore === quizRound.length) return isEn() ? "Amazing! You're a true Nubian heritage expert 🏆" : "مبهر! أنت خبير في تراث النوبة 🏆";
    if (quizScore >= quizRound.length - 1) return isEn() ? "Wonderful! Your knowledge of Nubia runs deep." : "رائع! معرفتك بالنوبة عميقة جدًا.";
    return isEn() ? "A lovely start on your journey into Nubia!" : "بداية جميلة في رحلة التعرف على النوبة!";
  }
  function renderQuizFinalText() {
    $("#quiz-score-num").textContent = `${quizScore}/${quizRound.length}`;
    $("#quiz-final-msg").textContent = quizFinalMessage();
  }
  function showQuizFinal() {
    quizPlay.style.display = "none";
    quizFinal.style.display = "block";
    renderQuizFinalText();
  }
  function withShuffledOptions(q) {
    const order = shuffled(q.options.map((_, i) => i));
    return {
      q: q.q, q_en: q.q_en,
      options: order.map(i => q.options[i]),
      options_en: order.map(i => q.options_en[i]),
      correct: order.indexOf(q.correct),
    };
  }
  function startQuizRound() {
    quizRound = shuffled(QUIZ).slice(0, Math.min(QUIZ_ROUND_SIZE, QUIZ.length)).map(withShuffledOptions);
    quizIndex = 0; quizScore = 0;
  }
  on($("#quiz-start-btn"), "click", () => {
    startQuizRound();
    quizStart.style.display = "none";
    quizFinal.style.display = "none";
    quizPlay.style.display = "block";
    renderQuiz();
  });
  on($("#quiz-restart-btn"), "click", () => {
    startQuizRound();
    quizFinal.style.display = "none";
    quizPlay.style.display = "block";
    renderQuiz();
  });
  onLangChange(() => {
    if (quizPlay.style.display === "block") renderQuiz();
    else if (quizFinal.style.display === "block") renderQuizFinalText();
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
      note.textContent = isEn()
        ? "Thanks for joining    we'll send you the latest Nubian stories."
        : "شكرًا لانضمامك    سنراسلك بجديد حكايات النوبة.";
      input.value = "";
    } else if (note) {
      note.textContent = isEn() ? "Please enter a valid email address." : "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
    }
  });

  /* =======================================================================
     Current year in footer
     ======================================================================= */
  const yearEl = $("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
