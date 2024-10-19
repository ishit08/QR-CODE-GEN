"use client"; // Ensure this is a client component 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { GoogleLoginButton } from '../../../components/ui/GoogleLoginButton'; 
import { FacebookLoginButton } from '../../../components/ui/FacebookLoginButton'; 
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); 
    }
  }, [router]);

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
        router.push("/"); 
      } else {
        setErrorMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  const handleFacebookLogin = () => {
    window.open("/api/auth/facebook", "_self");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12">
      <div className="relative py-3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12">
          {/* Removed border here */}
          <Card className="max-w-md mx-auto border-none shadow-none w-full">
            <CardHeader className="text-center">
              <CardTitle><i className="fa fa-person-walking-arrow-right fa-beat"></i> Login</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              <form onSubmit={handleLogin} className="space-y-6"> {/* Adjusted spacing */}
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full shadow-2xl p-3 h-12" // Height set
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full shadow-2xl p-3 h-12" // Height set
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-green-300 shadow-lg text-gray-900 rounded-md  hover:bg-gradient-to-r hover:from-green-300 hover:to-cyan-400 transition-all duration-300"
                >
                  Login
                </Button>
                 <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} className="w-full h-12"/>
                <FacebookLoginButton handleFacebookLogin={handleFacebookLogin} className="w-full h-12"/>
              </form>
            
            </CardContent>
            <CardFooter>
              <p className="text-center w-full">
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-500">
                  Sign up
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
