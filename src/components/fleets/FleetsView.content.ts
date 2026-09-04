import { t, type Dictionary } from "intlayer";

const content = {
  key: "fleets-page",
  content: {
    createButton: t({ fr: "Créer une flotte", en: "Create a fleet" }),
    loadError: t({
      fr: "Impossible de charger les flottes.",
      en: "Could not load the fleets.",
    }),
    retry: t({ fr: "Réessayer", en: "Retry" }),
    empty: t({
      fr: "Aucune flotte pour le moment.",
      en: "No fleets yet.",
    }),
  },
} satisfies Dictionary;

export default content;
