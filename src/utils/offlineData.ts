import { OfflineJobPacket, OfflineSyncRecord, JobRecord } from '../types';

export const offlineJobPackets: OfflineJobPacket[] = [
  {
    id: 'pack-switchboard',
    title: {
      te: 'మాడ్యులర్ స్విచ్‌బోర్డు రీవైరింగ్ & సాకెట్ ఫిట్టింగ్ (6M/8M)',
      hi: 'मॉड्यूलर स्विचबोर्ड रीवायरिंग और सॉकेट फिटिंग (6M/8M)',
      en: 'Modular Switchboard Rewiring & Socket Fitting (6M/8M)',
    },
    trade: 'Switchboard Assembly',
    difficulty: 'Basic',
    estimatedMinutes: 20,
    requiredTools: ['Neon Phase Tester', 'Insulated Wire Stripper', 'Philips Screwdriver', '1.5 sq mm Wire Polycab', 'Insulation Tape 3M'],
    steps: [
      {
        stepNumber: 1,
        title: {
          te: 'మెయిన్ MCB ఆఫ్ చేసి నియాన్ టెస్టర్‌తో పవర్ లేదని నిర్ధారించండి',
          hi: 'मेन MCB बंद करें और नियॉन टेस्टर से बिजली न होने की पुष्टि करें',
          en: 'Turn off Main MCB and verify zero voltage with neon tester',
        },
        instruction: {
          te: 'బోర్డు తెరవడానికి ముందు తప్పనిసరిగా రూమ్ లేదా మెయిన్ MCB ఆఫ్ చేయాలి. టెస్టర్ లైట్ వెలగడం లేదని నిర్ధారించుకోండి.',
          hi: 'बोर्ड खोलने से पहले कमरे की एमसीबी बंद करें। टेस्टर की बत्ती नहीं जलनी चाहिए।',
          en: 'Isolate circuit at distribution box. Probe all incoming switch lines to verify dead circuit.',
        },
        voiceScript: {
          te: 'అన్నా! ముందుగా రూమ్ MCB ఆఫ్ చేసి, టెస్టర్‌తో వైర్లను తాకండి. బల్బ్ వెలగకపోతేనే స్క్రూలు విప్పండి.',
          hi: 'अन्ना! पहले मेन एमसीबी बंद करें और टेस्टर से जांच लें कि बिजली पूरी तरह बंद है।',
          en: 'Anna! Confirm circuit breaker is OFF. Probe all switch terminals before removing the front plate.',
        },
        safetyNotice: {
          te: 'టెస్టర్ బల్బ్ ఏమాత్రం వెలిగినా బోర్డును తాకవద్దు!',
          hi: 'टेस्टर में हल्की सी भी रोशनी दिखे तो तारों को हाथ न लगाएं!',
          en: 'Do NOT touch any wire if neon tester shows even faint illumination!',
        },
      },
      {
        stepNumber: 2,
        title: {
          te: 'పాత కాలిపోయిన స్విచ్ తొలగించి, పని ప్రారంభానికి ముందు ఫోటో తీయండి',
          hi: 'पुराना जला हुआ स्विच निकालें और पहले की फोटो (Before Photo) लें',
          en: 'Remove burnt switch and capture Before Photo',
        },
        instruction: {
          te: 'వైర్లు డ్యామేజ్ అయిన భాగాన్ని ఫోటో తీసి ఆఫ్‌లైన్ రికార్డులో నమోదు చేయండి. కాలిపోయిన వైర్ చివర్లను కట్ చేసి కొత్తగా 10mm స్ట్రిప్ చేయండి.',
          hi: 'जले हुए तारों की स्पष्ट फोटो लें। जले हुए हिस्से को काटकर 10mm ताजा तांबा छीलें।',
          en: 'Snap the baseline photo of loose or charred wires. Snip blackened copper and strip 10mm fresh conductor.',
        },
        voiceScript: {
          te: 'అన్నా, పాత వైరింగ్ ఫోటో తీయండి. కాలిపోయిన వైరును కత్తిరించి తాజా కాపర్ వచ్చేలా స్ట్రిప్ చేయండి.',
          hi: 'अन्ना, काम शुरू करने से पहले की फोटो ले लीजिए। जले हुए हिस्से को काटकर नया सिरा बनाएं।',
          en: 'Capture the Before photo now, Anna. Trim the oxidized wire tips and twist strands neatly.',
        },
      },
      {
        stepNumber: 3,
        title: {
          te: 'ఫేజ్ వైర్లను స్విచ్ ల క్రింది టెర్మినల్స్‌కు మాత్రమే లూపింగ్ చేయండి',
          hi: 'फेज (लाल) तार को स्विचों के केवल निचले टर्मिनलों में लूप करें',
          en: 'Loop Phase conductor exclusively across switch bottom terminals',
        },
        instruction: {
          te: '1.5 sq mm ఎరుపు వైరును అన్ని స్విచ్‌ల కింది టెర్మినల్స్ గుండా వరుసగా వేయండి. స్క్రూలను గట్టిగా తిప్పండి, కాపర్ పోగులు బయటకు రాకూడదు.',
          hi: '1.5 sq mm लाल तार से सभी स्विचों के नीचे लूप बनाएं। स्क्रू को पूरी ताकत से कसें, तांबा बाहर न रहे।',
          en: 'Feed 1.5 sq mm Red copper through bottom terminals. Torque down securely with zero stray copper strands.',
        },
        voiceScript: {
          te: 'స్విచ్‌ల క్రింది భాగంలో మాత్రమే ఫేజ్ లూపింగ్ ఇవ్వాలి అన్నా. స్క్రూలను గట్టిగా బిగించండి, వదులుగా ఉంటే స్పార్క్ వస్తుంది.',
          hi: 'स्विच के नीचे ही फेज लूप करें अन्ना। ढीला रहेगा तो स्पार्किंग होगी, अच्छे से टाइट करें।',
          en: 'Loop phase through the bottom terminals only, Anna. Tighten firmly to eliminate arcing hotspots.',
        },
      },
      {
        stepNumber: 4,
        title: {
          te: 'సాకెట్ కుడి వైపు L కి స్విచ్ వైరు, ఎడమ N కి న్యూట్రల్, పై పిన్‌కు ఎర్త్ కలపండి',
          hi: 'सॉकेट के दायें L पर स्विच तार, बायें N पर न्यूट्रल और ऊपर अर्थिंग जोड़ें',
          en: 'Connect Right (L) from switch, Left (N) to Neutral, and Top to Earth',
        },
        instruction: {
          te: 'సాకెట్ ముందు నుండి చూస్తే కుడివైపు L టెర్మినల్‌కు స్విచ్ నుండి వచ్చిన వైరు, ఎడమవైపు నలుపు న్యూట్రల్, పెద్ద పై పిన్‌కు ఆకుపచ్చ ఎర్త్ వైరు కలపండి.',
          hi: 'सॉकेट के L पर स्विच से आया तार, N पर काला न्यूट्रल और ऊपर बड़ा हरा अर्थिंग तार जोड़ें।',
          en: 'Terminate switch load to Right (L), Black neutral to Left (N), and Green conductor to Top Earth pin.',
        },
        voiceScript: {
          te: 'సాకెట్ పోలారిటీ ముఖ్యం అన్నా! కుడి వైపు ఫేజ్, ఎడమ వైపు న్యూట్రల్, పై భాగంలో గ్రీన్ ఎర్త్ వైరు సరిగ్గా ఉండాలి.',
          hi: 'सॉकेट पोलरिटी सही रखें अन्ना! दायें फेज, बायें न्यूट्रल और ऊपर अर्थिंग सुरक्षित कसें।',
          en: 'Check socket polarity, Anna! Right is Live, Left is Neutral, and Top is Earth.',
        },
      },
      {
        stepNumber: 5,
        title: {
          te: 'పూర్తయిన వైరింగ్ ఆఫ్టర్ ఫోటో తీసి, బోర్డును ఫిట్ చేసి పవర్ ఆన్ చేయండి',
          hi: 'साफ वायरिंग की अंतिम फोटो (After Photo) लें, बोर्ड बंद करें और पावर दें',
          en: 'Capture clean After Photo, re-fasten plate, and restore power',
        },
        instruction: {
          te: 'వైర్లు నలగకుండా జాగ్రత్తగా బోర్డులో మడిచి స్క్రూలు వేయండి. ఆఫ్టర్ ఫోటో సేవ్ చేసి మెయిన్ MCB ఆన్ చేసి టెస్ట్ చేయండి.',
          hi: 'तारों को समेटकर प्लेट लगाएं, बाद की फोटो लें और एमसीबी चालू करके टेस्टर से परखें।',
          en: 'Dress cables into backbox without pinching. Capture completed After photo and energize circuit safely.',
        },
        voiceScript: {
          te: 'చాలా చక్కగా చేశారు అన్నా! వైరింగ్ నీట్‌గా ఉంది. ఆఫ్టర్ ఫోటో తీసి బోర్డును క్లోజ్ చేయండి.',
          hi: 'शाबाश अन्ना! काम पूरा हुआ। फोटो खींचकर सुरक्षित तरीके से बोर्ड बंद करें।',
          en: 'Excellent work, Anna! Capture the finished photo and screw the plate tight.',
        },
      },
    ],
  },
  {
    id: 'pack-mcb-replacement',
    title: {
      te: 'డిస్ట్రిబ్యూషన్ బోర్డులో కాలిన MCB తొలగింపు & కొత్త MCB ఫిట్టింగ్',
      hi: 'डिस्ट्रीब्यूशन बोर्ड में जले हुए MCB को बदलना एवं नया फिट करना',
      en: 'Distribution Board MCB Replacement & Busbar Lugs',
    },
    trade: 'Distribution Board Maintenance',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    requiredTools: ['Insulated Screwdriver Set', 'Crimping Plier', 'Copper Pin Lugs 2.5mm', 'Havells/Legrand C16 MCB', 'Multimeter'],
    steps: [
      {
        stepNumber: 1,
        title: {
          te: 'మెయిన్ 4-పోల్ లేదా 2-పోల్ ఐసోలేటర్ పూర్తిగా ఆఫ్ చేయండి',
          hi: 'मेन 4-पोल या 2-पोल आइसोलेटर को पूरी तरह बंद करें',
          en: 'Turn off the main 4-Pole or 2-Pole incoming Isolator',
        },
        instruction: {
          te: 'డిస్ట్రిబ్యూషన్ బాక్స్‌కు వచ్చే మెయిన్ సప్లైని పూర్తిగా ఆపండి. ఇన్వర్టర్ మెయిన్ కనెక్షన్ కూడా డిస్‌కనెక్ట్ చేయండి.',
          hi: 'डीबी बॉक्स की मुख्य इनकमिंग सप्लाई बंद करें। इन्वर्टर का बैकफीड भी जांच लें।',
          en: 'Shut down main incomer isolator. Verify zero voltage on distribution busbar before contact.',
        },
        voiceScript: {
          te: 'అన్నా! డిస్ట్రిబ్యూషన్ బోర్డులో పవర్ ఎక్కువ ఉంటుంది. ముందుగా మెయిన్ ఐసోలేటర్ ఆఫ్ చేసి జీరో వోల్టేజ్ చూడండి.',
          hi: 'अन्ना! डीबी बॉक्स में 415V/230V का रिस्क होता है। पहले मेन आइसोलेटर गिराएं और वोल्टेज जांचें।',
          en: 'Anna, main DB carries heavy current. Cut off the incoming isolator completely.',
        },
        safetyNotice: {
          te: 'బస్‌బార్‌పై ఒక్క వోల్ట్ కూడా ఉండకూడదు!',
          hi: 'बसबार पर कोई करंट नहीं होना चाहिए!',
          en: 'Ensure zero potential across all busbar comb fingers!',
        },
      },
      {
        stepNumber: 2,
        title: {
          te: 'కాలిన MCB నుండి లోడ్ మరియు బస్‌బార్ స్క్రూలను విప్పి తీసివేయండి',
          hi: 'जले हुए MCB से बसबार और लोड वायर के पेंच खोलकर उसे बाहर निकालें',
          en: 'Loosen comb busbar and load screw, unclip MCB from DIN rail',
        },
        instruction: {
          te: 'కాలిన పాత MCB ని బిగించి ఉన్న DIN రైల్ లాక్‌ను క్రిందికి లాగి బయటకు తీయండి. బిఫోర్ ఫోటో తీయండి.',
          hi: 'एमसीबी के निचले लॉक को स्क्रूड्राइवर से खींचकर डीआईएन रेल से अलग करें। पहले की फोटो लें।',
          en: 'Pry bottom DIN-rail clip downward. Remove defective breaker and capture baseline Before Photo.',
        },
        voiceScript: {
          te: 'లాక్ లాగి పాత MCB తీయండి అన్నా. కాలిపోయిన ప్యానెల్ ఫోటోను క్యాప్చర్ చేయండి.',
          hi: 'लॉक खींचकर पुराना एमसीबी निकालें और फोटो ले लें।',
          en: 'Unclip the breaker and capture the burnt terminal photo now.',
        },
      },
      {
        stepNumber: 3,
        title: {
          te: 'కాపర్ పిన్ లగ్ (Pin Lug) వేసి క్రింప్ చేయండి',
          hi: 'तार के सिरे पर कॉपर पिन लग लगाकर क्रिम्पिंग टूल से दबाएं',
          en: 'Crimp copper pin lug onto outgoing circuit conductor',
        },
        instruction: {
          te: 'కేబుల్ పోగులు విడిపోకుండా కాపర్ పిన్ లగ్ వేసి క్రింపింగ్ టూల్‌తో గట్టిగా ప్రెస్ చేయండి.',
          hi: 'तारों के रेशे बिखरने से बचाने के लिए कॉपर पिन लग लगाएं और मजबूती से क्रिम्प करें।',
          en: 'Crimp an insulated copper pin ferrule/lug onto the 2.5/4mm cable to prevent frayed loose strands.',
        },
        voiceScript: {
          te: 'లూస్ కాంటాక్ట్ రాకుండా కాపర్ లగ్ వేసి క్రింప్ చేయండి అన్నా. దీనివల్ల MCB మళ్లీ ఎప్పటికీ కాలదు.',
          hi: 'पिन लग लगाकर क्रिम्प करें ताकि ढीलापन न रहे और कभी स्पार्क न हो।',
          en: 'Crimp a pin lug onto the conductor, Anna. This ensures a clean connection that will not burn.',
        },
      },
      {
        stepNumber: 4,
        title: {
          te: 'కొత్త C16 MCB ని DIN రైలుపై ఫిట్ చేసి, స్క్రూలను టార్క్ చేయండి',
          hi: 'नया C16 MCB रेल पर लगाएं और बसबार व लोड तारों को पूरी ताकत से कसें',
          en: 'Mount new C16 MCB on DIN rail, torque busbar and load terminals',
        },
        instruction: {
          te: 'కింది భాగంలో బస్‌బార్, పై భాగంలో లోడ్ వైరు బిగించండి. స్క్రూలను గరిష్ట టార్క్‌తో బిగించి ఆఫ్టర్ ఫోటో తీయండి.',
          hi: 'नीचे बसबार और ऊपर लोड वायर लगाकर स्क्रू पूरी तरह टाइट करें। बाद की फोटो लें।',
          en: 'Snap MCB onto rail, seat comb busbar into bottom cage clamp, load on top. Fasten tight and capture After Photo.',
        },
        voiceScript: {
          te: 'కొత్త MCB ఫిట్ అయింది అన్నా! స్క్రూలను గట్టిగా బిగించి, పూర్తయిన ఆఫ్టర్ ఫోటో తీయండి.',
          hi: 'नया एमसीबी लग गया है अन्ना। अच्छी तरह कसकर बाद की फोटो ले लें।',
          en: 'Breaker is locked in place, Anna! Tighten firmly and capture the clean After Photo.',
        },
      },
    ],
  },
  {
    id: 'pack-chemical-earthing',
    title: {
      te: 'కెమికల్ ఎర్తింగ్ పిట్ ఇన్‌స్టాలేషన్ & ఎర్త్ రెసిస్టెన్స్ తనిఖీ',
      hi: 'केमिकल अर्थिंग पिट स्थापना एवं अर्थ प्रतिरोध परीक्षण',
      en: 'Chemical Earthing Pit Installation & Loop Testing',
    },
    trade: 'Earthing & Safety Systems',
    difficulty: 'Advanced',
    estimatedMinutes: 35,
    requiredTools: ['Copper Bonded Electrode 2.5m', 'BKE Earth Compound 25kg', 'Digital Earth Resistance Tester', 'Copper Strip 25x3mm', 'Earthing Chamber Box'],
    steps: [
      {
        stepNumber: 1,
        title: {
          te: '2.5 నుండి 3 మీటర్ల లోతు గుంత తీసి రాడ్ అమర్చండి',
          hi: '2.5 से 3 मीटर गहरा गड्ढा खोदकर कॉपर बॉन्डेड रॉड स्थापित करें',
          en: 'Auger 2.5m to 3.0m deep borehole and center copper bonded electrode',
        },
        instruction: {
          te: 'మట్టిలో తేమ ఉండే ప్రదేశంలో నిలువుగా గుంత తీసి కాపర్ రాడ్‌ను మధ్యలో నిలబెట్టండి. బిఫోర్ ఫోటో తీయండి.',
          hi: 'नमी वाली जगह पर गहरा गड्ढा करें और इलेक्ट्रोड को बीच में सीधा रखें। पहले की फोटो लें।',
          en: 'Excavate pit in natural soil bed, center the 2.5m electrode vertically. Record Before Photo.',
        },
        voiceScript: {
          te: 'గుంత మధ్యలో కాపర్ బాండెడ్ రాడ్‌ను నిలబెట్టి ఫోటో తీయండి అన్నా.',
          hi: 'गड्ढे के बीच में रॉड को सीधा रखें और फोटो ले लें अन्ना।',
          en: 'Center the electrode in the borehole and capture your baseline photo, Anna.',
        },
      },
      {
        stepNumber: 2,
        title: {
          te: 'BKE ఎర్తింగ్ కాంపౌండ్‌ను నీటితో కలిపి రాడ్ చుట్టూ నింపండి',
          hi: 'BKE अर्थिंग कंपाउंड को पानी में मिलाकर रॉड के चारों ओर भरें',
          en: 'Mix low-resistivity BKE backfill compound with water and slurry fill',
        },
        instruction: {
          te: 'కార్బన్ బేస్డ్ కండక్టివ్ కాంపౌండ్‌ను రాడ్ చుట్టూ ఖాళీ లేకుండా పోసి గట్టిగా దట్టించండి.',
          hi: 'कंपाउंड को पानी के साथ घोलकर चारों तरफ भरें ताकि कोई खाली हवा न बचे।',
          en: 'Pour the conductive bentonite/carbon slurry around the rod to ensure continuous soil contact.',
        },
        voiceScript: {
          te: 'కాంపౌండ్‌ను రాడ్ చుట్టూ నింపి నీళ్లు పోయండి అన్నా. దీనివల్ల ఎర్త్ రెసిస్టెన్స్ 2 ఓమ్స్ కంటే తక్కువకు వస్తుంది.',
          hi: 'कंपाउंड अच्छी तरह भरें ताकि मिट्टी में नमी और करंट का रास्ता हमेशा बना रहे।',
          en: 'Tamp the compound slurry tight around the rod, Anna. This locks soil conductivity below 2 ohms.',
        },
      },
      {
        stepNumber: 3,
        title: {
          te: 'కాపర్ స్ట్రిప్‌ను బ్రాస్ బోల్ట్‌లతో బిగించి చాంబర్ నిర్మించండి',
          hi: 'कॉपर स्ट्रिप को पीतल के बोल्ट से कसें और निरीक्षण बॉक्स बनाएं',
          en: 'Bolt 25x3mm copper strip with brass fasteners and set pit chamber',
        },
        instruction: {
          te: '25x3mm కాపర్ పట్టీని రాడ్ పైభాగానికి రెండు బోల్ట్‌లతో బిగించండి. వాటర్ టెస్టింగ్ కోసం చాంబర్ బాక్స్ అమర్చి ఆఫ్టర్ ఫోటో తీయండి.',
          hi: 'स्ट्रिप को बोल्ट से कसें, ऊपर चेंबर बॉक्स लगाएं और अंतिम फोटो लें।',
          en: 'Fasten copper lead strip with double brass nuts. Place inspection chamber and take After Photo.',
        },
        voiceScript: {
          te: 'బోల్ట్‌లను గట్టిగా బిగించి వాషర్లు వేయండి అన్నా. చాంబర్ మూత పెట్టి ఆఫ్టర్ ఫోటో రికార్డ్ చేయండి.',
          hi: 'पीतल के बोल्ट से स्ट्रिप कसें और चेंबर लगाकर अंतिम फोटो ले लें।',
          en: 'Fasten the brass bolts with spring washers and capture your finished After Photo, Anna.',
        },
      },
    ],
  },
  {
    id: 'pack-inverter-backup',
    title: {
      te: 'ఇన్వర్టర్ బ్యాకప్ వైరింగ్ & డ్యూయల్ ఫేజ్ ఐసోలేషన్',
      hi: 'इन्वर्टर बैकअप वायरिंग एवं सुरक्षित फेज पृथक्करण',
      en: 'Inverter Backup Wiring & Phase Isolation',
    },
    trade: 'Inverter & Backup Systems',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    requiredTools: ['1.5 sq mm Blue/Yellow Wire', 'Wire Stripper', 'Insulation Tape', 'Petroleum Jelly', 'Tester'],
    steps: [
      {
        stepNumber: 1,
        title: {
          te: 'ఇన్వర్టర్ బ్యాకప్ ఇవ్వాల్సిన లైట్లు, ఫ్యాన్ల స్విచ్‌లను గుర్తించండి',
          hi: 'इन्वर्टर से चलने वाले पंखों और लाइटों के स्विच अलग पहचानें',
          en: 'Identify and isolate dedicated backup lighting/fan switches',
        },
        instruction: {
          te: 'స్విచ్‌బోర్డులో గ్రిడ్ మెయిన్స్ ఫేజ్ నుండి ఇన్వర్టర్ స్విచ్‌లకు వెళ్లే లూప్ వైరును కత్తిరించి వేరు చేయండి. బిఫోర్ ఫోటో తీయండి.',
          hi: 'मेन फेज से इन्वर्टर वाले स्विचों का कनेक्शन काटकर अलग करें। पहले की फोटो लें।',
          en: 'Sever the common utility phase jumper from the intended backup switches. Record Before Photo.',
        },
        voiceScript: {
          te: 'మెయిన్స్ ఫేజ్ మరియు ఇన్వర్టర్ ఫేజ్ ఎట్టి పరిస్థితుల్లోనూ కలవకూడదు అన్నా. స్విచ్‌లను వేరు చేసి ఫోటో తీయండి.',
          hi: 'मेन फेज और इन्वर्टर फेज कभी नहीं टकराने चाहिए अन्ना। स्विचों को अलग करके फोटो लें।',
          en: 'Never bridge mains phase with inverter output, Anna. Isolate the switches and take the Before photo.',
        },
      },
      {
        stepNumber: 2,
        title: {
          te: 'ఇన్వర్టర్ అవుట్‌పుట్ ఫేజ్ వైరును వేరుచేసిన స్విచ్‌లకు లూప్ చేయండి',
          hi: 'इन्वर्टर आउटपुट फेज (नीला/पीला) तार को अलग किए गए स्विचों में लूप करें',
          en: 'Connect Inverter output phase (Blue/Yellow) to isolated switches',
        },
        instruction: {
          te: 'ఇన్వర్టర్ సాకెట్ కుడి పిన్ నుండి వచ్చిన 1.5 sq mm వైరును ఎంపిక చేసిన స్విచ్‌లకు మాత్రమే లూప్ చేయండి.',
          hi: 'इन्वर्टर के आउटपुट से आए तार को केवल बैकअप वाले स्विचों के नीचे कसें।',
          en: 'Route dedicated inverter output line across the bottoms of selected backup switches only.',
        },
        voiceScript: {
          te: 'ఇన్వర్టర్ ఫేజ్ వైరును ఆ స్విచ్‌ల కింది భాగంలో బిగించండి అన్నా. న్యూట్రల్‌ను సరిగ్గా చూసుకోండి.',
          hi: 'इन्वर्टर का तार अलग किए गए स्विचों में अच्छी तरह कसें।',
          en: 'Loop the inverter phase across the isolated switches, Anna. Ensure terminals are snug.',
        },
      },
      {
        stepNumber: 3,
        title: {
          te: 'బ్యాటరీ టెర్మినల్స్‌కు వాసిలిన్ పూసి, ఆఫ్టర్ ఫోటో తీయండి',
          hi: 'बैटरी के खूंटों पर वैसलीन लगाएं और साफ वायरिंग की अंतिम फोटो लें',
          en: 'Apply petroleum jelly to battery terminals and capture After Photo',
        },
        instruction: {
          te: 'కార్బన్ లేదా సల్ఫేషన్ రాకుండా బ్యాటరీ బోల్ట్‌లపై పెట్రోలియం జెల్లీ పూయండి. ఆఫ్టర్ ఫోటో తీసి ఇన్వర్టర్ ఆన్ చేయండి.',
          hi: 'टर्मिनल पर वैसलीन लगाकर जंग से बचाएं। बाद की फोटो लें और इन्वर्टर चालू करें।',
          en: 'Coat lead posts with petroleum jelly against acid corrosion. Capture After Photo and switch on inverter.',
        },
        voiceScript: {
          te: 'బ్యాటరీ టెర్మినల్స్‌కు వాసిలిన్ పూయడం మర్చిపోవద్దు అన్నా. పూర్తయిన ఫోటో తీయండి.',
          hi: 'टर्मिनल्स पर वैसलीन जरूर लगाएं और फाइनल फोटो खींचें।',
          en: 'Apply Vaseline on battery terminals, Anna, and capture your finished After Photo.',
        },
      },
    ],
  },
];

// Offline Queue Persistence in LocalStorage
const QUEUE_STORAGE_KEY = 'ustaad_offline_queue';

export function getOfflineQueue(): OfflineSyncRecord[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read offline queue:', e);
    return [];
  }
}

export function saveToOfflineQueue(record: OfflineSyncRecord): void {
  try {
    const current = getOfflineQueue();
    current.unshift(record);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save to offline queue:', e);
  }
}

export function markQueueItemSynced(id: string): void {
  try {
    const current = getOfflineQueue();
    const updated = current.map(item => (item.id === id ? { ...item, synced: true } : item));
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update sync status:', e);
  }
}

export function clearSyncedItems(): void {
  try {
    const current = getOfflineQueue();
    const pending = current.filter(item => !item.synced);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(pending));
  } catch (e) {
    console.error('Failed to clear synced items:', e);
  }
}
