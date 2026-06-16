const dataSources = {
  attractions: "data/attractions.json",
  food: "data/food.json",
  goods: "data/goods.json",
  team: "data/team.json",
};

const fallbackImages = {
  attractions: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  goods: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
};

function createTagRow(tags = []) {
  const tagRow = document.createElement("div");
  tagRow.className = "tag-row";

  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = tag;
    tagRow.append(tagElement);
  });

  return tagRow;
}

function createTravelCard(item, type) {
  const card = document.createElement("article");
  card.className = "travel-card";

  const image = document.createElement("img");
  image.src = item.image || fallbackImages[type];
  image.alt = item.imageAlt || item.name;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.description;

  body.append(title, description);

  if (Array.isArray(item.tags) && item.tags.length > 0) {
    body.append(createTagRow(item.tags));
  }

  card.append(image, body);
  return card;
}

function createTeamCard(member) {
  const card = document.createElement("article");
  card.className = "team-card";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const role = document.createElement("p");
  role.className = "team-role";
  role.textContent = member.role;

  const detail = document.createElement("p");
  detail.textContent = member.detail || member.contact || "";

  card.append(name, role, detail);
  return card;
}

function renderEmptyState(container, type) {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  emptyState.textContent = `ยังไม่มีข้อมูล ${type} ให้เพิ่มข้อมูลในไฟล์ JSON ของ branch ที่รับผิดชอบ`;
  container.replaceChildren(emptyState);
}

async function loadSection(type) {
  const container = document.querySelector(`[data-render-list="${type}"]`);

  if (!container) {
    return;
  }

  try {
    const response = await fetch(dataSources[type]);

    if (!response.ok) {
      throw new Error(`Cannot load ${dataSources[type]}`);
    }

    const items = await response.json();

    if (!Array.isArray(items) || items.length === 0) {
      renderEmptyState(container, type);
      return;
    }

    const cards = items.map((item) => (type === "team" ? createTeamCard(item) : createTravelCard(item, type)));
    container.replaceChildren(...cards);
  } catch (error) {
    renderEmptyState(container, type);
    console.warn(error);
  }
}

function setupNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");

  if (!toggle || !links) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

setupNavigation();
Object.keys(dataSources).forEach(loadSection);
