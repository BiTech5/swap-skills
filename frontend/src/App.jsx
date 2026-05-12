import { useAppStore } from './store/useAppStore';
import { useSamplePost } from './hooks/useSamplePost';

const App = () => {
  const { count, increment, decrement, reset } = useAppStore();
  const { data, isLoading, isError, error } = useSamplePost();

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
      {isLoading && <p>Loading sample query...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && <p>Sample query title: {data.title}</p>}
    </main>
  );
};

export default App;
