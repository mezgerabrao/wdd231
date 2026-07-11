const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

const membersUrl = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Unable to load member data:", error);

    membersContainer.innerHTML = `
      <p class="error-message">
        The business directory could not be loaded. Please try again later.
      </p>
    `;
  }
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

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.setAttribute("src", `images/${member.image}`);
    image.setAttribute("alt", `${member.name} company logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "300");
    image.setAttribute("height", "180");

    const content = document.createElement("div");
    content.classList.add("member-content");

    const companyName = document.createElement("h2");
    companyName.textContent = member.name;

    const category = document.createElement("p");
    category.classList.add("member-category");
    category.textContent = member.category;

    const description = document.createElement("p");
    description.classList.add("member-description");
    description.textContent = member.description;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("a");
    phone.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
    phone.textContent = member.phone;

    const phoneParagraph = document.createElement("p");
    phoneParagraph.appendChild(phone);

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = "Visit website";

    const membership = document.createElement("p");
    membership.classList.add(
      "membership",
      `membership-level-${member.membershipLevel}`
    );
    membership.textContent = getMembershipName(member.membershipLevel);

    content.appendChild(companyName);
    content.appendChild(category);
    content.appendChild(description);
    content.appendChild(address);
    content.appendChild(phoneParagraph);
    content.appendChild(website);
    content.appendChild(membership);

    card.appendChild(image);
    card.appendChild(content);

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("members-grid");
  membersContainer.classList.remove("members-list");

  gridButton.classList.add("selected");
  listButton.classList.remove("selected");

  gridButton.setAttribute("aria-pressed", "true");
  listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("members-list");
  membersContainer.classList.remove("members-grid");

  listButton.classList.add("selected");
  gridButton.classList.remove("selected");

  listButton.setAttribute("aria-pressed", "true");
  gridButton.setAttribute("aria-pressed", "false");
});

getMembers();