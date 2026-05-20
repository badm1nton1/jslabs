export function renderItems(items) {
  const list = document.getElementById("list");
  document.getElementById("count").textContent = `Found: ${items.length}`;

  if (!items.length) {
    list.innerHTML = '<p class="empty">Nothing found.</p>';
    return;
  }

  list.innerHTML = items.map(i => `
    <div class="card ${i.available ? "" : "unavailable"}">
      <h3>${i.name}</h3>
      <p>Type: ${i.type}</p>
      <p>Price: $${i.price}</p>
      <p>${i.available ? "In stock" : "Out of stock"}</p>
      <div class="actions">
        <button class="toggle-btn" data-id="${i.id}">${i.available ? "Mark Unavailable" : "Mark Available"}</button>
        <button class="info-btn" data-id="${i.id}">Details</button>
        <button class="delete-btn" data-id="${i.id}">Delete</button>
      </div>
    </div>
  `).join("");
}

export function renderTabs(items, active) {
  const types = ["all", ...new Set(items.map(i => i.type))];
  document.getElementById("tabs").innerHTML = types.map(t => `
    <button class="tab ${t === active ? "active" : ""}" data-type="${t}">
      ${t === "all" ? "All" : t}
    </button>
  `).join("");
}
