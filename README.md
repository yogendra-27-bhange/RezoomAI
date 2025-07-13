# 🚀 RezoomAI - AI-Powered Resume Feedback Platform

A modern, full-stack web application that provides instant AI-powered resume analysis using Google Gemini. Get detailed feedback, improvement suggestions, and match scores to boost your career prospects.

![RezoomAI](https://img.shields.io/badge/RezoomAI-AI%20Powered-blue?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.11-blue?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange?style=for-the-badge&logo=firebase)

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Google Gemini API for intelligent resume feedback
- **📄 Multi-Format Support**: Upload PDF, DOCX, or paste text directly
- **🎯 Smart Scoring**: Get overall score and role match percentage
- **💡 Actionable Feedback**: Detailed improvement suggestions and missing keywords
- **🔥 Firebase Auth**: Secure Google/email authentication
- **📊 History Tracking**: Save and review previous analyses
- **📱 Mobile-First Design**: Beautiful, responsive UI with animations
- **⚡ Serverless Backend**: Netlify Functions for scalable API
- **🎨 Modern UI**: Glowing effects, gradients, and smooth animations

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Router** for navigation
- **React Query** for data fetching
- **Lucide React** for icons

### Backend
- **Netlify Functions** (Node.js)
- **Google Gemini AI** API
- **Firebase Auth** & **Firestore**
- **PDF-Parse** & **Mammoth** for file processing

### Deployment
- **Netlify** for hosting and serverless functions
- **Firebase** for authentication and database

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Firebase project

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rezoomai.git
cd rezoomai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Google Gemini AI API
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Netlify Functions Environment Variables (for backend)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Google provider
3. Create a Firestore database
4. Get your Firebase config from Project Settings
5. Update your `.env` file with the Firebase credentials

### 5. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file

### 6. Development

```bash
# Start development server
npm run dev

# Start Netlify Functions locally
npm run functions:dev
```

### 7. Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## 📁 Project Structure

```
rezoomai/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Landing page hero
│   │   ├── ResumeUpload.tsx    # File upload component
│   │   └── ResumeAnalysis.tsx  # Results display
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Dashboard.tsx       # Main app dashboard
│   │   └── NotFound.tsx        # 404 page
│   ├── contexts/
│   │   └── AuthContext.tsx     # Firebase auth context
│   ├── lib/
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── utils.ts            # Utility functions
│   ├── hooks/
│   │   └── use-toast.ts        # Toast notifications
│   └── assets/                 # Images and icons
├── netlify/
│   └── functions/
│       ├── analyzeResume.ts    # AI analysis endpoint
│       └── uploadResume.ts     # File upload endpoint
├── public/                     # Static assets
├── netlify.toml               # Netlify configuration
└── package.json
```

## 🔧 API Endpoints

### `/api/analyzeResume`
Analyzes resume content using Google Gemini AI.

**POST** `/api/analyzeResume`
```json
{
  "resumeText": "Resume content here...",
  "jobTitle": "Software Engineer",
  "company": "Google"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "score": 85,
    "matchRate": 92,
    "feedback": {
      "strengths": ["..."],
      "weaknesses": ["..."],
      "suggestions": ["..."]
    },
    "improvements": {
      "content": ["..."],
      "format": ["..."],
      "keywords": ["..."]
    },
    "summary": "Overall assessment..."
  }
}
```

### `/api/uploadResume`
Handles file uploads and text extraction.

**POST** `/api/uploadResume`
- Content-Type: `multipart/form-data`
- Body: Form data with `resume` file

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom design tokens. Modify `src/index.css` for:
- Color schemes
- Typography
- Animations
- Custom gradients

### Components
All UI components are built with shadcn/ui. Add new components:
```bash
npx shadcn@latest add [component-name]
```

### Animations
Custom animations are defined in `tailwind.config.ts`:
- `animate-fade-in`
- `animate-float`
- `animate-pulse-glow`

## 🔒 Security

- Environment variables for sensitive data
- Firebase Auth for user authentication
- CORS configuration for API endpoints
- File type validation
- File size limits (10MB)

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Add these in your Netlify dashboard:
- `GOOGLE_GEMINI_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [Firebase](https://firebase.google.com/) for backend services
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Netlify](https://netlify.com/) for hosting and serverless functions

## 📞 Support

- 📧 Email: support@rezoomai.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/rezoomai/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/rezoomai/wiki)

---

Made with ❤️ by the RezoomAI Team
