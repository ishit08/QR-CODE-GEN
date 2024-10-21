"use client"; // Ensure this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/authpage.css'; // Import the shared CSS file
import { FacebookLoginButton } from '../../../components/ui/FacebookLoginButton';
import { GoogleLoginButton } from '../../../components/ui/GoogleLoginButton';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.ok) {
       toast.success("Registration Successfully done 😃!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          router.push("/login");
        }
      });
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="card-container">
        <div className="gradient-bg"></div>
        <div className="card-content">
          <Card className="login-card">
            <CardHeader className="text-center">
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="Name"
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  label="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <Button
                  type="submit"
                  className="login-button"
                >
                  Sign Up
                </Button>
              </form>
              {/* Added the Google and Facebook login buttons outside the CardFooter */}
              <div className="flex flex-col space-y-4 mt-2">
                <GoogleLoginButton handleGoogleLogin={() => signIn("google", { callbackUrl: "/" })} />
                <FacebookLoginButton handleFacebookLogin={() => signIn("facebook", { callbackUrl: "/" })} />
              </div>
            </CardContent>
          </Card>
          <ToastContainer />
          <p className="text-sm text-center w-full signup-link mt-4">
            Already have an account?{" "}
            <Link href="/login" className="signup-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
