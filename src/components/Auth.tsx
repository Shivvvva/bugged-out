import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { z } from "zod";
import { ThemeToggle } from "./theme-toggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email({ message: "You gotta be kiddin' me" }),
  password: z.string().min(6, { message: "Too short homie" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name, bro!" }),
  username: z.string().min(2, { message: "You can do better than this man" }),
  email: z.string().email({ message: "You gotta be kiddin' me" }),
  password: z
    .string()
    .min(6, { message: "Nahh, get that weak sh*t outta here" }),
});

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">("login");

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const isLogin = mode === "login";

  return (
    <>
      <ThemeToggle />
      <div className="flex flex-col w-full h-screen justify-center">
        {isLogin ? (
          <AuthForm
            key={mode}
            schema={loginSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(`/api/auth/login`, values, {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (res.status !== 201) {
                  throw new Error(res.data?.message || "Login failed");
                }

                navigate("/home");
              } catch (error) {
                console.error("Login failed:", error);
              }
            }}
            buttonLabel="Login"
          />
        ) : (
          <AuthForm
            key={mode}
            schema={signupSchema}
            defaultValues={{ username: "", name: "", email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(`/api/auth/signup`, values, {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (res.status !== 201) {
                  throw new Error(res.data?.message || "Signup failed");
                }

                console.log("Signed up!");

                navigate("/home");
              } catch (error) {
                console.error("Signup failed:", error);
              }
            }}
            buttonLabel="Sign Up"
          />
        )}

        <div className="text-center mt-4">
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign up for free"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
