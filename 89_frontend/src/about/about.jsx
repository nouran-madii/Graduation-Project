import React from "react";
import {
  Users,
  Target,
  Zap,
  Heart,
  BookOpen,
  TrendingUp,
  Award,
  Lightbulb,
} from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: <Target className="w-12 h-12 text-[#514232] mb-4" />,
      title: "Career-Focused",
      description:
        "We understand the unique challenges fresh graduates face and provide targeted solutions to accelerate their career journey into the professional world.",
    },
    {
      icon: <Zap className="w-12 h-12 text-[#514232] mb-4" />,
      title: "Fast & Efficient",
      description:
        "Our streamlined platform connects graduates with opportunities quickly, reducing the time between graduation and meaningful employment.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#514232] mb-4" />,
      title: "Community-Driven",
      description:
        "Building a supportive ecosystem where graduates, mentors, and employers collaborate to create successful career transitions.",
    },
    {
      icon: <Heart className="w-12 h-12 text-[#514232] mb-4" />,
      title: "Student-Centric",
      description:
        "Every feature we build is designed with fresh graduates in mind, addressing their specific needs and career aspirations.",
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-[#514232]" />,
      title: "Skill Development",
      description:
        "Interactive courses and resources to bridge the gap between academic knowledge and industry requirements.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#514232]" />,
      title: "Market Insights",
      description:
        "Real-time data about job market trends, salary expectations, and in-demand skills across industries.",
    },
    {
      icon: <Award className="w-10 h-10 text-[#514232]" />,
      title: "Achievement Tracking",
      description:
        "Portfolio building tools to showcase projects, certifications, and academic accomplishments effectively.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#514232]" />,
      title: "Career Guidance",
      description:
        "AI-powered recommendations and career path suggestions based on individual profiles and market demands.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Graduates Helped" },
    { number: "500+", label: "Partner Companies" },
    { number: "85%", label: "Placement Rate" },
    { number: "30 Days", label: "Average Job Search" },
  ];

  return (
    <div
      className="min-h-screen bg-[#F1F1EF] text-[#514232]"
      style={{ fontFamily: "Museo, sans-serif" }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#514232]">
            About Job Hub
          </h1>
          <p className="text-xl md:text-2xl text-[#514232] opacity-80 max-w-3xl mx-auto leading-relaxed">
            Empowering fresh graduates to kickstart their careers with
            confidence and speed through innovative job matching technology.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#514232] mb-2">
                {stat.number}
              </div>
              <div className="text-[#514232] opacity-70 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#514232]">
              Our Story
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-[#514232]">
              <p>
                Job Hub was born from a simple observation: despite having
                excellent qualifications and skills, fresh graduates often
                struggle to find their first job opportunity. The traditional
                job search process can be overwhelming, time-consuming, and
                discouraging for new professionals entering the workforce.
              </p>
              <p>
                We recognized that graduates needed more than just another job
                board. They needed a comprehensive platform that understands
                their unique position, provides relevant opportunities, and
                offers the tools and guidance necessary to successfully
                transition from academic life to professional careers.
              </p>
              <p>
                Today, Job Hub serves as a bridge between talented graduates and
                forward-thinking employers, creating meaningful connections that
                benefit both sides. Our platform combines cutting-edge
                technology with human insight to deliver personalized job
                recommendations and career support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-[#B8B2A8] rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6 text-[#514232]">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-[#514232]">
                To eliminate the barriers between education and employment by
                providing fresh graduates with the tools, opportunities, and
                support they need to launch successful careers quickly and
                confidently.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <h3 className="text-3xl font-bold mb-6 text-[#514232]">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-[#514232]">
                To become the world's leading platform for graduate career
                placement, where every student can seamlessly transition from
                graduation to their dream job within their chosen field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#514232]">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[#F1F1EF] rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-[#514232]">
                  {value.title}
                </h3>
                <p className="text-[#514232] opacity-80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#514232]">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-[#B8B2A8] rounded-lg p-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#514232]">
                      {feature.title}
                    </h3>
                    <p className="text-[#514232] opacity-80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Job Hub */}
      <div className="bg-[#B8B2A8] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#514232]">
              Why Choose Job Hub?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-3xl font-bold text-[#514232]">
                  Smart Matching
                </div>
                <p className="text-[#514232] opacity-90">
                  AI-powered algorithms match your skills and interests with the
                  most relevant job opportunities.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-[#514232]">
                  Employer Network
                </div>
                <p className="text-[#514232] opacity-90">
                  Direct connections with companies actively seeking fresh
                  talent and entry-level professionals.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-[#514232]">
                  Career Support
                </div>
                <p className="text-[#514232] opacity-90">
                  Comprehensive resources including resume building, interview
                  prep, and career counseling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 max-w-3xl mx-auto shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#514232]">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl text-[#514232] opacity-80 mb-8 leading-relaxed">
              Join thousands of graduates who have successfully started their
              professional journey with Job Hub. Your dream job is just a few
              clicks away.
            </p>
            <button className="bg-[#514232] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
