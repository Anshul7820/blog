import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Github, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Features', to: '/features' },
      { name: 'Pricing', to: '/pricing' },
      { name: 'Affiliate Program', to: '/affiliate' },
      { name: 'Press Kit', to: '/press' },
      { name: 'Careers', to: '/careers' },
      { name: 'Blog', to: '/blog' }
    ],
    support: [
      { name: 'Account', to: '/account' },
      { name: 'Help Center', to: '/help' },
      { name: 'Contact Us', to: '/contact' },
      { name: 'Customer Support', to: '/support' },
      { name: 'Documentation', to: '/docs' },
      { name: 'Community', to: '/community' }
    ],
    legal: [
      { name: 'Terms & Conditions', to: '/terms' },
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Licensing', to: '/licensing' },
      { name: 'Cookie Policy', to: '/cookies' },
      { name: 'GDPR', to: '/gdpr' },
      { name: 'Security', to: '/security' }
    ],
    product: [
      { name: 'Overview', to: '/product' },
      { name: 'Features', to: '/features' },
      { name: 'Solutions', to: '/solutions' },
      { name: 'Tutorials', to: '/tutorials' },
      { name: 'Releases', to: '/releases' }
    ]
  }

  const socialLinks = [
    { icon: <Facebook size={20} />, to: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, to: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={20} />, to: 'https://instagram.com', label: 'Instagram' },
    { icon: <Github size={20} />, to: 'https://github.com', label: 'GitHub' },
    { icon: <Mail size={20} />, to: 'mailto:contact@echoify.com', label: 'Email' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-[#0A2647] to-[#144272] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Logo width="120px" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevUI
              </span>
            </div>

            <p className="text-gray-300 max-w-md text-lg leading-relaxed">
              Empowering creators to share their voice with the world.
              Join our community of writers, thinkers, and innovators.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-md">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                No spam, just the latest updates and resources.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-bold text-lg mb-4 capitalize tracking-wide">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-gray-300 hover:text-white hover:underline transition-all duration-200 flex items-center group"
                      >
                        <span className="w-0 h-0.5 bg-blue-500 group-hover:w-3 mr-2 transition-all duration-200"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              &copy; {currentYear} DevUI. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Made with <Heart size={14} className="inline text-red-400" /> by DevUI
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.to}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 hover:text-blue-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link to="/sitemap" className="hover:text-white transition">Sitemap</Link>
            <span className="text-gray-600">•</span>
            <Link to="/accessibility" className="hover:text-white transition">Accessibility</Link>
            <span className="text-gray-600">•</span>
            <Link to="/status" className="hover:text-white transition">Status</Link>
            <span className="text-gray-600">•</span>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </footer>
  )
}

export default Footer