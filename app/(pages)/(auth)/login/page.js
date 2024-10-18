"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to home if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect to home
    }
  }, [router]);

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        router.push("/"); // Redirect to homepage
      } else {
        setErrorMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle login with Google
  const handleGoogleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  // Handle login with Facebook
  const handleFacebookLogin = () => {
    window.open("/api/auth/facebook", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8">
        <CardHeader  className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
         
              <Input
                type="email"
                label="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              
              <Input
                type="password"
                label="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center justify-center">
            <span className="text-gray-500">or login with</span>
          </div>

          {/* Social login buttons */}
          <div className="flex justify-between space-x-2">
            <Button onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600">
              Login with Google
            </Button>
            <Button onClick={handleFacebookLogin} className="w-full bg-blue-500 hover:bg-blue-600">
              Login with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
