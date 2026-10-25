/* =========================================================
   Advise Hair: site settings & products
   Edit the values in SETTINGS and PRODUCTS to update the site.
   ========================================================= */

const SETTINGS = {
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "27753366477",

  // ⚠️ Replace these with your real profile links / names
  instagramUrl: "https://www.instagram.com/advise_hair/",
  instagramHandle: "@advise_hair",
  facebookUrl: "https://www.facebook.com/advisehair",
  facebookName: "Advise Hair",

  greeting: "Hi Advise Hair! 👋",
};

/*  Each product:
    name    : product name
    img     : photo in assets/products/
    tags    : used by the filter buttons: straight, curly, bob, colour, glueless
    sizes   : list of [label, price]  (label can be a length or an option)
    price   : single price (only for products without sizes)
    oldPrice : optional crossed-out price
    badge   : optional little label on the photo                          */
const PRODUCTS = [
  { name: "Chocolate Ombré SDD", img: "p1.jpg", tags: ["straight", "colour"], badge: "Ombré",
    sizes: [["22\"", 2800], ["24\"", 3200]] },

  { name: "SDD Waterwave", img: "p2.jpg", tags: ["curly"],
    sizes: [["18\"", 2500], ["20\"", 2700], ["22\"", 2950], ["24\"", 3200], ["26\"", 3400]] },

  { name: "SDD Glueless 5x5", img: "p3.jpg", tags: ["straight", "glueless"],
    sizes: [["8\"", 1600], ["10\"", 1800], ["12\"", 2250], ["14\"", 2600], ["16\"", 3000]] },

  { name: "Super Silky Straight", img: "p4.jpg", tags: ["straight"], badge: "Up to 32\"",
    sizes: [["18\"", 1800], ["20\"", 2200], ["22\"", 2600], ["24\"", 2800], ["26\"", 3000], ["28\"", 3300], ["30\"", 3500], ["32\"", 3800]] },

  { name: "Chocolate Bussdown", img: "p5.jpg", tags: ["straight", "colour"],
    sizes: [["22\"", 1800], ["24\"", 2200], ["28\"", 2700], ["30\"", 2950], ["32\"", 3300]] },

  { name: "Honey Highlight / Piano Colour", img: "p6.jpg", tags: ["straight", "colour"],
    sizes: [["22\"", 1800], ["28\"", 2800], ["30\"", 3000], ["32\"", 3400]] },

  { name: "10 inch SDD Colour 4", img: "p7.jpg", tags: ["bob", "colour"],
    price: 1800 },

  { name: "Blunt Cut Jet Black", img: "p8.jpg", tags: ["bob"],
    sizes: [["8\"", 1700], ["10\"", 1900], ["12\"", 2200], ["14\"", 2550], ["16\"", 2800]] },

  { name: "SDD 5x5 Glueless Bob", img: "p9.jpg", tags: ["bob", "glueless"], badge: "Sale", sale: true,
    oldPrice: 1800,
    sizes: [["8\"", 1600], ["10\"", 1800], ["12\"", 2200], ["14\"", 2550], ["16\"", 2700]] },

  { name: "DD Wigs", img: "p10.jpg", tags: ["straight"], badge: "Double Drawn",
    sizes: [["18\"", 2500], ["20\"", 2850], ["22\"", 3150], ["24\"", 3500], ["26\"", 3950], ["28\"", 4100], ["30\"", 4500]] },

  { name: "613 / Black Roots", img: "p11.jpg", tags: ["colour", "curly"], badge: "Blonde",
    price: 3700 },

  { name: "SDD Copper Straight", img: "p12.jpg", tags: ["straight", "colour"],
    sizes: [["20\"", 2600], ["22\"", 2850], ["24\"", 3300], ["26\"", 3800], ["28\"", 4400]] },

  { name: "4x4 Glueless Wig", img: "p13.jpg", tags: ["bob", "glueless"], badge: "Best value",
    price: 1200 },

  { name: "Bussdown 30 inches", img: "p14.jpg", tags: ["straight"],
    sizes: [["Normal", 3400], ["SDD", 3800]] },

  { name: "Baby SDD Curls", img: "p15.jpg", tags: ["curly"],
    price: 2300 },

  { name: "Waterwave Double Drawn", img: "p16.jpg", tags: ["curly"],
    price: 3950 },
];

/* ========================================================= */

const rand = (n) => "R" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const waLink = (text) =>
  `https://wa.me/${SETTINGS.whatsapp}?text=${encodeURIComponent(text)}`;
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ----- Generic WhatsApp links ----- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(`${SETTINGS.greeting} I'd like to place an order.`);
  a.target = "_blank";
  a.rel = "noopener";
});

