export const OSCAR_DATE = new Date("03/10/2024 21:00");

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
  DocumentaryShort: {
    title: "Documentário (curta)",
    color: "yellow",
  },
  AnimatedShort: {
    title: "Animação (curta)",
    color: "orange",
  },
  AnimatedFeature: {
    title: "Animação",
    color: "orange",
  },
  InternationalFeature: {
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
    title: "Trilha Sonora",
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
    bestPicture: true,
    category: [],
    major: "BestPicture",
    movie: {
      imdb: "",
      name: "",
    },
    platform: {
      name: "",
      url: "",
    },
    rate: 0,
    watched: false,
  },
];

export const all_categories = [
  "BestPicture",
  "BestDirector",
  "BestActor",
  "BestActress",
  "SupportingActor",
  "SupportingActress",
  "Cinematography",
  "CostumeDesign",
  "FilmEditing",
  "Sound",
  "ProductionDesign",
  "OriginalScore",
  "AdaptedScreenplay",
  "OriginalScreenplay",
  "AnimatedFeature",
  "AnimatedShort",
  "DocumentaryFeature",
  "DocumentaryShort",
  "InternationalFeature",
  "VisualEffects",
  "shortMovie",
];

export const minilist_categories = ["BestPicture", "AnimatedFeature"];

export const LOCAL_STORAGE_KEY = "oscar-data-2024";
