const newsContainer = document.getElementById("newsContainer");

async function fetchNews() {
  try {
    const response = await fetch("https://newsdata.io/api/1/news?country=in&language=en&apikey=pub_b729ea3c3a3f4a38a9e388cfdaa62bd8");
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      newsContainer.innerHTML = "<p>No news available right now.</p>";
      return;
    }

    newsContainer.innerHTML = data.results
      .slice(0, 10)
      .map(
        (item) => `
        <div class="news-card">
          <h2>${item.title}</h2>
          <p>${item.description || "No description available."}</p>
          ${item.link ? `<a href="${item.link}" target="_blank"rel="noopener noreferrer">Read more</a>` :""}
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>⚠ Unable to load News. Please try again later.</p>";
  }
}

fetchNews();