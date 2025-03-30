import React from "react";
import Merch1 from "../assets/merch1.jpeg";

const merchItems = [
  {
    name: "EMG Branded Hoodie",
    price: "KSh 2,500",
    image: Merch1,
  },
  {
    name: "EMG Snapback Hat",
    price: "KSh 1,500",
    image: Merch1,
  },
  {
    name: "Artist Custom T-Shirt",
    price: "KSh 2,000",
    image: Merch1,
  },
  {
    name: "Limited Edition Vinyl",
    price: "KSh 3,500",
    image: Merch1,
  },
];

// Merch Card Component
const MerchCard = ({ name, price, image }) => (
  <div className="bg-white shadow-md rounded-lg mt-16 pt-4 overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-4 text-center">
      <h4 className="text-lg font-semibold text-purple-700">{name}</h4>
      <p className="text-gray-600">{price}</p>
      <button className="mt-3 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-all">
        Place an Order
      </button>
    </div>
  </div>
);

const Merch = () => {
  return (
    <section className="py-16 px-8 mt-16 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-purple-700">
          Branding & Merchandise
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Get the latest EMG-branded gear and artist merchandise. Represent the
          culture with exclusive hoodies, hats, vinyls, and more.
        </p>
      </div>

      {/* Merch Display */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {merchItems.map((item, index) => (
          <MerchCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Merch;
