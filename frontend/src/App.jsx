import { useAppStore } from './store/useAppStore';

const App = () => {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-red-700 text-4xl font-bold">Swap Skills</h1>
      <p>Platform to teach and learn skills from each other.</p>
      <p>Store count: {count}</p>
      <div>
        <button type="button" onClick={decrement}>
          -
        </button>
        <button type="button" onClick={increment}>
          +
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>
    </main>
  );
};

export default App;
