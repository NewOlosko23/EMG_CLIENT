import Routers from "./routes/Routers";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Routers />
    </div>
  );
}

export default App;
