const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarLinks = document.querySelector('.navbar-links');

hamburgerMenu.addEventListener("click",()=>{
    navbarLinks.classList.toggle('show');
    hamburgerMenu.classList.toggle('active');
});
let filteredData = [];
let currentPage = 1;
let totalPages = 1;
const rowsPerPages = 10;
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    initializePagination(data);
  });

function updateTable() {
  const start = (currentPage - 1) * rowsPerPages;
  const end = start + rowsPerPages;
  const paginatedData = filteredData.slice(start, end);

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  paginatedData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${row.srNo}</td>
        <td>${row.source}</td>
        <td>${row.destination}</td>
        <td>${row.departureTime}</td>
        `;
    tableBody.appendChild(tr);
  });
  document.getElementById("pageInput").value = currentPage;
  document.getElementById("prevButton").disabled = currentPage === 1;
  document.getElementById("nextButton").disabled = currentPage === totalPages;
}

function initializePagination(data) {
  filteredData = [...data];
  totalPages = Math.ceil(filteredData.length / rowsPerPages);

  document.getElementById("prevButton").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });

  document.getElementById("nextButton").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateTable();
    }
  });

  document.getElementById("pageInput").addEventListener("change", function () {
    const inputPage = parseInt(this.value, 10);
    if (inputPage >= 1 && inputPage <= totalPages) {
      currentPage = inputPage;
      updateTable();
    } else {
      alert(`Please enter a page number between 1 and ${totalPages}`);
      this.value = currentPage;
    }
  });

  document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const selectedSource = document.getElementById("sourceFilter").value;

    filteredData = jsonData.filter((row) => {
      const matchesSource = selectedSource
        ? row.source === selectedSource
        : true;
      const matchDestination = row.destination.toLowerCase().includes(query);

      return matchesSource && matchDestination;
    });
    totalPages = Math.ceil(filteredData.length / rowsPerPages);
    currentPage = 1;
    updateTable();
  });

  document
    .getElementById("sourceFilter")
    .addEventListener("change", function () {
      const selectedSource = this.value;
      const query = document.getElementById("searchBox").value.toLowerCase();

      filteredData = jsonData.filter((row) => {
        const matchesSource = selectedSource
          ? row.source === selectedSource
          : true;
        const matchDestination = row.destination.toLowerCase().includes(query);

        return matchesSource && matchDestination;
      });
      totalPages = Math.ceil(filteredData.length / rowsPerPages);
      currentPage = 1;
      updateTable();
    });

   // Reset Button Functionality
   document.getElementById("resetButton").addEventListener("click", () => {
    // Reset all filters and input fields
    document.getElementById("searchBox").value = "";
    document.getElementById("sourceFilter").value = "";
    filteredData = [...jsonData]; // Reset to full data
    currentPage = 1; // Reset to first page
    totalPages = Math.ceil(filteredData.length / rowsPerPages);
    updateTable();
  });

  updateTable();
}

function updateSuggestions(query) {
  const suggestionBox = document.getElementById("suggestionBox");
  suggestionBox.innerHTML = "";

  if (query === "") {
    suggestionBox.style.display = "none";
    return;
  }

  const selectedSource = document.getElementById("sourceFilter").value;

  const suggestions = jsonData
    .filter((row) => {
      const matchesSource = selectedSource
        ? row.source === selectedSource
        : true;
      const matchDestination = row.destination
        .toLowerCase()
        .startsWith(query.toLowerCase());
      return matchesSource && matchDestination;
    })
    .map((row) => row.destination);

  const updateSuggestions = [...new Set(suggestions)];
  updateSuggestions.forEach((destination) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.className = "suggestion-item";
    suggestionItem.textContent = destination;

    suggestionItem.addEventListener("click", () => {
      document.getElementById("searchBox").value = destination;
      suggestionBox.style.display = "none";
    });
    suggestionBox.appendChild(suggestionItem);
  });
  suggestionBox.style.display = updateSuggestions.length > 0 ? "block" : "none";
}

document.getElementById("searchBox").addEventListener("input", function () {
  updateSuggestions(this.value);
});

document.addEventListener("click", (e) => {
  const suggestionBox = document.getElementById("suggestionBox");
  if (!e.target.closest("#searchBox") && !e.target.closest("suggestionBox")) {
    suggestionBox.style.display = "none";
  }
});
