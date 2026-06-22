const dataSources = {
  attractions: "feature/attraction/data.json",
  food: "feature/food/data.json",
  goods: "feature/goods/data.json",
  team: "feature/contact/data.json",
};

const fallbackImages = {
  attractions: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  goods: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
};

const typeLabels = {
  attractions: "สถานที่ท่องเที่ยว",
  food: "อาหารแนะนำ",
  goods: "ของฝาก",
  team: "ทีมพัฒนา",
};

const factLabels = {
  location: "สถานที่",
  hours: "เวลาเปิด",
  price: "ราคา",
  contact: "ติดต่อ",
};

let activeModalImages = [];
let activeModalImageIndex = 0;
let lastModalTrigger = null;

function normalizeImage(image, index, item) {
  const fallbackAlt = `${item.name} รูปที่ ${index + 1}`;

  if (typeof image === "string" && image.trim()) {
    return { src: image, alt: fallbackAlt };
  }

  if (image && typeof image === "object" && typeof image.src === "string" && image.src.trim()) {
    return {
      src: image.src,
      alt: image.alt || fallbackAlt,
    };
  }

  return null;
}

function getItemImages(item, type) {
  const images = Array.isArray(item.images)
    ? item.images.map((image, index) => normalizeImage(image, index, item)).filter(Boolean)
    : [];

  if (images.length > 0) {
    return images;
  }

  if (item.image) {
    return [{ src: item.image, alt: item.imageAlt || item.name }];
  }

  if (fallbackImages[type]) {
    return [{ src: fallbackImages[type], alt: item.name }];
  }

  return [];
}

function getItemSummary(item) {
  if (item.description) {
    return item.description;
  }

  if (Array.isArray(item.details)) {
    return item.details.find((detail) => typeof detail === "string" && detail.trim()) || "";
  }

  return item.details || item.detail || "";
}

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

function createDetailButton(item, type) {
  const button = document.createElement("button");
  button.className = "card-detail-button";
  button.type = "button";
  button.textContent = "ดูรายละเอียด";
  button.setAttribute("aria-label", `ดูรายละเอียด ${item.name}`);
  button.addEventListener("click", () => openDetailModal(item, type, button));
  return button;
}

function createTravelCard(item, type) {
  const card = document.createElement("article");
  card.className = "travel-card";

  const imageData = getItemImages(item, type)[0];
  const image = document.createElement("img");
  image.src = imageData.src;
  image.alt = imageData.alt;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = getItemSummary(item);

  body.append(title, description);

  if (Array.isArray(item.tags) && item.tags.length > 0) {
    body.append(createTagRow(item.tags));
  }

  body.append(createDetailButton(item, type));
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
  detail.textContent = getItemSummary(member) || member.contact || "";

  card.append(name, role, detail, createDetailButton(member, "team"));
  return card;
}

function createModalFact(label, value) {
  const fact = document.createElement("div");
  fact.className = "detail-modal-fact";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");
  description.textContent = value;

  fact.append(term, description);
  return fact;
}

function createDetailParagraphs(item) {
  const source = item.details ?? item.detail ?? item.description;
  const detailValues = Array.isArray(source) ? source : [source];
  const paragraphs = detailValues
    .filter((detail) => typeof detail === "string" && detail.trim())
    .map((detail) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = detail;
      return paragraph;
    });

  if (paragraphs.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "ไม่มีรายละเอียดเพิ่มเติม";
    paragraphs.push(paragraph);
  }

  return paragraphs;
}

