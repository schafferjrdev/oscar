export const CATEGORIES = {
  BestPicture: {
    title: "Melhor Filme",
    color: "gold",
  },
  BestActor: {
    title: "Melhor Ator",
    color: "volcano",
  },
  BestActress: {
    title: "Melhor Atriz",
    color: "volcano",
  },
  SupportingActor: {
    title: "Ator Coadjuvante",
    color: "magenta",
  },
  SupportingActress: {
    title: "Atriz Coadjuvante",
    color: "magenta",
  },
  Cinematography: {
    title: "Fotografia",
    color: "blue",
  },
  CostumeDesign: {
    title: "Figurino",
    color: "green",
  },
  BestDirector: {
    title: "Direção",
    color: "gold",
  },
  DocumentaryFeature: {
    title: "Documentário",
    color: "yellow",
  },
  documentaryShort: {
    title: "Documentário (curta)",
    color: "yellow",
  },
  animatedShort: {
    title: "Animação (curta)",
    color: "orange",
  },
  AnimatedFeature: {
    title: "Animação",
    color: "orange",
  },
  InternationalFeatureFilm: {
    title: "Filme Internacional",
    color: "red",
  },
  MakeupandHairstyling: {
    title: "Cabelo e Maquiagem",
    color: "green",
  },
  FilmEditing: {
    title: "Montagem",
    color: "blue",
  },
  OriginalScore: {
    title: "Trilha Sonora Original",
    color: "purple",
  },
  OriginalSong: {
    title: "Canção Original",
    color: "purple",
  },
  ProductionDesign: {
    title: "Design de produção",
    color: "green",
  },
  shortMovie: {
    title: "Curta-metragem",
    color: "orange",
  },
  Sound: {
    title: "Som",
    color: "purple",
  },
  VisualEffects: {
    title: "Efeitos Visuais",
    color: "blue",
  },
  AdaptedScreenplay: {
    title: "Roteiro Adaptado",
    color: "geekblue",
  },
  OriginalScreenplay: {
    title: "Roteiro Original",
    color: "geekblue",
  },
};

