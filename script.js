/* =========================================================
   ROAMLY — COMPLETE JAVASCRIPT
   Leaflet + OpenStreetMap + Nominatim + OSRM

   Works with:
   - index.html
   - destination.html

   Features:
   - Destination cards
   - Mood filters
   - Budget filter
   - Trip length filter
   - Sorting
   - Saved destinations
   - Surprise me
   - Destination detail page
   - Leaflet map
   - OpenStreetMap
   - Location autocomplete
   - Current location
   - Driving route
   - Distance
   - Travel time

   NO GOOGLE MAPS API KEY REQUIRED
========================================================= */


/* =========================================================
   DESTINATION DATA
========================================================= */

const destinations = [
  {
    name: "Rishikesh",
    mood: ["nature", "adventure"],
    tag: "RIVER + MOUNTAINS",
    distance: 245,
    budget: "mid",
    price: "₹7,800",
    days: 2,
    rating: "4.8",
    time: "3h 45m",

    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Scenic%20View%20of%20Rishikesh%20with%20Ganga%20River%20and%20Hills%20in%20Background.jpg",

    description:
      "A peaceful riverside escape surrounded by mountains, adventure and the calming Ganges.",

    highlights: [
      "River Rafting",
      "Ganga Aarti",
      "Beatles Ashram",
      "Mountain Cafés"
    ],

    itinerary: [
      "Day 1 – Riverside café, Beatles Ashram & evening Ganga Aarti",
      "Day 2 – Morning rafting, local breakfast & sunset by the Ganges"
    ],

    bestTime: "October – March"
},
  {
    name: "Jaipur",
    mood: ["culture", "food"],
    tag: "ROYAL + COLOURFUL",
    distance: 280,
    budget: "low",
    price: "₹4,900",
    days: 2,
    rating: "4.7",
    time: "4h 10m",

    img:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",

    description:
      "Discover royal palaces, colourful bazaars, incredible architecture and unforgettable Rajasthani food.",

    highlights: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Rajasthani Food"
    ],

    itinerary: [
      "Day 1 — Amber Fort, City Palace & Johari Bazaar",
      "Day 2 — Hawa Mahal, local breakfast & sunset at Nahargarh"
    ],

    bestTime: "October – March"
  },

  {
    name: "Mussoorie",
    mood: ["nature", "slow"],
    tag: "HILLS + CAFÉS",
    distance: 290,
    budget: "mid",
    price: "₹8,200",
    days: 3,
    rating: "4.8",
    time: "5h 20m",

    img:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1600&q=90",

    description:
      "A charming Himalayan escape made for slow mornings, peaceful walks and cosy mountain cafés.",

    highlights: [
      "Mall Road",
      "Kempty Falls",
      "Lal Tibba",
      "Landour"
    ],

    itinerary: [
      "Day 1 — Check-in, Mall Road & café hopping",
      "Day 2 — Kempty Falls, Landour & sunset",
      "Day 3 — Lal Tibba breakfast & relaxed mountain walk"
    ],

    bestTime: "March – June"
  },

  {
    name: "Amritsar",
    mood: ["culture", "food"],
    tag: "FLAVOURS + HISTORY",
    distance: 450,
    budget: "low",
    price: "₹5,200",
    days: 2,
    rating: "4.6",
    time: "6h 10m",

    img:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=90",

    description:
      "A soulful weekend filled with history, incredible Punjabi food and unforgettable hospitality.",

    highlights: [
      "Golden Temple",
      "Jallianwala Bagh",
      "Wagah Border",
      "Amritsari Kulcha"
    ],

    itinerary: [
      "Day 1 — Golden Temple, Jallianwala Bagh & food walk",
      "Day 2 — Wagah Border ceremony & famous Amritsari breakfast"
    ],

    bestTime: "November – March"
  },

  {
    name: "Jim Corbett",
    mood: ["nature", "adventure"],
    tag: "WILDLIFE + WILDERNESS",
    distance: 245,
    budget: "high",
    price: "₹12,500",
    days: 3,
    rating: "4.7",
    time: "5h 15m",

    img:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=90",

    description:
      "Escape into the wilderness with jungle safaris, wildlife encounters and peaceful riverside stays.",

    highlights: [
      "Jeep Safari",
      "Wildlife Spotting",
      "Forest Trails",
      "Riverside Resort"
    ],

    itinerary: [
      "Day 1 — Check into a jungle resort & evening nature walk",
      "Day 2 — Early morning jungle safari & relaxed afternoon",
      "Day 3 — Morning safari & riverside breakfast"
    ],

    bestTime: "November – June"
  },

  {
    name: "Udaipur",
    mood: ["culture", "slow", "food"],
    tag: "LAKES + SUNSETS",
    distance: 660,
    budget: "high",
    price: "₹11,800",
    days: 3,
    rating: "4.9",
    time: "7h 30m",

    img:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",

    description:
      "Romantic lakes, beautiful palaces and golden sunsets make Udaipur perfect for a slow getaway.",

    highlights: [
      "Lake Pichola",
      "City Palace",
      "Jag Mandir",
      "Rooftop Cafés"
    ],

    itinerary: [
      "Day 1 — City Palace, old city & rooftop sunset",
      "Day 2 — Lake Pichola boat ride & Jag Mandir",
      "Day 3 — Slow breakfast, local market & final sunset"
    ],

    bestTime: "October – March"
  }
];


