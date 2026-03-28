const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = [...document.querySelectorAll(".reveal")];
const topbar = document.querySelector(".topbar");
const progressBar = document.querySelector(".scroll-progress");
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
const ftcCtas = [...document.querySelectorAll("#ftc .season-card-cta")];
const currentSeasonBadges = [...document.querySelectorAll(".season-status-current")];
const frcTitle = document.querySelector(".frc-title");
const frcSubtitle = document.querySelector(".frc-subtitle");
const frcCtas = [...document.querySelectorAll("#frc .season-card-cta")];
const eventsEyebrow = document.querySelector(".events-eyebrow");
const eventsTitle = document.querySelector(".events-title");
const eventsSubtitle = document.querySelector(".events-subtitle");
const eventLabelPremier = document.querySelector(".event-label-premier");
const eventTitlePremier = document.querySelector(".event-title-premier");
const eventCopyPremier = document.querySelector(".event-copy-premier");
const eventCtaPremier = document.querySelector(".event-cta-premier");
const eventLabelInvitational = document.querySelector(".event-label-invitational");
const eventTitleInvitational = document.querySelector(".event-title-invitational");
const eventCopyInvitational = document.querySelector(".event-copy-invitational");
const eventCtaInvitational = document.querySelector(".event-cta-invitational");
const fgcTitle = document.querySelector(".fgc-title");
const fgcSubtitle = document.querySelector(".fgc-subtitle");
const fgcProgramLabel = document.querySelector(".fgc-program-label");
const fgcCta = document.querySelector(".fgc-cta");
const sponsorsEyebrow = document.querySelector(".sponsors-eyebrow");
const sponsorsTitle = document.querySelector(".sponsors-title");
const sponsorsSubtitle = document.querySelector(".sponsors-subtitle");
const sponsorsMarquee = document.querySelector(".sponsors-marquee");
const partnersEyebrow = document.querySelector(".partners-eyebrow");
const partnersTitle = document.querySelector(".partners-title");
const partnersSubtitle = document.querySelector(".partners-subtitle");
const partnerNameLiceu = document.querySelector(".partner-name-liceu");
const partnerDescLiceu = document.querySelector(".partner-desc-liceu");
const partnerNameUav = document.querySelector(".partner-name-uav");
const partnerDescUav = document.querySelector(".partner-desc-uav");
const contactEyebrow = document.querySelector(".contact-eyebrow");
const contactTitle = document.querySelector(".contact-title");
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
const contactEmailLabel = document.querySelector(".contact-email-label");
const contactPhoneLabel = document.querySelector(".contact-phone-label");
const contactNoteLabel = document.querySelector(".contact-note-label");
const contactCorinaRole = document.querySelector(".contact-corina-role");
const contactOctavianRole = document.querySelector(".contact-octavian-role");
const contactSideNote = document.querySelector(".contact-side-note");
const footerFtcLink = document.querySelector('[data-footer-link="ftc"]');
const footerFrcLink = document.querySelector('[data-footer-link="frc"]');
const footerEventsLink = document.querySelector('[data-footer-link="events"]');
const footerPartnersLink = document.querySelector('[data-footer-link="partners"]');
const navLinkMap = {
  home: document.querySelector('[data-nav-link="home"]'),
  ftc: document.querySelector('[data-nav-link="ftc"]'),
  frc: document.querySelector('[data-nav-link="frc"]'),
  events: document.querySelector('[data-nav-link="events"]'),
  fgc: document.querySelector('[data-nav-link="fgc"]'),
  sponsors: document.querySelector('[data-nav-link="sponsors"]'),
  partners: document.querySelector('[data-nav-link="partners"]'),
  contact: document.querySelector('[data-nav-link="contact"]'),
};

