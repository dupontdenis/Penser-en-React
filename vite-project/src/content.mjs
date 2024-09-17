import { fetchContent } from "./dataFetcher.mjs";
import { updateContent } from "./domManipulator.mjs";

export async function showContent() {
  try {
    const content = await fetchContent();
    console.log("Content:", content);
    updateContent({ products: content });

    // Add event listeners for the form
    const filterInput = document.getElementById("filter-input");
    const stockCheckbox = document.getElementById("stock-checkbox");

    filterInput.addEventListener("input", () => {
      updateContent({
        products: content,
        filterText: filterInput.value,
        inStockOnly: stockCheckbox.checked,
      });
    });

    stockCheckbox.addEventListener("change", () => {
      updateContent({
        products: content,
        filterText: filterInput.value,
        inStockOnly: stockCheckbox.checked,
      });
    });
  } catch (e) {
    console.log("Error", e);
  }
}
