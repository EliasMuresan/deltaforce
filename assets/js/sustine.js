const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = [...document.querySelectorAll(".reveal")];
const topbar = document.querySelector(".topbar");
const progressBar = document.querySelector(".scroll-progress");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const languageToggle = document.querySelector(".language-toggle");
const metaDescription = document.querySelector('meta[name="description"]');

const translations = {
  ro: {
    meta: {
      title: "SusČ›inerea ta conteazÄ | Delta Force Robotics",
      description:
        "SusČ›inerea ta conteazÄ - pagina Delta Force dedicatÄ sponsorizÄrii, Formularului 230, donaČ›iilor Č™i transferului bancar.",
    },
    brandAria: "Pagina de susČ›inere Delta Force",
    navToggleLabel: "Deschide meniul de navigare",
    brand: {
      logoAlt: "Sigla Delta Force",
    },
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    language: {
      image: "../assets/images/flags/romania.png",
      label: "SchimbÄ Ă®n englezÄ",
    },
    hero: {
      eyebrow: "DRUMUL SPRE MONDIALÄ‚",
      title: "SusČ›inerea ta conteazÄ",
      copy:
        "Fiecare sponsorizare, redirecČ›ionare de impozit sau donaČ›ie ne ajutÄ sÄ reprezentÄm mai departe Delta Force Č™i RomĂ˘nia pe scena internaČ›ionalÄ.",
      pillOne: "SPONSORIZARE",
      pillTwo: "FORMULAR 230",
      pillThree: "PAYPAL ČI IBAN",
      imageAlt: "Echipa Delta Force",
      panelEyebrow: "DELTA FORCE / TEAM ROMANIA",
      panelTitle: "SusČ›ine parcursul nostru internaČ›ional",
      panelCopy:
        "Pe aceastÄ paginÄ gÄseČ™ti toate variantele prin care ne poČ›i fi alÄturi: sponsorizare, Formular 230, PayPal Č™i transfer bancar.",
    },
    actions: {
      eyebrow: "OPČšIUNI DE SUSČšINERE",
      title: "Alege varianta potrivitÄ",
      copy:
        "Am pregÄtit o paginÄ clarÄ, fÄrÄ paČ™i complicaČ›i, astfel Ă®ncĂ˘t sÄ poČ›i ajuta rapid, fie ca persoanÄ juridicÄ, fie ca persoanÄ fizicÄ.",
    },
    sponsor: {
      eyebrow: "PERSOANE JURIDICE",
      title: "Material de sponsorizare",
      copy:
        "DacÄ reprezinČ›i o companie, poČ›i descÄrca materialul de sponsorizare Č™i reveni cÄtre noi pentru detaliile finale.",
      button: "DescarcÄ PDF-ul",
      note: "FiČ™ierul disponibil acum este pachetul nostru de sponsorizare curent.",
    },
    form230: {
      eyebrow: "PERSOANE FIZICE",
      title: "Formular 230",
      copy:
        "PoČ›i completa direct Formularul 230 pentru redirecČ›ionarea impozitului, direct din site-ul nostru, prin platforma oficialÄ formular230.ro.",
      button: "Deschide Formularul 230",
      note: "Formularul se deschide Ă®ntr-un pop-up securizat, fÄrÄ sÄ pÄrÄseČ™ti pagina.",
    },
    paypal: {
      eyebrow: "DONAČšII RAPIDE",
      title: "PayPal",
      copy:
        "Butonul direct cÄtre PayPal va fi conectat aici, ca varianta cea mai rapidÄ pentru donaČ›ii individuale.",
      button: "Link PayPal Ă®n curĂ˘nd",
      note: "AdÄugÄm linkul de donaČ›ie imediat ce ni-l trimiČ›i.",
    },
    iban: {
      eyebrow: "TRANSFER BANCAR",
      title: "IBAN",
      copy: "Vom afiČ™a aici coordonatele complete pentru transfer imediat ce le primim.",
      value: "IBAN-ul va fi adÄugat aici imediat ce ne trimiČ›i datele.",
      note: "PĂ˘nÄ atunci ne poČ›i scrie pentru orice Ă®ntrebare legatÄ de susČ›inere.",
    },
  },
  en: {
    meta: {
      title: "Your support matters | Delta Force Robotics",
      description:
        "Your support matters - the Delta Force page for sponsorships, Form 230, donations, and bank transfers.",
    },
    brandAria: "Delta Force support page",
    navToggleLabel: "Toggle navigation",
    brand: {
      logoAlt: "Delta Force logo",
    },
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    language: {
      image: "../assets/images/flags/england.png",
      label: "Switch to Romanian",
    },
    hero: {
      eyebrow: "THE ROAD TO WORLDS",
      title: "Your support matters",
      copy:
        "Every sponsorship, tax redirection, or donation helps us continue representing Delta Force and Romania on the international stage.",
      pillOne: "SPONSORSHIP",
      pillTwo: "FORM 230",
      pillThree: "PAYPAL AND IBAN",
      imageAlt: "Delta Force team",
      panelEyebrow: "DELTA FORCE / TEAM ROMANIA",
      panelTitle: "Support our international journey",
      panelCopy:
        "This page brings together every way you can help us: sponsorships, Form 230, PayPal, and bank transfers.",
    },
    actions: {
      eyebrow: "WAYS TO SUPPORT",
      title: "Choose the option that fits",
      copy:
        "We prepared a clear page, without extra steps, so you can help quickly whether you represent a company or want to contribute personally.",
    },
    sponsor: {
      eyebrow: "LEGAL ENTITIES",
      title: "Sponsorship materials",
      copy:
        "If you represent a company, you can download the sponsorship material and come back to us for the final details.",
      button: "Download the PDF",
      note: "The current file available here is our active sponsorship packet.",
    },
    form230: {
      eyebrow: "INDIVIDUAL SUPPORT",
      title: "Form 230",
      copy:
        "You can open the official Form 230 flow directly from our site through the formular230.ro platform.",
      button: "Open Form 230",
      note: "The form opens in a secure pop-up without taking you away from this page.",
    },
    paypal: {
      eyebrow: "FAST DONATIONS",
      title: "PayPal",
      copy:
        "The direct PayPal button will be connected here as the fastest option for individual donations.",
      button: "PayPal link coming soon",
      note: "We will add the donation link as soon as we receive it.",
    },
    iban: {
      eyebrow: "BANK TRANSFER",
      title: "IBAN",
      copy: "We will display the full transfer coordinates here as soon as we receive them.",
      value: "The IBAN details will be added here as soon as you send them over.",
      note: "Until then, you can email us for any question related to support.",
    },
  },
};

