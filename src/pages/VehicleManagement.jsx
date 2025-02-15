import React, { useState } from 'react';
import { Car, Calendar, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

const mockVehicles = [
  {
    id: '1',
    registrationNumber: 'DL 01 AB 1234',
    model: 'Toyota Innova',
    type: 'SUV',
    status: 'active',
    documents: {
      registration: { status: 'valid', expiryDate: '2025-12-31' },
      insurance: { status: 'valid', expiryDate: '2024-06-30' },
      permit: { status: 'valid', expiryDate: '2024-12-31' }
    },
    assignedDriver: 'John Doe'
  }
];

export function VehicleManagement() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicle Management</h1>
        <Button className="flex items-center">
          <Car className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Vehicle List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Registered Vehicles</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Details
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Driver
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle.registrationNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.model} - {vehicle.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : vehicle.status === 'maintenance'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {Object.values(vehicle.documents).map((doc, index) => (
                          doc.status === 'valid' ? (
                            <CheckCircle key={index} className="w-5 h-5 text-green-500" />
                          ) : doc.status === 'pending' ? (
                            <AlertCircle key={index} className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <AlertCircle key={index} className="w-5 h-5 text-red-500" />
                          )
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.assignedDriver || 'Not Assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vehicle Details Panel */}
      {selectedVehicle && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Vehicle Details - {selectedVehicle.registrationNumber}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Document Status */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Document Status
                </h3>
                {Object.entries(selectedVehicle.documents).map(([key, doc]) => (
                  <div key={key} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {key}
                      </p>
                      <p className="text-xs text-gray-500">
                        Expires: {doc.expiryDate}
                      </p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === 'valid'
                        ? 'bg-green-100 text-green-800'
                        : doc.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Maintenance History */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Maintenance History
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Last Service: <span className="font-medium">2024-02-15</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Next Service Due: <span className="font-medium">2024-05-15</span>
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Full History
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Update Documents
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Schedule Maintenance
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Change Driver Assignment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}