import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/contants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSnap" },
    { name: "description", content: "AI-powered Resume Builder & Analyzer. Create job-winning resumes, optimize keywords, and boost your chances of landing your dream role" },
  ];
}

export default function Home() {
  const {isLoading, auth} = usePuterStore()
  const navigate=useNavigate()

  useEffect(() => {
    if(!auth.isAuthenticated)
      navigate("/auth?next=/")
  },[auth.isAuthenticated, navigate])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-10">
         <h1>Build, Analyze & Perfect Your Resume in Minutes</h1>
         <h2>Create professional resumes, checks ATS compatibility, and helps you land your dream job.</h2>
      </div>
    
     
     {resumes.length > 0 && (
     <div className="resumes-section">
    {resumes.map(resume => (
      <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    )}
    </section>
  </main>;
}
