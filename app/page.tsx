"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Types
interface Stage {
  id: string;
  num: string;
  title: string;
  desc: string;
  tag: string;
  renderIcon: () => React.JSX.Element;
}

interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialty: string;
  experience: string;
  location: string;
  initials: string;
  bgGradient: string;
}

interface Review {
  name: string;
  meta: string;
  stars: string;
  text: string;
}

// Data Sets
const CHENNAI_DOCTORS: Doctor[] = [
  {
    id: "dr-premalatha",
    name: "Dr. Premalatha S.",
    qualifications: "MD, DGO, FRCOG",
    specialty: "Senior Obstetrician & Gynaecologist",
    experience: "Senior Specialist",
    location: "Alwarpet",
    initials: "PS",
    bgGradient: "linear-gradient(135deg,#9b85cc,#6b55a0)"
  },
  {
    id: "dr-kavitha-r",
    name: "Dr. Kavitha R.",
    qualifications: "MD, DNB, FNB (MFM)",
    specialty: "Maternal-Fetal Medicine Specialist",
    experience: "Fetal Medicine Specialist",
    location: "Alwarpet",
    initials: "KR",
    bgGradient: "linear-gradient(135deg,#e8a0b8,#b8364d)"
  },
  {
    id: "dr-anand",
    name: "Dr. Anand Kumar",
    qualifications: "MD, DM (Neonatology)",
    specialty: "Senior Neonatologist",
    experience: "Neonatal Care Expert",
    location: "Alwarpet",
    initials: "AK",
    bgGradient: "linear-gradient(135deg,#5478a0,#3d5a7a)"
  },
  {
    id: "dr-lakshmi",
    name: "Dr. Lakshmi V.",
    qualifications: "MD, DNB, MRCOG",
    specialty: "Consultant Obstetrician",
    experience: "Maternity Consultant",
    location: "Alwarpet",
    initials: "LV",
    bgGradient: "linear-gradient(135deg,#e8a0b8,#b8364d)"
  },
  {
    id: "dr-rajesh",
    name: "Dr. Rajesh M.",
    qualifications: "MD, DA, PDCC (Pain)",
    specialty: "Anaesthesiologist & Pain Specialist",
    experience: "Pain Management Specialist",
    location: "Alwarpet",
    initials: "RM",
    bgGradient: "linear-gradient(135deg,#5478a0,#3d5a7a)"
  }
];

const PATIENT_REVIEWS: Review[] = [
  {
    name: "Priya R",
    meta: "New mother · Chennai",
    stars: "★★★★★",
    text: "The doctors explained each stage clearly and the hospital team made us feel prepared instead of overwhelmed."
  },
  {
    name: "Divya S",
    meta: "First pregnancy",
    stars: "★★★★★",
    text: "Very reassuring labor support, clean rooms, and clear communication with our family throughout the admission process."
  },
  {
    name: "Karthika M",
    meta: "Alwarpet",
    stars: "★★★★★",
    text: "We chose Motherhood because the maternity focus felt stronger than the other hospitals we visited, and it showed."
  },
  {
    name: "Anusha V",
    meta: "Twins delivery",
    stars: "★★★★★",
    text: "Good coordination between doctors, nursing, and newborn care. That continuity made a huge difference for us."
  },
  {
    name: "Meena T",
    meta: "High-risk pregnancy",
    stars: "★★★★★",
    text: "The high-risk team handled our case with so much care and professionalism. My baby and I are healthy and that is everything."
  },
  {
    name: "Shalini K",
    meta: "Mylapore · C-section",
    stars: "★★★★★",
    text: "From admission to discharge, every person in the team was kind and explained what was happening at each step."
  }
];

