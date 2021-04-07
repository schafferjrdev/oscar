export const CATEGORIES = {
  bestPicture: {
    title: "Melhor Filme",
    color: "gold",
  },
  leadingActor: {
    title: "Melhor Ator",
    color: "volcano",
  },
  leadingActress: {
    title: "Melhor Atriz",
    color: "volcano",
  },
  supportingActor: {
    title: "Ator Coadjuvante",
    color: "magenta",
  },
  supportingActress: {
    title: "Atriz Coadjuvante",
    color: "magenta",
  },
  cinematography: {
    title: "Fotografia",
    color: "blue",
  },
  costumeDesign: {
    title: "Figurino",
    color: "green",
  },
  directing: {
    title: "Direção",
    color: "gold",
  },
  documentary: {
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
  animated: {
    title: "Animação",
    color: "orange",
  },
  international: {
    title: "Filme Internacional",
    color: "red",
  },
  hair: {
    title: "Cabelo e Maquiagem",
    color: "green",
  },
  editing: {
    title: "Montagem",
    color: "blue",
  },
  score: {
    title: "Trilha Sonora",
    color: "purple",
  },
  song: {
    title: "Canção",
    color: "purple",
  },
  productionDesign: {
    title: "Design de produção",
    color: "green",
  },
  shortMovie: {
    title: "Curta-metragem",
    color: "orange",
  },
  sound: {
    title: "Som",
    color: "purple",
  },
  effects: {
    title: "Efeitos Visuais",
    color: "blue",
  },
  writingOriginal: {
    title: "Roteiro Adaptado",
    color: "geekblue",
  },
  writing: {
    title: "Roteiro Original",
    color: "geekblue",
  },
};

export const NOMINEES = [
  {
    movie: {
      name: "Mank",
      imdb: "https://www.imdb.com/title/tt10618286/",
    },
    indications: 10,
    bestPicture: true,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/81117189",
    },
  },
  {
    movie: {
      name: "Meu Pai",
      imdb: "https://www.imdb.com/title/tt10272386/",
    },
    bestPicture: true,
    platform: { name: "yts", url: "https://yts.mx/movies/the-father-2020" },
    subtitle:
      "http://legendas.tv/download/605f697d43b06/The_Father/The_Father_2020_WEBRip",
    indications: 6,
  },
  {
    movie: {
      name: "Judas e o Messias Negro",
      imdb: "https://www.imdb.com/title/tt9784798/",
    },
    indications: 6,
    bestPicture: true,
    platform: {
      name: "yts",
      url: "https://yts.mx/movies/judas-and-the-black-messiah-2021",
    },
    subtitle:
      "http://legendas.tv/download/603edba174eb0/Judas_and_the_Black_Messiah/Judas_and_the_Black_Messiah_2021_WEB_DL_WEBRip",
  },

  {
    movie: {
      name: "Minari",
      imdb: "https://www.imdb.com/title/tt10633456/",
    },
    indications: 6,
    bestPicture: true,
    platform: { name: "yts", url: "https://yts.mx/movies/minari-2020" },
    subtitle:
      "http://legendas.tv/download/5ffe4a26a0bca/Minari/Minari_2020_720p_WEBSCR_DD2_0_x264_NOGRP_EVO",
  },
  {
    movie: {
      name: "Nomadland",
      imdb: "https://www.imdb.com/title/tt9770150",
    },
    indications: 6,
    bestPicture: true,
    platform: { name: "yts", url: "https://yts.mx/movies/nomadland-2020" },
    subtitle:
      "http://legendas.tv/download/5ffc9424e6d2d/Nomadland/Nomadland_2020_1080p_WEBSCR_DD2_0_x264_NOGRP_Nomadland_2020_READNFO_1080p_WEBSCR_X264_AC3_EVO",
  },

  {
    movie: {
      name: "O Som do Silêncio",
      imdb: "https://www.imdb.com/title/tt5363618/",
    },
    bestPicture: true,
    indications: 6,
    platform: {
      name: "prime",
      url: "https://www.primevideo.com/detail/0U8IBE45LTNO63PAZ9B9ZA81RN/",
    },
  },
  {
    movie: {
      name: "Os 7 de Chicago",
      imdb: "https://www.imdb.com/title/tt1070874/",
    },
    indications: 6,
    bestPicture: true,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/81043755",
    },
  },
  {
    movie: {
      name: "Bela Vingança",
      imdb: "https://www.imdb.com/title/tt9620292/",
    },
    bestPicture: true,
    indications: 5,
    platform: {
      name: "yts",
      url: "https://yts.mx/movies/promising-young-woman-2020",
    },
    subtitle:
      "http://legendas.tv/download/6008f69c66eb8/Promising_Young_Woman/Promising_Young_Woman_2020_WEB_DL_WEBRip_HDRip_WEBSCR",
  },
  {
    movie: {
      name: "A Voz Suprema do Blues",
      imdb: "https://www.imdb.com/title/tt10514222",
    },
    indications: 5,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/81100780",
    },
  },
  {
    movie: {
      name: "Relatos do Mundo",
      imdb: "https://www.imdb.com/title/tt6878306/",
    },
    indications: 4,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81210670",
    },
  },
  {
    movie: {
      name: "Uma Noite em Miami...",
      imdb: "https://www.imdb.com/title/tt10612922/",
    },
    indications: 3,
    platform: {
      name: "prime",
      url: "https://www.primevideo.com/detail/0PUSORNFHNJRM15H4WEX1232JQ",
    },
  },
  {
    movie: {
      name: "Soul",
      imdb: "https://www.imdb.com/title/tt2948372/",
    },
    indications: 3,
    platform: {
      name: "disney",
      url: "https://www.disneyplus.com/pt-br/movies/soul/77zlWrb9vRYp",
    },
  },
  {
    movie: {
      name: "Fita de Cinema Seguinte de Borat",
      imdb: "https://www.imdb.com/title/tt13143964/",
    },
    indications: 2,
    platform: {
      name: "prime",
      url: "https://www.primevideo.com/detail/0H3D1IZ6BXXZESU8IM8ITTTB2C",
    },
  },
  {
    movie: {
      name: "Mulan",
      imdb: "https://www.imdb.com/title/tt4566758",
    },
    indications: 2,
    platform: {
      name: "disney",
      url: "https://www.disneyplus.com/movies/mulan/2jlgPK4K0ilR",
    },
  },
  {
    movie: {
      name: "Pinóquio",
      imdb: "https://www.imdb.com/title/tt8333746",
    },
    indications: 2,
    platform: { name: "yts", url: "https://yts.mx/movies/pinocchio-2019" },
    subtitle: "https://www.opensubtitles.org/pt/subtitles/8230810/pinocchio-pb",
  },
  {
    movie: {
      name: "Tenet",
      imdb: "https://www.imdb.com/title/tt6723592",
    },
    indications: 2,
    platform: { name: "yts", url: "https://yts.mx/movies/tenet-2020" },
    subtitle:
      "http://legendas.tv/download/5fc9cf65209ea/Tenet/Tenet_2020_IMAX_BluRay_BRRip_BDRip",
  },
  {
    movie: {
      name: "Druk - Mais Uma Rodada",
      imdb: "https://www.imdb.com/title/tt10288566/",
    },
    indications: 2,
    platform: { name: "yts", url: "https://yts.mx/movies/another-round-2020" },
    subtitle:
      "http://legendas.tv/download/5fe3207aa6118/Another_Round_Druk/Another_Round_2020_WEB_DL_WEBRip_HDRip",
  },
  {
    movie: {
      name: "Emma.",
      imdb: "https://www.imdb.com/title/tt9214832/",
    },
    indications: 2,
    platform: { name: "yts", url: "https://yts.mx/movies/emma-2020" },
    subtitle:
      "http://legendas.tv/download/5eb8e3d4d3919/Emma/Emma_2020_BluRay_BRRip_BDRip_WEB_DL_WEBRip_HDRip",
  },
  {
    movie: {
      name: "Pieces of a Woman",
      imdb: "https://www.imdb.com/title/tt11161474/",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81128745",
    },
  },
  {
    movie: {
      name: "The United States vs. Billie Holiday",
      imdb: "https://www.imdb.com/title/tt8521718",
    },
    indications: 1,
    platform: {
      name: "yts",
      url: "https://yts.mx/movies/the-united-states-vs-billie-holiday-2021",
    },
    subtitle:
      "http://legendas.tv/download/604e08cb31282/The_United_States_vs_Billie_Holiday/The_United_States_vs_Billie_Holiday_2021_WEB_DL_WEBRip_HDRip",
  },
  {
    movie: {
      name: "Era uma Vez um Sonho",
      imdb: "https://www.imdb.com/title/tt6772802/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/81071970",
    },
  },
  {
    movie: {
      name: "O Tigre Branco",
      imdb: "https://www.imdb.com/title/tt6571548/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/watch/80202877",
    },
  },
  {
    movie: {
      name: "Dois Irmãos: Uma Jornada Fantástica",
      imdb: "https://www.imdb.com/title/tt7146812/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "disney",
      url:
        "https://www.disneyplus.com/pt-br/movies/dois-irm%25C3%25A3os-uma-jornada-fant%25C3%25A1stica/xVcGOSq9BY21",
    },
  },
  {
    movie: {
      name: "A Caminho da Lua",
      imdb: "https://www.imdb.com/title/tt7488208/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/80214236",
    },
  },
  {
    movie: {
      name: "Shaun, o Carneiro: O Filme",
      imdb: "https://www.imdb.com/title/tt6193408/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/80242602",
    },
  },
  {
    movie: {
      name: "Wolfwalkers",
      imdb: "https://www.imdb.com/title/tt5198068/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: { name: "yts", url: "https://yts.mx/movies/wolfwalkers-2020" },
    subtitle:
      "http://legendas.tv/download/5feb79fde03db/Wolfwalkers/Wolfwalkers_2020_720p_WEB_h264_KOGi",
  },
  {
    movie: {
      name: "Better Days",
      imdb: "https://www.imdb.com/title/tt9586294/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: { name: "yts", url: "https://yts.mx/movies/better-days-2019" },
  },
  {
    movie: {
      name: "Collective",
      imdb: "https://www.imdb.com/title/tt10706602/?ref_=nv_sr_srsg_0",
    },
    indications: 2,
    platform: {
      name: "x",
      url:
        "https://1337x.to/torrent/4707540/Collective-2019-1080p-WEB-DL-x264-AC3-HORiZON-ArtSubs/",
    },
    subtitle:
      "http://legendas.tv/download/5febd6315a5cf/Collective_Colectiv/Collective_2019_1080p_WEB_DL_x264_AC3_HORiZON_ArtSubs",
  },
  {
    movie: {
      name: "O Homem que Vendeu sua Pele",
      imdb: "https://www.imdb.com/title/tt10360862/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: { name: "stremio", url: "https://bit.ly/3cyXdZY." },
  },
  {
    movie: {
      name: "Quo Vadis, Aida?",
      imdb: "https://www.imdb.com/title/tt8633462/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "x",
      url:
        "https://1337x.to/torrent/4770688/Quo-Vadis-Aida-2020-WEBRip-1080p-x264-AAC-SuGaRx/",
    },
    subtitle:
      "https://www.opensubtitles.org/pt/subtitles/8542048/quo-vadis-aida-en",
  },
  {
    movie: {
      name: "Crip Camp: Revolução pela Inclusão",
      imdb: "https://www.imdb.com/title/tt8923484/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/81001496",
    },
  },
  {
    movie: {
      name: "The Mole Agent",
      imdb: "https://www.imdb.com/title/tt11394298/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "x",
      url:
        "https://1337x.to/torrent/4711183/The-Mole-Agent-El-Agente-Topo-2020-720p-SCREENER-AC3-EURiMAGE/",
    },
    subtitle:
      "https://www.opensubtitles.org/pt/subtitles/8463604/the-mole-agent-pb",
  },
  {
    movie: {
      name: "Professor Polvo",
      imdb: "https://www.imdb.com/title/tt12888462/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: { name: "netflix", url: "http://www.netflix.com/title/81045007" },
  },
  {
    movie: {
      name: "Time",
      imdb: "https://www.imdb.com/title/tt11416746/?ref_=nv_sr_srsg_3",
    },
    indications: 1,
    platform: {
      name: "prime",
      url:
        "https://www.primevideo.com/region/na/detail/0SKTZMXN08NRCDU8FSDTMK2E26/ref=atv_sr_def_c_unkc__1_1_1?sr=1-1&pageTypeIdSource=ASIN&pageTypeId=B08KSH7JVV&qid=1603920509",
    },
  },
  {
    movie: {
      name: "Destacamento Blood",
      imdb: "https://www.imdb.com/title/tt9777644/",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/81045635",
    },
  },
  {
    movie: {
      name: "Festival Eurovision da Canção",
      imdb: "https://www.imdb.com/title/tt8580274/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/80244088",
    },
  },
  {
    movie: {
      name: "Rosa e Momo",
      imdb: "https://www.imdb.com/title/tt10627584/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81046378",
    },
  },
  {
    movie: {
      name: "Greyhound",
      imdb: "https://www.imdb.com/title/tt6048922/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: { name: "yts", url: "https://yts.mx/movies/greyhound-2020" },
    subtitle:
      "http://legendas.tv/download/5f0bb4b454533/Greyhound/Greyhound_2020_WEB_DL_WEBRip_HDRip_Subpack",
  },
  {
    movie: {
      name: "Amor e Monstros",
      imdb: "https://www.imdb.com/title/tt2222042/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "yts",
      url: "https://yts.mx/movies/love-and-monsters-2020",
    },
    subtitle:
      "http://legendas.tv/download/5fdcb50587a0d/Love_and_Monsters/Love_And_Monsters_2020_1080p_BluRay_x264_AAC5_1_YTS_MX",
  },
  {
    movie: {
      name: "O Céu da Meia-Noite",
      imdb: "https://www.imdb.com/title/tt10539608/?ref_=fn_al_tt_1",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/br/title/80244645",
    },
  },
  {
    movie: {
      name: "O Grande Ivan",
      imdb: "https://www.imdb.com/title/tt3661394/?ref_=nv_sr_srsg_0",
    },
    indications: 1,
    platform: {
      name: "disney",
      url: "https://www.disneyplus.com/pt-br/movies/o-grande-ivan/7LzGbpg0fPJH",
    },
  },
  {
    movie: {
      name: "Colette",
      imdb: "https://www.imdb.com/title/tt11643154/",
    },
    indications: 1,
    platform: { name: "youtube", url: "https://youtu.be/J7uBf1gD6JY" },
  },
  {
    movie: {
      name: "A Concerto Is A Conversation",
      imdb: "https://www.imdb.com/title/tt13793326/",
    },
    indications: 1,
    platform: {
      name: "youtube",
      url: "https://www.youtube.com/watch?v=LoEZR5miMvo",
    },
  },
  {
    movie: {
      name: "Do Not Split",
      imdb: "https://www.imdb.com/title/tt11512676/",
    },
    indications: 1,
    platform: {
      name: "youtube",
      url: "https://www.youtube.com/watch?v=BpS-Y7ndNeQ",
    },
  },
  {
    movie: {
      name: "Hunger Ward",
      imdb: "https://www.imdb.com/title/tt12979636/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/1GH9QTT6qvrWAPNo6jq_6JaKzhbq2_LB6/view?usp=sharing",
    },
  },
  {
    movie: {
      name: "Uma Canção para Latasha",
      imdb: "https://www.imdb.com/title/tt8993180/?ref_=fn_al_tt_1",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81304985",
    },
  },
  {
    movie: {
      name: "Toca",
      imdb: "https://www.imdb.com/title/tt13167288/",
    },
    indications: 1,
    platform: {
      name: "disney",
      url:
        "https://www.disneyplus.com/pt-br/video/3a7101b5-c74c-4b04-a2f1-da853d05a82b",
    },
  },
  {
    movie: {
      name: "Genius Loci",
      imdb: "https://www.imdb.com/title/tt11884670/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/1vtjmqzyZaVlUsiOSMaHsa9XcGf1yNGMC/view?usp=sharing",
    },
  },
  {
    movie: {
      name: "Se Algo Acontecer... Te Amo",
      imdb: "https://www.imdb.com/title/tt11768948/?ref_=fn_al_tt_1",
    },
    indications: 1,
    platform: {
      name: "netflix",
      url: "https://www.netflix.com/title/81349306",
    },
  },
  {
    movie: {
      name: "Opera ",
      imdb: "https://www.imdb.com/title/tt14039636/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/15hJO49oFhSetO4cAOTRqKuGZSOAE3Jhh/view?usp=sharing",
    },
  },
  {
    movie: {
      name: "Yes-People",
      imdb: "https://www.imdb.com/title/tt12706728/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/1-a-f4mQG0OK0BoAo-JdeJlLYsqv8bydm/view",
    },
  },
  {
    movie: {
      name: "Feeling Through",
      imdb: "https://www.imdb.com/title/tt9280166/",
    },
    indications: 1,
    platform: {
      name: "x",
      url:
        "https://1337x.to/torrent/4804283/Feeling-Through-2019-1080p-WEBRip-x264-AAC-HORiZON-ArtSubs/",
    },
    subtitle:
      "http://legendas.tv/download/604c04cb34941/Feeling_Through/Feeling_Through_2019_1080p_WEBRip_x264_AAC_HORiZON_ArtSubs_curta",
  },
  {
    movie: {
      name: "The Letter Room",
      imdb: "https://www.imdb.com/title/tt11962160/",
    },
    indications: 1,
    platform: {
      name: "x",
      url:
        "https://1337x.to/torrent/4804511/The-Letter-Room-2020-1080p-AMZN-WEBRip-DDP2-0-x264-MRCS-TGx/",
    },
    subtitle:
      "https://drive.google.com/file/d/1SSDD9-menijHbmza8E2_BFTLtJa4vQmh/view",
  },
  {
    movie: {
      name: "The Present",
      imdb: "https://www.imdb.com/title/tt11474480/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/1mzeJNQYyespJmS1LvvMxZjIDouIsHCrk/view?usp=sharing",
    },
  },
  {
    movie: {
      name: "Two Distant Strangers",
      imdb: "https://www.imdb.com/title/tt13472984/",
    },
    indications: 1,
    platform: {
      name: "drive",
      url:
        "https://drive.google.com/file/d/10RcEeA1sAvZCi-NuXuORDz4uYlKDE4o-/view?usp=sharing",
    },
  },
  {
    movie: {
      name: "White Eye",
      imdb: "https://www.imdb.com/title/tt10538710/",
    },
    indications: 1,
    platform: {
      name: "tport",
      url: "https://tportmarket.com/films/white-eye/?shareID=WhiteEye#",
    },
  },
];
