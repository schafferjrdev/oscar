from imdb import Cinemagoer

ia = Cinemagoer(reraiseExceptions=True)

# Lista de filmes com os nomes dos filmes (exemplo)
movies = []

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