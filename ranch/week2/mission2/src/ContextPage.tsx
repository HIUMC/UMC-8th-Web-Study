import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./NavBar";
import ThemeContent from "./ThemeContent";

export default function ContextPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col item-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
}