/* =========================================================
   MAP STATE
========================================================= */

let roamlyMap = null;
let routeLine = null;

let originMarker = null;
let destinationMarker = null;

let originPlace = null;
let destinationPlace = null;


/* =========================================================
   PAGE DETECTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const destinationPage =
    document.getElementById("destinationPage");

  if (destinationPage) {
    initDestinationPage();
  } else {
    initHomePage();
  }
});


/* =========================================================
   HOME PAGE
========================================================= */

function initHomePage() {
  const cards =
    document.getElementById("cards");

  if (!cards) return;

  let selectedMood = "all";

  let saved =
    new Set(
      JSON.parse(
        localStorage.getItem("roamlySaved") || "[]"
      )
    );

  const count =
    document.getElementById("resultCount");

  const heroDestination =
    document.getElementById("heroDestination");


  /* =====================================================
     FILTER DATA
  ===================================================== */

  function getFilteredDestinations() {
    const budget =
      document.getElementById("budget")?.value || "all";

    const length =
      document.getElementById("length")?.value || "all";

    const sort =
      document.getElementById("sort")?.value ||
      "recommended";


    let data =
      destinations.filter(destination => {
        const moodMatch =
          selectedMood === "all" ||
          destination.mood.includes(selectedMood);

        const budgetMatch =
          budget === "all" ||
          destination.budget === budget;

        const lengthMatch =
          length === "all" ||
          destination.days === Number(length);

        return (
          moodMatch &&
          budgetMatch &&
          lengthMatch
        );
      });


    if (sort === "budget") {
      data.sort((a, b) => {
        const priceA =
          Number(a.price.replace(/\D/g, ""));

        const priceB =
          Number(b.price.replace(/\D/g, ""));

        return priceA - priceB;
      });
    }


    if (sort === "distance") {
      data.sort(
        (a, b) =>
          a.distance - b.distance
      );
    }


    if (sort === "rating") {
      data.sort(
        (a, b) =>
          Number(b.rating) -
          Number(a.rating)
      );
    }


    return data;
  }


  /* =====================================================
     RENDER CARDS
  ===================================================== */

  function renderCards() {
    const data =
      getFilteredDestinations();


    if (count) {
      count.textContent =
        data.length;
    }


    if (!data.length) {
      cards.innerHTML = `
        <div class="empty">
          <h3>No perfect match yet.</h3>

          <p>
            Try changing your mood,
            budget or trip length.
          </p>
        </div>
      `;

      return;
    }


    cards.innerHTML =
      data.map(destination => {
        const isSaved =
          saved.has(destination.name);

        return `
          <article class="card">

            <div
              class="photo"
              style="
                background-image:
                url('${destination.img}');
              "
            >

              <span class="tag">
                ${destination.tag}
              </span>


              <button
                class="heart ${
                  isSaved ? "saved" : ""
                }"
                data-save="${destination.name}"
                type="button"
                aria-label="Save destination"
              >
                ${isSaved ? "♥" : "♡"}
              </button>

            </div>


            <div class="card-body">

              <div class="card-top">

                <h3>
                  ${destination.name}
                </h3>

                <span class="rating">
                  ★ ${destination.rating}
                </span>

              </div>


              <p class="meta">
                ${destination.time}
                ·
                ${destination.days} days
                ·
                ${destination.distance} km away
              </p>


              <div class="card-bottom">

                <div class="price">

                  <strong>
                    ${destination.price}
                  </strong>

                  <span>
                    estimated weekend
                  </span>

                </div>


                <button
                  class="explore"
                  data-explore="${destination.name}"
                  type="button"
                >
                  Explore →
                </button>

              </div>

            </div>

          </article>
        `;
      }).join("");
  }


  /* =====================================================
     CARD CLICKS
  ===================================================== */

  cards.addEventListener(
    "click",
    event => {

      const saveButton =
        event.target.closest("[data-save]");


      if (saveButton) {
        const name =
          saveButton.dataset.save;


        if (saved.has(name)) {
          saved.delete(name);

          showToast(
            "Removed from your weekend list"
          );
        } else {
          saved.add(name);

          showToast(
            `${name} saved ✦`
          );
        }


        localStorage.setItem(
          "roamlySaved",
          JSON.stringify([...saved])
        );


        renderCards();

        return;
      }


      const exploreButton =
        event.target.closest(
          "[data-explore]"
        );


      if (exploreButton) {
        const destinationName =
          exploreButton.dataset.explore;

        window.location.href =
          "destination.html?place=" +
          encodeURIComponent(
            destinationName
          );
      }
    }
  );


  /* =====================================================
     MOOD FILTERS
  ===================================================== */

  document
    .querySelectorAll(".filter")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".filter")
            .forEach(item => {
              item.classList.remove(
                "active"
              );
            });


          button.classList.add(
            "active"
          );


          selectedMood =
            button.dataset.mood ||
            "all";


          renderCards();
        }
      );

    });


  /* =====================================================
     SELECT FILTERS
  ===================================================== */

  [
    "budget",
    "length",
    "sort"
  ].forEach(id => {
    const element =
      document.getElementById(id);

    if (element) {
      element.addEventListener(
        "change",
        renderCards
      );
    }
  });


  /* =====================================================
     RESET
  ===================================================== */

  const resetBtn =
    document.getElementById(
      "resetBtn"
    );


  if (resetBtn) {
    resetBtn.addEventListener(
      "click",
      () => {

        selectedMood = "all";


        document
          .querySelectorAll(".filter")
          .forEach(button => {
            button.classList.remove(
              "active"
            );
          });


        document
          .querySelector(
            '[data-mood="all"]'
          )
          ?.classList.add("active");


        const budget =
          document.getElementById(
            "budget"
          );

        const length =
          document.getElementById(
            "length"
          );

        const sort =
          document.getElementById(
            "sort"
          );


        if (budget) {
          budget.value = "all";
        }

        if (length) {
          length.value = "all";
        }

        if (sort) {
          sort.value =
            "recommended";
        }


        renderCards();
      }
    );
  }


  /* =====================================================
     SURPRISE ME
  ===================================================== */

  const surpriseBtn =
    document.getElementById(
      "surpriseBtn"
    );


  if (surpriseBtn) {
    surpriseBtn.addEventListener(
      "click",
      () => {

        const randomIndex =
          Math.floor(
            Math.random() *
            destinations.length
          );


        const destination =
          destinations[randomIndex];


        if (heroDestination) {
          heroDestination.textContent =
            destination.name;
        }


        const distanceDestination =
          document.getElementById(
            "distanceDestination"
          );


        if (distanceDestination) {
          distanceDestination.value =
            destination.name;

          destinationPlace = null;
        }


        document
          .getElementById("trips")
          ?.scrollIntoView({
            behavior: "smooth"
          });


        showToast(
          `Your surprise pick: ${destination.name} ✦`
        );
      }
    );
  }


  /* =====================================================
     MAP + DISTANCE
  ===================================================== */

  initDistanceCalculator();


  /* =====================================================
     FIRST RENDER
  ===================================================== */

  renderCards();
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast =
    document.getElementById("toast");

  if (!toast) return;


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.roamlyToastTimer
  );


  window.roamlyToastTimer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      2500
    );
}


