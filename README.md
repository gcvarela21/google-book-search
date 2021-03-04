# Book Search & Save

Search for a book using an API and saving to a web hosed database.

## Table of Contents

* [Summary](#summary)
* [Dependencies](#Dependencies)
* [Installation](#Installation)
* [Functionality](#Functionality)
* [Creators](#creators)
* [Questions](#questions)
* [License](#license)

______________________________________________________________________________

## Summary

We created a React-based Google Books Search app utilizing their API. This Project was created using create React components, work with helper/util functions, and utilize React lifecycle methods to query and display books based on user searches. In order to create the functionality for a user to search for and save books to review or purchase later we utilized NodeJs, Express and MongoDB.

* [Live Site](https://book-save-list.herokuapp.com/)
* [Project Repository](https://github.com/gcvarela21/google-book-search)

![GIF Visual of The Deployed Web Application](https://github.com/gcvarela21/google-book-search)

______________________________________________________________________________

## Dependencies

**Built With**

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Bootstrap](https://getbootstrap.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JS](https://www.javascript.com/)
* [GitHub](https://github.com/)
* [Git](https://git-scm.com/)
* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [react](https://reactjs.org/)
* [react-dom](https://reactjs.org/docs/react-dom.html)
* [react-scripts](https://www.npmjs.com/package/react-scripts)
* [react-router-dom](https://reactrouter.com/web/guides/quick-start)
* [axios](https://www.npmjs.com/package/axios)
* [Web Vitals](https://web.dev/vitals/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Express](https://www.npmjs.com/package/express)
* [Concurrently](https://www.npmjs.com/package/concurrently)
* [if-env](https://www.npmjs.com/package/if-env)
* [mongo](https://www.mongodb.com/)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [heroku](https://dashboard.heroku.com/)


______________________________________________________________________________
  
## Installation

There is no installation required if you wish to access this app as is from the [deployed site on Heroku](https://underrated-moviedb.herokuapp.com/).

For local installation [Node.js](https://nodejs.org/en/) needs to be installed as well as [MySQL and MySQl Workbench](https://www.mysql.com/products/workbench/). 

Please clone or download the project folder. And create a new database in Workbench called "crtierion":


Open your prefered terminal or comand_promt program and navigate into the project folder. Run the following command:

```javascript
npm install
```

and then run the application with the next command:

```javascript
npm start
```

The application will be visible in your web browser of choice at:

```javascript
localhost:3000
```

______________________________________________________________________________
  
## Funtionality

This Apllication in its development uses node-express to create a local sever to host and access our local database by conncting to the Mongos's local port to send GET Requests, Posts, and Update the saved data retieved from The [Google Books API](https://developers.google.com/books/docs/v1/using).

This application also uses Axios to make GET requests to the [Google Books API](https://developers.google.com/books/docs/v1/using).

For Example:
Our search bar makes a general GET request to search for books key word or works submitted from our web page client side. The request retrieves a top listed items that match the search. The Search Results include the Book Title, Author, Description, and Image.

As you can see in the code snippet below this is our Google Books API call created in React and Eported for furture use and reference:

```javascript
import axios from "axios";

export default {
  getBooks: function (bookSearch) {
    return new Promise((resolve, reject) => {
      var searchQuery = "https://www.googleapis.com/books/v1/volumes?q=" + bookSearch;
      // console.log(searchQuery)
      axios.get(searchQuery).then((res) => {
        // console.log(res.data.results)
        const books = res.data.items;

        const results = books.map((book) => {
          if (book.volumeInfo.imageLinks === undefined) {
            return {
              title: book.volumeInfo.title,
              image: "https://via.placeholder.com/130x200.png",
              author: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              link: book.volumeInfo.infoLink
            };
          } else {
            return {
              title: book.volumeInfo.title,
              image: book.volumeInfo.imageLinks.thumbnail,
              author: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              link: book.volumeInfo.infoLink
            };
          }

        });
        resolve(results);
      }).catch((err) => reject(err));
    });
  },
  getBookList: function () {
    return new Promise((resolve) => {
      resolve();
    });
  }
};
```
The list objects returned from the search are rendered into card container in react and passed down to the individuals card elements, where we can see the information displayed with buttons to view the book or save it.

```javascript
import React from "react";
import "./index.css";

function SearchResults(props) {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h5 className="card-title">{props.author}</h5>
                    <p className="card-text">{props.description}</p>
                    <img src={props.image} alt="bookcover" />
                    <button className="btn btn-info" onClick={() => props.favoriteBook(props)} >Favorite</button>
                    <a href={props.link} target="_blank" rel="noopener noreferrer"><button className="btn btn-info" >View</button></a>
                </div>
            </div>
        </div>
    )
}
export default SearchResults;
```

When the Favorite button clicked the book is saved locally to MongoDB for future reference or on the deployed site it is saved on an online database using a MongoDB cluster. 

When navigating to the View Favorites page a get request to the MongoDB is made to get your saved list information to render it into cards on the page. Within the card is a remove button that will delete a book from the database and your rendered list.

```javascript
import axios from "axios";

// exporting a full object 
export default {
  // Gets all books
  // these are keys and values 
  getBooks: function () {
    return axios.get("/api/book");
  },
  // Gets the book with the given id
  // getBook: function (id) {
  //   return axios.get("/api/Books/" + id);
  // },
  // Deletes the Book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/book/" + id);
  },
  // Saves a Book to the database
  saveBook: function (bookData) {
    console.log("savebook")
    return axios.post("/api/book", bookData);
  }
};
```



______________________________________________________________________________

## Created by

* **PAMELA GUTIERREZ**
- [Link to Portfolio Site](https://pamela-gutierrez.github.io/updated-portfolio/)
- [Link to Github](https://github.com/pamela-gutierrez)
- [Link to LinkedIn](www.linkedin.com/in/pamela-gutierrez)

**Peter Ting**
- [Link to Portfolio Site](https://portfolio-mk3.herokuapp.com/)
- [Link to Github](https://github.com/Pting1995)
- [Link to LinkedIn](https://www.linkedin.com/in/pting002/)

**& Gloria C Varela**

* [GitHub Profile Page](https://github.com/gcvarela21)
* [Web Developer Portfoio Website](https://gcvarela21.github.io/glo.digital/)
* [Interactive Design Portfolio Website](https://www.glo.digital/)
* [LinkenIn](https://www.linkedin.com/in/glovarela/)

_____________________________________________________________________________

### Questions

If you have any questions contact: Any of the [Creators](#creators)

______________________________________________________________________________

### License

This project is licensed under: ![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=plastic)
