const detailBody = document.body;
const detailHeader = document.querySelector(".detail-topbar");
const detailMain = document.querySelector(".detail-main");
const detailFooter = document.querySelector(".detail-footer");
const detailPageName = window.location.pathname.split("/").pop().toLowerCase();
const detailPageKey = detailPageName.replace(/\.html$/, "");

const inferDetailSection = (pageName) => {
  if (pageName.startsWith("ftc-")) return "ftc";
  if (pageName.startsWith("frc-")) return "frc";
  if (pageName.startsWith("fgc-")) return "fgc";
  return "home";
};

const detailTranslations = {
  ro: {
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    brandAria: "Pagina principală a echipei noastre",
    navToggleLabel: "Deschide meniul de navigare",
    languageLabel: "Schimbă în engleză",
    languageImage: "assets/images/flags/romania.png",
    gallery: {
      previous: "Înapoi",
      next: "Înainte",
      close: "Închide",
      open: "Deschide imaginea",
      counter: (index, total) => `${index} / ${total}`,
      imageLabels: [
        "hero de sezon",
        "cadru de atelier",
        "cadru de competiție",
        "moment de echipa",
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      ftc: "FTC",
      frc: "FRC",
      fgc: "FGC",
      contact: "Contact",
    },
    brandAria: "Our team home page",
    navToggleLabel: "Toggle navigation",
    languageLabel: "Switch to Romanian",
    languageImage: "assets/images/flags/england.png",
    gallery: {
      previous: "Prev",
      next: "Next",
      close: "Close",
      open: "Open image",
      counter: (index, total) => `${index} / ${total}`,
      imageLabels: [
        "season hero",
        "workshop frame",
        "competition frame",
        "team moment",
      ],
    },
  },
};

const placeholderSet = Array(4).fill("assets/images/common/placeholder.png");

detailTranslations.ro.brandAria = "Pagina principală Delta Force";
detailTranslations.ro.languageLabel = "Schimbă în engleză";
detailTranslations.en.brandAria = "Delta Force home page";

const repairMojibakeString = (text) => {
  if (typeof text !== "string") return text;

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

  let repaired = text;

  mojibakePairs.forEach(([broken, fixed]) => {
    repaired = repaired.split(broken).join(fixed);
  });

  return repaired.replace(/\bFirst\b/g, "FIRST").replace(/\s{2,}/g, " ").trim();
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

const detailPages = {
  "ftc-freight-frenzy": {
    title: "Freight Frenzy",
    eyebrow: "2021 - 2022",
    lead: "Freight Frenzy a fost sezonul in care Delta Force a trecut definitiv din zona de promisiune in elita FTC, iar povestea s-a terminat la Houston, cu titlul mondial castigat din postura de alliance captain.",
    intro: [
      "Jocul a fost despre freight, duck carousel si warehouse cycles, iar pentru Delta Force a fost testul perfect de maturitate. In Romania, echipa a urcat pana pe locul 4 la National Championship si a primit Inspire Award 2nd Place, validand un parcurs deja foarte solid.",
      "La FIRST Championship, Delta Force a castigat mai intai Franklin Division si apoi campionatul mondial, tot ca alliance captain. Pentru o echipa fondata in 2018, Freight Frenzy ramane sezonul care a fixat standardul de ambitie al intregului program FTC.",
    ],
    focusLabel: "Season focus",
    focusTitle: "De la Nationala la Houston",
    focusBody: "Pagina asta merita sa urmareasca trecerea de la parcursul din Romania la run-ul din Houston: calificarea prin Inspire Award, consistenta in playoffs si statutul de World Championship Winning Alliance Captain.",
    highlights: [
      "sezonul care a dus echipa pana la titlul mondial FTC",
      "Inspire Award 2nd Place la Romania National Championship",
      "Franklin Division winner si FIRST World Championship winner la Houston",
    ],
    outro: [
      "Freight Frenzy nu este doar primul sezon mare din arhiva FTC; este sezonul in care Delta Force a demonstrat ca poate concura si castiga la cel mai inalt nivel. Din punct de vedere narativ, aici incepe cu adevarat capitolul international al echipei.",
      "De aceea pagina poate pune accent si pe rezultate, si pe atmosfera din Houston, si pe momentele de echipa care au transformat un an foarte bun intr-un reper pentru tot ce a urmat.",
    ],
    footer: "Pagina de sezon FTC 17713",
    images: [
      "assets/images/seasons/ftc/freight-frenzy/pozasus.png",
      "assets/images/seasons/ftc/freight-frenzy/poza1.png",
      "assets/images/seasons/ftc/freight-frenzy/pzoa2.png",
      "assets/images/seasons/ftc/freight-frenzy/poza3.png",
    ],
  },
  "ftc-power-play": {
    title: "Power Play",
    eyebrow: "2022 - 2023",
    lead: "Power Play a dus jocul spre precizie, junction cycles si endgame control, iar pentru Delta Force a fost sezonul in care echipa a aratat cat de mult poate creste intre primul qualifier si nationala.",
    intro: [
      "La RO022 Bucharest #1 a plecat cu Innovate Award 3rd Place, iar la Romania National Championship a schimbat complet ritmul, urcand pana pe primul loc dupa calificari.",
      "Finalul a venit cu Finalist Alliance Captain si Design Award la nationala, semn ca Delta Force nu a fost doar competitiva pe teren, ci si foarte coerenta in solutia tehnica prezentata juriului.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Sezonul saltului de consistenta",
    focusBody: "Power Play poate fi spus ca un sezon al progresului clar: de la un qualifier dificil la un National Championship incheiat pe primul loc dupa ranking, cu Design Award si o finala jucata din postura de alliance captain.",
    highlights: [
      "progres clar de la inceputul sezonului pana la nationala",
      "locul 1 dupa calificari la Romania National Championship",
      "Finalist Alliance Captain si Design Award la nationala",
    ],
    outro: [
      "Power Play este sezonul in care Delta Force a aratat ca poate raspunde foarte bine la presiune si poate inchide anul mai sus decat parea posibil la inceput.",
      "Ca pagina, merita sa combine rezultatele nationale cu partea de precizie tehnica a jocului, pentru ca exact acolo s-a vazut diferenta fata de anul anterior.",
    ],
    footer: "Pagina Power Play",
    images: [
      "assets/images/seasons/ftc/power-play/pozasus.png",
      "assets/images/seasons/ftc/power-play/poza1.png",
      "assets/images/seasons/ftc/power-play/poza2.png",
      "assets/images/seasons/ftc/power-play/poza3.png",
    ],
  },
  "ftc-centerstage": {
    title: "Centerstage",
    eyebrow: "2023 - 2024",
    lead: "Centerstage a adus in joc pixels, backdrop-uri si drone, iar pentru Delta Force a fost un sezon in care robotul, prezentarea si consistenta de competitie au inceput sa se lege foarte bine.",
    intro: [
      "In datele oficiale FTC, sezonul se vede ca unul stabil si competitiv. La RO #3 Timisoara, echipa a obtinut Design Award si a ajuns Finalist Alliance - 1st Team Selected, confirmand ca sezonul avea directie si identitate.",
      "Centerstage a fost si anul in care pagina unei echipe ca Delta Force merita mai mult decat o simpla lista de rezultate: a fost un sezon cu mult potential vizual, cu momente bune de competitie si cu o imagine de ansamblu mai matura.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Un sezon cu imagine clara",
    focusBody: "Centerstage poate fi prezentat ca sezonul in care Delta Force a inceput sa lege mai bine performanta, designul si felul in care isi spune povestea. Design Award-ul de la Timisoara e cel mai bun marker pentru asta.",
    highlights: [
      "un sezon FTC mult mai stabil si mai coerent",
      "Design Award la RO #3 Timisoara",
      "Finalist Alliance - 1st Team Selected intr-un sezon mult mai stabil",
    ],
    outro: [
      "Centerstage merita tratat ca un sezon de consolidare vizibila: nu doar pentru rezultate, ci pentru felul in care echipa a aratat mai bine, s-a prezentat mai bine si a parut mai sigura pe directia ei.",
      "Daca Freight Frenzy a fost explozia, iar Power Play a fost saltul de consistenta, Centerstage este capitolul in care Delta Force a inceput sa arate ca o echipa complet formata.",
    ],
    footer: "Pagina Centerstage",
    images: [
      "assets/images/seasons/ftc/centerstage/poza3.png",
      "assets/images/seasons/ftc/centerstage/pozasus.png",
      "assets/images/seasons/ftc/centerstage/poza1.png",
      "assets/images/seasons/ftc/centerstage/490020934_1241141231347266_8045885203163806937_n.jpg",
    ],
  },
  "ftc-into-the-deep": {
    title: "Into The Deep",
    eyebrow: "2024 - 2025",
    lead: "Into The Deep a venit cu un joc subacvatic, centrat pe samples, specimens si ascent, iar pentru Delta Force a fost unul dintre cele mai curate sezoane FTC de pana acum.",
    intro: [
      "Sezonul a adus Winning Alliance - 1st Team Selected la Romania West League Tournament, plus Design Award si continuarea parcursului spre Romania Championship.",
      "Sezonul a aratat foarte bine si ca rezultate, si ca ritm. Into The Deep poate fi prezentat ca anul in care echipa a combinat eficienta robotului cu o imagine de sezon mult mai matura si mai clara.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Unul dintre cele mai solide sezoane FTC",
    focusBody: "Into The Deep merita spus ca un sezon foarte eficient: titlu in West Romania League Tournament, Design Award si continuitate suficienta cat sa impinga echipa din nou spre nationala.",
    highlights: [
      "un sezon FTC foarte solid si foarte constant",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Design Award si calificare la Romania Championship",
    ],
    outro: [
      "Into The Deep poate functiona foarte bine ca pagina pentru ca are deja o poveste clara: un joc elegant, un robot competitiv si un sezon in care Delta Force a parut foarte greu de scos din ritm.",
      "Daca alegi bine imaginile, poti arata aici exact acel mix dintre control, consistenta si atmosfera de sezon care a facut anul sa para atat de compact.",
    ],
    footer: "Pagina Into The Deep",
    images: [
      "assets/images/seasons/ftc/into-the-deep/pozasus.png",
      "assets/images/seasons/ftc/into-the-deep/poza1.png",
      "assets/images/seasons/ftc/into-the-deep/poza2.png",
      "assets/images/seasons/ftc/into-the-deep/poza 4.jpg",
    ],
  },
  "ftc-decode": {
    title: "Decode",
    eyebrow: "2025 - 2026 / Actual",
    lead: "Decode este sezonul actual FTC, un joc construit in jurul logicii, al pattern-urilor si al deciziilor rapide, iar pana acum Delta Force l-a transformat intr-un nou parcurs de top.",
    intro: [
      "In februarie 2026, Delta Force a castigat West Romania League Tournament din postura de 1st Team Selected si a adaugat Inspire Award 3rd Place.",
      "Rezultatele au dus echipa mai departe la Romania Championship, iar pagina sezonului poate urmari foarte bine tocmai partea asta de evolutie in timp real: build, iteratii, competitii si update-uri adaugate pe masura ce apar.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Capitolul curent, deja competitiv",
    focusBody: "Decode nu mai este doar o pagina de tinut la cald pentru update-uri viitoare. Exista deja un titlu regional si un Inspire Award, asa ca sezonul are de pe acum suficienta substanta pentru un recap serios.",
    highlights: [
      "un start de sezon foarte puternic in circuitul oficial",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Inspire Award 3rd Place intr-un sezon inca deschis",
    ],
    outro: [
      "Avantajul unui sezon actual este ca pagina poate creste odata cu echipa. Aici merita puse rapid imaginile noi, meciurile importante si iteratiile care spun cum a evoluat robotul de la un event la altul.",
      "Pe masura ce anul se inchide, Decode are toate sansele sa devina inca un sezon definitoriu pentru FTC 17713, nu doar un capitol de tranzitie intre doua editii de joc.",
    ],
    footer: "Pagina sezonului curent FTC",
    images: [
      "assets/images/seasons/ftc/decode/656304203_1547461490715237_4511597264223828386_n.jpg",
      "assets/images/seasons/ftc/decode/656427074_1547461567381896_8806735372544043729_n.jpg",
      "assets/images/seasons/ftc/decode/657058095_1547461434048576_7836651942840798479_n.jpg",
      "assets/images/seasons/ftc/decode/657751376_1547461387381914_2996004331729914204_n.jpg",
    ],
  },
  "frc-charged-up": {
    title: "Charged Up",
    eyebrow: "2023",
    lead: "Primul sezon din arhiva FRC are nevoie de o pagina care sa para mai premium si mai aerisita, cu imagini mari intre texte scurte si clare.",
    intro: [
      "Charged Up poate fi deschis cu povestea debutului FRC, a ritmului de competitie si a modului in care echipa si-a asezat prezenta in programul mare.",
      "Structura editoriala ajuta fiindca lasa imaginile sa conduca pagina, iar textul ramane pe centru, suficient cat sa dea context si sa lege momentele importante.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Debutul capitolului FRC",
    focusBody: "Aici poti strange directia sezonului, primele iteratii mari, meciurile sau eventurile care au contat si felul in care echipa a inceput sa isi contureze identitatea FRC.",
    highlights: [
      "pagina buna pentru debutul FRC 9001",
      "spatiu pentru imagini de teren si pit",
      "loc pentru recap si momente de start",
    ],
    outro: [
      "Cu imagini reale, pagina o sa para mult mai bine daca fiecare bloc vizual sustine textul si nu concureaza cu el. Tocmai de asta nu mai exista rame sau carduri grele in jurul pozelor.",
      "Charged Up poate ramane un prim capitol puternic daca selectezi cadrele care spun cel mai bine tranzitia echipei spre FRC si energia acelui debut.",
    ],
    footer: "Pagina Charged Up",
    images: [
      "assets/images/seasons/frc/chargedup/487298647_1229456009182455_22415458488962185_n.jpg",
      "assets/images/seasons/frc/chargedup/487318503_1229455962515793_4196183636731009039_n.jpg",
      "assets/images/seasons/frc/chargedup/487498789_1229455949182461_3407560342455036532_n.jpg",
      "assets/images/seasons/frc/chargedup/488314795_1233556828772373_5062552466815585559_n.jpg",
    ],
  },
  "frc-crescendo": {
    title: "Crescendo",
    eyebrow: "2024",
    lead: "Un sezon care cere ritm vizual bun: text putin si clar, imagini care stau intre capitole si suficient spatiu ca pagina sa para premium, nu inghesuita.",
    intro: [
      "Crescendo poate fi prezentat foarte bine intr-un format de genul asta, pentru ca are mult potential vizual si merge natural cu o poveste care curge dintr-un cadru mare in urmatorul.",
      "Aici poti arata directia robotului, atmosfera de competitie, momentele de echipa si felul in care sezonul s-a asezat clar in arhiva FRC.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Ritmul unui sezon matur",
    focusBody: "Blocul de focus poate tine ideile principale: speaker, amp, trap, iteratii noi, ce a mers bine si ce momente merita sa ramana in primul plan al paginii.",
    highlights: [
      "bun pentru recap coerent si usor de parcurs",
      "spatiu pentru imagini energice de competitie",
      "loc pentru progres tehnic si media de sezon",
    ],
    outro: [
      "Daca pui imagini bune aici, pagina o sa functioneze aproape ca un mic articol de sezon. Asta o face mai memorabila decat o simpla grila de poze cu titluri dedesubt.",
      "Poate ramane una dintre cele mai curate pagini din arhiva daca alegi cadre mari, lasi textul scurt si folosesti imaginile doar unde chiar sustin povestea.",
    ],
    footer: "Pagina Crescendo",
    images: [
      "assets/images/seasons/frc/crescendo/490715245_1243077684486954_8828388110118578536_n.jpg",
      "assets/images/seasons/frc/crescendo/490456538_1243077497820306_9172991513049478018_n.jpg",
      "assets/images/seasons/frc/crescendo/491350280_1243077557820300_8761649256036690104_n.jpg",
      {
        src: "assets/images/seasons/frc/crescendo/490361664_1243077704486952_2726261351600295164_n.jpg",
        position: "50% 100%",
      },
    ],
  },
  "frc-reefscape": {
    title: "Reefscape",
    eyebrow: "2025",
    lead: "Pagina sezonului Reefscape e pregatita sa arate modern si aerisit, cu accent pe imagini mari si pe un text scurt care nu incarca inutil compozitia.",
    intro: [
      "Reefscape poate sa functioneze foarte bine intr-un format editorial pentru ca lasa loc de atmosfera, de detalii de robot si de recap al competitiei fara sa para doar o pagina de arhiva standard.",
      "Cand ai imagini mai bune, ele pot sta in centrul paginii, iar textul ramane doar ghidul care explica de ce acel sezon conteaza in cronologia FRC.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Un sezon facut sa arate bine",
    focusBody: "Blocul acesta poate sa adune temele sezonului, stilul robotului, momentele de competitie si lucrurile care au facut Reefscape memorabil pentru echipa.",
    highlights: [
      "pagina buna pentru imagini cu identitate puternica",
      "loc pentru recap si selectie de momente cheie",
      "spatiu pentru a pune sezonul clar in cronologie",
    ],
    outro: [
      "Daca alegi bine fotografiile, pagina asta poate deveni una dintre cele mai curate din FRC, tocmai pentru ca nu are ornamente grele si lasa imaginile sa faca treaba.",
      "Poti inchide cu un paragraf care fixeaza ce a adus Reefscape nou si cum se vede sezonul in contextul capitolelor FRC ale echipei.",
    ],
    footer: "Pagina Reefscape",
    images: [
      "assets/images/seasons/frc/reefscape/dsad (1).png",
      "assets/images/seasons/frc/reefscape/dsad (2).png",
      "assets/images/seasons/frc/reefscape/dsad (3).png",
      "assets/images/seasons/frc/reefscape/dsad.png",
    ],
  },
  "frc-rebuilt": {
    title: "Rebuilt",
    eyebrow: "2026 / Actual",
    lead: "Sezonul actual FRC are nevoie de o pagina care poate fi actualizata rapid, dar care ramane in continuare eleganta si curata cand incepi sa pui tot mai mult continut.",
    intro: [
      "Rebuilt este pagina care trebuie sa suporte ritmul real al sezonului: poze noi, schimbari de robot, recap-uri scurte, cadre de competitie si update-uri care vin pe parcurs.",
      "Tocmai de aceea textul sta pe mijloc si imaginile au spatiu sa vina intre blocurile de continut. Pagina ramane coerenta chiar si atunci cand incepe sa se umple.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Structura pentru un sezon viu",
    focusBody: "Aici poti pune sumarul curent al sezonului, directia robotului, ce s-a schimbat dupa fiecare event si momentele care arata cel mai clar progresul echipei.",
    highlights: [
      "gata pentru update-uri dese cu media noua",
      "bun pentru recap, rezultate si imagini de teren",
      "spatiu pentru a urmari progresul in timp real",
    ],
    outro: [
      "Cu fiecare set nou de poze, pagina poate deveni mai puternica fara sa se rupa vizual. Asta e ideea din spatele template-ului nou: sa poti creste continutul fara sa strici compozitia.",
      "Pentru un sezon activ, asta inseamna mai putin timp pierdut pe aranjare si mai mult timp pus in selectia de imagini si in povestea reala a anului.",
    ],
    footer: "Pagina sezonului curent FRC",
    images: [
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.01.54.jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (3).jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (4).jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (5).jpeg",
    ],
  },
  "fgc-2023": {
    title: "Singapore",
    eyebrow: "First Global Challenge 2023",
    lead: "Pagina FGC merge cel mai bine cand se simte ca un articol vizual despre reprezentare, colaborare si context international, nu ca o simpla nota de subsol in arhiva.",
    intro: [
      "First Global Challenge are o energie diferita fata de restul sezoanelor, asa ca si pagina trebuie sa arate diferit: text central, imagini mari si suficient spatiu pentru a lasa povestea sa respire.",
      "Aici poti construi de la pregatire si delegatie pana la competitie, experienta internationala si felul in care momentul Singapore a ramas important pentru Delta Force.",
    ],
    focusLabel: "Story focus",
    focusTitle: "Reprezentare, echipa, context",
    focusBody: "Blocul acesta poate sa lege partea de competitie cu partea umana: munca din spate, interactiunile internationale, robotul, ceremonia si impactul unei astfel de experiente.",
    highlights: [
      "pagina buna pentru imagini mari de delegatie",
      "spatiu pentru experienta internationala si context",
      "loc pentru un recap care pare premium, nu aglomerat",
    ],
    outro: [
      "FGC merita o pagina care sa para aproape de un feature, nu de o galerie tehnica. De aceea imaginile sunt lasate sa intre intre texte si sa conduca tonul vizual al paginii.",
      "Cand vei pune fotografiile reale, poti crea foarte usor o naratiune care trece de la pregatire la competitie si apoi la impactul pe care l-a avut experienta asupra echipei.",
    ],
    footer: "Pagina First Global Challenge 2023",
    images: [
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
    ],
  },
  "events-premier": {
    title: "Evenimente Premier",
    eyebrow: "Premier Events",
    lead: "Pagina asta e pentru momentele care nu țin strict de un singur sezon, dar merită totuși spațiu propriu și o prezentare care să pară premium.",
    intro: [
      "Evenimentele premier pot include showcase-uri, prezențe speciale, demonstrații, apariții publice sau orice context în care Delta Force a avut nevoie de o pagină separată față de arhiva clasică.",
      "Formatul ăsta lasă imaginile să preia tonul vizual, iar textul rămâne doar atât cât e nevoie pentru a lega apariția, contextul și impactul evenimentului.",
    ],
    focusLabel: "Event focus",
    focusTitle: "Momente care merită pagina lor",
    focusBody: "Aici poți grupa povestea unui eveniment special, felul în care a fost pregătit, cine a participat, ce a fost prezentat și de ce momentul merită păstrat separat.",
    highlights: [
      "bun pentru showcase, demo și prezentări publice",
      "spațiu pentru poze mari și recap scurt",
      "loc pentru evenimente care ies din cronologia standard",
    ],
    outro: [
      "Paginile de tipul ăsta ies mai bine când par aerisite și deliberate. Câteva imagini bune și un text scurt spun mai mult decât foarte multe casete și etichete.",
      "Pe termen lung, secțiunea poate deveni un loc bun pentru cele mai vizibile momente publice ale echipei, fără să încarce sezoanele FTC, FRC sau FGC.",
    ],
    footer: "Pagina de evenimente premier",
    images: [
      "assets/images/seasons/ftc/power-play/pozasus.png",
      "assets/images/seasons/ftc/power-play/poza1.png",
      "assets/images/seasons/ftc/power-play/poza2.png",
      "assets/images/seasons/ftc/power-play/poza3.png",
    ],
  },
  "events-invitationals": {
    title: "Invitationale",
    eyebrow: "Invitationals",
    lead: "Pagina pentru competitiile si aparitiile speciale care merita scoase din linia obisnuita a sezonului si prezentate separat, cu mai mult spatiu pentru poveste si imagini.",
    intro: [
      "Invitationalele au de obicei o energie diferita de competitiile standard, iar pagina asta poate strange exact acea atmosfera: alianta, public, cadru de competitie si momentele care raman in memorie.",
      "Textul de pe mijloc e gandit sa tina lucrurile clare si scurte, iar fotografiile dintre blocurile de continut pot duce mai usor emotia si ritmul unui astfel de event.",
    ],
    focusLabel: "Event focus",
    focusTitle: "Competitii care ies din tipar",
    focusBody: "Aici poti pune recap-ul unui invitational, setup-ul robotului in acel context, experienta echipei si orice rezultat sau moment memorabil care ar merita propriul loc.",
    highlights: [
      "bun pentru invitationale si evenimente speciale",
      "spatiu pentru aliante, pit si teren",
      "loc pentru un recap mai viu si mai personal",
    ],
    outro: [
      "Paginile astea castiga mult atunci cand nu incearca sa copieze un sezon obisnuit. Mai bine alegi cateva cadre tari si un text scurt, care lasa evenimentul sa aiba identitatea lui.",
      "Asa, fiecare invitational poate sa para o experienta distincta in arhiva, nu doar un mic add-on pierdut intre celelalte capitole.",
    ],
    footer: "Pagina pentru invitationale",
    images: [
      "assets/images/seasons/ftc/centerstage/poza1.png",
      "assets/images/seasons/ftc/centerstage/poza1.png",
      "assets/images/covers/ftc/centerstage.png",
      "assets/images/seasons/ftc/centerstage/poza1.png",
    ],
  },
};

Object.assign(detailPages, {
  "ftc-freight-frenzy": {
    title: "Freight Frenzy",
    eyebrow: "2021 - 2022",
    lead: "Freight Frenzy a fost sezonul în care Delta Force a trecut din statutul de echipă foarte bună la statutul de campioană mondială FTC. Jocul a fost despre freight, duck carousel și warehouse cycles, iar sezonul s-a închis cu run-ul care a dus echipa până la titlul mondial.",
    intro: [
      "În România, Delta Force a ajuns până în zona de top a campionatului național și a primit Inspire Award 2nd Place, un semn clar că echipa nu impresiona doar prin meciuri, ci și prin robot, documentație, outreach și prezentare tehnică.",
      "La Houston, povestea a urcat la nivelul maxim: 17713 a câștigat Franklin Division și apoi FIRST World Championship, din postura de alliance captain. Pentru Delta Force, Freight Frenzy rămâne sezonul care a stabilit standardul real al programului FTC.",
    ],
    focusLabel: "Season focus",
    focusTitle: "De la Națională la Houston",
    focusBody: "Partea centrală a sezonului este tranziția de la performanța națională la run-ul internațional din Houston. Freight Frenzy a fost anul în care Delta Force a dovedit că poate construi un robot de top, poate susține presiunea playoff-urilor și poate închide sezonul cu cel mai mare rezultat posibil în FTC.",
    highlights: [
      "sezonul care a dus echipa până la titlul mondial FTC",
      "Inspire Award 2nd Place la Romania National Championship",
      "Franklin Division winner și FIRST World Championship winner la Houston",
    ],
    outro: [
      "Din punct de vedere al arhivei, Freight Frenzy este sezonul care explică de ce numele Delta Force a început să fie menționat mult mai des în afara României. A fost o combinație rară de ritm, consistență, leadership și execuție tehnică bună până la capăt.",
      "Descrierea sezonului poate merge foarte clar pe ideea de breakthrough year: primul mare vârf internațional, primul titlu mondial și anul care a făcut ca toate sezoanele următoare să fie privite printr-un standard mult mai ridicat.",
    ],
    footer: "Pagina de sezon FTC 17713",
    images: [
      "assets/images/seasons/ftc/freight-frenzy/pozasus.png",
      "assets/images/seasons/ftc/freight-frenzy/poza1.png",
      "assets/images/seasons/ftc/freight-frenzy/pzoa2.png",
      "assets/images/seasons/ftc/freight-frenzy/poza3.png",
    ],
  },
  "ftc-power-play": {
    title: "Power Play",
    eyebrow: "2022 - 2023",
    lead: "Power Play a fost sezonul conurilor, al junction-urilor și al controlului de final, iar pentru Delta Force a devenit anul în care progresul dintre începutul sezonului și națională s-a văzut cel mai clar.",
    intro: [
      "În prima parte a anului, echipa a adunat repere bune, inclusiv Innovate Award 3rd Place la RO022 Bucharest #1, dar adevărata explozie a venit la Romania National Championship.",
      "La națională, Delta Force a terminat pe locul 1 după calificări, a intrat în playoff-uri ca Finalist Alliance Captain și a primit Design Award. Power Play a arătat foarte bine cum o echipă poate urca în timpul sezonului și poate închide anul mult peste așteptările inițiale.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Sezonul saltului de consistență",
    focusBody: "Descrierea sezonului merge pe ideea de precizie și creștere. Power Play nu a fost doar despre scor pe junctions și endgame control, ci despre felul în care Delta Force a ajustat robotul și jocul de echipă până a ajuns să domine ranking-ul de la națională.",
    highlights: [
      "progres clar de la începutul sezonului până la națională",
      "locul 1 după calificări la Romania National Championship",
      "Finalist Alliance Captain și Design Award la națională",
    ],
    outro: [
      "Ca poveste de sezon, Power Play este capitolul în care Delta Force a arătat că știe să corecteze repede, să învețe din competiție și să transforme un an dificil într-unul foarte puternic la final.",
      "Este și unul dintre cele mai bune exemple pentru ideea de progres intern: nu doar rezultat final bun, ci și un traseu clar de la iterații și ajustări către o formă de top exact când conta mai mult.",
    ],
    footer: "Pagina Power Play",
    images: [
      "assets/images/seasons/ftc/power-play/pozasus.png",
      "assets/images/seasons/ftc/power-play/poza1.png",
      "assets/images/seasons/ftc/power-play/poza2.png",
      "assets/images/seasons/ftc/power-play/poza3.png",
    ],
  },
  "ftc-centerstage": {
    title: "Centerstage",
    eyebrow: "2023 - 2024",
    lead: "Centerstage a fost sezonul pixelilor, al backdrop-ului și al dronei, iar pentru Delta Force a funcționat ca un an în care jocul, designul robotului și felul în care echipa se prezenta au început să se lege foarte bine.",
    intro: [
      "În datele oficiale FTC, sezonul se vede ca unul stabil și competitiv. La RO #3 Timișoara, echipa a obținut Design Award și a fost Finalist Alliance - 1st Team Selected, semn că robotul și execuția din meciuri mergeau în direcția bună.",
      "Centerstage a fost și un sezon cu mult potențial vizual: backdrop scoring, drone launch și o prezentare mai curată a întregii munci. Pentru Delta Force, anul acesta arată un program FTC mai matur și mai coerent în toate direcțiile lui.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Un sezon cu imagine clară",
    focusBody: "Descrierea sezonului poate merge pe ideea de maturizare a identității de echipă. Centerstage nu a fost doar un an bun de competiție, ci și unul în care Delta Force a arătat mai clar cum îmbină performanța, designul robotului și felul în care își comunică munca.",
    highlights: [
      "un sezon FTC mult mai stabil și mai coerent",
      "Design Award la RO #3 Timisoara",
      "Finalist Alliance - 1st Team Selected într-un sezon mult mai stabil",
    ],
    outro: [
      "Centerstage merită descris ca un sezon de consolidare vizibilă. Rezultatele au rămas bune, dar poate și mai important a fost faptul că echipa a părut mai sigură pe ea, mai bine organizată și mai clară în alegerile tehnice.",
      "Dacă Freight Frenzy este sezonul breakthrough, iar Power Play este sezonul progresului, Centerstage este anul în care Delta Force începe să arate ca o echipă complet formată și foarte conștientă de identitatea ei.",
    ],
    footer: "Pagina Centerstage",
    images: [
      "assets/images/seasons/ftc/centerstage/poza3.png",
      "assets/images/seasons/ftc/centerstage/pozasus.png",
      "assets/images/seasons/ftc/centerstage/poza1.png",
      "assets/images/seasons/ftc/centerstage/490020934_1241141231347266_8045885203163806937_n.jpg",
    ],
  },
  "ftc-into-the-deep": {
    title: "Into The Deep",
    eyebrow: "2024 - 2025",
    lead: "Into The Deep a dus jocul FTC într-o zonă subacvatică, cu samples, specimens și ascent, iar pentru Delta Force a devenit unul dintre cele mai solide și mai eficiente sezoane de până acum.",
    intro: [
      "Sezonul a adus Winning Alliance - 1st Team Selected la Romania West League Tournament, plus Design Award și continuarea parcursului către Romania Championship.",
      "Into The Deep a fost sezonul în care robotul a părut foarte controlat, iar ritmul de competiție a rămas constant de la un event la altul. Din punct de vedere al arhivei FTC, este un sezon ușor de descris ca fiind compact, clar și foarte competitiv.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Unul dintre cele mai solide sezoane FTC",
    focusBody: "Descrierea sezonului poate sta pe ideea de control și constanță. Into The Deep a adus un turneu regional câștigat, Design Award și suficientă stabilitate cât să confirme că Delta Force nu trăiește doar din vârfuri punctuale, ci din consistență reală.",
    highlights: [
      "un sezon FTC foarte solid și foarte constant",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Design Award și calificare la Romania Championship",
    ],
    outro: [
      "În cronologia echipei, Into The Deep este genul de sezon care confirmă maturitatea unui program. Nu are nevoie de o singură surpriză mare ca să pară important; îl susțin deja premiile și coerența întregului an.",
      "Tocmai de aceea merită descris ca un sezon elegant și bine legat, în care Delta Force a combinat robotul competitiv cu o execuție constantă și cu o identitate vizuală mai clară ca în anii de început.",
    ],
    footer: "Pagina Into The Deep",
    images: [
      "assets/images/seasons/ftc/into-the-deep/pozasus.png",
      "assets/images/seasons/ftc/into-the-deep/poza1.png",
      "assets/images/seasons/ftc/into-the-deep/poza2.png",
      "assets/images/seasons/ftc/into-the-deep/poza 4.jpg",
    ],
  },
  "ftc-decode": {
    title: "Decode",
    eyebrow: "2025 - 2026 / Actual",
    lead: "Decode este sezonul actual FTC, un joc care cere logică, recunoaștere de pattern-uri și decizii rapide, iar până acum Delta Force l-a transformat într-un nou parcurs de top pentru 17713.",
    intro: [
      "În februarie 2026, Delta Force a câștigat West Romania League Tournament din postura de 1st Team Selected și a primit Inspire Award 3rd Place.",
      "Decode este încă deschis, dar are deja suficientă substanță ca să fie tratat ca un sezon serios: rezultate bune, ritm competitiv și un nou traseu spre Romania Championship. Tocmai pentru că pagina e vie, textul sezonului trebuie să lase loc și pentru update-uri ulterioare.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Capitolul curent, deja competitiv",
    focusBody: "Descrierea sezonului merge pe ideea de capitol actual, dar deja validat de rezultate. Decode nu mai este doar o pagină pregătită pentru viitor: are deja titlu regional și un award mare, ceea ce înseamnă că povestea sezonului a început deja să se scrie clar.",
    highlights: [
      "un start de sezon foarte puternic în circuitul oficial",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Inspire Award 3rd Place într-un sezon încă deschis",
    ],
    outro: [
      "Avantajul unui sezon actual este că pagina poate crește împreună cu echipa. Fiecare nou eveniment, fiecare iterație de robot și fiecare rezultat poate intra natural în poveste fără să pară forțat.",
      "Dacă ritmul se menține, Decode are toate șansele să închidă încă un sezon definitoriu pentru FTC 17713, nu doar o ediție bună de tranziție între două jocuri.",
    ],
    footer: "Pagina sezonului curent FTC",
    images: [
      "assets/images/seasons/ftc/decode/656304203_1547461490715237_4511597264223828386_n.jpg",
      "assets/images/seasons/ftc/decode/656427074_1547461567381896_8806735372544043729_n.jpg",
      "assets/images/seasons/ftc/decode/657058095_1547461434048576_7836651942840798479_n.jpg",
      "assets/images/seasons/ftc/decode/657751376_1547461387381914_2996004331729914204_n.jpg",
    ],
  },
});

Object.assign(detailPages, {
  "frc-charged-up": {
    title: "Charged Up",
    eyebrow: "2023",
    lead: "Charged Up este sezonul în care am deschis capitolul nostru FRC și am arătat din primul an că putem intra competitiv într-un format nou. Jocul a fost despre grid scoring, links și endgame balance, iar debutul nostru a avut ritm, playoff-uri și validare tehnică imediată.",
    intro: [
      "La Bosphorus Regional 2023, am terminat calificările pe locul 10, am fost alliance captain, am ajuns Regional Finalist și am primit Industrial Design Award. Pentru un rookie team, a fost un semnal clar că puteam intra în FRC nu doar ca să învățăm, ci și ca să fim competitivi din start.",
      "Mai târziu, la Texas Robotics Invitational, am urcat până pe locul 3 în calificări și am fost din nou alliance captain. Charged Up rămâne sezonul în care ne-am construit prezența în FRC cu încredere, ritm bun și o apariție internațională foarte puternică.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Debutul capitolului nostru FRC",
    focusBody: "Descrierea sezonului poate porni de la ideea de debut reușit. În Charged Up, am construit repede o identitate clară: robot competitiv, playoff-uri internaționale, award tehnic și un start care a făcut programul nostru FRC credibil din primul sezon.",
    highlights: [
      "debut internațional foarte puternic",
      "Regional Finalist și Industrial Design Award la Bosphorus Regional 2023",
      "locul 3 în calificări și alliance captain la Texas Robotics Invitational 2023",
    ],
    outro: [
      "Charged Up nu este doar începutul cronologiei noastre FRC; este și sezonul care explică de ce proiectul a căpătat credibilitate atât de repede. Am intrat în competiție mare direct cu rezultate, nu doar cu promisiune.",
      "Ca poveste de sezon, rămâne un start istoric: prima prezență FRC, prima validare internațională și primul semn clar că puteam construi un program competitiv și în formatul acesta.",
    ],
    footer: "Pagina Charged Up",
    images: [
      "assets/images/seasons/frc/chargedup/487298647_1229456009182455_22415458488962185_n.jpg",
      "assets/images/seasons/frc/chargedup/487318503_1229455962515793_4196183636731009039_n.jpg",
      "assets/images/seasons/frc/chargedup/487498789_1229455949182461_3407560342455036532_n.jpg",
      "assets/images/seasons/frc/chargedup/488314795_1233556828772373_5062552466815585559_n.jpg",
    ],
  },
  "frc-crescendo": {
    title: "Crescendo",
    eyebrow: "2024",
    lead: "Crescendo a fost sezonul notelor, al speaker-ului, al amp-ului și al trap-ului, iar pentru noi a funcționat ca un an de consolidare după debutul foarte puternic din 2023.",
    intro: [
      "Am prins playoff-uri la ambele regionale importante ale anului, Istanbul Regional și Bosphorus Regional, iar la Bosphorus am fost chiar alliance captain.",
      "Crescendo nu are dramatismul debutului din Charged Up, dar are ceva foarte important pentru un program aflat la început de drum în FRC: continuitate. Am rămas competitivi, am fost din nou relevanți în playoff-uri și am confirmat că progresul nostru nu depinde de un singur sezon bun.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Ritmul unui sezon matur",
    focusBody: "Descrierea sezonului poate merge pe ideea de consolidare. În Crescendo am început să arătăm ca un program FRC stabil: playoff-uri constante, iterații mai mature și suficientă încredere cât să conducem din nou o alianță la Bosphorus.",
    highlights: [
      "playoff-uri și continuitate într-un sezon de consolidare",
      "playoff-uri atât la Istanbul Regional, cât și la Bosphorus Regional",
      "alliance captain la Bosphorus într-un an de consolidare FRC",
    ],
    outro: [
      "În arhiva noastră FRC, Crescendo merită văzut ca sezonul care a întărit fundația. Nu a fost doar un follow-up după Charged Up, ci anul în care am arătat că putem repeta prezența în playoff-uri și putem rămâne competitivi într-un context mai greu.",
      "Ca descriere, sezonul merge foarte bine pe ideea de maturizare: mai puțin despre surpriza debutului și mai mult despre dovada că programul nostru începe să capete continuitate reală.",
    ],
    footer: "Pagina Crescendo",
    images: [
      "assets/images/seasons/frc/crescendo/490715245_1243077684486954_8828388110118578536_n.jpg",
      "assets/images/seasons/frc/crescendo/490456538_1243077497820306_9172991513049478018_n.jpg",
      "assets/images/seasons/frc/crescendo/491350280_1243077557820300_8761649256036690104_n.jpg",
      {
        src: "assets/images/seasons/frc/crescendo/490361664_1243077704486952_2726261351600295164_n.jpg",
        position: "50% 100%",
      },
    ],
  },
  "frc-reefscape": {
    title: "Reefscape",
    eyebrow: "2025",
    lead: "Reefscape este sezonul FRC 2025 construit în jurul temei marine, cu coral, algae și scoring pe reef, processor și barge. Pentru noi, rămâne sezonul în care am participat la Sunset Showdown în San Francisco și am ajuns până în semifinale.",
    intro: [
      "Participarea la Sunset Showdown din San Francisco a dat un reper clar sezonului nostru Reefscape: am intrat în playoff-uri și am mers până în semifinale într-un eveniment internațional puternic.",
      "De aceea, Reefscape nu trebuie citit ca un simplu capitol de tranziție. Este sezonul care arată continuitate, prezență internațională și faptul că programul nostru FRC a rămas competitiv între anii de consolidare și sezonul actual.",
    ],
    focusLabel: "Season focus",
    focusTitle: "San Francisco și un parcurs până în semifinale",
    focusBody: "Descrierea sezonului merge cel mai bine pe combinația dintre tema oficială a jocului și rezultatul nostru de la Sunset Showdown. Reefscape a ținut programul activ, vizibil și competitiv, iar semifinalele din San Francisco dau paginii un reper concret și memorabil.",
    highlights: [
      "participare la Sunset Showdown în San Francisco",
      "parcurs până în semifinale",
      "sezon care a ținut programul FRC activ și competitiv",
    ],
    outro: [
      "Reefscape merită păstrat în arhivă ca sezonul care a dus echipa într-un nou context internațional și a arătat că programul își păstrează nivelul competitiv între Crescendo și Rebuilt.",
      "Cu tema lui distinctă și cu semifinalele din San Francisco, pagina Reefscape stă mult mai bine în cronologie ca un capitol clar al evoluției noastre FRC, nu ca o simplă punte între două sezoane.",
    ],
    footer: "Pagina Reefscape",
    images: [
      "assets/images/seasons/frc/reefscape/dsad (1).png",
      "assets/images/seasons/frc/reefscape/dsad (2).png",
      "assets/images/seasons/frc/reefscape/dsad (3).png",
      "assets/images/seasons/frc/reefscape/dsad.png",
    ],
  },
  "frc-rebuilt": {
    title: "Rebuilt",
    eyebrow: "2026 / Actual",
    lead: "Rebuilt este sezonul actual FRC, iar până acum a început foarte puternic pentru noi. Tema jocului pune accent pe reconstrucție, ritm rapid și adaptare, iar sezonul are deja un rezultat serios încă din primul mare event public al anului.",
    intro: [
      "La Bosphorus Regional 2026, am încheiat calificările pe locul 11, am ajuns Regional Finalist și am primit Creativity Award. Pentru începutul unui sezon încă deschis, acesta este deja un semnal foarte bun: suntem competitivi, avem un robot remarcat și intrăm în prim-plan încă din primele săptămâni.",
      "Rebuilt trebuie descris ca un sezon viu, încă în construcție, dar deja validat de rezultate. Tocmai asta îl face interesant: pagina poate urmări în timp real cum crește anul, de la primul finalist finish până la următoarele iterații și competiții.",
    ],
    focusLabel: "Season focus",
    focusTitle: "Capitolul nostru curent în FRC",
    focusBody: "Descrierea sezonului trebuie să pornească de la ce există deja: finalist finish la Bosphorus, Creativity Award și un ranking bun într-un camp cu adversari puternici. Restul paginii poate crește natural cu update-uri, dar baza sezonului este deja una credibilă și competitivă.",
    highlights: [
      "locul 11 după calificări la Bosphorus Regional 2026",
      "Regional Finalist în primul mare event public al sezonului",
      "Creativity Award într-un an care abia începe",
    ],
    outro: [
      "În cronologia noastră FRC, Rebuilt poate deveni foarte ușor sezonul care confirmă complet maturizarea programului. Un start cu finalist finish și award tehnic arată deja că nu mai suntem doar o apariție interesantă, ci o prezență constantă în discuția competitivă.",
      "Pentru că anul este încă deschis, descrierea lui trebuie să lase loc și pentru ce urmează. Exact asta face pagina acum: fixează ce există public până azi, fără să închidă artificial povestea sezonului.",
    ],
    footer: "Pagina sezonului curent FRC",
    images: [
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.01.54.jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (3).jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (4).jpeg",
      "assets/images/seasons/frc/rebuilt/WhatsApp Image 2026-03-30 at 23.08.07 (5).jpeg",
    ],
  },
});

Object.assign(detailPages, {
  "fgc-2023": {
    title: "Singapore",
    eyebrow: "First Global Challenge 2023",
    lead: "First Global Challenge 2023 din Singapore nu este doar o pagină separată în arhiva Delta Force, ci momentul în care echipa a reprezentat România într-un cadru internațional dedicat colaborării prin robotică.",
    intro: [
      "Participarea din Singapore a adus Delta Force într-un context diferit față de FTC sau FRC: mai mult accent pe reprezentare națională, pe schimb de idei și pe dimensiunea globală a programului FIRST. Tocmai de aceea, FGC merită descris separat, nu comprimat într-o notă scurtă la final de site.",
      "Relatările publice despre Team România au vorbit despre două medalii și mai multe distincții speciale, între care Innovation in Engineering, Al-Khwarizmi Outstanding Supporter, Safety Award și Social Media Award. Pentru Delta Force, asta înseamnă că pagina FGC poate arăta atât competiție, cât și impact internațional real.",
    ],
    focusLabel: "Story focus",
    focusTitle: "România pe scena globală",
    focusBody: "Descrierea sezonului trebuie să lege două lucruri: partea tehnică a competiției și partea umană a reprezentării. Singapore a fost un moment în care Delta Force a ieșit din formatul obișnuit al sezoanelor și a apărut ca parte dintr-o poveste mai mare, cea a României într-o competiție globală de robotică.",
    highlights: [
      "Delta Force a reprezentat România la First Global Challenge 2023 în Singapore",
      "două medalii și mai multe distincții speciale menționate public pentru Team România",
      "un capitol internațional diferit de FTC și FRC, dar esențial pentru identitatea echipei",
    ],
    outro: [
      "FGC 2023 merită tratat ca un feature internațional, nu ca o anexă la celelalte programe. Este genul de experiență care spune ceva important despre nivelul la care a ajuns Delta Force ca echipă și despre încrederea primită pentru a reprezenta țara într-un astfel de context.",
      "Descrierea sezonului poate închide foarte bine ideea asta: Singapore nu a fost doar o deplasare importantă, ci o validare a faptului că Delta Force poate conta și într-o competiție unde miza este atât performanța, cât și colaborarea dintre țări.",
    ],
    footer: "Pagina First Global Challenge 2023",
    images: [
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
      "assets/images/covers/fgc/firstglobalcover.png",
    ],
  },
  "events-invitationals": {
    title: "Invitationale",
    eyebrow: "Invitationals",
    lead: "Invitationalele merită pagina lor fiindcă spun o altă latură a echipei: competiții premium, contexte internaționale și experiențe care nu încap natural într-un singur sezon, dar care contează mult în povestea Delta Force.",
    intro: [
      "Pentru Delta Force, două dintre cele mai relevante exemple sunt Maryland Tech Invitational în FTC și Texas Robotics Invitational în FRC. Sunt evenimente care adună echipe puternice, ridică nivelul competitiv și oferă un tip diferit de validare față de traseul standard din sezon.",
      "Maryland Tech Invitational a venit după parcursul uriaș din Freight Frenzy, iar Texas Robotics Invitational a confirmat foarte repede forța debutului FRC 9001. Tocmai de aceea, invitationalele nu ar trebui să fie pierdute printre carduri de sezon; ele merită un loc distinct în site.",
    ],
    focusLabel: "Event focus",
    focusTitle: "Competiții care ies din tipar",
    focusBody: "Descrierea secțiunii poate merge pe ideea de nivel extins de competiție. Invitationalele arată cum Delta Force a ieșit din circuitul de bază și a intrat în evenimente unde comparația se face direct cu echipe foarte puternice, într-un cadru care pune accent atât pe performanță, cât și pe reputație.",
    highlights: [
      "Maryland Tech Invitational ca reper important pentru FTC 17713",
      "Texas Robotics Invitational ca reper major pentru FRC 9001",
      "competiții speciale care arată nivelul internațional al echipei",
    ],
    outro: [
      "În arhivă, astfel de pagini sunt utile tocmai pentru că rup monotonia cronologiei. Ele arată momentele în care Delta Force a intrat în scene mai largi, cu presiune mai mare și cu adversari care au ridicat standardul de competiție.",
      "Ca descriere, invitationalele funcționează cel mai bine dacă sunt prezentate ca borne internaționale: evenimente care nu aparțin strict unui campionat, dar care spun foarte bine unde se află echipa față de un context mai mare.",
    ],
    footer: "Pagina pentru invitationale",
    images: placeholderSet,
  },
});

const rewriteNarration = (text) => {
  if (typeof text !== "string") return text;

  return text
    .replace(/\bFTC 17713 a\b/g, "echipa noastră a")
    .replace(/\bFRC 9001 a\b/g, "echipa noastră a")
    .replace(/\b17713 a\b/g, "echipa noastră a")
    .replace(/\b9001 a\b/g, "echipa noastră a")
    .replace(/\barhiva Delta Force\b/g, "arhiva noastră")
    .replace(/\bpovestea Delta Force\b/g, "povestea noastră")
    .replace(/\bnumele Delta Force\b/g, "numele echipei noastre")
    .replace(/\bunei echipe ca Delta Force\b/g, "echipei noastre")
    .replace(/\bPentru Delta Force\b/g, "Pentru noi")
    .replace(/\bpentru Delta Force\b/g, "pentru echipa noastră")
    .replace(/\bLa Delta Force\b/g, "La noi")
    .replace(/\bla Delta Force\b/g, "la noi")
    .replace(/\bDelta Force a\b/g, "echipa noastră a")
    .replace(/\bDelta Force\b/g, "echipa noastră")
    .replace(/\bFTC 17713\b/g, "programul nostru FTC")
    .replace(/\bFRC 9001\b/g, "programul nostru FRC")
    .replace(/\b17713\b/g, "echipa noastră")
    .replace(/\b9001\b/g, "echipa noastră")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const normalizeDetailPageVoice = (page) => ({
  ...page,
  lead: rewriteNarration(page.lead),
  intro: Array.isArray(page.intro) ? page.intro.map(rewriteNarration) : [],
  focusTitle: rewriteNarration(page.focusTitle),
  focusBody: rewriteNarration(page.focusBody),
  highlights: Array.isArray(page.highlights) ? page.highlights.map(rewriteNarration) : [],
  outro: Array.isArray(page.outro) ? page.outro.map(rewriteNarration) : [],
  footer: `Arhiva sezonului ${page.title}`,
});

Object.keys(detailPages).forEach((pageKey) => {
  detailPages[pageKey] = normalizeDetailPageVoice(detailPages[pageKey]);
});

const detailPagesEn = {
  "ftc-freight-frenzy": {
    title: "Freight Frenzy",
    eyebrow: "2021 - 2022",
    lead: "Freight Frenzy was the season when our team moved from being a strong FTC contender to becoming a world champion. The game centered on freight, the duck carousel, and warehouse cycles, and the season closed with the run that carried us to a world title.",
    intro: [
      "In Romania, our team reached the top tier of the national championship and earned Inspire Award 2nd Place, a clear sign that we were standing out not only in matches, but also through the robot, documentation, outreach, and technical presentation.",
      "In Houston, the story reached its peak: our team won Franklin Division and then the FIRST World Championship as alliance captain. Freight Frenzy remains the season that set the real standard for our FTC program.",
    ],
    focusTitle: "From Nationals To Houston",
    focusBody: "The core of the season is the transition from strong national results to an international run in Houston. Freight Frenzy was the year we proved we could build a top robot, handle playoff pressure, and finish with the biggest result possible in FTC.",
    highlights: [
      "the season that carried us all the way to the FTC world title",
      "Inspire Award 2nd Place at Romania National Championship",
      "Franklin Division winner and FIRST World Championship winner in Houston",
    ],
    outro: [
      "From an archive perspective, Freight Frenzy explains why our team name started to be mentioned much more often outside Romania. It was a rare mix of pace, consistency, leadership, and strong technical execution.",
      "It works best as a breakthrough season page: our first major international peak, our first world title, and the year that raised the standard for everything that followed.",
    ],
    footer: "FTC season archive",
  },
  "ftc-power-play": {
    title: "Power Play",
    eyebrow: "2022 - 2023",
    lead: "Power Play was the season of cones, junctions, and endgame control, and for our team it became the year when the progress from the start of the season to nationals was the easiest to see.",
    intro: [
      "Early in the year we collected solid markers, including Innovate Award 3rd Place at RO022 Bucharest #1, but the real jump came at Romania National Championship.",
      "At nationals, our team finished first after qualifications, entered playoffs as Finalist Alliance Captain, and earned the Design Award. Power Play showed how much a team can grow during a season and still peak when it matters most.",
    ],
    focusTitle: "The Season Of Consistency",
    focusBody: "This season works best as a story about precision and growth. Power Play was not only about junction scoring and endgame control, but about how we refined both the robot and our teamwork until we were leading the rankings at nationals.",
    highlights: [
      "clear growth from the start of the season to nationals",
      "1st after qualifications at Romania National Championship",
      "Finalist Alliance Captain and Design Award at nationals",
    ],
    outro: [
      "As a season story, Power Play is the chapter in which our team showed that it can adjust quickly, learn from competition, and turn a difficult year into a very strong finish.",
      "It is also one of the clearest examples of internal progress: not only a strong final result, but a visible path from iterations and fixes to top form at the right time.",
    ],
    footer: "FTC season archive",
  },
  "ftc-centerstage": {
    title: "Centerstage",
    eyebrow: "2023 - 2024",
    lead: "Centerstage was the season of pixels, the backdrop, and the drone, and for our team it felt like the year when gameplay, robot design, and the way we presented ourselves finally started to connect.",
    intro: [
      "In the official FTC data, the season reads as stable and competitive. At RO #3 Timisoara, we earned the Design Award and became Finalist Alliance - 1st Team Selected, a sign that the robot and our match execution were moving in the right direction.",
      "Centerstage also had strong visual potential: backdrop scoring, the drone launch, and a cleaner presentation of the work behind the season. For us, it represents a more mature and more coherent FTC program.",
    ],
    focusTitle: "A Season With A Clear Image",
    focusBody: "The season works well as a story about identity taking shape. Centerstage was not only a good competition year, but also a year in which we showed more clearly how performance, robot design, and communication can work together.",
    highlights: [
      "a steadier and more coherent FTC season overall",
      "Design Award at RO #3 Timisoara",
      "Finalist Alliance - 1st Team Selected in a much steadier season",
    ],
    outro: [
      "Centerstage deserves to be framed as a season of visible consolidation. The results stayed strong, but maybe more importantly, the team looked more confident, more organized, and more deliberate in its technical choices.",
      "If Freight Frenzy was the breakthrough and Power Play was the jump in consistency, Centerstage is the year when our team started to look fully formed.",
    ],
    footer: "FTC season archive",
  },
  "ftc-into-the-deep": {
    title: "Into The Deep",
    eyebrow: "2024 - 2025",
    lead: "Into The Deep pushed FTC into an underwater game built around samples, specimens, and ascent, and for our team it became one of the strongest and most efficient seasons we have had so far.",
    intro: [
      "The season brought Winning Alliance - 1st Team Selected at West Romania League Tournament, plus the Design Award and a continued run toward Romania Championship.",
      "Into The Deep was the season in which the robot looked controlled and the pace of competition stayed consistent from one event to the next. In our FTC archive, it reads as a compact, clear, and highly competitive year.",
    ],
    focusTitle: "One Of Our Strongest FTC Seasons",
    focusBody: "The season is best described through control and consistency. Into The Deep delivered a regional title, a Design Award, and enough stability to confirm that our team is built on more than isolated peaks.",
    highlights: [
      "a very solid and very consistent FTC season",
      "Winning Alliance - 1st Team Selected at West Romania League Tournament",
      "Design Award and qualification to Romania Championship",
    ],
    outro: [
      "In the team timeline, Into The Deep is the kind of season that confirms the maturity of a program. It does not need a single dramatic surprise to feel important, because the awards and cohesion already support it.",
      "That is why it works well as an elegant, tightly connected season page, one where a competitive robot, steady execution, and a clearer visual identity all come together.",
    ],
    footer: "FTC season archive",
  },
  "ftc-decode": {
    title: "Decode",
    eyebrow: "2025 - 2026 / Current",
    lead: "Decode is the current FTC season, a game built around logic, pattern recognition, and quick decisions, and so far our team has turned it into another top-level run.",
    intro: [
      "In February 2026, our team won West Romania League Tournament as Winning Alliance - 1st Team Selected and also received Inspire Award 3rd Place.",
      "Decode is still open, but it already has enough substance to be treated like a serious season: strong results, a competitive rhythm, and a new path toward Romania Championship. Because the page is still alive, the structure should leave room for later updates.",
    ],
    focusTitle: "The Current Chapter, Already Competitive",
    focusBody: "The season works best as a current chapter already validated by results. Decode is no longer only a placeholder page for future updates: it already has a regional title and a major award, which means the story is already underway.",
    highlights: [
      "a very strong start in the official circuit",
      "Winning Alliance - 1st Team Selected at West Romania League Tournament",
      "Inspire Award 3rd Place in a season that is still open",
    ],
    outro: [
      "The advantage of a current season is that the page can grow together with the team. Each new event, robot iteration, and result can enter the story naturally.",
      "If the rhythm holds, Decode has every chance to finish as another defining FTC season rather than just a transition between two games.",
    ],
    footer: "Current FTC season archive",
  },
  "frc-charged-up": {
    title: "Charged Up",
    eyebrow: "2023",
    lead: "Charged Up is the season in which we opened our FRC chapter and showed from year one that we could enter a new format competitively. The game focused on grid scoring, links, and endgame balance, and our debut immediately brought pace, playoff appearances, and technical validation.",
    intro: [
      "At Bosphorus Regional 2023, we finished qualifications in 10th, became alliance captain, reached Regional Finalist, and earned the Industrial Design Award. For a rookie team, that was a clear sign that we were entering FRC not only to learn, but to compete right away.",
      "Later, at Texas Robotics Invitational, we climbed to 3rd in qualifications and were once again alliance captain. Charged Up remains the season in which we built our FRC presence with confidence, strong momentum, and a very visible international debut.",
    ],
    focusTitle: "The Start Of Our FRC Chapter",
    focusBody: "The season works best as a successful debut story. In Charged Up, we built a clear identity quickly: a competitive robot, international playoff runs, a technical award, and a start that made our FRC program credible from season one.",
    highlights: [
      "Very strong international debut",
      "Regional Finalist and Industrial Design Award at Bosphorus Regional 2023",
      "3rd in qualifications and alliance captain at Texas Robotics Invitational 2023",
    ],
    outro: [
      "Charged Up is not only the beginning of our FRC timeline; it is also the season that explains why the project gained credibility so quickly. We entered major competition with results, not only with potential.",
      "As a season page, it remains a historic start: our first FRC appearance, our first international validation, and the first clear sign that we could build a competitive program in this format too.",
    ],
    footer: "FRC season archive",
  },
  "frc-crescendo": {
    title: "Crescendo",
    eyebrow: "2024",
    lead: "Crescendo was the season of notes, the speaker, the amp, and the trap, and for us it worked as a year of consolidation after a very strong 2023 debut.",
    intro: [
      "We reached playoffs at both major regionals of the year, Istanbul Regional and Bosphorus Regional, and at Bosphorus we were alliance captain again.",
      "Crescendo does not have the drama of the Charged Up debut, but it has something very important for a young FRC program: continuity. We stayed competitive, remained relevant in playoffs, and showed that our progress does not depend on a single strong season.",
    ],
    focusTitle: "The Rhythm Of A Mature Season",
    focusBody: "The season works best as a consolidation chapter. In Crescendo, we started to look like a stable FRC program: steady playoff appearances, more mature iterations, and enough confidence to lead another alliance at Bosphorus.",
    highlights: [
      "playoffs and continuity in a consolidation season",
      "Playoff appearances at both Istanbul Regional and Bosphorus Regional",
      "Alliance captain at Bosphorus in a year of FRC consolidation",
    ],
    outro: [
      "In our FRC archive, Crescendo deserves to be seen as the season that strengthened the foundation. It was not only a follow-up to Charged Up, but the year in which we proved we could repeat playoff appearances and stay competitive in a tougher field.",
      "As a season description, it works very well around the idea of maturity: less about the surprise of the debut and more about proof that the program is gaining real continuity.",
    ],
    footer: "FRC season archive",
  },
  "frc-reefscape": {
    title: "Reefscape",
    eyebrow: "2025",
    lead: "Reefscape is the 2025 FRC season built around a marine theme, with coral, algae, and scoring on the reef, processor, and barge. For us, it is the season in which we competed at Sunset Showdown in San Francisco and reached the semifinals.",
    intro: [
      "Our appearance at Sunset Showdown in San Francisco gives Reefscape a clear competitive marker: we reached the semifinals in a strong international event.",
      "That is why Reefscape should not read like a simple transition chapter. It is the season that shows continuity, international presence, and the fact that our FRC program stayed competitive between the consolidation years and the current season.",
    ],
    focusTitle: "San Francisco and a run to the semifinals",
    focusBody: "This season works best through the combination of the official game theme and our result at Sunset Showdown. Reefscape kept the program active, visible, and competitive, and the semifinal run in San Francisco gives the page a clear and memorable anchor.",
    highlights: [
      "participation at Sunset Showdown in San Francisco",
      "a run to the semifinals",
      "a season that kept the FRC program active and competitive",
    ],
    outro: [
      "Reefscape deserves a place in the archive as the season that took the team into another international setting and showed that the program could keep its competitive level between Crescendo and Rebuilt.",
      "With its distinct game theme and the semifinal run in San Francisco, Reefscape reads much better as a clear chapter in our FRC evolution than as a simple bridge between two seasons.",
    ],
    footer: "FRC season archive",
  },
  "frc-rebuilt": {
    title: "Rebuilt",
    eyebrow: "2026 / Current",
    lead: "Rebuilt is the current FRC season, and so far it has started very strongly for us. The game emphasizes reconstruction, speed, and adaptation, and the season already has a serious result on the board from its first major public event.",
    intro: [
      "At Bosphorus Regional 2026, we finished qualifications in 11th, reached Regional Finalist, and earned the Creativity Award. For the start of a still-open season, that is already a strong signal: we are competitive, the robot is being noticed, and we are entering the spotlight early.",
      "Rebuilt should be described as a living season, still under construction, but already validated by results. That is exactly what makes it interesting: the page can follow the year in real time, from the first finalist finish to the next iterations and competitions.",
    ],
    focusTitle: "Our Current FRC Chapter",
    focusBody: "The season description should begin with what already exists: a finalist finish at Bosphorus, a Creativity Award, and a strong ranking in a field with powerful opponents. The rest of the page can grow naturally with updates, but the foundation is already credible and competitive.",
    highlights: [
      "11th after qualifications at Bosphorus Regional 2026",
      "Regional Finalist at the first major public event of the season",
      "Creativity Award in a season that has just begun",
    ],
    outro: [
      "In our FRC timeline, Rebuilt can very easily become the season that fully confirms the maturity of the program. A start built on a finalist finish and a technical award already shows that we are no longer just an interesting appearance, but a consistent competitive presence.",
      "Because the year is still open, the description has to leave room for what comes next. That is what the page does now: it anchors what is public today without closing the season story too early.",
    ],
    footer: "Current FRC season archive",
  },
  "fgc-2023": {
    title: "Singapore",
    eyebrow: "First Global Challenge 2023",
    lead: "First Global Challenge 2023 in Singapore is not just a separate page in our archive, but the moment when the team represented Romania in an international setting built around collaboration through robotics.",
    intro: [
      "The Singapore participation placed us in a different context than FTC or FRC: more focus on national representation, exchange of ideas, and the global side of the FIRST ecosystem. That is why FGC deserves a dedicated page rather than a small note at the end of the site.",
      "Public reports about Team Romania mentioned two medals and several special distinctions, including Innovation in Engineering, Al-Khwarizmi Outstanding Supporter, Safety Award, and Social Media Award. For us, that means the FGC page can present both competition and real international impact.",
    ],
    focusTitle: "Romania On A Global Stage",
    focusBody: "The season should connect two things: the technical side of the competition and the human side of representation. Singapore was a moment in which our team stepped outside the usual season format and became part of a larger story about Romania in a global robotics competition.",
    highlights: [
      "Our team represented Romania at First Global Challenge 2023 in Singapore",
      "Two medals and multiple public distinctions for Team Romania",
      "An international chapter distinct from FTC and FRC, but essential to the team identity",
    ],
    outro: [
      "FGC 2023 deserves to be treated like an international feature, not as an appendix to the other programs. It is the kind of experience that says something important about the level our team reached and the trust we received to represent the country in that context.",
      "That is also the strongest closing idea for the page: Singapore was not only an important trip, but a validation that our team can matter in a competition where the stakes are both performance and collaboration between countries.",
    ],
    footer: "FGC archive",
  },
  "events-premier": {
    title: "Premier Events",
    eyebrow: "Premier Events",
    lead: "This page is for moments that do not belong strictly to one season, but still deserve their own space and a presentation that feels premium.",
    intro: [
      "Premier events can include showcases, special appearances, demonstrations, public presentations, or any context in which our team needed a separate page outside the classic archive.",
      "This format lets the images carry the visual tone, while the text stays as concise as needed to connect the appearance, the context, and the impact of the event.",
    ],
    focusTitle: "Moments That Deserve Their Own Page",
    focusBody: "This section can gather the story of a special event, how it was prepared, who took part, what was presented, and why the moment deserves to be kept separately.",
    highlights: [
      "Good for showcases, demos, and public presentations",
      "Space for large images and a short recap",
      "A home for moments that sit outside the standard season timeline",
    ],
    outro: [
      "Pages like this work better when they feel spacious and deliberate. A few strong images and a short text can say more than a large number of boxes and labels.",
      "Over time, the section can become the right place for the team's most visible public moments without overloading the FTC, FRC, or FGC season pages.",
    ],
    footer: "Premier events archive",
  },
  "events-invitationals": {
    title: "Invitationals",
    eyebrow: "Invitationals",
    lead: "Invitationals deserve their own page because they show another side of the team: premium competitions, international contexts, and experiences that do not fit naturally into a single season, yet matter a lot in our story.",
    intro: [
      "For our team, two of the strongest examples are Maryland Tech Invitational in FTC and Texas Robotics Invitational in FRC. These are events that gather strong teams, raise the level of competition, and offer a different kind of validation compared with the standard season path.",
      "Maryland Tech Invitational came after the huge Freight Frenzy run, and Texas Robotics Invitational quickly confirmed the strength of our FRC debut. That is why invitationals should not disappear between season cards; they deserve a distinct place on the site.",
    ],
    focusTitle: "Competitions Outside The Usual Pattern",
    focusBody: "This section works best around the idea of an extended competitive level. Invitationals show how our team stepped outside the base circuit and entered events where the comparison is made directly against very strong teams, in an environment shaped by both performance and reputation.",
    highlights: [
      "Maryland Tech Invitational as an important FTC milestone",
      "Texas Robotics Invitational as a major FRC milestone",
      "Special competitions that show the team's international level",
    ],
    outro: [
      "In an archive, pages like these are valuable because they break the monotony of a strict timeline. They show moments when our team entered wider stages with stronger pressure and tougher opposition.",
      "As a framing, invitationals work best when they are presented as international milestones: events that do not belong to one championship only, but say a lot about where the team stands in a broader context.",
    ],
    footer: "Invitationals archive",
  },
};

const applyPageTextOverrides = (collection, overrides) => {
  Object.entries(overrides).forEach(([pageKey, pageOverrides]) => {
    if (!collection[pageKey]) return;
    collection[pageKey] = {
      ...collection[pageKey],
      ...pageOverrides,
    };
  });
};

applyPageTextOverrides(detailPages, {
  "ftc-freight-frenzy": {
    lead: "Freight Frenzy a fost sezonul în care echipa noastră a trecut din statutul de echipă foarte bună la statutul de campioană mondială FTC. Jocul a fost despre freight, duck carousel și warehouse cycles, iar sezonul oficial s-a încheiat la Houston, cu titlul mondial câștigat din postura de alliance captain.",
    highlights: [
      "sezonul care a dus echipa până la titlul mondial FTC",
      "Inspire Award 2nd Place la Romania National Championship",
      "Franklin Division winner și FIRST World Championship winner la Houston",
    ],
  },
  "ftc-power-play": {
    intro: [
      "În prima parte a anului, echipa noastră a adunat repere bune, inclusiv Innovate Award 3rd Place la RO022 Bucharest #1, dar adevărata explozie a venit la Romania National Championship.",
      "La națională, echipa noastră a terminat pe locul 1 după calificări, a intrat în playoff-uri ca Finalist Alliance Captain și a primit Design Award. Power Play a arătat foarte bine cum o echipă poate urca în timpul sezonului și poate închide anul mult peste așteptările inițiale.",
    ],
    highlights: [
      "progres clar de la începutul sezonului până la națională",
      "Locul 1 după calificări la Romania National Championship",
      "Finalist Alliance Captain și Design Award la națională",
    ],
  },
  "ftc-centerstage": {
    intro: [
      "În datele oficiale FTC, sezonul nostru se vede ca unul stabil și competitiv. La RO #3 Timișoara, echipa a obținut Design Award și a fost Finalist Alliance - 1st Team Selected, semn că robotul și execuția din meciuri mergeau în direcția bună.",
      "Centerstage a fost și un sezon cu mult potențial vizual: backdrop scoring, drone launch și o prezentare mai curată a întregii munci. Pentru echipa noastră, anul acesta arată un program FTC mai matur și mai coerent în toate direcțiile lui.",
    ],
    highlights: [
      "un sezon FTC mult mai stabil și mai coerent",
      "Design Award la RO #3 Timișoara",
      "Finalist Alliance - 1st Team Selected într-un sezon mult mai stabil",
    ],
  },
  "ftc-into-the-deep": {
    intro: [
      "Sezonul a adus Winning Alliance - 1st Team Selected la Romania West League Tournament, plus Design Award și continuarea parcursului către Romania Championship.",
      "Into The Deep a fost sezonul în care robotul a părut foarte controlat, iar ritmul de competiție a rămas constant de la un event la altul. Din punct de vedere al arhivei FTC, este un sezon ușor de descris ca fiind compact, clar și foarte competitiv.",
    ],
    highlights: [
      "un sezon FTC foarte solid și foarte constant",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Design Award și calificare la Romania Championship",
    ],
  },
  "ftc-decode": {
    intro: [
      "În februarie 2026, echipa noastră a câștigat West Romania League Tournament din postura de 1st Team Selected și a primit Inspire Award 3rd Place.",
      "Decode este încă deschis, dar are deja suficientă substanță ca să fie tratat ca un sezon serios: rezultate bune, ritm competitiv și un nou traseu spre Romania Championship. Tocmai pentru că pagina e vie, textul sezonului trebuie să lase loc și pentru update-uri ulterioare.",
    ],
    highlights: [
      "un start de sezon foarte puternic în circuitul oficial",
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Inspire Award 3rd Place într-un sezon încă deschis",
    ],
  },
  "frc-crescendo": {
    intro: [
      "Am prins playoff-uri la ambele regionale importante ale anului, Istanbul Regional și Bosphorus Regional, iar la Bosphorus am fost chiar alliance captain.",
      "Crescendo nu are dramatismul debutului din Charged Up, dar are ceva foarte important pentru un program aflat la început de drum în FRC: continuitate. Am rămas competitivi, am fost din nou relevanți în playoff-uri și am confirmat că progresul nostru nu depinde de un singur sezon bun.",
    ],
    highlights: [
      "playoff-uri și continuitate într-un sezon de consolidare",
      "Playoff-uri atât la Istanbul Regional, cât și la Bosphorus Regional",
      "Alliance captain la Bosphorus într-un an de consolidare FRC",
    ],
  },
});

applyPageTextOverrides(detailPagesEn, {
  "ftc-freight-frenzy": {
    lead: "Freight Frenzy was the season when our team moved from being a strong FTC contender to becoming a world champion. The game centered on freight, the duck carousel, and warehouse cycles, and the official season ended in Houston with a world title won as alliance captain.",
    highlights: [
      "the season that carried us all the way to the FTC world title",
      "Inspire Award 2nd Place at Romania National Championship",
      "Franklin Division winner and FIRST World Championship winner in Houston",
    ],
  },
  "ftc-power-play": {
    intro: [
      "Early in the year we collected solid markers, including Innovate Award 3rd Place at RO022 Bucharest #1, but the real jump came at Romania National Championship.",
      "At nationals, our team finished first after qualifications, entered playoffs as Finalist Alliance Captain, and earned the Design Award. Power Play showed how much a team can grow during a season and still peak when it matters most.",
    ],
    highlights: [
      "clear growth from the start of the season to nationals",
      "1st after qualifications at Romania National Championship",
      "Finalist Alliance Captain and Design Award at nationals",
    ],
  },
  "ftc-centerstage": {
    intro: [
      "In the official FTC data, the season reads as stable and competitive. At RO #3 Timisoara, we earned the Design Award and became Finalist Alliance - 1st Team Selected, a sign that the robot and our match execution were moving in the right direction.",
      "Centerstage also had strong visual potential: backdrop scoring, the drone launch, and a cleaner presentation of the work behind the season. For us, it represents a more mature and more coherent FTC program.",
    ],
    highlights: [
      "a steadier and more coherent FTC season overall",
      "Design Award at RO #3 Timisoara",
      "Finalist Alliance - 1st Team Selected in a much steadier season",
    ],
  },
  "ftc-into-the-deep": {
    intro: [
      "The season brought Winning Alliance - 1st Team Selected at West Romania League Tournament, plus the Design Award and a continued run toward Romania Championship.",
      "Into The Deep was the season in which the robot looked controlled and the pace of competition stayed consistent from one event to the next. In our FTC archive, it reads as a compact, clear, and highly competitive year.",
    ],
    highlights: [
      "a very solid and very consistent FTC season",
      "Winning Alliance - 1st Team Selected at West Romania League Tournament",
      "Design Award and qualification to Romania Championship",
    ],
  },
  "ftc-decode": {
    intro: [
      "In February 2026, our team won West Romania League Tournament as Winning Alliance - 1st Team Selected and also received Inspire Award 3rd Place.",
      "Decode is still open, but it already has enough substance to be treated like a serious season: strong results, a competitive rhythm, and a new path toward Romania Championship. Because the page is still alive, the structure should leave room for later updates.",
    ],
    highlights: [
      "a very strong start in the official circuit",
      "Winning Alliance - 1st Team Selected at West Romania League Tournament",
      "Inspire Award 3rd Place in a season that is still open",
    ],
  },
  "frc-crescendo": {
    intro: [
      "We reached playoffs at both major regionals of the year, Istanbul Regional and Bosphorus Regional, and at Bosphorus we were alliance captain again.",
      "Crescendo does not have the drama of the Charged Up debut, but it has something very important for a young FRC program: continuity. We stayed competitive, remained relevant in playoffs, and showed that our progress does not depend on a single strong season.",
    ],
    highlights: [
      "playoffs and continuity in a consolidation season",
      "Playoff appearances at both Istanbul Regional and Bosphorus Regional",
      "Alliance captain at Bosphorus in a year of FRC consolidation",
    ],
  },
});

const seasonalResearchRo = {
  "ftc-freight-frenzy": {
    themeKicker: "Tema sezonului",
    themeTitle: "Freight, ducks și warehouse cycles",
    themeBody:
      "FREIGHT FRENZY a fost jocul în care alianțele colectau freight, activau duck carousel și încărcau hub-urile, apoi închideau cu warehouse parking și capping. Sezonul a premiat ritmul bun de ciclat, controlul finalului de meci și consistența pe tot terenul.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pe listările oficiale FTC Events, pentru 2021 apar aceste repere importante pentru echipa noastră:",
    awardsList: [
      "FIRST Championship Winning Alliance - Captain la Houston",
      "Franklin Division Winning Alliance - Captain la FIRST Championship",
      "Inspire Award 2nd Place la Romania National Championship",
      "Design Award la RO #1 Regionala Timișoara & București",
      "Innovate Award la RU Remote Qualifier",
    ],
  },
  "ftc-power-play": {
    themeKicker: "Tema sezonului",
    themeTitle: "Conuri, junction-uri și control de final",
    themeBody:
      "POWERPLAY a fost jocul conurilor și al junction-urilor, cu accent pe autonomous bazat pe signal sleeve, scoring pe înălțimi diferite și un endgame în care controlul terenului conta enorm. A fost un sezon în care precizia și traseele curate făceau diferența.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Din datele oficiale FTC Events și din rezultatele finale de sezon, acestea sunt bornele care ies cel mai clar în față:",
    awardsList: [
      "Innovate Award 3rd Place la RO BUCHAREST #1",
      "Finalist Alliance - Captain la Romania National Championship",
      "Design Award la Romania National Championship",
      "Locul 1 după calificări la Romania National Championship",
    ],
  },
  "ftc-centerstage": {
    themeKicker: "Tema sezonului",
    themeTitle: "Pixels, backdrop și drone",
    themeBody:
      "CENTERSTAGE a mutat jocul spre plasarea de pixels pe backdrop, control bun al ciclurilor și un endgame memorabil cu drone launch. Sezonul a cerut finețe în scoring și coordonare foarte bună între autonomous și driver control.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pentru 2023, listarea oficială FTC Events confirmă aceste rezultate cheie pentru echipa noastră:",
    awardsList: [
      "Design Award la RO #3 Timișoara",
      "Finalist Alliance - 1st Team Selected la RO #3 Timișoara",
      "Prezență competitivă în 5 evenimente FTC",
    ],
  },
  "ftc-into-the-deep": {
    themeKicker: "Tema sezonului",
    themeTitle: "Samples, specimens și ascent",
    themeBody:
      "INTO THE DEEP a dus jocul FTC într-o zonă subacvatică, cu accent pe samples, specimens și ascent. Sezonul a recompensat controlul fin al robotului, scoring-ul curat și un ritm constant de la un meci la altul.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pe pagina oficială FTC Events pentru 2024 apar următoarele rezultate și premii pentru echipa noastră:",
    awardsList: [
      "Winning Alliance - 1st Team Selected la West Romania League Tournament",
      "Design Award la West Romania League Tournament",
      "Prezență la Romania Championship 2025",
    ],
  },
  "ftc-decode": {
    themeKicker: "Tema sezonului",
    themeTitle: "Logică, pattern-uri și decizii rapide",
    themeBody:
      "DECODE pune accent pe lectură bună a terenului, pattern-uri și decizii rapide, într-un format în care consistența dintre autonomous și driver control contează enorm. Este un joc care cere claritate, viteză și adaptare foarte bună pe parcursul meciului.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre de până acum",
    awardsIntro:
      "Sezonul este încă deschis, dar FTC Events listează deja câteva rezultate importante pentru echipa noastră:",
    awardsList: [
      "Winning Alliance - 1st Team Selected la Romania West League Tournament",
      "Inspire Award 3rd Place la Romania West League Tournament",
      "Prezență listată la Romania Championship 2026",
    ],
  },
  "frc-charged-up": {
    themeKicker: "Tema sezonului",
    themeTitle: "Conuri, cuburi, links și charging station",
    themeBody:
      "CHARGED UP a fost jocul grilelor cu conuri și cuburi, în care alianțele construiau links și căutau dock sau engage pe charging station în endgame. A fost un sezon care a premiat robotul versatil și o execuție calmă sub presiune.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pe FRC Events, debutul nostru din 2023 este legat în primul rând de Bosphorus Regional:",
    awardsList: [
      "Regional Finalists la Bosphorus Regional 2023",
      "Industrial Design Award la Bosphorus Regional 2023",
      "Debutul oficial al echipei noastre în FIRST Robotics Competition",
    ],
  },
  "frc-crescendo": {
    themeKicker: "Tema sezonului",
    themeTitle: "Notes, Speaker, Amp și Trap",
    themeBody:
      "CRESCENDO a fost jocul notelor, cu scoring în Speaker și Amp, plus Trap și climb pe Chain în endgame. Sezonul a pus accent pe flow de meci, alimentare rapidă și execuție coerentă a finalului.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pentru 2024, FRC Events nu listează premii oficiale, dar confirmă clar câteva rezultate importante:",
    awardsList: [
      "Playoff appearance la Istanbul Regional 2024",
      "Locul 10 din 51 după calificări la Bosphorus Regional 2024",
      "Captain of Alliance 7 la Bosphorus Regional 2024",
    ],
  },
  "frc-reefscape": {
    themeKicker: "Tema sezonului",
    themeTitle: "Coral, algae și scoring pe reef",
    themeBody:
      "REEFSCAPE a dus jocul FRC într-un decor marin, cu coral și algae plasate pe reef, processor și barge. Tema a fost construită în jurul unui flux de joc dinamic, cu accent pe poziționare și prioritizarea corectă a obiectivelor.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre din sezon",
    awardsIntro:
      "Pentru Reefscape, reperul central al paginii este participarea noastră internațională din San Francisco:",
    awardsList: [
      "Participare la Sunset Showdown în San Francisco",
      "Parcurs până în semifinale",
      "Sezonul Reefscape a ținut programul nostru FRC vizibil și competitiv internațional",
    ],
  },
  "frc-rebuilt": {
    themeKicker: "Tema sezonului",
    themeTitle: "Fuel cells, panouri de service și dock/climb",
    themeBody:
      "REBUILT, conform materialelor oficiale FRC 2026, combină fuel cells, montare de panouri în zonele de service și un endgame de dock sau climb. Este un joc orientat spre ritm, adaptare rapidă și reconstrucție eficientă a infrastructurii de pe teren.",
    awardsKicker: "Premii și rezultate",
    awardsTitle: "Reperele noastre de până acum",
    awardsIntro:
      "Sezonul este încă în mers, dar în listările publice oficiale apare deja acest rezultat important:",
    awardsList: [
      "Regional Finalists la Bosphorus Regional 2026",
      "Sezon activ, cu rezultate publice încă actualizabile pe FRC Events",
    ],
  },
  "fgc-2023": {
    themeKicker: "Tema competiției",
    themeTitle: "Hydrogen Horizons și energia curată",
    themeBody:
      "La FIRST Global Challenge 2023, tema oficială a fost «Hydrogen as a Clean Energy Carrier», iar jocul Hydrogen Horizons cerea alianțelor internaționale să producă, stocheze, transporte și convertească hidrogenul în alte forme de energie. A fost o competiție construită direct pe ideea de colaborare globală pentru un viitor energetic mai curat.",
    awardsKicker: "Medalii și premii",
    awardsTitle: "Reperele noastre din Singapore",
    awardsIntro:
      "În sursele publice despre Team România apar aceste distincții pentru participarea noastră la FGC 2023:",
    awardsList: [
      "Medalie de argint pentru Al-Khwarizmi Award for Outstanding Supporter",
      "Medalie de bronz pentru Ustad Ahmad Lahori Award for Innovation in Engineering",
      "Social Media Challenge Award",
      "Safety Award",
    ],
  },
};

const seasonalResearchEn = {
  "ftc-freight-frenzy": {
    themeKicker: "Season theme",
    themeTitle: "Freight, ducks, and warehouse cycles",
    themeBody:
      "FREIGHT FRENZY was the game in which alliances collected freight, activated the duck carousel, and loaded hubs before closing with warehouse parking and capping. The season rewarded clean cycling, reliable endgame control, and consistency across the full field.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "On the official FTC Events listings, these are the biggest public milestones for our 2021 season:",
    awardsList: [
      "FIRST Championship Winning Alliance - Captain in Houston",
      "Franklin Division Winning Alliance - Captain at FIRST Championship",
      "Inspire Award 2nd Place at Romania National Championship",
      "Design Award at RO #1 Regionala Timisoara & Bucuresti",
      "Innovate Award at RU Remote Qualifier",
    ],
  },
  "ftc-power-play": {
    themeKicker: "Season theme",
    themeTitle: "Cones, junctions, and endgame control",
    themeBody:
      "POWERPLAY was the season of cones and junctions, with autonomous choices driven by the signal sleeve, layered scoring heights, and an endgame where field control mattered a lot. Precision and efficient routes made the biggest difference.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "From official FTC Events data and the final season results, these are the clearest markers for our run:",
    awardsList: [
      "Innovate Award 3rd Place at RO BUCHAREST #1",
      "Finalist Alliance - Captain at Romania National Championship",
      "Design Award at Romania National Championship",
      "1st after qualifications at Romania National Championship",
    ],
  },
  "ftc-centerstage": {
    themeKicker: "Season theme",
    themeTitle: "Pixels, backdrop, and drones",
    themeBody:
      "CENTERSTAGE moved FTC toward pixel scoring on the backdrop, controlled cycling, and a memorable drone launch endgame. It was a season that rewarded scoring finesse and strong coordination between autonomous and driver control.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "For 2023, the official FTC Events page confirms these key results for our team:",
    awardsList: [
      "Design Award at RO #3 Timisoara",
      "Finalist Alliance - 1st Team Selected at RO #3 Timisoara",
      "Competitive presence across 5 FTC events",
    ],
  },
  "ftc-into-the-deep": {
    themeKicker: "Season theme",
    themeTitle: "Samples, specimens, and ascent",
    themeBody:
      "INTO THE DEEP pushed FTC into an underwater world built around samples, specimens, and ascent. The season rewarded fine robot control, clean scoring, and a steady pace from one match to the next.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "On the official 2024 FTC Events page, these are the main public results for our team:",
    awardsList: [
      "Winning Alliance - 1st Team Selected at West Romania League Tournament",
      "Design Award at West Romania League Tournament",
      "Romania Championship 2025 appearance",
    ],
  },
  "ftc-decode": {
    themeKicker: "Season theme",
    themeTitle: "Logic, patterns, and quick decisions",
    themeBody:
      "DECODE emphasizes field reading, pattern recognition, and fast decisions in a format where consistency between autonomous and driver control matters a lot. It is a game built around clarity, speed, and smart adaptation during the match.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key markers so far",
    awardsIntro:
      "The season is still open, but FTC Events already lists several important public results for our team:",
    awardsList: [
      "Winning Alliance - 1st Team Selected at Romania West League Tournament",
      "Inspire Award 3rd Place at Romania West League Tournament",
      "Romania Championship 2026 appearance listed publicly",
    ],
  },
  "frc-charged-up": {
    themeKicker: "Season theme",
    themeTitle: "Cones, cubes, links, and charging station",
    themeBody:
      "CHARGED UP was the grid game of cones and cubes, where alliances built links and chased dock or engage on the charging station in endgame. It rewarded versatility, structure, and calm execution under pressure.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "On FRC Events, our 2023 debut is tied mainly to the Bosphorus Regional results:",
    awardsList: [
      "Regional Finalists at Bosphorus Regional 2023",
      "Industrial Design Award at Bosphorus Regional 2023",
      "Our official FIRST Robotics Competition debut season",
    ],
  },
  "frc-crescendo": {
    themeKicker: "Season theme",
    themeTitle: "Notes, Speaker, Amp, and Trap",
    themeBody:
      "CRESCENDO was the game of Notes, with scoring in the Speaker and Amp, followed by Trap and Chain climb in the endgame. It put a premium on match flow, quick feeding, and clean finishing execution.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "For 2024, FRC Events does not list judged awards, but it does confirm these important competitive results:",
    awardsList: [
      "Playoff appearance at Istanbul Regional 2024",
      "10th out of 51 after qualifications at Bosphorus Regional 2024",
      "Captain of Alliance 7 at Bosphorus Regional 2024",
    ],
  },
  "frc-reefscape": {
    themeKicker: "Season theme",
    themeTitle: "Coral, algae, and reef scoring",
    themeBody:
      "REEFSCAPE moved FRC into a marine setting built around coral and algae scored on the reef, processor, and barge. The theme was shaped around positioning, dynamic flow, and smart prioritization of field objectives.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key season markers",
    awardsIntro:
      "For Reefscape, the central competitive marker on this page is our international appearance in San Francisco:",
    awardsList: [
      "Participation at Sunset Showdown in San Francisco",
      "A run to the semifinals",
      "The Reefscape season kept our FRC program visible and competitive internationally",
    ],
  },
  "frc-rebuilt": {
    themeKicker: "Season theme",
    themeTitle: "Fuel cells, service panels, and dock or climb",
    themeBody:
      "REBUILT, according to the official 2026 FRC materials, combines fuel cells, service-panel placement, and an endgame based on dock or climb. It is a game built around pace, adaptation, and efficient reconstruction of field infrastructure.",
    awardsKicker: "Awards and results",
    awardsTitle: "Our key markers so far",
    awardsIntro:
      "The season is still active, but the public official listings already show this important result:",
    awardsList: [
      "Regional Finalists at Bosphorus Regional 2026",
      "Active season, with public results still subject to update on FRC Events",
    ],
  },
  "fgc-2023": {
    themeKicker: "Competition theme",
    themeTitle: "Hydrogen Horizons and clean energy",
    themeBody:
      "At FIRST Global Challenge 2023, the official theme was \"Hydrogen as a Clean Energy Carrier,\" and the Hydrogen Horizons game asked international alliances to produce, store, transport, and convert hydrogen into other forms of energy. It was a competition built directly around global collaboration for a cleaner energy future.",
    awardsKicker: "Medals and awards",
    awardsTitle: "Our key markers in Singapore",
    awardsIntro:
      "The public sources about Team Romania list these distinctions for our FGC 2023 participation:",
    awardsList: [
      "Silver medal for the Al-Khwarizmi Award for Outstanding Supporter",
      "Bronze medal for the Ustad Ahmad Lahori Award for Innovation in Engineering",
      "Social Media Challenge Award",
      "Safety Award",
    ],
  },
};

applyPageTextOverrides(detailPages, seasonalResearchRo);
applyPageTextOverrides(detailPagesEn, seasonalResearchEn);

applyPageTextOverrides(detailPages, {
  "frc-reefscape": {
    lead: "Reefscape este sezonul FRC 2025 construit pe tema coral, algae și scoring pe reef, processor și barge. Pentru noi, rămâne sezonul în care am participat la Sunset Showdown în San Francisco și am ajuns până în semifinale.",
    intro: [
      "Participarea la Sunset Showdown din San Francisco a dat un reper clar sezonului nostru Reefscape: am intrat în playoff-uri și am mers până în semifinale într-un eveniment internațional puternic.",
      "De aceea, Reefscape nu trebuie citit ca un simplu capitol de tranziție. Este sezonul care arată continuitate, prezență internațională și faptul că programul nostru FRC a rămas competitiv între anii de consolidare și sezonul actual.",
    ],
    focusTitle: "San Francisco și un parcurs până în semifinale",
    focusBody:
      "Descrierea sezonului merge cel mai bine pe combinația dintre tema oficială a jocului și rezultatul nostru de la Sunset Showdown. Reefscape a ținut programul activ, vizibil și competitiv, iar semifinalele din San Francisco dau paginii un reper concret și memorabil.",
    highlights: [
      "participare la Sunset Showdown în San Francisco",
      "parcurs până în semifinale",
      "sezon care a ținut programul FRC activ și competitiv",
    ],
    outro: [
      "Reefscape merită păstrat în arhivă ca sezonul care a dus echipa într-un nou context internațional și a arătat că programul își păstrează nivelul competitiv între Crescendo și Rebuilt.",
      "Cu tema lui distinctă și cu semifinalele din San Francisco, pagina Reefscape stă mult mai bine în cronologie ca un capitol clar al evoluției noastre FRC, nu ca o simplă punte între două sezoane.",
    ],
  },
  "frc-rebuilt": {
    lead: "Rebuilt este sezonul actual FRC 2026, iar materialele oficiale îl descriu ca un joc despre fuel cells, zone de service și dock/climb. În sursele publice FRC Events verificate acum, rezultatul confirmat pentru echipa noastră este Regional Finalists la Bosphorus Regional.",
    intro: [
      "Listarea publică oficială disponibilă pentru Bosphorus Regional 2026 arată că echipa noastră a ajuns Regional Finalists, ceea ce face deja startul sezonului unul puternic și credibil.",
      "Pentru că anul este încă deschis, pagina lasă loc pentru update-uri viitoare fără să fixeze premii sau clasări care nu apar încă public în sursa oficială verificată. Așa păstrăm totul corect și ușor de actualizat pe măsură ce sezonul avansează.",
    ],
    focusTitle: "Start puternic, sezon încă deschis",
    focusBody:
      "Până acum, reperul public confirmat este finish-ul de Regional Finalists la Bosphorus Regional 2026. Restul paginii rămâne pregătit pentru update-uri viitoare, dar fără să fixeze premii sau clasări care nu apar încă în sursa oficială verificată.",
    highlights: [
      "Regional Finalists la Bosphorus Regional 2026",
      "Jocul oficial 2026 combină fuel cells, zone de service și dock/climb",
      "Pagina rămâne deschisă pentru update-uri pe măsură ce sezonul avansează",
    ],
    outro: [
      "În cronologia noastră FRC, Rebuilt poate deveni foarte ușor sezonul care confirmă complet maturizarea programului. Un start cu finalist finish arată deja că suntem o prezență competitivă serioasă și constantă.",
      "Pentru că anul este încă deschis, descrierea lui trebuie să lase loc și pentru ce urmează. Exact asta face pagina acum: fixează ce există public până azi, fără să închidă artificial povestea sezonului.",
    ],
  },
});

applyPageTextOverrides(detailPagesEn, {
  "frc-reefscape": {
    lead: "Reefscape is the 2025 FRC season built around coral, algae, and scoring on the reef, processor, and barge. For us, it is the season in which we competed at Sunset Showdown in San Francisco and reached the semifinals.",
    intro: [
      "Our appearance at Sunset Showdown in San Francisco gives Reefscape a clear competitive marker: we reached the semifinals in a strong international event.",
      "That is why Reefscape should not read like a simple transition chapter. It is the season that shows continuity, international presence, and the fact that our FRC program stayed competitive between the consolidation years and the current season.",
    ],
    focusTitle: "San Francisco and a run to the semifinals",
    focusBody:
      "This season works best through the combination of the official game theme and our result at Sunset Showdown. Reefscape kept the program active, visible, and competitive, and the semifinal run in San Francisco gives the page a clear and memorable anchor.",
    highlights: [
      "participation at Sunset Showdown in San Francisco",
      "a run to the semifinals",
      "a season that kept the FRC program active and competitive",
    ],
    outro: [
      "Reefscape deserves a place in the archive as the season that took the team into another international setting and showed that the program could keep its competitive level between Crescendo and Rebuilt.",
      "With its distinct game theme and the semifinal run in San Francisco, Reefscape reads much better as a clear chapter in our FRC evolution than as a simple bridge between two seasons.",
    ],
  },
  "frc-rebuilt": {
    lead: "Rebuilt is the current 2026 FRC season, and the official materials describe it as a game built around fuel cells, service areas, and dock or climb. In the public FRC Events sources verified now, the confirmed result for our team is Regional Finalists at Bosphorus Regional.",
    intro: [
      "The public official listing available for Bosphorus Regional 2026 shows that our team reached Regional Finalists, which already makes the start of the season a strong and credible one.",
      "Because the year is still open, the page leaves room for future updates without locking in awards or rankings that do not yet appear in the verified official public source. That keeps the archive accurate and easy to update as the season moves forward.",
    ],
    focusTitle: "A strong start, with the season still open",
    focusBody:
      "For now, the confirmed public marker is the Regional Finalists finish at Bosphorus Regional 2026. The rest of the page stays ready for future updates, but without locking in awards or rankings that do not yet appear in the verified official source.",
    highlights: [
      "Regional Finalists at Bosphorus Regional 2026",
      "The official 2026 game combines fuel cells, service areas, and dock or climb",
      "The page stays open for updates as the season moves forward",
    ],
    outro: [
      "In our FRC timeline, Rebuilt can very easily become the season that fully confirms the maturity of the program. A start built on a finalist finish already shows that we are a serious and consistent competitive presence.",
      "Because the year is still open, the description has to leave room for what comes next. That is what the page does now: it anchors what is public today without closing the season story too early.",
    ],
  },
});

const activeSection = inferDetailSection(detailPageKey);

const renderDetailNav = () => {
  if (!detailHeader) return;
  detailHeader.classList.add("topbar");

  detailHeader.innerHTML = `
    <nav class="nav-shell">
      <a class="brand" href="index.html#home" aria-label="Pagina principală Delta Force">
        <img class="brand-logo" src="assets/images/brand/logo-copy.png" alt="Delta Force logo">
        <span class="brand-copy">
          <strong>DELTA FORCE</strong>
          <small>FRC 9001 / FTC 17713</small>
        </span>
      </a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Deschide meniul de navigare">
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" id="nav-menu">
        <a href="index.html#home" data-nav-link="home">Home</a>
        <a href="index.html#ftc" data-nav-link="ftc">FTC</a>
        <a href="index.html#frc" data-nav-link="frc">FRC</a>
        <a href="index.html#fgc" data-nav-link="fgc">FGC</a>
        <a href="index.html#contact" data-nav-link="contact">Contact</a>
        <button class="language-toggle" type="button" aria-pressed="false" aria-label="Schimbă în engleză" title="Schimbă în engleză">
          <img class="language-flag-image" src="assets/images/flags/romania.png" alt="" aria-hidden="true">
        </button>
      </div>
    </nav>
  `;
};

const renderParagraphs = (paragraphs) =>
  paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

const renderList = (items) =>
  items.map((item) => `<li>${item}</li>`).join("");

const renderSeasonResearch = (page) => {
  if (!page.themeBody && !(Array.isArray(page.awardsList) && page.awardsList.length)) {
    return "";
  }

  const awardsList = Array.isArray(page.awardsList) && page.awardsList.length
    ? `
      <ul class="detail-summary-list">
        ${renderList(page.awardsList)}
      </ul>
    `
    : "";

  return `
    <section class="detail-season-summary">
      <article class="detail-summary-card">
        <p class="detail-copy-kicker">${page.themeKicker ?? ""}</p>
        <h2>${page.themeTitle ?? ""}</h2>
        <p>${page.themeBody ?? ""}</p>
      </article>

      <article class="detail-summary-card detail-summary-card--awards">
        <p class="detail-copy-kicker">${page.awardsKicker ?? ""}</p>
        <h2>${page.awardsTitle ?? ""}</h2>
        ${awardsList}
      </article>
    </section>
  `;
};

const seasonVideoTranslations = {
  ro: {
    frameTitle: (title) => `Vezi pe YouTube: ${title}`,
    channelLabel: "Official FIRST",
    watchLabel: "Vezi pe YouTube",
  },
  en: {
    frameTitle: (title) => `Watch on YouTube: ${title}`,
    channelLabel: "Official FIRST",
    watchLabel: "Watch on YouTube",
  },
};

const seasonVideos = {
  "ftc-freight-frenzy": {
    embedId: "I6lX12idAf8",
    youtubeUrl: "https://www.youtube.com/watch?v=I6lX12idAf8",
    title: {
      ro: "Freight Frenzy, explicat vizual",
      en: "Freight Frenzy, explained visually",
    },
    description: {
      ro: "Clipul oficial FIRST arată tema sezonului, fluxul de punctare și cum funcționează alianțele de câte 2 echipe pe teren.",
      en: "The official FIRST video explains the season theme, the scoring flow, and how two-team alliances work on the field.",
    },
  },
  "ftc-power-play": {
    embedId: "HsitvZ0JaDc",
    youtubeUrl: "https://www.youtube.com/watch?v=HsitvZ0JaDc",
    title: {
      ro: "Power Play, explicat vizual",
      en: "Power Play, explained visually",
    },
    description: {
      ro: "Aici se vede clar cum se joacă Power Play: junctions, cone cycles, endgame și ritmul complet al unui meci FTC.",
      en: "This video clearly breaks down Power Play: junctions, cone cycles, the endgame, and the full rhythm of an FTC match.",
    },
  },
  "ftc-centerstage": {
    embedId: "6e-5Uo1dRic",
    youtubeUrl: "https://www.youtube.com/watch?v=6e-5Uo1dRic",
    title: {
      ro: "Centerstage, explicat vizual",
      en: "Centerstage, explained visually",
    },
    description: {
      ro: "Videoul oficial explică foarte bine pixels, backdrop-ul, drone launch-ul și felul în care se construiește scorul într-un meci.",
      en: "The official video clearly explains pixels, the backdrop, drone launch, and how scoring builds up across a match.",
    },
  },
  "ftc-into-the-deep": {
    embedId: "ewlDPvRK4U4",
    youtubeUrl: "https://www.youtube.com/watch?v=ewlDPvRK4U4",
    title: {
      ro: "Into The Deep, explicat vizual",
      en: "Into The Deep, explained visually",
    },
    description: {
      ro: "Clipul oficial arată tema subacvatică, samples, specimens, ascent și dinamica generală a jocului FTC din acest sezon.",
      en: "The official clip covers the underwater theme, samples, specimens, ascent, and the overall FTC game flow for this season.",
    },
  },
  "ftc-decode": {
    embedId: "LCqWA6gSCXA",
    youtubeUrl: "https://www.youtube.com/watch?v=LCqWA6gSCXA",
    title: {
      ro: "Decode, explicat vizual",
      en: "Decode, explained visually",
    },
    description: {
      ro: "Videoul explică tema actuală, logica terenului, cum se marchează punctele și ce trebuie să facă alianțele FTC în timpul meciului.",
      en: "This video explains the current theme, the field logic, how points are scored, and what FTC alliances need to do during the match.",
    },
  },
  "frc-charged-up": {
    embedId: "0zpflsYc4PA",
    youtubeUrl: "https://www.youtube.com/watch?v=0zpflsYc4PA",
    title: {
      ro: "Charged Up, explicat vizual",
      en: "Charged Up, explained visually",
    },
    description: {
      ro: "Animația oficială FIRST arată grid scoring, links și endgame balance, plus cum se mișcă alianțele de câte 3 roboți pe terenul FRC.",
      en: "The official FIRST animation explains grid scoring, links, endgame balance, and how three-robot alliances move across the FRC field.",
    },
  },
  "frc-crescendo": {
    embedId: "9keeDyFxzY4",
    youtubeUrl: "https://www.youtube.com/watch?v=9keeDyFxzY4",
    title: {
      ro: "Crescendo, explicat vizual",
      en: "Crescendo, explained visually",
    },
    description: {
      ro: "Clipul oficial detaliază speaker, amp, trap și fluxul de punctare, astfel încât se înțelege imediat cum se joacă acest sezon FRC.",
      en: "The official clip breaks down the speaker, amp, trap, and scoring flow so the full FRC season concept is easy to understand.",
    },
  },
  "frc-reefscape": {
    embedId: "YWbxcjlY9JY",
    youtubeUrl: "https://www.youtube.com/watch?v=YWbxcjlY9JY",
    title: {
      ro: "Reefscape, explicat vizual",
      en: "Reefscape, explained visually",
    },
    description: {
      ro: "Videoul oficial explică tema recifului, coralul, algae, processor-ul și modul în care alianțele FRC construiesc scorul pe parcursul meciului.",
      en: "The official video explains the reef theme, coral, algae, the processor, and how FRC alliances build score throughout the match.",
    },
  },
  "frc-rebuilt": {
    embedId: "_fybREErgyM",
    youtubeUrl: "https://www.youtube.com/watch?v=_fybREErgyM",
    title: {
      ro: "Rebuilt, explicat vizual",
      en: "Rebuilt, explained visually",
    },
    description: {
      ro: "Aici se vede clar tema actuală Rebuilt, zonele de joc, obiectivele de punctare și dinamica alianțelor mari FRC în meci.",
      en: "This one clearly shows the current Rebuilt theme, field zones, scoring objectives, and the match flow of full FRC alliances.",
    },
  },
};

const renderSeasonVideo = (pageKey, language) => {
  const video = seasonVideos[pageKey];
  if (!video) return "";

  const ui = seasonVideoTranslations[language] ?? seasonVideoTranslations.ro;
  const title = video.title[language] ?? video.title.ro;
  const canEmbedInPage =
    window.location.protocol === "http:" || window.location.protocol === "https:";
  const embedUrl = canEmbedInPage
    ? `https://www.youtube-nocookie.com/embed/${video.embedId}?rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`
    : "";

  return `
    <section class="detail-season-video">
      ${
        canEmbedInPage
          ? `
            <div class="detail-video-card detail-video-card--only">
              <div class="detail-video-frame">
                <iframe
                  src="${embedUrl}"
                  title="${ui.frameTitle(title)}"
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          `
          : `
            <a class="detail-video-card detail-video-card--only" href="${video.youtubeUrl}" target="_blank" rel="noopener noreferrer" aria-label="${ui.frameTitle(title)}" title="${ui.frameTitle(title)}">
              <div class="detail-video-frame">
                <img src="https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg" alt="${title}" loading="lazy">
                <span class="detail-video-overlay" aria-hidden="true">
                  <span class="detail-video-play"></span>
                </span>
              </div>
            </a>
          `
      }
    </section>
  `;
};

const buildPageImages = (page, ui) => {
  const sources = Array.isArray(page.images) && page.images.length
    ? page.images.slice(0, 4)
    : Array(4).fill("assets/images/common/placeholder.png");

  while (sources.length < 4) {
    sources.push("assets/images/common/placeholder.png");
  }

  return sources.map((entry, index) => {
    const image = typeof entry === "string" ? { src: entry } : (entry ?? {});
    return {
      src: image.src ?? "assets/images/common/placeholder.png",
      alt: image.alt ?? `${page.title} - ${ui.gallery.imageLabels[index]}`,
      position: image.position ?? "",
    };
  });
};

const renderImage = (image, index, className, ui) => `
  <figure class="detail-media ${className}">
    <button class="detail-media-button" type="button" data-gallery-index="${index}" aria-label="${ui.gallery.open}: ${image.alt}">
      <img src="${image.src}" alt="${image.alt}" ${image.position ? `style="object-position: ${image.position};"` : ""} ${index === 0 ? 'loading="eager"' : 'loading="lazy"'}>
    </button>
  </figure>
`;

const renderDetailPage = (language) => {
  if (!detailMain || !detailFooter) return;

  const basePage = detailPages[detailPageKey];
  if (!basePage) return;

  const ui = repairNestedStrings(detailTranslations[language] ?? detailTranslations.ro);
  const page = repairNestedStrings(
    language === "en"
      ? { ...basePage, ...(detailPagesEn[detailPageKey] ?? {}) }
      : basePage
  );
  const images = buildPageImages(page, ui);

  detailMain.innerHTML = `
    <section class="detail-page">
      <div class="detail-intro">
        <p class="detail-eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
      </div>

      ${renderSeasonResearch(page)}
      ${renderSeasonVideo(detailPageKey, language)}

      <article class="detail-article">
        ${renderImage(images[0], 0, "detail-media--hero", ui)}

        <div class="detail-copy">
          ${renderParagraphs(page.intro)}
        </div>

        <section class="detail-feature">
          ${renderImage(images[1], 1, "detail-media--feature", ui)}
          <div class="detail-feature-copy">
            <h2>${page.focusTitle}</h2>
            <p>${page.focusBody}</p>
            <ul class="detail-feature-list">
              ${renderList(page.highlights)}
            </ul>
          </div>
        </section>

        <div class="detail-copy">
          ${renderParagraphs(page.outro)}
        </div>

        <div class="detail-media-grid">
          ${renderImage(images[2], 2, "detail-media--tail-wide", ui)}
          ${renderImage(images[3], 3, "detail-media--tail-tall", ui)}
        </div>
      </article>
    </section>
  `;

  detailFooter.innerHTML = `
    <div class="footer-brand">
      <strong>Delta Force Robotics</strong>
      <span>FRC 9001 / FTC 17713</span>
      <small class="footer-copyright">© 2026 Delta Force Robotics. All rights reserved.</small>
    </div>

    <div class="footer-socials" aria-label="Canale sociale Delta Force">
      <a class="footer-social-button" href="https://www.facebook.com/DeltaForceFTC" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
        <img class="footer-social-icon footer-social-icon-fb" src="assets/images/social/fb.png" alt="" aria-hidden="true">
      </a>
      <a class="footer-social-button" href="https://www.instagram.com/delta_force_robotics/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
        <img class="footer-social-icon footer-social-icon-ig" src="assets/images/social/ig.png" alt="" aria-hidden="true">
      </a>
      <a class="footer-social-button" href="https://ro.linkedin.com/company/delta-force-robotics" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
        <img class="footer-social-icon footer-social-icon-linkedin" src="assets/images/social/linked.png" alt="" aria-hidden="true">
      </a>
      <a class="footer-social-button" href="https://www.youtube.com/@deltaforcerobotics" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
        <img class="footer-social-icon footer-social-icon-yt" src="assets/images/social/yt.png" alt="" aria-hidden="true">
      </a>
    </div>
  `;

  document.title = `${page.title} | Delta Force Robotics`;
  bindDetailGallery(images, ui);
  repairRenderedText(detailMain);
  repairRenderedText(detailFooter);
};

let detailLightboxRefs = null;
const detailGalleryState = {
  images: [],
  index: 0,
  ui: detailTranslations.ro,
};

const ensureDetailLightbox = () => {
  if (detailLightboxRefs) return detailLightboxRefs;

  const root = document.createElement("div");
  root.className = "detail-lightbox";
  root.innerHTML = `
    <button class="detail-lightbox-backdrop" type="button" aria-label="Close gallery"></button>
    <div class="detail-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Image gallery">
      <div class="detail-lightbox-stage">
        <div class="detail-lightbox-frame">
          <img class="detail-lightbox-image" src="" alt="">
        </div>
        <div class="detail-lightbox-toolbar">
          <div class="detail-lightbox-meta">
            <span class="detail-lightbox-counter"></span>
          </div>
          <div class="detail-lightbox-actions">
            <button class="detail-lightbox-action" type="button" data-lightbox-prev></button>
            <button class="detail-lightbox-action" type="button" data-lightbox-next></button>
            <button class="detail-lightbox-action" type="button" data-lightbox-close></button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(root);

  detailLightboxRefs = {
    root,
    backdrop: root.querySelector(".detail-lightbox-backdrop"),
    image: root.querySelector(".detail-lightbox-image"),
    counter: root.querySelector(".detail-lightbox-counter"),
    prev: root.querySelector("[data-lightbox-prev]"),
    next: root.querySelector("[data-lightbox-next]"),
    close: root.querySelector("[data-lightbox-close]"),
  };

  detailLightboxRefs.backdrop.addEventListener("click", () => closeDetailGallery());
  detailLightboxRefs.close.addEventListener("click", () => closeDetailGallery());
  detailLightboxRefs.prev.addEventListener("click", () => stepDetailGallery(-1));
  detailLightboxRefs.next.addEventListener("click", () => stepDetailGallery(1));

  document.addEventListener("keydown", (event) => {
    if (!detailLightboxRefs?.root.classList.contains("is-open")) return;

    if (event.key === "Escape") closeDetailGallery();
    if (event.key === "ArrowLeft") stepDetailGallery(-1);
    if (event.key === "ArrowRight") stepDetailGallery(1);
  });

  return detailLightboxRefs;
};

const updateDetailLightbox = () => {
  const refs = ensureDetailLightbox();
  const ui = detailGalleryState.ui ?? detailTranslations.ro;
  const current = detailGalleryState.images[detailGalleryState.index];
  if (!current) return;

  refs.image.src = current.src;
  refs.image.alt = current.alt;
  refs.counter.textContent = ui.gallery.counter(detailGalleryState.index + 1, detailGalleryState.images.length);
  refs.prev.textContent = ui.gallery.previous;
  refs.next.textContent = ui.gallery.next;
  refs.close.textContent = ui.gallery.close;
  refs.backdrop.setAttribute("aria-label", ui.gallery.close);
};

const openDetailGallery = (index) => {
  const refs = ensureDetailLightbox();
  detailGalleryState.index = index;
  updateDetailLightbox();
  refs.root.classList.add("is-open");
  detailBody.style.overflow = "hidden";
};

const closeDetailGallery = () => {
  if (!detailLightboxRefs) return;
  detailLightboxRefs.root.classList.remove("is-open");
  detailBody.style.overflow = "";
};

const stepDetailGallery = (direction) => {
  if (!detailGalleryState.images.length) return;

  const total = detailGalleryState.images.length;
  detailGalleryState.index = (detailGalleryState.index + direction + total) % total;
  updateDetailLightbox();
};

const bindDetailGallery = (images, ui) => {
  detailGalleryState.images = images;
  detailGalleryState.index = 0;
  detailGalleryState.ui = ui;

  ensureDetailLightbox();
  updateDetailLightbox();

  detailMain.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => {
      openDetailGallery(Number(button.getAttribute("data-gallery-index")));
    });
  });
};

const applyDetailLanguage = (language) => {
  const copy = repairNestedStrings(detailTranslations[language] ?? detailTranslations.ro);
  document.documentElement.lang = language;
  closeDetailGallery();

  const brand = document.querySelector(".brand");
  const navMap = {
    home: document.querySelector('[data-nav-link="home"]'),
    ftc: document.querySelector('[data-nav-link="ftc"]'),
    frc: document.querySelector('[data-nav-link="frc"]'),
    fgc: document.querySelector('[data-nav-link="fgc"]'),
    contact: document.querySelector('[data-nav-link="contact"]'),
  };
  const navToggle = document.querySelector(".nav-toggle");
  const toggle = document.querySelector(".language-toggle");
  const toggleFlag = document.querySelector(".language-flag-image");

  Object.entries(copy.nav).forEach(([key, label]) => {
    navMap[key]?.replaceChildren(document.createTextNode(label));
  });

  Object.entries(navMap).forEach(([key, link]) => {
    link?.classList.toggle("is-active", key === activeSection);
  });

  brand?.setAttribute("aria-label", copy.brandAria);
  navToggle?.setAttribute("aria-label", copy.navToggleLabel);

  if (toggle) {
    toggle.setAttribute("aria-label", copy.languageLabel);
    toggle.setAttribute("title", copy.languageLabel);
    toggle.setAttribute("aria-pressed", String(language === "en"));
  }

  if (toggleFlag) {
    toggleFlag.src = copy.languageImage;
  }

  renderDetailPage(language);
  repairRenderedText(detailHeader);
  repairRenderedText(document.body);

  try {
    window.localStorage.setItem("delta-language", language);
  } catch {}
};

const updateDetailScrollState = () => {
  detailHeader?.classList.toggle("is-scrolled", window.scrollY > 16);
};

const bindDetailNavInteractions = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  if (!navToggle || navToggle.dataset.bound === "true") return;

  navToggle.dataset.bound = "true";

  const closeDetailNavMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu?.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu?.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDetailNavMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navMenu?.classList.contains("is-open")) return;
    if (!(event.target instanceof Node)) return;
    if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
    closeDetailNavMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDetailNavMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeDetailNavMenu();
    }
  });
};

const bindDetailLanguageToggle = () => {
  const toggle = document.querySelector(".language-toggle");
  if (!toggle || toggle.dataset.bound === "true") return;

  toggle.dataset.bound = "true";
  toggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "ro" ? "en" : "ro";
    applyDetailLanguage(nextLanguage);
    document.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
    document.querySelector(".nav-links")?.classList.remove("is-open");
  });
};

renderDetailNav();
bindDetailNavInteractions();
bindDetailLanguageToggle();

const storedLanguage = (() => {
  try {
    return window.localStorage.getItem("delta-language");
  } catch {
    return null;
  }
})();

applyDetailLanguage(storedLanguage === "en" ? "en" : "ro");
updateDetailScrollState();
window.addEventListener("scroll", updateDetailScrollState, { passive: true });
window.addEventListener("resize", updateDetailScrollState);
