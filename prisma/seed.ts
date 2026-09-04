import { PrismaPg } from "@prisma/adapter-pg";

import { FleetColor, PrismaClient } from "../src/generated/prisma/client";

const COLORS = Object.values(FleetColor);

const DATA: [string, string | null, number][] = [
  ["Flotte maritime du Grand Nord — porte-conteneurs, vraquiers et navires-citernes affrétés pour les liaisons transarctiques longue distance", "Navires marchands opérant les routes polaires.", 342],
  ["Véga", "Petite flotte urbaine de véhicules électriques partagés.", 1],
  ["Convois logistiques Rhône-Alpes", null, 0],
  ["Escadre de pêche de Concarneau", "Chalutiers et fileyeurs du port breton.", 27],
  ["Taxis fluviaux de la Seine", "Navettes passagers entre Paris et les boucles aval.", 12],
  ["Camions frigorifiques Val-de-Loire", "Transport sous température dirigée.", 8],
  ["Flotte de secours en mer d'Iroise", null, 3],
  ["Péniches céréalières du Nord", "Fret vrac sur le réseau des canaux.", 5],
  ["Bus interurbains de Gascogne", "Lignes régulières entre bourgs et préfectures.", 63],
  ["Remorqueurs portuaires du Havre", null, 4],
  ["Voiliers-écoles de la Rade de Brest", "Formation à la navigation hauturière.", 18],
  ["Ambulances du bassin minier", "Transport sanitaire d'urgence.", 34],
  ["Cargos rouliers de Méditerranée", null, 47],
  ["Utilitaires artisans d'Occitanie", "Fourgons de chantier et véhicules-ateliers.", 89],
  ["Barges de dragage de la Gironde", "Entretien des chenaux de l'estuaire.", 2],
  ["Flotte viticole de Bourgogne", "Tracteurs enjambeurs et bennes vendange.", 15],
  ["Navires océanographiques de Roscoff", null, 6],
  ["Coursiers à vélo de Lyon", "Livraison du dernier kilomètre en centre-ville.", 210],
  ["Ferries des îles du Ponant", "Liaisons passagers vers Molène et Ouessant.", 9],
  ["Bétaillères du Massif central", null, 7],
  ["Vedettes de la brigade fluviale", "Surveillance des voies navigables.", 3],
  ["Autocars de tourisme des Pyrénées", "Excursions et transferts de montagne.", 41],
  ["Chalands ostréicoles du bassin d'Arcachon", "Desserte des parcs à huîtres.", 22],
  ["Bennes de collecte de l'agglomération nantaise", null, 156],
  ["Yachts de convoyage de la Côte d'Azur", "Acheminement professionnel de plaisance.", 11],
  ["Semi-remorques céréaliers de la Beauce", "Transport de grains vers les silos portuaires.", 73],
  ["Canots de sauvetage de la SNSM Manche", null, 19],
  ["Flotte postale rurale d'Auvergne", "Tournées de distribution en zone diffuse.", 128],
  ["Dragueurs de sable de la Loire", "Extraction de granulats fluviaux.", 4],
  ["Minibus médicaux du Béarn", "Transport de patients vers les centres de soins.", 16],
  ["Porte-voitures de la vallée de la Seine", null, 58],
  ["Thoniers senneurs de Saint-Jean-de-Luz", "Pêche au thon en Atlantique.", 13],
  ["Balayeuses de voirie de Strasbourg", "Nettoiement mécanisé des rues.", 24],
  ["Gabares de patrimoine de la Dordogne", null, 2],
  ["Flotte de VTC de la métropole lilloise", "Véhicules de transport avec chauffeur.", 305],
  ["Baliseurs des Phares et Balises", "Entretien de la signalisation maritime.", 6],
  ["Tombereaux de carrière du Morvan", null, 9],
  ["Navettes aéroportuaires de Roissy", "Liaisons terminaux et parkings.", 87],
  ["Chalutiers hauturiers de Boulogne-sur-Mer", "Grande pêche en mer du Nord.", 31],
  ["Flotte de déneigement des Alpes", null, 44],
];

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const STEP_MS = 7 * 60 * 60 * 1000;
  const base = Date.now();

  const rows = DATA.map(([title, description, companiesCount], i) => ({
    title,
    description,
    color: COLORS[i % COLORS.length],
    companiesCount,
    createdAt: new Date(base - i * STEP_MS),
  }));

  await prisma.fleet.deleteMany();
  await prisma.fleet.createMany({ data: rows });

  console.log(`Seed: ${rows.length} flottes insérées.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
