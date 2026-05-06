import React from 'react'
import { footerStyles } from '../assets/dummyStyles';
import logo from '../assets/MediTrackL.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Stethoscope, Activity, Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Appointments", href: "/appointments" },
];

const services = [
  { name: "Blood Pressure Check", href: "/services" },
  { name: "Blood Sugar Test", href: "/services" },
  { name: "Full Blood Count", href: "/services" },
  { name: "X-Ray Scan", href: "/services" },
  { name: "ECG Test", href: "/services" },
];

const socialLinks = [
  {
    Icon: FaFacebook,
    color: footerStyles.facebookColor,
    name: "Facebook",
    href: "...",
  },
  {
    Icon: FaTwitter,
    color: footerStyles.twitterColor,
    name: "Twitter",
    href: "...",
  },
  {
    Icon: FaInstagram,
    color: footerStyles.instagramColor,
    name: "Instagram",
    href: "...",
  },
  {
    Icon: FaLinkedin,
    color: footerStyles.linkedinColor,
    name: "LinkedIn",
    href: "...",
  },
  {
    Icon: FaYoutube,
    color: footerStyles.youtubeColor,
    name: "YouTube",
    href: "...",
  },
];

  return (
    <footer className={footerStyles.footerContainer}>
    <div className={footerStyles.floatingIcon1}>
    <Stethoscope className={footerStyles.stethoscopeIcon} />
    </div>
    <div className={footerStyles.floatingIcon2} style={{animationDelay: '3s'}}>
     <Activity className={footerStyles.activityIcon} />
    </div>
    <div className={footerStyles.mainContent}>
    <div className={footerStyles.gridContainer}>
      <div className={footerStyles.companySection}>
    <div className={footerStyles.logoContainer}>
    <div className={footerStyles.logoWrapper}>
    <div className={footerStyles.logoImageContainer}>
      <img src={logo} alt="logo" className={footerStyles.logoImage}/>
    </div>
    </div>

    <div>
      <h2 className={footerStyles.companyName}>MediTrack</h2>
      <p className={footerStyles.companyTagline}>
        Your Health, Our Priority
      </p>
    </div>
    </div>
    <p className={footerStyles.companyDescription}>
      Your one-stop solution for all your healthcare needs. We provide a range of services to help you take control of your health and wellness.
    </p>
    <div className={footerStyles.contactContainer}>
    <div className={footerStyles.contactItem}>
    <div className={footerStyles.contactIconWrapper}>
      <Phone className={footerStyles.contactIcon} />
    </div>
    <span className={footerStyles.contactText}>+91-9817208240</span>
    </div>

    <div className={footerStyles.contactItem}>
    <div className={footerStyles.contactIconWrapper}>
      <Mail className={footerStyles.contactIcon} />
    </div>
    <span className={footerStyles.contactText}>mediTrackSolution@gmail.com</span>
    </div>

    <div className={footerStyles.contactItem}>
    <div className={footerStyles.contactIconWrapper}>
      <MapPin className={footerStyles.contactIcon} />
    </div>
    <span className={footerStyles.contactText}>Dehradun, India</span>
    </div>
    </div>
    </div>
    {/* Quick Links */}
    <div className={footerStyles.linksSection}>
      <h3 className={footerStyles.sectionTitle}>Quick Links</h3>
      <ul className={footerStyles.linkList}>
        {quickLinks.map((link, index) => (
        <li key={link.name} className={footerStyles.linkItem}>
          <a href={link.href} className={footerStyles.quickLink}
          style={{
            animationDelay: `${index * 60}ms`,
          }}>
            <div className={footerStyles.quickLinkIconWrapper}>
           <ArrowRight className={footerStyles.quickLinkIcon} />
            </div>
            <span>{link.name}</span>
          </a>
          </li>
        ))}
      </ul>
    </div>

    <div className={footerStyles.linksSection}>
      <h3 className={footerStyles.sectionTitle}>Our Services</h3>
      <ul className={footerStyles.linkList}>
        {services.map((service, index) => (
        <li key={service.name}>
          <a href={service.href} className={footerStyles.serviceLink}>
            <div className={footerStyles.serviceIcon}></div>
            <span>{service.name}</span>
            </a>
        </li>
        ))}
      </ul>
    </div>

    {/* Newsletter & Social */}
<div className={footerStyles.newsletterSection}>
  <h3 className={footerStyles.newsletterTitle}>Stay Connected</h3>
  <p className={footerStyles.newsletterDescription}>
    Subscribe for health tips, medical updates, and wellness insights delivered
    to your inbox.
  </p>

  {/* Newsletter form */}
  <div className={footerStyles.newsletterForm}>
    <div className={footerStyles.mobileNewsletterContainer}>
      <input
        type="email"
        placeholder="Enter your email"
        className={footerStyles.emailInput}
      />
      <button className={footerStyles.mobileSubscribeButton}>
        <Send className={footerStyles.mobileButtonIcon} />
        Subscribe
      </button>
    </div>

    {/* Desktop newsletter */}
    <div className={footerStyles.desktopNewsletterContainer}>
      <input
        type="email"
        placeholder="Enter your email"
        className={footerStyles.desktopEmailInput}
      />
      <button className={footerStyles.desktopSubscribeButton}>
        <Send className={footerStyles.desktopButtonIcon} />
        <span className={footerStyles.desktopButtonText}>Subscribe</span>
      </button>
    </div>

    {/* Social icons */}
    <div className={footerStyles.socialContainer}>
      {socialLinks.map(({ Icon, color, name, href }, index) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={footerStyles.socialLink}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <div className={footerStyles.socialIconBackground} />
          <Icon className={`${footerStyles.socialIcon} ${color}`} />
        </a>
      ))}
    </div>
  </div>
</div>
    </div>
    <div className={footerStyles.bottomSection}>
     <div className={footerStyles.copyright}>
      <span>&copy; {currentYear} MediTrack Solution</span>
      </div> 
      <div className={footerStyles.designerText}>
        <span>Designed by</span>
       <a href="https://www.hexagondigitalservices.com/"
       targets="_blank" className={footerStyles.designerLink}>
        MediTrack Solution
       </a>
      </div>
    </div>
    </div>

    <style>{footerStyles.animationStyles}</style>
    </footer>
  );
};

export default Footer;

