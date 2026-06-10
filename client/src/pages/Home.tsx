import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Streamdown } from "streamdown";
import { supabase } from "../lib/supabase";

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Workflow, Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  const handleLoginClick = async () => {
    // Exemplo usando login com Google. Você pode trocar para 'github', 'discord', etc.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Para onde o Supabase deve te devolver depois do login dar certo
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to FitPlan</h1>
      {isAuthenticated ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-lg">Welcome back, {user?.name || "User"}!</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-center text-muted-foreground">
            Please log in to continue.
          </p>
          <Button onClick={handleLoginClick}>Login with Google</Button>
          <div className="mt-4">
            <a
              href={getLoginUrl()}
              className="text-sm text-blue-500 hover:underline"
            >
              Or use alternative login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
