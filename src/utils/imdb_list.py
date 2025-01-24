from imdb import IMDb

# Inicializar a instância do IMDb
ia = IMDb()

# Lista de filmes com os nomes dos filmes (exemplo)
movie = [
  "Ainda Estou Aqui",
  "Emilia Pérez",
  "O Brutalista",
  "Wicked",
  "Um Completo Desconhecido",
  "Conclave",
  "Anora",
  "A Substância",
  "Duna: Parte 2",
  "Nosferatu",
  "Sing Sing",
  "A Verdadeira Dor",
  "O Aprendiz",
  "Nickel Boys",
  "Flow",
  "Gladiador II",
  "Um Homem Diferente",
  "Robô Selvagem",
  "A Lien",
  "Anuja",
  "I'm Not a Robot",
  "The Last Ranger",
  "The Man Who Could Not Remain Silent",
  "Beautiful Men",
  "In the Shadow of the Cypress",
  "Magic Candies",
  "Wander to Wonder",
  "Yuck!",
  "September 5",
  "The Six Triple Eight",
  "Elton John: Never Too Late",
  "Black Box Diaries",
  "No Other Land",
  "Porcelain War",
  "Soundtrack to A Coup D'Etat",
  "Sugarcane",
  "Death By Numbers",
  "I am Ready, Warden",
  "Incident",
  "Instruments of a Beating Heart",
  "The Only Girl in the Orchestra",
  "The Girl with the Needle",
  "The Seed of the Sacred Fig",
  "DivertidaMente 2",
  "Memoir of a Snail",
  "Wallace e Gromit: Vengeance Most Fowl",
  "O Robô Selvagem",
  "Alien: Romulus",
  "Better Man",
  "O Reino do Planeta dos Macacos",
  "Maria"
]

# Função para obter o IMDb URL de cada filme
def get_imdb_link(movie_name):
    # Busca o filme pelo nome
    search_results = ia.search_movie(movie_name)
    if search_results:
        # Pega o ID do primeiro filme da lista de resultados
        movie_id = search_results[0].getID()
        # Construa o link completo para o IMDb
        return f'https://www.imdb.com/pt/title/tt{movie_id}/'
    return None

# Obtendo os links
movie_links = {movie: get_imdb_link(movie) for movie in movies}

# Exibindo os links
for movie, link in movie_links.items():
    print(f'{movie}: {link}')