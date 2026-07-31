<div align="center">
  <img src="public/android-chrome-192x192.png" alt="Zelda Portfolio Logo" width="200" />
  
  # 🗡️ Zelda-Inspired Portfolio Website 🛡️
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## ✨ Features

- 🎮 Clean, serene aesthetic inspired by Zelda's Sheikah technology
- 📱 Fully responsive design for all screen sizes
- 🎨 Interactive animations using Framer Motion
- 💫 Modern UI components with Sheikah Slate-inspired styling
- 🌊 Smooth page transitions and hover effects
- 📝 Blog section with journal-style entries
- 📧 Contact form with fantasy-themed styling
- 🎯 Particle effects using tsparticles
- 🔒 Secure contact form with AWS SES integration

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- tsparticles
- AWS SES
- Vitest & React Testing Library

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone git@github.com:sagezaugg/sagezaugg.com.git
cd sagezaugg.com
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (optional):

```bash
# For local development, content is served from /content by default
# For production, set VITE_CONTENT_BASE_URL to your S3 bucket URL
# Example: VITE_CONTENT_BASE_URL=https://your-bucket.s3.amazonaws.com
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
  ├── components/    # Reusable UI components
  ├── pages/         # Page components
  ├── assets/        # Images, fonts, and other static assets
  ├── styles/        # Global styles and Tailwind configuration
  ├── utils/         # Utility functions and constants
```

## 🎨 Customization

1. Update the content in the respective page components
2. Modify the color scheme in `tailwind.config.js`
3. Add your own images to the `src/assets` directory
4. Customize animations in the components using Framer Motion
5. Configure particle effects in `src/App.tsx`

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by Sage Zora</sub>
</div>
