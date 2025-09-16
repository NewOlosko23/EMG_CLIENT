import React, { useState } from "react";
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  Music, 
  TrendingUp,
  Heart,
  Star,
  Globe,
  Briefcase,
  GraduationCap,
  Calendar,
  ChevronRight,
  Quote,
  Play,
  Headphones,
  Mic,
  Piano,
  Guitar
} from "lucide-react";

const keyMembers = [
  {
    id: 1,
    name: "Justus Klein Owiti",
    title: "Founder & CEO",
    department: "Executive Leadership",
    bio: "Visionary leader with over 15 years in the music industry. Passionate about empowering artists and revolutionizing music distribution across Africa.",
    quote: "Our mission is to empower artists and bring their music to the world. Every artist deserves a platform to share their voice.",
    location: "Nairobi, Kenya",
    social: {
      linkedin: "justus-klein-owiti",
      twitter: "@justus_klein",
      email: "justus@emgmusic.com"
    },
    achievements: ["Music Industry Pioneer", "African Music Advocate", "Tech Innovation Leader"],
    specialties: ["Strategic Leadership", "Music Distribution", "Artist Development"],
    avatar: "JKO"
  },
  {
    id: 2,
    name: "Dick-Tillen Otieno",
    title: "Chief Operating Officer",
    department: "Operations",
    bio: "Operations expert with a deep understanding of the music industry's complex ecosystem. Ensures seamless execution of our strategic vision.",
    quote: "We ensure that every artist gets the best exposure on global platforms. Excellence in operations drives our success.",
    location: "Nairobi, Kenya",
    social: {
      linkedin: "dick-tillen-otieno",
      twitter: "@dick_tillen",
      email: "dick@emgmusic.com"
    },
    achievements: ["Operations Excellence", "Process Innovation", "Team Leadership"],
    specialties: ["Operations Management", "Strategic Planning", "Team Development"],
    avatar: "DTO"
  }
];

const teamMembers = [
  {
    id: 3,
    name: "Maeve Kennedy Damilola",
    position: "Head of Artist Relations & Customer Support",
    department: "Artist Relations",
    bio: "Dedicated to building strong relationships with our artists and ensuring exceptional customer experience.",
    location: "Lagos, Nigeria",
    social: {
      linkedin: "maeve-kennedy",
      email: "maeve@emgmusic.com"
    },
    specialties: ["Artist Relations", "Customer Success", "Community Building"],
    avatar: "MKD"
  },
  {
    id: 4,
    name: "Loreto Yasmin",
    position: "Chief Marketing Officer (CMO)",
    department: "Marketing",
    bio: "Creative marketing strategist driving brand awareness and artist promotion across digital platforms.",
    location: "Cape Town, South Africa",
    social: {
      linkedin: "loreto-yasmin",
      twitter: "@loreto_yasmin",
      email: "loreto@emgmusic.com"
    },
    specialties: ["Digital Marketing", "Brand Strategy", "Artist Promotion"],
    avatar: "LY"
  },
  {
    id: 5,
    name: "Edmond Dombi",
    position: "Chief Financial Officer & Distribution Manager",
    department: "Finance & Distribution",
    bio: "Financial expert ensuring sustainable growth while managing complex distribution networks across multiple platforms.",
    location: "Accra, Ghana",
    social: {
      linkedin: "edmond-dombi",
      email: "edmond@emgmusic.com"
    },
    specialties: ["Financial Management", "Distribution Strategy", "Revenue Optimization"],
    avatar: "ED"
  },
  {
    id: 6,
    name: "David Mukura",
    position: "CEO, EMG Adventist",
    department: "Specialized Services",
    bio: "Leading our specialized division focused on gospel and inspirational music distribution.",
    location: "Kigali, Rwanda",
    social: {
      linkedin: "david-mukura",
      email: "david@emgmusic.com"
    },
    specialties: ["Gospel Music", "Inspirational Content", "Community Outreach"],
    avatar: "DM"
  },
  {
    id: 7,
    name: "Aisha Kamau",
    position: "Head of A&R (Artists & Repertoire)",
    department: "Artist Development",
    bio: "Talent scout and artist development specialist with an ear for discovering the next generation of African music stars.",
    location: "Nairobi, Kenya",
    social: {
      linkedin: "aisha-kamau",
      email: "aisha@emgmusic.com"
    },
    specialties: ["Talent Discovery", "Artist Development", "Music Production"],
    avatar: "AK"
  },
  {
    id: 8,
    name: "Ryan Mwesigwa",
    position: "Chief Strategy Officer (CSO)",
    department: "Strategy",
    bio: "Strategic thinker driving long-term growth and market expansion across the African music landscape.",
    location: "Kampala, Uganda",
    social: {
      linkedin: "ryan-mwesigwa",
      email: "ryan@emgmusic.com"
    },
    specialties: ["Strategic Planning", "Market Analysis", "Business Development"],
    avatar: "RM"
  },
  {
    id: 9,
    name: "Sophia Njoroge",
    position: "Director of Communications & PR",
    department: "Communications",
    bio: "Communication expert building strong relationships with media, partners, and stakeholders across the industry.",
    location: "Nairobi, Kenya",
    social: {
      linkedin: "sophia-njoroge",
      email: "sophia@emgmusic.com"
    },
    specialties: ["Public Relations", "Media Relations", "Brand Communication"],
    avatar: "SN"
  },
  {
    id: 10,
    name: "Kevin Otieno",
    position: "Legal & Compliance Director",
    department: "Legal",
    bio: "Legal expert ensuring compliance with international music industry regulations and protecting our artists' rights.",
    location: "Nairobi, Kenya",
    social: {
      linkedin: "kevin-otieno",
      email: "kevin@emgmusic.com"
    },
    specialties: ["Music Law", "Intellectual Property", "Compliance"],
    avatar: "KO"
  }
];

