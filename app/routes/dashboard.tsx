import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {
  Plus,
  FileText,
  Target,
  TrendingUp,
  LayoutTemplate,
  Brain,
  MessageCircle,
} from "lucide-react";

export const meta: () => {
  title: string;
  name: string;
  content: string;
}[] = () => [
  {
    title: "SkillSnap | Dashboard",
    name: "description",
    content: "Your resume analysis dashboard",
  },
];

const Dashboard = () => {
  const { isSignedIn, user } = useUser();
  const { kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [stats, setStats] = useState({
    totalResumes: 0,
    avgScore: 0,
    improvedResumes: 0,
  });

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth/sign-in?next=/dashboard");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    if (!isSignedIn) return;

    const loadResumes = async () => {
      setLoadingResumes(true);

      try {
        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes =
          resumes?.map((resume) => JSON.parse(resume.value) as Resume) || [];

        setResumes(parsedResumes);

        // Calculate stats
        const totalResumes = parsedResumes.length;
        const avgScore =
          totalResumes > 0
            ? parsedResumes.reduce(
                (sum, resume) => sum + (resume.feedback?.overallScore || 0),
                0
              ) / totalResumes
            : 0;
        const improvedResumes = parsedResumes.filter(
          (resume) => (resume.feedback?.overallScore || 0) > 70
        ).length;

        setStats({
          totalResumes,
          avgScore: Math.round(avgScore),
          improvedResumes,
        });
      } catch (error) {
        console.error("Error loading resumes:", error);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, [isSignedIn, kv]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen w-full relative">
  {/* Lavender Blush Flow Gradient (Top Left to Bottom Right) */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `linear-gradient(135deg, #E1BEE7 0%, #F3E5F5 20%, #FCE4EC 40%, #FFF0F5 60%, #F8BBD9 80%, #E1BEE7 100%)`,
    }}
  />
      <main>
        <div className="relative z-10">
          <Navbar />

          <section className="container mx-auto px-6 py-8">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.firstName || "User"}!
              </h1>
              <p className="text-xl text-gray-600">
                Here's your resume optimization progress
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Total Resumes
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.totalResumes}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Average Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.avgScore}%
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      High-Scoring Resumes
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.improvedResumes}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/build-resume"
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                >
                  <div className="bg-green-100 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Build Your Resume
                    </h3>
                    <p className="text-gray-600">
                      Create professional resumes with AI-powered templates
                    </p>
                  </div>
                </Link>

                <Link
                  to="/upload"
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                >
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Upload Resume
                    </h3>
                    <p className="text-gray-600">
                      Get AI-powered analysis and feedback on your resume
                    </p>
                  </div>
                </Link>

                <Link
                  to="/templates"
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                >
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <LayoutTemplate className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Resume Templates
                    </h3>
                    <p className="text-gray-600">
                      Browse ATS-friendly professional templates
                    </p>
                  </div>
                </Link>

                <Link
                  to="/ai-interviewer"
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      AI Interviewer
                    </h3>
                    <p className="text-gray-600">
                      Practice interviews with AI-powered simulations
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Resumes */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Resumes
                </h2>
                {resumes.length > 0 && (
                  <Link to="/upload" className="primary-button w-fit text-sm">
                    Upload Another
                  </Link>
                )}
              </div>

              {loadingResumes ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <img
                    src="/images/resume-scan-2.gif"
                    className="w-[200px] mb-4"
                    alt="Loading"
                  />
                  <p className="text-gray-600">Loading your resumes...</p>
                </div>
              ) : resumes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No resumes yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Upload your first resume to get started with AI-powered
                    analysis
                  </p>
                  <Link to="/upload" className="primary-button w-fit text-lg">
                    Upload Your First Resume
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
