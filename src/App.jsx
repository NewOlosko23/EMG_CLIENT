import Routers from "./routes/Routers";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { CookieProvider } from "./contexts/CookieContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <CookieProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-screen">
                <PerformanceOptimizer />
                <ScrollToTop />
                <Routers />
              </div>
            </ToastProvider>
          </AuthProvider>
        </CookieProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
