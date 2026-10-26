// Centralized profile data for Felix Lömahàn.
// Update personal details here. Do not scatter personal info across components.
// Name spelling is intentional and must remain exact: Felix Lömahàn

export const profile = {
  name: 'Felix Lömahàn',
  title: 'Senior Compliance Officer & AML Consultant',
  headline: 'Navigating Financial Crime Risk. Strengthening Compliance. Securing the Digital Economy.',
  intro:
    'Senior compliance and anti-money laundering professional with experience in financial crime prevention, regulatory compliance, fraud analysis, and cryptocurrency investigations. Combining traditional compliance expertise with digital asset intelligence to help organizations navigate evolving financial crime risks.',
  location: 'United States',
  linkedin: 'https://www.linkedin.com/in/felixlomahan/',
  // Self-reported on LinkedIn ("over 15 years of diverse experience"). Verify before publishing.
  experienceClaim: 'over 15 years of diverse experience',
  mission:
    'To help organizations strengthen compliance controls, manage evolving financial crime threats, and build resilient, risk-based compliance programs across traditional finance and digital assets.',
  about: [
    'Felix Lömahàn is a Senior Compliance Officer & AML Consultant focused on anti-money laundering, financial crime prevention, fraud analysis, and cryptocurrency investigations.',
    'His work sits at the intersection of traditional financial crime compliance and emerging digital asset risks — applying investigative techniques, blockchain intelligence, and regulatory awareness to support compliance programs and risk mitigation.',
    'He has been associated with financial institutions and consulting engagements spanning compliance operations, financial intelligence, and digital asset risk, and holds a portfolio of professional credentials across AML, blockchain analytics, fraud, and FinTech compliance.',
  ],
  expertise: [
    {
      title: 'Anti-Money Laundering & Financial Crime Compliance',
      items: ['AML compliance frameworks', 'Financial crime risk assessment', 'Suspicious activity identification and investigation', 'Compliance controls and procedures'],
      icon: 'ShieldCheck',
    },
    {
      title: 'Cryptocurrency & Digital Asset Compliance',
      items: ['Digital asset risk awareness', 'Cryptocurrency-related financial crime', 'Digital asset transaction analysis', 'Emerging compliance challenges'],
      icon: 'Coins',
    },
    {
      title: 'Blockchain Intelligence & Investigations',
      items: ['Blockchain transaction tracing', 'Know Your Transaction (KYT) analysis', 'Blockchain intelligence tools', 'Cryptocurrency forensic investigation'],
      icon: 'Network',
    },
    {
      title: 'Fraud Detection & Prevention',
      items: ['Fraud risk identification', 'Investigative analysis', 'Fraud prevention controls', 'Financial crime indicators'],
      icon: 'Search',
    },
    {
      title: 'Cryptocurrency Auditing',
      items: ['Cryptocurrency-related audit concepts', 'Transaction review', 'Risk identification', 'Supporting documentation and investigation'],
      icon: 'FileCheck',
    },
    {
      title: 'Compliance Advisory',
      items: ['Regulatory compliance support', 'Risk-based compliance practices', 'Internal control improvements', 'Compliance process development'],
      icon: 'Scale',
    },
  ],
  philosophy: [
    { title: 'Risk-Based Thinking', description: 'Identify and prioritize material financial crime risks.' },
    { title: 'Investigative Rigor', description: 'Support conclusions with evidence and appropriate analytical methods.' },
    { title: 'Regulatory Awareness', description: 'Keep compliance practices aligned with applicable requirements.' },
    { title: 'Technology-Enabled Compliance', description: 'Apply appropriate digital asset and blockchain intelligence tools to investigations.' },
  ],
  contact: {
    consultationHeadline: 'Discuss a Compliance or AML Consultation',
    invitation:
      'Open to compliance advisory, professional networking, and relevant consulting inquiries related to AML, financial crime, and digital asset risk.',
    email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? '',
  },
} as const

export type Profile = typeof profile
