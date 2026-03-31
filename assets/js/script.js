const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = [...document.querySelectorAll(".reveal")];
const topbar = document.querySelector(".topbar");
const progressBar = document.querySelector(".scroll-progress");
const siteLoader = document.getElementById("site-loader");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const lightbox = document.getElementById("image-lightbox");
const lightboxDialog = document.querySelector(".lightbox-dialog");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCloseButtons = [...document.querySelectorAll("[data-lightbox-close]")];
const lightboxTriggers = [...document.querySelectorAll(".lightbox-trigger")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const metaDescription = document.querySelector('meta[name="description"]');
const brandLink = document.querySelector(".brand");
const brandLogo = document.querySelector(".brand-logo");
const languageToggle = document.querySelector(".language-toggle");
const languageFlagImage = document.getElementById("language-flag-image");
const heroStaticWord = document.getElementById("hero-static-word");
const typedWord = document.getElementById("typed-word");
const aboutEyebrow = document.querySelector(".about-eyebrow");
const aboutTitle = document.querySelector(".about-title");
const aboutLead = document.querySelector(".about-lead");
const aboutCopyOne = document.querySelector(".about-copy-one");
const aboutCopyTwo = document.querySelector(".about-copy-two");
const aboutTeamShot = document.querySelector(".about-team-shot");
const aboutRobotShot = document.querySelector(".about-robot-shot");
const aboutTeamImage = aboutTeamShot?.querySelector("img");
const aboutRobotImage = aboutRobotShot?.querySelector("img");
const ftcTitle = document.querySelector(".ftc-title");
const ftcSubtitle = document.querySelector(".ftc-subtitle");
const ftcFactOne = document.querySelector(".ftc-fact-one");
const ftcFactTwo = document.querySelector(".ftc-fact-two");
const ftcFactThree = document.querySelector(".ftc-fact-three");
const ftcCtas = [...document.querySelectorAll("#ftc .season-card-cta")];
const currentSeasonBadges = [...document.querySelectorAll(".season-status-current")];
const frcTitle = document.querySelector(".frc-title");
const frcSubtitle = document.querySelector(".frc-subtitle");
const frcFactOne = document.querySelector(".frc-fact-one");
const frcFactTwo = document.querySelector(".frc-fact-two");
const frcFactThree = document.querySelector(".frc-fact-three");
const frcCtas = [...document.querySelectorAll("#frc .season-card-cta")];
const carouselPrevButtons = [...document.querySelectorAll("[data-carousel-prev]")];
const carouselNextButtons = [...document.querySelectorAll("[data-carousel-next]")];
const seasonCarousels = [...document.querySelectorAll("[data-season-carousel]")];
const fgcTitle = document.querySelector(".fgc-title");
const fgcSubtitle = document.querySelector(".fgc-subtitle");
const fgcFactOne = document.querySelector(".fgc-fact-one");
const fgcFactTwo = document.querySelector(".fgc-fact-two");
const fgcFactThree = document.querySelector(".fgc-fact-three");
const fgcCta = document.querySelector(".fgc-cta");
const contactEyebrow = document.querySelector(".contact-eyebrow");
const contactTitle = document.querySelector(".contact-title");
const contactSupportLink = document.querySelector(".contact-support-link");
const contactCopy = document.querySelector(".contact-copy");
const contactForm = document.getElementById("contact-form");
const contactLabelName = document.querySelector(".contact-label-name");
const contactLabelEmail = document.querySelector(".contact-label-email");
const contactLabelMessage = document.querySelector(".contact-label-message");
const contactInputName = document.querySelector(".contact-input-name");
const contactInputEmail = document.querySelector(".contact-input-email");
const contactInputMessage = document.querySelector(".contact-input-message");
const contactFormNote = document.querySelector(".contact-form-note");
const contactSubmit = document.querySelector(".contact-submit");
const contactEmailValue = document.querySelector(".contact-email-value");
const contactEmailLabel = document.querySelector(".contact-email-label");
const contactPhoneLabel = document.querySelector(".contact-phone-label");
const contactNoteLabel = document.querySelector(".contact-note-label");
const contactCorinaRole = document.querySelector(".contact-corina-role");
const contactOctavianRole = document.querySelector(".contact-octavian-role");
const contactSideNote = document.querySelector(".contact-side-note");
const supportPopup = document.getElementById("support-popup");
const supportPopupClose = document.getElementById("support-popup-close");
const supportPopupEyebrow = document.querySelector(".support-popup-eyebrow");
const supportPopupTitle = document.querySelector(".support-popup-title");
const supportPopupCopy = document.querySelector(".support-popup-copy");
const supportPopupLink = document.querySelector(".support-popup-link");
const navLinkMap = {
  home: document.querySelector('[data-nav-link="home"]'),
  ftc: document.querySelector('[data-nav-link="ftc"]'),
  frc: document.querySelector('[data-nav-link="frc"]'),
  fgc: document.querySelector('[data-nav-link="fgc"]'),
  contact: document.querySelector('[data-nav-link="contact"]'),
};

const CONTACT_EMAIL = "contact@deltaforce.ro";
const EMAILJS_PUBLIC_KEY = "rifnckMBE_mNi7VpZ";
const EMAILJS_SERVICE_ID = "service_0jzjlie";
const EMAILJS_TEMPLATE_ID = "template_m4msnqs";

const mojibakePairs = [
  [String.fromCodePoint(0x00C4, 0x201A), "Ă"],
  [String.fromCodePoint(0x00C4, 0x0083), "ă"],
  [String.fromCodePoint(0x0102, 0x201A), "Â"],
  [String.fromCodePoint(0x0102, 0x02D8), "â"],
  [String.fromCodePoint(0x0102, 0x017D), "Î"],
  [String.fromCodePoint(0x0102, 0x00AE), "î"],
  [String.fromCodePoint(0x010C, 0x0098), "Ș"],
  [String.fromCodePoint(0x010C, 0x2122), "ș"],
  [String.fromCodePoint(0x010C, 0x0161), "Ț"],
  [String.fromCodePoint(0x010C, 0x203A), "ț"],
  [String.fromCodePoint(0x00C2, 0x00AB), "«"],
  [String.fromCodePoint(0x00C2, 0x00BB), "»"],
];

const repairMojibakeString = (value) => {
  if (typeof value !== "string") return value;

  let repaired = value;

  mojibakePairs.forEach(([broken, fixed]) => {
    repaired = repaired.split(broken).join(fixed);
  });

  return repaired;
};

const repairNestedStrings = (value) => {
  if (typeof value === "string") {
    return repairMojibakeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(repairNestedStrings);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, repairNestedStrings(entry)])
    );
  }

  return value;
};