let currentLanguage = "ro";

const getTranslationValue = (source, path) =>
  path.split(".").reduce((value, key) => value?.[key], source);

const applyTextTranslations = (copy) => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTranslationValue(copy, element.dataset.i18n);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = getTranslationValue(copy, element.dataset.i18nAlt);
    if (typeof value === "string") {
      element.setAttribute("alt", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = getTranslationValue(copy, element.dataset.i18nAriaLabel);
    if (typeof value === "string") {
      element.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const value = getTranslationValue(copy, element.dataset.i18nTitle);
    if (typeof value === "string") {
      element.setAttribute("title", value);
    }
  });

  document.querySelectorAll("[data-i18n-src]").forEach((element) => {
    const value = getTranslationValue(copy, element.dataset.i18nSrc);
    if (typeof value === "string") {
      element.setAttribute("src", value);
    }
  });
};

const applyLanguage = (language) => {
  const copy = translations[language] ?? translations.ro;

  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = copy.meta.title;
  metaDescription?.setAttribute("content", copy.meta.description);
  applyTextTranslations(copy);

  if (languageToggle) {
    languageToggle.setAttribute("aria-pressed", String(language === "en"));
  }

  try {
    window.localStorage.setItem("delta-language", language);
  } catch {}
};

const showTopbar = () => {
  if (!topbar) return;
  topbar.classList.add("is-visible");
};

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  showTopbar();
  topbar?.classList.toggle("is-scrolled", scrollTop > 16);

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
};

const closeNavMenu = () => {
  navToggle?.setAttribute("aria-expanded", "false");
  navMenu?.classList.remove("is-open");
};

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

window.addEventListener("load", () => {
  body.classList.add("is-loaded");
  showTopbar();
});

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

const storedLanguage = (() => {
  try {
    return window.localStorage.getItem("delta-language");
  } catch {
    return null;
  }
})();

applyLanguage(storedLanguage === "en" ? "en" : "ro");

