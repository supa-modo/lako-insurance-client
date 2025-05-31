import React from "react";
import { motion } from "framer-motion";
import {
  getAvailableInsuranceTypes,
  isInsuranceTypeAvailable,
  getEnvironment,
  isDevelopmentMode,
  isProductionMode,
} from "../../utils/featureFlags";
import {
  TbCheck,
  TbX,
  TbInfoCircle,
  TbSettings,
  TbCode,
  TbShieldCheck,
} from "react-icons/tb";

const FeatureFlagDemo = () => {
  const environment = getEnvironment();
  const availableTypes = getAvailableInsuranceTypes();
  const isDev = isDevelopmentMode();
  const isProd = isProductionMode();

  const insuranceTypes = [
    { id: "health", name: "Health Insurance", icon: "🏥" },
    { id: "personal-accident", name: "Personal Accident", icon: "🚑" },
    { id: "property", name: "Business/SMEs Cover", icon: "🏢" },
    { id: "motor", name: "Motor Insurance", icon: "🚗" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full mb-6 shadow-lg">
            <TbSettings className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Feature Flags <span className="text-primary-600">Demo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time visualization of environment-based feature toggles and
            insurance type availability
          </p>
        </motion.div>

        {/* Environment Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <TbCode className="h-8 w-8 mr-3 text-primary-600" />
              Environment Status
            </h2>
            <div
              className={`px-6 py-3 rounded-full font-semibold text-lg ${
                isDev
                  ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-2 border-green-200"
                  : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-2 border-red-200"
              }`}
            >
              {isDev ? "🟢 Development Mode" : "🔴 Production Mode"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <TbInfoCircle className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-800 mb-2">Environment</h3>
              <p className="text-2xl font-bold text-blue-600">{environment}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <TbShieldCheck className="h-12 w-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-800 mb-2">Dev Mode</h3>
              <p className="text-2xl font-bold text-purple-600">
                {isDev ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <TbSettings className="h-12 w-12 mx-auto mb-3 text-orange-600" />
              <h3 className="font-semibold text-gray-800 mb-2">Prod Mode</h3>
              <p className="text-2xl font-bold text-orange-600">
                {isProd ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insurance Types Availability */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Insurance Types Availability
            </h3>
            <div className="space-y-4">
              {insuranceTypes.map((type, index) => {
                const isAvailable = isInsuranceTypeAvailable(type.id);
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
                      isAvailable
                        ? "border-green-200 bg-gradient-to-r from-green-50 to-green-25"
                        : "border-red-200 bg-gradient-to-r from-red-50 to-red-25"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{type.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {type.name}
                          </h4>
                          <p className="text-sm text-gray-600">ID: {type.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isAvailable ? (
                          <>
                            <TbCheck className="h-6 w-6 text-green-600" />
                            <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
                              Available
                            </span>
                          </>
                        ) : (
                          <>
                            <TbX className="h-6 w-6 text-red-600" />
                            <span className="font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm">
                              Disabled
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Environment Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Environment Configuration
            </h3>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="mb-2 text-gray-400">// Current Configuration</div>
              <pre className="whitespace-pre-wrap">
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
          </motion.div>
        </div>

        {/* How to Test Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-8"
        >
          <h4 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
            <TbCode className="h-8 w-8 mr-3" />
            How to Test
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">
                Development Mode
              </h5>
              <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm block mb-2">
                npm start
              </code>
              <p className="text-sm text-gray-600">
                Run in development mode to see all available features
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">
                Production Mode
              </h5>
              <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm block mb-2">
                NODE_ENV=production npm start
              </code>
              <p className="text-sm text-gray-600">
                Test production environment locally
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Check Pages</h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Buy Online Page</p>
                <p>• Compare Plans Page</p>
                <p>• Feature differences</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    );
  };

export default FeatureFlagDemo;