/* =========================================================
   DISTANCE CALCULATOR
========================================================= */

async function initDistanceCalculator() {
  const mapElement =
    document.getElementById("map");

  const originInput =
    document.getElementById(
      "distanceOrigin"
    );

  const destinationInput =
    document.getElementById(
      "distanceDestination"
    );

  const calculateButton =
    document.getElementById(
      "calculateDistanceBtn"
    );

  const useLocationButton =
    document.getElementById(
      "useLocation"
    );


  if (
    !mapElement ||
    !originInput ||
    !destinationInput ||
    !calculateButton
  ) {
    return;
  }


  try {
    createRoamlyMap();
  } catch (error) {
    console.error(
      "Map error:",
      error
    );

    showMapError(
      "Map couldn't load. Check Leaflet setup."
    );

    return;
  }


  setupLocationAutocomplete(
    originInput,
    "origin"
  );


  setupLocationAutocomplete(
    destinationInput,
    "destination"
  );


  calculateButton.addEventListener(
    "click",
    calculateRoute
  );


  [
    originInput,
    destinationInput
  ].forEach(input => {

    input.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          event.preventDefault();

          calculateRoute();
        }

      }
    );

  });


  if (useLocationButton) {
    useLocationButton.addEventListener(
      "click",
      useCurrentLocation
    );
  }


  const heroDestination =
    document.getElementById(
      "heroDestination"
    );


  if (
    heroDestination &&
    heroDestination.textContent.trim() &&
    !destinationInput.value.trim()
  ) {
    destinationInput.value =
      heroDestination.textContent.trim();
  }
}


