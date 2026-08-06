import { places } from "../data/places.mjs";

const placesContainer = document.querySelector("#places");
const visitMessage = document.querySelector("#visit-message");

const lastVisitKey = "discoverLastVisit";
const millisecondsPerDay = 1000 * 60 * 60 * 24;

function displayVisitMessage() {
  const currentVisit = Date.now();
  const previousVisit = Number(
    localStorage.getItem(lastVisitKey)
  );

  let message;

  if (!previousVisit) {
    message =
      "Welcome! Let us know if you have any questions.";
  } else {
    const elapsedTime = currentVisit - previousVisit;
    const elapsedDays = Math.floor(
      elapsedTime / millisecondsPerDay
    );

    if (elapsedDays < 1) {
      message = "Back so soon! Awesome!";
    } else {
      const dayLabel =
        elapsedDays === 1 ? "day" : "days";

      message =
        `You last visited ${elapsedDays} ${dayLabel} ago.`;
    }
  }

  if (visitMessage) {
    visitMessage.textContent = message;
  }

  localStorage.setItem(
    lastVisitKey,
    currentVisit.toString()
  );
}

function createPlaceCard(place) {
  const card = document.createElement("article");
  card.classList.add("place-card");

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");

  const image = document.createElement("img");
  image.src = `images/${place.image}`;
  image.alt = `${place.name} in Salvador, Bahia`;
  image.loading = "lazy";
  image.width = 300;
  image.height = 200;

  figure.appendChild(image);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn More";
  button.setAttribute(
    "aria-label",
    `Learn more about ${place.name}`
  );

  button.addEventListener("click", () => {
    window.open(place.mapUrl, "_blank");
  });

  card.append(
    title,
    figure,
    address,
    description,
    button
  );

  return card;
}

function displayPlaces() {
  if (!placesContainer) {
    console.error(
      'The element with id="places" was not found.'
    );
    return;
  }

  placesContainer.innerHTML = "";

  places.forEach((place) => {
    const card = createPlaceCard(place);
    placesContainer.appendChild(card);
  });
}

displayVisitMessage();
displayPlaces();