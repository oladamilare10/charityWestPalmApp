import { banners } from '../assets';

export const projects = [
  // Recent projects (synced with RecentProjects)
  {
    id: 1,
    title: "Child Of Hope",
    description: "Providing education and support to children in need.",
    image: banners.bannerTen,
    progress: 11,
    impact: "12,000+ children would be educated",
    raised: 11350,
    goal: 1000000,
    category: "Education",
    status: "urgent",
    startDate: "2025-02-01",
    endDate: "2025-06-01",
    location: "Global",
    stats: {
      donors: 49,
      countries: 3,
      shares: 10
    }
  },
  {
    id: 2,
    title: "A Women, A SuperHero",
    description: "Empowering women through education and skills training.",
    image: banners.bannerEleven,
    progress: 75,
    impact: "10,000+ women trained",
    raised: 650000,
    goal: 800000,
    category: "Education",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-05-21",
    location: "Global",
    stats: {
      donors: 2450,
      countries: 35,
      shares: 1200
    }
  },
  {
    id: 3,
    title: "Gaza Emergency Relief",
    description: "Providing essential medical supplies and humanitarian aid to families affected by the crisis.",
    image: banners.hero.heroSeven,
    progress: 85,
    impact: "12,000+ families helped",
    raised: 850000,
    goal: 1000000,
    category: "Emergency Relief",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-05-01",
    location: "Gaza Strip",
    stats: {
      donors: 2450,
      countries: 35,
      shares: 1200
    }
  },
  {
    id: 4,
    title: "Children's Health Fund",
    description: "Supporting health initiatives for underprivileged children worldwide.",
    image: banners.bannerSeven,
    progress: 65,
    impact: "5,000+ children educated",
    raised: 325000,
    goal: 500000,
    category: "Healthcare",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-09-16",
    location: "Global",
    stats: {
      donors: 1850,
      countries: 28,
      shares: 950
    }
  },
  {
    id: 5,
    title: "Clean Water Initiative",
    description: "Building sustainable water systems in communities lacking access to clean water.",
    image: banners.bannerNine,
    progress: 45,
    impact: "20+ communities served",
    raised: 180000,
    goal: 400000,
    category: "Infrastructure",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2025-09-01",
    location: "Africa",
    stats: {
      donors: 1200,
      countries: 15,
      shares: 680
    }
  },
  {
    id: 6,
    title: "Medical Aid Program",
    description: "Providing medical care and supplies to underserved communities.",
    image: banners.bannerFour,
    progress: 75,
    impact: "8,000+ patients treated",
    raised: 375000,
    goal: 500000,
    category: "Healthcare",
    status: "active",
    startDate: "2024-10-05",
    endDate: "2025-09-01",
    location: "Global",
    stats: {
      donors: 2100,
      countries: 22,
      shares: 890
    }
  },
  {
    id: 7,
    title: "Food Security Project",
    description: "Ensuring sustainable food supply for vulnerable populations.",
    image: banners.hero.heroFour,
    progress: 55,
    impact: "15,000+ meals provided",
    raised: 275000,
    goal: 500000,
    category: "Food Security",
    status: "active",
    startDate: "2024-08-01",
    endDate: "2025-06-13",
    location: "Global",
    stats: {
      donors: 1650,
      countries: 18,
      shares: 720
    }
  },
  // Additional projects
  {
    id: 8,
    title: "Syrian Refugee Support",
    description: "Emergency aid and resettlement support for Syrian refugees.",
    image: banners.hero.heroTwo,
    progress: 100,
    impact: "25,000+ refugees assisted",
    raised: 750000,
    goal: 750000,
    category: "Emergency Relief",
    status: "completed",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    location: "Syria, Turkey",
    stats: {
      donors: 3200,
      countries: 45,
      shares: 1800
    }
  },
  // Add more projects here...
];

export const categories = [
  "Emergency Relief",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Food Security",
  "Environment",
  "Child Protection",
  "Women Empowerment",
  "Disaster Recovery",
  "Community Development"
];

export const getRecentProjects = () => {
  return projects.filter(project => project.status === "active").slice(0, 5);
};

export const filterProjects = ({
  category = null,
  status = null,
  search = "",
  sortBy = "progress",
  location = null
}) => {
  return projects
    .filter(project => {
      const matchesCategory = !category || project.category === category;
      const matchesStatus = !status || project.status === status;
      const matchesLocation = !location || project.location === location;
      const matchesSearch = !search || 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.location.toLowerCase().includes(search.toLowerCase());
      
      return matchesCategory && matchesStatus && matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "raised":
          return b.raised - a.raised;
        case "recent":
          return new Date(b.startDate) - new Date(a.startDate);
        case "donors":
          return b.stats.donors - a.stats.donors;
        default:
          return 0;
      }
    });
}; 