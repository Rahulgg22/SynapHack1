import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
export default function SubmitProject() {
  return (
    <>
      <Navbar />
      <div className="p-10 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Submit Your Project</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Project Title" className="w-full p-3 border rounded-md" />
          <textarea placeholder="Project Description" className="w-full p-3 border rounded-md"></textarea>
          <input type="url" placeholder="GitHub Repo / Deployment Link" className="w-full p-3 border rounded-md" />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
            Submit Project
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
