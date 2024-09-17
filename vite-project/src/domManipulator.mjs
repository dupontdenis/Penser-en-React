export function updateContent({
  products,
  filterText = "",
  inStockOnly = false,
}) {
  // Clear existing table
  const dataTable = document.getElementById("data-table");
  dataTable.innerHTML = "";

  // Create table elements
  const table = document.createElement("table");
  const thead = createTableHeader(["Name", "Price"]);
  const tbody = document.createElement("tbody");

  // Filter products based on input text and checkbox state
  const filteredProducts = products.filter((product) => {
    const matchesFilterText = filterText
      ? product.name.toLowerCase().startsWith(filterText.toLowerCase())
      : true;
    const matchesStock = inStockOnly ? product.stocked : true;
    return matchesFilterText && matchesStock;
  });

  // Populate table rows
  const fragment = document.createDocumentFragment();
  let currentCategory = "";
  filteredProducts.forEach((product) => {
    if (product.category !== currentCategory) {
      currentCategory = product.category;
      const trCategory = createCategoryRow(currentCategory);
      fragment.appendChild(trCategory);
    }

    const tr = createProductRow(product);
    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);

  // Append thead and tbody to table
  table.appendChild(thead);
  table.appendChild(tbody);

  // Append table to the DOM
  dataTable.appendChild(table);
}

function createTableHeader(headers) {
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  return thead;
}

function createCategoryRow(category) {
  const trCategory = document.createElement("tr");
  const tdCategory = document.createElement("td");
  tdCategory.textContent = category;
  tdCategory.colSpan = 2; // Span across both columns
  tdCategory.classList.add("category");
  trCategory.appendChild(tdCategory);
  return trCategory;
}

function createProductRow(product) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = product.name;
  if (!product.stocked) {
    tdName.classList.add("stocked");
  }
  tr.appendChild(tdName);

  const tdPrice = document.createElement("td");
  tdPrice.textContent = product.price;
  tr.appendChild(tdPrice);

  return tr;
}
