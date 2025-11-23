import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onFileSelect: (file: File | null) => void;
  onNext: () => void;
}

const ResumeUpload = ({ onFileSelect, onNext }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      onFileSelect(droppedFile);
      toast({
        title: "Resume uploaded",
        description: `${droppedFile.name} is ready for analysis.`,
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, [onFileSelect, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
      toast({
        title: "Resume uploaded",
        description: `${selectedFile.name} is ready for analysis.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">Upload Your Resume</h2>
        <p className="text-muted-foreground">
          Upload your resume in PDF format to extract your skills
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
          id="resume-upload"
        />
        
        {!file ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="mb-1 text-lg font-medium">
                Drop your resume here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">PDF format only</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 text-lg font-medium">
                <FileText className="h-5 w-5 text-primary" />
                {file.name}
              </div>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}
      </div>

      {file && (
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFile(null);
              onFileSelect(null);
            }}
          >
            Remove
          </Button>
          <Button onClick={onNext} className="gap-2">
            Continue to Job Description
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