const repairRenderedText = (root = document.body) => {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  const attributeNames = [
    "aria-label",
    "title",
    "alt",
    "placeholder",
    "content",
    "data-lightbox-title",
  ];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parentTag = node.parentElement?.tagName;
    if (parentTag === "SCRIPT" || parentTag === "STYLE") continue;
    textNodes.push(node);
  }

  textNodes.forEach((node) => {
    const fixed = repairMojibakeString(node.nodeValue);
    if (fixed !== node.nodeValue) {
      node.nodeValue = fixed;
    }
  });

  root.querySelectorAll?.("*").forEach((element) => {
    attributeNames.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const value = element.getAttribute(attribute);
      const fixed = repairMojibakeString(value);
      if (fixed !== value) {
        element.setAttribute(attribute, fixed);
      }
    });
  });
};

const translations = {
  ro: {
    meta: {
      title: "Delta Force Robotics | FRC 9001 & FTC 17713",
      description: "Delta Force Robotics - site cinematic pentru FRC 9001 și FTC 17713, organizat pe sezoane și competiții.",
    },
    brandAria: "Pagina principală Delta Force",
    navToggleLabel: "Deschide meniul de navigare",
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    language: {
      image: "assets/images/flags/romania.png",
      label: "Schimbă în engleză",
    },
    hero: {
      static: "CONSTRUIM",
      words: [
        "ALIANȚE",
        "LIDERI",
        "CAMPIONI",
        "COMUNITATE",
        "VIITOR",
      ],
      logoAlt: "Sigla Delta Force",
    },
    about: {
      eyebrow: "Despre noi",
      title: "Delta Force Robotics",
      lead: "Suntem Delta Force, echipa de robotică a Liceului Național de Informatică Arad, fondată în 2018.",
      copyOne:
        "Am pornit la drum cu resurse limitate, dar prin perseverență, învățare continuă și colaborare am crescut într-o echipă stabilă, cu un laborator dedicat și o comunitate care ne susține.",
      copyTwo:
        "Credem în fair-play, respect reciproc și sprijin între echipe, iar modul nostru de lucru se bazează pe prototipare, testare și asumarea responsabilității față de obiectivele echipei și față de comunitatea FIRST.",
      teamAlt: "Fotografie de grup a echipei Delta Force",
      teamAria: "Deschide fotografia de grup",
      teamLightboxTitle: "Fotografie de grup Delta Force",
      robotAlt: "Robotul echipei Delta Force",
      robotAria: "Deschide fotografia robotului",
      robotLightboxTitle: "Robot Delta Force",
    },
    ftc: {
      title: "FIRST Tech Challenge",
      subtitle:
        "Competiție pentru roboți de dimensiuni mici, construiți și programați de elevi, în meciuri rapide și foarte tehnice.",
      factOne: "roboți de mici dimensiuni",
      factTwo: "alianțe de câte 2 echipe",
      factThree: "iterare, autonomie și driver control",
      cta: "Vizualizează sezonul",
      currentBadge: "Actual",
    },
    frc: {
      title: "FIRST Robotics Competition",
      subtitle:
        "Competiție pentru roboți de mari dimensiuni, unde designul mecanic, strategia și rezistența fac diferența.",
      factOne: "roboți de mari dimensiuni",
      factTwo: "alianțe de câte 3 echipe",
      factThree: "strategie, impact și meciuri intense",
      cta: "Vizualizează sezonul",
    },
    fgc: {
      title: "FIRST Global Challenge",
      subtitle:
        "Competiție internațională de robotică în care fiecare țară vine cu o singură echipă. Pentru noi, FGC înseamnă reprezentarea României într-un format axat pe STEM, colaborare și impact global.",
      program: "Participarea Delta Force la competiția globală FIRST",
      cta: "Vezi participarea",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contactează-ne",
      supportCta: "Susține-ne",
      copy:
        "Dacă vrei să colaborezi cu echipa, să ne susții sau să afli mai multe despre activitatea noastră, ne poți scrie direct aici.",
      formName: "Nume",
      formEmail: "Email",
      formMessage: "Mesaj",
      formNamePlaceholder: "Cum te numești",
      formEmailPlaceholder: "adresa@exemplu.com",
      formMessagePlaceholder: "Spune-ne cu ce te putem ajuta",
      formNote: "Mesajele se trimit direct din site către contact@deltaforce.ro.",
      formValidation: "Completează numele, emailul și mesajul înainte să trimiți.",
      formInvalidEmail: "Introdu o adresă de email validă înainte să trimiți.",
      formSending: "Trimitem mesajul acum...",
      formSuccess: "Mesaj trimis. Revenim cât mai curând.",
      formFailure: "N-am reușit să trimitem mesajul acum. Încearcă din nou sau scrie-ne la contact@deltaforce.ro.",
      formFailureWithReason: "N-am reușit să trimitem mesajul: {reason}",
      submit: "Trimite mesaj",
      submitSending: "Se trimite...",
      emailLabel: "Email",
      phoneLabel: "Numere de telefon",
      noteLabel: "Colaborări",
      corinaRole: "Corina Botosan - Mentor",
      octavianRole: "Octavian Botosan - Mentor",
      sideNote:
        "Pentru parteneriate, sponsorizări sau oportunități educaționale, ne poți contacta direct prin email sau telefon.",
    },
    supportPopup: {
      ariaLabel: "Susținere Delta Force",
      closeLabel: "Închide fereastra",
      eyebrow: "SUSȚINE DELTA FORCE",
      title: "Susținerea ta contează",
      copy:
        "Intră pe pagina de susținere și vezi variantele prin care ne poți ajuta să ajungem mai aproape de competiția mondială.",
      cta: "Vezi cum poți ajuta",
    },
    footer: {
      ftc: "Arhiva FTC",
      frc: "Arhiva FRC",
    },
    carousel: {
      prev: "Sezonul anterior",
      next: "Sezonul următor",
    },
    lightbox: {
      dialogLabel: "Vizualizare imagine",
      closeLabel: "Închide imaginea",
      closeText: "Închide",
    },
  },
  en: {
    meta: {
      title: "Delta Force Robotics | FRC 9001 & FTC 17713",
      description: "Delta Force Robotics - cinematic archive for FRC 9001 and FTC 17713, organized by seasons and competitions.",
    },
    brandAria: "Delta Force home page",
    navToggleLabel: "Toggle navigation",
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    language: {
      image: "assets/images/flags/england.png",
      label: "Switch to Romanian",
    },
    hero: {
      static: "WE BUILD",
      words: [
        "ALLIANCES",
        "LEADERS",
        "CHAMPIONS",
        "COMMUNITY",
        "FUTURE",
      ],
      logoAlt: "Delta Force logo",
    },
    about: {
      eyebrow: "About Us",
      title: "Delta Force Robotics",
      lead: "We are Delta Force, the robotics team of the National High School of Computer Science in Arad, founded in 2018.",
      copyOne:
        "We started with limited resources, but through perseverance, constant learning, and collaboration, we grew into a stable team with a dedicated lab and a community that supports us.",
      copyTwo:
        "We believe in fair play, mutual respect, and support between teams, and our way of working is built on prototyping, testing, and taking responsibility for the team's goals and for the FIRST community.",
      teamAlt: "Delta Force team group photo",
      teamAria: "Open the team group photo",
      teamLightboxTitle: "Delta Force team group photo",
      robotAlt: "Delta Force team robot",
      robotAria: "Open the robot photo",
      robotLightboxTitle: "Delta Force robot",
    },
    ftc: {
      title: "FIRST Tech Challenge",
      subtitle:
        "A competition for smaller robots built and programmed by students, focused on fast matches and precise technical execution.",
      factOne: "small-size robots",
      factTwo: "2-team alliances",
      factThree: "iteration, autonomy, driver control",
      cta: "View season",
      currentBadge: "Current",
    },
    frc: {
      title: "FIRST Robotics Competition",
      subtitle:
        "A competition for larger robots where mechanical design, strategy, and resilience make the difference.",
      factOne: "large-scale robots",
      factTwo: "3-team alliances",
      factThree: "strategy, impact, intense matches",
      cta: "View season",
    },
    fgc: {
      title: "FIRST Global Challenge",
      subtitle:
        "An international robotics competition where each country enters with a single team. For us, FGC means representing Romania in a format built around STEM, collaboration, and global impact.",
      program: "Delta Force at the global FIRST competition",
      cta: "View story",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact us",
      supportCta: "Support us",
      copy:
        "If you want to collaborate with the team, support us, or learn more about our work, you can message us directly here.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formNamePlaceholder: "What is your name",
      formEmailPlaceholder: "address@example.com",
      formMessagePlaceholder: "Tell us how we can help",
      formNote: "Messages are sent directly from the site to contact@deltaforce.ro.",
      formValidation: "Please complete your name, email, and message before sending.",
      formInvalidEmail: "Please enter a valid email address before sending.",
      formSending: "Sending your message now...",
      formSuccess: "Message sent. We will get back to you soon.",
      formFailure: "We could not send the message right now. Please try again or write to contact@deltaforce.ro.",
      formFailureWithReason: "We could not send the message: {reason}",
      submit: "Send message",
      submitSending: "Sending...",
      emailLabel: "Email",
      phoneLabel: "Phone numbers",
      noteLabel: "Collaborations",
      corinaRole: "Corina Botosan - Mentor",
      octavianRole: "Octavian Botosan - Mentor",
      sideNote:
        "For partnerships, sponsorships, or educational opportunities, you can contact us directly by email or phone.",
    },
    supportPopup: {
      ariaLabel: "Delta Force support",
      closeLabel: "Close the popup",
      eyebrow: "SUPPORT DELTA FORCE",
      title: "Your support matters",
      copy:
        "Visit the support page and choose the option that helps us move closer to the world championship.",
      cta: "See how you can help",
    },
    footer: {
      ftc: "FTC Archive",
      frc: "FRC Archive",
    },
    carousel: {
      prev: "Previous season",
      next: "Next season",
    },
    lightbox: {
      dialogLabel: "Image viewer",
      closeLabel: "Close image",
      closeText: "Exit",
    },
  },
};

