var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [] ;

if (localStorage.getItem("bookmarks") !== null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark()
}

function submitButton() {
    if (siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
        var bookmark = {
            siteName: siteName.value,
            siteURL: siteURL.value,
        };
        if (!/^https:\/\/www\./.test(bookmark.siteURL)) {
            bookmark.siteURL = "https://www." + bookmark.siteURL;
        }
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark();
        clearForm();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
}


function displayBookmark() {
    var contanier = ``;
    for (var i = 0; i < bookmarks.length; i++) 
    {
        contanier += 
        `<tr><td>${(i+1)}</td>
        <td>${bookmarks[i].siteName}</td>
        <td><a href="${bookmarks[i].siteURL}" target="_blank" class="btn bg-success text-white">
        <i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn btn-delete bg-danger text-white pe-2" onclick="deleteAll(${i})">
        <i class="fa-solid fa-trash-can"></i> Delete</button></td></tr>`;    
    }
    document.getElementById("tableContent").innerHTML = contanier;
}


function clearForm() {
    siteName.value = null;
    siteURL.value = null;
}


function deleteAll(id) {
    bookmarks.splice(id, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmark();
}


function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (!httpsRegex.test(bookmarks[websiteIndex].siteURL)) { 
        window.open('http://'+bookmarks[websiteIndex].siteURL);
    } else {
        window.open(bookmarks[websiteIndex].siteURL);
    } 
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () 
{
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () 
{
    validate(siteURL, urlRegex);
});

function validate(element, regex) 
{
    var testRegex = regex;
if (testRegex.test(element.value)) 
{
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
} 
else
{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
}
}

function closeModal() {
    boxModal.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e)
{
    if (e.key == "Escape") {closeModal();}
});
document.addEventListener("click", function (e) 
{
if (e.target.classList.contains("box-info")) {closeModal();}
});
