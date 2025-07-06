import { useEffect, useState } from 'react';
import style from './App.module.less';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/app/api/counter')
      .then((response) => response.json())
      .then((data) => {
        setCount(data.counter);
      });
  }, []);

  const handleOnClick = () => {
    fetch('/app/api/counter', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => setCount(data.counter));
  };

  return (
    <div className={style.card}>
      <button onClick={handleOnClick}>Count is {count}</button>
    </div>
  );
}

export default App;