/* =========================================================
   CREATE LEAFLET MAP
========================================================= */

function createRoamlyMap() {
  if (
    typeof L === "undefined"
  ) {
    throw new Error(
      "Leaflet library not loaded."
    );
  }


  const mapElement =
    document.getElementById("map");


  if (!mapElement) return;


  if (roamlyMap) {
    roamlyMap.invalidateSize();

    return;
  }


  roamlyMap =
    L.map("map", {
      zoomControl: true
    }).setView(
      [22.9734, 78.6569],
      5
    );


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,

      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }
  ).addTo(roamlyMap);


  const mapContainer =
    document.querySelector(
      ".map-container"
    );


  if (mapContainer) {
    mapContainer.classList.add(
      "map-loaded"
    );
  }


  setTimeout(
    () => {
      roamlyMap.invalidateSize();
    },
    200
  );
}


/* =========================================================
   LOCATION AUTOCOMPLETE
   OPENSTREETMAP NOMINATIM
========================================================= */

function setupLocationAutocomplete(
  input,
  type
) {
  let debounceTimer = null;

  const wrapper =
    input.parentElement;


  if (!wrapper) return;


  if (
    getComputedStyle(wrapper)
      .position === "static"
  ) {
    wrapper.style.position =
      "relative";
  }


  const suggestions =
    document.createElement(
      "div"
    );


  suggestions.className =
    "location-suggestions";


  suggestions.style.cssText = `
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    z-index: 9999;

    max-height: 260px;
    overflow-y: auto;

    background: #ffffff;

    border:
      1px solid rgba(0, 0, 0, 0.1);

    border-radius: 12px;

    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.12);

    display: none;
  `;


  wrapper.appendChild(
    suggestions
  );


  input.setAttribute(
    "autocomplete",
    "off"
  );


  input.addEventListener(
    "input",
    () => {

      if (type === "origin") {
        originPlace = null;
      } else {
        destinationPlace = null;
      }


      clearTimeout(
        debounceTimer
      );


      const query =
        input.value.trim();


      if (query.length < 3) {
        hideSuggestions();

        return;
      }


      debounceTimer =
        setTimeout(
          () => {
            searchLocations(
              query,
              input,
              suggestions,
              type
            );
          },
          500
        );

    }
  );


  document.addEventListener(
    "click",
    event => {

      if (
        !wrapper.contains(
          event.target
        )
      ) {
        hideSuggestions();
      }

    }
  );


  function hideSuggestions() {
    suggestions.innerHTML = "";

    suggestions.style.display =
      "none";
  }
}