Object.keys(translations).forEach((language) => {
  translations[language] = repairNestedStrings(translations[language]);
});

translations.ro.fgc = {
  title: "FIRST Global Challenge",
  subtitle:
    "Competiție internațională de robotică în care fiecare țară vine cu o singură echipă. Pentru noi, FGC înseamnă reprezentarea României într-un format axat pe STEM, colaborare și impact global.",
  factOne: "o singură echipă pentru fiecare țară",
  factTwo: "România într-o competiție globală",
  factThree: "robotică, STEM și colaborare internațională",
  program: "Participarea Delta Force la competiția globală FIRST",
  coverTitle: "România la FGC 2023",
  coverCopy:
    "Povestea participării noastre într-o competiție internațională unde fiecare țară este reprezentată de o singură echipă.",
  cta: "Vezi participarea",
};

translations.en.fgc = {
  title: "FIRST Global Challenge",
  subtitle:
    "An international robotics competition where each country enters with a single team. For us, FGC means representing Romania in a format built around STEM, collaboration, and global impact.",
  factOne: "one team for each country",
  factTwo: "Romania in a global competition",
  factThree: "robotics, STEM and international collaboration",
  program: "Delta Force at the global FIRST competition",
  coverTitle: "Romania at FGC 2023",
  coverCopy:
    "The story of our participation in an international competition where each country is represented by a single team.",
  cta: "View story",
};

