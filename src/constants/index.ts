// Project data with proper typing
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  features?: string[];
  stats?: {
    commits: string;
    stars: string;
    forks: string;
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
  icon: string;
  color: string;
  gradient: string;
}

export interface FloatingElement {
  icon: string;
  delay: number;
  duration: number;
  size: string;
}

// Optimized project data
export const FEATURED_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Alpha Trading Platform',
    description: 'Alpha Trading is a Java-based application for analyzing and tracking cryptocurrency trading trends.',
    image: '/images/project1.png',
    technologies: ['Java', 'CoinGecko API', 'Gemini API', 'MySQL'],
    githubUrl: 'https://github.com/Surya9391/Alpha_Trading_Platform.git',
    liveUrl: '#',
    category: 'Java Full Stack',
    features: ['Real-time updates', 'Authentication', 'Responsive design'],
    stats: {
      commits: '1.2k+',
      stars: '150+',
      forks: '45+'
    }
  },
  {
    id: 2,
    title: 'Resortify',
    description: 'Resortify is a smart waste management app that promotes recycling and sustainability through IoT-based monitoring and eco-friendly practices.',
    image: '/images/project2.png',
    technologies: ['React Native', 'TypeScript', 'Express', 'MongoDB', 'IoT', 'ESP32', 'Arduino', 'Supabase'],
    githubUrl: 'https://github.com/Surya9391/Resortify.git',
    liveUrl: '#',
    category: 'Web',
    features: ['Type safety', 'API integration', 'IoT sensors'],
    stats: {
      commits: '800+',
      stars: '90+',
      forks: '30+'
    }
  },
  {
    id: 3,
    title: 'PowerPredict',
    description: 'PowerPredict is a machine learning project that predicts power consumption based on historical data.',
    image: '/images/project5.png',
    technologies: ['Python', 'Pandas & NumPy', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/Surya9391/Energy-Consumption-Prediction-RF-ML-main.git',
    liveUrl: '#',
    category: 'AI/ML',
    stats: {
      commits: '800+',
      stars: '90+',
      forks: '30+'
    }
  },
];

// Skills data
export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-400 via-cyan-400 to-blue-600'
  },
  {
    category: 'Backend',
    items: ['Java', 'Node.js', 'Express', 'MongoDB', 'MySQL'],
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-400 via-emerald-400 to-green-600'
  },
  {
    category: 'Tools & Others',
    items: ['Git & GitHub', 'Firebase', 'IoT', 'API'],
    icon: '🛠️',
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-400 via-pink-400 to-purple-600'
  },
];

// Floating elements for animations
export const FLOATING_ELEMENTS: FloatingElement[] = [
  { icon: '⚛️', delay: 0, duration: 3, size: 'text-4xl' },
  { icon: '🚀', delay: 0.5, duration: 4, size: 'text-3xl' },
  { icon: '💻', delay: 1, duration: 3.5, size: 'text-5xl' },
  { icon: '🎯', delay: 1.5, duration: 4.5, size: 'text-4xl' },
  { icon: '⚡', delay: 2, duration: 3, size: 'text-3xl' },
  { icon: '🔥', delay: 2.5, duration: 4, size: 'text-4xl' },
  { icon: '💎', delay: 3, duration: 3.5, size: 'text-3xl' },
  { icon: '🌟', delay: 3.5, duration: 4.5, size: 'text-4xl' },
];

// Animation constants
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
} as const;

export const ANIMATION_DELAYS = {
  STAGGER: 0.1,
  SECTION: 0.2,
  PROJECT: 0.3,
} as const;