const translations = {
  ro: {
    meta: {
      title: "Delta Force Robotics | FRC 9001 & FTC 17713",
      description: "Delta Force Robotics - site cinematic pentru FRC 9001 si FTC 17713, organizat pe sezoane si competitii.",
    },
    brandAria: "Pagina principala Delta Force",
    navToggleLabel: "Deschide meniul de navigare",
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      events: "Evenimente",
      fgc: "FGC",
      sponsors: "Sponsori",
      partners: "Parteneri",
      contact: "Contact",
    },
    language: {
      image: "Flags/romania.png",
      label: "Schimba in engleza",
    },
    hero: {
      static: "CONSTRUIM",
      words: [
        "ROBOTI",
        "ECHIPE",
        "AUTONOMII",
        "ALIANTE",
        "COMUNITATE",
        "LIDERI",
        "CAMPIONI",
        "VIITOR",
      ],
      logoAlt: "Sigla Delta Force",
    },
    about: {
      eyebrow: "Despre noi",
      title: "Delta Force Robotics",
      lead: "Suntem Delta Force, echipa de robotica a Liceului National de Informatica Arad, fondata in 2018.",
      copyOne:
        "Am pornit la drum cu resurse limitate, dar prin perseverenta, invatare continua si colaborare am crescut intr-o echipa stabila, cu un laborator dedicat si o comunitate care ne sustine.",
      copyTwo:
        "Credem in fair-play, respect reciproc si sprijin intre echipe, iar modul nostru de lucru se bazeaza pe prototipare, testare si asumare a responsabilitatii fata de obiectivele echipei si fata de comunitatea FIRST.",
      teamAlt: "Fotografie de grup a echipei Delta Force",
      teamAria: "Deschide fotografia de grup",
      teamLightboxTitle: "Fotografie de grup Delta Force",
      robotAlt: "Robotul echipei Delta Force",
      robotAria: "Deschide fotografia robotului",
      robotLightboxTitle: "Robot Delta Force",
    },
    ftc: {
      title: "First Tech Challenge",
      subtitle:
        "De la primul sezon pana in prezent, o privire asupra fiecarui an de competitie, provocarilor pe care le-am infruntat si progresului pe care l-am facut ca echipa.",
      cta: "Vizualizeaza sezonul",
      currentBadge: "Actual",
    },
    frc: {
      title: "FRC are propria sectiune, separata si usor de parcurs.",
      subtitle:
        "Am pastrat doar sezoanele FRC, fiecare cu propriul cover, ca arhiva sa ramana curata si usor de parcurs.",
      cta: "Vizualizeaza sezonul",
    },
    events: {
      eyebrow: "Special",
      title: "Evenimente premier / invitationale",
      subtitle:
        "O zona separata pentru aparitii speciale, invitationale si momente care merita propria pagina, nu doar un loc pierdut intre sezoane.",
      premierLabel: "Premier",
      premierTitle: "Evenimente Premier",
      premierCopy:
        "Prezentari, aparitii speciale si momente de referinta puse intr-un spatiu separat, pregatit pentru media si recap.",
      premierCta: "Deschide pagina",
      invitLabel: "Invitational",
      invitTitle: "Invitationale",
      invitCopy:
        "Un loc dedicat pentru competitii speciale, parteneriate si rezultate care nu tin strict de sezonul standard.",
      invitCta: "Deschide pagina",
    },
    fgc: {
      title: "First Global Challenge merita propria prezenta, nu doar o nota mica in subsol.",
      subtitle:
        "Sectiunea este separata ca sa ai loc pentru poveste, imagini si context international fara sa incarci FTC sau FRC.",
      program: "First Global Challenge",
      cta: "Vizualizeaza povestea",
    },
    sponsors: {
      eyebrow: "Sponsori",
      title: "Multumim sponsorilor nostrii:",
      subtitle:
        "Sprijinul lor ne ajuta sa construim, sa concuram si sa crestem de la sezon la sezon.",
      aria: "Logouri sponsori",
    },
    partners: {
      eyebrow: "Parteneri",
      title: "Parteneri educationali",
      subtitle:
        "Institutii care sustin cresterea echipei prin educatie, spatiu de dezvoltare si deschidere catre proiecte reale.",
      liceuName: "Liceul National de Informatica Arad",
      liceuDesc:
        "Locul in care a inceput povestea Delta Force si mediul care a sustinut cresterea echipei de la primul sezon pana azi.",
      uavName: "Universitatea Aurel Vlaicu Arad",
      uavDesc:
        "Un partener educational important pentru deschiderea catre comunitatea academica si pentru consolidarea directiei tehnice a echipei.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contacteaza-ne",
      copy:
        "Daca vrei sa colaborezi cu echipa, sa ne sustii sau sa afli mai multe despre activitatea noastra, ne poti scrie direct aici.",
      formName: "Nume",
      formEmail: "Email",
      formMessage: "Mesaj",
      formNamePlaceholder: "Cum te numesti",
      formEmailPlaceholder: "adresa@exemplu.com",
      formMessagePlaceholder: "Spune-ne cu ce te putem ajuta",
      formNote: "Formular demonstrativ pentru moment. Il conectam ulterior.",
      submit: "Trimite mesaj",
      emailLabel: "Email",
      phoneLabel: "Numere de telefon",
      noteLabel: "Colaborari",
      corinaRole: "Corina Botosan - Mentor",
      octavianRole: "Octavian Botosan - Mentor",
      sideNote:
        "Pentru parteneriate, sponsorizari sau oportunitati educationale, ne poti contacta direct prin email sau telefon.",
    },
    footer: {
      ftc: "Arhiva FTC",
      frc: "Arhiva FRC",
      events: "Evenimente",
      partners: "Parteneri",
    },
    lightbox: {
      dialogLabel: "Vizualizare imagine",
      closeLabel: "Inchide imaginea",
      closeText: "Inchide",
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
      events: "Events",
      fgc: "FGC",
      sponsors: "Sponsors",
      partners: "Partners",
      contact: "Contact",
    },
    language: {
      image: "Flags/england.png",
      label: "Switch to Romanian",
    },
    hero: {
      static: "WE BUILD",
      words: [
        "ROBOTS",
        "DRIVE TEAMS",
        "AUTONOMOUS RUNS",
        "ALLIANCES",
        "COMMUNITY",
        "LEADERS",
        "CHAMPIONS",
        "FUTURES",
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
      title: "First Tech Challenge",
      subtitle:
        "From our first season to the present, a look at each competition year, the challenges we faced, and the progress we made as a team.",
      cta: "View season",
      currentBadge: "Current",
    },
    frc: {
      title: "FRC has its own section, separate and easy to browse.",
      subtitle:
        "We kept only the FRC seasons, each with its own cover, so the archive stays clean and easy to follow.",
      cta: "View season",
    },
    events: {
      eyebrow: "Special",
      title: "Premier / invitational events",
      subtitle:
        "A separate area for special appearances, invitationals, and standout moments that deserve their own page instead of being buried between seasons.",
      premierLabel: "Premier",
      premierTitle: "Premier Events",
      premierCopy:
        "Presentations, special appearances, and milestone moments placed in a dedicated space ready for media and recap content.",
      premierCta: "Open page",
      invitLabel: "Invitational",
      invitTitle: "Invitationals",
      invitCopy:
        "A dedicated place for special competitions, partnerships, and results that do not strictly belong to the standard season flow.",
      invitCta: "Open page",
    },
    fgc: {
      title: "First Global Challenge deserves its own presence, not just a small note in the footer.",
      subtitle:
        "This section stands on its own so there is room for story, imagery, and international context without overloading FTC or FRC.",
      program: "First Global Challenge",
      cta: "View story",
    },
    sponsors: {
      eyebrow: "Sponsors",
      title: "Thank you to our sponsors:",
      subtitle:
        "Their support helps us build, compete, and grow from one season to the next.",
      aria: "Sponsor logos",
    },
    partners: {
      eyebrow: "Partners",
      title: "Educational partners",
      subtitle:
        "Institutions that support the team's growth through education, development space, and openness toward real-world projects.",
      liceuName: "National High School of Computer Science Arad",
      liceuDesc:
        "The place where the Delta Force story began and the environment that supported the team's growth from the first season until today.",
      uavName: "Aurel Vlaicu University of Arad",
      uavDesc:
        "An important educational partner for opening doors toward the academic community and strengthening the team's technical direction.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact us",
      copy:
        "If you want to collaborate with the team, support us, or learn more about our work, you can message us directly here.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formNamePlaceholder: "What is your name",
      formEmailPlaceholder: "address@example.com",
      formMessagePlaceholder: "Tell us how we can help",
      formNote: "Demo form for now. We will connect it later.",
      submit: "Send message",
      emailLabel: "Email",
      phoneLabel: "Phone numbers",
      noteLabel: "Collaborations",
      corinaRole: "Corina Botosan - Mentor",
      octavianRole: "Octavian Botosan - Mentor",
      sideNote:
        "For partnerships, sponsorships, or educational opportunities, you can contact us directly by email or phone.",
    },
    footer: {
      ftc: "FTC Archive",
      frc: "FRC Archive",
      partners: "Partners",
    },
    lightbox: {
      dialogLabel: "Image viewer",
      closeLabel: "Close image",
      closeText: "Exit",
    },
  },
};

