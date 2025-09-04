<<<<<<< HEAD
# 🏠 Smart Home Control

A modern, responsive smart home control dashboard built with React, TypeScript, and shadcn/ui. Monitor and control your smart devices with an intuitive interface.

![Smart Home Dashboard](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Real-time Device Monitoring**: Track status of all connected smart devices
- **Room-based Organization**: Organize devices by rooms for easy management
- **Quick Statistics**: View device summaries at a glance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Device Controls**: Turn devices on/off, adjust settings, and monitor usage

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-home-control.git
   cd smart-home-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5176`

## 📁 Project Structure

```
smart-home-control/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── QuickStats.tsx   # Device statistics overview
│   │   ├── RoomSelector.tsx # Room navigation
│   │   └── DeviceCard.tsx   # Individual device display
│   ├── hooks/              # Custom React hooks
│   │   └── useDevices.ts    # Device state management
│   ├── pages/              # Page components
│   │   ├── Index.tsx        # Main dashboard
│   │   └── NotFound.tsx     # 404 page
│   ├── types/              # TypeScript type definitions
│   │   └── devices.ts       # Device interfaces
│   ├── lib/                # Utility functions
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── package.json
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts      # Tailwind configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Supported Device Types

- **Lights**: Smart bulbs, LED strips
- **Thermostats**: Temperature control devices
- **Security Cameras**: IP cameras, doorbell cameras
- **Smart Locks**: Door locks, garage doors
- **Sensors**: Motion, temperature, humidity sensors

## 🌐 Deployment

### GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   The project uses GitHub Actions for automatic deployment. Simply push to the `main` branch.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🎨 Customization

### Adding New Device Types

1. Add the device type to `src/types/devices.ts`
2. Create corresponding UI components in `src/components/`
3. Update device handling logic in `src/hooks/useDevices.ts`

### Styling

- Global styles: `src/index.css`
- Component styles: Use Tailwind CSS classes
- Theme customization: `tailwind.config.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide React](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Live Demo**: [View Demo](https://yourusername.github.io/smart-home-control)

Made with ❤️ by [Your Name](https://github.com/yourusername)
=======
# smart-home-control
>>>>>>> f9f9bbca69a03ca823eca82b547c3e2954a595c5
