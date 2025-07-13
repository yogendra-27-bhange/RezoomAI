import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Upload, 
  Sparkles, 
  TrendingUp, 
  History,
  User,
  LogOut
} from 'lucide-react';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import { signOutUser } from '@/lib/firebase';

interface AnalysisResult {
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  improvements: {
    content: string[];
    format: string[];
    keywords: string[];
  };
  matchRate: number;
  summary: string;
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleFileUpload = (file: File, text: string) => {
    setResumeText(text);
  };

  const handleTextInput = (text: string) => {
    setResumeText(text);
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "No resume content",
        description: "Please upload a resume or paste your resume text.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyzeResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobTitle: jobTitle.trim() || undefined,
          company: company.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const result = await response.json();
      
      if (result.success) {
        setAnalysis(result.analysis);
        toast({
          title: "Analysis complete!",
          description: "Your resume has been analyzed successfully.",
        });
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze resume",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access the dashboard.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">RezoomAI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Welcome back, {user?.displayName || 'User'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and get instant AI-powered feedback to improve your chances of landing your dream job.
            </p>
          </div>

          <Tabs defaultValue="analyze" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analyze" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Analyze Resume
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Analyze Resume Tab */}
            <TabsContent value="analyze" className="space-y-6">
              {/* Job Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Target Position (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input
                        id="job-title"
                        placeholder="e.g., Senior Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="e.g., Google, Microsoft"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Upload */}
              <ResumeUpload
                onFileUpload={handleFileUpload}
                onTextInput={handleTextInput}
                isLoading={isAnalyzing}
              />

              {/* Analyze Button */}
              {resumeText && (
                <div className="text-center">
                  <Button
                    onClick={analyzeResume}
                    disabled={isAnalyzing || !resumeText.trim()}
                    size="lg"
                    className="relative overflow-hidden"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                        <div className="relative flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                          Analyzing with AI...
                        </div>
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analyze Resume with AI
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {analysis && (
                <div className="mt-8">
                  <ResumeAnalysis
                    analysis={analysis}
                    jobTitle={jobTitle}
                    company={company}
                  />
                </div>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Analysis History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your previous resume analyses will appear here. This feature is coming soon!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div>
                      <Label>Display Name</Label>
                      <p className="text-sm text-muted-foreground">
                        {user?.displayName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <Label>Account Created</Label>
                      <p className="text-sm text-muted-foreground">
                        {user?.metadata.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : 'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 