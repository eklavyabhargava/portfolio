"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  ArrowUp,
  Send,
  CheckCircle,
} from "lucide-react";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Initialize theme based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial state based on system preference
    setDarkMode(mediaQuery.matches);

    // Listen for changes in system theme
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://portfolio-backend-teur.onrender.com/api/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: formData.email,
            name: formData.name,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setIsSubmitting(false);
        setIsFormVisible(false);

        // After form slides out, show success message
        setTimeout(() => {
          setIsSubmitted(true);
        }, 300);

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setTimeout(() => {
            setIsFormVisible(true);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
          }, 300);
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);

      // Show error state (you can customize this)
      alert(
        "Failed to send message. Please try again or contact me directly via email."
      );
    }
  };

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Mastork AI",
      period: "Feb 2025 - Present",
      location: "Virtual",
      current: true,
    },
    {
      title: "Senior Backend Developer",
      company: "KnowMySlots",
      period: "Dec 2024 - Feb 2025",
      location: "Virtual",
    },
    {
      title: "Software Development Engineering Intern",
      company: "Orufy Technologies Private Limited",
      period: "Aug 2023 - Oct 2024",
      location: "Jaipur",
      details: [
        "Enhanced website performance by moving static data to CMS",
        "Used Next.js and TypeScript for better code quality and structure",
        "Developed both front-end and backend of the website",
      ],
    },
  ];

  const projects = [
    {
      title: "Reddit Clone Web App",
      period: "Nov 2024",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Redux",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Firebase Storage",
      ],
      link: "https://reddit-webapp.web.app/",
      description:
        "A full-stack Reddit clone with user authentication, post creation, voting, and real-time updates.",
    },
    {
      title: "Twitter Clone Web App",
      period: "Apr 2023 - May 2023",
      tech: ["MERN Stack", "MongoDB Atlas", "Firebase Storage"],
      description:
        "Social media platform with tweet posting, user following, likes, and retweets functionality.",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Next.js", level: 80 },
    { name: "Express.js", level: 85 },
    { name: "MongoDB", level: 75 },
    { name: "MySQL", level: 70 },
    { name: "Tailwind CSS", level: 85 },
    { name: "REST API", level: 80 },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          darkMode ? "bg-gray-900/95" : "bg-white/95"
        } backdrop-blur-sm border-b ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Eklavya Bhargava
            </div>

            <div className="hidden md:flex space-x-8">
              {[
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Education",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-600 font-medium"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              title="Toggle theme (currently synced with system)"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="mb-8">
              <div
                className={`w-32 h-32 mx-auto rounded-full ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-400 to-purple-500"
                } flex items-center justify-center text-4xl font-bold text-white mb-6`}
              >
                EB
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Eklavya Bhargava
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
              Full Stack Developer & Software Engineer
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="mailto:eklavyabhargawa@gmail.com"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-medium hover:scale-105`}
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? "border-2 border-gray-600 hover:bg-gray-800"
                    : "border-2 border-gray-300 hover:bg-gray-50"
                } font-medium hover:scale-105`}
              >
                <Code className="w-4 h-4" />
                View Projects
              </button>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="tel:+918825255902"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
              <a
                href="mailto:eklavyabhargawa@gmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/eklavyabhargava"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>

            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800/50" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with over 2 years of
                experience building modern web applications. Currently working
                at Mastork AI, I specialize in creating scalable, user-friendly
                solutions using cutting-edge technologies.
              </p>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey in software development has taken me through various
                roles, from intern to senior developer, giving me a
                comprehensive understanding of the full development lifecycle.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Buxar, India</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Experience
                  </span>
                  <span className="font-medium">2+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Projects Completed
                  </span>
                  <span className="font-medium">10+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Technologies
                  </span>
                  <span className="font-medium">10+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Hobbies
                  </span>
                  <span className="font-medium">Photography, Traveling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      {exp.title}
                      {exp.current && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-blue-600 font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {exp.location}
                    </p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium mt-2 md:mt-0">
                    {exp.period}
                  </div>
                </div>

                {exp.details && (
                  <ul className="space-y-2">
                    {exp.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800/50" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {project.period}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {skill.level}%
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800/50" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Education & Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-blue-600/20" : "bg-blue-100"
                  }`}
                >
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className="text-blue-600 font-medium">
                    Indira Gandhi National Open University (IGNOU)
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    2021 - 2024
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-purple-600/20" : "bg-purple-100"
                  }`}
                >
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Full Stack Development
                  </h3>
                  <p className="text-purple-600 font-medium">
                    Internshala Trainings
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Oct 2022 - Jun 2023
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    Placement Guarantee Course
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg md:col-span-2`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-green-600/20" : "bg-green-100"
                  }`}
                >
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    CS50x: Introduction To Computer Science
                  </h3>
                  <p className="text-green-600 font-medium">HarvardX</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Jul 2021 - Dec 2021
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    Gained proficiency in C, Python, Flask, JavaScript, and Data
                    Structures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting
              projects, or just having a chat about technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>

              <a
                href="mailto:eklavyabhargawa@gmail.com"
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-blue-600/20" : "bg-blue-100"
                  }`}
                >
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    eklavyabhargawa@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+918825255902"
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-green-600/20" : "bg-green-100"
                  }`}
                >
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    +91 8825255902
                  </p>
                </div>
              </a>

              <div
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-purple-600/20" : "bg-purple-100"
                  }`}
                >
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Buxar, India
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg relative overflow-hidden`}
            >
              <div className="relative md:h-[500px] h-[550px]">
                {/* Contact Form */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isFormVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-full"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-6">Send Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-lg"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Success Message */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                    isSubmitted
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-green-600 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-600 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Thank you for reaching out! I'll get back to you as soon
                        as possible.
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span>Usually within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${
          darkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 Eklavya Bhargava. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white shadow-lg transition-all duration-300 hover:scale-110 z-50`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Portfolio;
