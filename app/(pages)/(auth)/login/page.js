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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to home if logged in
    }
  }, [session, router]);

  const handleUserLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading state

    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    });

    setLoading(false); // Reset loading state

    if (res.ok) {
      // Retrieve the session which contains the token
      const session = await getSession();
      console.log("JWT Token:", session?.user?.token);

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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12">
      <div className="relative py-3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12">
          <Card className="max-w-md mx-auto border-none shadow-none w-full">
            <CardHeader className="text-center">
              <CardTitle><i className="fa fa-person-walking-arrow-right fa-beat"></i> Login</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              <form onSubmit={handleUserLogin} className="space-y-6">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full shadow-2xl p-3 h-12"
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full shadow-2xl p-3 h-12"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-green-300 shadow-lg text-gray-900 rounded-md hover:bg-gradient-to-r hover:from-green-300 hover:to-cyan-400 transition-all duration-300"
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
      <ToastContainer /> {/* Ensure this is added to show notifications */}
    </div>
  );
};

export default LoginPage;
