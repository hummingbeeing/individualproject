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

        let tr = document.createElement("tr");    
        let bookimage;
  
        if (book.cover_i) {  
            bookimage = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";    
        } else {
            bookimage = "No image";  
        }

        tr.innerHTML = `
            <td style="width: 200px;">
                <img src="${bookimage}" style="width: 200px;"/>
            </td>
            
            <td style="vertical-align: top;">
                <div class="Books-book-title">${book.title || "No Title"}</div>
                <div><strong>Author:</strong> ${book.author_name ? book.author_name.join(", ") : "Unknown"}</div>
                <div><strong>Language:</strong> ${book.language ? book.language.join(", ") : "N/A"}</div>
                <div><strong>Year Published:</strong> ${book.first_publish_year || "N/A"}</div>
            </td>
        `;
        
        booksDiv.append(tr);

    }

}


window.onload = function () {
    doFetch();
};
