import React from "react";
import {
  getAvailableInsuranceTypes,
  isInsuranceTypeAvailable,
  getEnvironment,
  isDevelopmentMode,
  isProductionMode,
} from "../../utils/featureFlags";
import { TbCheck, TbX, TbInfoCircle } from "react-icons/tb";

const FeatureFlagDemo = () => {
  const environment = getEnvironment();
  const availableTypes = getAvailableInsuranceTypes();
  const isDev = isDevelopmentMode();
  const isProd = isProductionMode();

  const insuranceTypes = [
    { id: "health", name: "Health Insurance" },
    { id: "personal-accident", name: "Personal Accident" },
    { id: "property", name: "Business/SMEs Cover" },
    { id: "motor", name: "Motor Insurance" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Feature Flags Demo
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <TbInfoCircle className="h-4 w-4 mr-1 text-blue-500" />
            <span>
              Environment: <strong>{environment}</strong>
            </span>
          </div>
          <div
            className={`px-2 py-1 rounded ${
              isDev ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isDev ? "Development Mode" : "Production Mode"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Insurance Types Availability
          </h3>
          <div className="space-y-3">
            {insuranceTypes.map((type) => {
              const isAvailable = isInsuranceTypeAvailable(type.id);
              return (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="font-medium">{type.name}</span>
                  <div className="flex items-center">
                    {isAvailable ? (
                      <>
                        <TbCheck className="h-5 w-5 text-green-600 mr-1" />
                        <span className="text-green-600 text-sm">
                          Available
                        </span>
                      </>
                    ) : (
                      <>
                        <TbX className="h-5 w-5 text-red-600 mr-1" />
                        <span className="text-red-600 text-sm">Disabled</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Environment Configuration
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-600">
              {JSON.stringify(
                {
                  environment,
                  isDevelopment: isDev,
                  isProduction: isProd,
                  availableInsuranceTypes: availableTypes,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">How to Test:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • Run <code className="bg-blue-100 px-1 rounded">npm start</code>{" "}
            for development mode
          </li>
          <li>
            • Run{" "}
            <code className="bg-blue-100 px-1 rounded">
              NODE_ENV=production npm start
            </code>{" "}
            for production mode
          </li>
          <li>
            • Check the Buy Online and Compare Plans pages to see the
            differences
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureFlagDemo;
