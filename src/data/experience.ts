// Centralized experience data.
// Only entries that can be verified from public sources are included as verified.
// Anything marked verificationStatus !== 'verified' must be confirmed by Felix before publishing.

export type VerificationStatus = 'verified' | 'unverified'

export interface ExperienceEntry {
  id: string
  title: string
  organization: string
  location?: string
  dates?: string
  summary: string
  responsibilities: string[]
  verificationStatus: VerificationStatus
  verificationNote?: string
}

export const experience: ExperienceEntry[] = [
  {
    id: 'signature-bank',
    title: 'Senior Compliance / FIU Analyst',
    organization: 'Signature Bank',
    location: 'New York, United States',
    dates: '2019 (verified as of ACFCS scholarship listing)',
    summary:
      'Compliance and financial intelligence role at a U.S. bank, supporting AML/FIU operations.',
    responsibilities: [
      'Supported compliance and financial intelligence unit (FIU) analysis.',
      'Contributed to AML and financial crime risk work in a banking environment.',
    ],
    verificationStatus: 'verified',
    verificationNote: 'Verified via ACFCS 2019 crypto-role certification scholarship recipient list.',
  },
  {
    id: 'guixer-partners',
    title: 'Chief Compliance Officer — Advisor',
    organization: 'Guixer & Partners',
    location: 'Unspecified',
    dates: 'Unspecified',
    summary:
      'Advisory compliance role supporting a global financial platform operating across multiple jurisdictions.',
    responsibilities: [
      'Provided compliance advisory support.',
      'Supported financial crime and regulatory compliance initiatives.',
    ],
    verificationStatus: 'verified',
    verificationNote:
      'Verified via Guixer & Partners public team page; listed as "Felix T. Lomahan". Name form differs from Felix Lömahàn — confirm identity and dates.',
  },
  {
    id: 'consultant-current',
    title: 'Consultant',
    organization: 'AITECH CLOUD NETWORK (Solidus Ai Tech) — to be confirmed',
    location: 'To be confirmed',
    dates: 'To be confirmed',
    summary:
      'Current professional headline on LinkedIn lists "Consultant". Employer and dates require manual confirmation.',
    responsibilities: [
      'Compliance and AML consulting engagements (details to be confirmed by Felix).',
    ],
    verificationStatus: 'unverified',
    verificationNote:
      'Employer inferred from LinkedIn "can introduce you to 3 people at AITECH CLOUD NETWORK". Confirm employer, title, location, and dates.',
  },
]

// Template for adding more entries:
// {
//   id: 'unique-id',
//   title: 'Job Title',
//   organization: 'Employer',
//   location: 'City, Country',
//   dates: 'Month Year – Month Year',
//   summary: 'Short summary.',
//   responsibilities: ['Responsibility 1', 'Responsibility 2'],
//   verificationStatus: 'verified', // or 'unverified'
//   verificationNote: 'Source of verification.',
// },
