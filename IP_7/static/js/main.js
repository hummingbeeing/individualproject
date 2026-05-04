// Add your JavaScript code to this file!

console.log('starting main js')

let books = [];
let page = 1;
let query = "the lord of the rings";
let pageSize = 10;
let totalPages = 0;
let loading = false;


function doFetch() {

    console.log("doFetch() called");

    loading = true;
    render();

    let url =
        "https://openlibrary.org/search.json?q=" + encodeURIComponent(query) + "&page=" + page + "&limit=" + pageSize;

    console.log("url", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log("data received", data);

            books = data.docs || [];

            console.log("books length:", books.length);

            let totalResults = data.numFound || 0;
            totalPages = Math.ceil(totalResults / pageSize);

            console.log("totalResults:", totalResults);
            console.log("totalPages:", totalPages);

            loading = false;
            render();
        })

    console.log("after fetch");
}


function onSearch() {

    query = document.querySelector("#search_input").value;
    page = 1;

    console.log("search query:", query);

    doFetch();
}


function incrementPage() {

    console.log("current page:", page);

    if (page < totalPages) {
        page++;
        console.log("next page:", page);
        doFetch();
    }
}


function decrementPage() {

    console.log("current page:", page);

    if (page > 1) {
        page--;
        console.log("previous page:", page);
        doFetch();
    }
}


function render() {

    console.log("render() called");
    console.log("books length:", books.length);

    let booksDiv = document.querySelector("#books_div");
    booksDiv.innerHTML = "";

    let pagesSpan = document.querySelector("#pages_span");
    pagesSpan.innerHTML = page + " / " + (totalPages || 1);


    if (loading) {

        console.log("loading");

        let loader = document.createElement("div");
        loader.className = "loader";
        loader.innerText = "Loading...";
        booksDiv.append(loader);
        return;
    }

    if (!books.length) {

        console.log("no results found");
        
        let p = document.createElement("p");
        p.innerText = "No results found.";
        booksDiv.append(p);
        return;
    }
    
    for (let book of books) {
        
        let wrapper = document.createElement("div");    
        wrapper.className = "Books-book";

        let img = document.createElement("img");

        if (book.cover_i) {
            let img = document.createElement("img");
            img.src = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
            wrapper.append(img);
        }

        let info = document.createElement("div");

        let title = document.createElement("div");
        title.className = "Books-book-title";
        title.innerText = book.title || "No Title";
    
        let author = document.createElement("div");
        author.innerHTML = "<strong>Author:</strong> " + (book.author_name ? book.author_name.join(", ") : "Unknown");

        let language = document.createElement("div");
        language.innerHTML = "<strong>Language:</strong> " + (book.language ? book.language.join(", ") : "N/A");

        let year = document.createElement("div");
        year.innerHTML = "<strong>Year Published:</strong> " + (book.first_publish_year || "N/A");
    

        info.append(title);    
        info.append(author);
        info.append(language);
        info.append(year);
    
        wrapper.append(img);    
        wrapper.append(info);
    
        booksDiv.append(wrapper);
    }

}


window.onload = function () {
    doFetch();
};
