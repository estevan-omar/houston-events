const container = document.getElementById("events-container")

const loading = document.getElementById("loading")

const searchBar = document.getElementById("search-bar")

searchBar.addEventListener("input", function() {
    filterEvents(searchBar.value)
  })

let allEvents = []

const map = L.map("map").setView([29.7604, -95.3698], 11)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map)

fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=Houston&apikey=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
        loading.style.display = "none"
        const events = data._embedded.events

        events.forEach(function(event) {
            const card = document.createElement("div")
            card.className = "event-card"
            card.innerHTML = `
            <h2>${event.name}</h2>
            <p>📅 ${new Date(event.dates.start.localDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p>📍 ${event._embedded.venues[0].name}</p>
            `
            allEvents = data._embedded.events
            container.appendChild(card)
        })
    })

    .catch(function(error) {
        loading.style.display = "none"
        container.innerHTML = "<p>Sorry, we couldn't load events right now. Please try again later.</p>"
        console.log(error)
      })
      function filterEvents(searchText) {
        const filtered = allEvents.filter(function(event) {
          return event.name.toLowerCase().includes(searchText.toLowerCase())
        })
      
        container.innerHTML = ""
      
        filtered.forEach(function(event) {
          const card = document.createElement("div")
          card.className = "event-card"
          card.innerHTML = `
            <h2>${event.name}</h2>
            <p>📅 ${new Date(event.dates.start.localDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p>📍 ${event._embedded.venues[0].name}</p>
          `
          container.appendChild(card)
        })
      }


