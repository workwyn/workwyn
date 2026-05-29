// ─── Core Domain Types ───────────────────────────────────────────────

export interface ProjectVision {
  id: string;
  owner_name: string;
  title: string;
  vision_story: string;
  current_stage: string; // e.g. 'Idea', 'Prototype', 'MVP', 'Growth'
  tags: string[];
  cover_image?: string; // path relative to /public
  created_at: string;
}

export const PROJECT_TAGS = [
  "Tech",
  "Creative",
  "Community",
  "Finance",
  "Education",
  "Health",
] as const;

export interface Comment {
  id: string;
  project_id: string;
  author_name: string;
  message: string;
  created_at: string;
}

export interface ContributionPitch {
  id: string;
  project_id: string;
  talent_name: string;
  talent_email: string;
  proposed_role: string;
  pitch_message: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
}

export interface PitchDeck {
  id: string;
  project_id: string;
  author_name: string;
  author_email: string;
  slides: {
    about_me: string;           // Who you are, background
    proposed_role: string;      // What role you'd play
    relevant_experience: string; // Past work, portfolio highlights
    action_plan: string;        // Concrete steps you'd take in first 30 days
    why_me: string;             // What makes you uniquely qualified
  };
  status: "pending" | "accepted" | "declined";
  created_at: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────

export const mockProjectVisions: ProjectVision[] = [
  {
    id: "pv-001",
    owner_name: "Anya Patel",
    title: "HyperLocal — Neighborhood Delivery for Everyone",
    vision_story:
      "I live in a neighborhood full of talented home cooks, small bakeries, and local farmers — but none of them can afford the commission fees of big delivery apps. I want to build a lightweight, community-powered delivery platform that lets small vendors list products, accept orders, and coordinate last-mile delivery through trusted local couriers. The goal is zero commission for the first year and a sustainable co-op model after that. I already have 15 vendors interested and a rough wireframe, but I need help turning this into a real product.",
    current_stage: "Idea",
    tags: ["Tech", "Community"],
    cover_image: "/images/projects/hyperlocal-delivery.png",
    created_at: "2025-11-15T09:30:00Z",
  },
  {
    id: "pv-002",
    owner_name: "Marcus Chen",
    title: "Brand Spark — Creative Campaigns for Local Brands",
    vision_story:
      "Small businesses in my city are incredible at what they do — craft coffee, handmade jewelry, artisan soap — but most of them have zero online presence. I want to create a boutique creative agency run as a collaborative project: a rotating team of freelancers who band together to deliver branding, social media campaigns, and short-form video content for local businesses at affordable rates. Think of it as a 'creative SWAT team' that local entrepreneurs can hire for a 2-week brand sprint. I've already run two pilot campaigns with great results and I'm looking for people who want to build this into something bigger.",
    current_stage: "Prototype",
    tags: ["Creative", "Community"],
    cover_image: "/images/projects/brand-spark.png",
    created_at: "2025-12-02T14:15:00Z",
  },
  {
    id: "pv-003",
    owner_name: "Sophia Reyes",
    title: "SME Copilot — AI-Powered Business Assistant for SMEs",
    vision_story:
      "Running a small business means wearing a hundred hats at once — accounting, customer support, inventory, marketing. I want to build an AI-powered assistant specifically designed for small and medium enterprises (SMEs) in Southeast Asia. It should help owners generate invoices, draft marketing copy, analyze sales trends, and answer basic legal questions — all in a simple chat interface, available in multiple local languages. I've prototyped a basic chatbot using open-source LLMs, but I need collaborators who can help refine the UX, integrate local payment APIs, and make the AI responses actually useful for non-technical business owners.",
    current_stage: "Prototype",
    tags: ["Tech", "Finance"],
    cover_image: "/images/projects/sme-copilot.png",
    created_at: "2026-01-10T08:45:00Z",
  },
];

// ─── Mock Pitches ────────────────────────────────────────────────────

export const mockPitches: ContributionPitch[] = [
  {
    id: "pitch-001",
    project_id: "pv-001",
    talent_name: "Alex Rivera",
    talent_email: "alex.rivera@example.com",
    proposed_role: "Full-Stack Developer",
    pitch_message:
      "I've built 3 delivery apps using React Native and Node.js, including one for a local farmers market in Portland. I'd love to help architect the backend and build the vendor dashboard. I'm particularly experienced with real-time order tracking and payment integrations.",
    status: "pending",
    created_at: "2026-01-20T10:00:00Z",
  },
  {
    id: "pitch-002",
    project_id: "pv-001",
    talent_name: "Priya Sharma",
    talent_email: "priya.s@example.com",
    proposed_role: "UX/UI Designer",
    pitch_message:
      "As a product designer with 5 years of experience in food-tech apps, I can help create an intuitive interface for both vendors and customers. I've designed for GrabFood and a local co-op delivery service. I'd focus on making the onboarding flow simple enough for non-tech-savvy vendors.",
    status: "accepted",
    created_at: "2026-01-18T14:30:00Z",
  },
  {
    id: "pitch-003",
    project_id: "pv-001",
    talent_name: "Jordan Lee",
    talent_email: "jordan.lee@example.com",
    proposed_role: "Operations & Logistics",
    pitch_message:
      "I've managed last-mile logistics for 2 startups and know the pain points of courier coordination. I can help design the dispatch algorithm and set up the courier network. My background is in supply chain optimization.",
    status: "pending",
    created_at: "2026-01-25T08:15:00Z",
  },
  {
    id: "pitch-004",
    project_id: "pv-002",
    talent_name: "Maya Thompson",
    talent_email: "maya.thompson@example.com",
    proposed_role: "Social Media Strategist",
    pitch_message:
      "I've grown 12 local brand accounts from 0 to 10K+ followers organically. I specialize in short-form video (Reels, TikTok) and community-driven content. I'd love to lead the social media sprint playbook for Brand Spark clients.",
    status: "pending",
    created_at: "2026-02-01T11:00:00Z",
  },
  {
    id: "pitch-005",
    project_id: "pv-002",
    talent_name: "Carlos Mendez",
    talent_email: "carlos.mendez@example.com",
    proposed_role: "Brand Identity Designer",
    pitch_message:
      "I run a freelance branding studio and have created visual identities for 30+ small businesses. I can bring logo design, brand guidelines, and packaging design expertise. Let's make local brands look world-class.",
    status: "declined",
    created_at: "2026-01-28T16:45:00Z",
  },
  {
    id: "pitch-006",
    project_id: "pv-003",
    talent_name: "Nina Nakamura",
    talent_email: "nina.n@example.com",
    proposed_role: "AI/ML Engineer",
    pitch_message:
      "I've fine-tuned LLMs for enterprise chatbots at my current company and I'm passionate about making AI accessible to SMEs. I can help improve the chatbot's accuracy for business-specific tasks like invoice generation and sales analysis.",
    status: "pending",
    created_at: "2026-02-05T09:30:00Z",
  },
  {
    id: "pitch-007",
    project_id: "pv-003",
    talent_name: "Ravi Patel",
    talent_email: "ravi.patel@example.com",
    proposed_role: "Payment API Integration Specialist",
    pitch_message:
      "I've integrated PromptPay, GrabPay, and bank transfer APIs for 4 fintech startups in SEA. I know the regulatory landscape well and can handle the payment infrastructure for SME Copilot. I'm also fluent in Thai and English.",
    status: "accepted",
    created_at: "2026-02-03T13:00:00Z",
  },
];

export const mockPitchDecks: PitchDeck[] = [
  {
    id: "deck-001",
    project_id: "pv-001",
    author_name: "Sam Nguyen",
    author_email: "sam@example.com",
    slides: {
      about_me:
        "I'm a product manager turned indie developer based in Ho Chi Minh City. For the past 3 years, I've been building tools for local businesses — from POS systems to inventory trackers. I'm passionate about technology that empowers small communities.",
      proposed_role:
        "Product Manager & Technical Lead — I'd own the product roadmap, coordinate between design and engineering, and handle the technical architecture decisions. I can also write backend code when needed.",
      relevant_experience:
        "• Built 'ChợGần' — a hyperlocal marketplace app serving 200+ vendors in District 1, HCMC (15K monthly active users)\n• Led product at a food-tech startup that processed 5,000 orders/day\n• Managed a team of 4 developers and 2 designers",
      action_plan:
        "Week 1-2: Stakeholder interviews with the 15 interested vendors, define MVP scope\nWeek 2-3: Technical architecture design, set up CI/CD pipeline\nWeek 3-4: Build vendor onboarding flow and product listing MVP\nDeliverable: Working prototype with 5 vendors onboarded",
      why_me:
        "I've literally built this type of product before in the SEA market. I understand the vendor pain points, the courier logistics, and the regulatory requirements. Plus, I'm willing to work on equity + small stipend because I genuinely believe in the co-op model.",
    },
    status: "pending",
    created_at: "2026-01-22T11:30:00Z",
  },
  {
    id: "deck-002",
    project_id: "pv-001",
    author_name: "Lisa Chen",
    author_email: "lisa.c@example.com",
    slides: {
      about_me:
        "I'm a community organizer and marketing professional with 7 years of experience in grassroots campaigns. I've helped launch 3 community cooperatives and understand how to build trust with local stakeholders.",
      proposed_role:
        "Community Growth Manager — I'd handle vendor acquisition, community engagement, courier recruitment, and local partnerships. Essentially, everything outside of the code.",
      relevant_experience:
        "• Launched a community-supported agriculture (CSA) program with 500+ members\n• Ran marketing for a local co-op grocery that grew from 50 to 300 members in 6 months\n• Built partnerships with 20+ local restaurants for a farm-to-table initiative",
      action_plan:
        "Week 1: Map the neighborhood — identify top 30 potential vendors and 10 courier candidates\nWeek 2: Personal outreach to vendors, host an info session\nWeek 3: Onboard first 10 vendors, recruit 5 couriers\nWeek 4: Launch a soft-launch event with free deliveries to build buzz",
      why_me:
        "The tech is important, but this project lives or dies on community trust. I know how to build that trust because I've done it before. I speak the vendors' language — literally and figuratively.",
    },
    status: "pending",
    created_at: "2026-01-24T15:00:00Z",
  },
  {
    id: "deck-003",
    project_id: "pv-002",
    author_name: "Emma Wilson",
    author_email: "emma.w@example.com",
    slides: {
      about_me:
        "I'm a videographer and content creator specializing in brand storytelling. I run a YouTube channel with 50K subscribers focused on local business profiles. I believe every small business has a story worth telling.",
      proposed_role:
        "Creative Director & Video Lead — I'd lead the video production for brand sprints, create content templates, and train junior creators on the Brand Spark methodology.",
      relevant_experience:
        "• Produced 100+ brand story videos for local businesses (avg 20K views each)\n• Created a viral campaign for a local bakery that increased their sales by 300%\n• Built a network of 15 freelance videographers I can bring to the team",
      action_plan:
        "Week 1: Develop the Brand Spark video playbook — shot lists, templates, editing guidelines\nWeek 2: Film pilot brand sprint with one client (pro bono)\nWeek 3: Edit, deliver, and document the process\nWeek 4: Create training materials for onboarding new videographers",
      why_me:
        "I don't just make pretty videos — I make videos that sell. My content has generated measurable ROI for every client I've worked with. And I come with a ready-made team of freelancers.",
    },
    status: "pending",
    created_at: "2026-02-02T10:00:00Z",
  },
  {
    id: "deck-004",
    project_id: "pv-003",
    author_name: "Kenji Tanaka",
    author_email: "kenji@example.com",
    slides: {
      about_me:
        "I'm a UX researcher and designer focused on making complex tools simple. I've spent 4 years designing fintech apps for underserved markets in Southeast Asia. I believe great UX is the difference between a tool people try and a tool people use daily.",
      proposed_role:
        "Lead UX Designer — I'd own the user research, interface design, and usability testing. My goal would be to make SME Copilot feel as simple as texting a friend.",
      relevant_experience:
        "• Redesigned a mobile banking app for rural users in Thailand (NPS increased from 32 to 71)\n• Conducted 100+ user interviews with SME owners across 4 countries\n• Created a design system used by 3 fintech startups",
      action_plan:
        "Week 1: User research — interview 15 SME owners about their daily workflows and pain points\nWeek 2: Create user personas and journey maps\nWeek 3: Design wireframes for the core chat interface and 3 key workflows\nWeek 4: Prototype testing with 5 real SME owners, iterate based on feedback",
      why_me:
        "I don't just design interfaces — I design for the people who'll use them. I've spent years understanding how non-technical business owners in SEA interact with technology. That insight is exactly what SME Copilot needs.",
    },
    status: "pending",
    created_at: "2026-02-06T14:20:00Z",
  },
];

// ─── Mock Comments ───────────────────────────────────────────────────

export const mockComments: Comment[] = [
  {
    id: "cmt-001",
    project_id: "pv-001",
    author_name: "Alex Rivera",
    message:
      "Love the zero-commission model! Have you thought about how the co-op governance would work? I've seen some interesting models with democratic voting among vendors.",
    created_at: "2026-01-19T10:00:00Z",
  },
  {
    id: "cmt-002",
    project_id: "pv-001",
    author_name: "Anya Patel",
    message:
      "Great question Alex! I'm thinking each vendor gets one vote, and major decisions (like fee changes) require 2/3 majority. Still refining the details though.",
    created_at: "2026-01-19T11:30:00Z",
  },
  {
    id: "cmt-003",
    project_id: "pv-001",
    author_name: "Lisa Chen",
    message:
      "I've helped set up co-op governance for 3 organizations. Happy to share some templates and bylaws that worked well. The key is keeping it simple at the start.",
    created_at: "2026-01-20T09:00:00Z",
  },
  {
    id: "cmt-004",
    project_id: "pv-002",
    author_name: "Emma Wilson",
    message:
      "This is exactly the kind of project I've been looking for. Quick question — would you be open to remote team members, or are you looking for local only?",
    created_at: "2026-02-01T14:00:00Z",
  },
  {
    id: "cmt-005",
    project_id: "pv-002",
    author_name: "Marcus Chen",
    message:
      "Definitely open to remote! The client work needs to be local, but the creative team can be anywhere. As long as we can align on timezone for the sprint sessions.",
    created_at: "2026-02-01T15:30:00Z",
  },
  {
    id: "cmt-006",
    project_id: "pv-003",
    author_name: "Kenji Tanaka",
    message:
      "What languages are you planning to support first? I have experience with Thai and Vietnamese NLP which could be super useful for the chat interface.",
    created_at: "2026-02-05T10:00:00Z",
  },
];
