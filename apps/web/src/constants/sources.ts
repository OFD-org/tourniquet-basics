/**
 * Trusted educational sources shown on /sources.
 * Prefer official CoTCCC / tccc.org.ua / peer-reviewed references.
 * Notes are translated via sourcesPage.notes.{id} in locale files.
 */
export type SourceItem = {
  id: string;
  title: string;
  org: string;
  url: string;
};

export const SOURCES: SourceItem[] = [
  {
    id: "tccc-ua",
    title: "Tactical Combat Casualty Care (TCCC) Guidelines — Clinical Guidelines 2024",
    org: "TCCC Ukraine (tccc.org.ua)",
    url: "https://tccc.org.ua/files/downloads/clinical-guidelines-2024-en.pdf",
  },
  {
    id: "tccc-ua-home",
    title: "TCCC Guidelines 2024 (Eng) — materials portal",
    org: "TCCC Ukraine",
    url: "https://tccc.org.ua/en/guide/tccc-guidelines-2021-eng",
  },
  {
    id: "skill-32",
    title: "Skill Card 32: Tourniquet Conversion",
    org: "TCCC Ukraine",
    url: "https://tccc.org.ua/en/guide/skill-card-tourniquet-conversion-cpp",
  },
  {
    id: "jsom-2024",
    title: "Tactical Combat Casualty Care (TCCC) Guidelines: 25 January 2024",
    org: "Journal of Special Operations Medicine / PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/38364091/",
  },
  {
    id: "jsom-pdf",
    title: "TCCC Guidelines (JSOM PDF reprint)",
    org: "Journal of Special Operations Medicine",
    url: "https://jsomonline.org/wp-content/uploads/2024/11/20241100Deaton.pdf",
  },
  {
    id: "butler-ukraine",
    title: "Who needs a tourniquet? Lessons from the Russo-Ukrainian war",
    org: "NAEMT / TCCC education resources (Butler et al., J Trauma 2024)",
    url: "https://www.naemt.org/docs/default-source/education-documents/tccc/tourniquet-conversion-resources/tccc-butler-who-needs-a-tourniquet-j-trauma-2024.pdf",
  },
  {
    id: "pmc-conversion",
    title: "Rethinking limb tourniquet conversion in the prehospital environment",
    org: "PMC / peer-reviewed",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10662576/",
  },
  {
    id: "naemt-tccc",
    title: "Tactical Combat Casualty Care courses (NAEMT)",
    org: "National Association of Emergency Medical Technicians",
    url: "https://www.naemt.org/education/naemt-tccc",
  },
];

export const IMAGE_CREDITS = [
  {
    file: "tq-self-application.jpg",
    credit:
      "U.S. Army photo by Sgt. Kalie Jones — CLS tourniquet self-application demo (Camp Buehring). Public domain (U.S. government work). Wikimedia Commons.",
  },
  {
    file: "tq-training-demo.jpg",
    credit:
      "U.S. Army photo by Sgt. Kalie Jones — CLS tourniquet demonstration. Public domain. Wikimedia Commons.",
  },
  {
    file: "tq-instructor.jpg",
    credit:
      "U.S. Army photo by Master Sgt. Michael J. Carden — tourniquet training class. Public domain. Wikimedia Commons.",
  },
  {
    file: "tq-partner-training.jpg",
    credit:
      "USAFRICOM — Flintlock 2018 tourniquet application training. Public domain. Wikimedia Commons.",
  },
];
