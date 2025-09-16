import Routers from "./routes/Routers";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <ScrollToTop />
        <Routers />
      </div>
    </AuthProvider>
  );
}

export default App;
