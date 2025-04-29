"use client";

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ComponentSnippet } from '@/lib/component-data';

export interface TemplateFiles {
  'index.html'?: string;
  'styles.css'?: string;
  'script.js'?: string;
  [key: string]: string | undefined;
}

interface NextJSStructure {
  'app/page.tsx': string;
  'app/layout.tsx': string;
  'tailwind.config.js': string;
  'package.json': string;
  'components/': {
    [key: string]: string;
  };
}

export const generateHTMLZip = async (selectedComponents: ComponentSnippet[]) => {
  try {
    const zip = new JSZip();
    
    // Create basic HTML structure with Tailwind CDN and custom styles
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: 'rgb(37, 99, 235)',
            secondary: 'rgb(107, 114, 128)',
          }
        }
      }
    }
  </script>
  <style type="text/tailwindcss">
    @layer components {
      .btn-primary {
        @apply bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors;
      }
      .btn-secondary {
        @apply bg-secondary text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors;
      }
    }
  </style>
</head>
<body class="min-h-screen bg-white dark:bg-gray-900">
`;

    // Add components to HTML
    selectedComponents.forEach((component) => {
      htmlContent += component.code.html;
    });

    // Close HTML structure
    htmlContent += `
  <script src="script.js"></script>
</body>
</html>`;

    // Add basic CSS file with custom styles
    const cssContent = `/* Custom styles */
:root {
  --primary: rgb(37, 99, 235);
  --secondary: rgb(107, 114, 128);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  body {
    background-color: rgb(17, 24, 39);
    color: white;
  }
}

/* Animations */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Component-specific styles */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
`;

    // Create a basic JavaScript file with utilities
    const jsContent = `// Utility functions
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('[data-mobile-menu]');
  const mobileMenu = document.querySelector('[data-mobile-menu-items]');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Handle dropdowns
  const dropdownButtons = document.querySelectorAll('[data-dropdown]');
  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const dropdown = button.nextElementSibling;
      if (dropdown) {
        dropdown.classList.toggle('hidden');
      }
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      document.querySelectorAll('[data-dropdown-menu]').forEach(menu => {
        menu.classList.add('hidden');
      });
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handler
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    // Add your form submission logic here
  });
});
`;

    // Add files to the ZIP
    zip.file('index.html', htmlContent);
    zip.file('styles.css', cssContent);
    zip.file('script.js', jsContent);
    
    // Add a comprehensive README
    zip.file('README.md', `# Your Generated Website

This website was created using the Component Builder tool.

## Project Structure
- \`index.html\` - The main HTML file containing your website structure
- \`styles.css\` - Custom CSS styles and utilities
- \`script.js\` - JavaScript functionality and interactions

## Features
- Responsive design with Tailwind CSS
- Dark mode support
- Mobile menu functionality
- Smooth scroll behavior
- Form handling
- Dropdown menus
- Custom animations

## Getting Started
1. Unzip all files into a directory
2. Open \`index.html\` in your browser
3. For development, you can use any local server:
   - Python: \`python -m http.server 8000\`
   - Node.js: \`npx serve\`
   - PHP: \`php -S localhost:8000\`

## Customization
- Edit \`styles.css\` to modify custom styles
- Update \`script.js\` to add or modify functionality
- Modify Tailwind configuration in the \`<head>\` section of \`index.html\`

## Browser Support
This website uses modern CSS and JavaScript features. It works best in:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Development
To work on this project:
1. Install a code editor (VS Code recommended)
2. Use Live Server extension for hot reloading
3. Consider using Prettier for code formatting

## Production
Before deploying:
1. Minify CSS and JavaScript files
2. Optimize images
3. Test across different devices and browsers
4. Validate HTML at validator.w3.org

## Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
`);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'your-website.zip');
    
    return true;
  } catch (error) {
    console.error('Error generating HTML ZIP:', error);
    return false;
  }
};

