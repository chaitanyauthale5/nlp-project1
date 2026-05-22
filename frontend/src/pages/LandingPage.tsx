import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FileText, Briefcase, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AI
            </div>
            <span className="font-bold text-xl tracking-tight">Campus Copilot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
              Introducing the Ultimate Placement Assistant
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Land your dream job with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                AI-Powered Precision
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Analyze your resume against any job description, get ATS-style insights, and practice with our AI mock interviewer. Built exclusively for students.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                  Start Optimizing Now
                </Button>
              </Link>
              <Link to="#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-40 mt-auto" />
            <div className="rounded-xl border shadow-2xl bg-card overflow-hidden">
              <div className="h-10 bg-muted border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
                <div className="col-span-2 space-y-4">
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="h-32 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-muted rounded w-full" />
                  <div className="h-32 bg-muted rounded w-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've packed all the essential tools into one elegant dashboard to streamline your placement preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-blue-500" />}
              title="Resume Analyzer"
              description="Upload your PDF and extract skills, education, and projects instantly using advanced parsing."
            />
            <FeatureCard 
              icon={<Briefcase className="w-6 h-6 text-green-500" />}
              title="Job Matcher"
              description="Paste a JD and instantly see your ATS score, missing skills, and detailed recommendations."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-purple-500" />}
              title="AI Mock Interviews"
              description="Practice technical and behavioral questions with an AI coach that provides instant feedback."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
