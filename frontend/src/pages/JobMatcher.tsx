import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const JobMatcherPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jdText) return alert('Please provide both resume text and job description.');
    setIsAnalyzing(true);

    try {
      const response = await axios.post('http://localhost:8000/analyze-match', {
        resume_text: resumeText,
        job_description: jdText
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Job Matcher</h1>
        <p className="text-muted-foreground">Compare your resume against a job description to get your ATS match score.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              className="w-full h-64 p-4 rounded-md border bg-background text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              className="w-full h-64 p-4 rounded-md border bg-background text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Paste the job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg" className="w-full md:w-auto px-12" onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing Match..." : "Calculate Match Score"}
        </Button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 text-center flex flex-col items-center justify-center py-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted" />
                  <circle 
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={440} strokeDashoffset={440 - (440 * result.match_score) / 100}
                    className={`transition-all duration-1000 ${result.match_score > 70 ? 'text-green-500' : result.match_score > 40 ? 'text-yellow-500' : 'text-red-500'}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{result.match_score}%</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase mt-1">Match Score</span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{result.prediction}</h3>
            </Card>

            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" /> Missing Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.missing_skills && result.missing_skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-destructive/10 text-destructive text-sm rounded-full font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Great job! No major skills missing.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.suggestions.map((sug: string, idx: number) => (
                      <li key={idx} className="text-sm p-3 border rounded-md bg-muted/10 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <p className="mt-0.5">{sug}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
