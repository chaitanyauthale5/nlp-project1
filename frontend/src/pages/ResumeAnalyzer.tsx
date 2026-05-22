import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const ResumeAnalyzerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Pointing to local FastAPI backend
      const response = await axios.post('http://localhost:8000/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to upload resume.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload your resume to extract skills, education, and experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Upload Resume (PDF)</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/10 transition-colors"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-1">Drag and drop your PDF here</h3>
              <p className="text-sm text-muted-foreground mb-6">or click to browse from your computer</p>
              
              <input 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                id="file-upload" 
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>

              {file && (
                <div className="mt-6 flex items-center gap-3 p-3 bg-muted rounded-lg w-full text-left">
                  <FileText className="w-8 h-8 text-blue-500 shrink-0" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="w-full mt-6" 
              disabled={!file || isUploading}
              onClick={handleUpload}
            >
              {isUploading ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> Analysis Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Extracted Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skills.length > 0 ? result.skills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                        {skill}
                      </span>
                    )) : <p className="text-sm text-muted-foreground">No predefined skills detected.</p>}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Education</h4>
                  {result.education.length > 0 ? (
                    <ul className="space-y-2">
                      {result.education.map((edu: string, i: number) => (
                        <li key={i} className="text-sm p-3 border rounded-md bg-muted/20">{edu}</li>
                      ))}
                    </ul>
                  ) : <p className="text-sm text-muted-foreground">No education section detected.</p>}
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Projects</h4>
                  {result.projects.length > 0 ? (
                    <ul className="space-y-2">
                      {result.projects.map((proj: string, i: number) => (
                        <li key={i} className="text-sm p-3 border rounded-md bg-muted/20">{proj}</li>
                      ))}
                    </ul>
                  ) : <p className="text-sm text-muted-foreground">No specific projects section detected.</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