/* =========================================================
   SEARCH LOCATION
========================================================= */

async function searchLocations(
  query,
  input,
  suggestions,
  type
) {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search" +
      "?format=jsonv2" +
      "&addressdetails=1" +
      "&limit=5" +
      "&countrycodes=in" +
      "&q=" +
      encodeURIComponent(query);


    const response =
      await fetch(url, {
        headers: {
          Accept:
            "application/json"
        }
      });


    if (!response.ok) {
      throw new Error(
        "Location search failed"
      );
    }


    const results =
      await response.json();


    if (!results.length) {
      suggestions.innerHTML = `
        <div
          style="
            padding: 14px;
            color: #666;
          "
        >
          No location found
        </div>
      `;

      suggestions.style.display =
        "block";

      return;
    }


    suggestions.innerHTML =
      results.map(
        (result, index) => `

          <button
            type="button"
            data-location-index="${index}"

            style="
              width: 100%;
              padding: 12px 14px;

              display: block;

              border: 0;

              border-bottom:
                1px solid rgba(0,0,0,.06);

              background: #ffffff;

              color: #222;

              text-align: left;

              font: inherit;

              cursor: pointer;
            "
          >

            <strong>
              ${
                escapeHtml(
                  result.name ||
                  result.display_name.split(
                    ","
                  )[0]
                )
              }
            </strong>

            <br>

            <small
              style="
                color: #666;
              "
            >
              ${escapeHtml(
                result.display_name
              )}
            </small>

          </button>

        `
      ).join("");


    suggestions.style.display =
      "block";


    suggestions
      .querySelectorAll(
        "[data-location-index]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const index =
              Number(
                button.dataset
                  .locationIndex
              );


            const result =
              results[index];


            const place = {
              lat:
                Number(result.lat),

              lng:
                Number(result.lon),

              name:
                result.display_name
            };


            input.value =
              result.display_name;


            if (type === "origin") {
              originPlace = place;
            } else {
              destinationPlace = place;
            }


            suggestions.innerHTML =
              "";

            suggestions.style.display =
              "none";
          }
        );

      });

  } catch (error) {
    console.error(
      "Location search error:",
      error
    );
  }
}


/* =========================================================
   GEOCODE LOCATION
========================================================= */

async function geocodeLocation(
  query
) {
  /*
     If input is already:
     28.61390, 77.20900
  */

  const coordinateMatch =
    query.match(
      /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/
    );


  if (coordinateMatch) {
    return {
      lat:
        Number(
          coordinateMatch[1]
        ),

      lng:
        Number(
          coordinateMatch[3]
        ),

      name:
        query
    };
  }


  const url =
    "https://nominatim.openstreetmap.org/search" +
    "?format=jsonv2" +
    "&limit=1" +
    "&countrycodes=in" +
    "&q=" +
    encodeURIComponent(query);


  const response =
    await fetch(url, {
      headers: {
        Accept:
          "application/json"
      }
    });


  if (!response.ok) {
    throw new Error(
      "Could not find location"
    );
  }


  const results =
    await response.json();


  if (!results.length) {
    throw new Error(
      "Location not found"
    );
  }


  return {
    lat:
      Number(results[0].lat),

    lng:
      Number(results[0].lon),

    name:
      results[0].display_name
  };
}


