import React, { useState } from 'react';
import { UserCog, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const mockDrivers = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    status: 'active',
    documents: [
      { id: '1', type: 'Driving License', status: 'verified', expiryDate: '2025-12-31' },
      { id: '2', type: 'Identity Proof', status: 'verified' },
      { id: '3', type: 'Address Proof', status: 'pending' }
    ],
    assignedVehicle: 'DL 01 AB 1234'
  }
];

export function DriverOnboarding() {
  const [selectedDriver, setSelectedDriver] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Driver Onboarding</h1>
        <Button className="flex items-center">
          <UserCog className="w-4 h-4 mr-2" />
          New Driver
        </Button>
      </div>

      {/* Driver List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Drivers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {driver.name}
                          </div>
                          <div className="text-sm text-gray-500">{driver.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : driver.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {driver.documents.map((doc) => (
                          doc.status === 'verified' ? (
                            <CheckCircle key={doc.id} className="w-5 h-5 text-green-500" />
                          ) : doc.status === 'pending' ? (
                            <AlertCircle key={doc.id} className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <AlertCircle key={doc.id} className="w-5 h-5 text-red-500" />
                          )
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.assignedVehicle || 'Not Assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDriver(driver)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      {selectedDriver && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Document Verification - {selectedDriver.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedDriver.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.type}</h3>
                      {doc.expiryDate && (
                        <p className="text-sm text-gray-500">
                          Expires: {doc.expiryDate}
                        </p>
                      )}
                    </div>
                    {doc.status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : doc.status === 'pending' ? (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                    {doc.status === 'pending' && (
                      <Button
                        size="sm"
                        className="w-full"
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}