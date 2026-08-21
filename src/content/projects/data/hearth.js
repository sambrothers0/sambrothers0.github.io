import { SKILLS } from '@/content/projects/skills'

export default {
  title: 'Hearth',
  date: '2026-07',
  url: 'https://hearth.vigetx.com',
  skills: [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.TAILWIND],
  thumbnail: '/img/projects/hearth.png',
  body: `Hearth is an office-attendance scheduling app built at Viget that lets teammates plan and confirm which days they will be in the office. I built full-stack features across a React 19, TypeScript, and Tailwind frontend, delivering the shared calendar, office roster, and onboarding flows as reviewed pull requests. The calendar syncs live between users over Action Cable web sockets, and I integrated the app with a Slack bot so people can edit and confirm their in-office days without ever leaving a Slack DM.`
}
