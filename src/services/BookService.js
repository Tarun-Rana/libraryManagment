import AuthenticationService from "./AuthenticationService";

class BookService {
  getBooks() {
    let user = AuthenticationService.getUsername();
    let token = AuthenticationService.getToken();

    var bookFilter = axios
      .get(`http://localhost:1022/book/filter/${user}`, { token })
      .then(response => {
        // console.log(response);
        //this.setState({ inCart: response.data });
      });

     return bookFilter;
  }
}

export default new BookService;
