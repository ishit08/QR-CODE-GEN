"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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

  // Redirect to home if the user is already logged in
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleUserLogin}>
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
          <ToastContainer />

          {/* Divider */}
          <div className="my-4 flex items-center justify-center">
            <span className="text-gray-500">or login with</span>
          </div>

          {/* Social login buttons */}
          <div className="flex justify-between space-x-2">
            <Button onClick={() => toast.info("Google login not implemented")} className="w-full bg-red-500 hover:bg-red-600">
              Login with Google
            </Button>
            <Button onClick={() => toast.info("Facebook login not implemented")} className="w-full bg-blue-500 hover:bg-blue-600">
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