export const generateNextJSZip = async (selectedComponents: ComponentSnippet[]) => {
  try {
    const zip = new JSZip();
    
    // Create component folder
    const componentsFolder = zip.folder('components');
    
    // Add each component as a separate file
    selectedComponents.forEach((component) => {
      const fileName = `${component.category.charAt(0).toUpperCase() + component.category.slice(1)}.tsx`;
      componentsFolder?.file(fileName, component.code.nextjs);
    });
    
    // Create main page that imports and uses all components
    let pageContent = `"use client";

import React from 'react';
`;

    // Import statements for components
    selectedComponents.forEach((component) => {
      const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
      pageContent += `import ${componentName} from '@/components/${componentName}';\n`;
    });

    pageContent += `
export default function Home() {
  return (
    <main className="min-h-screen">
${selectedComponents.map((component) => {
  const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
  return `      <${componentName} />`;
}).join('\n')}
    </main>
  );
}`;

    // Layout file
    const layoutContent = `import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'Created with Component Builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

    // Global CSS
    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

    // Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

    // Package.json
    const packageJson = `{
  "name": "your-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.3",
    "next-themes": "^0.2.1",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}`;

    // Add files to the ZIP
    const appFolder = zip.folder('app');
    appFolder?.file('page.tsx', pageContent);
    appFolder?.file('layout.tsx', layoutContent);
    appFolder?.file('globals.css', globalCss);
    
    zip.file('tailwind.config.js', tailwindConfig);
    zip.file('package.json', packageJson);
    zip.file('postcss.config.js', `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);
    
    // Add tsconfig.json
    zip.file('tsconfig.json', `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`);

    // Add next.config.js
    zip.file('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig`);
    
    // Add README
    zip.file('README.md', `# Your Next.js Website

This website was created using the Component Builder tool.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- \`/app\` - Contains the main application pages and layouts
- \`/components\` - Contains all the reusable components
- \`tailwind.config.js\` - Tailwind CSS configuration
- \`globals.css\` - Global styles and Tailwind imports

## Features

- Next.js 14 with App Router
- TypeScript support
- Tailwind CSS for styling
- Dark mode support
- Responsive design
- Component-based architecture
- ESLint configuration
- Automatic type checking

## Customization

1. Update \`app/layout.tsx\` to modify the main layout
2. Edit components in the \`components\` directory
3. Modify styles in \`globals.css\`
4. Update Tailwind configuration in \`tailwind.config.js\`

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
`);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'nextjs-website.zip');
    
    return true;
  } catch (error) {
    console.error('Error generating Next.js ZIP:', error);
    return false;
  }
};

export const generateViteReactZip = async (selectedComponents: ComponentSnippet[]) => {
  try {
    const zip = new JSZip();
    
    // Create src and components folders
    const srcFolder = zip.folder('src');
    const componentsFolder = srcFolder?.folder('components');
    
    // Add each component as a separate file
    selectedComponents.forEach((component) => {
      const fileName = `${component.category.charAt(0).toUpperCase() + component.category.slice(1)}.tsx`;
      const componentCode = component.code.nextjs.replace('"use client";', '');
      componentsFolder?.file(fileName, componentCode);
    });
    
    // Create main App component
    let appContent = `import React from 'react';\n`;
    
    // Import components
    selectedComponents.forEach((component) => {
      const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
      appContent += `import ${componentName} from './components/${componentName}';\n`;
    });

    appContent += `
function App() {
  return (
    <main className="min-h-screen">
${selectedComponents.map((component) => {
  const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
  return `      <${componentName} />`;
}).join('\n')}
    </main>
  );
}

export default App;`;

    // Create main.tsx
    const mainContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

    // Create index.css
    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
}`;

    // Add files to the ZIP
    srcFolder?.file('App.tsx', appContent);
    srcFolder?.file('main.tsx', mainContent);
    srcFolder?.file('index.css', indexCss);
    
    // Add configuration files
    zip.file('package.json', `{
  "name": "your-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}`);

    zip.file('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`);

    zip.file('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

    zip.file('postcss.config.js', `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);

    zip.file('tsconfig.json', `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`);

    zip.file('tsconfig.node.json', `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`);

    zip.file('.eslintrc.cjs', `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}`);

    zip.file('index.html', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Website</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

    // Add README
    zip.file('README.md', `# Your Vite React Website

This website was created using the Component Builder tool with Vite and React.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Project Structure

- \`/src\` - Contains the main application code
  - \`/components\` - Reusable components
  - \`App.tsx\` - Main application component
  - \`main.tsx\` - Application entry point
  - \`index.css\` - Global styles
- \`vite.config.ts\` - Vite configuration
- \`tailwind.config.js\` - Tailwind CSS configuration

## Features

- Vite for fast development and building
- React with TypeScript
- Tailwind CSS for styling
- ESLint configuration
- Hot Module Replacement
- TypeScript support
- Optimized production builds

## Building for Production

To create a production build:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
# or
yarn preview
\`\`\`

## Deployment

You can deploy the \`dist\` folder to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Learn More

To learn more about the technologies used:

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
`);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'vite-react-website.zip');
    
    return true;
  } catch (error) {
    console.error('Error generating Vite React ZIP:', error);
    return false;
  }
};

