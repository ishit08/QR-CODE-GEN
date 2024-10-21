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
import { signIn, getSession } from "next-auth/react"; // Import getSession
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import '../../../styles/authpage.css'; // Import the shared CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to home if logged in
    }
  }, [session, router]);

  const handleUserLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    });


    if (res.ok) {
      // Retrieve the session which contains the token
      const session = await getSession();
      // console.log("JWT Token:", session?.user?.token);
      
      toast.success("Login Successfully done 😃!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          router.push("/");
        }
      });
    } else {
      setErrorMessage(res?.error ?? "Unable to login.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const res = await signIn("google", { redirect: false });
    if (res.ok) {
      toast.success("Google login successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          router.push("/");
        }
      });
    } else {
      setErrorMessage(res?.error ?? "Unable to login with Google.");
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    const res = await signIn("facebook", { redirect: false });
    if (res.ok) {
      toast.success("Facebook login successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          router.push("/");
        }
      });
    } else {
      setErrorMessage(res?.error ?? "Unable to login with Facebook.");
    }
  };

  return (
    <div className="login-container">
      <div className="card-container">
        <div className="gradient-bg"></div>
        <div className="card-content">
          <Card className="login-card">
            <CardHeader className="text-center">
              <CardTitle>Login</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <form onSubmit={handleUserLogin} className="space-y-6">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <Button
                  type="submit"
                  className="login-button"
                >
                  Login
                </Button>
                <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} className="social-login-button"/>
                <FacebookLoginButton handleFacebookLogin={handleFacebookLogin} className="social-login-button"/>
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
      <ToastContainer /> {/* Ensure this is added to show notifications */}
    </div>
  );
};

export default LoginPage;