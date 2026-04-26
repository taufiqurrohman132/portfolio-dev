import { About } from "@/components/main/about";
import { Certificates } from "@/components/main/certificates";
import { Encryption } from "@/components/main/encryption";
import { Experience } from "@/components/main/experience";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { RecentProjects } from "@/components/main/recent-projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <About />
        {/* <Encryption /> */}
        <Experience />
        <RecentProjects />
        <Certificates />
        {/* <Projects /> */}
      </div>
    </main>
  );
}
