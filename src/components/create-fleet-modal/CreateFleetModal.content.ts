import { t, type Dictionary } from "intlayer";

const content = {
  key: "create-fleet",
  content: {
    return: t({ fr: "Retour", en: "Return" }),
    help: t({ fr: "Aide", en: "Help" }),

    breadcrumbLabel: t({ fr: "Fil d'ariane", en: "Breadcrumb" }),
    breadcrumbRoot: t({ fr: "Votre répertoire", en: "Your directory" }),
    titlePlaceholder: t({ fr: "Titre", en: "Title" }),
    typeLabel: t({ fr: "Flotte", en: "Fleet" }),
    descriptionPlaceholder: t({ fr: "Description", en: "Description" }),

    formTitle: t({ fr: "Créez votre flotte", en: "Create your fleet" }),
    formSubtitle: t({
      fr: "Commencez par définir le profil de votre future flotte",
      en: "Start by defining the profile of your future fleet",
    }),
    nameLabel: t({ fr: "Nom de la flotte", en: "Fleet name" }),
    namePlaceholder: t({ fr: "Renseignez un nom", en: "Enter a name" }),
    colorLabel: t({ fr: "Couleur", en: "Color" }),
    descriptionLabel: t({ fr: "Description", en: "Description" }),
    descriptionInputPlaceholder: t({
      fr: "Inscrivez une description sur le sujet de la flotte",
      en: "Enter a description of the fleet",
    }),
    cancel: t({ fr: "Annuler", en: "Cancel" }),
    submit: t({ fr: "Créer la flotte", en: "Create a fleet" }),

    colors: {
      blue: t({ fr: "Bleu", en: "Blue" }),
      cyan: t({ fr: "Cyan", en: "Cyan" }),
      green: t({ fr: "Vert", en: "Green" }),
      yellow: t({ fr: "Jaune", en: "Yellow" }),
      orange: t({ fr: "Orange", en: "Orange" }),
      red: t({ fr: "Rouge", en: "Red" }),
      pink: t({ fr: "Rose", en: "Pink" }),
      violet: t({ fr: "Violet", en: "Purple" }),
    },

    errors: {
      submitFailed: t({
        fr: "La création a échoué. Réessayez.",
        en: "Creation failed. Please try again.",
      }),
    },

    validation: {
      nameRequired: t({
        fr: "Le nom de la flotte est requis",
        en: "The fleet name is required",
      }),
      nameMax: t({
        fr: "Le nom ne peut dépasser 60 caractères",
        en: "The name cannot exceed 60 characters",
      }),
      descriptionMax: t({
        fr: "La description ne peut dépasser 160 caractères",
        en: "The description cannot exceed 160 characters",
      }),
    },
  },
} satisfies Dictionary;

export default content;
