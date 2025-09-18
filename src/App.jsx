import Routers from "./routes/Routers";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen">
            <ScrollToTop />
            <Routers />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
