export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  credential_id?: string
  credential_url?: string
}

export const certificates: Certificate[] = [
  {
    id: 'masai-fullstack',
    title: 'Full Stack Web Development',
    issuer: 'Masai School · Nolan Edutech Pvt. Ltd.',
    date: 'May 2025',
    image: '/assets/project/masai.png',
    credential_id: 'Issued 11 May 2025 · 2160 hrs training',
    credential_url:
      'https://drive.google.com/file/d/1HIMx0qlR3tC13hkEK7LM9tqu7G4CmE1F/view?usp=sharing',
  },
  {
    id: 'internship-certificate',
    title: 'Full Stack Development Internship',
    issuer: 'Tech Company',
    date: '2024',
    image: '/assets/Certificate.png',
    credential_id: 'CERT-2024-001',
    credential_url:
      'https://drive.google.com/file/d/17zb6BsEnNeAFZNxO0MQmluxBC2myo5N7/view?usp=sharing',
  },
]
