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
  return createElementFromHTML(`
    <tr>
      <td colspan="2" class="category">${category}</td>
    </tr>
  `);
}

function createProductRow(product) {
  const stockedClass = product.stocked ? "" : "class='stocked'";
  return createElementFromHTML(`
    <tr>
      <td ${stockedClass}>${product.name}</td>
      <td>${product.price}</td>
    </tr>
  `);
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