let currentLanguage = "ro";
let typeTimeoutId = null;
let reducedIntervalId = null;
let words = [...translations.ro.hero.words];
let wordIndex = 0;
let charIndex = words[0].length;
let isDeleting = false;

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
  ftcCtas.forEach((cta) => {
    cta.textContent = copy.ftc.cta;
  });
  currentSeasonBadges.forEach((badge) => {
    badge.textContent = copy.ftc.currentBadge;
  });

  frcTitle && (frcTitle.textContent = copy.frc.title);
  frcSubtitle && (frcSubtitle.textContent = copy.frc.subtitle);
  frcCtas.forEach((cta) => {
    cta.textContent = copy.frc.cta;
  });

  eventsEyebrow && (eventsEyebrow.textContent = copy.events.eyebrow);
  eventsTitle && (eventsTitle.textContent = copy.events.title);
  eventsSubtitle && (eventsSubtitle.textContent = copy.events.subtitle);
  eventLabelPremier && (eventLabelPremier.textContent = copy.events.premierLabel);
  eventTitlePremier && (eventTitlePremier.textContent = copy.events.premierTitle);
  eventCopyPremier && (eventCopyPremier.textContent = copy.events.premierCopy);
  eventCtaPremier && (eventCtaPremier.textContent = copy.events.premierCta);
  eventLabelInvitational && (eventLabelInvitational.textContent = copy.events.invitLabel);
  eventTitleInvitational && (eventTitleInvitational.textContent = copy.events.invitTitle);
  eventCopyInvitational && (eventCopyInvitational.textContent = copy.events.invitCopy);
  eventCtaInvitational && (eventCtaInvitational.textContent = copy.events.invitCta);

  fgcTitle && (fgcTitle.textContent = copy.fgc.title);
  fgcSubtitle && (fgcSubtitle.textContent = copy.fgc.subtitle);
  fgcProgramLabel && (fgcProgramLabel.textContent = copy.fgc.program);
  fgcCta && (fgcCta.textContent = copy.fgc.cta);

  sponsorsEyebrow && (sponsorsEyebrow.textContent = copy.sponsors.eyebrow);
  sponsorsTitle && (sponsorsTitle.textContent = copy.sponsors.title);
  sponsorsSubtitle && (sponsorsSubtitle.textContent = copy.sponsors.subtitle);
  sponsorsMarquee?.setAttribute("aria-label", copy.sponsors.aria);

  partnersEyebrow && (partnersEyebrow.textContent = copy.partners.eyebrow);
  partnersTitle && (partnersTitle.textContent = copy.partners.title);
  partnersSubtitle && (partnersSubtitle.textContent = copy.partners.subtitle);
  partnerNameLiceu && (partnerNameLiceu.textContent = copy.partners.liceuName);
  partnerDescLiceu && (partnerDescLiceu.textContent = copy.partners.liceuDesc);
  partnerNameUav && (partnerNameUav.textContent = copy.partners.uavName);
  partnerDescUav && (partnerDescUav.textContent = copy.partners.uavDesc);

  contactEyebrow && (contactEyebrow.textContent = copy.contact.eyebrow);
  contactTitle && (contactTitle.textContent = copy.contact.title);
  contactCopy && (contactCopy.textContent = copy.contact.copy);
  contactLabelName && (contactLabelName.textContent = copy.contact.formName);
  contactLabelEmail && (contactLabelEmail.textContent = copy.contact.formEmail);
  contactLabelMessage && (contactLabelMessage.textContent = copy.contact.formMessage);
  contactInputName?.setAttribute("placeholder", copy.contact.formNamePlaceholder);
  contactInputEmail?.setAttribute("placeholder", copy.contact.formEmailPlaceholder);
  contactInputMessage?.setAttribute("placeholder", copy.contact.formMessagePlaceholder);
  contactFormNote && (contactFormNote.textContent = copy.contact.formNote);
  contactSubmit && (contactSubmit.textContent = copy.contact.submit);
  contactEmailLabel && (contactEmailLabel.textContent = copy.contact.emailLabel);
  contactPhoneLabel && (contactPhoneLabel.textContent = copy.contact.phoneLabel);
  contactNoteLabel && (contactNoteLabel.textContent = copy.contact.noteLabel);
  contactCorinaRole && (contactCorinaRole.textContent = copy.contact.corinaRole);
  contactOctavianRole && (contactOctavianRole.textContent = copy.contact.octavianRole);
  contactSideNote && (contactSideNote.textContent = copy.contact.sideNote);

  footerFtcLink && (footerFtcLink.textContent = copy.footer.ftc);
  footerFrcLink && (footerFrcLink.textContent = copy.footer.frc);
  footerEventsLink && (footerEventsLink.textContent = copy.footer.events);
  footerPartnersLink && (footerPartnersLink.textContent = copy.footer.partners);

  lightboxDialog?.setAttribute("aria-label", copy.lightbox.dialogLabel);
  lightboxCloseButtons.forEach((button) => {
    button.setAttribute("aria-label", copy.lightbox.closeLabel);
    button.textContent = copy.lightbox.closeText;
  });

  startTypewriter(copy.hero.words);

  try {
    window.localStorage.setItem("delta-language", language);
  } catch {}
};

window.addEventListener("load", () => {
  body.classList.add("is-loaded");
  showTopbar();
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

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu?.classList.toggle("is-open", !isOpen);
  showTopbar();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navMenu?.classList.remove("is-open");
    showTopbar();
  });
});

languageToggle?.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "ro" ? "en" : "ro";
  applyLanguage(nextLanguage);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
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
