import school from "../assets/images/school-tup.webp";
import tupLogo from "../assets/tup-logo.svg";
import appLogo from "../assets/logo.png";
import google from "../assets/google.png";
import React from 'react';


import { Info } from "lucide-react";

export default function LoginPage() {
  React.useEffect(() => {
    // example API call to the backend
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => console.log('backend response', data))
      .catch(err => console.error('fetch error', err));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-lexend">
      {/* Left Panel */}
      <div className="relative lg:flex-1 h-[40vh] sm:h-[50vh] lg:h-screen">
        <img
          src={school}
          alt="school"
          className="w-full h-full object-cover absolute inset-0 blur-[3px]"
        />
        <div className="absolute inset-0 bg-[#3A0000]/80 p-5 sm:p-10 lg:p-14 flex flex-col">
          {/* Logo */}
          <div className="flex w-full justify-center">
            <img
              src={tupLogo}
              alt="tup-logo"
              className="w-[60px] sm:w-[90px] lg:w-[140px]"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col flex-1 justify-center gap-2 sm:gap-5 lg:gap-5 mt-2 lg:-mt-20">
            <h2 className="text-white font-bold text-center text-[22px] sm:text-3xl lg:text-5xl leading-snug">
              Computer Studies Department
            </h2>
            <h2 className="font-bold text-[#FFD700] text-center text-[22px] sm:text-3xl lg:text-5xl leading-snug">
              Faculty Management System
            </h2>
            <p className="text-center font-light text-white text-[11px] sm:text-sm lg:text-base w-full px-1 sm:px-6 lg:px-0 leading-relaxed">
              The Technological University of the Philippines - Manila Computer
              Studies Department{" "}
              <span className="hidden sm:inline">
                <br />
              </span>{" "}
              Faculty Management System with AI assisted Scheduling
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-10 py-7 sm:py-10 lg:py-0 gap-2">
        <img src={appLogo} alt="app logo" className="w-34 sm:w-44 lg:w-auto" />
        <h2 className="font-semibold text-[#4A4747] text-[13px] sm:text-base text-center max-w-[270px] sm:max-w-sm lg:max-w-none">
          Faculty Management System with AI assisted Scheduling
        </h2>

        <form
          action="POST"
          className="mt-5 sm:mt-10 w-full flex justify-center"
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-3 sm:gap-5 text-primary font-bold border-2 rounded-[24px] py-3.5 sm:py-5 px-7 sm:px-14 lg:px-20 cursor-pointer text-sm sm:text-base w-full max-w-[420px] sm:w-auto transition-all duration-200 hover:bg-primary hover:text-white "
          >
            <img src={google} alt="google" className="w-[18px] sm:w-auto" />
            Continue with TUP email
          </button>
        </form>

        <div className="flex gap-1 w-full max-w-[300px] sm:max-w-[420px] py-2 px-3 mt-3 sm:mt-5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl">
          <Info
            size={20}
            className="shrink-0 mt-1 text-[#94A3B8] sm:size-[23px]"
          />
          <p className="text-[12px] sm:text-[14px] text-[#475569] m-1.5 sm:m-2 leading-relaxed">
            Use your institutional{" "}
            <span className="text-primary">@tup.edu.ph</span> account to sign
            in. Access is restricted to authorized faculty only.
          </p>
        </div>
      </div>
    </div>
  );
}
