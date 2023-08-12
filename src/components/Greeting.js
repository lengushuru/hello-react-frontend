import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGreetings } from '../features/greetingSlice';

function Greeting() {
  const dispatch = useDispatch();
  const greeting_data = useSelector((state) => state.greetings.greetings);
  const loading = useSelector((state) => state.greetings.isLoading);
  const error = useSelector((state) => state.greetings.error);

  useEffect(() => {
    dispatch(fetchGreetings());
    const interval = setInterval(() => {
      dispatch(fetchGreetings());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return <div>please...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="greeting">
      {greeting_data && <h1>{greeting_data.message}</h1>}
    </div>
  );
}

export default Greeting;
