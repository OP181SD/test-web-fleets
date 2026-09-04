import { enu, t, type Dictionary } from "intlayer";

const content = {
  key: "fleet-card",
  content: {
    companies: enu({
      "0": t({ fr: "entreprise", en: "companies" }),
      "1": t({ fr: "entreprise", en: "company" }),
      fallback: t({ fr: "entreprises", en: "companies" }),
    }),
    emptyDescription: t({
      fr: "Renseignez une description dans les paramètres de la flotte",
      en: "Add a description in the fleet settings",
    }),
    menuLabel: t({ fr: "Options de la flotte", en: "Fleet options" }),
  },
} satisfies Dictionary;

export default content;
