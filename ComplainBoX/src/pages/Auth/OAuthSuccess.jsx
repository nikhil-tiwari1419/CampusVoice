import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/auth";

export default function OAuthSuccess() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAndRedirect() {
      // Cookies are already set by backend redirect — just fetch the user
      const res = await fetch(`${import.meta.env.VITE_API_URL}`,
        {
          credentials: 'include'
        });

      if (res.ok) {
        const data = await res.json();
        await checkAuth();
        if (data.user?.role === 'student') {
          navigate('/userhome');
        }
      } else {
        navigate('/login?error=oauth_failed');
      }
    }

    verifyAndRedirect();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-600">Signing you in...</p>
      </div>
    </div>
  );
}

