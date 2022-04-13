function addToLocalStorage() {
    let textElement = document.getElementById("addtext");
    let text = textElement.value;
    let titleElement = document.getElementById("addtitle");
    let title = titleElement.value;
    if (text != "") {
        let notesArray = []
        if (localStorage.getItem("notes") != null) {
            notesArray = JSON.parse(localStorage.getItem("notes"));
        }
        let pair = [title, text]
        notesArray.push(pair)
        localStorage.setItem("notes", JSON.stringify(notesArray));
        textElement.value = "";
        titleElement.value = "";
    }
}
function displayNotes() {
    let notes = localStorage.getItem("notes");
    let html = "";
    let yourNotesHeader = document.getElementById("yourNotesHeader");
    if (notes != null) {
        let notesArray = JSON.parse(notes);
        notesArray.forEach((element, index) => {
            html += `
            <div class="noteCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element[0]}</h5>
                  <p class="card-text">${element[1]}</p>
                  <button class="btn btn-primary" onclick="deleteNote(${index})">Delete Node</a>
                </div>
              </div>
         `
        });
        yourNotesHeader.innerHTML = `<hr>
                                    <h3>Your Notes</h3><button id="deleteAll" class="btn btn-primary" onclick="deleteAllNotes()">Delete All</button>
                                    <hr>`;
    } else {
        html = "<h4 class='text-center'> Add Notes to display </h4>";
        yourNotesHeader.innerHTML = `<hr>
                                    <h3>Your Notes</h3>
                                    <hr>`;
    }
    document.getElementById("notes").innerHTML = html;
}
function deleteNote(index) {
    console.log("Deleting note ", index + 1);
    let notes = localStorage.getItem("notes");
    let notesArray = JSON.parse(notes);
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    displayNotes();
}
function deleteAllNotes() {
    localStorage.clear();
    displayNotes();
}
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
    addToLocalStorage();
    displayNotes();
});
let searchText1 = document.getElementById("searchText");
searchText1.addEventListener("input", () => {
    let inputVal = searchText1.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }else if (cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }else {
            element.style.display = "none";
        }
    });
});
displayNotes();