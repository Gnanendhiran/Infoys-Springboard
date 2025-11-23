import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Target, TrendingUp, Sparkles } from "lucide-react";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescription from "@/components/JobDescription";
import SkillAnalysis from "@/components/SkillAnalysis";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_JOB_DESCRIPTION = `Senior Full Stack Developer

We are seeking an experienced Full Stack Developer to join our growing team.

Required Skills:
- React, TypeScript, Node.js
- PostgreSQL, MongoDB
- Docker, Kubernetes
- AWS or Google Cloud Platform
- GraphQL, REST APIs
- Git, CI/CD pipelines

Preferred Skills:
- Python, Django or Flask
- Microservices architecture
- Test automation (Jest, Cypress)
- Agile/Scrum methodology

Requirements:
- Bachelor's degree in Computer Science or related field
- 5+ years of software development experience
- Strong problem-solving and communication skills`;

const SAMPLE_ANALYSIS_DATA = {
  matchScore: 78,
  matchedSkills: ["React", "JavaScript", "Node.js", "Python", "SQL", "AWS", "Git", "REST API", "Agile"],
  missingSkills: ["Kubernetes", "Docker", "GraphQL", "TypeScript", "MongoDB"],
  recommendedSkills: ["Docker", "Kubernetes", "TypeScript", "GraphQL", "MongoDB", "Microservices"],
  experienceScore: 85,
  educationScore: 90,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const analyzerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    analyzerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab("upload");
  };

  const handleViewDemo = () => {
    // Create a mock file
    const mockFile = new File(["sample resume content"], "demo-resume.pdf", {
      type: "application/pdf",
    });
    
    setResumeFile(mockFile);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setAnalysisData(SAMPLE_ANALYSIS_DATA);
    setActiveTab("results");
    
    analyzerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    toast({
      title: "Demo loaded!",
      description: "Viewing sample analysis results",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Intelligence
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Match Your Skills to Your Dream Job
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Upload your resume, paste a job description, and get instant skill matching analysis with personalized learning recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2" onClick={handleGetStarted}>
                <Upload className="h-5 w-5" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleViewDemo}>
                <TrendingUp className="h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Upload Resume</h3>
            <p className="text-muted-foreground">
              Upload your resume in PDF format and let our AI extract your skills automatically.
            </p>
          </Card>
          <Card className="border-accent/20 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Match Analysis</h3>
            <p className="text-muted-foreground">
              Get detailed matching scores and see which skills align with job requirements.
            </p>
          </Card>
          <Card className="border-success/20 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-success/40 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Skill Recommendations</h3>
            <p className="text-muted-foreground">
              Discover gaps and get personalized recommendations for skills to learn next.
            </p>
          </Card>
        </div>

        {/* Main Analyzer Section */}
        <Card ref={analyzerRef} className="border-border/60 bg-card/80 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border/60 bg-muted/30 px-6 pt-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="upload" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Resume
                </TabsTrigger>
                <TabsTrigger value="job" className="gap-2" disabled={!resumeFile}>
                  <Target className="h-4 w-4" />
                  Job
                </TabsTrigger>
                <TabsTrigger value="results" className="gap-2" disabled={!analysisData}>
                  <TrendingUp className="h-4 w-4" />
                  Results
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="upload" className="mt-0">
                <ResumeUpload 
                  onFileSelect={setResumeFile}
                  onNext={() => setActiveTab("job")}
                />
              </TabsContent>

              <TabsContent value="job" className="mt-0">
                <JobDescription
                  value={jobDescription}
                  onChange={setJobDescription}
                  resumeFile={resumeFile}
                  onAnalyze={(data) => {
                    setAnalysisData(data);
                    setActiveTab("results");
                  }}
                />
              </TabsContent>

              <TabsContent value="results" className="mt-0">
                <SkillAnalysis data={analysisData} />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SkillMatch AI. Empowering careers through intelligent skill analysis.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
