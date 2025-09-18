// Presence data extracted from the landing page
export const PRESENCE_COUNTRIES = [
  { 
    name: "Kenya", 
    flag: "🇰🇪", 
    code: "KE",
    artists: "2,500+", 
    streams: "50M+",
    established: "2019",
    currency: "KES"
  },
  { 
    name: "Uganda", 
    flag: "🇺🇬", 
    code: "UG",
    artists: "1,800+", 
    streams: "35M+",
    established: "2020",
    currency: "UGX"
  },
  { 
    name: "Tanzania", 
    flag: "🇹🇿", 
    code: "TZ",
    artists: "2,200+", 
    streams: "42M+",
    established: "2019",
    currency: "TZS"
  },
  { 
    name: "Rwanda", 
    flag: "🇷🇼", 
    code: "RW",
    artists: "1,200+", 
    streams: "25M+",
    established: "2021",
    currency: "RWF"
  },
  { 
    name: "Burundi", 
    flag: "🇧🇮", 
    code: "BI",
    artists: "800+", 
    streams: "15M+",
    established: "2021",
    currency: "BIF"
  },
  { 
    name: "Zambia", 
    flag: "🇿🇲", 
    code: "ZM",
    artists: "1,500+", 
    streams: "30M+",
    established: "2020",
    currency: "ZMW"
  },
  { 
    name: "Sierra Leone", 
    flag: "🇸🇱", 
    code: "SL",
    artists: "900+", 
    streams: "18M+",
    established: "2022",
    currency: "SLL"
  },
  { 
    name: "Eswatini", 
    flag: "🇸🇿", 
    code: "SZ",
    artists: "600+", 
    streams: "12M+",
    established: "2022",
    currency: "SZL"
  }
];

// Currency information for presence countries
export const PRESENCE_CURRENCIES = [
  { value: "USD", label: "US Dollar ($)", symbol: "$", country: "United States" },
  { value: "KES", label: "Kenyan Shilling (KSh)", symbol: "KSh", country: "Kenya" },
  { value: "UGX", label: "Ugandan Shilling (USh)", symbol: "USh", country: "Uganda" },
  { value: "TZS", label: "Tanzanian Shilling (TSh)", symbol: "TSh", country: "Tanzania" },
  { value: "RWF", label: "Rwandan Franc (RF)", symbol: "RF", country: "Rwanda" },
  { value: "BIF", label: "Burundian Franc (FBu)", symbol: "FBu", country: "Burundi" },
  { value: "ZMW", label: "Zambian Kwacha (ZK)", symbol: "ZK", country: "Zambia" },
  { value: "SLL", label: "Sierra Leonean Leone (Le)", symbol: "Le", country: "Sierra Leone" },
  { value: "SZL", label: "Swazi Lilangeni (E)", symbol: "E", country: "Eswatini" }
];

// Helper function to get country by name
export const getCountryByName = (countryName) => {
  return PRESENCE_COUNTRIES.find(country => 
    country.name.toLowerCase() === countryName.toLowerCase()
  );
};

// Helper function to get currency by country
export const getCurrencyByCountry = (countryName) => {
  const country = getCountryByName(countryName);
  return country ? country.currency : null;
};

// Helper function to get all country names for dropdowns
export const getCountryNames = () => {
  return PRESENCE_COUNTRIES.map(country => country.name);
};

// Helper function to get all country options for forms
export const getCountryOptions = () => {
  return PRESENCE_COUNTRIES.map(country => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
    code: country.code
  }));
};
