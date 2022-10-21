import axios from "axios";
import React, { useState, useRef } from "react";
import { useSession, signIn, getProviders } from "next-auth/react";
import Router from "next/router";

const SignupPage = () => {
  const [currentFieldSet, setCurrentFieldSet] = useState("email");
  const [emailColor, setEmailColor] = useState<string>("border-transparent");
  const [userNameColor, setUserNameColor] =
    useState<string>("border-transparent");

  const [letterColor, setLetterColor] = useState("#FFFFFF");
  const [hashtagColor, setHashtagColor] = useState("#FFFFFF");
  const [numberColor, setNumberColor] = useState("#FFFFFF");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleEmailValidation = () => {
    const email = emailRef.current?.value;
    console.log(email);

    if (email?.includes("@")) {
      console.log("valid");
      setEmailColor("border-green-500");
    } else if (email === "") {
      setEmailColor("border-transparent");
    } else {
      console.log("NOT valid");
      setEmailColor("border-red-500");
    }
  };

  const handlePasswordValidation = () => {
    const password = passwordRef.current?.value;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const special = /\W|_/g;

    if (password) {
      if (upper.test(password) && lower.test(password)) {
        setLetterColor("#008000");
      } else {
        setLetterColor("#FFFFFF");
      }

      if (password.length >= 8) {
        setNumberColor("#008000");
      } else {
        setNumberColor("#FFFFFF");
      }

      if (special.test(password)) {
        setHashtagColor("#008000");
      } else {
        setHashtagColor("#FFFFFF");
      }
    }
  };

  const handleUserNameValidation = () => {
    const userName = userNameRef.current?.value;

    if (userName) {
      setUserNameColor("border-green-500");
    } else {
      setUserNameColor("border-transparent");
    }
  };

  const nextHandler = (e: any) => {
    e.preventDefault();
    if (currentFieldSet === "email") {
      setCurrentFieldSet("password");
    } else if (currentFieldSet === "password") {
      setCurrentFieldSet("details");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    const res = await axios
      .post(
        "/api/register",
        {
          userName,
          password,
          email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((err) => console.log(err));
  };

  const loginUser = async () => {
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex items-center">
      <form className="bg-slate-700 h-96 w-[500px] mx-auto " autoComplete="off">
        <h3 className="bg-slate-800 text-center p-3 text-2xl text-white">
          {currentFieldSet === "email" && "SignUp"}{" "}
          {currentFieldSet === "password" && "Set Your Password"}{" "}
          {currentFieldSet === "details" && "Set Your Username"}
        </h3>
        {currentFieldSet === "email" && (
          <fieldset className="p-5  flex flex-col items-center justify-between h-3/4 ">
            <div
              className={`flex w-full bg-slate-800  border   rounded-lg outline-none ${emailColor}`}
            >
              <label
                htmlFor="email"
                className="text-white text-center p-5 text-xl"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 outline-none bg-slate-800 text-white text-xl    rounded-lg"
                placeholder="email@domain.com"
                ref={emailRef}
                onChange={handleEmailValidation}
                autoComplete="off"
              />
            </div>

            <button
              className="bg-slate-800 p-5 rounded-lg w-full text-white"
              onClick={(e) => nextHandler(e)}
            >
              Next
            </button>
          </fieldset>
        )}

        {currentFieldSet === "password" && (
          <fieldset className="p-5  flex flex-col items-center justify-between h-3/4 ">
            <div
              className={`flex w-full bg-slate-800  border   rounded-lg outline-none ${emailColor}`}
            >
              <label
                htmlFor="password"
                className="text-white text-center p-5 text-xl"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 outline-none bg-slate-800 text-white text-xl    rounded-lg"
                ref={passwordRef}
                onChange={handlePasswordValidation}
                autoComplete="off"
              />
            </div>

            <div className="flex items-center justify-evenly w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-letters-case"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={letterColor}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="18" cy="16" r="3" />
                <line x1="21" y1="13" x2="21" y2="19" />
                <path d="M3 19v-10a4 4 0 0 1 4 -4a4 4 0 0 1 4 4v10" />
                <line x1="3" y1="13" x2="11" y2="13" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-hash"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={hashtagColor}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="9" x2="19" y2="9" />
                <line x1="5" y1="15" x2="19" y2="15" />
                <line x1="11" y1="4" x2="7" y2="20" />
                <line x1="17" y1="4" x2="13" y2="20" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-number-8"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={numberColor}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="8" r="4" />
                <circle cx="12" cy="16" r="4" />
              </svg>
            </div>

            <button
              className="bg-slate-800 p-5 rounded-lg w-full text-white"
              onClick={(e) => nextHandler(e)}
            >
              Next
            </button>
          </fieldset>
        )}

        {currentFieldSet === "details" && (
          <fieldset className="p-5  flex flex-col items-center justify-between h-3/4 ">
            <div
              className={`flex w-full bg-slate-800  border   rounded-lg outline-none ${userNameColor}`}
            >
              <label
                htmlFor="userName"
                className="text-white text-center p-5 text-xl"
              >
                UserName
              </label>
              <input
                type="text"
                id="userName"
                className="w-full p-3 outline-none bg-slate-800 text-white text-xl    rounded-lg"
                placeholder="UserName"
                ref={userNameRef}
                onChange={handleUserNameValidation}
                autoComplete="off"
              />
            </div>

            <button
              className="bg-slate-800 p-5 rounded-lg w-full text-white"
              onSubmit={handleSubmit}
            >
              Sign Up
            </button>
          </fieldset>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
