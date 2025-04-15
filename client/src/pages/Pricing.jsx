import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/common/Icon";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("annually"); // annually or monthly

  // Toggle between monthly and annual billing
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "annually" ? "monthly" : "annually");
  };

  // Calculate savings based on billing cycle
  const calculatePrice = (monthlyPrice) => {
    return billingCycle === "annually"
      ? Math.floor(monthlyPrice * 10)
      : monthlyPrice;
  };

  const plans = [
    {
      name: "Seed",
      description: "Perfect for small farms and hobbyists",
      monthlyPrice: 9,
      features: [
        "Up to 3 fields",
        "Basic crop tracking",
        "Weather forecasts",
        "Task management",
        "Mobile access",
      ],
      iconName: "plant",
      recommended: false,
      ctaText: "Start with Seed",
    },
    {
      name: "Grow",
      description: "For established farms ready to scale",
      monthlyPrice: 29,
      features: [
        "Up to 15 fields",
        "Advanced crop planning",
        "Detailed weather analytics",
        "Equipment tracking",
        "Harvest forecasting",
        "Team collaboration",
        "Basic reporting",
      ],
      iconName: "tree",
      recommended: true,
      ctaText: "Grow your farm",
    },
    {
      name: "Harvest",
      description: "For commercial operations with complex needs",
      monthlyPrice: 79,
      features: [
        "Unlimited fields",
        "Full financial tracking",
        "Market integration",
        "Soil analysis tools",
        "Advanced reporting",
        "Inventory management",
        "Equipment maintenance logs",
        "API access",
        "Priority support",
      ],
      iconName: "wheat",
      recommended: false,
      ctaText: "Unlock full potential",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Choose the perfect plan for your farming operation
        </p>

        {/* Billing toggle */}
        <div className="relative mt-12 flex justify-center">
          <div className="flex items-center">
            <span
              className={`mr-3 text-sm ${
                billingCycle === "monthly"
                  ? "font-semibold text-green-900"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                billingCycle === "annually" ? "bg-green-600" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={billingCycle === "annually"}
            >
              <span className="sr-only">Toggle billing cycle</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingCycle === "annually"
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-sm ${
                billingCycle === "annually"
                  ? "font-semibold text-green-900"
                  : "text-gray-500"
              }`}
            >
              Annually <span className="hidden sm:inline">(Save 17%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Pricing plans */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.recommended
                  ? "border-green-600 shadow-xl"
                  : "border-gray-200 shadow"
              } bg-white p-8 flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm font-semibold py-1 px-4 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-full ${
                    plan.recommended ? "bg-green-100" : "bg-gray-100"
                  } mr-3`}
                >
                  <Icon
                    name={plan.iconName}
                    className={`h-6 w-6 ${
                      plan.recommended ? "text-green-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
              </div>

              <p className="text-gray-500 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${calculatePrice(plan.monthlyPrice)}
                </span>
                <span className="text-gray-500">
                  /{billingCycle === "annually" ? "year" : "month"}
                </span>
              </div>

              <ul className="mb-8 space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Icon
                      name="check"
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`w-full text-center py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  plan.recommended
                    ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                    : "bg-white text-green-700 border border-green-600 hover:bg-green-50 focus:ring-green-500"
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently asked questions
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="question" className="h-5 w-5 text-green-600 mr-2" />
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time.
                Prorated credits will be applied to your account when changing
                plans.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="question" className="h-5 w-5 text-green-600 mr-2" />
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                All plans come with a 14-day free trial so you can test out Farm
                Manager risk-free before committing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="question" className="h-5 w-5 text-green-600 mr-2" />
                What payment methods are accepted?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, including Visa, Mastercard,
                and American Express. We can also set up invoicing for annual
                plans.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="question" className="h-5 w-5 text-green-600 mr-2" />
                How secure is my farm data?
              </h3>
              <p className="text-gray-600">
                Your data is encrypted both in transit and at rest. We use
                industry-standard security measures and regular backups to keep
                your information safe.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="mailto:support@farmmanager.com"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              <Icon name="notes" className="h-5 w-5 mr-2" />
              Contact our support team
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-green-200">
                  Start managing your farm more efficiently today with Farm
                  Manager. Sign up for your 14-day free trial - no credit card
                  required.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link
                    to="/signup"
                    className="bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-green-700 hover:bg-green-50"
                  >
                    Sign up for free
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-green-800 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-900"
                  >
                    View demo
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-56 sm:h-72 md:absolute md:right-0 md:top-0 md:h-full md:w-1/3 lg:w-1/2">
              <div className="hidden md:block absolute inset-0 transform -rotate-6 translate-x-1/4 -translate-y-1/4 opacity-20">
                <Icon name="field" className="h-full w-full text-white" />
              </div>
              <div className="hidden md:block absolute inset-x-0 bottom-0 right-0 transform translate-x-1/3 translate-y-1/4 opacity-10">
                <Icon name="tractor" className="h-full w-full text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
