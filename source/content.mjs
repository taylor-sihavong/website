// Content copied from the Notion page https://taylor-sihavong.notion.site/about-me
// A run is a plain string, or { l: link text, h: href }, or { i: italic text }.
const L = (l, h) => ({ l, h });
const I = (i) => ({ i });

export const meta = {
  title: "Taylor Naomi Sihavong",
  description: "I'm a product designer, founder, and human augmenter. I design new tools and systems to unlock human capacity so we can be the builders of our own worlds.",
};

export const intro = [
  ["I'm a product designer, founder, and human augmenter. I design new tools and systems to unlock human capacity so we can be the builders of our own worlds."],
  ["I'm currently co-founding a startup that allows anyone to build hardware fast, from sketch to production."],
  ["Reach out by ", L("email", "mailto:taylor.sihavong@gmail.com"), " or ", L("LinkedIn", "https://www.linkedin.com/in/taylor-sihavong-394b18112/"), "."],
];

export const previous = [
  ["I was a cohort facilitator under Rob Reich and Mehran Sahami for the Ethics, Technology, and Public Policy for Practitioners course at the ", L("Stanford McCoy Family Center for Ethics in Society", "https://ethicsinsociety.stanford.edu/"), "."],
  ["I co-founded the tech education nonprofit ", L("Code.X", "https://www.codedotx.org/"), ", which provides tech, design, and entrepreneurship education to youth in fragile and conflict-affected regions worldwide."],
  ["I pushed exploratory design research and data-driven UI/UX design as a product design and research lead at Pear Therapeutics, ", L("Change Healthcare", "https://www.changehealthcare.com/"), ", ", L("Agathos", "https://evidence.care/careinsights/"), ", and ", L("Akido Labs", "https://www.akidolabs.com/"), "."],
  ["I organized community-focused design research for food assistance users as a NEXT Fellow at the ", L("Stanford Byers Center for Biodesign", "https://biodesign.stanford.edu/"), "."],
  ["I taught classrooms of students ranging from 2 to 18 years old as a youth educator and STEM curriculum designer for Paltel Group and ", L("Stanford Bing Nursery School", "https://bingschool.stanford.edu/"), "."],
  ["I researched ultra-affordable agricultural structures for small farmers in Telangana, India, as a design engineer for ", L("Kheyti", "https://www.kheyti.com/"), "."],
  ["I did a number of scientific side-quests exploring space sciences and astrobiology, preventative medicine, and behavioral sciences as a quantitative researcher and data analyst at ", L("NASA's Ames Research Center", "https://www.nasa.gov/people/lynn-j-rothschild/"), ", ", L("Stanford Sarafan ChEM-H", "https://chemh.stanford.edu/"), ", ", L("Stanford School of Medicine", "https://peterkimlab.stanford.edu/home"), ", ", L("University of Hawaiʻi Cancer Center", "https://www.uhcancercenter.org/wills-thomas"), ", and the ", L("Stanford PPRG Lab", "https://pprg.stanford.edu/our-team"), "."],
];

// Dated lists. year: shown in the left margin on wide screens. venue: where it ran or was published. org: the organization in an award.
const E = (year, runs, venue) => ({ year, runs, venue });
const A = (year, org, runs) => ({ year, org, runs });

export const talks = [
  E("2026", ["Impact Economy: Affecting Change Through Youth Education"], "Forbes Under 30 Summit"),
  E("2025", ["Beyond Borders: How US-based Nonprofits are Driving Global Change"], "Gratitude Network Forum"),
  E("2025", ["Idea Forum: Impact"], "Forbes 30/50 Summit"),
  E("2024", [L("Breaking Barriers: Fostering Tech Skills in Emerging Markets", "https://podcasters.spotify.com/pod/show/world-bank-edutech/episodes/Breaking-Barriers-Fostering-Tech-Skills-in-Emerging-Markets-e2hcdbd")], "World Bank EduTech Podcast"),
];

export const features = [
  E("2025", [L("Education: Bringing access and opportunity to the classroom and beyond", "https://www.forbes.com/30-under-30/2025/education/")], "Forbes"),
  E("2024", [L("Supporting Schoolchildren on the Path to a Technological Future: Code for Ukraine Camp Held at UCU", "https://ucu.edu.ua/en/news/pidtrymka-shkolyariv-na-shlyahu-do-tehnologichnogo-majbutnogo-v-uku-vidbuvsya-tabir-vid-code-for-ukraine/")], "Ukrainian Catholic University"),
  E("2022", [L("Korca hosts \"Code for Albania,\" the summer camp that brought 100 children from all over the country and 10 instructors from the USA", "https://abcnews.al/?p=1318232")], "ABC News"),
  E("2022", [L("A Leading Model in Sustainable Development", "https://thisweekinpalestine.com/paltel-group-csr/")], "This Week in Palestine"),
  E("2021", [L("Coding in Palestine: How Tech Education Keeps Girls Safe and Expands Opportunities", "https://www.friendsofunfpa.org/coding-in-palestine-how-tech-education-keeps-girls-safe-and-expands-opportunities/")], "Friends of UNFPA"),
  E("2018", [L("Innovative Greenhouses Help Farmers Adapt to Climate Change", "https://www.nationalgeographic.com/environment/article/telangana-india-agriculture-greenhouses")], "National Geographic"),
  E("2017", [L("Biodesign NEXT Facilitates Student Plans to Help Low-Income Californians Eat Healthy", "https://biodesign.stanford.edu/our-impact/stories/biodesign-next-helps-low-income-californians-eat-healthy.html")], "Stanford Byers Center for Biodesign"),
];

export const awards = [
  A("2026", "Education 2030 UN", [L("SDG4 Youth & Student Network Member", "https://www.unesco.org/sdg4education2030/en/articles/sdg4-youth-student-network-welcomes-2026-2027-cohort-young-education-leaders")]),
  A("2025", "Gratitude Network", ["Social Disruptor Award"]),
  A("2025", "One Young World", ["Chanel Scholar"]),
  A("2025", "Forbes", [L("30 Under 30 North America in Education", "https://www.forbes.com/profile/codex/")]),
  A("2024", "Gratitude Network", [L("Gratitude Fellow", "https://gratitude-network.org/who-we-support/2024-organizations/")]),
  A("2024", "Fellowships at Auschwitz for the Study of Professional Ethics", [L("Design and Technology Fellow", "https://www.faspe-ethics.org/fellows-by-year/")]),
  A("2023", "ADPList", [L("Top 1% ADPList Mentor in Design", "https://medium.com/amazing-together/adplists-top-1-mentors-and-rising-stars-november-2023-e0b6eead4262")]),
];

export const more = {
  title: "& More",
  paragraphs: [
    ["I enjoy being tossed in the deep end, learning on the fly, and untangling complex problems. I work best with small, fast-paced teams. I hold a Bachelor of Science from Stanford University in Product Design Engineering and consider myself both a builder and an artist. I've been described as ambitious yet down-to-earth, reliable, and purpose-driven."],
    ["Thanks for reading this page, which is really just a collection of work I'm proud of."],
  ],
};