let currentLanguage = "ro";
let typeTimeoutId = null;
let reducedIntervalId = null;
let words = [...translations.ro.hero.words];
let wordIndex = 0;
let charIndex = words[0].length;
let isDeleting = false;
const introStartedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
const loaderMinimumDuration = prefersReducedMotion ? 320 : 1480;
let siteEntranceCompleted = false;

const showTopbar = () => {
  if (!topbar) return;
  topbar.classList.add("is-visible");
};

const clearTypeTimers = () => {
  if (typeTimeoutId) {
    window.clearTimeout(typeTimeoutId);
    typeTimeoutId = null;
  }

  if (reducedIntervalId) {
    window.clearInterval(reducedIntervalId);
    reducedIntervalId = null;
  }
};

const startTypewriter = (nextWords) => {
  if (!typedWord || !nextWords.length) return;

  clearTypeTimers();

  words = [...nextWords];
  wordIndex = 0;
  charIndex = words[0].length;
  isDeleting = false;
  typedWord.textContent = words[0];

  if (prefersReducedMotion) {
    let reducedIndex = 0;
    reducedIntervalId = window.setInterval(() => {
      reducedIndex = (reducedIndex + 1) % words.length;
      typedWord.textContent = words[reducedIndex];
    }, 1800);
    return;
  }

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    typedWord.textContent = currentWord.slice(0, charIndex);

    let delay = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1350;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 220;
    } else {
      charIndex += isDeleting ? -1 : 1;
    }

    typeTimeoutId = window.setTimeout(typeEffect, delay);
  };

  typeTimeoutId = window.setTimeout(typeEffect, 1200);
};

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage) return;

  const image = trigger.querySelector("img");
  if (!image) return;

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  body.classList.add("lightbox-open");
};

