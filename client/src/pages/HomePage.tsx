import ItemsList from '../components/ItemsList';
import AddItemForm from '../components/AddItemForm';
import { useState } from 'react';

type HomePagProps = {
  logoutHandler: () => void;
}

function HomePage({ logoutHandler }: HomePagProps) {

  const [loading, setLoading] = useState(false);

  // Used for simulation of observers in state management libs
  // to re-render parent component
  const isPendingRequest = (isLoading: boolean) => {
    isLoading ? setLoading(true) : setLoading(false);
  }

  return (
    <div className='home-page'>
      {loading
        ?
        <div className='loader'></div>
        :
        <>
          <span className='logout-btn' onClick={() => {
            localStorage.removeItem('a_t');
            logoutHandler();
          }}
          >
            Logout
          </span>
          <AddItemForm isPendingRequest={isPendingRequest}/>
          <ItemsList isPendingRequest={isPendingRequest}/>
        </>
      }
    </div>
  );
}

export default HomePage;
