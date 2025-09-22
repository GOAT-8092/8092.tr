// Team Member Data Types and Interfaces
export interface TeamMember {
  socialMedias?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    website?: string;
  };
  id: string;
  name: string;
  roles: string[];
  year: string;
  image: string;
  isCaptain: boolean;
  type: 'member' | 'mentor';
  isLeadMentor?: boolean;
}

export interface TeamYear {
  year: string;
  members: TeamMember[];
  mentors: TeamMember[];
}

// Current Team Members (2024-2025)
export const currentTeamMembers: TeamMember[] = [
  {
    id: 'halil-ibrahim-oz',
    name: 'Halil İbrahim Öz',
    roles: [],
    year: '2024-',
    image: 'team-halil-captain-1.png',
    isCaptain: true,
    type: 'member',
  },
  {
    id: 'muhammet-mirac-aktemur',
    name: 'Muhammet Miraç Aktemur',
    roles: ['Mekanik'],
    year: '2024-',
    image: 'team-mirac-member.jpg',
    isCaptain: true,
    type: 'member',
  },
  {
    id: 'emirhan-akin',
    name: 'Emirhan Akın',
    roles: ['Mekanik', 'Güvenlik Kaptanı'],
    year: '2024-',
    image: 'team-emirhan-member-1.png',
    isCaptain: false,
    type: 'member',
  },
  {
    id: 'alperen-dag',
    name: 'Alperen Dağ',
    roles: ['Yazılım', 'Elektrik'],
    year: '2025-',
    image: 'team-alperen-member-1.png',
    isCaptain: false,
    type: 'member',
  },
  {
    id: 'huseyin-kalayci',
    name: 'Hüseyin Kalaycı',
    roles: ['Mekanik'],
    year: '2024-',
    image: 'team-huseyin-member.jpg',
    isCaptain: false,
    type: 'member',
  },
  {
    id: 'toprak-talha-soylu',
    name: 'Toprak Talha Soylu',
    roles: ['Yazılım', 'Elektrik'],
    year: '2024-',
    image: 'team-toprak2-member.jpg',
    isCaptain: false,
    type: 'member',
  },
  {
    id: 'elif-gulsum-senol',
    name: 'Elif Gülsüm Şenol',
    roles: ['Güvenlik', 'Mekanik'],
    year: '2024-',
    image: 'team-elif-member-1.png',
    isCaptain: false,
    type: 'member',
  },
  {
    id: 'nurettin-nural',
    name: 'Nurettin Nural',
    roles: ['Elektrik', 'Yazılım'],
    year: '2024-',
    image: 'team-nurettin2-member.jpg',
    isCaptain: false,
    type: 'member',
  },
];

// Team Mentors (All Years)
export const teamMentors: TeamMember[] = [
  // 2019 Mentors
  {
    id: 'hakan-kose',
    name: 'Hakan Köse',
    roles: ['Baş Mentor'],
    year: '2019-',
    image: 'team-hakan-hoca-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: true,
    socialMedias: {
      instagram: 'https://instagram.com/hakankose26',
      linkedin: 'https://www.linkedin.com/in/hakan-k%C3%B6se-0b4900248/',
    },
  },
  {
    id: 'ecem-colak',
    name: 'Ecem Çolak',
    roles: ['Mentor'],
    year: '2019-',
    image: 'team-ecem-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
    socialMedias: {
      instagram: 'https://instagram.com/ecem_colak',
      linkedin: 'https://www.linkedin.com/in/ecem-colak/',
    },
  },
  {
    id: 'yagiz-engin',
    name: 'Yağız Engin',
    roles: ['Mentor'],
    year: '2019-',
    image: 'team-yagiz-member.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
    socialMedias: {
      instagram: 'https://instagram.com/yagizengin_',
      linkedin: 'https://www.linkedin.com/in/ya%C4%9F%C4%B1z-engin-7353aa22a/',
    },
  },
  {
    id: 'omer-faruk-gunal',
    name: 'Ömer Faruk Günal',
    roles: ['Mentor'],
    year: '2019-',
    image: 'team-omer-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
    socialMedias: {
      instagram: 'https://www.instagram.com/omergunal0/',
      linkedin: 'https://www.linkedin.com/in/%C3%B6mer-faruk-g%C3%BCnal-b7a606271/',
    },
  },
  {
    id: 'ali-erkan-saruhan',
    name: 'Ali Erkan Saruhan',
    roles: ['Mentor'],
    year: '2019-',
    image: 'team-saruhan-member.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
    socialMedias: {
      linkedin: 'https://www.linkedin.com/in/ali-erkan-saruhan-25736416b/',
    },
  },
  // 2022 Mentors
  {
    id: 'selin-ertan',
    name: 'Selin Ertan',
    roles: ['Baş Mentor'],
    year: '2022-',
    image: 'team-selin2-member.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: true,
    socialMedias: {
      instagram: 'https://www.instagram.com/q.selinx.p/',
    },
  },
  // 2024 Mentors
  {
    id: 'kagan-bahadir-durgut',
    name: 'Kağan Bahadır Durgut',
    roles: ['Mentor'],
    year: '2024-',
    image: 'team-kagan-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
  },
  {
    id: 'hasret-okumus',
    name: 'Hasret Okumuş',
    roles: ['Mentor'],
    year: '2024-',
    image: 'team-hasret-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
  },
  {
    id: 'bugra-canata',
    name: 'Buğra Canata',
    roles: ['Mentor'],
    year: '2024-',
    image: 'team-bugra-mentor.png',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false,
    socialMedias: {
      instagram: 'https://www.instagram.com/bugracanata/',
      linkedin: 'https://www.linkedin.com/in/canata/',
    },
  },
];

