# Aryan B V Portfolio

A responsive portfolio website showcasing my professional information, skills, projects, and achievements. Built with React, Tailwind CSS, and Framer Motion.

![Portfolio Screenshot](https://user-images.githubusercontent.com/your-username/your-repo/screenshot.png)

## 🔍 Live Demo

[View Live Portfolio](https://aryanbv.github.io/Aryan-Portfolio/)

## ✨ Features

- **Responsive Design**: Optimized for all device sizes
- **Dark Theme**: Modern and visually appealing dark-themed interface
- **Interactive UI**: Smooth animations and transitions powered by Framer Motion
- **Tabbed Sections**: Organized content with intuitive navigation
- **Project Showcase**: Filterable project gallery with detailed information
- **Skills Visualization**: Interactive skill progress bars and tooltips
- **Contact Form**: Integrated contact form (front-end only)
- **Achievement Tracking**: Visual representation of accomplishments

## 🛠️ Built With

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6.22.1)
- **Animations**: Framer Motion
- **Icons**: React Icons

## 📋 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AryanBV/Aryan-Portfolio.git
   cd Aryan-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

This project is configured for deployment to GitHub Pages.

1. **Install GitHub Pages dependency** (if not already installed)
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Update package.json** (if not already updated)
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Set the base path in vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/Aryan-Portfolio/'
   })
   ```

4. **Deploy the project**
   ```bash
   npm run deploy
   ```

## 📚 Project Structure

```
Aryan-Portfolio/
├── public/
│   ├── images/
│   │   └── [project images]
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── Navbar.jsx
│   │   └── sections/
│   │       ├── About.jsx
│   │       ├── Achievements.jsx
│   │       ├── Contact.jsx
│   │       ├── Hero.jsx
│   │       ├── Projects.jsx
│   │       └── Skills.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── utils/
│   │   └── pathUtils.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🔄 Development Workflow

1. Make changes to the code
2. Test locally with `npm run dev`
3. Deploy to GitHub Pages with `npm run deploy`

## 🖼️ Adding New Images

1. Add images to the `public/images/` directory
2. Reference them in components using the helper function:
   ```javascript
   import { getImagePath } from '../../utils/pathUtils';
   
   // Then use
   <img src={getImagePath('image-name.png')} alt="Description" />
   ```

## 📧 Contact

- **LinkedIn**: [Aryan B V](https://www.linkedin.com/in/aryan-b-v-78aa63246/)
- **GitHub**: [AryanBV](https://github.com/AryanBV)
- **Email**: aryansalian5678@gmail.com

