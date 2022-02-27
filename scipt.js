let libary = [];
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read? "read " : "not read yet");
    }
}
function AddToLibary(book, libary){
    libary.push(book);
    return libary;
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    elements = document.getElementsByClassName("book-parent");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
// AddToLibary(new Book("Hobbit", "J.R.R Tolkien", "242", true), libary);
let form = document.querySelector("#libary-form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    AddToLibary(new Book(event.path[0][0].value, event.path[0][1].value, event.path[0][2].value, event.path[0][3].checked), libary);
});
let look = document.querySelector('#look');
look.addEventListener('click', function show_anwers(){
    removeElementsByClass("remove");
    var answers = document.createDocumentFragment();
    for(var i = 0; i < libary.length; i++){
        var newparentdiv = document.createElement('div');
        newparentdiv.className = "book-parent";
        var newdiv = document.createElement('div');
        newdiv.textContent = libary[i].info();
        newdiv.id = "book" + i;
        newdiv.className = "remove";
        var newbutton = document.createElement('button');
        newbutton.id = "btn-book" + i;
        newbutton.addEventListener('click', (event)=>{
            let index = parseInt(event.path[0].id.slice(-1));
            libary.splice([index], 1);
            show_anwers();
        });
        var changereadbutton = document.createElement('button');
        changereadbutton.id = "btn-book" + i;
        changereadbutton.classList = "remove";
        changereadbutton.textContent = "Change Read";
        changereadbutton.addEventListener('click', (event)=>{
            let index = parseInt(event.path[0].id.slice(-1));
            libary[index].read = !libary[index].read;
            show_anwers();
        });
        newbutton.textContent = "Remove";
        newbutton.className = "remove";
        newparentdiv.appendChild(newdiv);
        newparentdiv.appendChild(newbutton);
        newparentdiv.appendChild(changereadbutton);
        answers.appendChild(newparentdiv);
    }
    document.body.appendChild(answers);
});