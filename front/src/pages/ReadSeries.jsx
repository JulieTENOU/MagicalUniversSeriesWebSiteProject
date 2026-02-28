import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../index.css";
import "../general.css";
import "../../src/styles/responsive.css";

import { ConnexionContext } from "../components/provider.jsx";

import Top from "../components/Header.jsx";
import BG from "../components/Background.jsx";
import Btn from "../components/Btn.jsx";
import BtnRtn from "../components/BtnRtn.jsx";
import UnavailableContent from "../components/UnavailableContent.jsx";
import PageLoader from "../components/PageLoader.jsx";

function ReadSeries() {
  const navigate = useNavigate();
  const { serie } = useParams(); // ← récupère "xalyt" ou "ma", etc.
  const { state: isConnected, loading } = useContext(ConnexionContext);
  const [books, setBooks] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      let booksData = [];
      try {
        const res = await fetch(`/books/getBySerieReadable/${serie}`);
        if (res.status === 404) {
          booksData = [];
        } else if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        } else {
          const text = await res.text();
          try {
            const parsed = JSON.parse(text);
            booksData = Array.isArray(parsed) ? parsed : [];
          } catch {
            booksData = [];
          }
        }
      } catch (err) {
        console.error("Erreur de chargement des tomes :", err);
        booksData = [];
      } finally {
        setBooks(booksData);
        setBooksLoaded(true);
      }
    };

    fetchBooks();
  }, [serie]);

  console.log(books);
  if (!loading && !isConnected) {
    navigate("/", { replace: true });
    return null;
  }

  // pas encore chargé → on attend
  if (!booksLoaded) return null;

  // chargé mais aucun livre → page indisponible
  if (books.length === 0) {
    return (
      <div className="main">
        <BG />
        <Top started={isConnected} />
        <div className="page-content-wrapper"
        // style={{
        //   width: "100vw",
        //   display: "flex",
        //   flexDirection: "row",
        //   position: "fixed",
        //   bottom: "25vh",
        //   justifyContent: "space-around",
        //   alignItems: "center",
        // }}
        >
          <UnavailableContent />;
        </div>
      </div>
    );
  }

  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;

  if (loading) return <PageLoader />;

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />

      <div className="page-content-wrapper">

        <BtnRtn msg={"Go back"}
          path={`/read/`}
        />

        {books.map((book) => {
          const imgUrl = book.ID_media
            ? `${API_BASE}/api/media/getOneMedia/${book.ID_media}`
            : null;
          return (
            <Btn
              key={book.ID_book}
              path={`/read/${serie}/${book.path}`}
              msg={book.book_Name}
              src={imgUrl}
              height="140"
              width="100"
              sx={{ color: "whitesmoke" }}
            />);
        })}
      </div>
    </div>
  );
}

export default ReadSeries;
