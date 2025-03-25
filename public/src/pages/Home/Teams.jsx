import React from "react";

const keyMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    quote:
      "Our mission is to empower artists and bring their music to the world.",
  },
  {
    name: "Jane Smith",
    title: "Head of Distribution",
    quote:
      "We ensure that every artist gets the best exposure on global platforms.",
  },
];

const otherOfficials = [
  { name: "Michael Lee", position: "Marketing Manager", country: "USA" },
  { name: "Emily Wang", position: "Artist Relations", country: "UK" },
  { name: "Carlos Ruiz", position: "Tech Lead", country: "Spain" },
  { name: "Aisha Mohamed", position: "A&R Specialist", country: "Kenya" },
];

// Function to generate avatar with initials
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Teams = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section
      className={`py-12 px-6 transition-all ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-600 text-center">
        Meet Our Team
      </h2>

      {/* Key Team Members */}
      <div className="max-w-5xl mx-auto space-y-8">
        {keyMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } gap-6 p-6 rounded-lg shadow-lg transition-all ${
              isDark ? " text-gray-300" : " text-gray-900"
            }`}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-purple-500 text-white text-3xl font-bold border-4 border-purple-700">
              {getInitials(member.name)}
            </div>
            <aside className="text-center md:text-left">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-purple-500">{member.title}</p>
              <p className="mt-3 text-sm italic">"{member.quote}"</p>
            </aside>
          </div>
        ))}
      </div>

      {/* Other Officials */}
      <h3 className="text-2xl font-bold text-center mt-12 mb-6 text-purple-600">
        More Members
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {otherOfficials.map((official, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg shadow-md transition-all ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
            } hover:shadow-lg`}
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-500 text-white text-lg font-bold">
              {getInitials(official.name)}
            </div>
            <p className="mt-3 font-semibold">{official.name}</p>
            <p className="text-sm text-purple-500">{official.position}</p>
            <p className="text-xs text-gray-500">{official.country}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teams;
