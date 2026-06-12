"use client";

import React, { useState, useEffect, useRef } from "react";
import { assetUrl } from "@/lib/site";

// Types
interface Stage {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  tag: string;
  renderIcon: () => React.JSX.Element;
}

interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialty: string;
  location: string;
  initials: string;
  avatarColor: string;
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
    location: "Alwarpet",
    initials: "PS",
    avatarColor: "#DB5070"
  },
  {
    id: "dr-kavitha-r",
    name: "Dr. Kavitha R.",
    qualifications: "MD, DNB, FNB (MFM)",
    specialty: "Maternal-Fetal Medicine Specialist",
    location: "Alwarpet",
    initials: "KR",
    avatarColor: "#0057A4"
  },
  {
    id: "dr-anand",
    name: "Dr. Anand Kumar",
    qualifications: "MD, DM (Neonatology)",
    specialty: "Senior Neonatologist",
    location: "Alwarpet",
    initials: "AK",
    avatarColor: "#DB5070"
  },
  {
    id: "dr-lakshmi",
    name: "Dr. Lakshmi V.",
    qualifications: "MD, DNB, MRCOG",
    specialty: "Consultant Obstetrician",
    location: "Alwarpet",
    initials: "LV",
    avatarColor: "#0057A4"
  },
  {
    id: "dr-rajesh",
    name: "Dr. Rajesh M.",
    qualifications: "MD, DA, PDCC (Pain)",
    specialty: "Anaesthesiologist & Pain Specialist",
    location: "Alwarpet",
    initials: "RM",
    avatarColor: "#DB5070"
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
    shortTitle: "Pre-Pregnancy",
    desc: "Fertility counseling, health screening & nutrition guidance before conception begins.",
    tag: "🌿 Preparation",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg1)" />
        <path d="M20 38 Q18 28 24 23 Q32 17 40 23 Q46 28 44 38 Q42 46 32 50 Q22 46 20 38Z" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="9" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="5.5" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1" />
        <circle cx="32" cy="32" r="2.5" fill="#0057A4" />
        <path d="M28 22 Q28 19 30.5 19 Q32 19 32 20.5 Q32 19 33.5 19 Q36 19 36 22 Q36 25 32 28 Q28 25 28 22Z" fill="#0057A4" opacity="0.85" />
        <defs><radialGradient id="bg1" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-2",
    num: "Stage 02",
    title: "First Trimester",
    shortTitle: "1st Trimester",
    desc: "Early scans, blood tests, heartbeat monitoring & personalised care plans for weeks 1–12.",
    tag: "💖 Weeks 1–12",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg2)" />
        <ellipse cx="32" cy="34" rx="18" ry="20" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.2" strokeDasharray="3 2" />
        <path d="M38 26 Q42 30 40 36 Q38 42 32 43 Q26 44 23 40 Q20 36 22 31 Q24 26 29 24 Q34 22 38 26Z" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.3" />
        <circle cx="38" cy="25" r="5.5" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.2" />
        <circle cx="37" cy="24" r="1.2" fill="#0057A4" />
        <path d="M26 33 Q21 32 20 29" stroke="#0057A4" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="33" cy="34" r="2" fill="#0057A4" opacity="0.8">
          <animate attributeName="r" values="2;3;2" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <defs><radialGradient id="bg2" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-3",
    num: "Stage 03",
    title: "Second Trimester",
    shortTitle: "2nd Trimester",
    desc: "Anomaly scans, fetal growth tracking, gestational diabetes screening & antenatal classes.",
    tag: "👶 Weeks 13–26",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg3)" />
        <ellipse cx="32" cy="34" rx="19" ry="21" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1" opacity="0.6" />
        <path d="M40 22 Q46 29 43 38 Q40 46 32 47 Q24 47 21 40 Q18 34 21 27 Q24 20 32 18 Q37 17 40 22Z" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.4" />
        <circle cx="41" cy="21" r="7" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.3" />
        <ellipse cx="40" cy="20" rx="1.3" ry="1" fill="#0057A4" />
        <path d="M41 22 Q42 23 41.5 23.5" stroke="#0057A4" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M28 30 Q22 28 20 24" stroke="#0057A4" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="23.5" r="2" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1" />
        <path d="M28 40 Q26 46 30 48" stroke="#0057A4" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="31" cy="48.5" rx="2.5" ry="1.2" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1" />
        <defs><radialGradient id="bg3" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-4",
    num: "Stage 04",
    title: "Third Trimester",
    shortTitle: "3rd Trimester",
    desc: "Birth planning, fetal monitoring, NST tests & delivery readiness with our senior OB team.",
    tag: "🤰 Weeks 27–40",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg4)" />
        <ellipse cx="32" cy="33" rx="20" ry="22" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.2" opacity="0.55" />
        <ellipse cx="32" cy="37" rx="10" ry="13" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.3" />
        <circle cx="32" cy="50" r="8" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.3" />
        <ellipse cx="29.5" cy="50" rx="1.2" ry="1" fill="#0057A4" />
        <ellipse cx="34.5" cy="50" rx="1.2" ry="1" fill="#0057A4" />
        <path d="M30 53 Q32 54.5 34 53" stroke="#0057A4" strokeWidth="1" strokeLinecap="round" />
        <path d="M22 34 Q18 33 19 29" stroke="#0057A4" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M42 34 Q46 33 45 29" stroke="#0057A4" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M24 30 Q22 22 28 18" stroke="#0057A4" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 30 Q42 22 36 18" stroke="#0057A4" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 49 Q42 50 40 52" stroke="#0057A4" strokeWidth="1" strokeLinecap="round" fill="none" />
        <defs><radialGradient id="bg4" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-5",
    num: "Stage 05",
    title: "Labor & Delivery",
    shortTitle: "Labor",
    desc: "Private labor room, 24/7 specialist support, pain management & expert delivery team on standby.",
    tag: "✨ Birth Day",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg5)" />
        <circle cx="32" cy="32" r="22" fill="rgba(220,242,253,0.45)" />
        <path d="M14 36 Q14 22 32 20 Q50 22 50 36 Q50 52 32 54 Q14 52 14 36Z" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.2" />
        <circle cx="32" cy="26" r="10" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.3" />
        <path d="M27.5 25.5 Q29 24.5 30.5 25.5" stroke="#0057A4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M33.5 25.5 Q35 24.5 36.5 25.5" stroke="#0057A4" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="32" cy="27.5" rx="1.2" ry="0.8" fill="#0057A4" opacity="0.7" />
        <path d="M29.5 30 Q32 32 34.5 30" stroke="#0057A4" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="18" cy="40" r="4" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.1" />
        <path d="M10 18 L11 16 L12 18 L10 17 L12 17Z" fill="#0057A4" opacity="0.8" />
        <path d="M50 15 L51 13 L52 15 L50 14 L52 14Z" fill="#0057A4" opacity="0.8" />
        <path d="M52 44 L53 42 L54 44 L52 43 L54 43Z" fill="#0057A4" opacity="0.7" />
        <defs><radialGradient id="bg5" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  },
  {
    id: "stage-6",
    num: "Stage 06",
    title: "Newborn & Postpartum",
    shortTitle: "Postpartum",
    desc: "Newborn assessment, NICU readiness, lactation support & postpartum recovery for mother.",
    tag: "🤸 After Birth",
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="30" fill="url(#bg6)" />
        <path d="M12 52 Q10 40 14 32 Q18 24 26 22 Q34 20 38 26 Q46 30 46 42 Q46 52 38 56 Q24 60 12 52Z" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1" opacity="0.5" />
        <path d="M14 50 Q12 38 18 30" stroke="#0057A4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M50 50 Q52 38 46 30" stroke="#0057A4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="32" cy="42" rx="10" ry="9" fill="#DCF2FD" stroke="#0057A4" strokeWidth="1.3" />
        <circle cx="32" cy="30" r="9" fill="#FFFFFF" stroke="#0057A4" strokeWidth="1.3" />
        <path d="M26 23 Q28 20 32 22" stroke="#0057A4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32 22 Q36 20 38 23" stroke="#0057A4" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="28.5" cy="30" rx="1.5" ry="1.8" fill="#0057A4" />
        <ellipse cx="35.5" cy="30" rx="1.5" ry="1.8" fill="#0057A4" />
        <circle cx="29" cy="29.3" r="0.6" fill="#fff" />
        <circle cx="36" cy="29.3" r="0.6" fill="#fff" />
        <path d="M28.5 34 Q32 37 35.5 34" stroke="#0057A4" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="26" cy="33" rx="2.5" ry="1.5" fill="#0057A4" opacity="0.45" />
        <ellipse cx="38" cy="33" rx="2.5" ry="1.5" fill="#0057A4" opacity="0.45" />
        <path d="M29 16 Q29 13.5 31 13.5 Q32 13.5 32 14.5 Q32 13.5 33 13.5 Q35 13.5 35 16 Q35 18.5 32 21 Q29 18.5 29 16Z" fill="#0057A4" opacity="0.85" />
        <defs><radialGradient id="bg6" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCF2FD" /></radialGradient></defs>
      </svg>
    )
  }
];

