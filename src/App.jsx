import Routers from "./routes/Routers";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { CookieProvider } from "./contexts/CookieContext";

function App() {
  return (
    <ErrorBoundary>
      <CookieProvider>
        <AuthProvider>
          <ToastProvider>
            <div className="min-h-screen">
              <ScrollToTop />
              <Routers />
            </div>
          </ToastProvider>
        </AuthProvider>
      </CookieProvider>
    </ErrorBoundary>
  );
}

export default App;
