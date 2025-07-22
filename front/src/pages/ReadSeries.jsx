import { useContext, useEffect, useState } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn.jsx';
import Top from '../components/Header.jsx';
import BG from '../components/Background.jsx';
import logoReturn from "../assets/img/return.png";
import { useNavigate, useParams } from 'react-router-dom';
import { ConnexionContext } from '../components/provider.jsx';

function ReadSeries() {
  const navigate = useNavigate();
  const { serie } = useParams(); // ← récupère "xalyt" ou "ma", etc.
  const { state: isConnected } = useContext(ConnexionContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3333/books/getBySerie/${serie}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Erreur de chargement des tomes :", err);
      }
    };

    fetchBooks();
  }, [serie]);

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
