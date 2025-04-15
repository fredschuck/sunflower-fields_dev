import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  // ChartBarIcon,
  CloudIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  // CogIcon,
  // CurrencyDollarIcon,
  DocumentIcon,
  // LocationMarkerIcon,
  SparklesIcon,
  RectangleGroupIcon,
  ViewColumnsIcon,
  // ArrowSmUpIcon,
  // ArrowSmDownIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [stats, setStats] = useState({
    totalFields: 0,
    activeCrops: 0,
    plannedActivities: 0,
    equipmentStatus: { active: 0, maintenance: 0, inactive: 0 },
  });

  // Dummy data for development - replace with actual API calls
  const farms = [
    {
      id: "farm1",
      name: "Green Valley Farm",
      location: "Springfield, IL",
      size: 150,
      fields: 8,
    },
    {
      id: "farm2",
      name: "Oakridge Fields",
      location: "Burlington, VT",
      size: 75,
      fields: 4,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        // In a real app, these would be API calls
        await loadWeatherData();
        await loadTasksData();
        await loadAlertsData();
        await loadStatsData();

        // Set default selected farm if user has farms
        if (farms.length > 0) {
          setSelectedFarm(farms[0].id);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Simulate fetching weather data
  const loadWeatherData = async () => {
    // This would be an API call in production
    setWeather({
      current: {
        temp: 72,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 8,
      },
      forecast: [
        { day: "Today", high: 75, low: 62, condition: "Partly Cloudy" },
        { day: "Tomorrow", high: 78, low: 64, condition: "Sunny" },
        { day: "Wednesday", high: 80, low: 66, condition: "Sunny" },
        { day: "Thursday", high: 76, low: 65, condition: "Scattered Showers" },
        { day: "Friday", high: 72, low: 60, condition: "Partly Cloudy" },
      ],
    });
  };

  // Simulate fetching tasks data
  const loadTasksData = async () => {
    setUpcomingTasks([
      {
        id: 1,
        title: "Plant corn in Field 3",
        dueDate: "2023-05-10",
        priority: "high",
        farm: "farm1",
        field: "field3",
      },
      {
        id: 2,
        title: "Fertilize wheat in Field 1",
        dueDate: "2023-05-12",
        priority: "medium",
        farm: "farm1",
        field: "field1",
      },
      {
        id: 3,
        title: "Equipment maintenance",
        dueDate: "2023-05-15",
        priority: "medium",
        farm: "farm1",
      },
      {
        id: 4,
        title: "Soil testing for Field 6",
        dueDate: "2023-05-18",
        priority: "low",
        farm: "farm1",
        field: "field6",
      },
    ]);
  };

  // Simulate fetching alerts data
  const loadAlertsData = async () => {
    setAlerts([
      {
        id: 1,
        type: "weather",
        message: "Frost warning for tomorrow morning",
        severity: "high",
        farm: "farm1",
      },
      {
        id: 2,
        type: "crop",
        message: "Corn in Field 2 showing signs of nutrient deficiency",
        severity: "medium",
        farm: "farm1",
        field: "field2",
      },
      {
        id: 3,
        type: "equipment",
        message: "Tractor #2 maintenance due in 3 days",
        severity: "low",
        farm: "farm1",
      },
    ]);
  };

  // Simulate fetching stats data
  const loadStatsData = async () => {
    setStats({
      totalFields: 12,
      activeCrops: 8,
      plannedActivities: 15,
      equipmentStatus: { active: 8, maintenance: 2, inactive: 1 },
      cropHealth: { good: 75, fair: 20, poor: 5 },
      soilMoisture: { optimal: 60, dry: 25, wet: 15 },
    });
  };

  // Priority color mapping
  const priorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Severity color mapping
  const severityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Farm selector handler
  const handleFarmChange = (e) => {
    setSelectedFarm(e.target.value);
    // In a real app, this would trigger reloading data for the selected farm
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Farm Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.displayName || "Farmer"}! Here's what's
            happening today.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <select
            value={selectedFarm}
            onChange={handleFarmChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Fields Stat */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ViewColumnsIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Fields
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stats.totalFields}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/fields"
                className="font-medium text-green-700 hover:text-green-900"
              >
                View all fields
              </Link>
            </div>
          </div>
        </div>

        {/* Active Crops Stat */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <SparklesIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Crops
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stats.activeCrops}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/crops"
                className="font-medium text-green-700 hover:text-green-900"
              >
                Manage crops
              </Link>
            </div>
          </div>
        </div>

        {/* Planned Activities */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Planned Activities
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stats.plannedActivities}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/calendar"
                className="font-medium text-green-700 hover:text-green-900"
              >
                View calendar
              </Link>
            </div>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RectangleGroupIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Equipment Status
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stats.equipmentStatus.active} active
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/equipment"
                className="font-medium text-green-700 hover:text-green-900"
              >
                View equipment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns on Desktop */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weather Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-green-700 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-white flex items-center">
                <CloudIcon className="h-5 w-5 mr-2" />
                Weather Forecast
                <span className="ml-2 text-sm text-green-200">
                  {farms.find((f) => f.id === selectedFarm)?.location ||
                    "Loading location..."}
                </span>
              </h3>
            </div>

            {weather ? (
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                    <div className="text-4xl font-bold">
                      {weather.current.temp}°F
                    </div>
                    <div className="text-gray-500">
                      {weather.current.condition}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Humidity: {weather.current.humidity}%</span>
                      <span className="ml-2">
                        Wind: {weather.current.windSpeed} mph
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow grid grid-cols-5 gap-2 text-center">
                    {weather.forecast.map((day, index) => (
                      <div key={index} className="bg-gray-50 rounded p-2">
                        <div className="text-xs font-medium">{day.day}</div>
                        <div className="text-sm font-semibold">{day.high}°</div>
                        <div className="text-xs text-gray-500">{day.low}°</div>
                        <div className="text-xs truncate">{day.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <Link
                    to="/dashboard/weather"
                    className="text-green-600 hover:text-green-900 font-medium"
                  >
                    View detailed forecast →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                Loading weather data...
              </div>
            )}
          </div>

          {/* Farm Overview */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Farm Overview
              </h3>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Crop Health */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-2">
                    Crop Health
                  </h4>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="flex h-full rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stats.cropHealth.good}%` }}
                        className="bg-green-500"
                      ></div>
                      <div
                        style={{ width: `${stats.cropHealth.fair}%` }}
                        className="bg-yellow-500"
                      ></div>
                      <div
                        style={{ width: `${stats.cropHealth.poor}%` }}
                        className="bg-red-500"
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
                      Good ({stats.cropHealth.good}%)
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mr-1"></div>
                      Fair ({stats.cropHealth.fair}%)
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-red-500 rounded-full mr-1"></div>
                      Poor ({stats.cropHealth.poor}%)
                    </div>
                  </div>
                </div>

                {/* Soil Moisture */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-2">
                    Soil Moisture
                  </h4>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="flex h-full rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stats.soilMoisture.dry}%` }}
                        className="bg-yellow-500"
                      ></div>
                      <div
                        style={{ width: `${stats.soilMoisture.optimal}%` }}
                        className="bg-blue-500"
                      ></div>
                      <div
                        style={{ width: `${stats.soilMoisture.wet}%` }}
                        className="bg-blue-700"
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mr-1"></div>
                      Dry ({stats.soilMoisture.dry}%)
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
                      Optimal ({stats.soilMoisture.optimal}%)
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-700 rounded-full mr-1"></div>
                      Wet ({stats.soilMoisture.wet}%)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <h4 className="text-base font-medium text-gray-900">
                    Field Status
                  </h4>
                  <Link
                    to="/dashboard/fields"
                    className="text-sm text-green-600 hover:text-green-900"
                  >
                    View all fields
                  </Link>
                </div>
                <div className="overflow-hidden bg-white rounded-md border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Field
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Crop
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stage
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Health
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          Field 1
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Corn
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Emerging
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Good
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          Field 2
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Wheat
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Mature
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Fair
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          Field 3
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Soybeans
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          Planted
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Good
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alerts Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-red-100 px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-red-800 flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                Alerts ({alerts.length})
              </h3>
            </div>

            <div className="px-4 py-5 sm:p-6 divide-y divide-gray-200">
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-md ${severityColor(
                        alert.severity
                      )} p-3`}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">
                            {alert.message}
                          </h3>
                          <div className="mt-2 text-sm">
                            <Link
                              to={`/dashboard/alerts/${alert.id}`}
                              className="font-medium underline"
                            >
                              View details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No alerts at this time.
                </p>
              )}

              <div className="pt-4 mt-4 text-sm text-right">
                <Link
                  to="/dashboard/alerts"
                  className="text-green-600 hover:text-green-900 font-medium"
                >
                  View all alerts →
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Upcoming Tasks
              </h3>
            </div>

            <div className="px-4 py-5 sm:p-6">
              {upcomingTasks.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {upcomingTasks.map((task) => (
                    <li key={task.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-2 w-2 rounded-full ${priorityColor(
                              task.priority
                            )}`}
                          ></div>
                          <p className="ml-3 text-sm font-medium text-gray-900">
                            {task.title}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="text-sm text-gray-500">
                            {task.dueDate}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No upcoming tasks.
                </p>
              )}

              <div className="mt-4 text-right">
                <Link
                  to="/dashboard/tasks"
                  className="text-sm font-medium text-green-600 hover:text-green-900"
                >
                  View all tasks →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              <Link
                to="/dashboard/fields/add"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ViewColumnsIcon className="-ml-1 mr-2 h-5 w-5" />
                Add Field
              </Link>

              <Link
                to="/dashboard/tasks/add"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CalendarIcon className="-ml-1 mr-2 h-5 w-5" />
                Schedule Task
              </Link>

              <Link
                to="/dashboard/crops/add"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
                Add Crop
              </Link>

              <Link
                to="/dashboard/reports"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <DocumentIcon className="-ml-1 mr-2 h-5 w-5" />
                Generate Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