/* ----- Socials ----- */
document.querySelectorAll("#igLink, .ig-link").forEach((a) => (a.href = SETTINGS.instagramUrl));
document.querySelectorAll("#fbLink, .fb-link").forEach((a) => (a.href = SETTINGS.facebookUrl));
document.getElementById("igHandle").textContent = SETTINGS.instagramHandle;
document.getElementById("fbHandle").textContent = SETTINGS.facebookName;

/* ----- Products ----- */
const grid = document.getElementById("productGrid");

function orderMessage(p, sizeLabel, price) {
  const what = sizeLabel ? `${p.name} (${sizeLabel.replace('"', " inch")})` : p.name;
  return `${SETTINGS.greeting} I'd like to order the ${what} for ${rand(price)}. Is it available?`;
}

function renderProducts(filter = "all") {
  grid.innerHTML = "";
  PRODUCTS.filter((p) => filter === "all" || p.tags.includes(filter)).forEach((p, i) => {
    const hasSizes = Array.isArray(p.sizes) && p.sizes.length > 0;
    const prices = hasSizes ? p.sizes.map((s) => s[1]) : [p.price];
    const min = Math.min(...prices);

    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${i * 40}ms`;
    card.innerHTML = `
      <div class="card-img">
        <img src="assets/products/${p.img}" alt="${escapeHtml(p.name)} wig" loading="lazy" width="720" height="900">
        ${p.badge ? `<span class="tag${p.sale ? " sale" : ""}">${escapeHtml(p.badge)}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${escapeHtml(p.name)}</h3>
        <div class="price-row">
          ${hasSizes && p.sizes.length > 1 ? `<span class="price-from">From</span>` : ""}
          <span class="price gold-text" data-price>${rand(min)}</span>
          ${p.oldPrice ? `<span class="price-old">${rand(p.oldPrice)}</span>` : ""}
        </div>
        ${hasSizes ? `<ul class="sizes" aria-label="Choose a length">
            ${p.sizes.map(([label, price], k) => `
              <li><button type="button" data-k="${k}" aria-pressed="false">
                <span class="len">${escapeHtml(label)}</span><span class="amt">${rand(price)}</span>
              </button></li>`).join("")}
          </ul>` : ""}
        <a class="btn btn-gold" target="_blank" rel="noopener" href="${waLink(orderMessage(p, hasSizes ? p.sizes[prices.indexOf(min)][0] : null, min))}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>
          <span>Order on WhatsApp</span>
        </a>
      </div>`;

    if (hasSizes) {
      const buttons = card.querySelectorAll(".sizes button");
      const orderBtn = card.querySelector(".btn");
      const priceEl = card.querySelector("[data-price]");
      const fromEl = card.querySelector(".price-from");
      const select = (k) => {
        buttons.forEach((b) => { b.classList.remove("selected"); b.setAttribute("aria-pressed", "false"); });
        buttons[k].classList.add("selected");
        buttons[k].setAttribute("aria-pressed", "true");
        const [label, price] = p.sizes[k];
        priceEl.textContent = rand(price);
        if (fromEl) fromEl.style.display = "none";
        orderBtn.href = waLink(orderMessage(p, label, price));
        orderBtn.querySelector("span").textContent = `Order ${label} on WhatsApp`;
      };
      buttons.forEach((b) => b.addEventListener("click", () => select(+b.dataset.k)));
    }

    card.querySelector(".card-img").addEventListener("click", () => openLightbox(`assets/products/${p.img}`, p.name));
    grid.appendChild(card);
  });
}

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
    renderProducts(chip.dataset.filter);
  });
});
renderProducts();

/* ----- Lightbox ----- */
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
function openLightbox(src, alt) { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow = "hidden"; }
function closeLightbox() { lb.hidden = true; document.body.style.overflow = ""; }
lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

/* ----- Mobile menu ----- */
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* ----- Open / closed status (South African time) ----- */
(function () {
  const day = new Date().toLocaleDateString("en-US", { weekday: "short", timeZone: "Africa/Johannesburg" });
  const idx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
  const li = document.querySelector(`#hoursList li[data-day="${idx}"]`);
  if (li) li.classList.add("today");
  const status = document.getElementById("openStatus");
  const open = idx >= 1 && idx <= 5;
  status.classList.add(open ? "open" : "closed");
  status.textContent = open
    ? "We're open today. Message us any time."
    : "Closed today (weekend). Leave a WhatsApp message and we'll reply on Monday.";
})();

document.getElementById("year").textContent = new Date().getFullYear();
