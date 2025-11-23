import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LearningResource {
  skill: string;
  platform: string;
  title: string;
  type: "course" | "video" | "article";
  duration: string;
  level: string;
  url: string;
}

interface LearningResourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: string[];
}

const SAMPLE_RESOURCES: LearningResource[] = [
  {
    skill: "Docker",
    platform: "Udemy",
    title: "Docker Mastery: Complete Toolset From a Docker Captain",
    type: "course",
    duration: "19 hours",
    level: "Beginner to Advanced",
    url: "https://www.udemy.com/course/docker-mastery/",
  },
  {
    skill: "Kubernetes",
    platform: "Coursera",
    title: "Getting Started with Google Kubernetes Engine",
    type: "course",
    duration: "8 hours",
    level: "Intermediate",
    url: "https://www.coursera.org/learn/google-kubernetes-engine",
  },
  {
    skill: "TypeScript",
    platform: "YouTube",
    title: "TypeScript Full Course for Beginners",
    type: "video",
    duration: "8 hours",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=gp5H0Vw39yw",
  },
  {
    skill: "GraphQL",
    platform: "FreeCodeCamp",
    title: "GraphQL Full Course - Novice to Expert",
    type: "video",
    duration: "4 hours",
    level: "Beginner to Intermediate",
    url: "https://www.youtube.com/watch?v=ed8SzALpx1Q",
  },
  {
    skill: "MongoDB",
    platform: "MongoDB University",
    title: "MongoDB Basics",
    type: "course",
    duration: "Self-paced",
    level: "Beginner",
    url: "https://university.mongodb.com/",
  },
];

const LearningResourcesDialog = ({ open, onOpenChange, skills }: LearningResourcesDialogProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredResources = SAMPLE_RESOURCES.filter((resource) =>
    skills.some((skill) => skill.toLowerCase().includes(resource.skill.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Learning Resources
          </DialogTitle>
          <DialogDescription>
            Curated courses and resources to help you develop the recommended skills
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <Card key={index} className="border-primary/20 p-4 transition-all hover:border-primary/40">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1">
                          {getIcon(resource.type)}
                          {resource.type}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary">
                          {resource.skill}
                        </Badge>
                      </div>
                      <h4 className="font-semibold leading-tight">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {resource.platform} • {resource.duration} • {resource.level}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2 shrink-0" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <BookOpen className="mx-auto mb-3 h-12 w-12 opacity-50" />
              <p>No specific resources found for your skills.</p>
              <p className="text-sm">Try searching on popular learning platforms.</p>
            </div>
          )}

          <Card className="border-accent/20 bg-accent/5 p-4">
            <h4 className="mb-2 font-semibold">More Learning Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {["Coursera", "Udemy", "Pluralsight", "LinkedIn Learning", "edX", "Codecademy"].map(
                (platform) => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                )
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearningResourcesDialog;
