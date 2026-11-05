import { SkillTest } from '../types';

export const skillTests: SkillTest[] = [
  {
    id: 'test-safety',
    badgeId: 'earthing_check',
    title: {
      te: 'విద్యుత్ భద్రత & షాక్ నివారణ పరీక్ష (IS 732)',
      hi: 'विद्युत सुरक्षा और शॉक रोकथाम परीक्षा (IS 732)',
      en: 'Electrical Safety & Shock Prevention Exam',
    },
    description: {
      te: 'ఎర్తింగ్ నిబంధనలు, నియాన్ టెస్టర్ తనిఖీ, RCCB ట్రిప్పింగ్ మరియు లైవ్-వైర్ రక్షణపై 5 ప్రశ్నలు.',
      hi: 'अर्थिंग नियम, नियॉन टेस्टर जांच, RCCB ट्रिपिंग और सुरक्षा पर 5 प्रश्न।',
      en: '5 critical questions on earthing standards, tester verification, RCCB sensitivity, and shock hazards.',
    },
    category: 'safety',
    passingScore: 80,
    questions: [
      {
        id: 'q1',
        question: {
          te: 'ఇంటి మెయిన్ స్విచ్ లేదా MCB ఆఫ్ చేసిన తర్వాత, వైర్లను తాకే ముందు తప్పనిసరిగా ఏమి చేయాలి?',
          hi: 'घर का मेन स्विच या MCB बंद करने के बाद, तारों को छूने से पहले क्या करना अनिवार्य है?',
          en: 'After turning off the main switch or MCB, what MUST you do before touching wires?',
        },
        options: {
          te: [
            'నియాన్ టెస్టర్ లేదా మల్టీమీటర్‌తో జీరో వోల్టేజ్ నిర్ధారించుకోవాలి',
            'చేతులకు క్లాత్ చుట్టుకుని నేరుగా తాకవచ్చు',
            'లైట్లు ఆరిపోయాయో లేదో చూస్తే చాలు',
            'ఇన్వర్టర్ స్విచ్ ఆఫ్ చేయకుండానే పనిచేయవచ్చు',
          ],
          hi: [
            'नियॉन टेस्टर या मल्टीमीटर से शून्य वोल्टेज की पुष्टि करें',
            'कपड़ा लपेटकर सीधे हाथ लगा सकते हैं',
            'केवल यह देखना काफी है कि बत्ती बुझ गई',
            'इन्वर्टर चालू रखकर भी काम कर सकते हैं',
          ],
          en: [
            'Verify zero voltage using a calibrated neon tester or digital multimeter',
            'Touch wires directly using a dry cloth',
            'Just check if room lights turned off',
            'Work directly without checking inverter backfeed',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఇన్వర్టర్ లేదా జనరేటర్ నుండి బ్యాక్‌ఫీడ్ రావచ్చు. కాబట్టి టెస్టర్‌తో పవర్ లేదని నిర్ధారించుకోవడం ప్రాణాధారం.',
          hi: 'इन्वर्टर से बैकफीड आ सकता है, इसलिए टेस्टर से शून्य वोल्टेज जांचना जीवनरक्षक है।',
          en: 'Inverters or generator backfeed can keep wires live even when main MCB is off. Always test before touch.',
        },
      },
      {
        id: 'q2',
        question: {
          te: 'గృహ అవసరాలకు మానవ శరీర రక్షణ (Human Shock Protection) కొరకు సరైన RCCB సెన్సిటివిటీ ఎంత?',
          hi: 'घरेलू उपयोग में मानव सुरक्षा के लिए सही RCCB संवेदनशीलता कितनी होनी चाहिए?',
          en: 'What is the standard RCCB sensitivity required for human shock protection in residential premises?',
        },
        options: {
          te: ['30 mA (మిల్లీ ఆంపియర్లు)', '100 mA', '300 mA', '16 Amps'],
          hi: ['30 mA (मिली एम्पीयर)', '100 mA', '300 mA', '16 Amps'],
          en: ['30 mA (Milliamperes)', '100 mA', '300 mA', '16 Amps'],
        },
        correctIndex: 0,
        explanation: {
          te: '30mA RCCB మిల్లీసెకన్లలో ట్రిప్ అయి గుండెకు విద్యుత్ షాక్ వల్ల కలిగే ప్రమాదాన్ని నివారిస్తుంది (IS 732/IEC standard).',
          hi: '30mA RCCB मिलीसेकंड में ट्रिप होकर जानलेवा कार्डियक शॉक से बचाता है।',
          en: '30mA sensitivity trips in milliseconds before lethal ventricular fibrillation can occur.',
        },
      },
      {
        id: 'q3',
        question: {
          te: 'సరైన కెమికల్ లేదా పైప్ ఎర్తింగ్ పిట్ రెసిస్టెన్స్ సాధారణంగా గరిష్టంగా ఎంత లోపు ఉండాలి?',
          hi: 'एक सुरक्षित घरेलू केमिकल या पाइप अर्थिंग का प्रतिरोध अधिकतम कितना होना चाहिए?',
          en: 'What is the maximum recommended earth pit resistance for residential earthing?',
        },
        options: {
          te: [
            '5 ఓమ్స్ కన్నా తక్కువ (ఆదర్శంగా < 2-3 ఓమ్స్)',
            '50 ఓమ్స్',
            '100 ఓమ్స్',
            'రెసిస్టెన్స్‌తో సంబంధం లేదు',
          ],
          hi: [
            '5 ओम से कम (आदर्श रूप से < 2-3 ओम)',
            '50 ओम',
            '100 ओम',
            'प्रतिरोध का कोई महत्व नहीं',
          ],
          en: [
            'Less than 5 Ohms (ideally < 2-3 Ohms)',
            '50 Ohms',
            '100 Ohms',
            'Resistance does not matter',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఎర్త్ రెసిస్టెన్స్ ఎంత తక్కువ ఉంటే షార్ట్ సర్క్యూట్ అయినప్పుడు కరెంట్ అంత సురక్షితంగా భూమిలోకి వెళ్తుంది.',
          hi: 'अर्थिंग प्रतिरोध जितना कम होगा, लीकेज करंट उतनी ही तेजी से जमीन में जाएगा और MCB ट्रिप होगी।',
          en: 'Low resistance ensures high fault current flows to instantly trip the protective breaker.',
        },
      },
      {
        id: 'q4',
        question: {
          te: '3-పిన్ సాకెట్‌లో ఎర్తింగ్ పిన్ మిగిలిన రెండు పిన్‌ల కంటే పెద్దగా మరియు పొడవుగా ఎందుకు ఉంటుంది?',
          hi: '3-पिन सॉकेट में अर्थिंग पिन बाकी दोनों पिनों से बड़ी और लंबी क्यों होती है?',
          en: 'Why is the top earth pin in a 3-pin socket larger in diameter and longer than phase and neutral pins?',
        },
        options: {
          te: [
            'ప్లగ్ పెట్టేటప్పుడు ముందుగా ఎర్త్ కనెక్ట్ కావడానికి మరియు తీసేటప్పుడు చివరగా డిస్‌కనెక్ట్ కావడానికి',
            'సాకెట్ చూడటానికి అందంగా కనిపించడానికి',
            'సాకెట్ బరువు తట్టుకోవడానికి',
            'తక్కువ వోల్టేజ్ రాకుండా చూడటానికి',
          ],
          hi: [
            'ताकि प्लग लगाते समय अर्थ पहले जुड़े और निकालते समय सबसे अंत में हटे (सुरक्षा नियम)',
            'केवल मजबूती देने के लिए',
            'ताकि प्लग ढीला न हो',
            'डिजाइन का कोई कारण नहीं',
          ],
          en: [
            'First-to-make, last-to-break: Earth contacts first upon insertion and disconnects last upon removal',
            'Purely for cosmetic aesthetics',
            'To hold mechanical weight only',
            'To regulate incoming voltage',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఫస్ట్-టు-మేక్, లాస్ట్-టు-బ్రేక్ నియమం ప్రకారం పరికరం బాడీకి పవర్ రాకముందే ఎర్తింగ్ రక్షణ ఉండాలి.',
          hi: 'यह फर्स्ट-मेक लास्ट-ब्रेक सिद्धांत है ताकि फेज मिलने से पहले ही उपकरण सुरक्षित रूप से ग्राउंड हो जाए।',
          en: 'Safety standard ensures exposed metal chassis is grounded before live phase conductor makes contact.',
        },
      },
      {
        id: 'q5',
        question: {
          te: 'బాత్‌రూమ్ గీజర్ లేదా వాషింగ్ మెషీన్ మెటల్ బాడీని తాకినప్పుడు వైబ్రేషన్ లేదా స్వల్ప షాక్ కొడుతుంటే దానికి ముఖ్య కారణం ఏమిటి?',
          hi: 'गीजर या वाशिंग मशीन की बॉडी छूने पर हल्का झटका या झनझनाहट आने का मुख्य कारण क्या है?',
          en: 'What is the most likely cause when a water geyser or washing machine body gives a mild electric vibration/shock?',
        },
        options: {
          te: [
            'ఎర్తింగ్ వైరు కట్ అవ్వడం లేదా లూస్ కనెక్షన్ ఉండటం',
            'నీటిలో ఉప్పు ఎక్కువగా ఉండటం',
            'స్విచ్ నాణ్యత బాగా లేకపోవడం',
            'గీజర్ కెపాసిటీ ఎక్కువగా ఉండటం',
          ],
          hi: [
            'अर्थिंग वायर कटी होना या अर्थ पिन से ढीला संपर्क होना',
            'पानी में नमक ज्यादा होना',
            'स्विच की खराबी',
            'कम बिजली आना',
          ],
          en: [
            'Broken, missing, or high-resistance earthing path failing to drain leakage currents',
            'High mineral salt in tap water',
            'Poor switch plastic brand',
            'Low utility voltage',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'హీటింగ్ ఎలిమెంట్ లేదా మోటార్ నుండి వచ్చే కెపాసిటివ్ లీకేజ్ కరెంట్‌ను ఎర్తింగ్ వైరు నేలలోకి పంపలేకపోవడం వల్ల బాడీకి షాక్ వస్తుంది.',
          hi: 'जब अर्थिंग कटी होती है, तो आंतरिक लीकेज करंट सीधे मशीन की धातु की बॉडी पर आ जाता है।',
          en: 'Without a continuous low-impedance path to earth, normal filter and induction leakages accumulate on the metal chassis.',
        },
      },
    ],
  },
  {
    id: 'test-wiring',
    badgeId: 'switchboard_wiring',
    title: {
      te: 'గృహ వైరింగ్ & కలర్ కోడింగ్ నైపుణ్య పరీక్ష',
      hi: 'घरेलू वायरिंग एवं कलर कोडिंग कौशल परीक्षा',
      en: 'Domestic Wiring & Color Coding Certification',
    },
    description: {
      te: 'స్విచ్‌బోర్డు వైరింగ్, లూపింగ్, సాకెట్ పోలారిటీ మరియు వైర్ సైజింగ్‌పై 5 కీలక ప్రశ్నలు.',
      hi: 'स्विचबोर्ड वायरिंग, लूपिंग, सॉकेट पोलरिटी और वायर गेज पर 5 प्रश्न।',
      en: '5 practical questions on modular switchboard loop wiring, socket polarity, and conductor sizing.',
    },
    category: 'wiring',
    passingScore: 80,
    questions: [
      {
        id: 'qw1',
        question: {
          te: 'భారతీయ ప్రమాణాల (Indian Standards) ప్రకారం సింగిల్-ఫేజ్ గృహ వైరింగ్‌లో ఫేజ్, న్యూట్రల్ మరియు ఎర్త్‌లకు సరైన కలర్ కోడ్ ఏమిటి?',
          hi: 'भारतीय मानकों के अनुसार सिंगल फेज वायरिंग में फेज, न्यूट्रल और अर्थ के लिए सही रंग कोड क्या है?',
          en: 'According to Indian standards (IS), what is the correct color code for Phase, Neutral, and Earth?',
        },
        options: {
          te: [
            'ఫేజ్: ఎరుపు (Red), న్యూట్రల్: నలుపు/నీలం (Black/Blue), ఎర్త్: ఆకుపచ్చ (Green/Yellow-Green)',
            'ఫేజ్: ఆకుపచ్చ, న్యూట్రల్: ఎరుపు, ఎర్త్: నలుపు',
            'ఫేజ్: నలుపు, న్యూట్రల్: ఆకుపచ్చ, ఎర్త్: ఎరుపు',
            'ఏ కలర్ వైరు అయినా వాడవచ్చు, నియమం లేదు',
          ],
          hi: [
            'फेज: लाल, न्यूट्रल: काला/नीला, अर्थ: हरा/पीला-हरा',
            'फेज: हरा, न्यूट्रल: लाल, अर्थ: काला',
            'फेज: काला, न्यूट्रल: हरा, अर्थ: लाल',
            'कोई भी रंग इस्तेमाल कर सकते हैं',
          ],
          en: [
            'Phase: Red (or Yellow/Blue), Neutral: Black (or Blue), Earth: Green (or Green-Yellow)',
            'Phase: Green, Neutral: Red, Earth: Black',
            'Phase: Black, Neutral: Green, Earth: Red',
            'Any color can be used arbitrarily',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'సరైన రంగుల వైర్లు వాడటం వల్ల భవిష్యత్తులో ఇతర ఎలక్ట్రీషియన్లు పనిచేసేటప్పుడు ప్రాణాంతకమైన పొరపాట్లు జరగవు.',
          hi: 'सही कलर कोडिंग से भविष्य में आने वाले किसी भी इलेक्ट्रीशियन को काम करने में सुरक्षा मिलती है।',
          en: 'Standard color coding eliminates lethal confusion during future maintenance.',
        },
      },
      {
        id: 'qw2',
        question: {
          te: 'స్విచ్‌బోర్డులో స్విచ్‌ను ఎల్లప్పుడూ ఏ వైరుకు కనెక్ట్ చేయాలి?',
          hi: 'स्विचबोर्ड में स्विच को हमेशा किस तार पर लगाना चाहिए?',
          en: 'In a domestic switchboard, the switch must ALWAYS be wired to interrupt which conductor?',
        },
        options: {
          te: [
            'ఫేజ్ వైరుకు మాత్రమే (Phase / Live wire)',
            'న్యూట్రల్ వైరుకు (Neutral wire)',
            'ఎర్త్ వైరుకు (Earth wire)',
            'న్యూట్రల్ లేదా ఎర్త్ రెండింటిలో దేనికైనా',
          ],
          hi: [
            'केवल फेज तार पर (Live/Phase wire)',
            'न्यूट्रल तार पर',
            'अर्थ तार पर',
            'किसी भी तार पर लगा सकते हैं',
          ],
          en: [
            'Phase wire ONLY (Live line)',
            'Neutral wire',
            'Earth wire',
            'Either Neutral or Earth',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'స్విచ్ ఆఫ్ చేసినప్పుడు ఉపకరణానికి వెళ్లే పవర్ కట్ అవ్వాలి. న్యూట్రల్‌కు స్విచ్ వేస్తే, స్విచ్ ఆఫ్ చేసినా హోల్డర్‌లో కరెంట్ అలాగే ఉంటుంది!',
          hi: 'यदि स्विच न्यूट्रल पर होगा, तो स्विच बंद होने पर भी बल्ब होल्डर में लाइव करंट रहेगा और झटका लगेगा।',
          en: 'Interrupting the phase ensures zero potential at the appliance when switched off. Switching neutral leaves the fixture live.',
        },
      },
      {
        id: 'qw3',
        question: {
          te: '3-పిన్ సాకెట్‌ను ముందు నుండి చూసినప్పుడు (Front View), ఫేజ్ మరియు న్యూట్రల్ టెర్మినల్స్ ఎక్కడ ఉండాలి?',
          hi: '3-पिन सॉकेट को सामने से देखने पर फेज और न्यूट्रल कहां होने चाहिए?',
          en: 'When looking at a standard 3-pin wall socket from the front, where should the Phase and Neutral pins be?',
        },
        options: {
          te: [
            'కుడి వైపు పిన్: ఫేజ్ (L), ఎడమ వైపు పిన్: న్యూట్రల్ (N), పై పిన్: ఎర్త్ (E)',
            'ఎడమ వైపు పిన్: ఫేజ్ (L), కుడి వైపు పిన్: న్యూట్రల్ (N)',
            'కింది రెండు పిన్‌లు ఎర్త్, పై పిన్ ఫేజ్',
            'ఎలా పెట్టినా పర్వాలేదు',
          ],
          hi: [
            'दायां पिन: फेज (L), बायां पिन: न्यूट्रल (N), ऊपरी पिन: अर्थ (E)',
            'बायां पिन: फेज (L), दायां पिन: न्यूट्रल (N)',
            'नीचे दोनों अर्थ, ऊपर फेज',
            'कोई नियम नहीं है',
          ],
          en: [
            'Right Pin: Phase (L), Left Pin: Neutral (N), Top Pin: Earth (E)',
            'Left Pin: Phase (L), Right Pin: Neutral (N)',
            'Bottom pins are Earth, Top pin is Phase',
            'Polarity is arbitrary',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'IS 1293 ప్రకారం సాకెట్ ముందు నుండి చూస్తే కుడి వైపు L (లైవ్) ఉండాలి. దీనివల్ల ప్లగ్ చేసే పరికరాల అంతర్గత ఫ్యూజ్‌లు సురక్షితంగా పనిచేస్తాయి.',
          hi: 'IS 1293 मानक के अनुसार सामने से देखने पर दायां टर्मिनल हमेशा फेज (Live) होना चाहिए।',
          en: 'Standard IS 1293 defines Right as Live and Left as Neutral when viewed from front.',
        },
      },
      {
        id: 'qw4',
        question: {
          te: '1.5 టన్ స్ప్లిట్ ఏసీ లేదా 2000W గీజర్ పవర్ పాయింట్ కొరకు కనీసం ఏ సైజు కాపర్ వైరు వాడాలి?',
          hi: '1.5 टन एसी या 2000W गीजर के लिए कम से कम किस गेज का कॉपर वायर लगाना चाहिए?',
          en: 'What is the minimum recommended copper wire gauge for a 1.5-ton AC or 2000W geyser power point?',
        },
        options: {
          te: [
            '4.0 sq mm లేదా కనీసం 2.5 sq mm FR కాపర్ వైరు',
            '1.0 sq mm వైరు సరిపోతుంది',
            '0.75 sq mm ఫ్లెక్సిబుల్ వైరు',
            '0.5 sq mm టెలిఫోన్ వైరు',
          ],
          hi: [
            '4.0 sq mm या न्यूनतम 2.5 sq mm FR कॉपर वायर',
            '1.0 sq mm काफी है',
            '0.75 sq mm तार',
            '0.5 sq mm तार',
          ],
          en: [
            '4.0 sq mm (or minimum 2.5 sq mm FR copper)',
            '1.0 sq mm is sufficient',
            '0.75 sq mm flexible wire',
            '0.5 sq mm wire',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: '2kW హీటింగ్ లోడ్ దాదాపు 9 ఆంపియర్లు తీసుకుంటుంది. సన్నటి వైరు వేస్తే వేడెక్కి ఇన్సులేషన్ కాలిపోయి షార్ట్ సర్క్యూట్ అవుతుంది.',
          hi: '2kW लोड पर 9 एम्पीयर करंट आता है, 1.0mm तार जलकर आग लगा सकता है। न्यूनतम 2.5mm या 4mm आवश्यक है।',
          en: 'A 2kW load pulls ~9A continuous. Under-gauged wires overheat, melt insulation, and cause fires.',
        },
      },
      {
        id: 'qw5',
        question: {
          te: 'స్విచ్ టెర్మినల్‌లో వైరు బిగించేటప్పుడు తామ్రం పోగులు (copper strands) బయట కనిపిస్తుంటే ఏమి జరుగుతుంది?',
          hi: 'स्विच के टर्मिनल में तार कसते समय यदि तांबे के रेशे बाहर छूटे रह जाएं तो क्या खतरा है?',
          en: 'What risk arises if exposed bare copper strands are left protruding outside the terminal screw?',
        },
        options: {
          te: [
            'పక్కనున్న టెర్మినల్ లేదా మెటల్ బాక్స్‌ను తాకి స్పార్క్, షార్ట్ సర్క్యూట్ లేదా బాక్స్ షాక్ కొడుతుంది',
            'కరెంట్ బిల్లు తక్కువ వస్తుంది',
            'స్విచ్ ఎక్కువ కాలం పనిచేస్తుంది',
            'ఏ నష్టమూ లేదు',
          ],
          hi: [
            'बगल के टर्मिनल या मेटल बॉक्स से छूकर शॉर्ट सर्किट और आग लग सकती है',
            'बिजली का बिल कम आता है',
            'स्विच की लाइफ बढ़ती है',
            'कोई खतरा नहीं है',
          ],
          en: [
            'Exposed copper can bridge adjacent terminals or touch metal box, causing dead shorts and electric shock',
            'Reduces electricity bills',
            'Increases switch lifespan',
            'Has no impact',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఎల్లప్పుడూ వైరును సరైన కొలతలో మాత్రమే స్ట్రిప్ చేసి, పోగులు బయటకు రాకుండా పూర్తి ఇన్సులేషన్ ఉండేలా బిగించాలి.',
          hi: 'तार को सही लंबाई में छीलें और स्क्रू के अंदर पूरी तरह सुरक्षित करें। खुले तार भयानक शॉर्ट सर्किट करते हैं।',
          en: 'Always twist strands tightly, trim to depth, and torque screws so zero bare copper is exposed.',
        },
      },
    ],
  },
  {
    id: 'test-mcb',
    badgeId: 'mcb_fitting',
    title: {
      te: 'MCB & డిస్ట్రిబ్యూషన్ బోర్డు ఫిట్టింగ్ పరీక్ష',
      hi: 'MCB एवं डिस्ट्रीब्यूशन बोर्ड फिटिंग परीक्षा',
      en: 'MCB & Distribution Board Protection Test',
    },
    description: {
      te: 'MCB రేటింగ్‌లు, బ్రేకింగ్ కెపాసిటీ, కర్వ్-C vs కర్వ్-B మరియు న్యూట్రల్ బస్‌బార్‌లపై 5 ప్రశ్నలు.',
      hi: 'MCB रेटिंग, ब्रेकिंग क्षमता, Curve-C बनाम Curve-B और न्यूट्रल बसबार पर 5 प्रश्न।',
      en: '5 questions on MCB curve ratings, breaking capacity, busbar segregation, and overload protection.',
    },
    category: 'distribution',
    passingScore: 80,
    questions: [
      {
        id: 'qm1',
        question: {
          te: 'సాధారణ గృహ లైటింగ్ సర్క్యూట్ (1.5 sq mm వైరింగ్) కొరకు సరైన MCB రేటింగ్ ఏది?',
          hi: 'सामान्य घरेलू लाइटिंग सर्किट (1.5 sq mm वायरिंग) के लिए उपयुक्त MCB रेटिंग कौन सी है?',
          en: 'What is the correct MCB current rating for a standard residential lighting circuit wired with 1.5 sq mm?',
        },
        options: {
          te: ['6A లేదా 10A (C-Curve / B-Curve)', '32A', '63A', '100A'],
          hi: ['6A या 10A (C-Curve / B-Curve)', '32A', '63A', '100A'],
          en: ['6A or 10A (C-Curve / B-Curve)', '32A', '63A', '100A'],
        },
        correctIndex: 0,
        explanation: {
          te: '1.5 sq mm వైరుకు 32A బ్రేకర్‌ను వేస్తే, షార్ట్ సర్క్యూట్ అయినప్పుడు వైరు కాలిపోతుంది కానీ MCB ట్రిప్ అవ్వదు!',
          hi: '1.5mm तार पर 32A का MCB लगाने से तार जल जाएगा पर MCB नहीं गिरेगा। लाइटिंग के लिए 6A या 10A ही लगाएं।',
          en: 'An oversized 32A breaker will allow 1.5 sq mm cables to overheat and catch fire before tripping.',
        },
      },
      {
        id: 'qm2',
        question: {
          te: 'ఇండియన్ హోమ్ డిస్ట్రిబ్యూషన్ బోర్డులలో ఎక్కువగా వాడే "C-Curve" MCB యొక్క ప్రత్యేకత ఏమిటి?',
          hi: 'घरों में आमतौर पर इस्तेमाल होने वाले "C-Curve" MCB की क्या खासियत होती है?',
          en: 'What is the operational characteristic of a "C-Curve" MCB commonly installed in Indian homes?',
        },
        options: {
          te: [
            'రేటెడ్ కరెంట్ కంటే 5 నుండి 10 రెట్లు ఇన్-రష్ కరెంట్ (మోటార్లు, ఫ్రిడ్జ్ స్టార్టింగ్) వచ్చినప్పుడు అనవసరంగా ట్రిప్ కాకుండా తట్టుకుంటుంది',
            'ఇది ఎప్పటికీ ట్రిప్ అవ్వదు',
            'ఇది పవర్ లేకుండా పనిచేస్తుంది',
            'కేవలం డిసి (DC) కరెంట్‌కు మాత్రమే పనికొస్తుంది',
          ],
          hi: [
            'मोटर या फ्रिज के चालू होने पर आने वाले 5 से 10 गुना इंडक्टिव इन-रश करंट को बिना बेवजह ट्रिप हुए झेलता है',
            'यह कभी ट्रिप नहीं होता',
            'यह बिना बिजली के काम करता है',
            'केवल डीसी के लिए है',
          ],
          en: [
            'Tolerates 5x to 10x rated starting in-rush currents (motors, fridges) without nuisance tripping',
            'It never trips',
            'Operates without electrical supply',
            'Strictly for DC only',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఫ్యాన్లు, ఫ్రిడ్జ్ మరియు ఏసీ మోటార్లు మొదలైనప్పుడు క్షణికంగా ఎక్కువ కరెంట్ తీసుకుంటాయి. C-Curve దాన్ని తట్టుకుంటుంది.',
          hi: 'C-Curve MCB इंडक्टिव लोड (पंखा, मोटर) के शुरुआती करंट पर बेवजह ट्रिप नहीं होता।',
          en: 'C-curve breakers handle moderate inductive surge from inductive household appliances.',
        },
      },
      {
        id: 'qm3',
        question: {
          te: 'డిస్ట్రిబ్యూషన్ బోర్డులో MCB ల క్రింది భాగంలో లూప్ వైర్లకు బదులుగా కాపర్ బస్‌బార్ (Comb Busbar) ఎందుకు వాడాలి?',
          hi: 'डिस्ट्रीब्यूशन बोर्ड में MCB के नीचे पतले तारों के लूप की जगह कॉम्ब बसबार लगाना क्यों बेहतर है?',
          en: 'Why is an insulated copper comb busbar preferred over wire-loop jumpers across MCB bottom terminals?',
        },
        options: {
          te: [
            'లూస్ కాంటాక్ట్‌లు, స్పార్కింగ్ మరియు ఓవర్‌హీటింగ్ లేకుండా సమాన కరెంట్ పంపిణీ చేస్తుంది',
            'కేవలం బోర్డు చూడటానికి బాగుంటుంది',
            'కరెంట్ వేగాన్ని పెంచుతుంది',
            'ఖర్చు పెంచడానికి మాత్రమే',
          ],
          hi: [
            'ढीले जोड़ों, स्पार्किंग और अधिक गर्म होने के खतरे को खत्म करके मजबूत संपर्क देता है',
            'केवल सुंदरता के लिए',
            'बिजली की गति बढ़ाने के लिए',
            'कोई लाभ नहीं है',
          ],
          en: [
            'Eliminates loose jumper contacts, localized thermal hotspots, and arcing sparking hazards',
            'Purely for board aesthetics',
            'Increases AC frequency',
            'No functional benefit',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'వైర్ లూప్‌లు కాలక్రమేణా వదులై కాలిపోతాయి. కాపర్ బస్‌బార్ ఘనమైన, స్పార్క్-ఫ్రీ కనెక్షన్‌ను ఇస్తుంది.',
          hi: 'तारों के लूप ढीले होकर जल जाते हैं। बसबार से मजबूत और ठंडा कनेक्शन मिलता है।',
          en: 'Wire jumpers loosen with thermal cycling and oxidize. Solid copper busbars provide low-resistance distribution.',
        },
      },
      {
        id: 'qm4',
        question: {
          te: 'డిస్ట్రిబ్యూషన్ బోర్డులో న్యూట్రల్ వైరును ఎర్తింగ్ బస్‌బార్‌తో కలిపి స్క్రూ వేయవచ్చా?',
          hi: 'क्या डिस्ट्रीब्यूशन बोर्ड में न्यूट्रल तार को अर्थिंग बसबार से जोड़ना चाहिए?',
          en: 'Is it safe to connect or bridge the Neutral conductor directly onto the Earth busbar inside a sub-DB?',
        },
        options: {
          te: [
            'ఖచ్చితంగా కూడదు! ఇది RCCB ని నిరంతరం ట్రిప్ చేస్తుంది మరియు బాడీలకు కరెంట్ లీక్ చేస్తుంది',
            'ఎలాగైనా చేయవచ్చు, రెండూ ఒకటే',
            'ఎక్కువ కరెంట్ వచ్చినప్పుడు మాత్రమే కలపాలి',
            'ఎర్తింగ్ లేకపోతే న్యూట్రల్‌కు కలపవచ్చు',
          ],
          hi: [
            'बिल्कुल नहीं! ऐसा करने से RCCB तुरंत ट्रिप होगा और घरों के उपकरणों में करंट उतर आएगा',
            'हां, दोनों एक ही बात है',
            'केवल लोड ज्यादा होने पर जोड़ें',
            'अर्थिंग न हो तो जोड़ सकते हैं',
          ],
          en: [
            'STRICTLY PROHIBITED! It causes permanent RCCB tripping and energizes metallic appliance chassis',
            'Yes, Neutral and Earth are identical',
            'Only bridge during peak loads',
            'Permissible if Earth is weak',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'న్యూట్రల్ కరెంట్ మోసే వైరు, ఎర్త్ రక్షణ వైరు. సబ్-ప్యానెల్‌లో ఈ రెండింటినీ కలిపితే పెను ప్రమాదం.',
          hi: 'न्यूट्रल रिटर्न करंट लेकर आता है। इसे अर्थ से जोड़ने पर पूरा करंट उपकरणों की बॉडी में आ जाएगा।',
          en: 'Sub-panel neutral-ground bonding circulates return currents on the grounding system, creating severe shock hazards.',
        },
      },
      {
        id: 'qm5',
        question: {
          te: 'MCB పై ముద్రించిన "10kA" లేదా "6kA" గుర్తు దేనిని సూచిస్తుంది?',
          hi: 'MCB पर लिखे "10kA" या "6kA" का क्या अर्थ होता है?',
          en: 'What does the "10kA" or "6kA" rating marked inside a rectangle on an MCB represent?',
        },
        options: {
          te: [
            'షార్ట్ సర్క్యూట్ బ్రేకింగ్ కెపాసిటీ (MCB పేలిపోకుండా తట్టుకునే గరిష్ట షార్ట్ సర్క్యూట్ కరెంట్)',
            'ఇంటిలో వాడాల్సిన విద్యుత్ యూనిట్లు',
            'వైరు పొడవు 6 కిలోమీటర్లు',
            'కంపెనీ మోడల్ నంబర్',
          ],
          hi: [
            'शॉर्ट सर्किट ब्रेकिंग क्षमता (ब्लास्ट हुए बिना एमसीबी द्वारा सुरक्षित रूप से काटा जाने वाला अधिकतम करंट)',
            'घर में बिजली की खपत',
            'तार की लंबाई 6 किमी',
            'मॉडल नंबर',
          ],
          en: [
            'Short-circuit Breaking Capacity (the maximum fault current the breaker can safely extinguish without exploding)',
            'Daily power units in kWh',
            'Allowable wire run in kilometers',
            'Manufacturing batch code',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ట్రాన్స్‌ఫార్మర్ దగ్గర ఉన్న ఇళ్లలో భారీ ఫాల్ట్ కరెంట్ వస్తుంది. 10kA బ్రేకర్‌లు సురక్షితంగా ఆర్క్‌ను ఆర్పివేస్తాయి.',
          hi: 'शॉर्ट सर्किट पर हजारों एम्पीयर करंट आता है। 10kA रेटिंग का MCB बिना फटे उस करंट को बुझा देता है।',
          en: '10,000 Amps fault interruption rating ensures the internal arc chamber quenches catastrophic dead shorts safely.',
        },
      },
    ],
  },
  {
    id: 'test-inverter',
    badgeId: 'inverter_backup',
    title: {
      te: 'ఇన్వర్టర్ & బ్యాటరీ వైరింగ్ నైపుణ్య పరీక్ష',
      hi: 'इन्वर्टर और बैटरी बैकअप वायरिंग परीक्षा',
      en: 'Inverter & Battery Circuitry Certification',
    },
    description: {
      te: 'ఇన్వర్టర్ ఫేజ్ లూపింగ్, న్యూట్రల్ షేరింగ్ సమస్యలు మరియు బ్యాటరీ టెర్మినల్ రక్షణపై 5 ప్రశ్నలు.',
      hi: 'इन्वर्टर फेज लूपिंग, न्यूट्रल शेयरिंग और बैटरी सुरक्षा पर 5 प्रश्न।',
      en: '5 critical questions on single-wire inverter output, shared neutral loops, and battery terminal safety.',
    },
    category: 'appliances',
    passingScore: 80,
    questions: [
      {
        id: 'qi1',
        question: {
          te: 'ఇన్వర్టర్ బ్యాకప్ వైరింగ్ చేసేటప్పుడు ఇన్వర్టర్ ఫేజ్ మరియు మెయిన్స్ పవర్ ఫేజ్ రెండూ ఒకే స్విచ్‌బోర్డులో కలిస్తే ఏమి జరుగుతుంది?',
          hi: 'यदि इन्वर्टर का फेज और ग्रिड (मेन) का फेज गलती से एक ही तार या स्विच पर आपस में जुड़ जाएं तो क्या होगा?',
          en: 'What happens if the Inverter output Phase and the Utility Mains Phase are accidentally cross-connected on the same terminal?',
        },
        options: {
          te: [
            'భారీ ఫేజ్-టు-ఫేజ్ షార్ట్ సర్క్యూట్ అయి ఇన్వర్టర్ కార్డ్/MOSFETలు పేలిపోతాయి',
            'బ్యాటరీ త్వరగా ఛార్జ్ అవుతుంది',
            'ఫ్యాన్ డబుల్ స్పీడ్‌తో తిరుగుతుంది',
            'ఏమీ జరగదు',
          ],
          hi: [
            'विस्फोटक फेज-टू-फेज शॉर्ट सर्किट होगा और इन्वर्टर के MOSFET कार्ड तुरंत जल जाएंगे',
            'बैटरी जल्दी चार्ज होगी',
            'पंखा दोगुनी रफ्तार से चलेगा',
            'कोई असर नहीं होगा',
          ],
          en: [
            'Catastrophic out-of-phase dead short that vaporizes inverter MOSFETs and main board instantly',
            'Battery charges twice as fast',
            'Appliances run with double power',
            'Nothing happens',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'ఇన్వర్టర్ ఫేజ్ మరియు మెయిన్స్ ఫేజ్ సింక్రొనైజ్ కావు. రెండూ కలిస్తే 400V పైగా స్పార్కింగ్ వచ్చి ఇన్వర్టర్ పాడవుతుంది.',
          hi: 'दोनों फेज अलग-अलग वेव पर होते हैं। टकराने पर ब्लास्ट होकर इन्वर्टर का सर्किट बोर्ड जल जाता है।',
          en: 'Unsynchronized phase waveforms collide, causing immediate destruction of inverter power electronics.',
        },
      },
      {
        id: 'qi2',
        question: {
          te: 'ఇన్వర్టర్ బ్యాటరీ టెర్మినల్స్ వద్ద తెల్లటి లేదా నీలం రంగు పొడి (సల్ఫేషన్) రాకుండా నివారించడానికి ఏమి పూయాలి?',
          hi: 'इन्वर्टर बैटरी के खूंटों (टर्मिनल) पर सफेद या नीला कार्बन/सल्फेट जमने से रोकने के लिए क्या लगाना चाहिए?',
          en: 'What should be applied onto inverter lead-acid battery terminals to prevent white/blue sulfation and corrosion?',
        },
        options: {
          te: [
            'క్లీన్ చేసి పెట్రోలియం జెల్లీ (వాసిలిన్) పూయాలి',
            'గ్రీజు లేదా ఆయిల్ పూయకూడదు',
            'నీటితో తడపాలి',
            'ఉప్పు నీరు పోయాలి',
          ],
          hi: [
            'साफ करके पेट्रोलियम जेली (वैसलीन) लगाना चाहिए',
            'नमक का पानी डालना चाहिए',
            'पेंट करना चाहिए',
            'कुछ नहीं लगाना चाहिए',
          ],
          en: [
            'Clean wire brush and coat with pure petroleum jelly (Vaseline)',
            'Pour acid directly',
            'Wash with salt water',
            'Leave bare and moist',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'పెట్రోలియం జెల్లీ ఆక్సిజన్ మరియు యాసిడ్ వాయువులు టెర్మినల్ సీసంను తుప్పు పట్టించకుండా రక్షణ కవచంగా పనిచేస్తుంది.',
          hi: 'पेट्रोलियम जेली हवा और एसिड वाष्प को रोकती है जिससे टर्मिनल पर कभी जंग नहीं लगती।',
          en: 'Petroleum jelly seals the lead posts from acid vapors and airborne oxygen, halting high-resistance sulfation.',
        },
      },
      {
        id: 'qi3',
        question: {
          te: 'ఇన్వర్టర్ కోసం ఇంట్లో ప్రత్యేక న్యూట్రల్ వైర్ వేయకుండా మెయిన్స్ న్యూట్రల్‌ను షేర్ చేసినప్పుడు RCCB ఎందుకు ట్రిప్ అవుతుంది?',
          hi: 'इन्वर्टर का लोड मेन डिस्ट्रीब्यूशन बोर्ड के RCCB के बाद होने पर RCCB बार-बार क्यों गिरता है?',
          en: 'Why does an upstream RCCB trip when an inverter return current shares the common house neutral?',
        },
        options: {
          te: [
            'ఇన్వర్టర్ నుండి న్యూట్రల్ ద్వారా వచ్చే రిటర్న్ కరెంట్ RCCB ఫేజ్ పోల్ గుండా రాకపోవడం వల్ల అసమతుల్యత (Unbalance) ఏర్పడుతుంది',
            'ఇన్వర్టర్ బరువు తట్టుకోలేక',
            'వైర్ రంగు నచ్చక',
            'బ్యాటరీ ఛార్జింగ్ అయిపోవడం వల్ల',
          ],
          hi: [
            'क्योंकि न्यूट्रल का रिटर्न करंट RCCB के फेज से होकर नहीं आता, जिससे RCCB में करंट असंतुलन (Current Imbalance) दिखता है',
            'इन्वर्टर भारी होने के कारण',
            'बैटरी खराब होने के कारण',
            'कोई कारण नहीं है',
          ],
          en: [
            'The return neutral current bypasses the RCCB phase toroid, triggering current vector imbalance',
            'Due to mechanical weight of inverter',
            'Battery voltage is low',
            'No electrical reason',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'RCCB ఫేజ్ మరియు న్యూట్రల్ కరెంట్లు సరిసమానంగా ఉండాలని చూస్తుంది. తేడా వస్తే లీకేజ్ అనుకుని ట్రిప్ చేస్తుంది.',
          hi: 'RCCB आने वाले और जाने वाले करंट की बराबरी नापता है। इन्वर्टर से अलग जाने पर वह उसे लीकेज समझकर ट्रिप कर देता है।',
          en: 'RCCBs sum Phase and Neutral vectors; current entering through the inverter and returning via mains neutral looks like an earth fault.',
        },
      },
      {
        id: 'qi4',
        question: {
          te: 'ఇన్వర్టర్ మరమ్మతుకు పంపినప్పుడు లేదా పాడైనప్పుడు ఇంట్లో వెలుగులు ఆగిపోకుండా ఉండటానికి ఏ స్విచ్ ఏర్పాటు చేయాలి?',
          hi: 'इन्वर्टर खराब होने पर घर की बिजली बंद न हो, इसके लिए कौन सा सुरक्षा स्विच लगाना चाहिए?',
          en: 'What auxiliary switch should be installed so home lights continue running on mains grid when the inverter is unplugged for repairs?',
        },
        options: {
          te: [
            'మ్యాన్యువల్ బైపాస్ ఛేంజ్ ఓవర్ స్విచ్ (Bypass Changeover Switch)',
            'సాధారణ 6A బెల్ స్విచ్',
            'MCB ని తీసేయడం',
            'వైర్లను చేతితో మెలిపెట్టడం',
          ],
          hi: [
            'मैनुअल बाईपास चेंजओवर स्विच (Bypass Changeover Switch)',
            'साधारण घंटी स्विच',
            'तारों को सीधे हाथ से जोड़ना',
            'कुछ नहीं लगाना चाहिए',
          ],
          en: [
            'Manual Bypass Changeover Switch (rotary or DIN-rail)',
            'Standard 6A bell press switch',
            'Removing the MCB entirely',
            'Twisting wires together by hand',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'బైపాస్ స్విచ్ ఉంటే ఇన్వర్టర్ సర్వీసింగ్‌కు వెళ్లినా కస్టమర్ ఇంట్లో ఫ్యాన్లు, లైట్లు మెయిన్స్ పవర్ ద్వారా నేరుగా పనిచేస్తాయి.',
          hi: 'बाईपास स्विच से इन्वर्टर हटा लेने पर भी घर की सभी लाइटें और पंखे ग्रिड से चालू रहते हैं।',
          en: 'A rotary or DIN-rail bypass switch safely routes the raw mains feed to backup circuits when inverter is decoupled.',
        },
      },
      {
        id: 'qi5',
        question: {
          te: 'ఇన్వర్టర్ బ్యాటరీ గదిలో ఎల్లప్పుడూ మంచి గాలి వెలుతురు (Ventilation) ఎందుకు ఉండాలి?',
          hi: 'इन्वर्टर बैटरी वाले कमरे में हमेशा अच्छी हवा (वेंटिलेशन) क्यों होनी चाहिए?',
          en: 'Why must lead-acid inverter batteries always be installed in a well-ventilated, airy area?',
        },
        options: {
          te: [
            'ఛార్జ్ అవుతున్నప్పుడు అత్యంత మండే గుణం గల హైడ్రోజన్ గ్యాస్ (Hydrogen Gas) విడుదలవుతుంది కాబట్టి',
            'బ్యాటరీకి చలి పెట్టకుండా ఉండటానికి',
            'కరెంట్ వేగంగా వెళ్లడానికి',
            'లైట్లు కాంతివంతంగా వెలగడానికి',
          ],
          hi: [
            'चार्जिंग के दौरान अत्यधिक ज्वलनशील हाइड्रोजन गैस निकलती है, जिसे बाहर निकालना जरूरी है',
            'बैटरी को ठंड से बचाने के लिए',
            'बिजली की गति बढ़ाने के लिए',
            'कोई खास कारण नहीं',
          ],
          en: [
            'Charging generates explosive Hydrogen gas which can ignite from a single switch spark if trapped',
            'To keep the battery warm',
            'To accelerate AC current',
            'Purely for room fragrance',
          ],
        },
        correctIndex: 0,
        explanation: {
          te: 'మూసివున్న గదిలో హైడ్రోజన్ వాయువు పోగైతే చిన్న నిప్పురవ్వ తగిలినా బ్యాటరీ బాంబులా పేలిపోయే ప్రమాదం ఉంది.',
          hi: 'बंद कमरे में हाइड्रोजन गैस जमा होने पर एक चिंगारी से भी बैटरी में भयानक विस्फोट हो सकता है।',
          en: 'Electrolysis of water produces H2 gas. Adequate air circulation prevents dangerous Lower Explosive Limit (LEL) accumulation.',
        },
      },
    ],
  },
];
