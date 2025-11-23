import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  resumeFile: File | null;
  onAnalyze: (data: any) => void;
}

const JobDescription = ({ value, onChange, resumeFile, onAnalyze }: JobDescriptionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!value.trim()) {
      toast({
        title: "Missing information",
        description: "Please paste a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis - will be replaced with actual API call
    setTimeout(() => {
      const mockData = {
        matchScore: 78,
        matchedSkills: ["React", "JavaScript", "Node.js", "Python", "SQL", "AWS"],
        missingSkills: ["Kubernetes", "Docker", "GraphQL", "TypeScript"],
        recommendedSkills: ["Docker", "Kubernetes", "TypeScript", "GraphQL", "MongoDB"],
        experienceScore: 85,
        educationScore: 90,
      };
      
      onAnalyze(mockData);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Match score: ${mockData.matchScore}%`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">Job Description</h2>
        <p className="text-muted-foreground">
          Paste the job description to match your skills against requirements
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste the full job description here including required skills, qualifications, and responsibilities..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[300px] resize-none"
        />
        
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">AI-Powered Analysis</p>
              <p className="text-sm text-muted-foreground">
                Get instant skill matching and recommendations
              </p>
            </div>
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !value.trim()}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Match
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