const departments = [
  { name: "Executive Leadership", icon: Award, color: "purple", count: 2 },
  { name: "Artist Relations", icon: Heart, color: "pink", count: 1 },
  { name: "Marketing", icon: TrendingUp, color: "blue", count: 1 },
  { name: "Finance & Distribution", icon: Briefcase, color: "green", count: 1 },
  { name: "Artist Development", icon: Music, color: "orange", count: 1 },
  { name: "Strategy", icon: Star, color: "yellow", count: 1 },
  { name: "Communications", icon: Globe, color: "indigo", count: 1 },
  { name: "Legal", icon: GraduationCap, color: "red", count: 1 }
];

const stats = [
  { label: "Team Members", value: "10+", icon: Users },
  { label: "Countries", value: "6", icon: MapPin },
  { label: "Years Combined Experience", value: "120+", icon: Calendar },
  { label: "Departments", value: "8", icon: Briefcase }
];

// Executive Team Card Component
const ExecutiveCard = ({ member }) => (
  <div className="group bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 hover:-translate-y-3 w-full">
    <div className="relative p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-center space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-8 w-full">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl lg:rounded-3xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-500">
            {member.avatar}
          </div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-1 sm:p-2 shadow-lg">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{member.name}</h3>
            <p className="text-base sm:text-lg lg:text-xl text-purple-600 font-semibold mb-1">{member.title}</p>
            <p className="text-sm sm:text-base text-gray-600">{member.department}</p>
          </div>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{member.bio}</p>

          {/* Quote */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl lg:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <Quote className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600 mb-2 sm:mb-3" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 italic leading-relaxed">"{member.quote}"</p>
          </div>

          {/* Specialties */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Specialties</h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {member.specialties.map((specialty, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
            <a href={`https://linkedin.com/in/${member.social.linkedin}`} className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg lg:rounded-xl transition-colors duration-300">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href={`https://twitter.com/${member.social.twitter}`} className="bg-blue-400 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg lg:rounded-xl transition-colors duration-300">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href={`mailto:${member.social.email}`} className="bg-gray-600 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-lg lg:rounded-xl transition-colors duration-300">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Team Member Card Component
const TeamMemberCard = ({ member }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
    <div className="text-center">
      {/* Avatar */}
      <div className="relative mb-3 sm:mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white text-sm sm:text-lg font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
          {member.avatar}
        </div>
      </div>

      {/* Info */}
      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
      <p className="text-purple-600 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">{member.position}</p>
      <p className="text-gray-600 text-xs mb-2 sm:mb-3">{member.department}</p>
      
      {/* Location */}
      <div className="bg-gray-50 rounded-lg lg:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <MapPin className="w-3 h-3 mr-1" />
          {member.location}
        </p>
      </div>

      {/* Specialties */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap gap-1 justify-center">
          {member.specialties.slice(0, 2).map((specialty, index) => (
            <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center space-x-2">
        {member.social.linkedin && (
          <a href={`https://linkedin.com/in/${member.social.linkedin}`} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-300">
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.social.twitter && (
          <a href={`https://twitter.com/${member.social.twitter}`} className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors duration-300">
            <Twitter className="w-4 h-4" />
          </a>
        )}
        <a href={`mailto:${member.social.email}`} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-300">
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

// Department Card Component
const DepartmentCard = ({ department }) => {
  const IconComponent = department.icon;
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="text-center">
        <div className={`w-16 h-16 bg-${department.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-8 h-8 text-${department.color}-600`} />
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{department.name}</h4>
        <p className="text-gray-600 text-sm mb-3">{department.count} member{department.count !== 1 ? 's' : ''}</p>
        <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center justify-center mx-auto">
          View Team <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

const Team = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredMembers = selectedDepartment === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Meet Our Team
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              The creative minds and strategic leaders behind EMG Music. 
              We're passionate about empowering artists and revolutionizing music distribution across Africa.
            </p>
            
            {/* Musical Icons */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 lg:space-x-6 mb-6 sm:mb-8">
              <div className="bg-purple-100 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              <div className="bg-pink-100 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-pink-600" />
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <div className="bg-orange-100 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                <Piano className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-600" />
              </div>
              <div className="bg-green-100 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                <Guitar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-4 lg:p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="bg-purple-100 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
                  </div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 mt-6 sm:mt-8 lg:mt-10 w-full">
        {/* Executive Leadership */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Executive Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              Our visionary leaders driving innovation and growth in the music industry
            </p>
          </div>
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full">
            {keyMembers.map((member) => (
              <ExecutiveCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Departments */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Departments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              Specialized teams working together to deliver exceptional results
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full">
            {departments.map((department, index) => (
              <DepartmentCard key={index} department={department} />
            ))}
          </div>
        </section>

        {/* Team Members */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Team</h2>
              <p className="text-gray-600">
                Meet the talented professionals making music distribution seamless
              </p>
            </div>
            
            {/* Department Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Filter by department:</span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-white/80 border border-gray-200 rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
              >
                <option value="All">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>

        {/* Join Our Team CTA */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Join Our Team</h2>
            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed">
              Are you passionate about music and technology? We're always looking for talented individuals 
              to join our mission of empowering artists across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Send Your Resume
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;