const closeLightbox = () => {
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  body.classList.remove("lightbox-open");
};

const showSupportPopup = () => {
  if (!(supportPopup instanceof HTMLElement)) return;

  supportPopup.hidden = false;
  window.requestAnimationFrame(() => {
    supportPopup.classList.add("is-visible");
  });
};

const dismissSupportPopup = () => {
  if (!(supportPopup instanceof HTMLElement)) return;

  supportPopup.classList.remove("is-visible");

  window.setTimeout(() => {
    supportPopup.hidden = true;
  }, 220);
};

const getContactCopy = () => (translations[currentLanguage] ?? translations.ro).contact;

const setContactFormNote = (message) => {
  if (contactFormNote) {
    contactFormNote.textContent = message;
  }
};

const setContactSubmitState = (isSending) => {
  if (!(contactSubmit instanceof HTMLButtonElement)) return;

  const contactCopy = getContactCopy();
  contactSubmit.disabled = isSending;
  contactSubmit.textContent = isSending ? contactCopy.submitSending : contactCopy.submit;
};

const ensureEmailJs = () => {
  const emailjsClient = window.emailjs;

  if (!emailjsClient?.send || !emailjsClient?.init) {
    return null;
  }

  if (!ensureEmailJs.initialized) {
    emailjsClient.init({ publicKey: EMAILJS_PUBLIC_KEY });
    ensureEmailJs.initialized = true;
  }

  return emailjsClient;
};

const finalizeSiteEntrance = () => {
  if (siteEntranceCompleted) return;
  siteEntranceCompleted = true;

  body.classList.remove("is-loading");
  body.classList.add("is-loaded");
  showTopbar();
  showSupportPopup();

  if (siteLoader instanceof HTMLElement) {
    siteLoader.classList.add("is-hidden");
    window.setTimeout(() => {
      siteLoader.remove();
    }, 560);
  }
};

