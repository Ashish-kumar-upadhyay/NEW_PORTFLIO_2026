export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  credential_id?: string
}

export const certificates: Certificate[] = [
  {
    id: 'internship-certificate',
    title: 'Full Stack Development Internship',
    issuer: 'Tech Company',
    date: '2024',
    image: '/assets/Certificate.png',
    credential_id: 'CERT-2024-001',
  },
]