const MATERNITY_STAGES: Stage[] = [
  {
    id: "stage-1",
    num: "Stage 01",
    title: "Pre-Pregnancy Planning",
    desc: "Fertility counseling, health screening & nutrition guidance before conception begins.",
    tag: "🌿 Preparation",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg1)" />
        <path d="M20 38 Q18 28 24 23 Q32 17 40 23 Q46 28 44 38 Q42 46 32 50 Q22 46 20 38Z" fill="#f2d0e8" stroke="#c084b0" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="9" fill="#fff0f8" stroke="#d670a8" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="5.5" fill="#ffd6ee" stroke="#d670a8" strokeWidth="1" />
        <circle cx="32" cy="32" r="2.5" fill="#d670a8" />
        <path d="M28 22 Q28 19 30.5 19 Q32 19 32 20.5 Q32 19 33.5 19 Q36 19 36 22 Q36 25 32 28 Q28 25 28 22Z" fill="#e8609a" opacity="0.85" />
        <defs><radialGradient id="bg1" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fdf0fa" /><stop offset="100%" stopColor="#ede0f8" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-2",
    num: "Stage 02",
    title: "First Trimester",
    desc: "Early scans, blood tests, heartbeat monitoring & personalised care plans for weeks 1–12.",
    tag: "💖 Weeks 1–12",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg2)" />
        <ellipse cx="32" cy="34" rx="18" ry="20" fill="#eee0fa" stroke="#b89edc" strokeWidth="1.2" strokeDasharray="3 2" />
        <path d="M38 26 Q42 30 40 36 Q38 42 32 43 Q26 44 23 40 Q20 36 22 31 Q24 26 29 24 Q34 22 38 26Z" fill="#ffd6ee" stroke="#d080b8" strokeWidth="1.3" />
        <circle cx="38" cy="25" r="5.5" fill="#ffe8f4" stroke="#d080b8" strokeWidth="1.2" />
        <circle cx="37" cy="24" r="1.2" fill="#9b55a0" />
        <path d="M26 33 Q21 32 20 29" stroke="#d080b8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="33" cy="34" r="2" fill="#e8609a" opacity="0.8">
          <animate attributeName="r" values="2;3;2" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <defs><radialGradient id="bg2" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fdf0fa" /><stop offset="100%" stopColor="#e8d8f8" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-3",
    num: "Stage 03",
    title: "Second Trimester",
    desc: "Anomaly scans, fetal growth tracking, gestational diabetes screening & antenatal classes.",
    tag: "👶 Weeks 13–26",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg3)" />
        <ellipse cx="32" cy="34" rx="19" ry="21" fill="#ecddf8" stroke="#a878cc" strokeWidth="1" opacity="0.6" />
        <path d="M40 22 Q46 29 43 38 Q40 46 32 47 Q24 47 21 40 Q18 34 21 27 Q24 20 32 18 Q37 17 40 22Z" fill="#fce8f4" stroke="#c078b0" strokeWidth="1.4" />
        <circle cx="41" cy="21" r="7" fill="#ffe8f4" stroke="#c078b0" strokeWidth="1.3" />
        <ellipse cx="40" cy="20" rx="1.3" ry="1" fill="#7a4090" />
        <path d="M41 22 Q42 23 41.5 23.5" stroke="#c078b0" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M28 30 Q22 28 20 24" stroke="#c078b0" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="23.5" r="2" fill="#fce8f4" stroke="#c078b0" strokeWidth="1" />
        <path d="M28 40 Q26 46 30 48" stroke="#c078b0" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="31" cy="48.5" rx="2.5" ry="1.2" fill="#fce8f4" stroke="#c078b0" strokeWidth="1" />
        <defs><radialGradient id="bg3" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fef4ff" /><stop offset="100%" stopColor="#e0d0f5" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-4",
    num: "Stage 04",
    title: "Third Trimester",
    desc: "Birth planning, fetal monitoring, NST tests & delivery readiness with our senior OB team.",
    tag: "🤰 Weeks 27–40",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg4)" />
        <ellipse cx="32" cy="33" rx="20" ry="22" fill="#e8d8f8" stroke="#9878cc" strokeWidth="1.2" opacity="0.55" />
        <ellipse cx="32" cy="37" rx="10" ry="13" fill="#fde8f4" stroke="#bf70b0" strokeWidth="1.3" />
        <circle cx="32" cy="50" r="8" fill="#ffe4f0" stroke="#bf70b0" strokeWidth="1.3" />
        <ellipse cx="29.5" cy="50" rx="1.2" ry="1" fill="#7a3a88" />
        <ellipse cx="34.5" cy="50" rx="1.2" ry="1" fill="#7a3a88" />
        <path d="M30 53 Q32 54.5 34 53" stroke="#bf70b0" strokeWidth="1" strokeLinecap="round" />
        <path d="M22 34 Q18 33 19 29" stroke="#bf70b0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M42 34 Q46 33 45 29" stroke="#bf70b0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M24 30 Q22 22 28 18" stroke="#bf70b0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 30 Q42 22 36 18" stroke="#bf70b0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 49 Q42 50 40 52" stroke="#bf70b0" strokeWidth="1" strokeLinecap="round" fill="none" />
        <defs><radialGradient id="bg4" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fef2ff" /><stop offset="100%" stopColor="#ddd0f5" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-5",
    num: "Stage 05",
    title: "Labor & Delivery",
    desc: "Private labor room, 24/7 specialist support, pain management & expert delivery team on standby.",
    tag: "✨ Birth Day",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg5)" />
        <circle cx="32" cy="32" r="22" fill="rgba(255,220,240,0.4)" />
        <path d="M14 36 Q14 22 32 20 Q50 22 50 36 Q50 52 32 54 Q14 52 14 36Z" fill="#fde0f0" stroke="#d070b0" strokeWidth="1.2" />
        <circle cx="32" cy="26" r="10" fill="#ffe8f4" stroke="#d070b0" strokeWidth="1.3" />
        <path d="M27.5 25.5 Q29 24.5 30.5 25.5" stroke="#9060a0" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M33.5 25.5 Q35 24.5 36.5 25.5" stroke="#9060a0" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="32" cy="27.5" rx="1.2" ry="0.8" fill="#e090c0" opacity="0.7" />
        <path d="M29.5 30 Q32 32 34.5 30" stroke="#d060a0" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="18" cy="40" r="4" fill="#ffe8f4" stroke="#d070b0" strokeWidth="1.1" />
        <path d="M10 18 L11 16 L12 18 L10 17 L12 17Z" fill="#d4a0e0" opacity="0.8" />
        <path d="M50 15 L51 13 L52 15 L50 14 L52 14Z" fill="#e8a0c8" opacity="0.8" />
        <path d="M52 44 L53 42 L54 44 L52 43 L54 43Z" fill="#c090d8" opacity="0.7" />
        <defs><radialGradient id="bg5" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fff0fa" /><stop offset="100%" stopColor="#e8d8f8" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-6",
    num: "Stage 06",
    title: "Newborn & Postpartum",
    desc: "Newborn assessment, NICU readiness, lactation support & postpartum recovery for mother.",
    tag: "🤸 After Birth",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg6)" />
        <path d="M12 52 Q10 40 14 32 Q18 24 26 22 Q34 20 38 26 Q46 30 46 42 Q46 52 38 56 Q24 60 12 52Z" fill="#ecdaf8" stroke="#a878d0" strokeWidth="1" opacity="0.5" />
        <path d="M14 50 Q12 38 18 30" stroke="#9868c0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M50 50 Q52 38 46 30" stroke="#9868c0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="32" cy="42" rx="10" ry="9" fill="#fde8f2" stroke="#c870b8" strokeWidth="1.3" />
        <circle cx="32" cy="30" r="9" fill="#ffe8f4" stroke="#c870b8" strokeWidth="1.3" />
        <path d="M26 23 Q28 20 32 22" stroke="#c870b8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32 22 Q36 20 38 23" stroke="#c870b8" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="28.5" cy="30" rx="1.5" ry="1.8" fill="#6a3a88" />
        <ellipse cx="35.5" cy="30" rx="1.5" ry="1.8" fill="#6a3a88" />
        <circle cx="29" cy="29.3" r="0.6" fill="#fff" />
        <circle cx="36" cy="29.3" r="0.6" fill="#fff" />
        <path d="M28.5 34 Q32 37 35.5 34" stroke="#c870b8" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="26" cy="33" rx="2.5" ry="1.5" fill="#f4a0c0" opacity="0.45" />
        <ellipse cx="38" cy="33" rx="2.5" ry="1.5" fill="#f4a0c0" opacity="0.45" />
        <path d="M29 16 Q29 13.5 31 13.5 Q32 13.5 32 14.5 Q32 13.5 33 13.5 Q35 13.5 35 16 Q35 18.5 32 21 Q29 18.5 29 16Z" fill="#e860a0" opacity="0.85" />
        <defs><radialGradient id="bg6" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fef6ff" /><stop offset="100%" stopColor="#dfd0f8" /></radialGradient></defs>
      </svg>
    )
  }
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const reviewsTrackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [isDoctorsPaused, setIsDoctorsPaused] = useState<boolean>(false);
  const [isReviewsPaused, setIsReviewsPaused] = useState<boolean>(false);

  const lastDoctorsToggleTime = useRef<number>(0);
  const lastReviewsToggleTime = useRef<number>(0);

  const toggleDoctorsPause = () => {
    const now = Date.now();
    if (now - lastDoctorsToggleTime.current < 300) return;
    lastDoctorsToggleTime.current = now;
    setIsDoctorsPaused((prev) => !prev);
  };

  const toggleReviewsPause = () => {
    const now = Date.now();
    if (now - lastReviewsToggleTime.current < 300) return;
    lastReviewsToggleTime.current = now;
    setIsReviewsPaused((prev) => !prev);
  };

  // Autoscroll & infinite wrap for Doctors track
  useEffect(() => {
    const track = sliderRef.current;
    if (!track) return;

    let animationFrameId: number;
    let isHovered = false;
    let isTouched = false;

    const initScroll = () => {
      if (track.scrollWidth > 0) {
        track.scrollLeft = track.scrollWidth / 4;
      }
    };
    
    const timer = setTimeout(initScroll, 100);

    const handleScroll = () => {
      const oneSetWidth = track.scrollWidth / 4;
      if (oneSetWidth <= 0) return;
      if (track.scrollLeft >= oneSetWidth * 2.5) {
        track.scrollLeft -= oneSetWidth;
      } else if (track.scrollLeft <= oneSetWidth * 0.5) {
        track.scrollLeft += oneSetWidth;
      }

      // Calculate active dot index dynamically from current scroll position
      const relativeScroll = track.scrollLeft - oneSetWidth;
      const cardWidth = 226;
      const currentIdx = Math.round(relativeScroll / cardWidth);
      const positiveIdx = ((currentIdx % CHENNAI_DOCTORS.length) + CHENNAI_DOCTORS.length) % CHENNAI_DOCTORS.length;
      
      setActiveDot((prev) => {
        if (prev !== positiveIdx) {
          return positiveIdx;
        }
        return prev;
      });
    };

    const step = () => {
      if (!isHovered && !isTouched && !isDoctorsPaused) {
        track.scrollLeft += 0.8;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };
    const onTouchStart = () => { isTouched = true; };
    const onTouchEnd = () => { isTouched = false; };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    animationFrameId = requestAnimationFrame(step);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDoctorsPaused]);

  // Autoscroll & infinite wrap for Reviews track
  useEffect(() => {
    const track = reviewsTrackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let isHovered = false;
    let isTouched = false;

    const initScroll = () => {
      if (track.scrollWidth > 0) {
        track.scrollLeft = track.scrollWidth / 4;
      }
    };
    
    const timer = setTimeout(initScroll, 100);

    const handleScroll = () => {
      const oneSetWidth = track.scrollWidth / 4;
      if (oneSetWidth <= 0) return;
      if (track.scrollLeft >= oneSetWidth * 2.5) {
        track.scrollLeft -= oneSetWidth;
      } else if (track.scrollLeft <= oneSetWidth * 0.5) {
        track.scrollLeft += oneSetWidth;
      }
    };

    const step = () => {
      if (!isHovered && !isTouched && !isReviewsPaused) {
        track.scrollLeft += 0.8;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };
    const onTouchStart = () => { isTouched = true; };
    const onTouchEnd = () => { isTouched = false; };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    animationFrameId = requestAnimationFrame(step);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [isReviewsPaused]);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    language: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>("");

  // Monitor Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(h > 0 ? Math.min(100, (s / h) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dot index is now synchronized dynamically via handleScroll on the slider track.

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", phone: "" };

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
      valid = false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit mobile number.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setRequestId(`MH-${Math.floor(1000 + Math.random() * 9000)}`);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        language: ""
      });
      setTimeout(() => setSubmitSuccess(false), 8000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -58;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 240;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans select-none antialiased bg-[#faf8fc]">
      {/* Scroll Progress Indicator */}
      <div
        id="page-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        className="transition-all duration-75"
      />

      {/* ─── NAV ─── */}
      <nav>
        <a href="#home" className="logo-wrap" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img className="logo-img" src="motherhood_logo.png" alt="Motherhood Women & Children's Hospital" />
        </a>
        <div className="nav-right">
          <a href="tel:08069549251" className="nav-phone">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.1 2.38a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.69-1.69a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="currentColor" /></svg>
            080 695 49251
          </a>
          <button onClick={() => scrollToSection("booking")} className="nav-cta hidden sm:inline-block">Book Consultation</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <div className="hero" id="home">
        {/* Cloud9-style decorative half-circles */}
        <div className="hero-decor" aria-hidden="true">
          <span className="d1"></span><span className="d2"></span><span className="d3"></span><span className="d4"></span>
        </div>
        {/* Full-bleed background image */}
        <div className="hero-bg">
          <img
            src="hero_mother_baby.png"
            alt="Mother holding her newborn baby"
            className="hero-img-desktop w-full h-full object-cover md:object-[55%_22%]"
          />
          <img
            src="hero_mobile_banner.jpg"
            alt="Serene mother hugging newborn baby"
            className="hero-img-mobile w-full h-full object-cover object-center"
          />
        </div>

        <div className="hero-top-row">
          {/* LEFT: Offer text overlaid on image */}
          <div className="hero-content">
            <div className="hero-tagline">
              <span>Expert </span>
              <em>Maternity Care</em>
              <span> in Chennai<br />from your first visit to delivery.</span>
            </div>
            <div className="hero-offer-big">Avail <span className="amt">₹10,000/-</span> OFF</div>
            <div className="hero-offer-big" style={{ marginTop: "2px" }}>on your final bill and</div>
            <div className="hero-offer-sub"><span className="amt2">₹10,000/-</span> worth benefits</div>
            <div className="hero-tc">*T&amp;C Apply</div>
          </div>

          {/* RIGHT: Booking form overlaid on image */}
          <div className="hero-right">
            <div className="hero-right-inner">
              <div className="hero-form-wrap" id="booking">
                {submitSuccess ? (
                  <div className="success-card animate-fadeIn">
                    <div className="success-check-ring">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="form-badge" style={{ marginBottom: "14px" }}>✦ Consultation Requested</div>
                    <h3 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 800, fontSize: "20px", color: "#2c2535", marginBottom: "10px", lineHeight: "1.2" }}>
                      Thank You!
                    </h3>
                    <p style={{ fontSize: "13px", color: "#3a3245", fontWeight: 500, lineHeight: "1.65", maxWidth: "260px" }}>
                      Our Chennai care team has received your request and will call you shortly to confirm your consultation slot.
                    </p>
                    <hr className="success-divider" />
                    <span className="success-ref">Request ID: {requestId}</span>
                  </div>
                ) : (
                  <>
                    <div className="form-badge">✦ Free first consultation</div>
                    <div className="form-title">Book your consultation</div>
                    <div className="form-sub">Our Chennai care team will help with packages, doctors &amp; next steps.</div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                      <div className="form-field">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={formErrors.name ? "border-[#b8364d]" : ""}
                        />
                        {formErrors.name && <span className="text-[9px] font-semibold text-[#b8364d] mt-0.5">{formErrors.name}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone number"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={formErrors.phone ? "border-[#b8364d]" : ""}
                        />
                        {formErrors.phone && <span className="text-[9px] font-semibold text-[#b8364d] mt-0.5">{formErrors.phone}</span>}
                      </div>
                      <div className="form-field">
                        <select
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                        >
                          <option value="">Select preferred language</option>
                          <option value="English">English</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Telugu">Telugu</option>
                          <option value="Malayalam">Malayalam</option>
                        </select>
                      </div>
                      <button type="submit" disabled={isSubmitting} className="form-submit">
                        {isSubmitting ? "Booking in progress..." : "Book My Consultation"}
                      </button>
                    </form>
                    <div className="form-help">Your information stays private and is only used for appointment assistance.</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><div className="stat-num">50,000+</div><div className="stat-label">Mothers supported</div></div>
          <div className="stat-item"><div className="stat-num">15+</div><div className="stat-label">Specialist doctors</div></div>
          <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">Emergency &amp; labor care</div></div>
          <div className="stat-item"><div className="stat-num">NICU</div><div className="stat-label">Advanced newborn support</div></div>
        </div>
      </div>

      {/* ─── EXCLUSIVE OFFERS ─── */}
      <section className="package-highlight" id="offers">
        <div className="section-inner">
          <h2 className="section-title">Exclusive offers with attractive benefits</h2>
          <p className="section-sub">Limited-time savings for Chennai families &mdash; clear value from the very first visit.</p>

          <div className="offer-cards-row">
            <div className="offer-pill-card c1">
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
                </div>
              </div>
              <div className="offer-amount">Free</div><div className="offer-label">First Consultation</div>
            </div>

            <div className="offer-pill-card c2">
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 11h3m0 0h1a1.5 1.5 0 000-3H13v6h4a1.5 1.5 0 000-3H16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="offer-amount">₹10,000 Off</div><div className="offer-label">On your pregnancy journey</div>
            </div>

            <div className="offer-pill-card c3">
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 14h6M16 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="offer-amount">₹5,000 off</div><div className="offer-label">On your final bill</div>
            </div>

            <div className="offer-pill-card c4">
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="16" cy="11" r="1.5" fill="currentColor" /></svg>
                </div>
              </div>
              <div className="offer-amount">₹5,000 worth</div><div className="offer-label">Discounts on OPD Services</div>
            </div>
          </div>
          <div className="offer-footnote mobile-hide">*Book a free consultation to confirm eligibility and activate your benefits before the offer period closes. T&amp;C apply.</div>
        </div>
      </section>

      {/* ─── DOCTORS SECTION ─── */}
      <section className="doctors-section" id="doctors">
        <div className="section-inner">
          <h2 className="section-title">Expert doctors, dedicated to your journey</h2>
          <p className="section-sub">Our Chennai team includes senior obstetricians, neonatologists, and maternal-fetal medicine specialists.</p>
        </div>

        <div className="doctors-slider-wrap">
            <div
              className="doctors-track-outer"
              ref={sliderRef}
            >
              <div
                className="doctors-slider"
                id="doctorsSlider"
              >
                {/* Set 1 */}
                {CHENNAI_DOCTORS.map((doc) => (
                  <div key={doc.id} className="doctor-card">
                    <div className="doctor-photo">
                      <div className="doctor-avatar" style={{ background: doc.bgGradient }}>
                        {doc.initials}
                      </div>
                    </div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="doctor-qual">{doc.qualifications}</div>
                    <div className="doctor-type">{doc.specialty}</div>
                    <div className="doctor-location">📍 {doc.location}</div>
                    <button onClick={() => scrollToSection("booking")} className="doctor-btn">Book Appointment</button>
                  </div>
                ))}

                {/* Set 2 */}
                {CHENNAI_DOCTORS.map((doc, idx) => (
                  <div key={`${doc.id}-dup-${idx}`} className="doctor-card" aria-hidden="true">
                    <div className="doctor-photo">
                      <div className="doctor-avatar" style={{ background: doc.bgGradient }}>
                        {doc.initials}
                      </div>
                    </div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="doctor-qual">{doc.qualifications}</div>
                    <div className="doctor-type">{doc.specialty}</div>
                    <div className="doctor-location">📍 {doc.location}</div>
                    <button onClick={() => scrollToSection("booking")} className="doctor-btn">Book Appointment</button>
                  </div>
                ))}

                {/* Set 3 */}
                {CHENNAI_DOCTORS.map((doc, idx) => (
                  <div key={`${doc.id}-dup3-${idx}`} className="doctor-card" aria-hidden="true">
                    <div className="doctor-photo">
                      <div className="doctor-avatar" style={{ background: doc.bgGradient }}>
                        {doc.initials}
                      </div>
                    </div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="doctor-qual">{doc.qualifications}</div>
                    <div className="doctor-type">{doc.specialty}</div>
                    <div className="doctor-location">📍 {doc.location}</div>
                    <button onClick={() => scrollToSection("booking")} className="doctor-btn">Book Appointment</button>
                  </div>
                ))}

                {/* Set 4 */}
                {CHENNAI_DOCTORS.map((doc, idx) => (
                  <div key={`${doc.id}-dup4-${idx}`} className="doctor-card" aria-hidden="true">
                    <div className="doctor-photo">
                      <div className="doctor-avatar" style={{ background: doc.bgGradient }}>
                        {doc.initials}
                      </div>
                    </div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="doctor-qual">{doc.qualifications}</div>
                    <div className="doctor-type">{doc.specialty}</div>
                    <div className="doctor-location">📍 {doc.location}</div>
                    <button onClick={() => scrollToSection("booking")} className="doctor-btn">Book Appointment</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-dots" id="docDots">
              {CHENNAI_DOCTORS.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === activeDot ? "active" : ""}`}
                  onClick={() => {
                    setActiveDot(idx);
                    if (sliderRef.current) {
                      const oneSetWidth = sliderRef.current.scrollWidth / 4;
                      sliderRef.current.scrollTo({
                        left: oneSetWidth + idx * 226,
                        behavior: "smooth"
                      });
                    }
                  }}
                  aria-label={`Doctor ${idx + 1}`}
                />
              ))}
            </div>
        </div>
      </section>

      {/* ─── COMPLETE CARE ─── */}
      <section className="lifecycle-section" id="complete-care">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="lc-heading-badge">
              <div className="lc-pulse"></div>
              <span>Complete Care &middot; Every Stage</span>
            </div>
            <div className="section-eyebrow mobile-hide" style={{ justifyContent: "center" }}><span className="eyebrow-line"></span> From First Heartbeat to First Breath</div>
            <h2 className="section-title">We Complete Care &mdash; <em style={{ fontStyle: "normal", color: "var(--lavender-dark)" }}>Every Step of the Way</em></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Our care doesn&rsquo;t begin at delivery &mdash; it begins at conception. <span className="mobile-hide-inline">We walk beside you through every milestone, every scan, every heartbeat, until your baby is safe in your arms.</span></p>
          </div>

          <div className="lc-track">
            <div className="lc-steps">
              {MATERNITY_STAGES.map((stage, idx) => (
                <div key={stage.id} className="lc-step">
                  <div className="lc-icon-ring">
                    <div className="lc-baby-circle">
                      {stage.renderIcon()}
                    </div>
                  </div>
                  <div className="lc-connector-dot"></div>
                  <div className={`lc-card ${idx % 2 === 1 ? "mt-[48px]" : ""}`}>
                    <div className="lc-step-num">{stage.num}</div>
                    <div className="lc-step-title">{stage.title}</div>
                    <div className="lc-step-desc">{stage.desc}</div>
                    <div className="lc-step-tag">{stage.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lc-cta-strip mt-12 flex flex-col md:flex-row items-center justify-center gap-6 p-[18px_26px] bg-white/65 border border-[#ede0ee] rounded-[22px] backdrop-blur-lg">
            <div className="lc-cta-badge flex items-center gap-3">
              <div className="lc-badge-icon">
                <svg viewBox="0 0 24 24"><path d="M12 20c4-3.3 7-6 7-10a4 4 0 0 0-7-2.5A4 4 0 0 0 5 10c0 4 3 6.7 7 10Z" stroke="currentColor" fill="none" strokeWidth="2" /></svg>
              </div>
              <div className="lc-badge-text text-left">
                <strong>One Hospital. Every Stage.</strong>
                <span>No referrals. No handoffs. Just continuous, expert care.</span>
              </div>
            </div>
            <div className="lc-cta-badge flex items-center gap-3">
              <div className="lc-badge-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="2" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <div className="lc-badge-text text-left">
                <strong>24/7 Expert Support</strong>
                <span>Senior OB &amp; NICU team available at every critical moment.</span>
              </div>
            </div>
            <button onClick={() => scrollToSection("booking")} className="lc-btn-gold">Start Your Journey &rarr;</button>
          </div>
        </div>
      </section>

      {/* ─── PACKAGE DETAILS SECTION ─── */}
      <section className="birthing-section" id="birthing">
        <div className="section-inner">
          <h2 className="section-title">Best Birthing Package in Chennai</h2>
          <p className="section-sub">Everything you and your baby need &mdash; from first trimester through delivery and recovery, all in one transparent, comprehensive package.</p>

          <div className="birthing-grid">
            <div>
              <div className="birthing-bullets">
                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>Full Antenatal Support</strong>
                    <span>Consultations, scans, and monitoring from your first trimester through delivery planning.</span>
                  </div>
                </div>

                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>Labor Room and Delivery</strong>
                    <span>Private delivery room with 24/7 senior obstetrician and trained midwife support.</span>
                  </div>
                </div>

                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>Newborn and NICU Backup</strong>
                    <span>Immediate newborn assessment, NICU level III readiness for high-risk or premature situations.</span>
                  </div>
                </div>

                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>Postpartum Recovery</strong>
                    <span>Post-delivery observation, lactation guidance, and discharge support for mother and baby.</span>
                  </div>
                </div>

                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>Transparent Billing</strong>
                    <span>Clear package costs upfront &mdash; no hidden charges, no last-minute surprises.</span>
                  </div>
                </div>

                <div className="birthing-bullet">
                  <div className="tick">✓</div>
                  <div>
                    <strong>High-Risk Pregnancy Care</strong>
                    <span>Dedicated protocols for gestational diabetes, hypertension, twins, and complex deliveries.</span>
                  </div>
                </div>
              </div>
              <button onClick={() => scrollToSection("booking")} className="btn-primary mt-4">Book Free Consultation</button>
            </div>

            {/* Doctor image panel */}
            <div className="relative rounded-[20px] overflow-hidden border border-[#ede0ee] shadow-md bg-gradient-to-br from-[#fce8f4] to-[#ede8f5] h-full min-h-[360px]">
              <img
                src="doctor_anand.png"
                alt="Expert Doctor at Motherhood Hospital"
                className="w-full h-full object-cover object-[center_top] block min-h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PATIENT REVIEWS ─── */}
      <section className="reviews-section" id="reviews">
        <div className="section-inner">
          <div className="reviews-head">
            <div>
              <h2 className="section-title" style={{ fontSize: "clamp(18px,2vw,28px)", marginBottom: "4px" }}>What mothers say about Motherhood</h2>
            </div>
            <div className="review-badges-row">
              <div className="review-platform-badge">
                <div className="rpb-logo google">
                  <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                </div>
                <div>
                  <div className="rpb-score">⭐ 4.8</div>
                  <div className="rpb-label">Google &middot; 1,956 reviews</div>
                </div>
              </div>
              <div className="review-platform-badge">
                <div className="rpb-logo practo">Pr</div>
                <div>
                  <div className="rpb-score">⭐ 4.9</div>
                  <div className="rpb-label">Practo &middot; 1,956 reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="review-marquee"
          ref={reviewsTrackRef}
        >
            <div className="review-row">
              {/* Set 1 */}
              {PATIENT_REVIEWS.map((rev, idx) => (
                <div key={`rev-${idx}`} className="review-card">
                  <div className="review-top">
                    <div>
                      <div className="review-name">{rev.name}</div>
                      <div className="review-meta">{rev.meta}</div>
                    </div>
                    <div className="review-stars">{rev.stars}</div>
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))}

              {/* Set 2 */}
              {PATIENT_REVIEWS.map((rev, idx) => (
                <div key={`rev-dup-${idx}`} className="review-card" aria-hidden="true">
                  <div className="review-top">
                    <div>
                      <div className="review-name">{rev.name}</div>
                      <div className="review-meta">{rev.meta}</div>
                    </div>
                    <div className="review-stars">{rev.stars}</div>
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))}

              {/* Set 3 */}
              {PATIENT_REVIEWS.map((rev, idx) => (
                <div key={`rev-dup3-${idx}`} className="review-card" aria-hidden="true">
                  <div className="review-top">
                    <div>
                      <div className="review-name">{rev.name}</div>
                      <div className="review-meta">{rev.meta}</div>
                    </div>
                    <div className="review-stars">{rev.stars}</div>
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))}

              {/* Set 4 */}
              {PATIENT_REVIEWS.map((rev, idx) => (
                <div key={`rev-dup4-${idx}`} className="review-card" aria-hidden="true">
                  <div className="review-top">
                    <div>
                      <div className="review-name">{rev.name}</div>
                      <div className="review-meta">{rev.meta}</div>
                    </div>
                    <div className="review-stars">{rev.stars}</div>
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* ─── CONTACT & LOCATION ─── */}
      <section className="location-section" id="location">
        <div className="section-inner">
          <div className="section-eyebrow"><span className="eyebrow-line"></span> Contact and location</div>
          <h2 className="section-title">Motherhood Hospital Chennai</h2>
          <p className="section-sub">Visit us or speak to the team directly &mdash; we are open 24 hours for all maternity and emergency needs.</p>

          <div className="location-grid">
            <div className="map-wrap">
              <iframe
                title="Motherhood Hospital Chennai Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0695211535754!2d80.24625654555298!3d13.031244780915749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b4336e6a1d%3A0xb46e591bbe7831e1!2sMotherhood%20Hospital%2C%20Chennai!5e0!3m2!1sen!2sin!4v1714034493607!5m2!1sen!2sin"
                allowFullScreen={false}
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>

            <div className="location-card">
              <h3>Motherhood Hospital Chennai</h3>
              <ul className="location-list">
                <li><span className="loc-icon">📍</span>Motherhood Women and Children&rsquo;s Hospital, Alwarpet, Chennai, Tamil Nadu</li>
                <li><span className="loc-icon">🕒</span>Open 24 hours &mdash; labor, emergency, and delivery support always available</li>
                <li><span className="loc-icon">👩‍⚕️</span>Experienced maternity specialists with NICU level III backup on-site</li>
                <li><span className="loc-icon">📞</span>Call 080 695 49251 for consultation booking or package queries</li>
                <li><span className="loc-icon">⭐</span>4.8 Google (1,956 reviews) &middot; 4.9 Practo (1,956 reviews)</li>
              </ul>
              <div className="location-actions">
                <button onClick={() => scrollToSection("booking")} className="btn-primary">Book Now</button>
                <a href="tel:08069549251" className="btn-secondary">Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Your motherhood journey deserves expert support from day one.</h2>
          <p>Book a free consultation, explore the birthing package, and let our Chennai team guide every step from first visit to delivery.</p>
          <div className="final-btns">
            <button onClick={() => scrollToSection("booking")} className="final-btn-gold">Book Consultation</button>
            <a href="tel:08069549251" className="final-btn-outline">Call Now</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Motherhood Hospitals | Chennai | 080 695 49251</p>
        <p><a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms and Conditions</a></p>
      </footer>

      {/* ─── STICKY FLOATS ─── */}
      <div className="sticky-desktop">
        <button onClick={() => scrollToSection("booking")} className="sticky-float">Book Now</button>
      </div>

      <div className="sticky-mobile">
        <button onClick={() => scrollToSection("booking")} className="btn-primary" style={{ padding: "11px", borderRadius: "8px", fontSize: "13.5px", flex: 1 }}>Book Now</button>
        <a href="tel:08069549251" className="btn-secondary" style={{ padding: "11px", borderRadius: "8px", fontSize: "13.5px", flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>Call Now</a>
      </div>
    </div>
  );
}
