export const DEMO_TICKER_STORIES = [
  "Fed holds rates steady at 4.25%\u201344.50%, signals two cuts later this year",
  "TSMC begins construction on third Arizona fab, $65B investment now largest in U.S. history",
  "WHO declares high-path avian influenza a public health emergency of international concern",
  "Supreme Court hears oral arguments on TikTok divestiture timeline",
  "OpenAI valued at $300B in latest tender offer as revenue hits $3.4B annualized",
];

export const HERO_STORY = {
  category: "MARKETS",
  headline:
    "Fed Signals Patience as Inflation Proves Stickier Than Expected",
  deck: "The Federal Reserve held its benchmark rate steady for the sixth consecutive meeting, acknowledging that progress toward its 2% inflation target has slowed. Chair Powell emphasized a data-dependent approach while markets recalibrated expectations for the first cut.",
  readTime: "8 min",
  sessionEnabled: true,
};

export const TOP_STORIES: {
  num: string;
  headline: string;
  category: string;
  readTime: string;
  hasSession: boolean;
}[] = [
  {
    num: "01",
    headline: "TSMC\u2019s Arizona Bet Reshapes the Global Chip Map",
    category: "TECH",
    readTime: "6 min",
    hasSession: true,
  },
  {
    num: "02",
    headline: "Bird Flu Emergency Declaration Raises Pandemic Preparedness Questions",
    category: "HEALTH",
    readTime: "5 min",
    hasSession: false,
  },
  {
    num: "03",
    headline: "TikTok\u2019s Supreme Court Moment: Free Speech vs. National Security",
    category: "POLITICS",
    readTime: "7 min",
    hasSession: true,
  },
  {
    num: "04",
    headline: "Inside OpenAI\u2019s $300 Billion Valuation and the Race It Reflects",
    category: "TECH",
    readTime: "9 min",
    hasSession: true,
  },
  {
    num: "05",
    headline: "NATO Allies Quietly Accelerate Arctic Defense Spending",
    category: "WORLD",
    readTime: "4 min",
    hasSession: false,
  },
];

export const ARTS_STORIES: {
  num: string;
  headline: string;
  category: string;
  readTime: string;
  hasSession: boolean;
}[] = [
  {
    num: "01",
    headline: "The Quiet Luxury Backlash: Why Logomania Is Returning",
    category: "ARTS",
    readTime: "4 min",
    hasSession: false,
  },
  {
    num: "02",
    headline: "A Brutalist Church in Tokyo Becomes the Season\u2019s Hottest Gallery",
    category: "ARTS",
    readTime: "5 min",
    hasSession: true,
  },
  {
    num: "03",
    headline: "Manhattan\u2019s Last Affordable Neighborhood? Not for Long",
    category: "ARTS",
    readTime: "6 min",
    hasSession: false,
  },
  {
    num: "04",
    headline: "Why Financial Advisors Are Telling Clients to Wait on Real Estate",
    category: "ARTS",
    readTime: "5 min",
    hasSession: false,
  },
  {
    num: "05",
    headline: "The Rise of the \u2018Microretirement\u2019: Taking a Year Off at 35",
    category: "ARTS",
    readTime: "7 min",
    hasSession: true,
  },
];

export const DEMO_MARKETS: {
  name: string;
  value: string;
  change: string;
  up: boolean;
}[] = [
  { name: "S&P 500", value: "5,638.94", change: "+0.42%", up: true },
  { name: "NASDAQ", value: "17,691.63", change: "+0.87%", up: true },
  { name: "DOW", value: "41,802.15", change: "-0.11%", up: false },
  { name: "10Y YIELD", value: "4.287%", change: "+0.03", up: true },
  { name: "BTC", value: "83,412.60", change: "-1.24%", up: false },
];

export const CROSSOVER = {
  storyHeadline:
    "Fed Signals Patience as Inflation Proves Stickier Than Expected",
  bookTitle: "The Wealth of Nations",
  bookId: "wealth_of_nations",
  description:
    "This story connects to Adam Smith\u2019s analysis of monetary policy and the invisible hand of markets. Explore the living book to go deeper.",
};

export const EDITORIAL_ESSAYS: {
  title: string;
  author: string;
  publication: string;
  year: string;
  dotColor: string;
  description: string;
  hasSession: boolean;
}[] = [
  {
    title: "Politics and the English Language",
    author: "George Orwell",
    publication: "Horizon",
    year: "1946",
    dotColor: "#f59e0b",
    description:
      "On the corruption of language by political orthodoxy and the defense of clear prose.",
    hasSession: true,
  },
  {
    title: "Self-Reliance",
    author: "Ralph Waldo Emerson",
    publication: "Essays: First Series",
    year: "1841",
    dotColor: "#8b5cf6",
    description:
      "Trust thyself: a foundational argument for individualism and nonconformity.",
    hasSession: true,
  },
  {
    title: "The Hedgehog and the Fox",
    author: "Isaiah Berlin",
    publication: "Weidenfeld & Nicolson",
    year: "1953",
    dotColor: "#10b981",
    description:
      "A meditation on Tolstoy and the tension between monist and pluralist worldviews.",
    hasSession: true,
  },
  {
    title: "Letter from Birmingham Jail",
    author: "Martin Luther King Jr.",
    publication: "The Atlantic Monthly",
    year: "1963",
    dotColor: "#ef4444",
    description:
      "A moral and philosophical defense of nonviolent resistance to unjust laws.",
    hasSession: true,
  },
];

export const PORTALS: {
  name: string;
  icon: string;
  count: number;
  slug: string;
}[] = [
  { name: "Philosophy", icon: "\u03A6", count: 284, slug: "philosophy" },
  { name: "Religion", icon: "\u2638", count: 312, slug: "religion" },
  { name: "Science", icon: "\u2234", count: 198, slug: "science" },
  { name: "History", icon: "\u2696", count: 241, slug: "history" },
  { name: "Mathematics", icon: "\u221E", count: 87, slug: "mathematics" },
  { name: "Esoteric", icon: "\u2609", count: 156, slug: "esoteric" },
  { name: "Literature", icon: "\u270E", count: 203, slug: "literature" },
  { name: "Psychology", icon: "\u03A8", count: 119, slug: "psychology" },
];

export const ENCOUNTERS = [
  "A visitor spent 4 turns exploring the Tao Te Ching, asking about wu wei and its relationship to modern leadership theory.",
  "Someone asked the Stoicism expedition about Epictetus\u2019s view on what we can and cannot control, then pivoted to Marcus Aurelius.",
  "A reader engaged the I Ching oracle for 3 turns on a question about career transition, receiving hexagram 49 (Revolution).",
];

export const NEWS_CATEGORIES = [
  "World",
  "Politics",
  "Markets",
  "Tech",
  "Health",
  "Science",
  "Opinion",
  "Arts",
  "Sports",
];

export const LIBRARY_CATEGORIES = [
  "Living Books",
  "Expeditions",
  "Oracles",
  "Games",
  "Packs",
  "Essays",
  "Philosophy",
  "Religion",
  "Science",
  "History",
  "Mathematics",
  "Esoteric",
  "Literature",
  "Psychology",
  "Browse All",
];
