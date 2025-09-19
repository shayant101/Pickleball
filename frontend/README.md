# CoachPro - Pickleball Coaching Platform

A comprehensive Next.js application for managing pickleball coaching businesses. Built with modern web technologies and designed specifically for solo pickleball coaches.

## 🏓 Features

- **Dashboard**: Overview of your coaching business with key metrics
- **Student Management**: Complete student roster with profiles and progress tracking
- **Calendar**: Schedule and manage coaching sessions
- **Attendance Tracking**: Monitor student attendance and punctuality
- **Progress Tracking**: Document student improvement and goals
- **Practice Management**: Assign and track practice sessions
- **Payment Processing**: Handle payments and financial records
- **Messaging**: Communicate with students and parents
- **Analytics**: Business insights and performance metrics
- **Settings**: Customize your coaching platform

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pickleball-coach-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── students/         # Student management
│   ├── calendar/         # Calendar components
│   ├── progress/         # Progress tracking
│   ├── payments/         # Payment components
│   ├── messages/         # Messaging system
│   ├── analytics/        # Analytics dashboard
│   ├── settings/         # Settings components
│   └── common/           # Shared components
├── hooks/                # Custom React hooks
├── data/                 # Mock data and constants
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

## 🎯 Key Components

### Student Management
- Student profiles with contact information
- Play style tracking (Singles, Doubles, Tournament Prep)
- Skill level progression
- Goal setting and tracking

### Session Management
- Calendar view for scheduling
- Session types and duration tracking
- Attendance monitoring
- Progress notes and feedback

### Business Analytics
- Revenue tracking
- Student engagement metrics
- Session completion rates
- Growth insights

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Features

1. Create components in the appropriate directory
2. Add types to `src/types/`
3. Update navigation in `src/hooks/useNavigation.ts`
4. Add mock data in `src/data/`

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Customization

### Themes
The platform uses CSS variables for theming. Modify `src/app/globals.css` to customize colors.

### Components
All UI components are built with Radix UI and can be customized in `src/components/ui/`.

## 🚀 Deployment

The platform can be deployed to any Next.js-compatible hosting service:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository.