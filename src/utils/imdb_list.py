from imdb import Cinemagoer

ia = Cinemagoer(reraiseExceptions=True)

# Lista de filmes com os nomes dos filmes (exemplo)
movies = [
  "A Friend of Dorothy",
  "All the Empty Rooms",
  "Arco",
  "Armed Only With a Camera",
  "Avatar: Fogo e Cinzas",
  "Blue Moon",
  "Bugonia",
  "Butterfly",
  "Butcher's Stain",
  "Children No More",
  "Come See Me In The Good Light",
  "Cutting Through Rocks",
  "Dear Me",
  "Elio",
  "F1",
  "Foi Apenas um Acidente",
  "Forevergreen",
  "Frankenstein",
  "Golden",
  "Hamnet",
  "I Lied to You",
  "Jane Austen's Period Drama",
  "Jurassic World Rebirth",
  "Kokuho",
  "Kpop Demon Hunters",
  "Little Amelie or the Character of Rain",
  "Marty Supreme",
  "Mr. Nobody Against Putin",
  "O Agente Secreto",
  "Pecadores",
  "Perfectly a Strangeness",
  "Retirement Plan",
  "Se Eu Tivesse Pernas Eu Te Chutaria",
  "Sirat",
  "Sweet Dream of Joy",
  "The Alabama Solution",
  "The Devil Is Busy",
  "The Girls Who Cried Pearls",
  "The Lost Bus",
  "The Perfect Neighbor",
  "The Singers",
  "The Smashing Machine",
  "The Three Sisters",
  "The Ugly Stepsister",
  "The Voice of Hind Rajab",
  "Train Dreams",
  "Two People Exchanging Saliva",
  "Uma Batalha Após a Outra",
  "Valor Sentimental",
  "A Hora do Mal",
  "Zootopia 2"
  "Den stygge stesøsteren"
]

def get_imdb_link(movie_name: str):
    results = ia.search_movie(movie_name)
    if not results:
        return None
    movie_id = results[0].getID()
    return f"https://www.imdb.com/title/tt{movie_id}/"

for m in movies:
    try:
        print(m, ":", get_imdb_link(m))
    except Exception as e:
        print(m, "=> ERRO:", repr(e))