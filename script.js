// استبدلي الرقم التجريبي هنا برقم المتجر الحقيقي بصيغة دولية من دون + أو مسافات.
const WHATSAPP_NUMBER = "966500000000";

const setWhatsAppLink = (link) => {
  const message = link.dataset.waMessage;
  if (message) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
};

document.querySelectorAll("[data-wa-message]").forEach(setWhatsAppLink);

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    const showAnime = filter === "anime";
    const productsSection = document.querySelector(".products-section");
    const animeSection = document.querySelector("#anime-figures");
    document.querySelectorAll("[data-filter]").forEach((chip) => {
      const selected = chip === button;
      chip.classList.toggle("is-selected", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".products-section .product-card[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
    if (productsSection) {
      productsSection.classList.toggle("anime-active", showAnime);
    }
    if (animeSection) {
      animeSection.hidden = !showAnime;
    }
  });
});

const animeFigures = [
  { section: "studio-ghibli", name: "Totoro", title: "My Neighbor Totoro", image: "images/Totoro.png.jpg", price: "١٢٩", rating: "٤.٩" },
  { section: "studio-ghibli", name: "Kiki", title: "Kiki’s Delivery Service", image: "images/Kiki.png.jpg", price: "١١٩", rating: "٤.٨" },
  { section: "studio-ghibli", name: "No-Face", title: "Spirited Away", image: "images/No face.png.jpg", price: "١١٩", rating: "٤.٨" },
  { section: "one-piece", name: "Monkey D. Luffy", title: "One Piece", image: "images/Luffy.png.jpg", price: "١٢٩", rating: "٥.٠" },
  { section: "one-piece", name: "Roronoa Zoro", title: "One Piece", image: "images/Zoro.png.jpg", price: "١٢٩", rating: "٤.٩" },
  { section: "one-piece", name: "Sanji", title: "One Piece", image: "images/Sanji.png.jpg", price: "١١٩", rating: "٤.٨" },
  { section: "attack-on-titan", name: "Eren Yeager", title: "Attack on Titan", image: "images/Erin.png.jpg", price: "١٣٩", rating: "٤.٩" },
  { section: "attack-on-titan", name: "Levi Ackerman", title: "Attack on Titan", image: "images/Levi.png.jpg", price: "١٣٩", rating: "٥.٠" },
  { section: "attack-on-titan", name: "Mikasa Ackerman", title: "Attack on Titan", image: "images/Mikasa.png.jpg", price: "١٢٩", rating: "٤.٨" },
  { section: "naruto", name: "Naruto Uzumaki", title: "Naruto", image: "images/Naruto.png.jpg", price: "١٢٩", rating: "٥.٠" },
  { section: "naruto", name: "Sasuke Uchiha", title: "Naruto", image: "images/Sasuke.png.jpg", price: "١٢٩", rating: "٤.٩" },
  { section: "naruto", name: "Kakashi Hatake", title: "Naruto", image: "images/Kakashi.png.jpg", price: "١٣٩", rating: "٥.٠" },
];

const createAnimeProduct = (figure) => {
  const card = document.createElement("article");
  card.className = "product-card anime-product";

  const image = document.createElement("div");
  image.className = "product-image anime-image";
  const productImage = document.createElement("img");
  productImage.src = figure.image;
  productImage.alt = `مجسّم ${figure.name} من ${figure.title}`;
  productImage.loading = "lazy";
  productImage.decoding = "async";
  image.append(productImage);

  const info = document.createElement("div");
  info.className = "product-info";
  const name = document.createElement("h3");
  name.textContent = figure.name;
  const title = document.createElement("p");
  title.className = "anime-title";
  title.textContent = figure.title;
  const description = document.createElement("p");
  description.className = "anime-description";
  description.textContent = "مجسّم صغير للزينة والتجميع والاقتناء.";

  const meta = document.createElement("div");
  meta.className = "product-meta";
  const price = document.createElement("strong");
  price.dataset.price = figure.price;
  price.textContent = `${figure.price} ر.س`;
  const rating = document.createElement("span");
  rating.className = "product-rating";
  rating.setAttribute("aria-label", `تقييم توضيحي ${figure.rating} من ٥`);
  rating.append(document.createTextNode(`★ ${figure.rating} `));
  const ratingNote = document.createElement("small");
  ratingNote.textContent = "توضيحي";
  rating.append(ratingNote);
  meta.append(price, rating);

  const order = document.createElement("a");
  order.className = "button button-outline";
  order.dataset.waMessage = `مرحبًا Tiny Tales! أبغى أطلب مجسّم ${figure.name} من ${figure.title} بسعر ${figure.price} ر.س.`;
  order.href = "#";
  order.target = "_blank";
  order.rel = "noopener noreferrer";
  order.append(document.createTextNode("اطلبي عبر واتساب "));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  order.append(arrow);
  setWhatsAppLink(order);

  info.append(name, title, description, meta, order);
  card.append(image, info);
  return card;
};

animeFigures.forEach((figure) => {
  const grid = document.querySelector(`[data-anime-grid="${figure.section}"]`);
  if (grid) {
    grid.append(createAnimeProduct(figure));
  }
});

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});
