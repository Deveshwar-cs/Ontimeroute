function toggleAnswer(button) {
    const answer = button.nextElementSibling;
    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  }
  
  
  // Generic function to filter any table based on input and column index
  function filterTable(tableId, searchBarId, columnIndex) {
    var input = document.getElementById(searchBarId);
    var table = document.getElementById(tableId);
  
    // Check if both the table and search bar exist on the page
    if (input && table) {
      var filter = input.value.toUpperCase();
      var tr = table.getElementsByTagName("tr");
      var i, td, txtValue;
  
      // Loop through all table rows and hide those that don't match the search query
      for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[columnIndex]; // Use columnIndex to target the specific column
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ""; // Show rows that match
          } else {
            tr[i].style.display = "none"; // Hide rows that don't match
          }
        }
      }
    }
  }
  
  // Generic function to reset any table
  function resetTable(tableId, searchBarId) {
    var table = document.getElementById(tableId);
    var input = document.getElementById(searchBarId);
  
    // Check if both the table and search bar exist on the page
    if (table && input) {
      var tr = table.getElementsByTagName("tr");
      var i;
  
      // Loop through all table rows and make them visible again
      for (i = 1; i < tr.length; i++) {
        tr[i].style.display = ""; // Reset visibility
      }
  
      // Clear the search bar
      input.value = "";
    }
  }
  
  function filterTimetable() {
    // Get the selected source from the dropdown
    const selectedSource = document.getElementById("source").value.toLowerCase();
  
    // Get the entered destination from the input
    const searchDestination = document
      .getElementById("search")
      .value.toLowerCase();
  
    // Get the table and its rows
    const table = document.getElementById("timetableTable");
    const rows = table.getElementsByTagName("tr");
  
    // Loop through the rows and hide those that don't match the source and destination
    for (let i = 1; i < rows.length; i++) {
      // Start from 1 to skip the header
      const sourceCell = rows[i].getElementsByTagName("td")[1]; // Source is in the 2nd column
      const destinationCell = rows[i].getElementsByTagName("td")[2]; // Destination is in the 3rd column
  
      const sourceMatch =
        selectedSource === "all" ||
        sourceCell.textContent.toLowerCase() === selectedSource;
      const destinationMatch =
        searchDestination === "" ||
        destinationCell.textContent.toLowerCase().includes(searchDestination);
  
      // Show the row if both source and destination match
      if (sourceMatch && destinationMatch) {
        rows[i].style.display = ""; // Show the row
      } else {
        rows[i].style.display = "none"; // Hide the row
      }
    }
  }
  