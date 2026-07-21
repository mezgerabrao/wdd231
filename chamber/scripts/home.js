const apiKey = "0341c9013f22ef6d770a799cac67b1b4";

const latitude = -12.9714;
const longitude = -38.5014;

const currentWeatherUrl =
  `https://api.openweathermap.org/data/2.5/weather` +
  `?lat=${latitude}` +
  `&lon=${longitude}` +
  `&units=metric` +
  `&lang=en` +
  `&appid=${apiKey}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast` +
  `?lat=${latitude}` +
  `&lon=${longitude}` +
  `&units=metric` +
  `&lang=en` +
  `&appid=${apiKey}`;

const membersUrl = "data/members.json";

const currentWeatherContainer =
  document.querySelector("#current-weather");

const forecastContainer =
  document.querySelector("#forecast");

const spotlightsContainer =
  document.querySelector("#spotlights");

async function getWeather() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok) {
      throw new Error(
        `Current weather request failed: ${currentResponse.status}`
      );
    }

    if (!forecastResponse.ok) {
      throw new Error(
        `Forecast request failed: ${forecastResponse.status}`
      );
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData.list);
  } catch (error) {
    console.error("Unable to load weather data:", error);

    currentWeatherContainer.innerHTML = `
      <p class="error-message">
        Current weather information is temporarily unavailable.
      </p>
    `;

    forecastContainer.innerHTML = `
      <p class="error-message">
        The weather forecast is temporarily unavailable.
      </p>
    `;
  }
}

function displayCurrentWeather(data) {
  currentWeatherContainer.innerHTML = "";

  const weatherSummary = document.createElement("div");
  weatherSummary.classList.add("weather-summary");

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute(
    "alt",
    `${capitalizeWords(data.weather[0].description)} weather icon`
  );
  weatherIcon.setAttribute("width", "100");
  weatherIcon.setAttribute("height", "100");

  const weatherDetails = document.createElement("div");
  weatherDetails.classList.add("weather-details");

  const temperature = document.createElement("p");
  temperature.classList.add("current-temperature");
  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  const description = document.createElement("p");
  description.classList.add("weather-description");
  description.textContent = capitalizeWords(
    data.weather[0].description
  );

  const feelsLike = document.createElement("p");
  feelsLike.classList.add("weather-extra");
  feelsLike.textContent =
    `Feels like ${Math.round(data.main.feels_like)}°C`;

  const humidity = document.createElement("p");
  humidity.classList.add("weather-extra");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  weatherDetails.appendChild(temperature);
  weatherDetails.appendChild(description);
  weatherDetails.appendChild(feelsLike);
  weatherDetails.appendChild(humidity);

  weatherSummary.appendChild(weatherIcon);
  weatherSummary.appendChild(weatherDetails);

  currentWeatherContainer.appendChild(weatherSummary);
}

function displayForecast(forecastList) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = getDailyForecasts(forecastList);

  dailyForecasts.forEach((forecast) => {
    const card = document.createElement("article");
    card.classList.add("forecast-card");

    const date = new Date(`${forecast.dt_txt.replace(" ", "T")}Z`);

    const dayName = document.createElement("h4");
    dayName.textContent = new Intl.DateTimeFormat("en-US", {
      weekday: "long"
    }).format(date);

    const dateLabel = document.createElement("p");
    dateLabel.classList.add("forecast-date");
    dateLabel.textContent = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric"
    }).format(date);

    const icon = document.createElement("img");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );
    icon.setAttribute(
      "alt",
      `${capitalizeWords(forecast.weather[0].description)} forecast icon`
    );
    icon.setAttribute("loading", "lazy");
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    const temperature = document.createElement("p");
    temperature.classList.add("forecast-temperature");
    temperature.textContent = `${Math.round(forecast.main.temp)}°C`;

    const description = document.createElement("p");
    description.classList.add("forecast-description");
    description.textContent = capitalizeWords(
      forecast.weather[0].description
    );

    card.appendChild(dayName);
    card.appendChild(dateLabel);
    card.appendChild(icon);
    card.appendChild(temperature);
    card.appendChild(description);

    forecastContainer.appendChild(card);
  });
}

