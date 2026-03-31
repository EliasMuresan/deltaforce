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
const ibanCopyButton = document.querySelector("[data-iban-copy]");
const ibanNote = document.querySelector(".support-iban-note");

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
  const attributeNames = ["aria-label", "title", "alt", "placeholder", "content"];

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
      title: "Susținerea ta contează | Delta Force Robotics",
      description:
        "Susținerea ta contează - pagina Delta Force dedicată sponsorizării, Formularului 230, donațiilor și transferului bancar.",
    },
    brandAria: "Pagina de susținere Delta Force",
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
      label: "Schimbă în engleză",
    },
    hero: {
      eyebrow: "DRUMUL SPRE MONDIALĂ",
      title: "Susținerea ta contează",
      copy:
        "Fiecare sponsorizare, redirecționare de impozit sau donație ne ajută să ajungem la mondială și să reprezentăm mai departe Delta Force și România.",
      pillOne: "SPONSORIZARE",
      pillTwo: "FORMULAR 230",
      pillThree: "PAYPAL ȘI IBAN",
      imageAlt: "Echipa Delta Force",
      panelEyebrow: "DELTA FORCE / TEAM ROMANIA",
      panelTitle: "Susține parcursul nostru pentru Campionatul Mondial din Houston",
      panelCopy:
        "Pe această pagină găsești toate variantele prin care ne poți ajuta să ajungem la Campionatul Mondial din Houston, între 29 aprilie și 2 mai: sponsorizare, Formular 230, PayPal și transfer bancar.",
    },
    actions: {
      eyebrow: "OPȚIUNI DE SUSȚINERE",
      title: "Alege varianta potrivită",
      copy:
        "Am pregătit o pagină clară, fără pași complicați, astfel încât să poți ajuta rapid, fie ca persoană juridică, fie ca persoană fizică.",
    },
    sponsor: {
      eyebrow: "PERSOANE JURIDICE",
      title: "Material de sponsorizare",
      copy:
        "Dacă reprezinți o companie, poți descărca materialul de sponsorizare și reveni către noi pentru detaliile finale.",
      button: "Descarcă PDF-ul",
      note: "Fișierul disponibil aici este modelul de contract de sponsorizare pentru persoane juridice.",
    },
    form230: {
      eyebrow: "PERSOANE FIZICE",
      title: "Formular 230",
      copy:
        "Poți completa direct Formularul 230 pentru redirecționarea impozitului, direct din site-ul nostru, prin platforma oficială formular230.ro.",
      button: "Deschide Formularul 230",
      note: "Formularul se deschide într-un pop-up securizat, fără să părăsești pagina.",
    },
    paypal: {
      eyebrow: "DONAȚII RAPIDE",
      title: "PayPal",
      copy:
        "Poți folosi și opțiunea PayPal pentru donații individuale, ca variantă rapidă de susținere.",
      button: "Donează prin PayPal",
      note: "Linkul final PayPal va fi conectat aici.",
    },
    iban: {
      eyebrow: "TRANSFER BANCAR",
      title: "IBAN",
      copy: "Poți susține direct prin transfer bancar în contul nostru în RON.",
      value: "IBAN RON: RO73BTRLRONCRT0I19750701",
      note: "Apasă pe IBAN ca să-l copiezi instant.",
      copied: "IBAN copiat în clipboard.",
      copyFailed: "Nu am putut copia automat. Îl poți copia manual.",
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
        "Every sponsorship, tax redirection, or donation helps us reach Worlds and keep representing Delta Force and Romania.",
      pillOne: "SPONSORSHIP",
      pillTwo: "FORM 230",
      pillThree: "PAYPAL AND IBAN",
      imageAlt: "Delta Force team",
      panelEyebrow: "DELTA FORCE / TEAM ROMANIA",
      panelTitle: "Support our road to the World Championship in Houston",
      panelCopy:
        "This page brings together every way you can help us reach the World Championship in Houston, between April 29 and May 2: sponsorships, Form 230, PayPal, and bank transfers.",
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
      note: "The file available here is the sponsorship contract model for legal entities.",
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
        "You can also use PayPal for individual donations, as a fast way to support us.",
      button: "Donate via PayPal",
      note: "The final PayPal link will be connected here.",
    },
    iban: {
      eyebrow: "BANK TRANSFER",
      title: "IBAN",
      copy: "You can support us directly by bank transfer to our RON account.",
      value: "RON IBAN: RO73BTRLRONCRT0I19750701",
      note: "Click the IBAN to copy it instantly.",
      copied: "IBAN copied to clipboard.",
      copyFailed: "We could not copy it automatically. You can copy it manually.",
    },
  },
};

Object.keys(translations).forEach((language) => {
  translations[language] = repairNestedStrings(translations[language]);
});

let currentLanguage = "ro";
let ibanNoteResetTimeout = null;

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

  repairRenderedText(document.body);
  document.title = repairMojibakeString(document.title);
  if (metaDescription) {
    metaDescription.setAttribute("content", repairMojibakeString(metaDescription.getAttribute("content") ?? ""));
  }
};

const fallbackCopyText = async (value) => {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    textarea.remove();
  }
};

const setIbanNoteMessage = (message, copied = false) => {
  if (!ibanNote || !message) return;

  if (ibanNoteResetTimeout) {
    window.clearTimeout(ibanNoteResetTimeout);
  }

  ibanNote.textContent = message;
  ibanCopyButton?.classList.toggle("is-copied", copied);

  ibanNoteResetTimeout = window.setTimeout(() => {
    const copy = translations[currentLanguage] ?? translations.ro;
    ibanNote.textContent = copy.iban.note;
    ibanCopyButton?.classList.remove("is-copied");
  }, 2200);
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

ibanCopyButton?.addEventListener("click", async () => {
  const rawIban = ibanCopyButton.dataset.ibanRaw ?? "";
  if (!rawIban) return;

  const copy = translations[currentLanguage] ?? translations.ro;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(rawIban);
    } else {
      await fallbackCopyText(rawIban);
    }

    setIbanNoteMessage(copy.iban.copied, true);
  } catch {
    setIbanNoteMessage(copy.iban.copyFailed, false);
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


