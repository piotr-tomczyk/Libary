class Libary{
    libary_t = []
    AddToLibary(book){
        this.libary_t.push(book);
        return this.libary_t;
    }
}
let libary = new Libary();
class Book{
    title = "Title"
    author = "Autor"
    pages = 0
    read = false
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info(){
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read? "read " : "not read yet");
    }
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
let form = document.querySelector("#libary-form");
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let radio1 = document.querySelector('#read');
let radio2 = document.querySelector('#not-read');
let pages = document.querySelector('#pages');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    if(checkError()){
        libary.AddToLibary(new Book(event.path[0][0].value, event.path[0][1].value, event.path[0][2].value, event.path[0][3].checked));
    }
    return;
});

const checkError = () => {
    let addForm = true;
    let title_info = document.querySelector('#title-info');
    let author_info = document.querySelector('#author-info');
    let pages_info = document.querySelector('#pages-info');
    let read_info = document.querySelector('#read-info');
    if (title.value === '') {
        title_info.textContent = "Title cannot be empty!!!";
        addForm = false;
    }
    else {
        title_info.textContent = "";
    }
    if (author.value === ''){
        author_info.textContent = "Author cannot be empty!!!";
        addForm = false;
    }
    else {
        author_info.textContent = "";
    }   
    
    if (pages.value === '' || pages.value === '0'){
        pages_info.textContent = "Pages cannot be empty or 0!!!";
        addForm = false;
    }
    else {
        pages_info.textContent = "";
    }
    if (radio1.checked == false && radio2.checked == false){
        read_info.textContent = "U must select if u read book or not!!";
        addForm = false;
    }
    else {
        read_info.textContent = "";
    }
    if (!addForm){
        console.log("you");
        return false;
    }
    console.log("me");
    return true;
};
let look = document.querySelector('#look');
look.addEventListener('click', function show_anwers(){
    removeElementsByClass("remove");
    var answers = document.createDocumentFragment();
    for(var i = 0; i < libary.libary_t.length; i++){
        var newparentdiv = document.createElement('div');
        newparentdiv.className = "book-parent";
        var newdiv = document.createElement('div');
        newdiv.textContent = libary.libary_t[i].info();
        newdiv.id = "book" + i;
        newdiv.className = "remove";
        var newbutton = document.createElement('button');
        newbutton.id = "btn-book" + i;
        newbutton.addEventListener('click', (event)=>{
            let index = parseInt(event.path[0].id.slice(-1));
            libary.libary_t.splice([index], 1);
            show_anwers();
        });
        var changereadbutton = document.createElement('button');
        changereadbutton.id = "btn-book" + i;
        changereadbutton.classList = "remove";
        changereadbutton.textContent = "Change Read";
        changereadbutton.addEventListener('click', (event)=>{
            let index = parseInt(event.path[0].id.slice(-1));
            libary.libary_t[index].read = !libary.libary_t[index].read;
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