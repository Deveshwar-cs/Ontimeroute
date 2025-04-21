const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarLinks = document.querySelector('.navbar-links');

hamburgerMenu.addEventListener("click",()=>{
    navbarLinks.classList.toggle('show');
    hamburgerMenu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPage = 15; // Number of rows to display per page
    const tableBody = document.querySelector("#timetableTable tbody");
    const rows = tableBody.getElementsByTagName("tr");
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    let currentPage = 1;

    // Elements for pagination control
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageInfo = document.getElementById("pageInfo");

    // Function to display rows for the current page
    function displayPage(page) {
        // Hide all rows
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "none";
        }

        // Calculate start and end row for the current page
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        // Show only the rows for the current page
        for (let i = start; i < end && i < rows.length; i++) {
            rows[i].style.display = "table-row";
        }

        // Update pagination controls
        pageInfo.textContent = `Page ${page} of ${totalPages}`;

        // Enable/disable buttons based on the page number
        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalPages);
    }

    // Event listeners for pagination buttons
    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // Initial page load
    displayPage(currentPage);

    // Reset functionality
    function resetFilters() {
        // Reset the search input field
        document.getElementById("search").value = "";

        // Reset the source dropdown to the default value ('All')
        document.getElementById("source").value = "all";

        // Reset the current page to 1
        currentPage = 1;

        // Show the first page of the table
        displayPage(currentPage);
    }

    document.getElementById("resetButton3").addEventListener("click", function () {
        resetFilters();
    });
});
