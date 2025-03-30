import React from "react";

const keyMembers = [
  {
    name: "Justus Klein Owiti",
    title: "Founder & CEO",
    quote:
      "Our mission is to empower artists and bring their music to the world.",
  },
  {
    name: "Dick-Tillen Otieno",
    title: "Chief Operating Officer",
    quote:
      "We ensure that every artist gets the best exposure on global platforms.",
  },
];

const otherOfficials = [
  {
    name: "Maeve Kennedy Damilola",
    position: "Head of Artist Relations, Customer Support",
  },
  { name: "Loreto Yasmin", position: "Chief Marketing Officer (CMO)" },
  {
    name: "Edmond Dombi",
    position: "Chief Financial Officer (CFO), Distribution Manager",
  },
  { name: "David Mukura", position: "CEO, EMG Adventist" },
  { name: "Aisha Kamau", position: "Head of A&R (Artists & Repertoire)" },
  { name: "Ryan Mwesigwa", position: "Chief Strategy Officer (CSO)" },
  { name: "Sophia Njoroge", position: "Director of Communications & PR" },
  { name: "Kevin Otieno", position: "Legal & Compliance Director" },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Team = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section className="py-12 px-6 mt-18 pt-10 bg-gray-100 transition-all relative">
      {/* Header Section */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-5xl font-extrabold text-purple-800 dark:text-purple-400">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-800 dark:text-gray-700 mt-2">
          The creative minds behind our success.
        </p>
      </div>

      {/* Key Team Members Section */}
      <div className="max-w-5xl mx-auto space-y-10">
        {keyMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col cursor-pointer md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } gap-6 p-8 rounded-lg shadow-lg bg-white transition-all hover:scale-105`}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-purple-500 text-white text-3xl font-bold border-4 border-purple-700 shadow-lg">
              {getInitials(member.name)}
            </div>
            <aside className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="text-md text-purple-800">{member.title}</p>
              <p className="mt-4 text-sm italic text-gray-900">
                "{member.quote}"
              </p>
            </aside>
          </div>
        ))}
      </div>

      {/* Other Officials Section */}
      <h3 className="text-3xl font-bold text-center mt-16 mb-8 text-purple-600 dark:text-purple-400">
        More Members
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {otherOfficials.map((official, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer items-center p-6 rounded-lg shadow-md bg-gray-50 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-purple-500 text-white text-lg font-bold shadow-md">
              {getInitials(official.name)}
            </div>
            <p className="mt-3 font-semibold text-lg text-gray-900">
              {official.name}
            </p>
            <p className="text-sm text-purple-500 text-center">
              {official.position}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
