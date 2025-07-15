# AI Report Generator - DroneDeploy Extension

A React/Next.js application that generates AI-powered reports from DroneDeploy site data. This extension pulls available site data for a selected plan—including flight logs, measurements, annotations, and imagery—and generates natural language summaries using Groq's LLM API.

## Features

- 🔍 **Plan Selection**: Browse and select from available DroneDeploy plans
- 📊 **Data Explorer**: Review available data types (flight logs, measurements, annotations, imagery)
- 🤖 **AI Report Generation**: Generate comprehensive reports using Groq's LLM
- 📱 **Mobile-Friendly UI**: Clean, responsive design optimized for field use
- 📤 **Export Options**: Download reports as Markdown files
- 🎨 **Modern Design**: Dark theme with DroneDeploy brand colors

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Groq API (Llama 3.1 8B)
- **Icons**: Lucide React
- **State Management**: React Hooks

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-report-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.local.example env.local
   ```
   
   Edit `env.local` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── PlanSelector.tsx   # Plan selection interface
│   ├── DataExplorer.tsx   # Data type selection
│   └── ReportViewer.tsx   # Report display and export
├── lib/                   # Utility libraries
│   ├── dronedeploy-api.ts # DroneDeploy API service
│   └── ai-service.ts      # AI report generation service
├── public/                # Static assets
└── README.md             # This file
```

## Development

### Mock Data

The application currently uses mock data for development. To integrate with real DroneDeploy API:

1. Update `lib/dronedeploy-api.ts` with your DroneDeploy API credentials
2. Replace mock data calls with real API endpoints
3. Update environment variables with DroneDeploy API keys

### AI Integration

The AI service uses Groq's API for report generation. To customize:

1. Modify prompts in `lib/ai-service.ts`
2. Adjust model parameters (temperature, max_tokens)
3. Add additional AI features (summarization, recommendations)

### Styling

The app uses Tailwind CSS with custom colors:
- Background: `rgb(31, 31, 31)`
- Primary buttons: `rgb(63, 72, 233)`
- Text: White

## API Integration

### DroneDeploy API

The app is designed to work with DroneDeploy's GraphQL API. Key endpoints:

- `GET /plans` - List available plans
- `GET /plans/{id}/data` - Get plan data (flight logs, measurements, etc.)
- `GET /plans/{id}/imagery` - Get imagery data

### Groq AI API

The AI service uses Groq's chat completions API:

- Model: `llama3-8b-8192`
- Temperature: 0.7
- Max tokens: 2000

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker containers

## Environment Variables

```bash
# Required
GROQ_API_KEY=your_groq_api_key

# Optional (for production)
DRONEDEPLOY_API_KEY=your_dronedeploy_api_key
DRONEDEPLOY_BASE_URL=https://api.dronedeploy.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Check DroneDeploy API documentation

---

**Note**: This is a demonstration project for DroneDeploy hiring purposes. The mock data and API integrations are for development and testing only.
