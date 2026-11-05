import { Technician, JobRecord } from '../types';

// Helper to create clean realistic electrical panel SVGs for before & after demo photos
export function generateElectricalSvg(type: 'messy' | 'clean' | 'mcb_messy' | 'mcb_clean' | 'earthing_old' | 'earthing_new'): string {
  const isClean = type.includes('clean') || type.includes('new');
  
  const bg = isClean ? '#1a221a' : '#231c16';
  const label = isClean ? 'AFTER: CLEAN & LABELED' : 'BEFORE: HAZARDOUS / EXPOSED';
  const labelColor = isClean ? '#22c55e' : '#f59e0b';
  
  const wires = isClean ? `
    <!-- Organized Wires with sleeve insulation and neat cable ties -->
    <path d="M 60 50 L 60 160 Q 60 180 80 180 L 240 180" stroke="#ef4444" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 100 50 L 100 160 Q 100 190 120 190 L 240 190" stroke="#1f2937" stroke-width="8" stroke="#111827" stroke-dasharray="0" fill="none"/>
    <path d="M 140 50 L 140 160 Q 140 200 160 200 L 240 200" stroke="#16a34a" stroke-width="8" fill="none"/>
    <!-- Heat shrink sleeves & ferrules -->
    <rect x="220" y="174" width="22" height="12" fill="#fbbf24" rx="2"/>
    <rect x="220" y="184" width="22" height="12" fill="#fbbf24" rx="2"/>
    <rect x="220" y="194" width="22" height="12" fill="#fbbf24" rx="2"/>
    <rect x="240" y="165" width="55" height="48" fill="#374151" rx="4" stroke="#9ca3af" stroke-width="2"/>
    <circle cx="265" cy="189" r="6" fill="#22c55e"/>
  ` : `
    <!-- Tangled messy wires with exposed bare copper strands -->
    <path d="M 50 40 Q 90 120 130 90 T 250 170" stroke="#ef4444" stroke-width="7" fill="none"/>
    <path d="M 120 30 Q 70 140 180 160 T 260 190" stroke="#374151" stroke-width="8" fill="none"/>
    <path d="M 180 40 Q 220 110 140 170 T 230 210" stroke="#16a34a" stroke-width="6" fill="none"/>
    <!-- Exposed bare copper strand -->
    <line x1="225" y1="165" x2="245" y2="175" stroke="#f59e0b" stroke-width="4"/>
    <line x1="227" y1="163" x2="242" y2="178" stroke="#d97706" stroke-width="2"/>
    <circle cx="235" cy="170" r="12" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="3,3"/>
    <text x="250" y="155" fill="#ef4444" font-size="12" font-family="sans-serif" font-weight="bold">EXPOSED COPPER</text>
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
    <rect width="400" height="280" fill="${bg}"/>
    <!-- Panel chassis -->
    <rect x="25" y="25" width="350" height="230" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="3"/>
    <!-- Screw terminals -->
    <circle cx="50" cy="50" r="8" fill="#71717a" stroke="#d4d4d8" stroke-width="2"/>
    <circle cx="350" cy="50" r="8" fill="#71717a" stroke="#d4d4d8" stroke-width="2"/>
    <circle cx="50" cy="230" r="8" fill="#71717a" stroke="#d4d4d8" stroke-width="2"/>
    <circle cx="350" cy="230" r="8" fill="#71717a" stroke="#d4d4d8" stroke-width="2"/>
    ${wires}
    <!-- Label badge -->
    <rect x="40" y="35" width="220" height="26" rx="4" fill="#000000cc"/>
    <text x="50" y="52" fill="${labelColor}" font-size="11" font-family="monospace" font-weight="bold">${label}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const sampleTechnicians: Technician[] = [
  {
    id: 'tech-rajesh',
    name: {
      te: 'గూడూరు రాజేష్ (G. Rajesh)',
      hi: 'गूडूरु राजेश (G. Rajesh)',
      en: 'G. Rajesh',
    },
    phone: '+91 98480 23411',
    trade: {
      te: 'రెసిడెన్షియల్ వైరింగ్ & ఇన్వర్టర్ స్పెషలిస్ట్',
      hi: 'रेजिडेंशियल वायरिंग और इन्वर्टर विशेषज्ञ',
      en: 'Residential Wiring & Inverter Specialist',
    },
    experienceYears: 7,
    city: {
      te: 'విజయవాడ, ఆంధ్రప్రదేశ్',
      hi: 'विजयवाड़ा, आंध्र प्रदेश',
      en: 'Vijayawada, AP',
    },
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80',
    trustScore: 96,
    trustBreakdown: {
      verifiedJobsPoints: 48,
      safetyCompliancePoints: 36,
      mistakesResolvedPoints: 12,
    },
    verifiedJobsCount: 42,
    criticalMistakesPrevented: 18,
    safetyChecksPassedCount: 42,
    badges: ['switchboard_wiring', 'earthing_check', 'mcb_fitting', 'inverter_backup', 'two_way_staircase'],
    isDemo: true,
    jobs: [
      {
        id: 'job-101',
        technicianId: 'tech-rajesh',
        title: '3-BHK Distribution Board & C16 MCB Replacement',
        trade: 'Distribution Board Rewiring',
        date: '2026-11-04',
        durationSeconds: 430,
        beforePhoto: generateElectricalSvg('mcb_messy'),
        afterPhoto: generateElectricalSvg('mcb_clean'),
        qualityScore: 98,
        qualityReasons: [
          'All 6 circuit neutrals grouped with proper copper lugs and torque-screwed',
          '32A oversized breaker safely downgraded to 16A for 1.5 sq mm lighting circuits',
          'Neon tester and multimeter confirmed zero voltage before touching busbar',
        ],
        mistakesCaught: [
          'Exposed 4mm bare live copper touching the metal casing - insulated immediately',
          'Neutral wire was plugged into earth terminal causing leakage - corrected',
        ],
        safetyChecksPassed: [
          'Main 63A 4-Pole MCB turned OFF',
          'Busbar tested with phase indicator tester',
          'Zero backfeed from inverter confirmed',
        ],
        skillTags: ['MCB Replacement', 'Neutral Busbar Lugs', 'Phase Segregation'],
        tasksDone: [
          'Replaced burnt 32A MCB with standard Havells C16 breaker',
          'Cleaned carbon deposits on distribution rail',
          'Crimp-terminated all 1.5 sq mm incoming neutrals',
        ],
        materialsUsed: ['Havells C16 SP MCB', 'Copper Pin Lugs 2.5mm', 'Insulation Tape 3M', 'Ferrules'],
        customerSummaryTelugu: 'డిస్ట్రిబ్యూషన్ బోర్డులో కాలిన 32A MCB తీసి సరికొత్త C16 బ్రేకర్‌ను బిగించాము. లూస్ వైర్లన్నింటికీ కాపర్ లగ్స్ వేసి స్పార్కింగ్ రాకుండా చేశారు.',
        customerSummaryEnglish: 'Replaced charred 32A breaker with Havells C16 MCB. Crimped copper pin lugs on loose neutral conductors to eliminate sparking.',
        followUpAdvice: ['Schedule an earth resistance test before next monsoon', 'Do not connect 2kW geyser on 6A circuit'],
        isDemo: true,
      },
      {
        id: 'job-102',
        technicianId: 'tech-rajesh',
        title: 'Modular Switchboard 6-Module Rewiring & Fan Regulator',
        trade: 'Switchboard Assembly',
        date: '2026-11-01',
        durationSeconds: 310,
        beforePhoto: generateElectricalSvg('messy'),
        afterPhoto: generateElectricalSvg('clean'),
        qualityScore: 95,
        qualityReasons: [
          'Neat loop wiring with 1.5 sq mm FR grade copper',
          'Earth wire looped to socket top-pin correctly',
          'Smooth stepped electronic regulator installed without humming',
        ],
        mistakesCaught: ['Socket phase was wired to left terminal instead of right pin - corrected to IS standard'],
        safetyChecksPassed: ['Room circuit breaker turned OFF', 'Tester verification done'],
        skillTags: ['Switchboard Wiring', 'Socket Polarity', 'Fan Regulator'],
        tasksDone: ['Wired 4 switches, 1 socket and 1 step regulator in Anchor Roma plate'],
        materialsUsed: ['Anchor Roma 6M Plate', '1.5 sq mm Red & Black Wire', '6A Socket'],
        customerSummaryTelugu: 'రూమ్ స్విచ్‌బోర్డులో వైరింగ్ సురక్షితంగా మార్చబడింది. సాకెట్ పోలారిటీ కరెక్ట్ చేసి ఫ్యాన్ రెగ్యులేటర్ బిగించారు.',
        customerSummaryEnglish: 'Renewed switchboard loop wiring. Corrected socket phase polarity to right-side terminal and installed fan regulator.',
        followUpAdvice: ['Keep switch plate clean and dry'],
        isDemo: true,
      },
    ],
  },
  {
    id: 'tech-kalyan',
    name: {
      te: 'చింతా కళ్యాణ్ వర్మ (Kalyan Varma)',
      hi: 'चिंता कल्याण वर्मा (Kalyan Varma)',
      en: 'Kalyan Varma',
    },
    phone: '+91 97012 88421',
    trade: {
      te: 'ఇండస్ట్రియల్ & హోమ్ ప్యానెల్ టెక్నీషియన్',
      hi: 'औद्योगिक एवं घरेलू पैनल तकनीशियन',
      en: 'Panel & Earthing Specialist',
    },
    experienceYears: 10,
    city: {
      te: 'హైదరాబాద్ (కూకట్‌పల్లి)',
      hi: 'हैदराबाद (कुकटपल्ली)',
      en: 'Hyderabad (Kukatpally)',
    },
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    trustScore: 99,
    trustBreakdown: {
      verifiedJobsPoints: 50,
      safetyCompliancePoints: 38,
      mistakesResolvedPoints: 11,
    },
    verifiedJobsCount: 68,
    criticalMistakesPrevented: 31,
    safetyChecksPassedCount: 68,
    badges: ['mcb_fitting', 'earthing_check', 'switchboard_wiring', 'inverter_backup', 'concealed_conduit', 'two_way_staircase'],
    isDemo: true,
    jobs: [
      {
        id: 'job-103',
        technicianId: 'tech-kalyan',
        title: 'Chemical Earthing Pit Installation & Earth Fault Loop Check',
        trade: 'Earthing & Protection',
        date: '2026-11-03',
        durationSeconds: 520,
        beforePhoto: generateElectricalSvg('earthing_old'),
        afterPhoto: generateElectricalSvg('earthing_new'),
        qualityScore: 99,
        qualityReasons: [
          'Earth pit resistance measured at 1.8 Ohms with earth tester (well below 3 Ohm standard)',
          'Copper bonded rod coupled with bentonite compound backfill',
          'Chamber masonry built with inspection hatch cover',
        ],
        mistakesCaught: [
          'Previous GI strip was severely rusted and snapped underground - replaced with 25x3 copper strip',
        ],
        safetyChecksPassed: [
          'Isolated main ground reference bar before disconnecting',
          'Checked for stray neutral currents',
        ],
        skillTags: ['Chemical Earthing', 'Earth Resistance Test', 'Copper Strip Bonding'],
        tasksDone: [
          'Dug 2.5m pit, backfilled with low-resistivity carbon compound, bonded to main panel',
        ],
        materialsUsed: ['Copper Bonded Electrode 2.5m', 'BKE Compound 25kg', 'Copper Lugs', 'Cast Iron Pit Cover'],
        customerSummaryTelugu: 'ఇంటికి సరికొత్త కెమికల్ ఎర్తింగ్ పిట్ వేశారు. ఎర్త్ రెసిస్టెన్స్ 1.8 ఓమ్స్‌కు తగ్గింది; గీజర్లు, ఫ్రిడ్జ్‌లకు షాక్ కొట్టే ప్రమాదం తొలగింది.',
        customerSummaryEnglish: 'Installed chemical earthing pit with copper bonded rod. Earth resistance tested at 1.8 ohms to ensure total shock protection.',
        followUpAdvice: ['Pour water into chamber every 6 months during hot summer months'],
        isDemo: true,
      },
    ],
  },
  {
    id: 'tech-suresh',
    name: {
      te: 'పోతురాజు సురేష్ కుమార్ (P. Suresh)',
      hi: 'पोतुराजु सुरेश कुमार (P. Suresh)',
      en: 'P. Suresh Kumar',
    },
    phone: '+91 94401 55672',
    trade: {
      te: 'హౌస్ వైరింగ్ & లైటింగ్ కాంట్రాక్టర్',
      hi: 'हाउस वायरिंग और लाइटिंग ठेकेदार',
      en: 'House Wiring & Architectural Lighting',
    },
    experienceYears: 5,
    city: {
      te: 'విశాఖపట్నం, గాజువాక',
      hi: 'विशाखापट्टनम, गाजुवाका',
      en: 'Visakhapatnam (Gajuwaka)',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    trustScore: 92,
    trustBreakdown: {
      verifiedJobsPoints: 44,
      safetyCompliancePoints: 36,
      mistakesResolvedPoints: 12,
    },
    verifiedJobsCount: 29,
    criticalMistakesPrevented: 14,
    safetyChecksPassedCount: 29,
    badges: ['switchboard_wiring', 'two_way_staircase', 'concealed_conduit'],
    isDemo: true,
    jobs: [
      {
        id: 'job-104',
        technicianId: 'tech-suresh',
        title: 'Duplex Staircase 2-Way Switching Circuit Correction',
        trade: 'Staircase Lighting Control',
        date: '2026-10-28',
        durationSeconds: 290,
        beforePhoto: generateElectricalSvg('messy'),
        afterPhoto: generateElectricalSvg('clean'),
        qualityScore: 94,
        qualityReasons: [
          'Switched to safe twin-wire strapping method preventing live lamp holder hazard',
          'Correct colour coding (Yellow/Blue strapping, Red live, Black neutral)',
          'Smooth rocker switches calibrated',
        ],
        mistakesCaught: ['Previous electrician used dangerous Carter system with live neutral at lamp holder - rewired immediately'],
        safetyChecksPassed: ['Staircase circuit isolated at DB', 'Tester verified before pulling wires'],
        skillTags: ['2-Way Switching', 'Safe Strapping Circuit', 'Conduit Wire Pulling'],
        tasksDone: ['Pulled fresh 1.5 sq mm strapper wires and fitted Legrand 2-way switches'],
        materialsUsed: ['Legrand Mylinc 2-Way Switch x2', '1.5 sq mm Wire Polycab'],
        customerSummaryTelugu: 'మెట్ల లైటు 2-వే స్విచ్ వైరింగ్‌ను సురక్షిత పద్ధతిలో మార్చాము. షార్ట్ సర్క్యూట్ రాకుండా కొత్త స్ట్రాపర్ వైర్లు వేశారు.',
        customerSummaryEnglish: 'Rewired 2-way staircase circuit using standard twin-wire strapping method, removing dangerous live lamp terminal risk.',
        followUpAdvice: ['Do not use high-wattage halogen in enclosed staircase globe'],
        isDemo: true,
      },
    ],
  },
  {
    id: 'tech-nagesh',
    name: {
      te: 'తాడికొండ నాగేశ్వరరావు (T. Nagesh)',
      hi: 'ताडिकोंडा नागेश्वर राव (T. Nagesh)',
      en: 'T. Nageshwar Rao',
    },
    phone: '+91 98850 44199',
    trade: {
      te: 'సోలార్ & హోమ్ ఇన్వర్టర్ ఇన్‌స్టాలేషన్',
      hi: 'सोलर और होम इन्वर्टर इंस्टॉलेशन',
      en: 'Solar & Inverter Specialist',
    },
    experienceYears: 8,
    city: {
      te: 'గుంటూరు (అరండల్‌పేట)',
      hi: 'गुंटूर (अरंडलपेटा)',
      en: 'Guntur (Arundelpet)',
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    trustScore: 97,
    trustBreakdown: {
      verifiedJobsPoints: 49,
      safetyCompliancePoints: 37,
      mistakesResolvedPoints: 11,
    },
    verifiedJobsCount: 51,
    criticalMistakesPrevented: 22,
    safetyChecksPassedCount: 51,
    badges: ['inverter_backup', 'mcb_fitting', 'earthing_check'],
    isDemo: true,
    jobs: [],
  },
  {
    id: 'tech-venkat',
    name: {
      te: 'మల్లాది వెంకటేశ్వర్లు (M. Venkat)',
      hi: 'मल्लादि वेंकटेश्वरलू (M. Venkat)',
      en: 'M. Venkatesh',
    },
    phone: '+91 93910 11983',
    trade: {
      te: 'మోటార్ స్టార్టర్ & సబ్‌మెర్సిబుల్ పంపు వైరింగ్',
      hi: 'मोटर स्टार्टर और सबमर्सिबल पंप वायरिंग',
      en: 'Pump Motor Starter & Control Panel',
    },
    experienceYears: 12,
    city: {
      te: 'తిరుపతి, ఆంధ్రప్రదేశ్',
      hi: 'तिरुपति, आंध्र प्रदेश',
      en: 'Tirupati, AP',
    },
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    trustScore: 94,
    trustBreakdown: {
      verifiedJobsPoints: 46,
      safetyCompliancePoints: 36,
      mistakesResolvedPoints: 12,
    },
    verifiedJobsCount: 38,
    criticalMistakesPrevented: 19,
    safetyChecksPassedCount: 38,
    badges: ['mcb_fitting', 'earthing_check', 'switchboard_wiring'],
    isDemo: true,
    jobs: [],
  },
  {
    id: 'tech-anand',
    name: {
      te: 'కొత్తూరు ఆనందబాబు (K. Anand)',
      hi: 'कोत्तूरु आनंदबाबू (K. Anand)',
      en: 'K. Anand Babu',
    },
    phone: '+91 98492 88310',
    trade: {
      te: 'అపార్ట్‌మెంట్ మెయింటెనెన్స్ & ELCB/RCCB టెస్టింగ్',
      hi: 'अपार्टमेंट मेंटेनेंस और RCCB टेस्टिंग',
      en: 'Apartment Maintenance & RCCB Specialist',
    },
    experienceYears: 6,
    city: {
      te: 'వరంగల్, తెలంగాణ',
      hi: 'वारंगल, तेलंगाना',
      en: 'Warangal, Telangana',
    },
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    trustScore: 91,
    trustBreakdown: {
      verifiedJobsPoints: 43,
      safetyCompliancePoints: 36,
      mistakesResolvedPoints: 12,
    },
    verifiedJobsCount: 24,
    criticalMistakesPrevented: 11,
    safetyChecksPassedCount: 24,
    badges: ['mcb_fitting', 'switchboard_wiring', 'two_way_staircase'],
    isDemo: true,
    jobs: [],
  },
];
