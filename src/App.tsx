import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Environmental Engineer & GEE Developer";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 text-[#1A5F7A] dark:text-[#F2C94C] font-bold">
              EcoEngineer
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#portfolio">Portfolio</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#contact">Contact</NavLink>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#portfolio">Portfolio</MobileNavLink>
              <MobileNavLink href="#experience">Experience</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-[#F2C94C]"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">John Doe</h1>
          <p className="text-xl md:text-2xl mb-8 h-8">{typedText}</p>
          <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A5F7A] dark:text-[#F2C94C]">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                I'm a passionate Environmental Engineer with expertise in Google Earth Engine programming.
                My work focuses on leveraging technology to address environmental challenges and promote
                sustainable development.
              </p>
              <div className="space-y-4">
                <SkillBar skill="Environmental Analysis" percentage={90} />
                <SkillBar skill="GEE Programming" percentage={85} />
                <SkillBar skill="Remote Sensing" percentage={80} />
                <SkillBar skill="Data Visualization" percentage={75} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Water Quality', 'Climate Change', 'Sustainability', 'GIS'].map((expertise) => (
                <div key={expertise} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <h3 className="font-semibold text-[#1A5F7A] dark:text-[#F2C94C]">{expertise}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A5F7A] dark:text-[#F2C94C]">
            Get in Touch
          </h2>
          <div className="flex justify-center space-x-6">
            <SocialLink href="https://linkedin.com" icon={<Linkedin />} />
            <SocialLink href="https://github.com" icon={<Github />} />
            <SocialLink href="mailto:contact@example.com" icon={<Mail />} />
          </div>
        </div>
      </section>
    </div>
  );
}

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-[#1A5F7A] dark:text-gray-300 dark:hover:text-[#F2C94C] px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-[#1A5F7A] dark:text-gray-300 dark:hover:text-[#F2C94C] block px-3 py-2 rounded-md text-base font-medium"
  >
    {children}
  </a>
);

const SkillBar = ({ skill, percentage }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
      <span className="text-gray-600 dark:text-gray-400">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-[#1A5F7A] dark:bg-[#F2C94C] h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#1A5F7A] dark:text-[#F2C94C] transition-colors"
  >
    {icon}
  </a>
);

export default App;