const CAROUSEL_SET_COUNT = 4;
// How many px of horizontal movement before we treat a touch as a swipe (not a tap)
const CAROUSEL_SWIPE_THRESHOLD_PX = 10;

// Records touch start on a card so tap-vs-swipe can be detected in onTouchEnd.
function recordTouchStart(e: React.TouchEvent) {
  const t = e.touches[0];
  if (!t) return;
  const el = e.currentTarget;
  el.setAttribute("data-touch-x", String(t.clientX));
  el.setAttribute("data-touch-y", String(t.clientY));
  el.setAttribute("data-touch-t", String(Date.now()));
}

// Clears iOS/Android sticky :hover after a tap so unselected cards drop back down.
function clearStickyHover(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return;
  el.blur();
  const parent = el.parentElement;
  if (!parent) return;
  const prev = parent.style.pointerEvents;
  parent.style.pointerEvents = "none";
  requestAnimationFrame(() => {
    parent.style.pointerEvents = prev;
  });
}

function handleSelectableCardTap(
  id: string,
  e: React.SyntheticEvent,
  cardSelector: string,
  tapLockRef: React.MutableRefObject<number>,
  onSelect: (id: string) => void,
  options?: { ignoreSelector?: string }
) {
  if (
    options?.ignoreSelector &&
    e.target instanceof HTMLElement &&
    e.target.closest(options.ignoreSelector)
  ) {
    return;
  }
  if (!isCarouselCardTap(e, cardSelector)) return;
  e.stopPropagation();

  if (e.type === "touchend") {
    e.preventDefault();
    tapLockRef.current = Date.now();
    onSelect(id);
    clearStickyHover(e.currentTarget);
    return;
  }

  if (e.type === "click" && Date.now() - tapLockRef.current < 400) return;

  onSelect(id);
  clearStickyHover(e.currentTarget);
}

