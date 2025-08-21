# OS313 - One Ummah. One Operating System.

A premium platform that helps people save money, build communities, find partners, and grow businesses through collective power.

## Features

### Homepage
- Responsive landing page with smooth animations
- Dark/light theme support
- Waitlist signup functionality
- Interactive sections showcasing platform benefits

### Dashboard
- Clean, premium design inspired by Apple and Tesla
- Local-first architecture for development
- Authentication with simple email + code system
- Modular components for easy maintenance

### Core Modules

#### Profile & Matrimonial
- Basic profile management
- Networking and matrimonial toggles
- Preference settings for partner matching
- AI-powered compatibility scoring (demo)

#### Communities
- Browse and join communities
- Create text posts
- Personal feed from joined communities
- Real-time member counts

#### Bills Management
- Upload PDF, JPG, PNG files (up to 25MB)
- File metadata tracking
- Local storage for development
- Expense categorization (coming soon)

#### AI Chat Assistant
- Dual-mode AI: OpenAI API or local fallback
- Context-aware responses about OS313 features
- Chat history persistence
- Responsive chat interface

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd os313
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Authentication
- Email: Any valid email address
- Code: `424242`

## AI Chat Configuration

### Local Mode (Default)
The AI chat works out of the box with a local rules engine that provides contextual responses about OS313 features.

### OpenAI Mode
To enable OpenAI integration:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to your environment:
```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```
3. Restart the development server

The chat will automatically use OpenAI when available, with local fallback for reliability.

## Architecture

### Local-First Design
- All data stored in localStorage for development
- No external dependencies required
- Easy to swap to real database later

### Data Layer
The `data/` directory contains a simple abstraction layer:
- `profileService` - User profiles and preferences
- `communityService` - Community management
- `postService` - Social posts and feeds
- `billService` - Document uploads
- `chatService` - Chat history

### Replaceable Components
To switch to a real database:
1. Update the services in `data/index.ts`
2. Replace localStorage calls with API calls
3. No UI changes required

### File Structure
```
app/
├── (dashboard)/          # Protected dashboard routes
├── auth/                 # Authentication pages
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Homepage

components/
├── dashboard/           # Dashboard-specific components
├── Navbar.tsx          # Main navigation
└── [other components]   # Homepage components

data/
└── index.ts            # Local data layer

lib/
├── ai/                 # AI service abstraction
└── auth/               # Authentication context
```

## Development Guidelines

### Theme System
- Uses Tailwind CSS with custom design tokens
- Consistent spacing and typography scale
- Dark mode support throughout
- Premium glass-morphism effects

### Animation Standards
- Framer Motion for all animations
- 150-250ms duration for interactions
- Subtle hover effects and transitions
- No performance-heavy animations

### Code Standards
- TypeScript throughout
- Modular component architecture
- Consistent naming conventions
- Local-first data patterns

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_PUBLIC_OPENAI_API_KEY` - Optional OpenAI API key

## Contributing

1. Keep the homepage pixel-identical
2. Follow the existing design system
3. Maintain local-first architecture
4. Add comprehensive TypeScript types
5. Test on mobile devices

## License

Private - OS313 Platform
