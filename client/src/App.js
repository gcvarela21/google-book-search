import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SearchForm from "./components/SearchForm"
import NavBar from "./components/NavBar"
import Header from "./components/Header"
// import Results from "./components/Results"
// import API from "./utils/API.js";
import "./App.css";
import Search from "./pages/Search.js"
import Saved from "./pages/Saved.js"



function App() {

  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <Header />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/Saved" component={Saved} />
          </Switch>
        </div>
      </Router>
    </div>


  );
}


export default App;

// const [books, setBooks] = useState([]);
// // const [search, setSearch] = useState("");

// // useEffect(() => {
// //   loadBooks();
// // }, []);


// // pass me to search form
// function loadBooks(event) {
//   var bookSearch = event.target.value
//   API.getBookList()
//     .then(() => {
//       API.getBooks(bookSearch).then((books) => {
//         setBooks(books);
//       });
//     })
//     .catch(err => console.log(err));
// }

