export const OSCAR_DATE = new Date("03/15/2026 21:00");

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
    title: "Melhor Direção",
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
    title: "Melhor Filme Internacional",
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
  ShortMovie: {
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
  Casting: {
    title: "Melhor Elenco",
    color: "gold",
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
  "Casting",
  "Cinematography",
  "CostumeDesign",
  "FilmEditing",
  "Sound",
  "ProductionDesign",
  "OriginalScore",
  "OriginalSong",
  "AdaptedScreenplay",
  "OriginalScreenplay",
  "AnimatedFeature",
  "AnimatedShort",
  "DocumentaryFeature",
  "DocumentaryShort",
  "InternationalFeature",
  "VisualEffects",
  "ShortMovie",
  "MakeupandHairstyling"
];

export const minilist_categories = ["BestPicture", "AnimatedFeature"];

export const LOCAL_STORAGE_KEY = "oscar-data-2026";

export const GENRES = {
    28:{
      "id": 28,
      "name": "Ação"
    },
    12:{
      "id": 12,
      "name": "Aventura"
    },
    16:{
      "id": 16,
      "name": "Animação"
    },
    35:{
      "id": 35,
      "name": "Comédia"
    },
    80:{
      "id": 80,
      "name": "Crime"
    },
    99:{
      "id": 99,
      "name": "Documentário"
    },
    18:{
      "id": 18,
      "name": "Drama"
    },
    10751:{
      "id": 10751,
      "name": "Família"
    },
    14:{
      "id": 14,
      "name": "Fantasia"
    },
    36:{
      "id": 36,
      "name": "História"
    },
    27:{
      "id": 27,
      "name": "Terror"
    },
    10402:{
      "id": 10402,
      "name": "Música"
    },
    9648:{
      "id": 9648,
      "name": "Mistério"
    },
    10749:{
      "id": 10749,
      "name": "Romance"
    },
    878:{
      "id": 878,
      "name": "Ficção científica"
    },
    10770:{
      "id": 10770,
      "name": "Cinema TV"
    },
    53:{
      "id": 53,
      "name": "Thriller"
    },
    10752:{
      "id": 10752,
      "name": "Guerra"
    },
    37:{
      "id": 37,
      "name": "Faroeste"
    }
}