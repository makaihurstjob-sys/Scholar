export type ApplicationStatus = "Won" | "Pending" | "In Progress" | "Rejected";

export interface Application {
  id: string;
  name: string;
  organization: string;
  deadline: string; // ISO date
  status: ApplicationStatus;
  matchScore: number; // 0-100
  amount: string;
}

export const applications: Application[] = [
  {
    id: "a1",
    name: "Horizon STEM Excellence Award",
    organization: "Horizon Foundation",
    deadline: "2026-05-12",
    status: "In Progress",
    matchScore: 92,
    amount: "$10,000",
  },
  {
    id: "a2",
    name: "Future Founders Grant",
    organization: "Founders Collective",
    deadline: "2026-05-20",
    status: "Pending",
    matchScore: 88,
    amount: "$7,500",
  },
  {
    id: "a3",
    name: "Coastal Communities Scholarship",
    organization: "Coastal Trust",
    deadline: "2026-04-30",
    status: "Won",
    matchScore: 95,
    amount: "$5,000",
  },
  {
    id: "a4",
    name: "Women in Engineering Fellowship",
    organization: "WIE Society",
    deadline: "2026-06-01",
    status: "Pending",
    matchScore: 81,
    amount: "$12,000",
  },
  {
    id: "a5",
    name: "Open Source Contributors Award",
    organization: "OSC Initiative",
    deadline: "2026-05-08",
    status: "In Progress",
    matchScore: 76,
    amount: "$3,000",
  },
  {
    id: "a6",
    name: "Heritage Arts Grant",
    organization: "National Arts Council",
    deadline: "2026-04-25",
    status: "Rejected",
    matchScore: 54,
    amount: "$2,500",
  },
  {
    id: "a7",
    name: "Climate Innovators Scholarship",
    organization: "GreenFuture",
    deadline: "2026-06-15",
    status: "Pending",
    matchScore: 89,
    amount: "$8,000",
  },
  {
    id: "a8",
    name: "First-Gen Pathways Award",
    organization: "Pathways Trust",
    deadline: "2026-05-02",
    status: "Won",
    matchScore: 91,
    amount: "$6,500",
  },
  {
    id: "a9",
    name: "Global Leaders Fellowship",
    organization: "GLF",
    deadline: "2026-07-01",
    status: "In Progress",
    matchScore: 84,
    amount: "$15,000",
  },
  {
    id: "a10",
    name: "Health Sciences Merit Award",
    organization: "Mercer Health",
    deadline: "2026-05-18",
    status: "Pending",
    matchScore: 72,
    amount: "$4,000",
  },
  {
    id: "a11",
    name: "Rural Educators Grant",
    organization: "Teach Forward",
    deadline: "2026-06-10",
    status: "Won",
    matchScore: 88,
    amount: "$5,500",
  },
  {
    id: "a12",
    name: "Quantum Research Award",
    organization: "Quantum Labs",
    deadline: "2026-07-22",
    status: "In Progress",
    matchScore: 79,
    amount: "$20,000",
  },
];

export const stats = {
  totalApplied: applications.length,
  pending: applications.filter((a) => a.status === "Pending").length,
  won: applications.filter((a) => a.status === "Won").length,
  inProgress: applications.filter((a) => a.status === "In Progress").length,
};

export const mockEssays = [
  `As a first-generation student pursuing computer science, I have learned that opportunity rarely arrives gift-wrapped — it must be built. Growing up between two languages and two cultures taught me to translate not just words, but ideas, into systems that serve the people around me. When my high school's tutoring program lost its scheduling coordinator, I built a small web app that paired students with peer tutors automatically; within a semester, attendance tripled. That experience crystallized why I want to study at the intersection of engineering and public service.\n\nThis scholarship would do more than ease tuition — it would let me dedicate my summers to research instead of part-time work. With your support, I plan to continue developing accessible learning tools, mentor younger students from my community, and graduate ready to contribute to teams building technology that lifts more people up than it leaves behind.`,

  `My path to engineering began in a kitchen, not a classroom. My family ran a small bakery, and from age nine I was the unofficial inventory manager — counting flour sacks, plotting weekly orders on graph paper, and obsessing over efficiency. That habit of finding patterns in messy systems became the through-line of my academic life. In robotics club I led the team that automated our scoring rig; in AP Statistics I built a forecasting model for our school's food drive that doubled donations year-over-year.\n\nReceiving this scholarship would mean I can pursue a research-track degree without taking on debt that would force me back into hourly work. In return, I commit to using what I learn the same way I always have: to build practical tools for the people right in front of me, and to mentor the next group of curious kids who think a bakery counter is a good place to learn calculus.`,

  `When I was fourteen, my grandmother lost her vision to glaucoma. Watching her relearn her own home — her own face in the mirror — turned an abstract interest in biology into a focused mission: I want to design assistive technology that restores dignity, not just function. Since then, I have completed two summer internships in human-computer interaction labs, co-authored a poster on tactile interfaces, and led a school club that 3D-prints adaptive tools for students with motor differences.\n\nThis award would allow me to attend the engineering program that best fits this mission, and to spend my time on research and community work rather than juggling shifts. I plan to pay it forward by opening our adaptive-tools workshop to other schools in the district and by publishing every design we create under an open license. Thank you for considering my application — and for investing in students who plan to spend their careers giving back.`,
];