// Combined team data
export const allTeamMembers: TeamMember[] = [...currentTeamMembers, ...teamMentors];

// Helper functions
export const getMembersByYear = (year: string): TeamMember[] => {
  return allTeamMembers.filter(member => member.year.startsWith(year));
};

export const getCaptains = (): TeamMember[] => {
  return currentTeamMembers.filter(member => member.isCaptain);
};

export const getLeadMentors = (): TeamMember[] => {
  return teamMentors.filter(mentor => mentor.isLeadMentor);
};

export const getMembersByRole = (role: string): TeamMember[] => {
  return allTeamMembers.filter(member =>
    member.roles.some(r => r.toLowerCase().includes(role.toLowerCase()))
  );
};

export const getActiveMembersByType = (type: 'member' | 'mentor'): TeamMember[] => {
  return allTeamMembers.filter(member => member.type === type);
};

// Team statistics
export const teamStats = {
  totalMembers: currentTeamMembers.length,
  totalMentors: teamMentors.length,
  totalCaptains: getCaptains().length,
  totalLeadMentors: getLeadMentors().length,
  foundingYear: 2019,
  activeYears: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
};

// Team history data
export const teamHistory = {
  2019: {
    season: 'Destination: Deep Space',
    status: 'Kuruluş Yılı - Resmi yarışmaya katılım yok',
    achievements: ['Takım kuruldu', 'İç eğitim ve tanıtım faaliyetleri'],
  },
  2020: {
    season: 'Infinite Recharge',
    status: 'İlk resmi yarışma',
    achievements: ['🏆 Rookie All Star Ödülü', 'Bosphorus Regional 27. sıra', '4–4 maç derecesi'],
  },
  2021: {
    season: 'Infinite Recharge at Home',
    status: 'Online yarışmalar',
    achievements: [
      'Germanium Group 11. sıra',
      'Veliköy OSB MTAL öğrencileri katıldı',
      'G.O.A.T. Jr. alt takımı kuruldu',
    ],
  },
  2022: {
    season: 'Rapid React',
    status: 'Sahalara dönüş',
    achievements: ['Bosphorus Regional 8. sıra', '5–5 maç derecesi', 'Çeyrek finale yükseldi'],
  },
  2023: {
    season: 'Charged Up',
    status: 'İstikrarlı performans',
    achievements: ['Bosphorus Regional 24. sıra', '5 galibiyet, 4 mağlubiyet'],
  },
  2024: {
    season: 'Crescendo',
    status: 'Sponsor desteği güçlendirme',
    achievements: [
      'Yeni sponsorlar: Çetin Group, Saray Alüminyum, Yılmaz Kalıp',
      'Ekip içi eğitimler',
    ],
  },
  2025: {
    season: 'REEFSCAPE',
    status: 'FRC sahnesine geri dönüş',
    achievements: [
      'Bosphorus Regional 36. sıra',
      '3 galibiyet, 6 mağlubiyet',
      'STEM eğitim faaliyetleri',
    ],
  },
};

export default {
  currentTeamMembers,
  teamMentors,
  allTeamMembers,
  teamStats,
  teamHistory,
  getMembersByYear,
  getCaptains,
  getLeadMentors,
  getMembersByRole,
  getActiveMembersByType,
};
