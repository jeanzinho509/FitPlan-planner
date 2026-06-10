import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Streamdown } from 'streamdown';
import { supabase } from '../lib/supabase';
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
    provider: 'google',
    options: {
      // Para onde o Supabase deve te devolver depois do login dar certo
      redirectTo: `${window.location.origin}/`, 
    },
  });

  if (error) {
    console.error("Erro ao fazer login:", error.message);
  }
};
}