const getCarouselStep = (track) => {
  const firstCard = track.querySelector(".season-card");
  if (!(firstCard instanceof HTMLElement)) {
    return track.clientWidth;
  }

  const trackStyles = window.getComputedStyle(track);
  const gap = Number.parseFloat(trackStyles.gap || trackStyles.columnGap || "0") || 0;
  return firstCard.getBoundingClientRect().width + gap;
};

const getCarouselIndex = (track, cards) => {
  const trackLeft = track.getBoundingClientRect().left;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

const syncSeasonCarousel = (carousel) => {
  const track = carousel.querySelector(".season-track");
  const cards = [...carousel.querySelectorAll(".season-card")];
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const currentValue = carousel.querySelector("[data-carousel-current]");
  const totalValue = carousel.querySelector("[data-carousel-total]");

  if (!(track instanceof HTMLElement) || !cards.length) return;

  const activeIndex = getCarouselIndex(track, cards);

  if (currentValue) {
    currentValue.textContent = String(activeIndex + 1);
  }

  if (totalValue) {
    totalValue.textContent = String(cards.length);
  }

  if (prevButton instanceof HTMLButtonElement) {
    prevButton.disabled = activeIndex <= 0;
  }

  if (nextButton instanceof HTMLButtonElement) {
    nextButton.disabled = activeIndex >= cards.length - 1;
  }
};

const initializeSeasonCarousel = (carousel) => {
  const track = carousel.querySelector(".season-track");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");

  if (!(track instanceof HTMLElement)) return;

  const scrollByStep = (direction) => {
    const step = getCarouselStep(track);
    track.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  prevButton?.addEventListener("click", () => scrollByStep(-1));
  nextButton?.addEventListener("click", () => scrollByStep(1));

  let frameId = null;
  track.addEventListener(
    "scroll",
    () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        syncSeasonCarousel(carousel);
        frameId = null;
      });
    },
    { passive: true }
  );

  syncSeasonCarousel(carousel);
};

