
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/');
        }
      } else {
        // Sign up
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters long");
          return;
        }

        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              TopShot Challenges
            </h1>
          </div>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Create an account to start collecting.'}
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isLogin 
                ? 'Enter your credentials to access your challenges'
                : 'Join the community and start your collecting journey'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {error && (
                <Alert className="border-red-500 bg-red-900/20">
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={toggleMode}
                className="text-purple-400 hover:text-purple-300 text-sm underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