// True when a touch end is a deliberate tap (not a carousel swipe).
function isCarouselCardTap(e: React.SyntheticEvent, cardSelector: string): boolean {
  if (e.type === "click") return true;
  if (e.type !== "touchend") return false;
  const card =
    e.currentTarget instanceof HTMLElement && e.currentTarget.matches(cardSelector)
      ? e.currentTarget
      : e.target instanceof HTMLElement
        ? e.target.closest(cardSelector)
        : null;
  if (!(card instanceof HTMLElement)) return false;
  const startX = parseFloat(card.getAttribute("data-touch-x") ?? "");
  const startY = parseFloat(card.getAttribute("data-touch-y") ?? "");
  const startT = parseFloat(card.getAttribute("data-touch-t") ?? "");
  if (Number.isNaN(startX) || Number.isNaN(startY) || Number.isNaN(startT)) return false;
  if (!(e.nativeEvent instanceof TouchEvent)) return false;
  const touch = e.nativeEvent.changedTouches[0];
  if (!touch) return false;
  if (Date.now() - startT > 450) return false;
  if (Math.abs(touch.clientX - startX) > CAROUSEL_SWIPE_THRESHOLD_PX) return false;
  if (Math.abs(touch.clientY - startY) > CAROUSEL_SWIPE_THRESHOLD_PX) return false;
  return true;
}

/**
 * Drives infinite-loop auto-scroll + native-feeling touch swipe on a carousel.
 *
 * Strategy: move the inner strip (firstElementChild) via CSS transform: translate3d()
 * instead of scrollLeft. Transforms run on the GPU compositor thread in both Chrome
 * and Safari — zero layout reflow, always smooth.
 *
 * Container must be overflow:hidden; strip must have will-change:transform.
 */
type CarouselController = {
  cleanup: () => void;
  stopMomentum: () => void;
};

type CarouselScrollOptions = {
  /** Enable auto-scroll on touch devices (default: desktop only). */
  autoScrollOnMobile?: boolean;
  /** Pause auto-scroll for this many ms after the user swipes or releases a hold. */
  interactionPauseMs?: number;
};

