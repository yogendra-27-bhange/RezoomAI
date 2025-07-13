import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onFileUpload: (file: File, text: string) => void;
  onTextInput: (text: string) => void;
  isLoading?: boolean;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
  onFileUpload, 
  onTextInput, 
  isLoading = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;

    setIsProcessing(true);
    setUploadProgress(0);
    setUploadedFile(file);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch('/.netlify/functions/uploadResume', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      
      if (result.success) {
        setExtractedText(result.text);
        onFileUpload(file, result.text);
        
        toast({
          title: "File uploaded successfully!",
          description: `Extracted ${result.text.length} characters from ${result.fileName}`,
        });
      } else {
        throw new Error(result.error || 'Failed to process file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
      setUploadedFile(null);
      setExtractedText('');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setExtractedText(text);
    onTextInput(text);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setExtractedText('');
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <Card className={`transition-all duration-300 ${
        isDragOver ? 'border-primary bg-primary/5' : ''
      }`}>
        <CardContent className="p-6">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Upload your resume
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your PDF, DOCX, or TXT file here, or click to browse
              </p>
              <Button 
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={isLoading || isProcessing}
                className="relative overflow-hidden"
              >
                {isProcessing ? (
                  <>
                    <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                    <span className="relative">Processing...</span>
                  </>
                ) : (
                  "Choose File"
                )}
              </Button>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading || isProcessing}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  disabled={isProcessing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-sm">Extracting text...</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {extractedText && !isProcessing && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Text extracted successfully</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Text Input Alternative */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Or paste your resume text</h3>
          <textarea
            value={extractedText}
            onChange={handleTextInput}
            placeholder="Paste your resume content here..."
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground"
            disabled={isLoading || isProcessing}
          />
          {extractedText && (
            <p className="text-sm text-muted-foreground mt-2">
              {extractedText.length} characters
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUpload; 