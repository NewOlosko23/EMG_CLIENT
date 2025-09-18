import Routers from "./routes/Routers";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen">
          <ScrollToTop />
          <Routers />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
