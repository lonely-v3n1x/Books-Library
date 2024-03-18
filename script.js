function Book(author, title, page, yearOfRelease, isRead) {
  this.author = author;
  this.title = title;
  this.page = page;
  this.yearOfRelease = yearOfRelease;
  this.isRead = isRead;
}

class Library {
  bookList = [];

  addBook(book) {
    this.bookList.push(book);
    this.addHTML(book);
  }

  addHTML(book) {
    const template = document.createElement("template");
    const html = `
      <div class="book-item" data-title="${book["title"].split(" ").join("-")}" >
        <img src="no_img.jpg" alt="No Logo" />
        <div class="book-info">
          <div>
            <p><strong>Title: </strong>${book["title"]}</p>
            <p><strong>Author: </strong> ${book["author"]}</p>
            <p><strong>Pages: </strong> ${book["page"]}</p>
            <p><strong>Year Of Release: </strong>${book["yearOfRelease"]}</p>
            <p id="readBtn-${this.getBookList().length -1}"><strong>Read Status: </strong>${this.readStatus(book["isRead"])}</p>
          </div>
          <div class="book-infoBtn">
            <div>
              <button id="rmvBtn-${this.getBookList().length -1}" onclick="lib.delBook(this.id)" > Delete Book</button>
            </div>
            <div>
              <button id="temp-${this.getBookList().length-1}" onclick="lib.changeReadStatus(this.id)">Read Status</button>
            </div>
          </div>
        </div>
      </div>`;
    template.innerHTML = html.trim(); //trim the string
    document
      .querySelector(".container")
      .appendChild(template.content.firstElementChild);
    //return template.content.firstElementChild;
  }

  changeReadStatus(id){
    let parentClass=document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
    let index=this.bookList.findIndex(x=> x.title===parentClass.dataset.title.split("-").join(" "));
    this.bookList[index]["isRead"]=!this.bookList[index]["isRead"]
    // document.getElementById(id).innerHTML= this.readStatus(this.bookList[index]["isRead"]);
    document.getElementById(`readBtn-${+id.split("-")[1]}`).innerHTML= this.readStatus(this.bookList[index]["isRead"]);

  }

  delBook(id) {
    // go tho the parent of the grid card 
    let parentClass=document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
    let index=this.bookList.findIndex(x=> x.title===parentClass.dataset.title.split("-").join(" "));
    // console.log("remove button clicked");
    this.bookList.splice(index, 1);
    // // console.log(+id.split("-")[1],);
    // console.log(+id.split("-")[1]);
    // console.log(index)
    // console.log(parentClass.split("-").join(" "));
    
    //get the element id and use it to remove the grid card in the html
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.remove();
    
  }

  // static print(tt){
  //   console.log(tt);
  // }

  getBookList() {
    return this.bookList;
  }

  getBookDetails(index) {
    return this.getBookList()[index];
  }


  readStatus(x){
    if(x){
      return "Read"
    }
    else{
      return "Not Read"
    }
  }
}

book1 = new Book("John Ronald Reuel Tolkien", "The Hobbit", 123, 201, true);
book2 = new Book(
  "Samuel Beckett",
  "Molloy, Malone Dies, The Unnamable, the trilogy",
  256,
  1952,
  false,
);
book3 = new Book("Jane Austen", "Pride and Prejudice", 226, 1813, true);

lib = new Library();
lib.addBook(book1);
lib.addBook(book2);
lib.addBook(book3);

// for (i in lib.getBookList()) {
//   console.log(
//     `${lib.getBookList()[i].author} made ${lib.getBookList()[i].title}`,
//   );
// }
//
//
//
const addBtn = document.getElementById("addBookBtn");
const dialog = document.querySelector("dialog");
const submitBtn = document.getElementById("submitBtn");
// const removeBookBtn = document.getElementById("removeBook");

addBtn.addEventListener("click", () => {
  form = document.querySelector("form");
  dialog.showModal();
  form.addEventListener("submit", () => {
    lib.addBook(
      new Book(
        form["author"].value,
        form["title"].value,
        form["pages"].value,
        form["year"].value,
        form["Read"].value,
      ),
    );
    console.log("form submited");
    dialog.close();
  });
  // lib.addHTML();
});

// removeBookBtn.addEventListener("click", () => {
//   id = removeBookBtn.id;
//   console.log(id);
//   lib.delBook(+id.split("-")[1], id);
//   // id.parentElement.parentElement.parentElement.parentElement.remove()
// });
