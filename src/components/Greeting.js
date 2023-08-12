import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGreetings } from '../features/greetingSlice';

function Greeting() {
  const dispatch = useDispatch();
  const greetingsData = useSelector((state) => state.greeting.greetings);
  const loading = useSelector((state) => state.greeting.isLoading);
  const error = useSelector((state) => state.greeting.error);

  useEffect(() => {
    dispatch(fetchGreetings());
    const interval = setInterval(() => {
      dispatch(fetchGreetings());
    }, 3000);

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
      {greetingsData && <h1>{greetingsData.message}</h1>}
    </div>
  );
}

export default Greeting;
