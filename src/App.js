import { useState , useEffect } from "react";
import View from "./components/View";
// import {Icon} from 'react-icons-kit';
// import {trash} from 'react-icons-kit/feather/trash';


function App() {

  const getBooks = () => {
    let books = localStorage.getItem("books");
    // if(books){
    //   return JSON.parse(books);
    // }else{
    //   return [];
    // }
    return books ? JSON.parse(books) : [];
  }

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");

  // const [books, setBooks] = useState([]);
  const [books, setBooks] = useState(getBooks);

  const handleSubmit = (e) => {

    e.preventDefault();

    // console.log(title, author, number);

    let book = {title, author, number};
    // console.log(book);
    setBooks([...books, book]);
    
  }

  const clearList = () => {
    setBooks([]);
  }

  const deleteBook = (number) => {
    // console.log(index);
    let filteredBooks = books.filter((book, index) => {
      return book.number !== number;
    });
    setBooks(filteredBooks);
  }

  useEffect(() => {
    // console.log(books);
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <>
      <div className="wrapper">
        <h1>لیست کتاب ها</h1>
        <p>کتاب جدید خود را به کتابخانه اضافه کنید.</p>
        <div className="main">
          <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">عنوان</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="">نویسنده</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="">شماره #</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="form-grou mt-4">
                <button type="submit" className="btn btn-success btn-md">
                  افزودن
                </button>
              </div>
            </form>
          </div>
          <div className="view-container">
           
            {
              books.length >= 1 && 
                // <div>some books</div>
                <>
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                          <tr>
                            <th>شماره#</th>
                            <th>عنوان</th>
                            <th>نویسنده</th>
                            <th>حذف</th>
                          </tr>
                        </thead>
                        <tbody>

                          {/* <tr>
                            <td>num-test</td>
                            <td>onv-test</td>
                            <td>nev-test</td>
                            <td className="delete-btn"><Icon icon={trash} /></td>
                          </tr> */}

                          {/* {
                            books.map((book, index) => {
                              return(
                                <tr key={index}>
                                  <td>{book.number}</td>
                                  <td>{book.title}</td>
                                  <td>{book.author}</td>
                                  <td className="delete-btn"><Icon icon={trash} onClick={() => deleteBook(book.number)} /></td>
                                </tr>
                              )
                            })
                          } */}

                          <View books={books} deleteBook={deleteBook} />

                        </tbody>
                    </table>
                  </div>
                  <button className="btn btn-danger btn-md" onClick={clearList} >حذف همه</button>
                </>
            }

            {
              books.length < 1 && 
                <div>کتابی وجود ندارد</div>
            }
            
          </div>
        </div>
      </div>
    </>
  );
}


export default App;
