import { t, type Dictionary } from "intlayer";

const content = {
  key: "app-metadata",
  content: {
    title: t({ fr: "Flottes", en: "Fleets" }),
    description: t({
      fr: "Répertoire des flottes",
      en: "Fleet directory",
    }),
  },
} satisfies Dictionary;

export default content;
