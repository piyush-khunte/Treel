/*!
 * Suraksha multilingual sub-headline rotator
 * Self-hosted replacement for third-party "dynamic text" widgets.
 * MagicWorks IT Solutions for Treel Mobility Solutions Pvt. Ltd.
 *
 * USAGE
 *   <div class="srk-rotator" data-page="5.3">फिट करवाइए, चालू कीजिए और चलाइए।</div>
 *   <script src="/js/suraksha-rotator.js" defer><\/script>
 *
 *   Keep the Hindi line inside the div. It shows before the script loads,
 *   for visitors without JavaScript, and for search engines.
 *
 * OPTIONS (data attributes on the div, all optional)
 *   data-page      Page key from SUBHEADLINES below, e.g. "5.3"
 *   data-interval  Time each language stays on screen, in ms (default 2800)
 *   data-start     Language code to show first (default "hi")
 *   data-order     Comma list to override the sequence, e.g. "hi,ta,te"
 *
 *   Custom lines without a page key (e.g. from the CMS):
 *   <div class="srk-rotator">
 *     <span lang="hi">...</span>
 *     <span lang="ta">...</span>
 *   </div>
 *
 * BEHAVIOUR
 *   - All lines are stacked in one grid cell, so the box is always as tall
 *     as the longest line. No layout shift when the language changes.
 *   - Pauses when off screen, when the tab is hidden, and on hover/focus.
 *   - prefers-reduced-motion: shows Hindi only, no animation.
 *   - Screen readers hear the Hindi line once; rotating copies are hidden.
 *   - Colour, size and alignment are inherited from the parent element,
 *     so style it like any other sub-headline.
 */
