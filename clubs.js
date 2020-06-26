let currentId = 0;
let clubList = [];         
$(function() {
  $("#new-club-form").on("submit", function(evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();
    let clubData = { rating, title, currentId };
    const HTMLtoAppend = createClubDataHTML(clubData);
    currentId++     
    clubList.push(clubData);
    $("#club-table-body").append(HTMLtoAppend);
    $("#new-club-form").trigger("reset");
  });
    $("tbody").on("click", ".btn.btn-danger", function(evt) {
    let indexToRemoveAt = clubList.findIndex(club => club.currentId === +$(evt.target).data("deleteId"))
    clubList.splice(indexToRemoveAt, 1)
    $(evt.target)
      .closest("tr")
      .remove();
    });
  $(".fas").on("click", function(evt) {
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedClubs = sortBy(clubList, keyToSortBy, direction);
    $("#club-table-body").empty();
  for (let club of sortedClubs) {
      const HTMLtoAppend = createClubDataHTML(club);
      $("#club-table-body").append(HTMLtoAppend);
    }
  $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}
function createClubDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
