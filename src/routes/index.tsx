import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Mail, Briefcase, GraduationCap, FolderGit2, ExternalLink, Phone } from "lucide-react"


export const Route = createFileRoute("/")({ component: Portfolio })


function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

// --- Data Object ---
const portfolioData = {
  name: "Mark Evan P. Delos Reyes",
  tagline: "Full Stack Developer",
  location: "Angono, Rizal",
  contact: {
    email: "markevancoc@gmail.com",
    phone: "+639939232962"
  },
  socials: [
    { name: "GitHub", url: "https://github.com/thispoppyv2", icon: GithubIcon },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mark-evan-delos-reyes/", icon: LinkedinIcon },
  ],
  work: [
    {
      id: "w1",
      title: "Full Stack Developer",
      company: "Heavy Duty System (Heavy Duty Industrial Enterprises Inc.)",
      date: "January 2026 - April 2026",
      type: "Contract",
      link: "https://heavydutyph.com",
      description: "Built an e-commerce and stock management system for multiple brands and branches. Revived and improved their Value Card program for customers. Used Tanstack Start to develop the system with performance in mind, making everything almost instant on capable devices. The system is currently in use by almost all departments for their internal processes.",
      thumbnail: "https://www.heavydutyph.com/images/heavydutylogo.png",
      technologies: ["Tanstack Start", "React", "TypeScript", "Supabase"]
    },
    {
      id: "w2",
      title: "Messenger",
      company: "JUMERLANIQUE",
      date: "July 2022 - June 2026",
      type: "Angono, Rizal",
      description: "An independent rental enterprise providing essential business services, managing end-to-end logistics and community-focused client relations. Managed the employer's Social Security System and other related accounts. Managed and distributed multiple documents used for day-to-day operations.",
      thumbnail: "",
      technologies: ["Logistics", "Document Management", "Client Relations"]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Management Information System for Darangan Water Service Development Cooperative",
      date: "Academic — Capstone Project",
      role: "Lead Developer",
      school: "University of Rizal System",
      description: "Led full-stack development using NextJS, managing the entire software development lifecycle (SDLC) from UI/UX design to database management. Applied SDLC principles to manage the project from conceptualization to deployment. The final project was approved, defended, and published in the university library's hardbound collection.",

      technologies: ["Next.js", "UI/UX Design", "Database Management", "SDLC"]
    }
  ],
  education: [
    {
      id: "e1",
      degree: "Bachelor of Science in Information Systems (BSIS)",
      school: "University of Rizal System",
      date: "Graduation: June 2026",
      description: "Studied Information Systems at the Binangonan, Rizal campus. Completed a capstone project on a Management Information System that was published in the university library's hardbound collection.",
      thumbnail: "https://imgs.search.brave.com/vIeJvILOPuuP5QqyvznGN-KLZmeSRIbmUHo4RMCjA1k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/MS8xMS9Vbml2ZXJz/aXR5X29mX1JpemFs/LnBuZy81MTJweC1V/bml2ZXJzaXR5X29m/X1JpemFsLnBuZw",
      gwa: "1.46",
    },
    {
      id: "e2",
      degree: "ICT - Animation",
      school: "Angono National High School",
      date: "2020 - 2022",
      description: "Completed a technical-vocational track specializing in ICT with a focus on Animation.",

    }
  ],
  certifications: [
    { id: "c1", name: "Computer System Servicing NC II", issuer: "TESDA" }
  ],
  skills: ["Technical Support", "Web Development", "UI/UX Design", "Video Editing"],
  technologies: ["React", "Supabase", "Tanstack Start", "Next.js", "CSS", "Tailwind", "Microsoft Suite", "Google Workspace", "DaVinci Resolve", "VS Code"]
}

// --- Helper Components ---
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border/50">
      {children}
    </span>
  )
}

function LinkPreview({ url }: { url: string }) {
  const domain = new URL(url).hostname
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`

  return (
    <span className="relative group inline-flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-secondary-foreground bg-secondary p-2 rounded-full flex gap-1 items-center hover:text-primary text-xs transition-colors"
        aria-label={`Visit ${domain}`}
      >
        <ExternalLink className="w-3 h-3" />
        {domain}
      </a>

    </span>
  )
}

function SectionCard({ item }: { item: any }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail — full width on mobile, fixed sidebar on sm+ */}
      {item.thumbnail && (
        <div className="shrink-0 w-full sm:w-32">
          <img
            src={item.thumbnail}
            alt={item.title || item.degree}
            className="w-full h-40 sm:h-32 p-1 object-contain rounded-lg border bg-muted"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow min-w-0">
        {/* Title row — wraps naturally, date stacks below on mobile */}
        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-0.5 mb-1">
          <h3 className="font-semibold text-base sm:text-lg leading-snug flex flex-wrap items-center gap-2 min-w-0">
            <span className="break-words">{item.title || item.degree}</span>
            {item.link && <LinkPreview url={item.link} />}
          </h3>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap  shrink-0">
            {item.date}
          </span>
        </div>

        {/* School / Company + optional GWA badge */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h4 className="text-sm font-medium text-primary">
            {item.company || item.school || "Personal Project"}
          </h4>
          {item.gwa && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
              GWA {item.gwa}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Technologies (Optional) */}
        {item.technologies && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.technologies.map((tech: string) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// --- Main View ---
function Portfolio() {
  return (
    <div className="flex justify-center min-h-svh p-6 md:p-12 bg-background text-foreground">
      <div className="flex w-full max-w-3xl flex-col gap-12">

        {/* Header / Hero Section */}
        <section className="flex flex-col gap-4">

          <div>
            <div className="size-24 bg-white rounded-full mb-12" />
          </div>
          <div>
            <h1 className="text-6xl font-bold tracking-tight">{portfolioData.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{portfolioData.tagline} · {portfolioData.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
            <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> {portfolioData.contact.email}
            </a>
            <a href={`tel:${portfolioData.contact.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> {portfolioData.contact.phone}
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            {portfolioData.socials.map((social) => {
              const Icon = social.icon

              return (
                <Button key={social.name} variant="secondary" size="icon" asChild>

                  <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.name}>
                    <Icon className="w-4 h-4" />

                  </a>

                </Button>
              )
            })}
          </div>
        </section>

        {/* Work Experience */}
        <section className="flex flex-col gap-6">
          <div className="flex  items-center  pb-2 relative ">

            <h2 className="text-4xl font-semibold tracking-tight">Experience</h2>
          </div>
          <div className="flex flex-col gap-4">
            {portfolioData.work.map((job) => (
              <SectionCard key={job.id} item={job} />
            ))}
          </div>
        </section>

        {/* Academic / Personal Projects */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2  pb-2">
            <h2 className="text-4xl font-semibold tracking-tight">Projects</h2>
          </div>
          <div className="flex flex-col gap-4">
            {portfolioData.projects.map((project) => (
              <SectionCard key={project.id} item={project} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2  pb-2">
            <h2 className="text-4xl font-semibold tracking-tight">Education</h2>
          </div>
          <div className="flex flex-col gap-4">
            {portfolioData.education.map((edu) => (
              <SectionCard key={edu.id} item={edu} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {portfolioData.name}. Built with TanStack Start, shadcn/ui & Tailwind.</p>
        </footer>
      </div>
    </div>
  )
}