(function () {
  "use strict";

  // GIF / display sequence, as approved
  var ORDER = ["ml", "hi", "gu", "ta", "te", "kn", "pa", "bn"];

  var FONTS = {
    ml: "'Baloo Chettan 2'",
    hi: "'Baloo 2'",
    gu: "'Baloo Bhai 2'",
    ta: "'Baloo Thambi 2'",
    te: "'Baloo Tammudu 2'",
    kn: "'Baloo Tamma 2'",
    pa: "'Baloo Paaji 2'",
    bn: "'Baloo Da 2'"
  };

  // Translations pending native-speaker review. Edit here only.
  var SUBHEADLINES = {
    // Suraksha Homepage  /suraksha
    "5.1": {
      ml: "നിങ്ങളുടെ കുടുംബത്തിന്റെ സുരക്ഷ.",
      hi: "आपके परिवार की सुरक्षा।",
      gu: "તમારા પરિવારની સુરક્ષા.",
      ta: "உங்கள் குடும்பத்தின் பாதுகாப்பு.",
      te: "మీ కుటుంబ భద్రత.",
      kn: "ನಿಮ್ಮ ಕುಟುಂಬದ ಸುರಕ್ಷತೆ.",
      pa: "ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਦੀ ਸੁਰੱਖਿਆ।",
      bn: "আপনার পরিবারের সুরক্ষা।",
    },
    // Product detail  /suraksha/product
    "5.2": {
      ml: "ഒരു ഡിസ്‌പ്ലേ, നാല് സെൻസറുകൾ. വേറൊന്നും വേണ്ട.",
      hi: "एक डिस्प्ले, चार सेंसर। और कुछ नहीं चाहिए।",
      gu: "એક ડિસ્પ્લે, ચાર સેન્સર. બીજું કંઈ જોઈએ નહીં.",
      ta: "ஒரு டிஸ்ப்ளே, நான்கு சென்சார்கள். வேறு எதுவும் தேவையில்லை.",
      te: "ఒక డిస్‌ప్లే, నాలుగు సెన్సార్లు. ఇంకేమీ అవసరం లేదు.",
      kn: "ಒಂದು ಡಿಸ್‌ಪ್ಲೇ, ನಾಲ್ಕು ಸೆನ್ಸರ್‌ಗಳು. ಬೇರೇನೂ ಬೇಕಿಲ್ಲ.",
      pa: "ਇੱਕ ਡਿਸਪਲੇ, ਚਾਰ ਸੈਂਸਰ। ਹੋਰ ਕੁਝ ਨਹੀਂ ਚਾਹੀਦਾ।",
      bn: "একটি ডিসপ্লে, চারটি সেন্সর। আর কিছু লাগবে না।",
    },
    // How it works  /suraksha/how-it-works
    "5.3": {
      ml: "ഫിറ്റ് ചെയ്യൂ, ഓൺ ചെയ്യൂ, ഓടിക്കൂ.",
      hi: "फिट करवाइए, चालू कीजिए और चलाइए।",
      gu: "ફિટ કરાવો, ચાલુ કરો અને ચલાવો.",
      ta: "பொருத்துங்கள், ஆன் செய்யுங்கள், ஓட்டுங்கள்.",
      te: "ఫిట్ చేయించండి, ఆన్ చేయండి, నడపండి.",
      kn: "ಫಿಟ್ ಮಾಡಿಸಿ, ಆನ್ ಮಾಡಿ, ಓಡಿಸಿ.",
      pa: "ਫਿੱਟ ਕਰਵਾਓ, ਚਾਲੂ ਕਰੋ ਅਤੇ ਚਲਾਓ।",
      bn: "ফিট করান, চালু করুন আর চালান।",
    },
    // Pricing  /suraksha/pricing
    "5.4": {
      ml: "നിങ്ങളുടെ ട്രക്കിന്റെ ചക്രങ്ങൾക്കനുസരിച്ച് ശരിയായ വില.",
      hi: "आपके ट्रक के पहियों के हिसाब से सही कीमत।",
      gu: "તમારા ટ્રકના પૈડાં પ્રમાણે યોગ્ય કિંમત.",
      ta: "உங்கள் டிரக்கின் சக்கரங்களுக்கு ஏற்ற சரியான விலை.",
      te: "మీ ట్రక్ చక్రాలకు తగిన సరైన ధర.",
      kn: "ನಿಮ್ಮ ಟ್ರಕ್‌ನ ಚಕ್ರಗಳಿಗೆ ತಕ್ಕ ಸರಿಯಾದ ಬೆಲೆ.",
      pa: "ਤੁਹਾਡੇ ਟਰੱਕ ਦੇ ਪਹੀਆਂ ਦੇ ਹਿਸਾਬ ਨਾਲ ਸਹੀ ਕੀਮਤ।",
      bn: "আপনার ট্রাকের চাকা অনুযায়ী সঠিক দাম।",
    },
    // EMI  /suraksha/emi
    "5.5": {
      ml: "എളുപ്പമുള്ള തവണകളിൽ ഇന്നുതന്നെ സുരക്ഷ ഘടിപ്പിക്കൂ.",
      hi: "आसान किस्तों में आज ही सुरक्षा लगवाइए।",
      gu: "સરળ હપ્તામાં આજે જ સુરક્ષા લગાવો.",
      ta: "எளிய தவணைகளில் இன்றே சுரக்ஷா பொருத்துங்கள்.",
      te: "సులభ వాయిదాలలో ఈరోజే సురక్ష అమర్చుకోండి.",
      kn: "ಸುಲಭ ಕಂತುಗಳಲ್ಲಿ ಇಂದೇ ಸುರಕ್ಷಾ ಅಳವಡಿಸಿ.",
      pa: "ਆਸਾਨ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਅੱਜ ਹੀ ਸੁਰਕਸ਼ਾ ਲਗਵਾਓ।",
      bn: "সহজ কিস্তিতে আজই সুরক্ষা লাগান।",
    },
    // EMI Apply  /suraksha/emi/apply
    "5.6": {
      ml: "ഏകദേശം 10 മിനിറ്റിൽ നിങ്ങളുടെ അപേക്ഷ പൂർത്തിയാകും.",
      hi: "लगभग 10 मिनट में आपकी एप्लिकेशन पूरी।",
      gu: "લગભગ 10 મિનિટમાં તમારી અરજી પૂરી.",
      ta: "சுமார் 10 நிமிடங்களில் உங்கள் விண்ணப்பம் முடியும்.",
      te: "సుమారు 10 నిమిషాల్లో మీ దరఖాస్తు పూర్తి.",
      kn: "ಸುಮಾರು 10 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಅರ್ಜಿ ಪೂರ್ಣ.",
      pa: "ਲਗਭਗ 10 ਮਿੰਟਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਪੂਰੀ।",
      bn: "প্রায় 10 মিনিটে আপনার আবেদন সম্পূর্ণ।",
    },
    // EMI Apply Success  /suraksha/emi/apply/success
    "5.7": {
      ml: "സ്ഥിരീകരണ സന്ദേശം ഉടൻ ലഭിക്കും.",
      hi: "आपको जल्द ही पुष्टि का मैसेज मिलेगा।",
      gu: "તમને જલ્દી જ પુષ્ટિનો મેસેજ મળશે.",
      ta: "விரைவில் உறுதிப்படுத்தல் செய்தி வரும்.",
      te: "త్వరలోనే మీకు నిర్ధారణ మెసేజ్ వస్తుంది.",
      kn: "ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ದೃಢೀಕರಣ ಮೆಸೇಜ್ ಬರುತ್ತದೆ.",
      pa: "ਤੁਹਾਨੂੰ ਜਲਦੀ ਹੀ ਪੁਸ਼ਟੀ ਦਾ ਮੈਸੇਜ ਮਿਲੇਗਾ।",
      bn: "শীঘ্রই আপনি নিশ্চিতকরণ মেসেজ পাবেন।",
    },
    // Why Suraksha  /suraksha/why-suraksha
    "5.8": {
      ml: "ഡ്രൈവർമാർ സുരക്ഷ ഘടിപ്പിക്കുന്നതിന്റെ മൂന്ന് കാരണങ്ങൾ.",
      hi: "तीन वजह, क्यों ड्राइवर सुरक्षा लगवाते हैं।",
      gu: "ત્રણ કારણ, શા માટે ડ્રાઇવરો સુરક્ષા લગાવે છે.",
      ta: "டிரைவர்கள் சுரக்ஷா பொருத்துவதற்கான மூன்று காரணங்கள்.",
      te: "డ్రైవర్లు సురక్ష ఎందుకు అమర్చుకుంటారో మూడు కారణాలు.",
      kn: "ಡ್ರೈವರ್‌ಗಳು ಸುರಕ್ಷಾ ಅಳವಡಿಸಲು ಮೂರು ಕಾರಣಗಳು.",
      pa: "ਤਿੰਨ ਕਾਰਨ, ਡਰਾਈਵਰ ਸੁਰਕਸ਼ਾ ਕਿਉਂ ਲਗਵਾਉਂਦੇ ਹਨ।",
      bn: "তিনটি কারণ, কেন ড্রাইভাররা সুরক্ষা লাগান।",
    },
    // Safety  /suraksha/safety
    "5.9": {
      ml: "ഓരോ ടയറിലും ശ്രദ്ധ, ഓരോ യാത്രയും സുരക്ഷിതം.",
      hi: "हर टायर पर नज़र, हर सफ़र सुरक्षित।",
      gu: "દરેક ટાયર પર નજર, દરેક સફર સુરક્ષિત.",
      ta: "ஒவ்வொரு டயர் மீதும் கவனம், ஒவ்வொரு பயணமும் பாதுகாப்பு.",
      te: "ప్రతి టైర్‌పై నిఘా, ప్రతి ప్రయాణం సురక్షితం.",
      kn: "ಪ್ರತಿ ಟೈರ್ ಮೇಲೆ ನಿಗಾ, ಪ್ರತಿ ಪ್ರಯಾಣ ಸುರಕ್ಷಿತ.",
      pa: "ਹਰ ਟਾਇਰ 'ਤੇ ਨਜ਼ਰ, ਹਰ ਸਫ਼ਰ ਸੁਰੱਖਿਅਤ।",
      bn: "প্রতিটি টায়ারে নজর, প্রতিটি যাত্রা নিরাপদ।",
    },
    // Savings  /suraksha/savings
    "5.10": {
      ml: "ഡീസൽ, ടയർ, വഴിയിലെ ചെലവുകൾ എന്നിവയിൽ ലാഭം.",
      hi: "डीज़ल, टायर और सड़क पर होने वाले खर्च में बचत।",
      gu: "ડીઝલ, ટાયર અને રસ્તા પરના ખર્ચમાં બચત.",
      ta: "டீசல், டயர் மற்றும் சாலைச் செலவுகளில் சேமிப்பு.",
      te: "డీజిల్, టైర్లు, రోడ్డు ఖర్చులలో ఆదా.",
      kn: "ಡೀಸೆಲ್, ಟೈರ್ ಮತ್ತು ರಸ್ತೆ ಖರ್ಚುಗಳಲ್ಲಿ ಉಳಿತಾಯ.",
      pa: "ਡੀਜ਼ਲ, ਟਾਇਰ ਅਤੇ ਸੜਕ 'ਤੇ ਹੋਣ ਵਾਲੇ ਖਰਚੇ ਵਿੱਚ ਬੱਚਤ।",
      bn: "ডিজেল, টায়ার আর রাস্তার খরচে সাশ্রয়।",
    },
    // Simplicity  /suraksha/simplicity
    "5.11": {
      ml: "ആപ്പില്ല, സബ്‌സ്‌ക്രിപ്‌ഷനില്ല, മെക്കാനിക്കില്ല.",
      hi: "न ऐप, न सब्सक्रिप्शन, न मैकेनिक।",
      gu: "ન એપ, ન સબ્સ્ક્રિપ્શન, ન મિકેનિક.",
      ta: "ஆப் இல்லை, சந்தா இல்லை, மெக்கானிக் இல்லை.",
      te: "యాప్ లేదు, సబ్‌స్క్రిప్షన్ లేదు, మెకానిక్ లేదు.",
      kn: "ಆ್ಯಪ್ ಇಲ್ಲ, ಚಂದಾದಾರಿಕೆ ಇಲ್ಲ, ಮೆಕ್ಯಾನಿಕ್ ಇಲ್ಲ.",
      pa: "ਨਾ ਐਪ, ਨਾ ਸਬਸਕ੍ਰਿਪਸ਼ਨ, ਨਾ ਮਕੈਨਿਕ।",
      bn: "না অ্যাপ, না সাবস্ক্রিপশন, না মেকানিক।",
    },
    // Centres  /suraksha/centres
    "5.12": {
      ml: "നിങ്ങളുടെ റൂട്ടിൽ, നിങ്ങളുടെ അടുത്ത്.",
      hi: "आपके रूट पर, आपके पास।",
      gu: "તમારા રૂટ પર, તમારી નજીક.",
      ta: "உங்கள் வழித்தடத்தில், உங்கள் அருகில்.",
      te: "మీ రూట్‌లో, మీకు దగ్గరలో.",
      kn: "ನಿಮ್ಮ ಮಾರ್ಗದಲ್ಲಿ, ನಿಮ್ಮ ಹತ್ತಿರ.",
      pa: "ਤੁਹਾਡੇ ਰੂਟ 'ਤੇ, ਤੁਹਾਡੇ ਨੇੜੇ।",
      bn: "আপনার রুটে, আপনার কাছেই।",
    },
    // Testimonials  /suraksha/testimonials
    "5.13": {
      ml: "ഡ്രൈവർമാരുടെ വാക്കുകളിൽ സുരക്ഷയുടെ കഥ.",
      hi: "ड्राइवरों की ज़ुबानी, सुरक्षा की कहानी।",
      gu: "ડ્રાઇવરોના શબ્દોમાં, સુરક્ષાની કહાણી.",
      ta: "டிரைவர்களின் வார்த்தைகளில் சுரக்ஷாவின் கதை.",
      te: "డ్రైవర్ల మాటల్లో సురక్ష కథ.",
      kn: "ಡ್ರೈವರ್‌ಗಳ ಮಾತಿನಲ್ಲಿ ಸುರಕ್ಷಾ ಕಥೆ.",
      pa: "ਡਰਾਈਵਰਾਂ ਦੀ ਜ਼ੁਬਾਨੀ, ਸੁਰਕਸ਼ਾ ਦੀ ਕਹਾਣੀ।",
      bn: "ড্রাইভারদের মুখে সুরক্ষার গল্প।",
    },
    // FAQs  /suraksha/faqs
    "5.15": {
      ml: "സുരക്ഷയെക്കുറിച്ച് എല്ലാം, ലളിതമായ ഭാഷയിൽ.",
      hi: "सुरक्षा के बारे में सब कुछ, आसान भाषा में।",
      gu: "સુરક્ષા વિશે બધું, સરળ ભાષામાં.",
      ta: "சுரக்ஷா பற்றி எல்லாம், எளிய மொழியில்.",
      te: "సురక్ష గురించి అన్నీ, సులభమైన భాషలో.",
      kn: "ಸುರಕ್ಷಾ ಬಗ್ಗೆ ಎಲ್ಲವೂ, ಸರಳ ಭಾಷೆಯಲ್ಲಿ.",
      pa: "ਸੁਰਕਸ਼ਾ ਬਾਰੇ ਸਭ ਕੁਝ, ਆਸਾਨ ਭਾਸ਼ਾ ਵਿੱਚ।",
      bn: "সুরক্ষা সম্পর্কে সবকিছু, সহজ ভাষায়।",
    },
    // Support hub  /suraksha/support
    "5.16": {
      ml: "വിളിക്കൂ, വാട്ട്‌സ്ആപ്പ് ചെയ്യൂ, അല്ലെങ്കിൽ ഉത്തരങ്ങൾ വായിക്കൂ.",
      hi: "कॉल कीजिए, व्हाट्सऐप कीजिए या जवाब पढ़िए।",
      gu: "કૉલ કરો, વૉટ્સએપ કરો અથવા જવાબ વાંચો.",
      ta: "அழையுங்கள், வாட்ஸ்அப் செய்யுங்கள் அல்லது பதில்களைப் படியுங்கள்.",
      te: "కాల్ చేయండి, వాట్సాప్ చేయండి లేదా సమాధానాలు చదవండి.",
      kn: "ಕರೆ ಮಾಡಿ, ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಮಾಡಿ ಅಥವಾ ಉತ್ತರಗಳನ್ನು ಓದಿ.",
      pa: "ਕਾਲ ਕਰੋ, ਵਟਸਐਪ ਕਰੋ ਜਾਂ ਜਵਾਬ ਪੜ੍ਹੋ।",
      bn: "কল করুন, হোয়াটসঅ্যাপ করুন বা উত্তর পড়ুন।",
    },
    // Contact  /suraksha/contact
    "5.17": {
      ml: "എന്ത് ചോദ്യമായാലും ഞങ്ങളോട് ചോദിക്കൂ.",
      hi: "कोई भी सवाल हो, हमसे पूछिए।",
      gu: "કોઈ પણ સવાલ હોય, અમને પૂછો.",
      ta: "எந்தக் கேள்வியாக இருந்தாலும் எங்களிடம் கேளுங்கள்.",
      te: "ఏ ప్రశ్న అయినా మమ్మల్ని అడగండి.",
      kn: "ಯಾವುದೇ ಪ್ರಶ್ನೆ ಇರಲಿ, ನಮ್ಮನ್ನು ಕೇಳಿ.",
      pa: "ਕੋਈ ਵੀ ਸਵਾਲ ਹੋਵੇ, ਸਾਨੂੰ ਪੁੱਛੋ।",
      bn: "যেকোনো প্রশ্ন থাকলে আমাদের জিজ্ঞাসা করুন।",
    },
    // WhatsApp  /suraksha/whatsapp
    "5.18": {
      ml: "ഒരു മെസേജ് അയക്കൂ, ഉടൻ മറുപടി നേടൂ.",
      hi: "एक मैसेज भेजिए, तुरंत जवाब पाइए।",
      gu: "એક મેસેજ મોકલો, તરત જવાબ મેળવો.",
      ta: "ஒரு மெசேஜ் அனுப்புங்கள், உடனே பதில் பெறுங்கள்.",
      te: "ఒక మెసేజ్ పంపండి, వెంటనే జవాబు పొందండి.",
      kn: "ಒಂದು ಮೆಸೇಜ್ ಕಳುಹಿಸಿ, ತಕ್ಷಣ ಉತ್ತರ ಪಡೆಯಿರಿ.",
      pa: "ਇੱਕ ਮੈਸੇਜ ਭੇਜੋ, ਤੁਰੰਤ ਜਵਾਬ ਪਾਓ।",
      bn: "একটি মেসেজ পাঠান, সঙ্গে সঙ্গে উত্তর পান।",
    },
    // Callback request  /suraksha/callback
    "5.19": {
      ml: "നിങ്ങളുടെ സമയവും ഭാഷയും തിരഞ്ഞെടുക്കൂ.",
      hi: "अपना समय और अपनी भाषा चुनिए।",
      gu: "તમારો સમય અને તમારી ભાષા પસંદ કરો.",
      ta: "உங்கள் நேரத்தையும் மொழியையும் தேர்ந்தெடுங்கள்.",
      te: "మీ సమయం, మీ భాష ఎంచుకోండి.",
      kn: "ನಿಮ್ಮ ಸಮಯ ಮತ್ತು ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ.",
      pa: "ਆਪਣਾ ਸਮਾਂ ਅਤੇ ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ।",
      bn: "আপনার সময় আর আপনার ভাষা বেছে নিন।",
    },
    // Callback success  /suraksha/callback/success
    "5.20": {
      ml: "നിങ്ങൾ തിരഞ്ഞെടുത്ത സമയത്ത് ഞങ്ങൾ വിളിക്കും.",
      hi: "आपके चुने हुए समय पर हम कॉल करेंगे।",
      gu: "તમે પસંદ કરેલા સમયે અમે કૉલ કરીશું.",
      ta: "நீங்கள் தேர்ந்தெடுத்த நேரத்தில் நாங்கள் அழைப்போம்.",
      te: "మీరు ఎంచుకున్న సమయానికి మేము కాల్ చేస్తాం.",
      kn: "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಸಮಯಕ್ಕೆ ನಾವು ಕರೆ ಮಾಡುತ್ತೇವೆ.",
      pa: "ਤੁਹਾਡੇ ਚੁਣੇ ਹੋਏ ਸਮੇਂ 'ਤੇ ਅਸੀਂ ਕਾਲ ਕਰਾਂਗੇ।",
      bn: "আপনার বেছে নেওয়া সময়ে আমরা কল করব।",
    },
    // Videos  /suraksha/videos
    "5.21": {
      ml: "നിങ്ങളുടെ ഭാഷയിൽ വീഡിയോ.",
      hi: "आपकी भाषा में वीडियो।",
      gu: "તમારી ભાષામાં વીડિયો.",
      ta: "உங்கள் மொழியில் வீடியோ.",
      te: "మీ భాషలో వీడియోలు.",
      kn: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ವೀಡಿಯೊ.",
      pa: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਵੀਡੀਓ।",
      bn: "আপনার ভাষায় ভিডিও।",
    },
    // Blog  /suraksha/blog
    "5.22": {
      ml: "റോഡ്, ട്രക്ക്, വരുമാനം: ഉപകാരപ്രദമായ കാര്യങ്ങൾ.",
      hi: "सड़क, ट्रक और कमाई की काम की बातें।",
      gu: "રસ્તો, ટ્રક અને કમાણીની કામની વાતો.",
      ta: "சாலை, டிரக், வருமானம் பற்றிய பயனுள்ள விஷயங்கள்.",
      te: "రోడ్డు, ట్రక్, సంపాదనపై ఉపయోగపడే విషయాలు.",
      kn: "ರಸ್ತೆ, ಟ್ರಕ್ ಮತ್ತು ಗಳಿಕೆಯ ಉಪಯುಕ್ತ ಮಾತುಗಳು.",
      pa: "ਸੜਕ, ਟਰੱਕ ਅਤੇ ਕਮਾਈ ਦੀਆਂ ਕੰਮ ਦੀਆਂ ਗੱਲਾਂ।",
      bn: "রাস্তা, ট্রাক আর রোজগারের কাজের কথা।",
    },  };

  var DEFAULT_INTERVAL = 2800;
  var FADE_MS = 450;

  function injectAssets() {
    if (document.getElementById("srk-rotator-assets")) return;

    // Fonts: remove this block if the site already self-hosts the Baloo families
    var fams = ["Baloo+2", "Baloo+Chettan+2", "Baloo+Bhai+2", "Baloo+Thambi+2",
      "Baloo+Tammudu+2", "Baloo+Tamma+2", "Baloo+Paaji+2", "Baloo+Da+2"];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" +
      fams.map(function (f) { return "family=" + f + ":wght@500;600"; }).join("&") +
      "&display=swap";
    document.head.appendChild(link);

    var css = document.createElement("style");
    css.id = "srk-rotator-assets";
    css.textContent =
      ".srk-rotator{display:grid;position:relative}" +
      ".srk-rotator .srk-line{grid-area:1/1;opacity:0;transform:translateY(0.35em);" +
      "transition:opacity " + FADE_MS + "ms ease,transform " + FADE_MS + "ms ease;" +
      "pointer-events:none}" +
      ".srk-rotator .srk-line.is-active{opacity:1;transform:none;pointer-events:auto}" +
      ".srk-rotator .srk-sr{position:absolute;width:1px;height:1px;overflow:hidden;" +
      "clip:rect(0 0 0 0);white-space:nowrap}" +
      "@media (prefers-reduced-motion:reduce){.srk-rotator .srk-line{transition:none;transform:none}}";
    document.head.appendChild(css);
  }

  function collectLines(el) {
    var custom = el.querySelectorAll("[lang]");
    var map = {};
    if (custom.length) {
      for (var i = 0; i < custom.length; i++) {
        map[custom[i].getAttribute("lang")] = custom[i].textContent.trim();
      }
      return map;
    }
    var key = el.getAttribute("data-page");
    if (key && SUBHEADLINES[key]) return SUBHEADLINES[key];
    if (key && window.console) console.warn("srk-rotator: unknown data-page " + key);
    return null;
  }

  function init(el) {
    if (el.getAttribute("data-srk-ready")) return;
    var lines = collectLines(el);
    if (!lines) return;

    var order = (el.getAttribute("data-order") || "").split(",")
      .map(function (s) { return s.trim(); }).filter(Boolean);
    if (!order.length) order = ORDER;
    order = order.filter(function (c) { return lines[c]; });
    if (!order.length) return;

    var interval = parseInt(el.getAttribute("data-interval"), 10) || DEFAULT_INTERVAL;
    var start = order.indexOf(el.getAttribute("data-start") || "hi");
    if (start < 0) start = 0;

    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.setAttribute("data-srk-ready", "1");
    el.textContent = "";

    // One readable copy for assistive tech
    var sr = document.createElement("span");
    sr.className = "srk-sr";
    sr.lang = lines.hi ? "hi" : order[start];
    sr.textContent = lines.hi || lines[order[start]];
    el.appendChild(sr);

    var nodes = order.map(function (code, i) {
      var s = document.createElement("span");
      s.className = "srk-line" + (i === start ? " is-active" : "");
      s.lang = code;
      s.setAttribute("aria-hidden", "true");
      s.style.fontFamily = FONTS[code] + ", 'Baloo 2', sans-serif";
      s.textContent = lines[code];
      el.appendChild(s);
      return s;
    });

    if (reduce || nodes.length < 2) {
      var only = lines.hi ? order.indexOf("hi") : start;
      nodes.forEach(function (n, i) { n.classList.toggle("is-active", i === only); });
      return;
    }

    var current = start, timer = null, visible = true, hovered = false;

    function step() {
      nodes[current].classList.remove("is-active");
      current = (current + 1) % nodes.length;
      nodes[current].classList.add("is-active");
    }
    function play() {
      if (!timer && visible && !hovered && !document.hidden) {
        timer = setInterval(step, interval);
      }
    }
    function pause() { clearInterval(timer); timer = null; }

    el.addEventListener("mouseenter", function () { hovered = true; pause(); });
    el.addEventListener("mouseleave", function () { hovered = false; play(); });
    el.addEventListener("focusin", function () { hovered = true; pause(); });
    el.addEventListener("focusout", function () { hovered = false; play(); });
    document.addEventListener("visibilitychange", function () {
      document.hidden ? pause() : play();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? play() : pause();
      }).observe(el);
    }
    play();
  }

  function boot() {
    injectAssets();
    var els = document.querySelectorAll(".srk-rotator");
    for (var i = 0; i < els.length; i++) init(els[i]);
  }

  // Public hook for client-side routing (Next.js etc.): call after a route change
  window.SurakshaRotator = { init: boot, data: SUBHEADLINES };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
