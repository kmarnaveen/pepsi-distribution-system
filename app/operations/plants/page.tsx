"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  Activity,
  Search,
  Filter,
} from "lucide-react";
import plantsData from "../../../lib/plants-data.json";

export default function PlantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("All");

  const filteredPlants = plantsData.plants.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCapacity =
      selectedCapacity === "All" || plant.capacity === selectedCapacity;
    return matchesSearch && matchesCapacity;
  });

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/operations"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              Plant Network
            </h1>
            <p className="text-sm text-gray-600">
              {plantsData.region} Region • {plantsData.totalPlants} Plants
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
            >
              <option value="All">All Capacities</option>
              <option value="High">High Capacity</option>
              <option value="Medium">Medium Capacity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plants List */}
      <main className="px-4 py-4">
        <div className="space-y-3">
          {filteredPlants.map((plant) => (
            <div key={plant.code} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pepsi-blue/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-pepsi-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{plant.name}</h3>
                    <p className="text-sm text-gray-600">Code: {plant.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getCapacityColor(
                      plant.capacity
                    )}`}
                  >
                    {plant.capacity}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {plant.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{plant.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {plant.distributionRadius}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-600">Operational</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Lat: {plant.coordinates.lat}, Lng: {plant.coordinates.lng}
                    </span>
                  </div>
                  <button className="text-sm text-pepsi-blue hover:text-pepsi-blue/80 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No plants found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>

      {/* Region Stats */}
      <div className="px-4 py-4 bg-white border-t border-gray-200 mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Region Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">High Capacity Plants</p>
            <p className="font-semibold text-gray-900">
              {plantsData.regionStats.highCapacityPlants}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Medium Capacity Plants</p>
            <p className="font-semibold text-gray-900">
              {plantsData.regionStats.mediumCapacityPlants}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Coverage</p>
            <p className="font-semibold text-gray-900">
              {plantsData.regionStats.totalCoverage}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Avg. Distribution</p>
            <p className="font-semibold text-gray-900">
              {plantsData.regionStats.avgDistributionRadius}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
