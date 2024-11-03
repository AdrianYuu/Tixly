import { Helmet } from 'react-helmet-async';
import Unauthorized from '../../components/Unauthorized';
import { useUserContext } from '../../contexts/UserContext';

function Favorite() {
  const { user } = useUserContext();

  return (
    <>
      <Helmet>
        <title>Tixly | Favorite</title>
      </Helmet>

      {!user ? (
        <Unauthorized />
      ) : (
        <>
          <h1>Favorites</h1>
        </>
      )}
    </>
  );
}

export default Favorite;
