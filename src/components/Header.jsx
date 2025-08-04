import React from "react";
import AddAccount from "./AddAccount";
import Profile from "./Profile";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-semibold mb-2 text-left uppercase">
          Management email outlook
        </h2>
        <div className="flex items-center space-x-10">
          <AddAccount />
          <Profile />
        </div>
      </div>
    </header>
  );
}