function setupInfiniteCarouselScroll(
  container: HTMLDivElement,
  isPausedRef: React.MutableRefObject<boolean>,
  options: CarouselScrollOptions = {}
): CarouselController {
  const strip = container.firstElementChild as HTMLElement | null;
  if (!strip) {
    return { cleanup: () => {}, stopMomentum: () => {} };
  }

  const AUTO_SPEED = 50;   // px per second auto-scroll
  const FRICTION   = 0.88; // momentum decay multiplier per ~16ms frame

  let pos      = 0;   // current translateX in px (≤ 0, gets more negative as we scroll right)
  let velocity = 0;   // px per frame (for post-swipe momentum)
  let rafId    = 0;
  let lastTime = 0;
  let isInView = true;
  let isHovered = false;

  // Touch tracking
  let isTouching   = false;
  let touchStartX  = 0;
  let touchStartPos = 0;
  let prevX        = 0;
  let prevTime     = 0;

  const isDesktop = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const autoScrollEnabled = () =>
    isDesktop() || options.autoScrollOnMobile === true;

  const interactionPauseMs = options.interactionPauseMs ?? 0;
  let interactionPausedUntil = 0;

  const bumpInteractionPause = () => {
    if (interactionPauseMs > 0) {
      interactionPausedUntil = Date.now() + interactionPauseMs;
    }
  };

  const setWidth = () => strip.scrollWidth / CAROUSEL_SET_COUNT;

  // Keep pos in (-setWidth, 0] so the loop is seamless (all 4 sets are identical)
  const loopPos = () => {
    const sw = setWidth();
    if (sw <= 0) return;
    while (pos <= -sw) pos += sw;
    while (pos > 0) pos -= sw;
  };

  // Seamless wrap while dragging — adjusts touchStartPos so finger tracking stays true
  const loopPosDuringDrag = () => {
    const sw = setWidth();
    if (sw <= 0) return;
    while (pos > 0) {
      pos -= sw;
      touchStartPos -= sw;
    }
    while (pos <= -sw) {
      pos += sw;
      touchStartPos += sw;
    }
  };

  const applyPos = () => {
    strip.style.transform = `translate3d(${pos}px,0,0)`;
  };

  let initialized = false;
  const init = () => {
    if (initialized) return;
    const sw = setWidth();
    if (sw <= 0) return;
    // Start one set in so swiping backward from the first card loops smoothly
    pos = -sw;
    applyPos();
    initialized = true;
  };

  // Touch handlers — direct manipulation, no scrollLeft involved
  const onTouchStart = (e: TouchEvent) => {
    isTouching    = true;
    velocity      = 0;
    touchStartX   = e.touches[0].clientX;
    touchStartPos = pos;
    prevX         = touchStartX;
    prevTime      = performance.now();
    bumpInteractionPause();
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isTouching) return;
    const dx = e.touches[0].clientX - touchStartX;
    pos = touchStartPos + dx;
    loopPosDuringDrag();
    applyPos();

    const now = performance.now();
    const dt  = now - prevTime;
    if (dt > 0) {
      // Convert to px-per-frame at 60 fps for momentum
      velocity = ((e.touches[0].clientX - prevX) / dt) * 16.67;
    }
    prevX    = e.touches[0].clientX;
    prevTime = now;
  };

  const onTouchEnd = () => {
    isTouching = false;
    loopPos();
    applyPos();
    bumpInteractionPause();
  };

  const step = (ts: number) => {
    if (!lastTime) lastTime = ts;
    const dt = Math.min(ts - lastTime, 50); // cap to avoid jump after tab-switch
    lastTime = ts;

    if (!isTouching) {
      if (Math.abs(velocity) > 0.3) {
        // Coast to a stop after a swipe
        pos += velocity;
        velocity *= FRICTION;
        loopPos();
        applyPos();
      } else if (
        isInView &&
        !isHovered &&
        !isPausedRef.current &&
        autoScrollEnabled() &&
        Date.now() >= interactionPausedUntil
      ) {
        velocity = 0;
        pos -= (AUTO_SPEED * dt) / 1000;
        loopPos();
        applyPos();
      } else {
        velocity = 0;
      }
    }

    rafId = requestAnimationFrame(step);
  };

  // Desktop hover pauses auto-scroll
  const onMouseEnter = () => { if (isDesktop()) isHovered = true; };
  const onMouseLeave = () => { isHovered = false; };

  // Horizontal trackpad / mouse wheel scrolling on desktop
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      pos -= e.deltaX * 0.8;
      velocity = 0;
      loopPos();
      applyPos();
    }
  };

  const io = new IntersectionObserver(
    ([entry]) => { isInView = entry.isIntersecting; },
    { threshold: 0.05, rootMargin: "40px 0px" }
  );
  io.observe(container);

  const ro = new ResizeObserver(() => { initialized = false; init(); });
  ro.observe(container);

  const t1 = window.setTimeout(init, 50);
  const t2 = window.setTimeout(init, 400);

  container.addEventListener("touchstart",  onTouchStart, { passive: true });
  container.addEventListener("touchmove",   onTouchMove,  { passive: true });
  container.addEventListener("touchend",    onTouchEnd,   { passive: true });
  container.addEventListener("touchcancel", onTouchEnd,   { passive: true });
  container.addEventListener("mouseenter",  onMouseEnter);
  container.addEventListener("mouseleave",  onMouseLeave);
  container.addEventListener("wheel",       onWheel,      { passive: true });

  requestAnimationFrame(init);
  rafId = requestAnimationFrame(step);

  const cleanup = () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    io.disconnect();
    ro.disconnect();
    cancelAnimationFrame(rafId);
    container.removeEventListener("touchstart",  onTouchStart);
    container.removeEventListener("touchmove",   onTouchMove);
    container.removeEventListener("touchend",    onTouchEnd);
    container.removeEventListener("touchcancel", onTouchEnd);
    container.removeEventListener("mouseenter",  onMouseEnter);
    container.removeEventListener("mouseleave",  onMouseLeave);
    container.removeEventListener("wheel",       onWheel);
  };

  return {
    cleanup,
    stopMomentum: () => {
      velocity = 0;
    },
  };
}

