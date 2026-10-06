// ---------- Mobile navigation ----------
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// ---------- Menu data (edit this array to change the menu) ----------
const menu = [
  { cat: "BBQ", name: "Chicken Tikka (2 pcs)", desc: "Leg or chest piece, 24-hour yoghurt marinade, charcoal grilled.", price: 650, popular: true },
  { cat: "BBQ", name: "Beef Seekh Kebab (4 pcs)", desc: "Hand-minced beef with green chilli and fresh coriander.", price: 900 },
  { cat: "BBQ", name: "Malai Boti", desc: "Creamy, mild chicken cubes. A favourite with kids.", price: 1050 },
  { cat: "BBQ", name: "Mutton Chops (6 pcs)", desc: "Peshawari-style, salt and pepper, slow charred.", price: 2400 },
  { cat: "Karahi", name: "Chicken Karahi (half)", desc: "Tomato, ginger and green chilli, cooked in its own juices.", price: 1800, popular: true },
  { cat: "Karahi", name: "Mutton Karahi (half)", desc: "Wood-fired, finished with butter and coriander.", price: 3200 },
  { cat: "Karahi", name: "Chicken Handi", desc: "Slow-cooked in a clay pot with cream and spices.", price: 1900 },
  { cat: "Karahi", name: "Daal Mash", desc: "Tempered with garlic and ginger. Vegetarian.", price: 750 },
  { cat: "Breads & Sides", name: "Tandoori Naan", desc: "Fresh from the tandoor.", price: 70 },
  { cat: "Breads & Sides", name: "Garlic Naan", desc: "Brushed with garlic butter.", price: 120 },
  { cat: "Breads & Sides", name: "Mint Raita", desc: "Cool yoghurt with mint and cucumber.", price: 150 },
  { cat: "Breads & Sides", name: "Kachumber Salad", desc: "Onion, tomato, cucumber and lemon.", price: 200 },
  { cat: "Desserts & Drinks", name: "Matka Kulfi", desc: "Pistachio and cardamom, set in a clay pot.", price: 350, popular: true },
  { cat: "Desserts & Drinks", name: "Gajar Ka Halwa", desc: "Slow-cooked carrot, khoya and almonds.", price: 400 },
  { cat: "Desserts & Drinks", name: "Doodh Patti Chai", desc: "Strong, sweet and milky.", price: 150 },
  { cat: "Desserts & Drinks", name: "Mint Lemonade", desc: "Fresh lemon, mint and a pinch of black salt.", price: 250 },
];

const categories = ["All", ...new Set(menu.map((i) => i.cat))];
const tabs = document.getElementById("tabs");
const list = document.getElementById("menu-list");

function renderMenu(cat) {
  const items = cat === "All" ? menu : menu.filter((i) => i.cat === cat);
  list.innerHTML = items
    .map(
      (i) => `<li>
        <h3>${i.name}${i.popular ? '<span class="badge">Popular</span>' : ""}</h3>
        <span class="price">Rs. ${i.price.toLocaleString("en-PK")}</span>
        <p>${i.desc}</p>
      </li>`
    )
    .join("");
}

function renderTabs(active) {
  tabs.innerHTML = categories
    .map((c) => `<button class="tab" role="tab" aria-selected="${c === active}" data-cat="${c}">${c}</button>`)
    .join("");
}

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  renderTabs(btn.dataset.cat);
  renderMenu(btn.dataset.cat);
});

renderTabs("All");
renderMenu("All");

// ---------- Reservation form ----------
const form = document.getElementById("reserve");
const status = document.getElementById("status");
const dateInput = document.getElementById("date");

// Block past dates
dateInput.min = new Date().toISOString().split("T")[0];

function setError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  document.getElementById(id).classList.toggle("invalid", Boolean(message));
  return !message;
}

function validate() {
  const name = form.name.value.trim();
  const phone = form.phone.value.replace(/[\s-]/g, "");
  const date = form.date.value;

  const okName = setError("name", name.length < 3 ? "Please enter your full name." : "");
  // Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX
  const okPhone = setError("phone", /^(03\d{9}|\+923\d{9})$/.test(phone) ? "" : "Enter a valid mobile number, like 0300 1234567.");
  const okDate = setError("date", date && date >= dateInput.min ? "" : "Choose today's date or a later one.");
  return okName && okPhone && okDate;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "status";
  status.textContent = "";
  if (!validate()) return;

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    // Replace YOUR_ACCESS_KEY with a free key from https://web3forms.com
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "YOUR_ACCESS_KEY",
        subject: "New table reservation",
        name: form.name.value,
        phone: form.phone.value,
        date: form.date.value,
        guests: form.guests.value,
      }),
    });
    if (!res.ok) throw new Error("Request failed");
    status.textContent = "Thank you. We will call you to confirm your table.";
    status.classList.add("ok");
    form.reset();
  } catch (err) {
    status.textContent = "Something went wrong. Please call us to book instead.";
  } finally {
    button.disabled = false;
    button.textContent = "Request reservation";
  }
});