export const NOMINEES = [
  {
    movie: {
      name: "Ataque dos Cães",
      imdb: "https://www.imdb.com/title/tt10293406/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/81127997",
    },
    category: [
      "BestPicture",
      "BestDirector",
      "BestActor",
      "SupportingActor",
      "SupportingActress",
      "AdaptedScreenplay",
      "Cinematography",
      "FilmEditing",
      "Sound",
      "ProductionDesign",
      "OriginalScore",
    ],
  },
  {
    movie: {
      name: "Belfast",
      imdb: "https://www.imdb.com/title/tt12789558/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "",
      url: "",
    },
    category: [
      "BestPicture",
      "BestDirector",
      "SupportingActor",
      "SupportingActress",
      "OriginalScreenplay",
      "Sound",
      "OriginalSong",
    ],
  },
  {
    movie: {
      name: "Amor, Sublime Amor",
      imdb: "https://www.imdb.com/title/tt3581652/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "",
      url: "",
    },
    category: [
      "BestPicture",
      "BestDirector",
      "SupportingActress",
      "Cinematography",
      "Sound",
      "CostumeDesign",
      "ProductionDesign",
    ],
  },
  {
    movie: {
      name: "Licorice Pizza",
      imdb: "https://www.imdb.com/title/tt11271038/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "",
      url: "",
    },
    category: ["BestPicture", "BestDirector", "OriginalScreenplay"],
  },
  {
    movie: {
      name: "Duna",
      imdb: "https://www.imdb.com/title/tt1160419/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "hbo",
      url: "https://play.hbomax.com/feature/urn:hbo:feature:GYUjdLgBiJp5otAEAAAAJ",
    },
    category: [
      "BestPicture",
      "AdaptedScreenplay",
      "Cinematography",
      "FilmEditing",
      "Sound",
      "CostumeDesign",
      "ProductionDesign",
      "MakeupandHairstyling",
      "VisualEffects",
      "OriginalScore",
    ],
  },
  {
    movie: {
      name: "No Ritmo do Coração",
      imdb: "https://www.imdb.com/title/tt10366460/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "prime",
      url: "https://www.primevideo.com/detail/0NGHQZ30LKKJU738BAQHVHHU4Y",
    },
    category: ["BestPicture", "SupportingActor", "AdaptedScreenplay"],
  },
  {
    movie: {
      name: "Drive My Car",
      imdb: "https://www.imdb.com/title/tt14039582/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "",
      url: "",
    },
    category: [
      "BestPicture",
      "BestDirector",
      "AdaptedScreenplay",
      "InternationalFeatureFilm",
    ],
  },
  {
    movie: {
      name: "King Richard: Criando Campeãs",
      imdb: "https://www.imdb.com/title/tt9620288/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "hbo",
      url: "https://play.hbomax.com/page/urn:hbo:page:GYXB0OgEQO5OhegEAAAAl:type:feature",
    },
    category: [
      "BestPicture",
      "BestActor",
      "SupportingActress",
      "OriginalScreenplay",
      "FilmEditing",
      "OriginalScore",
    ],
  },
  {
    movie: {
      name: "Não Olhe Para Cima",
      imdb: "https://www.imdb.com/title/tt11286314/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/81252357",
    },
    category: [
      "BestPicture",
      "OriginalScreenplay",
      "FilmEditing",
      "OriginalScore",
    ],
  },
  {
    movie: {
      name: "O Beco do Pesadelo",
      imdb: "https://www.imdb.com/title/tt7740496/",
    },
    bestPicture: true,
    major: "BestPicture",
    platform: {
      name: "",
      url: "",
    },
    category: [
      "BestPicture",
      "Cinematography",
      "CostumeDesign",
      "ProductionDesign",
    ],
  },
  {
    movie: {
      name: "Tick, Tick… Boom!",
      imdb: "https://www.imdb.com/title/tt8721424/",
    },
    bestPicture: false,
    major: "BestActor",
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/81149184",
    },
    category: ["BestActor", "FilmEditing"],
  },

  {
    movie: {
      name: "A Filha Perdida",
      imdb: "https://www.imdb.com/title/tt9100054/",
    },
    bestPicture: false,
    major: "BestActress",
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81478910",
    },
    category: ["BestActress", "SupportingActress", "AdaptedScreenplay"],
  },
  {
    movie: {
      name: "A Tragédia de Macbeth",
      imdb: "https://www.imdb.com/title/tt10095582/",
    },
    bestPicture: false,
    major: "BestActor",
    platform: {
      name: "",
      url: "",
    },
    category: ["BestActor", "Cinematography", "ProductionDesign"],
  },
  {
    movie: {
      name: "Spencer",
      imdb: "https://www.imdb.com/title/tt12536294/",
    },
    bestPicture: false,
    major: "BestActress",
    platform: {
      name: "",
      url: "",
    },
    category: ["BestActress"],
  },
  {
    movie: {
      name: "Apresentando os Ricardos",
      imdb: "https://www.imdb.com/title/tt4995540/",
    },
    bestPicture: false,
    major: "BestActress",
    platform: {
      name: "prime",
      url: "https://www.primevideo.com/dp/amzn1.dv.gti.9397daf7-c3ca-4184-8860-576cb972bb24?autoplay=1&ref_=atv_cf_strg_wb",
    },
    category: ["BestActress", "BestActor"],
  },
  {
    movie: {
      name: "Casa Gucci",
      imdb: "https://www.imdb.com/title/tt11214590/",
    },
    bestPicture: false,
    major: "MakeupandHairstyling",
    platform: {
      name: "",
      url: "",
    },
    category: ["MakeupandHairstyling"],
  },
];
