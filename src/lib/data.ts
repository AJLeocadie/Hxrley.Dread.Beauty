export interface Ingredient {
  name: string;
  image: string;
  benefits: string[];
}

export interface Gamme {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: "huile" | "shampooing" | "apres-shampooing" | "brillantine" | "spray";
  gamme: string;
  needs: string[];
  ingredients: string[];
  images: string[];
  stock: number;
  featured: boolean;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface DiagnosticResult {
  genre: string;
  age: string;
  typeCheveux: string;
  longueur: string;
  etatCuirChevelu: string[];
  frequenceLavage: string;
  demangeaisons: string;
  objectif: string[];
  email: string;
  telephone?: string;
  commune?: string;
}

export const gammes: Gamme[] = [
  {
    id: "performance-volume",
    name: "Performance et Volume",
    slug: "performance-et-volume",
    description: "Une gamme conçue pour stimuler la pousse, renforcer la fibre capillaire et apporter volume et brillance à vos cheveux.",
    image: "/images/gamme-performance.jpg",
    ingredients: [
      {
        name: "Groseille",
        image: "/images/groseille.jpg",
        benefits: [
          "Stimule la pousse grâce à sa richesse en vitamine C",
          "Renforce la fibre capillaire",
          "Apporte brillance et douceur",
          "Purifie le cuir chevelu et réduit les pellicules légères",
        ],
      },
      {
        name: "Grenade",
        image: "/images/grenade.jpg",
        benefits: [
          "Hydrate et nourrit en profondeur (idéal cheveux secs/crépus)",
          "Apaise le cuir chevelu",
          "Réduit les démangeaisons et pellicules légères",
        ],
      },
    ],
  },
  {
    id: "bonne-mine",
    name: "Bonne Mine",
    slug: "bonne-mine",
    description: "Révélez l'éclat naturel de vos cheveux avec des fruits tropicaux riches en vitamines et antioxydants.",
    image: "/images/gamme-bonne-mine.jpg",
    ingredients: [
      {
        name: "Fruit de la Passion",
        image: "/images/passion.jpg",
        benefits: [
          "Hydrate intensément grâce aux oméga-6",
          "Apporte brillance et douceur",
          "Protège contre le soleil, la pollution et la chaleur",
          "Favorise la croissance via un cuir chevelu sain",
        ],
      },
      {
        name: "Papaye",
        image: "/images/papaye.jpg",
        benefits: [
          "Stimule la pousse (vitamines A, C, E)",
          "Répare et renforce grâce à la papaïne",
          "Hydrate et assouplit les cheveux",
          "Apporte éclat et brillance",
          "Aide contre les pellicules et démangeaisons",
        ],
      },
    ],
  },
  {
    id: "force-croissance",
    name: "Force et Croissance",
    slug: "force-et-croissance",
    description: "Des actifs puissants pour fortifier vos cheveux, stimuler leur croissance et lutter contre la chute.",
    image: "/images/gamme-force.jpg",
    ingredients: [
      {
        name: "Mangue",
        image: "/images/mangue.jpg",
        benefits: [
          "Stimule la pousse capillaire",
          "Renforce la fibre du cheveu",
          "Hydrate en profondeur",
          "Apporte brillance naturelle",
          "Aide contre les pellicules",
        ],
      },
      {
        name: "Gingembre",
        image: "/images/gingembre.jpg",
        benefits: [
          "Stimule la circulation sanguine pour favoriser la pousse",
          "Effet anti-chute capillaire",
          "Antipelliculaire (antibactérien/antifongique)",
          "Purifie le cuir chevelu (excès de sébum)",
          "Apporte brillance aux cheveux",
        ],
      },
    ],
  },
  {
    id: "purifiant-detox",
    name: "Purifiant Détox",
    slug: "purifiant-detox",
    description: "Purifiez votre cuir chevelu en profondeur et éliminez les toxines pour des cheveux légers et sains.",
    image: "/images/gamme-detox.jpg",
    ingredients: [
      {
        name: "Charbon Actif",
        image: "/images/charbon.jpg",
        benefits: [
          "Absorbe les impuretés et toxines",
          "Purifie le cuir chevelu en profondeur",
          "Élimine l'excès de sébum",
          "Redonne légèreté et fraîcheur",
        ],
      },
      {
        name: "Menthe Poivrée",
        image: "/images/menthe.jpg",
        benefits: [
          "Sensation de fraîcheur immédiate",
          "Stimule la microcirculation",
          "Effet antiseptique naturel",
          "Apaise les démangeaisons",
        ],
      },
    ],
  },
  {
    id: "fraicheur-clarification",
    name: "Fraîcheur et Clarification",
    slug: "fraicheur-et-clarification",
    description: "Un soin clarifiant qui nettoie en douceur et apporte une fraîcheur longue durée à vos cheveux.",
    image: "/images/gamme-fraicheur.jpg",
    ingredients: [
      {
        name: "Citron Vert",
        image: "/images/citron.jpg",
        benefits: [
          "Clarifie et purifie naturellement",
          "Apporte brillance et éclat",
          "Régule le sébum",
          "Parfum frais et vivifiant",
        ],
      },
      {
        name: "Aloe Vera",
        image: "/images/aloe.jpg",
        benefits: [
          "Hydrate sans alourdir",
          "Apaise le cuir chevelu sensible",
          "Favorise la croissance capillaire",
          "Propriétés antibactériennes naturelles",
        ],
      },
    ],
  },
];

export const categories = [
  { id: "huile", name: "Huiles", icon: "droplets" },
  { id: "shampooing", name: "Shampooings", icon: "shower-head" },
  { id: "apres-shampooing", name: "Après-Shampooings", icon: "sparkles" },
  { id: "brillantine", name: "Brillantines", icon: "sun" },
  { id: "spray", name: "Sprays", icon: "spray-can" },
];

export const needs = [
  {
    id: "laver",
    name: "Laver",
    icon: "droplets",
    description: "Nettoyez vos cheveux en douceur",
    longDescription: "Un lavage adapté est la base d'une routine capillaire efficace. Nos shampooings et sprays nettoyants éliminent les impuretés, l'excès de sébum et les résidus de produits tout en respectant l'équilibre naturel de votre cuir chevelu. Formulés à partir d'actifs naturels purifiants comme le charbon actif, la menthe poivrée et le citron vert.",
    tips: ["Massez doucement le cuir chevelu du bout des doigts", "Rincez à l'eau tiède pour ne pas agresser les cheveux", "Adaptez la fréquence de lavage à votre type de cheveux"],
  },
  {
    id: "soigner",
    name: "Soigner",
    icon: "heart",
    description: "Réparez et nourrissez en profondeur",
    longDescription: "Cheveux secs, abîmés ou fragilisés ? Nos soins nourrissants à base de fruits tropicaux (papaye, passion, mangue) et de plantes hydratantes (aloe vera) réparent la fibre capillaire en profondeur, apportent souplesse et vitalité. Des formules riches en vitamines et acides gras essentiels pour des cheveux transformés.",
    tips: ["Appliquez un soin profond une fois par semaine", "Laissez poser sous une serviette chaude pour plus d'efficacité", "Insistez sur les longueurs et les pointes"],
  },
  {
    id: "coiffer",
    name: "Coiffer",
    icon: "scissors",
    description: "Stylisez avec soin",
    longDescription: "Sublimez votre coiffure avec nos produits de styling naturels. Brillantines, sprays coiffants et huiles légères vous permettent de définir vos boucles, discipliner vos locks ou apporter du volume, tout en nourrissant vos cheveux. Fini les produits qui assèchent : nos formules allient tenue et soin.",
    tips: ["Appliquez sur cheveux légèrement humides pour une meilleure tenue", "Utilisez une petite quantité et rajoutez si nécessaire", "Scellez l'hydratation avec une huile légère"],
  },
  {
    id: "brillance",
    name: "Brillance",
    icon: "sparkles",
    description: "Révélez l'éclat de vos cheveux",
    longDescription: "Des cheveux ternes et sans vie ? Nos produits brillance enrichis en groseille, fruit de la passion et papaye révèlent l'éclat naturel de vos cheveux. Riches en vitamines C et E, antioxydants et oméga-6, ils lissent les écailles du cheveu pour un reflet miroir et une douceur incomparable.",
    tips: ["Terminez votre routine avec quelques gouttes d'huile sur les longueurs", "Rincez à l'eau froide pour refermer les écailles", "Utilisez une brillantine légère pour un fini glossy"],
  },
  {
    id: "pousse",
    name: "Pousse",
    icon: "trending-up",
    description: "Stimulez la croissance capillaire",
    longDescription: "Accélérez la pousse de vos cheveux naturellement grâce à nos produits enrichis en gingembre, groseille et mangue. Ces actifs stimulent la circulation sanguine au niveau du cuir chevelu, renforcent le bulbe capillaire et luttent contre la chute. Des résultats visibles dès les premières semaines d'utilisation.",
    tips: ["Massez votre cuir chevelu 5 minutes par jour", "Soyez régulier dans votre routine pour des résultats optimaux", "Combinez huile et shampooing stimulant pour un effet maximal"],
  },
];

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Huile Capillaire Groseille & Grenade",
    slug: "huile-groseille-grenade",
    description: "Une huile précieuse enrichie en groseille et grenade pour nourrir, renforcer et faire briller vos cheveux. Idéale pour les cheveux secs et crépus.",
    price: 24.90,
    category: "huile",
    gamme: "performance-volume",
    needs: ["soigner", "brillance", "pousse"],
    ingredients: ["Groseille", "Grenade", "Huile de Coco", "Vitamine E"],
    images: ["/images/product-huile-1.jpg"],
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Shampooing Purifiant Détox",
    slug: "shampooing-purifiant-detox",
    description: "Un shampooing purifiant au charbon actif et menthe poivrée qui nettoie en profondeur et élimine les impuretés du cuir chevelu.",
    price: 18.90,
    category: "shampooing",
    gamme: "purifiant-detox",
    needs: ["laver", "soigner"],
    ingredients: ["Charbon Actif", "Menthe Poivrée", "Huile de Tea Tree"],
    images: ["/images/product-shampoo-1.jpg"],
    stock: 35,
    featured: true,
  },
  {
    id: "3",
    name: "Après-Shampooing Bonne Mine",
    slug: "apres-shampooing-bonne-mine",
    description: "Un après-shampooing enrichi en fruit de la passion et papaye pour hydrater, démêler et faire briller vos cheveux.",
    price: 19.90,
    category: "apres-shampooing",
    gamme: "bonne-mine",
    needs: ["soigner", "brillance"],
    ingredients: ["Fruit de la Passion", "Papaye", "Beurre de Karité"],
    images: ["/images/product-apres-1.jpg"],
    stock: 40,
    featured: true,
  },
  {
    id: "4",
    name: "Brillantine Force & Croissance",
    slug: "brillantine-force-croissance",
    description: "Une brillantine légère à la mangue et au gingembre pour fortifier, stimuler la pousse et sublimer vos cheveux d'un éclat naturel.",
    price: 15.90,
    category: "brillantine",
    gamme: "force-croissance",
    needs: ["brillance", "pousse", "coiffer"],
    ingredients: ["Mangue", "Gingembre", "Huile de Ricin"],
    images: ["/images/product-brillantine-1.jpg"],
    stock: 60,
    featured: true,
  },
  {
    id: "5",
    name: "Spray Fraîcheur Citron & Aloe",
    slug: "spray-fraicheur-citron-aloe",
    description: "Un spray léger et rafraîchissant au citron vert et aloe vera pour hydrater, clarifier et apporter de la fraîcheur à vos cheveux tout au long de la journée.",
    price: 14.90,
    category: "spray",
    gamme: "fraicheur-clarification",
    needs: ["soigner", "brillance"],
    ingredients: ["Citron Vert", "Aloe Vera", "Eau de Rose"],
    images: ["/images/product-spray-1.jpg"],
    stock: 45,
    featured: false,
  },
  {
    id: "6",
    name: "Huile Force Mangue & Gingembre",
    slug: "huile-force-mangue-gingembre",
    description: "Une huile fortifiante à la mangue et au gingembre pour stimuler la pousse, lutter contre la chute et nourrir les cheveux en profondeur.",
    price: 26.90,
    category: "huile",
    gamme: "force-croissance",
    needs: ["pousse", "soigner"],
    ingredients: ["Mangue", "Gingembre", "Huile d'Argan"],
    images: ["/images/product-huile-2.jpg"],
    stock: 30,
    featured: true,
  },
  {
    id: "7",
    name: "Shampooing Performance Groseille",
    slug: "shampooing-performance-groseille",
    description: "Un shampooing stimulant à la groseille pour booster le volume, purifier le cuir chevelu et renforcer les cheveux fragilisés.",
    price: 19.90,
    category: "shampooing",
    gamme: "performance-volume",
    needs: ["laver", "pousse"],
    ingredients: ["Groseille", "Grenade", "Protéines de Soie"],
    images: ["/images/product-shampoo-2.jpg"],
    stock: 25,
    featured: false,
  },
  {
    id: "8",
    name: "Spray Détox Menthe",
    slug: "spray-detox-menthe",
    description: "Un spray purifiant à la menthe poivrée pour rafraîchir le cuir chevelu, éliminer les résidus et apaiser les démangeaisons.",
    price: 13.90,
    category: "spray",
    gamme: "purifiant-detox",
    needs: ["soigner", "laver"],
    ingredients: ["Menthe Poivrée", "Charbon Actif", "Eau de Romarin"],
    images: ["/images/product-spray-2.jpg"],
    stock: 55,
    featured: false,
  },
  {
    id: "9",
    name: "Gel Coiffant Aloe & Citron Vert",
    slug: "gel-coiffant-aloe-citron",
    description: "Un gel coiffant naturel à l'aloe vera et au citron vert pour définir vos boucles, discipliner vos locks et apporter une tenue souple sans rigidité.",
    price: 16.90,
    category: "brillantine",
    gamme: "fraicheur-clarification",
    needs: ["coiffer", "brillance"],
    ingredients: ["Aloe Vera", "Citron Vert"],
    images: ["/images/product-gel-1.jpg"],
    stock: 40,
    featured: false,
  },
  {
    id: "10",
    name: "Spray Coiffant Volume Groseille",
    slug: "spray-coiffant-volume-groseille",
    description: "Un spray coiffant léger à la groseille et grenade qui apporte volume, tenue et brillance tout en protégeant la fibre capillaire.",
    price: 17.90,
    category: "spray",
    gamme: "performance-volume",
    needs: ["coiffer", "brillance", "pousse"],
    ingredients: ["Groseille", "Grenade"],
    images: ["/images/product-spray-3.jpg"],
    stock: 35,
    featured: false,
  },
  {
    id: "11",
    name: "Huile Coiffante Papaye & Passion",
    slug: "huile-coiffante-papaye-passion",
    description: "Une huile légère de finition au fruit de la passion et à la papaye pour sceller l'hydratation, discipliner les frisottis et sublimer votre coiffure.",
    price: 22.90,
    category: "huile",
    gamme: "bonne-mine",
    needs: ["coiffer", "soigner", "brillance"],
    ingredients: ["Fruit de la Passion", "Papaye"],
    images: ["/images/product-huile-3.jpg"],
    stock: 30,
    featured: true,
  },
  {
    id: "12",
    name: "Shampooing Fraîcheur Citron & Aloe",
    slug: "shampooing-fraicheur-citron-aloe",
    description: "Un shampooing clarifiant au citron vert et aloe vera qui nettoie en douceur, régule le sébum et laisse les cheveux frais et légers.",
    price: 18.90,
    category: "shampooing",
    gamme: "fraicheur-clarification",
    needs: ["laver", "soigner"],
    ingredients: ["Citron Vert", "Aloe Vera"],
    images: ["/images/product-shampoo-3.jpg"],
    stock: 45,
    featured: false,
  },
  {
    id: "13",
    name: "Après-Shampooing Force Mangue",
    slug: "apres-shampooing-force-mangue",
    description: "Un après-shampooing fortifiant à la mangue et au gingembre qui démêle, renforce et nourrit les cheveux fragilisés en profondeur.",
    price: 21.90,
    category: "apres-shampooing",
    gamme: "force-croissance",
    needs: ["soigner", "pousse"],
    ingredients: ["Mangue", "Gingembre"],
    images: ["/images/product-apres-2.jpg"],
    stock: 38,
    featured: false,
  },
  {
    id: "14",
    name: "Brillantine Éclat Passion & Papaye",
    slug: "brillantine-eclat-passion-papaye",
    description: "Une brillantine légère et non grasse au fruit de la passion et à la papaye pour un fini glossy, des cheveux souples et un éclat tropical.",
    price: 14.90,
    category: "brillantine",
    gamme: "bonne-mine",
    needs: ["brillance", "coiffer"],
    ingredients: ["Fruit de la Passion", "Papaye"],
    images: ["/images/product-brillantine-2.jpg"],
    stock: 50,
    featured: false,
  },
];