export const generateAstroZip = async (selectedComponents: ComponentSnippet[]) => {
  try {
    const zip = new JSZip();
    
    // Create src and components folders
    const srcFolder = zip.folder('src');
    const componentsFolder = srcFolder?.folder('components');
    const layoutsFolder = srcFolder?.folder('layouts');
    
    // Add each component as a separate file
    selectedComponents.forEach((component) => {
      const fileName = `${component.category.charAt(0).toUpperCase() + component.category.slice(1)}.astro`;
      const componentCode = component.code.html
        .replace(/class=/g, 'class:list=')
        .replace(/onclick=/g, '@click=');
      componentsFolder?.file(fileName, componentCode);
    });
    
    // Create main layout
    layoutsFolder?.file('Layout.astro', `---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Built with Astro and Component Builder' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 255, 255, 255;
    --background-end-rgb: 255, 255, 255;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground-rgb: 255, 255, 255;
      --background-start-rgb: 0, 0, 0;
      --background-end-rgb: 0, 0, 0;
    }
  }

  body {
    color: rgb(var(--foreground-rgb));
    background: rgb(var(--background-start-rgb));
  }
</style>`);

    // Create index page
    srcFolder?.file('pages/index.astro', `---
import Layout from '../layouts/Layout.astro';
${selectedComponents.map((component) => {
  const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
  return `import ${componentName} from '../components/${componentName}.astro';`;
}).join('\n')}
---

<Layout title="Your Website">
  <main class="min-h-screen">
    ${selectedComponents.map((component) => {
      const componentName = component.category.charAt(0).toUpperCase() + component.category.slice(1);
      return `    <${componentName} />`;
    }).join('\n')}
  </main>
</Layout>`);

    // Add configuration files
    zip.file('package.json', `{
  "name": "your-website",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/tailwind": "^5.0.3",
    "astro": "^4.0.3",
    "tailwindcss": "^3.3.6"
  }
}`);

    zip.file('astro.config.mjs', `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
});`);

    zip.file('tailwind.config.mjs', `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

    zip.file('tsconfig.json', `{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}`);

    // Add README
    zip.file('README.md', `# Your Astro Website

This website was created using the Component Builder tool with Astro.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Project Structure

- \`/src\`
  - \`/components\` - Reusable Astro components
  - \`/layouts\` - Layout components
  - \`/pages\` - Application pages
- \`astro.config.mjs\` - Astro configuration
- \`tailwind.config.mjs\` - Tailwind CSS configuration

## Features

- Astro for static site generation
- Zero JavaScript by default
- Tailwind CSS for styling
- TypeScript support
- Optimized production builds
- Component-based architecture

## Building for Production

To create a production build:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
# or
yarn preview
\`\`\`

## Deployment

You can deploy this site to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3

## Learn More

To learn more about the technologies used:

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
`);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'astro-website.zip');
    
    return true;
  } catch (error) {
    console.error('Error generating Astro ZIP:', error);
    return false;
  }
};