const mainDiv = document.getElementById('main')
let favoritePilotIds = []
 // FILMS
function fetchFilms() {
  fetch('https://swapi.constructor-learning.com/api/films/')
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((film) => {
        createFilmHTML(film)
      })
    })
    .catch((error) => console.log(error))
}

function createFilmHTML(film) {
  const filmDiv = document.createElement('div')
  filmDiv.classList.add('card', 'clickable')
  const title = document.createElement('h3')
  title.textContent = film.title
  filmDiv.appendChild(title)

  const detailsDiv = document.createElement('div')
  detailsDiv.classList.add('film-details')
  detailsDiv.style.display = 'none'
  filmDiv.appendChild(detailsDiv)

  const starshipsButton = document.createElement('button')
  starshipsButton.textContent = 'Display Starships'

  starshipsButton.addEventListener('click', function (e) {
    fetchStarships(film.starships)
  })
  filmDiv.appendChild(starshipsButton)
  document.getElementById('films').appendChild(filmDiv)

  filmDiv.addEventListener('click', function (e) {
    
    if (this.classList.contains('highlighted')) {
      return
    }
    const detailsDiv = e.currentTarget.querySelector('.film-details')
    
    e.currentTarget.classList.add('highlighted')

    if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block'
      detailsDiv.innerHTML = `Opening Crawl: ${film.opening_crawl}<br><br>
      Episode ID: ${film.episode_id}
      
      <br><br>

      Release Date: ${film.release_date}
      
      <br><br>`
  }
  const films = document.querySelectorAll('#films .card')
    films.forEach((film) => {
      if (film !== e.currentTarget) {
        film.classList.remove('highlighted')
        const displayedFilm = film.querySelector(
          '.film-details[style="display: block;"]'
        )
        if (displayedFilm) {
          displayedFilm.style.display = 'none'
        }
      }
    })
    
    const shipsDiv = document.getElementById('ships')
    shipsDiv.innerHTML = ''
    const pilotsDiv = document.getElementById('pilots')
    pilotsDiv.innerHTML = ''
  })
}
fetchFilms()

// STARSHIPS

function fetchStarships(starshipsUrls) {
  const fetchPromises = starshipsUrls.map((url) =>
  fetch(url).then((res) => res.json())
)
Promise.all(fetchPromises)
    .then((starships) => {
      
      const shipsDiv = document.getElementById('ships')
      shipsDiv.innerHTML = ''
      starships.forEach(createStarshipHTML)
    })
    .catch((error) => console.log(error))
}

Promise.all(fetchPromises)
    .then((starships) => {
    
      const shipsDiv = document.getElementById('ships')
      shipsDiv.innerHTML = ''

  
      starships.forEach(createStarshipHTML)
    })
    .catch((error) => console.log(error))

function createStarshipHTML(starship) {
  const starshipDiv = document.createElement('div')
  starshipDiv.classList.add('card', 'clickable')
  const name = document.createElement('h3')
  name.textContent = starship.name
  starshipDiv.appendChild(name)

  const detailsDiv = document.createElement('div')
  detailsDiv.classList.add('starship-details')
  detailsDiv.style.display = 'none'
  starshipDiv.appendChild(detailsDiv)

  if (starship.pilots.length) {
    const pilotsButton = document.createElement('button')
    pilotsButton.textContent = 'Show Pilots'
    pilotsButton.addEventListener('click', function (e) {
      playSound()
    
      const pilotsDiv = document.getElementById('pilots')
      pilotsDiv.innerHTML = ''

      fetchPilots(starship.pilots)
    })
    starshipDiv.appendChild(pilotsButton)
  }

  document.getElementById('ships').appendChild(starshipDiv)

  starshipDiv.addEventListener('click', function (e) {
    if (this.classList.contains('highlighted')) {
      return
    }
   
    this.classList.add('highlighted')
    const detailsDiv = this.querySelector('.starship-details')
    console.log(starship)
    if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block'
      detailsDiv.innerHTML = `Model: ${starship.model}<br><br>
      Max Atmosphering Speed: ${starship.max_atmosphering_speed}<br><br>
      Starship Class: ${starship.starship_class}<br><br>`
    }

    const starships = document.querySelectorAll('#ships .card')
    starships.forEach((ship) => {
      if (ship !== this) {
        ship.classList.remove('highlighted')
        const openStarship = ship.querySelector(
          '.starship-details[style="display: block;"]'
        )
        if (openStarship) {
          openStarship.style.display = 'none'
        }
      }
    })
   
    const pilotsDiv = document.getElementById('pilots')
    pilotsDiv.innerHTML = ''
  })
}

// PILOTS

function fetchPilots(pilotUrls) {
  const fetchPromises = pilotUrls.map((url) =>
    fetch(url).then((response) => response.json())
  )
  Promise.all(fetchPromises)
  .then((pilots) => {
    const pilotsDiv = document.getElementById('pilots')
    pilotsDiv.innerHTML = ''

    pilots.forEach(createPilotHTML)
  })
  .catch((error) => console.log(error))
}
