import { initialItems } from "./data.js";
import { renderItems, renderTabs } from "./render.js";

let items = initialItems.map(i => ({ ...i }));
let nextId = Math.max(...items.map(i => i.id)) + 1;
let activeType = "all";
let search = "";
let sort = "";

function getFiltered() {
  let res = [...items];
  if (activeType !== "all") res = res.filter(i => i.type === activeType);
  if (search) res = res.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "price-asc") res.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") res.sort((a, b) => b.price - a.price);
  else if (sort === "name") res.sort((a, b) => a.name.localeCompare(b.name));
  return res;
}

function refresh() {
  renderItems(getFiltered());
  renderTabs(items, activeType);
}

function validate() {
  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;
  const price = +document.getElementById("price").value;
  let ok = true;

  [
    ["nameError", name.length < 2, "Min 2 characters"],
    ["typeError", !type, "Select a type"],
    ["priceError", !price || price < 1, "Price must be greater than 0"],
  ].forEach(([id, fail, msg]) => {
    document.getElementById(id).textContent = fail ? msg : "";
    if (fail) ok = false;
  });

  return ok;
}

document.getElementById("addBtn").addEventListener("click", () => {
  if (!validate()) return;
  items.push({
    id: nextId++,
    name: document.getElementById("name").value.trim(),
    type: document.getElementById("type").value,
    price: +document.getElementById("price").value,
    available: true,
  });
  ["name", "type", "price"].forEach(id => document.getElementById(id).value = "");
  refresh();
});

document.getElementById("search").addEventListener("input", e => {
  search = e.target.value;
  refresh();
});

document.getElementById("sort").addEventListener("change", e => {
  sort = e.target.value;
  refresh();
});

document.getElementById("tabs").addEventListener("click", e => {
  if (!e.target.classList.contains("tab")) return;
  activeType = e.target.dataset.type;
  refresh();
});

document.getElementById("list").addEventListener("click", e => {
  const id = +e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("delete-btn")) {
    items = items.filter(i => i.id !== id);
    refresh();
  } else if (e.target.classList.contains("toggle-btn")) {
    items.find(i => i.id === id).available ^= true;
    refresh();
  } else if (e.target.classList.contains("info-btn")) {
    const item = items.find(i => i.id === id);
    document.getElementById("modalBody").innerHTML = `
      <h2>${item.name}</h2>
      <p>Type: ${item.type}</p>
      <p>Price: $${item.price}</p>
      <p>Status: ${item.available ? "In stock" : "Out of stock"}</p>
    `;
    document.getElementById("modal").classList.remove("hidden");
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal").addEventListener("click", e => {
  if (e.target.id === "modal") document.getElementById("modal").classList.add("hidden");
});

refresh();