/* =========================================================
   CALCULATE ROUTE
   OSRM
========================================================= */

async function calculateRoute() {
  const originInput =
    document.getElementById(
      "distanceOrigin"
    );

  const destinationInput =
    document.getElementById(
      "distanceDestination"
    );

  const calculateButton =
    document.getElementById(
      "calculateDistanceBtn"
    );


  if (
    !originInput ||
    !destinationInput ||
    !calculateButton
  ) {
    return;
  }


  const origin =
    originInput.value.trim();

  const destination =
    destinationInput.value.trim();


  if (!origin) {
    showDistanceToast(
      "Please enter your starting location."
    );

    originInput.focus();

    return;
  }


  if (!destination) {
    showDistanceToast(
      "Please enter your destination."
    );

    destinationInput.focus();

    return;
  }


  if (!roamlyMap) {
    showDistanceToast(
      "Map is still loading."
    );

    return;
  }


  const originalText =
    calculateButton.innerHTML;


  calculateButton.disabled =
    true;


  calculateButton.innerHTML =
    "Calculating...";


  try {
    const originCoords =
      originPlace ||
      await geocodeLocation(
        origin
      );


    const destinationCoords =
      destinationPlace ||
      await geocodeLocation(
        destination
      );


    const routeUrl =
      "https://router.project-osrm.org/route/v1/driving/" +
      `${originCoords.lng},${originCoords.lat};` +
      `${destinationCoords.lng},${destinationCoords.lat}` +
      "?overview=full" +
      "&geometries=geojson" +
      "&steps=false";


    const response =
      await fetch(routeUrl);


    if (!response.ok) {
      throw new Error(
        "Route request failed"
      );
    }


    const data =
      await response.json();


    if (
      data.code !== "Ok" ||
      !data.routes ||
      !data.routes.length
    ) {
      throw new Error(
        "No route found"
      );
    }


    const route =
      data.routes[0];


    drawRoute(
      route,
      originCoords,
      destinationCoords
    );


    updateDistanceResult(
      route.distance,
      route.duration
    );


    const distanceKm =
      route.distance / 1000;


    const duration =
      formatDuration(
        route.duration
      );


    showDistanceToast(
      `${distanceKm.toFixed(1)} km • ${duration}`
    );


    document
      .querySelector(
        ".map-container"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  } catch (error) {
    console.error(
      "Route error:",
      error
    );


    showDistanceToast(
      "Route not found. Please enter valid locations."
    );

  } finally {
    calculateButton.disabled =
      false;

    calculateButton.innerHTML =
      originalText;
  }
}


/* =========================================================
   DRAW ROUTE
========================================================= */

function drawRoute(
  route,
  origin,
  destination
) {
  if (routeLine) {
    roamlyMap.removeLayer(
      routeLine
    );
  }


  if (originMarker) {
    roamlyMap.removeLayer(
      originMarker
    );
  }


  if (destinationMarker) {
    roamlyMap.removeLayer(
      destinationMarker
    );
  }


  const coordinates =
    route.geometry.coordinates.map(
      coordinate => [
        coordinate[1],
        coordinate[0]
      ]
    );


  routeLine =
    L.polyline(
      coordinates,
      {
        color: "#173c2b",
        weight: 5,
        opacity: 0.85
      }
    ).addTo(
      roamlyMap
    );


  originMarker =
    L.marker([
      origin.lat,
      origin.lng
    ])
      .addTo(roamlyMap)
      .bindPopup(`
        <strong>Start</strong>
        <br>
        ${escapeHtml(origin.name)}
      `);


  destinationMarker =
    L.marker([
      destination.lat,
      destination.lng
    ])
      .addTo(roamlyMap)
      .bindPopup(`
        <strong>Destination</strong>
        <br>
        ${escapeHtml(destination.name)}
      `);


  roamlyMap.fitBounds(
    routeLine.getBounds(),
    {
      padding: [
        35,
        35
      ]
    }
  );
}


/* =========================================================
   UPDATE DISTANCE RESULT
========================================================= */

function updateDistanceResult(
  distanceMeters,
  durationSeconds
) {
  const distanceValue =
    document.getElementById(
      "distanceValue"
    );

  const durationValue =
    document.getElementById(
      "durationValue"
    );

  const distanceResult =
    document.getElementById(
      "distanceResult"
    );


  const km =
    distanceMeters / 1000;


  if (distanceValue) {
    distanceValue.textContent =
      `${km.toFixed(1)} km`;
  }


  if (durationValue) {
    durationValue.textContent =
      formatDuration(
        durationSeconds
      );
  }


  if (distanceResult) {
    distanceResult.classList.add(
      "show"
    );
  }
}


/* =========================================================
   FORMAT DURATION
========================================================= */

function formatDuration(
  seconds
) {
  const totalMinutes =
    Math.round(
      seconds / 60
    );


  const hours =
    Math.floor(
      totalMinutes / 60
    );


  const minutes =
    totalMinutes % 60;


  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }


  return `${minutes}m`;
}


