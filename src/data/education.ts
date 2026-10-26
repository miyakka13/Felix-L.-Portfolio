export interface EducationLink { label: string; url: string }
export interface EducationEntry {
  id: string
  institution: string
  program: string
  type?: 'degree' | 'certificate' | 'professional-development'
  dates?: string
  grade?: string
  details?: string[]
  courses?: string[]
  links?: EducationLink[]
  verificationStatus: 'verified' | 'unverified'
  verificationNote?: string
}
export const education: EducationEntry[] = [
  {
    id: 'keller-mba',
    institution: 'Keller Graduate School of Management of DeVry University',
    program: 'Master of Business Administration (MBA) — Management',
    type: 'degree',
    dates: '2008 – Jun 2011',
    grade: 'GPA 3.51/4.0',
    details: [
      "First master's program; completed March 2011 and graduated June 2011.",
      'Concentration in Management.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'keller-msism',
    institution: 'Keller Graduate School of Management of DeVry University',
    program: 'Master of Science in Information Systems Management (MSISM)',
    type: 'degree',
    dates: '2012 – 2013',
    grade: 'GPA 3.61/4.0',
    details: [
      'Second master\'s program; completed February 2013 and graduated June 2013.',
      'Coursework included IT governance (COBIT, COSO, SOX), auditing procedures, project management, and information security.',
      'Capstone project "A.L.A.R.M." won the 2013 Student Innovation and Impact Award.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'devry-as-network-systems',
    institution: 'DeVry University',
    program: 'Associate of Science — Network Systems Administration',
    type: 'degree',
    dates: '2006 – 2008',
    grade: 'GPA 3.64/4.0',
    details: [
      'National Dean\'s List; International Scholar Laureate Program nominee; Cisco Networking Academy alumnus.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'slu-bs-it',
    institution: 'Saint Louis University (PH)',
    program: 'Bachelor of Science — Information Technology',
    type: 'degree',
    dates: '2001 – 2006',
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },

  {
    id: 'upenn-regulatory-compliance',
    institution: 'University of Pennsylvania (via Coursera)',
    program: 'Professional Certificate Specialization in Regulatory Compliance',
    type: 'certificate',
    dates: 'Sep 2022 – Nov 2022',
    courses: [
      'What is Compliance?',
      'Effective Compliance Programs',
      'Privacy Law and Data Protection',
      'What is Corruption: Anti-Corruption and Compliance',
    ],
    links: [
      { label: 'Regulatory Compliance Specialization', url: 'https://coursera.org/share/1335d0e0741be43ccaa364f1c6d641ad' },
      { label: 'Certificate of Completion — What Is Corruption', url: 'https://www.coursera.org/account/accomplishments/certificate/SHYBHPPVMV95' },
      { label: 'Certificate of Completion — Privacy Law and Data Protection', url: 'https://coursera.org/share/f4204c3ebdeeb6eea672c511e99e801f' },
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },
  {
    id: 'upenn-fintech',
    institution: 'University of Pennsylvania / Wharton (via Coursera)',
    program: 'Professional Certificate Program in Financial Technology (FinTech)',
    type: 'certificate',
    dates: 'Nov 2019',
    courses: [
      'FinTech: Foundations, Payments, and Regulations',
      'Cryptocurrency and Blockchain: An Introduction to Digital Currencies',
      'Lending, Crowdfunding, and Modern Investing',
      'Application of AI, InsurTech, and Real Estate Technology',
    ],
    links: [
      { label: 'Professional Certificate Program in Financial Technology (FinTech)', url: 'https://www.coursera.org/account/accomplishments/specialization/VYR8R9PQEMTS' },
      { label: 'Certificate of Completion: FinTech — Foundations, Payments, and Regulations', url: 'https://www.coursera.org/account/accomplishments/verify/W4TNBJUVHWKN' },
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },
  {
    id: 'ibm-data-science',
    institution: 'IBM (via Coursera)',
    program: 'Professional Certificate Program in Data Science, Machine Learning, and Artificial Intelligence',
    type: 'certificate',
    dates: '2020 – Present',
    details: [
      'Nine-module program; modules 1 (What is Data Science?) and 2 (Open Source Tools for Data Science) completed; modules 3–9 not completed.',
    ],
    verificationStatus: 'unverified',
    verificationNote: 'Self-reported on LinkedIn; completion status partial.',
  },
  {
    id: 'hku-fintech',
    institution: 'The University of Hong Kong (via edX)',
    program: 'Professional Certificate in Financial Technology (FinTech)',
    type: 'certificate',
    dates: '2019',
    courses: [
      'Introduction to FinTech',
      'FinTech Ethics and Risks',
      'Blockchain and FinTech: Basics, Applications and Limitations',
    ],
    links: [
      { label: 'Verify this edX credential', url: 'https://credentials.edx.org/credentials/3bc6157f511742a49badeb39eec3aff1/' },
      { label: 'Certificate of Completion: Introduction to FinTech', url: 'https://courses.edx.org/certificates/382efb80023249debb2b0dddf0f1e74d' },
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },
  {
    id: 'ucb-blockchain-fundamentals',
    institution: 'University of California, Berkeley (via edX)',
    program: 'Professional Certificate in Blockchain Fundamentals',
    type: 'certificate',
    dates: '2018',
    details: [
      'Comprehensive program covering cryptocurrency and blockchain technology.',
    ],
    links: [
      { label: 'Verify this edX credential', url: 'https://credentials.edx.org/credentials/57af2405a00a420fa57d96b7cce17c45/' },
      { label: 'Certificate of Completion: Blockchain Technology', url: 'https://courses.edx.org/certificates/ca8600473b5d43ccb7cd992acfb27f56' },
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },

  {
    id: 'acams-virtual-currency-blockchain',
    institution: 'Association of Certified Anti-Money Laundering Specialists (ACAMS)',
    program: 'Certificate of Completion — Virtual Currency and Blockchain',
    type: 'certificate',
    details: [
      '4-week online training program covering the history of virtual currency and regulatory evolution, law-enforcement lessons learned, and identifying/mitigating threats to financial institutions.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },
  {
    id: 'acams-sanctions',
    institution: 'Association of Certified Anti-Money Laundering Specialists (ACAMS)',
    program: 'Certificate of Completion — Sanctions (UN, US OFAC/BIS, UK, China, Japan)',
    type: 'certificate',
    details: [
      '4-week online training covering international sanctions laws (UN, US OFAC/BIS, UK ECO/HM Treasury, China, Japan, Russia), list screening, false-positive vs. false-negative hits, and case studies.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section.',
  },
  {
    id: 'training-2021',
    institution: 'myCPE / Various Providers',
    program: '2021 Compliance, AML, Blockchain and Cryptocurrency Trainings',
    type: 'professional-development',
    dates: '2021',
    details: [
      'Taxes on Cryptocurrency & Digital Assets with Latest IRS Guidance (Jun 3, 2021) — myCPE',
      'Fraud/Anti-corruption Awareness, Prevention and Detection (Jun 1, 2021) — myCPE',
      'Fraud: Practical Approaches to Prevention & Detection (May 31, 2021) — myCPE',
      'Auditing for Corruption (May 31, 2021) — myCPE',
      'Cryptocurrency Fraud and Forensics (May 28, 2021) — myCPE',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'training-2020',
    institution: 'Various Providers',
    program: '2020 Compliance, AML, Blockchain and Cryptocurrency Trainings',
    type: 'professional-development',
    dates: '2020',
    details: [
      'MIT Bitcoin Expo 2020 (Mar 7-8, 2020) — MIT, Cambridge, MA',
      'ACFCS East Coast Crypto Symposium (Mar 6, 2020) — Northeastern University, Boston, MA',
      'Paxos Stablecoin Masterclass (Feb 26, 2020) — Paxos HQ, New York City',
      'FIBA Webinar: Marijuana Related Businesses, Legislation and Banking (Feb 24, 2020)',
      'Chainalysis Webinar: The 2020 State of Crypto Crime — Part 2 (Feb 12, 2019)',
      'Chainalysis Webinar: The 2020 State of Crypto Crime — Part 1 (Feb 5, 2019)',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'training-2019-blockchain',
    institution: 'Various Providers',
    program: '2019 Blockchain and Cryptocurrency Trainings',
    type: 'professional-development',
    dates: '2019',
    details: [
      'ACFCS Webinar: Blockchain Tracing — Cryptocurrency AML and Financial Investigation Workshop (Oct 3, 2019)',
      'ACFCS Webinar: The FATF’s Virtual Asset Guidance (Sep 25, 2019)',
      'Chainalysis Webinar: Combating the Opioid Crisis with Cryptocurrency Analysis (Sep 18, 2019)',
      'Chainalysis Webinar: Detecting and Preventing Crypto Crime with Fewer False Positives (Sep 4, 2019)',
      'ACFCS Webinar: Understanding and Addressing the Financial Crime Risks Posed by Facebook’s New Cryptocurrency (Aug 22, 2019)',
      'Chainalysis Webinar: Cryptocurrency Typologies (Aug 14, 2019)',
      'Blockchain Training Alliance: The Lifecycle of a Blockchain Project (Jul 18, 2019)',
      'WSBA Webinar: Tax Info Reporting for Cryptocurrency Transactions (Jun 20, 2019)',
      'ACFCS: Cyber-Enabled Crime in Fraud and AML (Jul 17, 2019)',
      'Chainalysis Webinar: Introduction to the Cryptocurrency Ecosystem (Jun 19, 2019)',
      'Chainalysis Webinar: Filing Cryptocurrency SARs (Jun 13, 2019)',
      'Chainalysis Webinar: Who’s Behind Ransomware Attacks? (May 31, 2019)',
      'ACFCS Webinar: Methods for Detecting & Preventing Crypto Financial Crime (Apr 4, 2019)',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
  {
    id: 'training-2019-aml',
    institution: 'Various Providers',
    program: '2019 AML and Compliance Trainings',
    type: 'professional-development',
    dates: '2019',
    details: [
      'ACFCS Webinar: Financial Fraud Schemes — Perspective and Insights from Homeland Security Investigations (Jul 31, 2019)',
      'ACFCS Webinar: Cyber-Enabled Crime in Fraud and AML (Jul 17, 2019)',
      'SAS Webinar: Using AI to Counter Human Trafficking (Jun 6, 2019)',
      'ACFCS Webinar: IRS-CI on Financial Crime — Threats, Solutions Today and Beyond (May 31, 2019)',
      'ACFCS Webinar: Banking on Marijuana — Current Views, Regulatory Trends, and Practical Considerations (May 30, 2019)',
      'ACFCS Webinar: Risk, Rule Sets and Hybrid Threat Finance — Best Practices in AML Risk Assessment (Apr 17, 2019)',
      'ACFCS Webinar: How to Detect Signs of Human Trafficking/Smuggling (Apr 12, 2019)',
      'Seminar: The Future of Financial Crime (Feb 28, 2019) — ACFCS, MIT',
      'ACFCS Webinar: Identifying & Resolving Elder Fraud (Feb 6, 2019)',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via LinkedIn education section (self-reported).',
  },
]