function AnimatedStatNumber({
  value,
  suffix = "+",
  duration = 2200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted =
    value >= 1000 ? count.toLocaleString("en-IN") : String(count);

  return (
    <div ref={ref} className="stat-num">
      {formatted}
      {suffix}
    </div>
  );
}

function AnimatedCountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  duration = 2000,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    decimals > 0 ? (0).toFixed(decimals) : "0"
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * value;

          if (decimals > 0) {
            setDisplay(current.toFixed(decimals));
          } else {
            setDisplay(Math.round(current).toLocaleString("en-IN"));
          }

          if (progress < 1) requestAnimationFrame(tick);
          else if (decimals > 0) setDisplay(value.toFixed(decimals));
          else setDisplay(Math.round(value).toLocaleString("en-IN"));
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function DoctorCarouselCard({
  doc,
  setIndex,
  isPaused,
  onTap,
  onBook,
}: {
  doc: Doctor;
  setIndex: number;
  isPaused: boolean;
  onTap: (id: string, e: React.SyntheticEvent) => void;
  onBook: () => void;
}) {
  const isPrimary = setIndex === 0;

  return (
    <div
      className={`doctor-card${isPaused ? " doctor-card-paused" : ""}`}
      onTouchStart={recordTouchStart}
      onClick={(e) => onTap(doc.id, e)}
      onTouchEnd={(e) => onTap(doc.id, e)}
      aria-hidden={isPrimary ? undefined : true}
    >
      <div className="doctor-photo">
        <div className="doctor-avatar" style={{ backgroundColor: doc.avatarColor }}>
          {doc.initials}
        </div>
      </div>
      <div className="doctor-name">{doc.name}</div>
      <div className="doctor-qual">{doc.qualifications}</div>
      <div className="doctor-type">{doc.specialty}</div>
      <div className="doctor-location">📍 {doc.location}</div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
        className="doctor-btn"
      >
        Book Appointment
      </button>
    </div>
  );
}

function ReviewCarouselCard({
  review,
  reviewId,
  setIndex,
  isPaused,
  onTap,
}: {
  review: Review;
  reviewId: string;
  setIndex: number;
  isPaused: boolean;
  onTap: (id: string, e: React.SyntheticEvent) => void;
}) {
  const isPrimary = setIndex === 0;

  return (
    <div
      className={`review-card${isPaused ? " review-card-paused" : ""}`}
      onTouchStart={recordTouchStart}
      onClick={(e) => onTap(reviewId, e)}
      onTouchEnd={(e) => onTap(reviewId, e)}
      aria-hidden={isPrimary ? undefined : true}
    >
      <div className="review-top">
        <div>
          <div className="review-name">{review.name}</div>
          <div className="review-meta">{review.meta}</div>
        </div>
        <div className="review-stars">{review.stars}</div>
      </div>
      <p>{review.text}</p>
    </div>
  );
}

function renderCarouselSets<T>(
  setCount: number,
  items: T[],
  renderItem: (item: T, setIndex: number, cardIndex: number) => React.ReactNode
) {
  return Array.from({ length: setCount }, (_, setIndex) =>
    items.map((item, cardIndex) => renderItem(item, setIndex, cardIndex))
  ).flat();
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showDesktopSticky, setShowDesktopSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const completeCareRef = useRef<HTMLElement>(null);
  const doctorsCarouselRef = useRef<HTMLDivElement>(null);
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const doctorsCarouselCtrlRef = useRef<CarouselController | null>(null);
  const reviewsCarouselCtrlRef = useRef<CarouselController | null>(null);
  const isDoctorsPausedByClickRef = useRef(false);
  const isReviewsPausedByClickRef = useRef(false);
  const doctorTapLockRef = useRef(0);
  const doctorPauseTimerRef = useRef<number | null>(null);
  const [pausedDoctorId, setPausedDoctorId] = useState<string | null>(null);

  const reviewTapLockRef = useRef(0);
  const [pausedReviewId, setPausedReviewId] = useState<string | null>(null);

  const offerTapLockRef = useRef(0);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  useEffect(() => {
    isDoctorsPausedByClickRef.current = pausedDoctorId !== null;
  }, [pausedDoctorId]);

  useEffect(() => {
    return () => {
      if (doctorPauseTimerRef.current !== null) {
        window.clearTimeout(doctorPauseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    isReviewsPausedByClickRef.current = pausedReviewId !== null;
  }, [pausedReviewId]);

  const handleDoctorCardClick = (docId: string) => {
    doctorsCarouselCtrlRef.current?.stopMomentum();

    const isMobileView = window.matchMedia("(max-width: 900px)").matches;
    if (isMobileView) {
      setPausedDoctorId(docId);
      if (doctorPauseTimerRef.current !== null) {
        window.clearTimeout(doctorPauseTimerRef.current);
      }
      doctorPauseTimerRef.current = window.setTimeout(() => {
        setPausedDoctorId(null);
        doctorPauseTimerRef.current = null;
      }, 3000);
      return;
    }

    setPausedDoctorId((current) => (current === docId ? null : docId));
  };

  const handleDoctorCardTap = (docId: string, e: React.SyntheticEvent) => {
    handleSelectableCardTap(docId, e, ".doctor-card", doctorTapLockRef, handleDoctorCardClick, {
      ignoreSelector: ".doctor-btn",
    });
  };

  const handleReviewCardClick = (reviewId: string) => {
    reviewsCarouselCtrlRef.current?.stopMomentum();
    setPausedReviewId((current) => (current === reviewId ? null : reviewId));
  };

  useEffect(() => {
    const track = doctorsCarouselRef.current;
    if (!track) return;
    const ctrl = setupInfiniteCarouselScroll(track, isDoctorsPausedByClickRef, {
      autoScrollOnMobile: true,
      interactionPauseMs: 3000,
    });
    doctorsCarouselCtrlRef.current = ctrl;
    return () => {
      ctrl.cleanup();
      doctorsCarouselCtrlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = reviewsCarouselRef.current;
    if (!track) return;
    const ctrl = setupInfiniteCarouselScroll(track, isReviewsPausedByClickRef, {
      autoScrollOnMobile: true,
      interactionPauseMs: 3000,
    });
    reviewsCarouselCtrlRef.current = ctrl;
    return () => {
      ctrl.cleanup();
      reviewsCarouselCtrlRef.current = null;
    };
  }, []);

  const handleReviewCardTap = (reviewId: string, e: React.SyntheticEvent) => {
    handleSelectableCardTap(reviewId, e, ".review-card", reviewTapLockRef, handleReviewCardClick);
  };

  const handleOfferCardClick = (offerId: string) => {
    setSelectedOfferId((current) => (current === offerId ? null : offerId));
  };

  const handleOfferCardTap = (offerId: string, e: React.SyntheticEvent) => {
    handleSelectableCardTap(offerId, e, ".offer-pill-card", offerTapLockRef, handleOfferCardClick);
  };

  const handleStageIconClick = (stageId: string) => {
    setActiveStageId((current) => (current === stageId ? null : stageId));
  };

  /* Mobile Complete Care wheel — one-shot reveal when scrolled into view */
  useEffect(() => {
    const section = completeCareRef.current;
    if (!section) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const markReady = () => section.classList.add("lc-wheel-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        markReady();
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px 10% 0px" }
    );

    observer.observe(section);
    const fallbackTimer = window.setTimeout(markReady, 800);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

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
  const [highlightNameField, setHighlightNameField] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const highlightNameTimerRef = useRef<number | null>(null);

  /* Desktop: sticky Book Now after hero scrolls away. Mobile: always visible (CSS). */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const desktopMq = window.matchMedia("(min-width: 901px)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!desktopMq.matches) return;
        setShowDesktopSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    const syncForViewport = () => {
      if (!desktopMq.matches) setShowDesktopSticky(false);
    };

    observer.observe(hero);
    desktopMq.addEventListener("change", syncForViewport);
    return () => {
      observer.disconnect();
      desktopMq.removeEventListener("change", syncForViewport);
    };
  }, []);

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

  const focusBookingNameField = () => {
    if (submitSuccess) return;

    const nameInput = nameInputRef.current;
    if (!nameInput) return;

    // Focus synchronously inside the click handler so mobile opens the keyboard.
    nameInput.focus({ preventScroll: true });

    setHighlightNameField(true);
    if (highlightNameTimerRef.current !== null) {
      window.clearTimeout(highlightNameTimerRef.current);
    }
    highlightNameTimerRef.current = window.setTimeout(() => {
      setHighlightNameField(false);
      highlightNameTimerRef.current = null;
    }, 2200);
  };

  const openBookingForm = () => {
    focusBookingNameField();

    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      const navEl = document.querySelector("nav");
      const yOffset = navEl ? -(navEl.getBoundingClientRect().height + 4) : -62;
      const y = bookingEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      const isTouch =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      window.scrollTo({ top: y, behavior: isTouch ? "auto" : "smooth" });
    }

    requestAnimationFrame(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    return () => {
      if (highlightNameTimerRef.current !== null) {
        window.clearTimeout(highlightNameTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="page-shell relative min-h-screen flex flex-col font-sans select-none antialiased bg-[#faf8fc]">
      {/* Scroll Progress Indicator */}
      <div
        id="page-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        className="transition-all duration-75"
      />

      {/* ─── NAV ─── */}
      <nav>
        <a href="#home" className="logo-wrap" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img className="logo-img" src={assetUrl("/motherhood_logo.png")} alt="Motherhood Women & Children's Hospital" />
        </a>
        <div className="nav-right">
          <a href="tel:08069549251" className="nav-phone" aria-label="Call 080 695 49251">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.1 2.38a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.69-1.69a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="currentColor" /></svg>
            <span className="nav-phone-text">080 695 49251</span>
          </a>
          <button onClick={openBookingForm} className="nav-cta hidden sm:inline-block">Book Consultation</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <div ref={heroRef} className="hero" id="home">
        {/* Cloud9-style decorative half-circles */}
        <div className="hero-decor" aria-hidden="true">
          <span className="d1"></span><span className="d2"></span><span className="d3"></span><span className="d4"></span>
        </div>
        {/* Full-bleed background image */}
        <div className="hero-bg">
          {/* Plain img: reliable paths on static export + GitHub Pages basePath */}
          <img
            src={assetUrl("/hero_main.jpg")}
            alt="Mother gently holding her newborn baby"
            className="hero-img"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="hero-top-row">
          {/* LEFT: Offer text overlaid on image */}
          <div className="hero-content">
            <div className="hero-tagline">
              Expert <em>Maternity Care</em> in Chennai<br />
              from your first visit to delivery.
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
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "20px", color: "#0057A4", marginBottom: "10px", lineHeight: "1.2" }}>
                      Thank You!
                    </h3>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "#4A3F40", fontWeight: 400, lineHeight: "1.6", maxWidth: "260px" }}>
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
                      <div className={`form-field${highlightNameField ? " name-field-highlight" : ""}`}>
                        <input
                          ref={nameInputRef}
                          id="booking-name"
                          type="text"
                          name="name"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete="name"
                          enterKeyHint="next"
                          className={formErrors.name ? "border-[#DB5070]" : ""}
                        />
                        {formErrors.name && <span className="text-[10px] font-semibold text-[#DB5070] mt-0.5">{formErrors.name}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone number"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={formErrors.phone ? "border-[#DB5070]" : ""}
                        />
                        {formErrors.phone && <span className="text-[10px] font-semibold text-[#DB5070] mt-0.5">{formErrors.phone}</span>}
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

      {/* ─── STICKY FLOATS (after banner) ─── */}
      <div className={`sticky-desktop${showDesktopSticky ? " is-visible" : ""}`} aria-hidden={!showDesktopSticky}>
        <button type="button" onClick={openBookingForm} className="sticky-float">Book Now</button>
      </div>

      <div className="sticky-mobile is-visible" aria-hidden={false}>
        <button type="button" onClick={openBookingForm} className="btn-primary">Book Now</button>
        <a href="tel:08069549251" className="btn-secondary">Call Now</a>
      </div>

      {/* ─── STATS BAR ─── */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <AnimatedStatNumber value={50000} />
            <div className="stat-label">Mothers supported</div>
          </div>
          <div className="stat-item">
            <AnimatedStatNumber value={15} />
            <div className="stat-label">Specialist doctors</div>
          </div>
          <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">Emergency &amp; labor care</div></div>
          <div className="stat-item"><div className="stat-num">NICU</div><div className="stat-label">Advanced newborn support</div></div>
        </div>
      </div>

      {/* ─── EXCLUSIVE OFFERS ─── */}
      <section className="package-highlight" id="offers">
        <div className="section-inner">
          <h2 className="section-title">Exclusive offers with attractive benefits</h2>

          <div className="offer-cards-row">
            <div
              className={`offer-pill-card c1${selectedOfferId === "offer-c1" ? " offer-pill-card-selected" : ""}`}
              onTouchStart={recordTouchStart}
              onClick={(e) => handleOfferCardTap("offer-c1", e)}
              onTouchEnd={(e) => handleOfferCardTap("offer-c1", e)}
              role="button"
              tabIndex={0}
            >
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
                </div>
              </div>
              <div className="offer-amount">Free</div><div className="offer-label">First Consultation</div>
            </div>

            <div
              className={`offer-pill-card c2${selectedOfferId === "offer-c2" ? " offer-pill-card-selected" : ""}`}
              onTouchStart={recordTouchStart}
              onClick={(e) => handleOfferCardTap("offer-c2", e)}
              onTouchEnd={(e) => handleOfferCardTap("offer-c2", e)}
              role="button"
              tabIndex={0}
            >
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 11h3m0 0h1a1.5 1.5 0 000-3H13v6h4a1.5 1.5 0 000-3H16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="offer-amount">₹10,000 Off</div><div className="offer-label">On your pregnancy journey</div>
            </div>

            <div
              className={`offer-pill-card c3${selectedOfferId === "offer-c3" ? " offer-pill-card-selected" : ""}`}
              onTouchStart={recordTouchStart}
              onClick={(e) => handleOfferCardTap("offer-c3", e)}
              onTouchEnd={(e) => handleOfferCardTap("offer-c3", e)}
              role="button"
              tabIndex={0}
            >
              <div className="offer-icon-wrap">
                <div className="offer-ribbon-icon">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M11 18l-4 10 9-4 9 4-4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 14h6M16 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="offer-amount">₹5,000 off</div><div className="offer-label">On your final bill</div>
            </div>

            <div
              className={`offer-pill-card c4${selectedOfferId === "offer-c4" ? " offer-pill-card-selected" : ""}`}
              onTouchStart={recordTouchStart}
              onClick={(e) => handleOfferCardTap("offer-c4", e)}
              onTouchEnd={(e) => handleOfferCardTap("offer-c4", e)}
              role="button"
              tabIndex={0}
            >
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
        </div>

        <div className="doctors-slider-wrap">
            <div
              className="doctors-track-outer"
              ref={doctorsCarouselRef}
            >
              <div className="doctors-slider">
                {renderCarouselSets(CAROUSEL_SET_COUNT, CHENNAI_DOCTORS, (doc, setIndex, cardIndex) => (
                  <DoctorCarouselCard
                    key={setIndex === 0 ? doc.id : `${doc.id}-s${setIndex}-${cardIndex}`}
                    doc={doc}
                    setIndex={setIndex}
                    isPaused={pausedDoctorId === doc.id}
                    onTap={handleDoctorCardTap}
                    onBook={openBookingForm}
                  />
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* ─── COMPLETE CARE ─── */}
      <section ref={completeCareRef} className="lifecycle-section" id="complete-care">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="lc-heading-badge">
              <div className="lc-pulse"></div>
              <span>Complete Care &middot; Every Stage</span>
            </div>
            <h2 className="section-title">We Complete Care &mdash; Every Step of the Way</h2>
          </div>

          <div className="lc-track">
            <div className="lc-steps">
              {MATERNITY_STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`lc-step${activeStageId === stage.id ? " lc-step-active" : ""}`}
                >
                  <button
                    type="button"
                    className="lc-icon-ring"
                    aria-label={`${stage.title} — show stage details`}
                    aria-pressed={activeStageId === stage.id}
                    onClick={() => handleStageIconClick(stage.id)}
                  >
                    <div className="lc-icon-stack">
                      <div className="lc-orbit-spin" aria-hidden="true">
                        <span className="lc-orbit-dot" />
                      </div>
                      <div className="lc-baby-circle">
                        {stage.renderIcon()}
                      </div>
                    </div>
                  </button>
                  <div className="lc-connector-dot"></div>
                  <div className={`lc-card ${idx % 2 === 1 ? "mt-[48px]" : ""}`}>
                    <div className="lc-step-num">{stage.num}</div>
                    <div className="lc-step-title">
                      <span className="lc-title-desktop">{stage.title}</span>
                      <span className="lc-title-mobile">{stage.shortTitle}</span>
                    </div>
                    <div className="lc-step-desc">{stage.desc}</div>
                    <div className="lc-step-tag">{stage.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lc-cta-strip">
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
            <button type="button" onClick={openBookingForm} className="lc-btn-gold">Start Your Journey &rarr;</button>
          </div>
        </div>
      </section>


      {/* ─── PATIENT REVIEWS ─── */}
      <section className="reviews-section" id="reviews">
        <div className="section-inner">
          <div className="reviews-head">
            <div>
              <h2 className="section-title">What mothers say about Motherhood</h2>
            </div>
            <div className="review-badges-row">
              <div className="review-platform-badge">
                <div className="rpb-logo">
                  <img
                    className="rpb-logo-img"
                    src={assetUrl("/google-logo.svg")}
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <div className="rpb-copy">
                  <div className="rpb-score">
                    <AnimatedCountUp
                      value={4.8}
                      decimals={1}
                      prefix="⭐ "
                      duration={1600}
                    />
                  </div>
                  <div className="rpb-label">
                    Google &middot;{" "}
                    <AnimatedCountUp
                      value={4821}
                      duration={2200}
                      className="rpb-count-up"
                    />
                    {" reviews"}
                  </div>
                </div>
              </div>
              <div className="review-platform-badge">
                <div className="rpb-logo">
                  <img
                    className="rpb-logo-img"
                    src={assetUrl("/practo-p-logo.svg")}
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <div className="rpb-copy">
                  <div className="rpb-score">
                    <AnimatedCountUp
                      value={4.9}
                      decimals={1}
                      prefix="⭐ "
                      duration={1600}
                    />
                  </div>
                  <div className="rpb-label">
                    Practo &middot;{" "}
                    <AnimatedCountUp
                      value={1956}
                      duration={2200}
                      className="rpb-count-up"
                    />
                    {" reviews"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="review-marquee"
          ref={reviewsCarouselRef}
        >
            <div className="review-row">
              {renderCarouselSets(CAROUSEL_SET_COUNT, PATIENT_REVIEWS, (rev, setIndex, cardIndex) => {
                const reviewId = `review-${rev.name}`;
                return (
                  <ReviewCarouselCard
                    key={setIndex === 0 ? `rev-${cardIndex}` : `rev-s${setIndex}-${cardIndex}`}
                    review={rev}
                    reviewId={reviewId}
                    setIndex={setIndex}
                    isPaused={pausedReviewId === reviewId}
                    onTap={handleReviewCardTap}
                  />
                );
              })}
            </div>
        </div>
      </section>

      {/* ─── CONTACT & LOCATION ─── */}
      <section className="location-section" id="location">
        <div className="section-inner">
          <h2 className="section-title">Motherhood Hospital Chennai</h2>

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
                <button onClick={openBookingForm} className="btn-primary">Book Now</button>
                <a href="tel:08069549251" className="btn-secondary">Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Motherhood Hospitals &middot; Chennai &middot; 080 695 49251</p>
          <p className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="footer-sep" aria-hidden="true">|</span>
            <a href="#">Terms &amp; Conditions</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
