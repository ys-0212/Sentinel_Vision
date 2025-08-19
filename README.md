# Deepfake Detection App

A modern, AI-powered deepfake detection application built with Next.js and integrated with the DeepAI API. This application provides a beautiful, user-friendly interface for detecting AI-generated content in images and videos.

## 🚀 Features

- **Advanced Deepfake Detection**: Powered by DeepAI's state-of-the-art deepfake detection models
- **Multi-Format Support**: Analyze both images (JPG, PNG, GIF, BMP, WebP) and videos (MP4, AVI, MOV, WMV, FLV, WebM, MKV)
- **Beautiful UI/UX**: Modern, responsive design with smooth animations and intuitive user interface
- **Drag & Drop Upload**: Easy file upload with drag-and-drop functionality
- **Real-time Analysis**: Fast detection with detailed confidence scores and analysis
- **Comprehensive Results**: Detailed breakdown of authenticity vs deepfake probabilities
- **Secure API Integration**: Secure handling of API keys and file processing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Lucide React Icons, React Dropzone
- **API Integration**: Axios, DeepAI API
- **Notifications**: React Hot Toast
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this application, you'll need:

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn** package manager
3. **DeepAI API Key** - Get one from [deepai.org](https://deepai.org)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd deepfake-detection-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=Deepfake Detection App
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔧 Configuration

### API Key Setup

1. Visit [deepai.org](https://deepai.org) and create an account
2. Navigate to your profile settings
3. Copy your API key
4. In the app, click the "Settings" button in the header
5. Paste your API key in the configuration section

### Customization

You can customize the application by modifying:

- **Styling**: Edit `tailwind.config.js` and `app/globals.css`
- **API Configuration**: Modify `lib/deepai-api.ts` (DeepAI integration)
- **Components**: Update components in the `components/` directory
- **Environment Variables**: Add more variables in `.env.local`

## 📱 Usage

### Basic Workflow

1. **Configure API Key**: Click "Settings" and enter your DeepAI API key
2. **Upload File**: Drag and drop or click to select an image or video file
3. **Start Detection**: Click "Start Detection" to begin analysis
4. **View Results**: Review the detailed analysis results and confidence scores
5. **Analyze More**: Click "Analyze Another File" to process additional content

### Supported File Types

**Images:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- WebP (.webp)

**Videos:**
- MP4 (.mp4)
- AVI (.avi)
- MOV (.mov)
- WMV (.wmv)
- FLV (.flv)
- WebM (.webm)
- MKV (.mkv)

**File Size Limit:** 100MB maximum

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Connect to Vercel**: 
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically deploy your application

### Environment Variables for Production

Set these in your deployment platform:

```env
NEXT_PUBLIC_APP_NAME=Deepfake Detection App
```

### Build for Production

```bash
npm run build
npm start
```

## 🔒 Security Considerations

- API keys are handled securely and never stored in localStorage
- File uploads are validated for type and size
- All API communications use HTTPS
- Input validation and sanitization implemented
- Rate limiting recommended for production use

## 📊 API Integration

The application integrates with DeepAI's API for deepfake detection:

- **Real-time Detection**: Fast analysis of images and videos
- **Free Tier**: 5,000 API calls per month included
- **Error Handling**: Comprehensive error handling and user feedback
- **Response Parsing**: Proper parsing of DeepAI API responses

## 🎨 Customization

### Styling

The app uses Tailwind CSS with custom components. Key customization points:

```css
/* Custom colors in tailwind.config.js */
colors: {
  primary: { /* Your brand colors */ },
  success: { /* Success state colors */ },
  danger: { /* Error state colors */ }
}
```

### Components

All components are modular and can be easily customized:

- `FileUpload.tsx`: File upload interface
- `DetectionResult.tsx`: Results display
- `LoadingSpinner.tsx`: Loading states
- `deepai-api.ts`: API integration logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DeepAI](https://deepai.org) for providing the deepfake detection API
- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Updates

Stay updated with the latest features and improvements by:

- Watching the repository
- Checking the releases page
- Following the development blog

---

**Built with ❤️ for secure content verification**
