// Team Member Data Types and Interfaces
export interface TeamMember {
  id: string;
  name: string;
  role: string;
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
    role: 'Takım Kaptanı',
    year: '2024-',
    image: 'Halil.png',
    isCaptain: true,
    type: 'member'
  },
  {
    id: 'muhammet-mirac-aktemur',
    name: 'Muhammet Miraç Aktemur',
    role: 'Mekanik ve Takım Kaptanı',
    year: '2024-',
    image: 'Mirac.png',
    isCaptain: true,
    type: 'member'
  },
  {
    id: 'alperen-dag',
    name: 'Alperen Dağ',
    role: 'Yazılım ve Elektrik',
    year: '2025-',
    image: 'Alperen.png',
    isCaptain: false,
    type: 'member'
  },
  {
    id: 'emirhan-akin',
    name: 'Emirhan Akın',
    role: 'Mekanik ve Güvenlik Kaptanı',
    year: '2024-',
    image: 'Emirhan.png',
    isCaptain: true,
    type: 'member'
  },
  {
    id: 'mustafa-muhiddin-yazi',
    name: 'Mustafa Muhiddin Yazı',
    role: 'Eş PR Kaptanı',
    year: '2024-',
    image: 'Mustafa.png',
    isCaptain: true,
    type: 'member'
  },
  {
    id: 'tuana-akdemir',
    name: 'Tuana Akdemir',
    role: 'Mekanik ve Elektrik',
    year: '2024-',
    image: 'Tuana.png',
    isCaptain: false,
    type: 'member'
  },
  {
    id: 'elif-gulsum-senol',
    name: 'Elif Gülsüm Şenol',
    role: 'Güvenlik Kaptanı ve Mekanik',
    year: '2024-',
    image: 'Elif.png',
    isCaptain: true,
    type: 'member'
  },
  {
    id: 'nurettin-nural',
    name: 'Nurettin Nural',
    role: 'Elektrik Kaptanı ve Yazılım',
    year: '2024-',
    image: 'Nurettin2.png',
    isCaptain: true,
    type: 'member'
  }
];

// Team Mentors (All Years)
export const teamMentors: TeamMember[] = [
  // 2019 Mentors
  {
    id: 'hakan-kose',
    name: 'Hakan Köse',
    role: 'Baş Mentor',
    year: '2019-',
    image: 'Hakan Hoca.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: true
  },
  {
    id: 'ecem-colak',
    name: 'Ecem Çolak',
    role: 'Mentor',
    year: '2019-',
    image: 'colak.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  {
    id: 'yagiz-engin',
    name: 'Yağız Engin',
    role: 'Mentor',
    year: '2019-',
    image: 'yagiz.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  {
    id: 'omer-faruk-gunal',
    name: 'Ömer Faruk Günal',
    role: 'Mentor',
    year: '2019-',
    image: 'omer.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  {
    id: 'ali-erkan-saruhan',
    name: 'Ali Erkan Saruhan',
    role: 'Mentor',
    year: '2019-',
    image: 'saruhan.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  // 2022 Mentors
  {
    id: 'selin-ertan',
    name: 'Selin Ertan',
    role: 'Baş Mentor',
    year: '2022-',
    image: 'selin2.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: true
  },
  {
    id: 'muhittin-ozdemir',
    name: 'Muhittin Özdemir',
    role: 'Mentor',
    year: '2022-',
    image: 'muhittin.JPG',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  // 2024 Mentors
  {
    id: 'kagan-bahadir-durgut',
    name: 'Kağan Bahadır Durgut',
    role: 'Mentor',
    year: '2024-',
    image: 'kagan.JPG',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  {
    id: 'hasret-okumus',
    name: 'Hasret Okumuş',
    role: 'Mentor',
    year: '2024-',
    image: '/img/hasret.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  },
  {
    id: 'bugra-canata',
    name: 'Buğra Canata',
    role: 'Mentor',
    year: '2024-',
    image: 'bugra.jpg',
    isCaptain: false,
    type: 'mentor',
    isLeadMentor: false
  }
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
    member.role.toLowerCase().includes(role.toLowerCase())
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
  activeYears: ['2019', '2020', '2021', '2022', '2023', '2024', '2025']
};

// Team history data
export const teamHistory = {
  2019: {
    season: 'Destination: Deep Space',
    status: 'Kuruluş Yılı - Resmi yarışmaya katılım yok',
    achievements: ['Takım kuruldu', 'İç eğitim ve tanıtım faaliyetleri']
  },
  2020: {
    season: 'Infinite Recharge',
    status: 'İlk resmi yarışma',
    achievements: ['🏆 Rookie All Star Ödülü', 'Bosphorus Regional 27. sıra', '4–4 maç derecesi']
  },
  2021: {
    season: 'Infinite Recharge at Home',
    status: 'Online yarışmalar',
    achievements: ['Germanium Group 11. sıra', 'Veliköy OSB MTAL öğrencileri katıldı', 'G.O.A.T. Jr. alt takımı kuruldu']
  },
  2022: {
    season: 'Rapid React',
    status: 'Sahalara dönüş',
    achievements: ['Bosphorus Regional 8. sıra', '5–5 maç derecesi', 'Çeyrek finale yükseldi']
  },
  2023: {
    season: 'Charged Up',
    status: 'İstikrarlı performans',
    achievements: ['Bosphorus Regional 24. sıra', '5 galibiyet, 4 mağlubiyet']
  },
  2024: {
    season: 'Crescendo',
    status: 'Sponsor desteği güçlendirme',
    achievements: ['Yeni sponsorlar: Çetin Group, Saray Alüminyum, Yılmaz Kalıp', 'Ekip içi eğitimler']
  },
  2025: {
    season: 'REEFSCAPE',
    status: 'FRC sahnesine geri dönüş',
    achievements: ['Bosphorus Regional 36. sıra', '3 galibiyet, 6 mağlubiyet', 'STEM eğitim faaliyetleri']
  }
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
  getActiveMembersByType
};