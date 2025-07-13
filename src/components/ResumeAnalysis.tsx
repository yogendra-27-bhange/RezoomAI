import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  Star,
  Zap,
  Brain
} from 'lucide-react';

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

interface ResumeAnalysisProps {
  analysis: AnalysisResult;
  jobTitle?: string;
  company?: string;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ 
  analysis, 
  jobTitle, 
  company 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10';
    if (score >= 60) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Job Info */}
      {(jobTitle || company) && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                {jobTitle && (
                  <h3 className="text-lg font-semibold text-foreground">
                    {jobTitle}
                  </h3>
                )}
                {company && (
                  <p className="text-muted-foreground">{company}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score */}
        <Card className={`${getScoreBg(analysis.score)} border-primary/20`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Overall Score</h3>
                  <p className="text-sm text-muted-foreground">Resume quality assessment</p>
                </div>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}
              </div>
            </div>
            <Progress 
              value={analysis.score} 
              className="h-3"
              style={{
                '--progress-background': 'hsl(var(--primary))',
              } as React.CSSProperties}
            />
          </CardContent>
        </Card>

        {/* Match Rate */}
        <Card className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Match Rate</h3>
                  <p className="text-sm text-muted-foreground">Role alignment score</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-500">
                {analysis.matchRate}%
              </div>
            </div>
            <Progress 
              value={analysis.matchRate} 
              className="h-3 bg-blue-500/20"
              style={{
                '--progress-background': 'hsl(217 91% 60%)',
              } as React.CSSProperties}
            />
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-500" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{analysis.summary}</p>
        </CardContent>
      </Card>

      {/* Feedback Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.feedback.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Suggestions */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Lightbulb className="h-5 w-5" />
            Actionable Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Content Improvements */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Content Improvements
              </h4>
              <div className="space-y-2">
                {analysis.improvements.content.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Format Improvements */}
            <div>
              <h4 className="font-semibold mb-3">Formatting Suggestions</h4>
              <div className="space-y-2">
                {analysis.improvements.format.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Keywords */}
            <div>
              <h4 className="font-semibold mb-3">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.improvements.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalysis; 