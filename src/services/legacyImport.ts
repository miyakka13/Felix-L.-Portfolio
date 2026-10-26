import * as profileService from '@/services/profile'
import * as experienceService from '@/services/experience'
import * as certificateService from '@/services/certificates'
import * as educationService from '@/services/education'
import { profile as legacyProfile } from '@/data/profile'
import { experience as legacyExperience } from '@/data/experience'
import { certifications as legacyCerts } from '@/data/certifications'
import { education as legacyEducation } from '@/data/education'

export async function importLegacyContent() {
  // Profile
  const existingProfiles = await profileService.fetchAllProfiles()
  if (existingProfiles.length === 0) {
    await profileService.upsertProfile({
      name: legacyProfile.name,
      title: legacyProfile.title,
      location: legacyProfile.location,
      linkedin_url: legacyProfile.linkedin,
      email: legacyProfile.contact.email || null,
      mission: legacyProfile.mission,
      about: [...legacyProfile.about],
      expertise: legacyProfile.expertise.map((e) => ({ title: e.title, items: [...e.items], icon: e.icon })),
      philosophy: legacyProfile.philosophy.map((p) => ({ title: p.title, description: p.description })),
      published: true,
      sort_order: 0,
    })
  }

  // Experience
  const existingExp = await experienceService.fetchAllExperience()
  if (existingExp.length === 0) {
    for (let i = 0; i < legacyExperience.length; i++) {
      const e = legacyExperience[i]
      await experienceService.createExperience({
        role: e.title,
        company: e.organization,
        period: e.dates ?? '',
        location: e.location ?? null,
        description: [...e.responsibilities, e.summary].filter(Boolean),
        technologies: [],
        published: true,
        sort_order: i,
      })
    }
  }

  // Certificates
  const existingCerts = await certificateService.fetchAllCertificates()
  if (existingCerts.length === 0) {
    for (let i = 0; i < legacyCerts.length; i++) {
      const c = legacyCerts[i]
      await certificateService.createCertificate({
        name: c.name,
        abbreviation: c.abbreviation ?? null,
        issuer: c.issuer,
        category: c.category,
        issue_date: c.issueDate ?? null,
        expiry_date: c.expiryDate ?? null,
        credential_id: c.credentialId ?? null,
        credential_url: c.verificationUrl ?? null,
        status: c.status,
        note: c.note ?? null,
        published: true,
        sort_order: i,
      })
    }
  }

  // Education
  const existingEdu = await educationService.fetchAllEducation()
  if (existingEdu.length === 0) {
    for (let i = 0; i < legacyEducation.length; i++) {
      const e = legacyEducation[i]
      await educationService.createEducation({
        institution: e.institution,
        program: e.program,
        type: e.type ?? 'degree',
        start_date: e.dates ?? null,
        end_date: null,
        grade: e.grade ?? null,
        details: e.details ?? [],
        courses: e.courses ?? [],
        links: e.links ?? [],
        published: true,
        sort_order: i,
      })
    }
  }
}
