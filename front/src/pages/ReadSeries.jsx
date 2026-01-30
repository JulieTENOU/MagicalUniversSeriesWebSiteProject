import { useContext, useEffect, useState } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn.jsx';
import Top from '../components/Header.jsx';
import BG from '../components/Background.jsx';
import logoReturn from "../assets/img/return.png";
import { useNavigate, useParams } from 'react-router-dom';
import { ConnexionContext } from '../components/provider.jsx';
import UnavailableContent from '../components/UnavailableContent.jsx';

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
        const res = await fetch(`/books/getBySerie/${serie}`);
        if (res.status === 404) {
          booksData = [];
        }
        else if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        else {
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
        booksData = [];;
      } finally {
        setBooks(booksData);
        setBooksLoaded(true);
      }
    };

    fetchBooks();
  }, [serie]);

  if (!loading && !isConnected) {
    navigate("/", { replace: true });
    return null;
  }

  // pas encore chargé → on attend
  if (!booksLoaded) return null;

  // chargé mais aucun livre → page indisponible
  if (books.length === 0) {
    return (
      <div className='main'>
        <BG />
        <Top started={isConnected} />
        <div style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          bottom: '25vh',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <UnavailableContent />;
        </div>
      </div>
    )
  }

  return (
    <div className='main'>
      <BG />
      <Top started={isConnected} />
      <div style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        bottom: '25vh',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Btn
          onClick={() => navigate(-1)}
          msg="Go back"
          src={logoReturn}
          height={'100px'}
          sx={{ color: 'whitesmoke' }}
        />

        {books.map((book) => (
          <Btn
            key={book.ID_book}
            path={`/read/${serie}/${book.path}`}
            msg={book.book_Name}
            src={book.image}
            sx={{ color: 'whitesmoke' }}
          />
        ))}
      </div>
    </div>
  );
}

export default ReadSeries;