function getDailyForecasts(forecastList) {
  const forecastsByDate = new Map();

  forecastList.forEach((forecast) => {
    const date = forecast.dt_txt.split(" ")[0];
    const hour = Number(
      forecast.dt_txt.split(" ")[1].split(":")[0]
    );

    if (!forecastsByDate.has(date)) {
      forecastsByDate.set(date, forecast);
      return;
    }

    const savedForecast = forecastsByDate.get(date);

    const savedHour = Number(
      savedForecast.dt_txt.split(" ")[1].split(":")[0]
    );

    const currentDifference = Math.abs(hour - 12);
    const savedDifference = Math.abs(savedHour - 12);

    if (currentDifference < savedDifference) {
      forecastsByDate.set(date, forecast);
    }
  });

  const today = new Date().toISOString().split("T")[0];

  return Array.from(forecastsByDate.entries())
    .filter(([date]) => date !== today)
    .slice(0, 3)
    .map(([, forecast]) => forecast);
}

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(
        `Member data request failed: ${response.status}`
      );
    }

    const data = await response.json();

    const eligibleMembers = data.members.filter(
      (member) =>
        member.membershipLevel === 2 ||
        member.membershipLevel === 3
    );

    const randomMembers = shuffleMembers(eligibleMembers).slice(0, 3);

    displaySpotlights(randomMembers);
  } catch (error) {
    console.error("Unable to load member spotlights:", error);

    spotlightsContainer.innerHTML = `
      <p class="error-message">
        Member spotlights are temporarily unavailable.
      </p>
    `;
  }
}

function shuffleMembers(members) {
  const shuffledMembers = [...members];

  for (
    let currentIndex = shuffledMembers.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      shuffledMembers[currentIndex],
      shuffledMembers[randomIndex]
    ] = [
      shuffledMembers[randomIndex],
      shuffledMembers[currentIndex]
    ];
  }

  return shuffledMembers;
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("spotlight-header");

    const logo = document.createElement("img");
    logo.setAttribute("src", `images/${member.image}`);
    logo.setAttribute("alt", `${member.name} company logo`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "200");
    logo.setAttribute("height", "120");

    const headingContent = document.createElement("div");

    const companyName = document.createElement("h3");
    companyName.textContent = member.name;

    const category = document.createElement("p");
    category.classList.add("spotlight-category");
    category.textContent = member.category;

    headingContent.appendChild(companyName);
    headingContent.appendChild(category);

    cardHeader.appendChild(logo);
    cardHeader.appendChild(headingContent);

    const contactInformation = document.createElement("div");
    contactInformation.classList.add("spotlight-contact");

    const address = document.createElement("p");
    address.textContent = member.address;

    const phoneParagraph = document.createElement("p");

    const phoneLabel = document.createElement("strong");
    phoneLabel.textContent = "Phone: ";

    const phone = document.createElement("a");
    phone.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
    phone.textContent = member.phone;

    phoneParagraph.appendChild(phoneLabel);
    phoneParagraph.appendChild(phone);

    const websiteParagraph = document.createElement("p");

    const websiteLabel = document.createElement("strong");
    websiteLabel.textContent = "Website: ";

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = "Visit website";

    websiteParagraph.appendChild(websiteLabel);
    websiteParagraph.appendChild(website);

    const membership = document.createElement("p");
    membership.classList.add(
      "membership",
      `membership-level-${member.membershipLevel}`
    );
    membership.textContent = getMembershipName(
      member.membershipLevel
    );

    contactInformation.appendChild(address);
    contactInformation.appendChild(phoneParagraph);
    contactInformation.appendChild(websiteParagraph);
    contactInformation.appendChild(membership);

    card.appendChild(cardHeader);
    card.appendChild(contactInformation);

    spotlightsContainer.appendChild(card);
  });
}

function getMembershipName(level) {
  if (level === 3) {
    return "Gold Member";
  }

  if (level === 2) {
    return "Silver Member";
  }

  return "Member";
}

function capitalizeWords(text) {
  return text
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

getWeather();
getSpotlights();