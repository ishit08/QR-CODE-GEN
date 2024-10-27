"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { GoogleLoginButton } from "../../../components/ui/GoogleLoginButton";
import { FacebookLoginButton } from "../../../components/ui/FacebookLoginButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { signIn, getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import "../../../styles/authpage.css"; // Import the shared CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  // Handle credentials login
  const handleUserLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res.ok) {
      toast.success("Login successful 😃!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => router.push("/"),
      });
    } else {
      setErrorMessage(res?.error ?? "Unable to login.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    toast.info("Redirecting to Google...", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      signIn("google", { callbackUrl: "/" }); // Trigger Google sign-in after the toast
    }, 2000); // Wait for 2 seconds before redirecting
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    toast.info("Redirecting to Facebook...", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      signIn("facebook", { callbackUrl: "/"});
    }, 2000); // Wait for 2 seconds before redirecting
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="card-container">
        <div className="gradient-bg"></div>
        <div className="card-content">
          <Card className="login-card">
            <CardHeader className="text-center">
              <CardTitle>Login</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <form onSubmit={handleUserLogin} className="space-y-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <Button type="submit" className="login-button">
                  Login
                </Button>
                <GoogleLoginButton  type="button"
                  handleGoogleLogin={handleGoogleLogin}
                  className="social-login-button"
                />
                <FacebookLoginButton  type="button"
                  handleFacebookLogin={handleFacebookLogin}
                  className="social-login-button"
                />
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center w-full">
                Don’t have an account?{" "}
                <a href="/register" className="signup-link">
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
