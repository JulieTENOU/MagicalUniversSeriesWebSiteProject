export const KANZY_ID = 8;
export const isKanzyChar = (char) => Number(char?.users_ID) === KANZY_ID;
export const isMobChar   = (char) => char?.Name_character?.slice(0, 3).toUpperCase() === "MOB";

export const GAUGE_FIELDS = [
  { key: "currentStamina",     label: "Stamina",       maxKey: "Stamina_character",      color: "#4caf50" },
  { key: "currentManaVital",   label: "Mana Vital",    maxKey: "ManaVital_character",    color: "#f87171" },
  { key: "currentManaAir",     label: "Mana Air",      maxKey: "ManaAir_character",      color: "#14b8a6" },
  { key: "currentManaEau",     label: "Mana Eau",      maxKey: "ManaEau_character",      color: "#60a5fa" },
  { key: "currentManaTerre",   label: "Mana Terre",    maxKey: "ManaTerre_character",    color: "#fb923c" },
  { key: "currentManaFeu",     label: "Mana Feu",      maxKey: "ManaFeu_character",      color: "#fb7185" },
  { key: "currentManaVolonte", label: "Mana Volonté",  maxKey: "ManaVolonte_character",  color: "#a855f7" },
];

export const CARAC_FIELDS = [
  { key: "Force_character",      label: "Force" },
  { key: "Dexte_character",      label: "Dextérité" },
  { key: "Resistance_character", label: "Résistance" },
  { key: "Resilience_character", label: "Résilience" },
  { key: "Intell_character",     label: "Intelligence" },
  { key: "Charisme_character",   label: "Charisme" },
  { key: "Chance_character",     label: "Chance" },
];
