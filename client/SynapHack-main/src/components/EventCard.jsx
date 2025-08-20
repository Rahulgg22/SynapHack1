import { Link } from "react-router-dom";
import React from "react";
export default function EventCard({ id, title, description, date }) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
      <Link to={`/events/${id}`} className="mt-4 inline-block text-blue-600 hover:underline">
        View details →
      </Link>
    </div>
  );
}
