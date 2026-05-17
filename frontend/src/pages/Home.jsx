import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="p-6">Welcome to Swap Skill</main>
      </div>
    </div>
  );
};

export default Home;
