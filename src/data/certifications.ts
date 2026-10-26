export type CertificationStatus = 'active' | 'for-renewal' | 'expired' | 'status-unavailable'
export type CertificationCategory =
  | 'AML & Compliance'
  | 'Cryptocurrency & Digital Assets'
  | 'Blockchain Intelligence'
  | 'Fraud & Forensics'
  | 'FinTech & Regulatory Education'
  | 'Other Professional Credentials'

export interface Certification {
  id: string
  name: string
  abbreviation?: string
  issuer: string
  category: CertificationCategory
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  verificationUrl?: string
  status: CertificationStatus
  note?: string
}

export const certificationCategories: CertificationCategory[] = [
  'AML & Compliance',
  'Cryptocurrency & Digital Assets',
  'Blockchain Intelligence',
  'Fraud & Forensics',
  'FinTech & Regulatory Education',
  'Other Professional Credentials',
]

export const certifications: Certification[] = [
  { id: 'acams-ccas', name: 'ACAMS Certified Cryptoasset AFC Specialist', abbreviation: 'CCAS', issuer: 'ACAMS', category: 'Cryptocurrency & Digital Assets', status: 'status-unavailable', note: 'Mandatory entry. Issue/expiry dates and credential ID not verified.' },
  { id: 'acams-cafca', name: 'ACAMS Certified AML FinTech Compliance Associate', abbreviation: 'CAFCA', issuer: 'ACAMS', category: 'AML & Compliance', status: 'status-unavailable', note: 'Verified as held (LinkedIn title suffix "ACAMS CAFCA"). Current status not verified.' },
  { id: 'ccfi', name: 'Certified Cryptocurrency Forensic Investigator', abbreviation: 'CCFI', issuer: 'To be confirmed', category: 'Fraud & Forensics', status: 'status-unavailable', note: 'Mandatory entry. Distinct from the McAfee Institute CCFI credential.' },
  { id: 'fraud-detection-prevention-specialist', name: 'Fraud Detection and Prevention Specialist', issuer: 'To be confirmed', category: 'Fraud & Forensics', status: 'status-unavailable', note: 'Mandatory entry. Issuer and dates to be confirmed.' },
  { id: 'certified-fraud-analyst', name: 'Certified Fraud Analyst', abbreviation: 'CFA', issuer: 'To be confirmed', category: 'Fraud & Forensics', status: 'status-unavailable', note: 'Mandatory entry. Issuer and dates to be confirmed.' },
  { id: 'certified-cryptocurrency-auditor', name: 'Certified Cryptocurrency Auditor', abbreviation: 'CCA', issuer: 'To be confirmed', category: 'Cryptocurrency & Digital Assets', status: 'status-unavailable', note: 'Mandatory entry. Issuer and dates to be confirmed.' },
  { id: 'chainalysis-ccfc', name: 'Chainalysis Cryptocurrency Fundamentals Certification', abbreviation: 'CCFC', issuer: 'Chainalysis', category: 'Blockchain Intelligence', status: 'status-unavailable', note: 'Verified as held (LinkedIn title suffix "CCFC"). Current status not verified.' },
  { id: 'chainalysis-ckc', name: 'Chainalysis KYT Certification', abbreviation: 'CKC', issuer: 'Chainalysis', category: 'Blockchain Intelligence', status: 'for-renewal', note: 'Marked "For renewal" per user instruction.' },
  { id: 'chainalysis-crc', name: 'Chainalysis Reactor Certification', abbreviation: 'CRC', issuer: 'Chainalysis', category: 'Blockchain Intelligence', status: 'for-renewal', note: 'Marked "For renewal" per user instruction.' },
  { id: 'blockchain-council-cryptocurrency-trader', name: 'Certified Cryptocurrency Trader', issuer: 'Blockchain Council', category: 'Cryptocurrency & Digital Assets', status: 'status-unavailable' },
  { id: 'blockchain-council-membership', name: 'Certificate of Membership', issuer: 'Blockchain Council', category: 'Other Professional Credentials', status: 'status-unavailable', note: 'Membership credential, not a certification.' },
  { id: 'mcafee-ccfi', name: 'Certified Cryptocurrency Forensic Investigator', abbreviation: 'CCFI', issuer: 'McAfee Institute', category: 'Fraud & Forensics', status: 'status-unavailable', note: 'Distinct credential from the generic CCFI entry.' },
  { id: 'ucb-blockchain-fundamentals', name: 'Professional Certificate in Blockchain Fundamentals', issuer: 'University of California, Berkeley', category: 'FinTech & Regulatory Education', status: 'status-unavailable' },
  { id: 'blockchain-council-cryptocurrency-expert', name: 'Certified Cryptocurrency Expert', issuer: 'Blockchain Council', category: 'Cryptocurrency & Digital Assets', status: 'status-unavailable' },
  { id: 'duke-fintech-law-policy', name: 'FinTech Law and Policy', issuer: 'Duke University', category: 'FinTech & Regulatory Education', status: 'status-unavailable' },
  { id: 'ucb-bitcoin-cryptocurrencies', name: 'Certificate of Achievement: Bitcoin and Cryptocurrencies', issuer: 'University of California, Berkeley', category: 'FinTech & Regulatory Education', status: 'status-unavailable' },
  { id: 'blockchain-council-blockchain-expert', name: 'Certified Blockchain Expert', abbreviation: 'CBE', issuer: 'Blockchain Council', category: 'Blockchain Intelligence', status: 'status-unavailable', note: 'Corresponds to "CBE" in LinkedIn title suffix.' },
  { id: 'ibm-blockchain-essentials', name: 'IBM Blockchain Essentials', issuer: 'IBM', category: 'Blockchain Intelligence', status: 'status-unavailable' },
  { id: 'dcc-certified-professional', name: 'DCC Certified Professional', abbreviation: 'DCC', issuer: 'Digital Currency Council / Credly', category: 'Cryptocurrency & Digital Assets', status: 'status-unavailable', note: 'Corresponds to "DCC" in LinkedIn title suffix.' },
  { id: 'ica-credential', name: 'International Compliance Association (ICA) Credential', abbreviation: 'ICA', issuer: 'International Compliance Association', category: 'Other Professional Credentials', status: 'status-unavailable', note: 'Verified as held (LinkedIn title suffix "ICA"). Current status not verified.' },
]

