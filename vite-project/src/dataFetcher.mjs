export async function fetchContent() {
  try {
    console.log(`Fetching data ...`);
    const response = await fetch(`/data.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