/* =========================================================
   CURRENT LOCATION
========================================================= */

function useCurrentLocation() {
  const originInput =
    document.getElementById(
      "distanceOrigin"
    );


  if (!originInput) return;


  if (
    !navigator.geolocation
  ) {
    showDistanceToast(
      "Location is not supported by your browser."
    );

    return;
  }


  originInput.value =
    "Detecting location...";


  navigator.geolocation
    .getCurrentPosition(

      position => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;


        originPlace = {
          lat,
          lng,
          name:
            "Current location"
        };


        originInput.value =
          `${lat.toFixed(5)}, ${lng.toFixed(5)}`;


        if (roamlyMap) {
          roamlyMap.setView(
            [lat, lng],
            13
          );


          if (originMarker) {
            roamlyMap.removeLayer(
              originMarker
            );
          }


          originMarker =
            L.marker([
              lat,
              lng
            ])
              .addTo(roamlyMap)
              .bindPopup(
                "Current location"
              )
              .openPopup();
        }


        showDistanceToast(
          "Current location detected 📍"
        );
      },


      error => {
        console.error(
          "Location error:",
          error
        );


        originInput.value =
          "";


        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          showDistanceToast(
            "Location permission was denied."
          );
        } else {
          showDistanceToast(
            "Unable to detect your location."
          );
        }
      },


      {
        enableHighAccuracy:
          true,

        timeout:
          10000,

        maximumAge:
          60000
      }

    );
}


/* =========================================================
   DISTANCE TOAST
========================================================= */

function showDistanceToast(
  message
) {
  const toast =
    document.getElementById(
      "toast"
    );


  if (!toast) return;


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.roamlyDistanceToastTimer
  );


  window.roamlyDistanceToastTimer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      3000
    );
}


/* =========================================================
   MAP ERROR
========================================================= */

function showMapError(
  message
) {
  const container =
    document.querySelector(
      ".map-container"
    );


  if (!container) return;


  const placeholder =
    container.querySelector(
      ".map-placeholder"
    );


  if (placeholder) {
    placeholder.innerHTML = `
      <span>⚠️</span>

      <p>
        Map unavailable
      </p>

      <small>
        ${escapeHtml(message)}
      </small>
    `;
  }
}


/* =========================================================
   DESTINATION PAGE
========================================================= */

function initDestinationPage() {
  const params =
    new URLSearchParams(
      window.location.search
    );


  const place =
    params.get("place");


  const destination =
    destinations.find(
      item =>
        item.name === place
    ) ||
    destinations[0];


  renderDestination(
    destination
  );


  setupDestinationButtons(
    destination
  );
}


/* =========================================================
   RENDER DESTINATION PAGE
========================================================= */

