"use client";

import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { useAppDispatch } from "@/src/hooks/useStore";
import { __Action_updateAdmin } from "../utils/store/slice/adminSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginScreen() {
  //--hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //--states
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  //--functions
  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data?.message || "Something went wrong");
        setError(data?.message);
      } else {
        dispatch(
          __Action_updateAdmin({
            accessToken: data?.accessToken,
            isLogged: true,
          }),
        );
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full sm:p-4 centralize">
      <div className="w-full max-w-120 p-4 sm:p-6 flex flex-col gap-8 sm:rounded-2xl bg-sec-bg">
        <div>
          <h4 className="text-center text-sec-gold">Admin Login Portal</h4>
          <p className="text-center text-sec-text">
            Provide your credentials to review booking reservations
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full h-12 rounded-lg bg-pri-bg border border-dim-text flex items-center px-4">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="flex flex-1 text-sm text-pri-text placeholder:text-dim-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full h-12 rounded-lg bg-pri-bg border border-dim-text flex items-center gap-2 px-4">
            <div className="h-full flex flex-1">
              <input
                id="password"
                name="password"
                type={passwordIsVisible ? "text" : "password"}
                placeholder="Password"
                className=" w-full h-full text-sm text-pri-text placeholder:text-dim-text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={() => setPasswordIsVisible((prev) => !prev)}
              className="w-4.5"
            >
              {passwordIsVisible ? (
                <Eye size={18} strokeWidth={1.3} className="text-pri-text" />
              ) : (
                <EyeClosed
                  size={18}
                  strokeWidth={1.3}
                  className="text-pri-text"
                />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {Boolean(error) && (
            <p className="text-red-500 text-[10px] text-center border border-red-500 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-pri-text hover:bg-sec-text"
          >
            <p className="font-semibold text-pri-bg">Login</p>
            {loading && (
              <div className="w-4 h-4 rounded-full border border-pri-bg border-b-0 border-r-0 animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