function getMapUrl(item) {
  if (typeof item.mapUrl === "string" && item.mapUrl.trim()) {
    try {
      const url = new URL(item.mapUrl);

      if (url.protocol === "https:" || url.protocol === "http:") {
        return url.href;
      }
    } catch {
      return null;
    }
  }

  const query = item.mapQuery || item.location;

  if (typeof query === "string" && query.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  return null;
}

function setActiveModalImage(index) {
  if (activeModalImages.length === 0) {
    return;
  }

  activeModalImageIndex = (index + activeModalImages.length) % activeModalImages.length;

  const modal = document.querySelector("[data-detail-modal]");
  const image = modal?.querySelector("[data-modal-image]");
  const counter = modal?.querySelector("[data-gallery-counter]");
  const thumbnailButtons = modal?.querySelectorAll("[data-gallery-index]") || [];
  const imageData = activeModalImages[activeModalImageIndex];

  if (image instanceof HTMLImageElement) {
    image.src = imageData.src;
    image.alt = imageData.alt;
  }

  if (counter) {
    counter.textContent = `${activeModalImageIndex + 1} / ${activeModalImages.length}`;
  }

  thumbnailButtons.forEach((button) => {
    const isActive = Number(button.dataset.galleryIndex) === activeModalImageIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function createGalleryThumbnail(imageData, index) {
  const button = document.createElement("button");
  button.className = "gallery-thumbnail";
  button.type = "button";
  button.dataset.galleryIndex = String(index);
  button.setAttribute("aria-label", `ดูรูปที่ ${index + 1}`);

  const image = document.createElement("img");
  image.src = imageData.src;
  image.alt = "";
  image.loading = "lazy";

  button.append(image);
  button.addEventListener("click", () => setActiveModalImage(index));
  return button;
}

function populateModalGallery(item, type, modal) {
  const media = modal.querySelector("[data-modal-media]");
  const previousButton = modal.querySelector("[data-gallery-previous]");
  const nextButton = modal.querySelector("[data-gallery-next]");
  const counter = modal.querySelector("[data-gallery-counter]");
  const thumbnails = modal.querySelector("[data-gallery-thumbnails]");

  activeModalImages = getItemImages(item, type);
  activeModalImageIndex = 0;

  const hasImages = activeModalImages.length > 0;
  const hasMultipleImages = activeModalImages.length > 1;
  media.hidden = !hasImages;
  modal.classList.toggle("detail-modal-without-media", !hasImages);

  previousButton.hidden = !hasMultipleImages;
  nextButton.hidden = !hasMultipleImages;
  counter.hidden = !hasMultipleImages;
  thumbnails.hidden = !hasMultipleImages;
  thumbnails.replaceChildren(...activeModalImages.map(createGalleryThumbnail));

  if (hasImages) {
    setActiveModalImage(0);
  }
}

function openDetailModal(item, type, trigger) {
  const modal = document.querySelector("[data-detail-modal]");

  if (!(modal instanceof HTMLDialogElement)) {
    return;
  }

  const typeElement = modal.querySelector("[data-modal-type]");
  const title = modal.querySelector("[data-modal-title]");
  const description = modal.querySelector("[data-modal-description]");
  const facts = modal.querySelector("[data-modal-facts]");
  const tags = modal.querySelector("[data-modal-tags]");
  const actions = modal.querySelector("[data-modal-actions]");
  const mapLink = modal.querySelector("[data-modal-map]");

  if (!typeElement || !title || !description || !facts || !tags || !actions || !(mapLink instanceof HTMLAnchorElement)) {
    return;
  }

  populateModalGallery(item, type, modal);

  typeElement.textContent = typeLabels[type] || type;
  title.textContent = item.name;
  description.replaceChildren(...createDetailParagraphs(item));

  const factEntries = Object.entries(factLabels)
    .filter(([key]) => item[key])
    .map(([key, label]) => createModalFact(label, item[key]));

  if (type === "team" && item.role) {
    factEntries.unshift(createModalFact("หน้าที่", item.role));
  }

  if (Array.isArray(item.facts)) {
    item.facts.forEach((fact) => {
      if (fact?.label && fact?.value) {
        factEntries.push(createModalFact(fact.label, fact.value));
      }
    });
  }

  facts.replaceChildren(...factEntries);
  const modalTags = Array.isArray(item.tags) ? Array.from(createTagRow(item.tags).children) : [];
  tags.replaceChildren(...modalTags);

  const mapUrl = type === "team" ? null : getMapUrl(item);
  actions.hidden = !mapUrl;

  if (mapUrl) {
    mapLink.href = mapUrl;
    mapLink.setAttribute("aria-label", `เปิด ${item.name} ใน Google Maps`);
  } else {
    mapLink.removeAttribute("href");
  }

  lastModalTrigger = trigger;
  document.body.classList.add("modal-open");
  modal.showModal();
}

function setupDetailModal() {
  const modal = document.querySelector("[data-detail-modal]");
  const closeButton = document.querySelector("[data-modal-close]");
  const previousButton = document.querySelector("[data-gallery-previous]");
  const nextButton = document.querySelector("[data-gallery-next]");

  if (!(modal instanceof HTMLDialogElement) || !(closeButton instanceof HTMLButtonElement)) {
    return;
  }

  closeButton.addEventListener("click", () => modal.close());
  previousButton?.addEventListener("click", () => setActiveModalImage(activeModalImageIndex - 1));
  nextButton?.addEventListener("click", () => setActiveModalImage(activeModalImageIndex + 1));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (activeModalImages.length < 2) {
      return;
    }

    if (event.key === "ArrowLeft") {
      setActiveModalImage(activeModalImageIndex - 1);
    } else if (event.key === "ArrowRight") {
      setActiveModalImage(activeModalImageIndex + 1);
    }
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    activeModalImages = [];
    activeModalImageIndex = 0;
    lastModalTrigger?.focus();
    lastModalTrigger = null;
  });
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
setupDetailModal();
Object.keys(dataSources).forEach(loadSection);
