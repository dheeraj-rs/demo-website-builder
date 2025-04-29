export type ComponentCategory = 'navbar' | 'hero' | 'about' | 'content' | 'contact' | 'footer';

export interface ComponentSnippet {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  thumbnail: string;
  code: {
    nextjs: string;
    html: string;
  };
}

export const componentSnippets: ComponentSnippet[] = [
  // Navbar Components
  {
    id: 'navbar-simple',
    title: 'Simple Navbar',
    description: 'A clean, minimal navbar with logo and navigation links',
    category: 'navbar',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">YourBrand</span>
        </Link>
        <div className="flex items-center lg:order-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-3">Get Started</button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={\`\${isOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1\`}>
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li><Link href="/" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Home</Link></li>
            <li><Link href="/about" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">About</Link></li>
            <li><Link href="/services" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Services</Link></li>
            <li><Link href="/contact" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}`,
      html: `<nav class="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
  <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    <a href="/" class="flex items-center">
      <span class="self-center text-xl font-semibold whitespace-nowrap">YourBrand</span>
    </a>
    <div class="flex items-center lg:order-2">
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-3">Get Started</button>
      <button 
        id="menu-toggle"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu">
      <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li><a href="/" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Home</a></li>
        <li><a href="/about" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">About</a></li>
        <li><a href="/services" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Services</a></li>
        <li><a href="/contact" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
<script>
  document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  });
</script>`
    }
  },
  {
    id: 'navbar-dropdown',
    title: 'Navbar with Dropdown',
    description: 'A responsive navbar with dropdown menus for additional navigation options',
    category: 'navbar',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function NavbarWithDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">YourBrand</span>
        </Link>
        <div className="flex items-center lg:order-2">
          <Link href="/login" className="text-gray-800 hover:text-blue-600 mr-4">Login</Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign Up</button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={\`\${isOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1\`}>
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li><Link href="/" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Home</Link></li>
            <li><Link href="/about" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">About</Link></li>
            <li>
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0"
                >
                  Services <ChevronDown size={16} className="ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 w-44 bg-white rounded-lg shadow-lg mt-2">
                    <ul className="py-2 text-sm text-gray-700">
                      <li><Link href="/services/web" className="block px-4 py-2 hover:bg-gray-100">Web Development</Link></li>
                      <li><Link href="/services/mobile" className="block px-4 py-2 hover:bg-gray-100">Mobile Apps</Link></li>
                      <li><Link href="/services/design" className="block px-4 py-2 hover:bg-gray-100">UI/UX Design</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li><Link href="/contact" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}`,
      html: `<nav class="bg-white shadow-md px-4 py-2.5 fixed w-full top-0 left-0 z-50">
  <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    <a href="/" class="flex items-center">
      <span class="self-center text-xl font-semibold whitespace-nowrap">YourBrand</span>
    </a>
    <div class="flex items-center lg:order-2">
      <a href="/login" class="text-gray-800 hover:text-blue-600 mr-4">Login</a>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign Up</button>
      <button 
        id="menu-toggle"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu">
      <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li><a href="/" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Home</a></li>
        <li><a href="/about" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">About</a></li>
        <li>
          <div class="relative">
            <button 
              id="dropdown-toggle"
              class="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0"
            >
              Services 
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div id="dropdown-menu" class="hidden absolute z-10 w-44 bg-white rounded-lg shadow-lg mt-2">
              <ul class="py-2 text-sm text-gray-700">
                <li><a href="/services/web" class="block px-4 py-2 hover:bg-gray-100">Web Development</a></li>
                <li><a href="/services/mobile" class="block px-4 py-2 hover:bg-gray-100">Mobile Apps</a></li>
                <li><a href="/services/design" class="block px-4 py-2 hover:bg-gray-100">UI/UX Design</a></li>
              </ul>
            </div>
          </div>
        </li>
        <li><a href="/contact" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
<script>
  document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  });
  
  document.getElementById('dropdown-toggle').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.toggle('hidden');
  });
</script>`
    }
  },

  // Hero Components
  {
    id: 'hero-simple',
    title: 'Simple Hero',
    description: 'A clean hero section with heading, subheading, and call-to-action',
    category: 'hero',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `export default function Hero() {
  return (
    <div className="relative pt-24 pb-16 flex content-center items-center justify-center min-h-screen">
      <div className="absolute top-0 w-full h-full bg-center bg-cover" 
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}>
        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div>
              <h1 className="text-white font-semibold text-5xl">
                Discover Our Amazing Platform
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                We provide innovative solutions that help businesses grow and succeed in today's digital landscape.
              </p>
              <div className="mt-8">
                <button
                  className="bg-blue-600 text-white active:bg-blue-700 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Get Started
                </button>
                <button
                  className="bg-transparent text-white border border-white font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      html: `<div class="relative pt-24 pb-16 flex content-center items-center justify-center min-h-screen">
  <div class="absolute top-0 w-full h-full bg-center bg-cover" 
    style="background-image: url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')">
    <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
  </div>
  <div class="container relative mx-auto">
    <div class="items-center flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
        <div>
          <h1 class="text-white font-semibold text-5xl">
            Discover Our Amazing Platform
          </h1>
          <p class="mt-4 text-lg text-gray-300">
            We provide innovative solutions that help businesses grow and succeed in today's digital landscape.
          </p>
          <div class="mt-8">
            <button
              class="bg-blue-600 text-white active:bg-blue-700 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Get Started
            </button>
            <button
              class="bg-transparent text-white border border-white font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
    }
  },
  {
    id: 'hero-split',
    title: 'Split Hero',
    description: 'A hero section split into two columns for text and image',
    category: 'hero',
    thumbnail: 'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `export default function SplitHero() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:pr-16">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
              Transform Your Business with Our Solutions
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              We help companies of all sizes to establish their presence online and reach their full potential with our cutting-edge services.
            </p>
            <div className="flex flex-col sm:flex-row">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mb-4 sm:mb-0 sm:mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Get Started
              </button>
              <button className="bg-transparent hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 border border-blue-600 rounded-lg transition duration-300 ease-in-out">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Hero Image" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
      html: `<div class="bg-white py-20">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 lg:pr-16">
        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
          Transform Your Business with Our Solutions
        </h1>
        <p class="text-gray-600 mb-8 text-lg">
          We help companies of all sizes to establish their presence online and reach their full potential with our cutting-edge services.
        </p>
        <div class="flex flex-col sm:flex-row">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mb-4 sm:mb-0 sm:mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Get Started
          </button>
          <button class="bg-transparent hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 border border-blue-600 rounded-lg transition duration-300 ease-in-out">
            Watch Demo
          </button>
        </div>
      </div>
      <div class="md:w-1/2 mt-10 md:mt-0">
        <img src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Hero Image" class="rounded-lg shadow-xl" />
      </div>
    </div>
  </div>
</div>`
    }
  },

  // About Components
  {
    id: 'about-simple',
    title: 'Simple About',
    description: 'A clean about section with heading, text, and image',
    category: 'about',
    thumbnail: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `export default function About() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Our Company</h2>
          <p className="mt-4 text-lg text-gray-600">
            Founded in 2010, our company has been at the forefront of innovation and excellence.
          </p>
        </div>
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Our team" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              Our mission is to deliver exceptional value to our clients through innovative solutions and outstanding service. We believe in building long-lasting relationships based on trust, integrity, and mutual success.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Excellence in everything we do</li>
              <li>Customer-centric approach</li>
              <li>Innovation and continuous improvement</li>
              <li>Integrity and transparency</li>
              <li>Teamwork and collaboration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      html: `<div class="py-16 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">About Our Company</h2>
      <p class="mt-4 text-lg text-gray-600">
        Founded in 2010, our company has been at the forefront of innovation and excellence.
      </p>
    </div>
    <div class="mt-12 flex flex-col md:flex-row gap-8 items-center">
      <div class="md:w-1/2">
        <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Our team" class="rounded-lg shadow-lg w-full" />
      </div>
      <div class="md:w-1/2 mt-8 md:mt-0">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
        <p class="text-gray-600 mb-6">
          Our mission is to deliver exceptional value to our clients through innovative solutions and outstanding service. We believe in building long-lasting relationships based on trust, integrity, and mutual success.
        </p>
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Excellence in everything we do</li>
          <li>Customer-centric approach</li>
          <li>Innovation and continuous improvement</li>
          <li>Integrity and transparency</li>
          <li>Teamwork and collaboration</li>
        </ul>
      </div>
    </div>
  </div>
</div>`
    }
  },

  // Content Components
  {
    id: 'content-features',
    title: 'Features Grid',
    description: 'A grid layout showcasing features or services',
    category: 'content',
    thumbnail: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `import { Monitor, Smartphone, PaintBucket, Zap, Shield, Award } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      title: 'Web Development',
      description: 'We build responsive, user-friendly websites that deliver exceptional user experiences and drive results.'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: 'Mobile Apps',
      description: 'Our mobile applications are designed to provide seamless experiences across all devices and platforms.'
    },
    {
      icon: <PaintBucket className="h-8 w-8 text-blue-600" />,
      title: 'UI/UX Design',
      description: 'We create intuitive, engaging, and user-centered designs that elevate your digital presence.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Performance Optimization',
      description: 'We ensure your digital products are fast, efficient, and provide the best possible user experience.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Security Solutions',
      description: 'Our security measures protect your digital assets and user data from potential threats.'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'We implement rigorous testing procedures to ensure the highest quality in all our deliverables.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">
            We offer a comprehensive range of services to help your business thrive in the digital world.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center">{feature.title}</h3>
              <p className="mt-4 text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      html: `<div class="py-16 bg-white">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
      <p class="mt-4 text-lg text-gray-600">
        We offer a comprehensive range of services to help your business thrive in the digital world.
      </p>
    </div>
    
    <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <!-- Feature 1 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">Web Development</h3>
        <p class="mt-4 text-gray-600 text-center">We build responsive, user-friendly websites that deliver exceptional user experiences and drive results.</p>
      </div>
      
      <!-- Feature 2 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">Mobile Apps</h3>
        <p class="mt-4 text-gray-600 text-center">Our mobile applications are designed to provide seamless experiences across all devices and platforms.</p>
      </div>
      
      <!-- Feature 3 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">UI/UX Design</h3>
        <p class="mt-4 text-gray-600 text-center">We create intuitive, engaging, and user-centered designs that elevate your digital presence.</p>
      </div>
      
      <!-- Feature 4 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">Performance Optimization</h3>
        <p class="mt-4 text-gray-600 text-center">We ensure your digital products are fast, efficient, and provide the best possible user experience.</p>
      </div>
      
      <!-- Feature 5 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">Security Solutions</h3>
        <p class="mt-4 text-gray-600 text-center">Our security measures protect your digital assets and user data from potential threats.</p>
      </div>
      
      <!-- Feature 6 -->
      <div class="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
        <div class="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 text-center">Quality Assurance</h3>
        <p class="mt-4 text-gray-600 text-center">We implement rigorous testing procedures to ensure the highest quality in all our deliverables.</p>
      </div>
    </div>
  </div>
</div>`
    }
  },

  // Contact Components
  {
    id: 'contact-simple',
    title: 'Simple Contact Form',
    description: 'A clean contact form with basic fields',
    category: 'contact',
    thumbnail: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(formData);
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or want to work with us? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>
        
        <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-xl font-medium text-gray-900">Thank You!</h3>
              <p className="mt-2 text-gray-600">Your message has been sent successfully. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className={\`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out \${submitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}`,
      html: `<div class="py-16 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
      <p class="mt-4 text-lg text-gray-600">
        Have a question or want to work with us? Fill out the form below and we'll get back to you shortly.
      </p>
    </div>
    
    <div class="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <form id="contact-form">
        <div class="mb-6">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>
        
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div class="mb-6">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          id="submit-button"
          class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Send Message
        </button>
      </form>
      
      <div id="success-message" class="hidden text-center py-8">
        <div class="text-green-600 text-4xl mb-4">✓</div>
        <h3 class="text-xl font-medium text-gray-900">Thank You!</h3>
        <p class="mt-2 text-gray-600">Your message has been sent successfully. We'll be in touch soon.</p>
      </div>
    </div>
  </div>
</div>

<script>
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form and button
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    
    // Change button text
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('opacity-70', 'cursor-not-allowed');
    
    // Simulate form submission
    setTimeout(function() {
      form.classList.add('hidden');
      successMessage.classList.remove('hidden');
      
      // Reset form
      form.reset();
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
      
      // Reset success message after a few seconds
      setTimeout(function() {
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
      }, 5000);
    }, 1000);
  });
</script>`
    }
  },

  // Footer Components
  {
    id: 'footer-simple',
    title: 'Simple Footer',
    description: 'A clean footer with links and copyright information',
    category: 'footer',
    thumbnail: 'https://images.pexels.com/photos/7828006/pexels-photo-7828006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    code: {
      nextjs: `import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">YourBrand</h3>
            <p className="text-gray-400 max-w-xs">
              We provide innovative solutions that help businesses grow and succeed in today's digital landscape.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</Link></li>
                <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors duration-300">Team</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter to get updates about our services and offers.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none w-full"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}`,
      html: `<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="mb-8 md:mb-0">
        <h3 class="text-2xl font-bold mb-4">YourBrand</h3>
        <p class="text-gray-400 max-w-xs">
          We provide innovative solutions that help businesses grow and succeed in today's digital landscape.
        </p>
        <div class="flex space-x-4 mt-6">
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h4v12H4z" />
              <circle cx="4" cy="4" r="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </a>
        </div>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-lg font-semibold mb-4">Company</h4>
          <ul class="space-y-3">
            <li><a href="/about" class="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
            <li><a href="/services" class="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
            <li><a href="/team" class="text-gray-400 hover:text-white transition-colors duration-300">Team</a></li>
            <li><a href="/careers" class="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Support</h4>
          <ul class="space-y-3">
            <li><a href="/help" class="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
            <li><a href="/faq" class="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
            <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
            <li><a href="/terms" class="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
          </ul>
        </div>
        
        <div class="col-span-2 md:col-span-1">
          <h4 class="text-lg font-semibold mb-4">Subscribe</h4>
          <p class="text-gray-400 mb-4">Subscribe to our newsletter to get updates about our services and offers.</p>
          <form class="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              class="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none w-full"
            />
            <button 
              type="submit" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400 text-sm">
        © <script>document.write(new Date().getFullYear())</script> YourBrand. All rights reserved.
      </p>
      <div class="mt-4 md:mt-0">
        <ul class="flex space-x-6">
          <li><a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a></li>
          <li><a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a></li>
          <li><a href="/cookies" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>`
    }
  }
];

export const frameworks = [
  { id: 'nextjs', name: 'Next.js' },
  { id: 'html', name: 'HTML' }
];