export const diagnosticOptions = {
  genre: ["Homme", "Femme", "Ne souhaite pas répondre"],
  age: [
    "Moins de 20 ans",
    "20-29 ans",
    "30-39 ans",
    "40-49 ans",
    "50-59 ans",
    "60-69 ans",
    "Plus de 70 ans",
  ],
  typeCheveux: ["Lisse", "Ondulé", "Bouclé", "Crépu", "Mixte (bouclé/frisé & crépu)"],
  longueur: ["Long", "Mi-long", "Court"],
  etatCuirChevelu: [
    "Gras",
    "Sec / abîmé",
    "Sensible",
    "Pelliculaire",
    "Normal",
    "Chute de cheveux",
    "Psoriasis",
  ],
  frequenceLavage: [
    "1x par semaine",
    "2x par semaine",
    "1x toutes les deux semaines",
    "1x par mois",
    "1x tous les deux mois",
    "Rarement (1x tous les 6 mois)",
  ],
  demangeaisons: ["Beaucoup", "De temps en temps", "Pas vraiment"],
  objectif: [
    "Améliorer la pousse",
    "Nourrir et assouplir",
    "Éliminer pellicules et démangeaisons",
    "Brillance et volume",
  ],
};

export function getDiagnosticRecommendations(result: DiagnosticResult) {
  const recommended: { gammes: string[]; products: string[]; tips: string[] } = {
    gammes: [],
    products: [],
    tips: [],
  };

  if (result.objectif.includes("Améliorer la pousse")) {
    recommended.gammes.push("force-croissance", "performance-volume");
    recommended.tips.push("Massez votre cuir chevelu régulièrement pour stimuler la circulation sanguine.");
  }

  if (result.objectif.includes("Nourrir et assouplir")) {
    recommended.gammes.push("bonne-mine");
    recommended.tips.push("Appliquez un soin profond une fois par semaine pour nourrir vos cheveux.");
  }

  if (result.objectif.includes("Éliminer pellicules et démangeaisons")) {
    recommended.gammes.push("purifiant-detox");
    recommended.tips.push("Utilisez un shampooing purifiant pour assainir votre cuir chevelu.");
  }

  if (result.objectif.includes("Brillance et volume")) {
    recommended.gammes.push("performance-volume", "bonne-mine");
    recommended.tips.push("Terminez votre routine avec une brillantine légère pour sublimer vos cheveux.");
  }

  if (result.etatCuirChevelu.includes("Gras")) {
    recommended.gammes.push("purifiant-detox", "fraicheur-clarification");
  }
  if (result.etatCuirChevelu.includes("Sec / abîmé")) {
    recommended.gammes.push("bonne-mine", "force-croissance");
  }
  if (result.etatCuirChevelu.includes("Pelliculaire") || result.etatCuirChevelu.includes("Chute de cheveux")) {
    recommended.gammes.push("force-croissance", "purifiant-detox");
  }

  recommended.gammes = [...new Set(recommended.gammes)];

  const matchingProducts = defaultProducts.filter((p) => recommended.gammes.includes(p.gamme));
  recommended.products = matchingProducts.map((p) => p.id);

  return recommended;
}