function renderDestination(
  destination
) {
  const page =
    document.getElementById(
      "destinationPage"
    );


  if (!page) return;


  page.innerHTML = `

    <section
      class="destination-hero"

      style="
        background-image:
        url('${destination.img}');
      "
    >

      <div class="hero-content">

        <span class="hero-tag">
          ${destination.tag}
        </span>


        <h1>
          ${destination.name}
        </h1>


        <div class="hero-info">

          <span>
            ★ ${destination.rating}
          </span>

          <span>
            ${destination.time}
          </span>

          <span>
            ${destination.days} days
          </span>

        </div>

      </div>

    </section>


    <section
      class="destination-content"
    >


      <div class="intro">

        <p class="eyebrow">
          YOUR WEEKEND ESCAPE
        </p>


        <h2>
          A little trip.
          <br>
          A lot of memories.
        </h2>


        <p class="description">
          ${destination.description}
        </p>

      </div>


      <div class="stats">


        <div class="stat">

          <span>
            TRIP LENGTH
          </span>

          <strong>
            ${destination.days}
            days
          </strong>

        </div>


        <div class="stat">

          <span>
            ESTIMATED BUDGET
          </span>

          <strong>
            ${destination.price}
          </strong>

        </div>


        <div class="stat">

          <span>
            DISTANCE
          </span>

          <strong>
            ${destination.distance}
            km
          </strong>

        </div>


        <div class="stat">

          <span>
            BEST TIME
          </span>

          <strong>
            ${destination.bestTime}
          </strong>

        </div>

      </div>


      <div class="grid">


        <div>

          <section class="section">

            <p class="eyebrow">
              DISCOVER
            </p>


            <h2>
              Why you'll love it
            </h2>


            <div class="highlights">

              ${
                destination
                  .highlights
                  .map(
                    item => `
                      <span
                        class="highlight"
                      >
                        ✓ ${item}
                      </span>
                    `
                  )
                  .join("")
              }

            </div>

          </section>

        </div>


        <div>

          <section class="section">

            <p class="eyebrow">

              ${
                destination.days === 2
                  ? "48 HOURS"
                  : "72 HOURS"
              }

            </p>


            <h2>
              Suggested itinerary
            </h2>


            <div class="itinerary">

              ${
                destination
                  .itinerary
                  .map(
                    (item, index) => `

                      <div
                        class="itinerary-item"
                      >

                        <strong>
                          ${index + 1}.
                        </strong>

                        ${item}

                      </div>

                    `
                  )
                  .join("")
              }

            </div>

          </section>

        </div>

      </div>


      <div
        class="final-card"
        id="finalPlan"
      >

        <div>

          <h2>
            Ready to escape?
          </h2>

          <p>
            Make this weekend
            one to remember.
          </p>

        </div>


        <button
          class="final-btn"
          id="finalPlanButton"
          type="button"
        >
          Plan this weekend →
        </button>

      </div>


    </section>
  `;
}


/* =========================================================
   DESTINATION BUTTONS
========================================================= */

function setupDestinationButtons(
  destination
) {
  const topPlan =
    document.getElementById(
      "topPlan"
    );


  const finalPlanButton =
    document.getElementById(
      "finalPlanButton"
    );


  if (topPlan) {
    topPlan.addEventListener(
      "click",
      () => {

        document
          .getElementById(
            "finalPlan"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });

      }
    );
  }


  if (finalPlanButton) {
    finalPlanButton.addEventListener(
      "click",
      () => {

        const originalText =
          finalPlanButton.innerHTML;


        finalPlanButton.innerHTML =
          "✓ Trip selected";


        finalPlanButton.style.background =
          "#ffffff";


        finalPlanButton.style.color =
          "#173c2b";


        finalPlanButton.style.transform =
          "scale(1.05)";


        setTimeout(
          () => {

            finalPlanButton.innerHTML =
              originalText;


            finalPlanButton.style.background =
              "";


            finalPlanButton.style.color =
              "";


            finalPlanButton.style.transform =
              "";

          },
          2500
        );

      }
    );
  }
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
  value = ""
) {
  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}