const applyLanguage = (language) => {
  const copy = translations[language] ?? translations.ro;

  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = copy.meta.title;
  metaDescription?.setAttribute("content", copy.meta.description);
  brandLink?.setAttribute("aria-label", copy.brandAria);
  brandLogo?.setAttribute("alt", copy.hero.logoAlt);
  navToggle?.setAttribute("aria-label", copy.navToggleLabel);

  Object.entries(copy.nav).forEach(([key, label]) => {
    navLinkMap[key]?.replaceChildren(document.createTextNode(label));
  });

  if (languageToggle) {
    languageToggle.setAttribute("aria-label", copy.language.label);
    languageToggle.setAttribute("title", copy.language.label);
    languageToggle.setAttribute("aria-pressed", String(language === "en"));
  }

  if (languageFlagImage) {
    languageFlagImage.src = copy.language.image;
  }

  if (heroStaticWord) {
    heroStaticWord.textContent = copy.hero.static;
  }

  aboutEyebrow && (aboutEyebrow.textContent = copy.about.eyebrow);
  aboutTitle && (aboutTitle.textContent = copy.about.title);
  aboutLead && (aboutLead.textContent = copy.about.lead);
  aboutCopyOne && (aboutCopyOne.textContent = copy.about.copyOne);
  aboutCopyTwo && (aboutCopyTwo.textContent = copy.about.copyTwo);

  aboutTeamShot?.setAttribute("aria-label", copy.about.teamAria);
  aboutTeamShot?.setAttribute("data-lightbox-title", copy.about.teamLightboxTitle);
  aboutTeamImage?.setAttribute("alt", copy.about.teamAlt);

  aboutRobotShot?.setAttribute("aria-label", copy.about.robotAria);
  aboutRobotShot?.setAttribute("data-lightbox-title", copy.about.robotLightboxTitle);
  aboutRobotImage?.setAttribute("alt", copy.about.robotAlt);

  ftcTitle && (ftcTitle.textContent = copy.ftc.title);
  ftcSubtitle && (ftcSubtitle.textContent = copy.ftc.subtitle);
  ftcFactOne && (ftcFactOne.textContent = copy.ftc.factOne);
  ftcFactTwo && (ftcFactTwo.textContent = copy.ftc.factTwo);
  ftcFactThree && (ftcFactThree.textContent = copy.ftc.factThree);
  ftcCtas.forEach((cta) => {
    cta.textContent = copy.ftc.cta;
  });
  currentSeasonBadges.forEach((badge) => {
    badge.textContent = copy.ftc.currentBadge;
  });

  frcTitle && (frcTitle.textContent = copy.frc.title);
  frcSubtitle && (frcSubtitle.textContent = copy.frc.subtitle);
  frcFactOne && (frcFactOne.textContent = copy.frc.factOne);
  frcFactTwo && (frcFactTwo.textContent = copy.frc.factTwo);
  frcFactThree && (frcFactThree.textContent = copy.frc.factThree);
  frcCtas.forEach((cta) => {
    cta.textContent = copy.frc.cta;
  });

  carouselPrevButtons.forEach((button) => {
    button.setAttribute("aria-label", copy.carousel.prev);
    button.setAttribute("title", copy.carousel.prev);
  });

  carouselNextButtons.forEach((button) => {
    button.setAttribute("aria-label", copy.carousel.next);
    button.setAttribute("title", copy.carousel.next);
  });

  fgcTitle && (fgcTitle.textContent = copy.fgc.title);
  fgcSubtitle && (fgcSubtitle.textContent = copy.fgc.subtitle);
  fgcFactOne && (fgcFactOne.textContent = copy.fgc.factOne);
  fgcFactTwo && (fgcFactTwo.textContent = copy.fgc.factTwo);
  fgcFactThree && (fgcFactThree.textContent = copy.fgc.factThree);
  fgcCta && (fgcCta.textContent = copy.fgc.cta);

  contactEyebrow && (contactEyebrow.textContent = copy.contact.eyebrow);
  contactTitle && (contactTitle.textContent = copy.contact.title);
  contactSupportLink && (contactSupportLink.textContent = copy.contact.supportCta);
  contactCopy && (contactCopy.textContent = copy.contact.copy);
  contactLabelName && (contactLabelName.textContent = copy.contact.formName);
  contactLabelEmail && (contactLabelEmail.textContent = copy.contact.formEmail);
  contactLabelMessage && (contactLabelMessage.textContent = copy.contact.formMessage);
  contactInputName?.setAttribute("placeholder", copy.contact.formNamePlaceholder);
  contactInputEmail?.setAttribute("placeholder", copy.contact.formEmailPlaceholder);
  contactInputMessage?.setAttribute("placeholder", copy.contact.formMessagePlaceholder);
  contactFormNote && (contactFormNote.textContent = copy.contact.formNote);
  contactSubmit && (contactSubmit.textContent = copy.contact.submit);
  if (contactEmailValue) {
    contactEmailValue.textContent = CONTACT_EMAIL;
    contactEmailValue.setAttribute("href", `mailto:${CONTACT_EMAIL}`);
  }
  contactEmailLabel && (contactEmailLabel.textContent = copy.contact.emailLabel);
  contactPhoneLabel && (contactPhoneLabel.textContent = copy.contact.phoneLabel);
  contactNoteLabel && (contactNoteLabel.textContent = copy.contact.noteLabel);
  contactCorinaRole && (contactCorinaRole.textContent = copy.contact.corinaRole);
  contactOctavianRole && (contactOctavianRole.textContent = copy.contact.octavianRole);
  contactSideNote && (contactSideNote.textContent = copy.contact.sideNote);

  supportPopup?.setAttribute("aria-label", copy.supportPopup.ariaLabel);
  supportPopupClose?.setAttribute("aria-label", copy.supportPopup.closeLabel);
  supportPopupEyebrow && (supportPopupEyebrow.textContent = copy.supportPopup.eyebrow);
  supportPopupTitle && (supportPopupTitle.textContent = copy.supportPopup.title);
  supportPopupCopy && (supportPopupCopy.textContent = copy.supportPopup.copy);
  supportPopupLink && (supportPopupLink.textContent = copy.supportPopup.cta);

  lightboxDialog?.setAttribute("aria-label", copy.lightbox.dialogLabel);
  lightboxCloseButtons.forEach((button) => {
    button.setAttribute("aria-label", copy.lightbox.closeLabel);
    button.textContent = copy.lightbox.closeText;
  });

  startTypewriter(copy.hero.words);

  try {
    window.localStorage.setItem("delta-language", language);
  } catch {}

  repairRenderedText(document.body);
  document.title = repairMojibakeString(document.title);
  if (metaDescription) {
    metaDescription.setAttribute("content", repairMojibakeString(metaDescription.getAttribute("content") ?? ""));
  }
};

