import React, { useState } from "react";
import { HelpCircle, Search, MessageCircle, Mail, Phone, Book, Video, FileText, ChevronDown, ChevronRight } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: "all", name: "All Topics", icon: Book },
    { id: "getting-started", name: "Getting Started", icon: HelpCircle },
    { id: "uploading", name: "Uploading Music", icon: FileText },
    { id: "analytics", name: "Analytics", icon: Book },
    { id: "earnings", name: "Earnings", icon: Book },
    { id: "promotion", name: "Promotion", icon: Book },
    { id: "technical", name: "Technical Issues", icon: Book }
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with EMG Music?",
      answer: "Getting started is easy! First, create your artist account, then upload your first track. Make sure to fill out your profile completely and add high-quality cover art. Once your track is approved, it will be distributed to all major streaming platforms."
    },
    {
      id: 2,
      category: "uploading",
      question: "What file formats are supported for music uploads?",
      answer: "We support WAV, FLAC, and high-quality MP3 files. For best results, we recommend uploading WAV files at 44.1kHz/16-bit or higher. Make sure your files are properly mastered and free from any copyright issues."
    },
    {
      id: 3,
      category: "uploading",
      question: "How long does it take for my music to go live?",
      answer: "Most tracks are reviewed and go live within 24-48 hours. During peak times, it may take up to 72 hours. You'll receive an email notification once your track is live on all platforms."
    },
    {
      id: 4,
      category: "analytics",
      question: "How often are analytics updated?",
      answer: "Analytics are updated daily, with streaming data typically appearing within 24-48 hours of plays. Some platforms may take longer to report data, so don't worry if you don't see immediate results."
    },
    {
      id: 5,
      category: "earnings",
      question: "When will I receive my earnings?",
      answer: "Earnings are calculated monthly and paid out 30-45 days after the end of each month. For example, January earnings will be paid in early March. You can track your earnings in real-time in the Earnings section."
    },
    {
      id: 6,
      category: "earnings",
      question: "What's the minimum payout threshold?",
      answer: "The minimum payout threshold is $25. You can change this in your payment settings. Once you reach the threshold, payments are automatically processed to your chosen payment method."
    },
    {
      id: 7,
      category: "promotion",
      question: "How can I promote my music?",
      answer: "EMG offers various promotion tools including playlist placement, social media ads, and influencer collaborations. You can also use our built-in promotion features to share your music across social platforms."
    },
    {
      id: 8,
      category: "technical",
      question: "My upload failed. What should I do?",
      answer: "First, check that your file meets our requirements (format, size, quality). If the issue persists, try uploading from a different browser or clearing your cache. Contact support if the problem continues."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "Mon-Fri, 9AM-6PM EST"
    }
  ];

  const quickLinks = [
    { title: "Upload Guidelines", description: "Learn about file requirements and best practices" },
    { title: "Analytics Guide", description: "Understand your music performance data" },
    { title: "Promotion Tips", description: "Maximize your music's reach" },
    { title: "Payment FAQ", description: "Everything about earnings and payouts" },
    { title: "Copyright Info", description: "Protect your intellectual property" },
    { title: "Community Guidelines", description: "Our platform rules and policies" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Find answers to your questions and get the support you need</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, FAQs, and guides..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
              <method.icon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
            <p className="text-gray-600 mb-4">{method.description}</p>
            <p className="text-sm text-gray-500 mb-4">{method.available}</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              {method.action}
            </button>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <category.icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-gray-900 text-center">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{link.title}</h4>
              <p className="text-sm text-gray-600">{link.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No FAQs found matching your search.</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>

      {/* Video Tutorials */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Tutorials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Getting Started", duration: "5:30", thumbnail: "🎵" },
            { title: "Uploading Your First Track", duration: "8:15", thumbnail: "📤" },
            { title: "Understanding Analytics", duration: "6:45", thumbnail: "📊" },
            { title: "Promotion Strategies", duration: "10:20", thumbnail: "🚀" },
            { title: "Earnings & Payouts", duration: "7:10", thumbnail: "💰" },
            { title: "Profile Optimization", duration: "4:55", thumbnail: "👤" }
          ].map((video, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                {video.thumbnail}
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{video.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{video.duration}</p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  <Video className="h-4 w-4" />
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6 text-center">
        <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still Need Help?</h3>
        <p className="text-gray-600 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Contact Support
          </button>
          <button className="bg-white text-purple-600 border border-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