window.addEventListener("load", () => {
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  const elapsed = now - introStartedAt;
  const remaining = Math.max(0, loaderMinimumDuration - elapsed);

  window.setTimeout(finalizeSiteEntrance, remaining);
});

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

seasonCarousels.forEach((carousel) => {
  initializeSeasonCarousel(carousel);
});

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  showTopbar();

  topbar?.classList.toggle("is-scrolled", scrollTop > 16);

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  let activeIndex = 0;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 160;
    if (scrollTop >= sectionTop) {
      activeIndex = index;
    }
  });

  navLinks.forEach((link, index) => {
    link.classList.toggle("is-active", index === activeIndex);
  });
};

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
window.addEventListener("resize", () => {
  seasonCarousels.forEach((carousel) => syncSeasonCarousel(carousel));
});

const closeNavMenu = () => {
  navToggle?.setAttribute("aria-expanded", "false");
  navMenu?.classList.remove("is-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu?.classList.toggle("is-open", !isOpen);
  showTopbar();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNavMenu();
    showTopbar();
  });
});

document.addEventListener("click", (event) => {
  if (!navMenu?.classList.contains("is-open")) return;
  if (!(event.target instanceof Node)) return;
  if (navMenu.contains(event.target) || navToggle?.contains(event.target)) return;
  closeNavMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeNavMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeNavMenu();
  }
});

languageToggle?.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "ro" ? "en" : "ro";
  applyLanguage(nextLanguage);
});

supportPopupClose?.addEventListener("click", dismissSupportPopup);

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contactCopy = getContactCopy();
  const name = contactInputName?.value.trim() ?? "";
  const email = contactInputEmail?.value.trim() ?? "";
  const message = contactInputMessage?.value.trim() ?? "";

  if (!name || !email || !message) {
    setContactFormNote(contactCopy.formValidation);

    if (!name) {
      contactInputName?.focus();
      contactInputName?.reportValidity?.();
      return;
    }

    if (!email) {
      contactInputEmail?.focus();
      contactInputEmail?.reportValidity?.();
      return;
    }

    contactInputMessage?.focus();
    contactInputMessage?.reportValidity?.();
    return;
  }

  if (contactInputEmail instanceof HTMLInputElement && !contactInputEmail.checkValidity()) {
    setContactFormNote(contactCopy.formInvalidEmail);
    contactInputEmail.focus();
    contactInputEmail.reportValidity();
    return;
  }

  const emailjsClient = ensureEmailJs();

  if (!emailjsClient) {
    setContactFormNote(contactCopy.formFailure);
    return;
  }

  const subject = currentLanguage === "en" ? `Website message from ${name}` : `Mesaj de pe site de la ${name}`;
  const timestamp = new Intl.DateTimeFormat(currentLanguage === "en" ? "en-GB" : "ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  const templateParams = {
    name,
    email,
    message,
    subject,
    to_email: CONTACT_EMAIL,
    from_name: name,
    from_email: email,
    reply_to: email,
    reply_email: email,
    sender_name: name,
    sender_email: email,
    user_name: name,
    user_email: email,
    file_name: currentLanguage === "en" ? "No attachment" : "Fără atașament",
    time: timestamp,
    message_html: message.replace(/\n/g, "<br>"),
  };

  setContactSubmitState(true);
  setContactFormNote(contactCopy.formSending);

  try {
    await emailjsClient.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    contactForm.reset();
    setContactFormNote(contactCopy.formSuccess);
  } catch (error) {
    console.error("EmailJS send failed", error);
    const reason =
      error?.text ||
      error?.message ||
      (typeof error === "string" ? error : "") ||
      contactCopy.formFailure;
    const message = contactCopy.formFailureWithReason.replace("{reason}", reason);
    setContactFormNote(message);
  } finally {
    setContactSubmitState(false);
  }
});

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));

  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openLightbox(trigger);
  });
});

lightboxCloseButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

lightbox?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }
});

const storedLanguage = (() => {
  try {
    return window.localStorage.getItem("delta-language");
  } catch {
    return null;
  }
})();

applyLanguage(storedLanguage === "en" ? "en" : "ro");


