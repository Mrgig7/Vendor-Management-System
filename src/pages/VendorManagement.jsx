import React, { useState } from 'react';
import { Users, Plus, ChevronDown, Shield, FileCheck, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';

const mockVendors = [
  {
    id: '1',
    name: 'National Fleet Services',
    type: 'super',
    level: 0,
    parentId: null,
    status: 'active',
    permissions: ['all'],
    fleetCount: 250,
    driversCount: 450
  },
  {
    id: '2',
    name: 'North Region Operations',
    type: 'regional',
    level: 1,
    parentId: '1',
    status: 'active',
    permissions: ['fleet_management', 'driver_onboarding', 'document_verification'],
    fleetCount: 120,
    driversCount: 200
  },
  {
    id: '3',
    name: 'Delhi City Fleet',
    type: 'city',
    level: 2,
    parentId: '2',
    status: 'active',
    permissions: ['fleet_management', 'driver_onboarding'],
    fleetCount: 75,
    driversCount: 130
  }
];

export function VendorManagement() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Vendor Management</h1>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Vendor
        </Button>
      </div>

      {/* Vendor Hierarchy View */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Vendor Hierarchy</h2>
          <div className="space-y-4">
            {mockVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="relative"
                style={{ marginLeft: `${vendor.level * 2}rem` }}
              >
                <div
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    vendor.status === 'active' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{vendor.type} Vendor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{vendor.fleetCount}</span> Vehicles |{' '}
                      <span className="font-medium">{vendor.driversCount}</span> Drivers
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Details Panel */}
      {selectedVendor && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedVendor.name} - Details
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPermissionModal(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Manage Permissions
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Operations</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>Fleet Management</span>
                    <span className="text-green-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Driver Onboarding</span>
                    <span className="text-green-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Payment Processing</span>
                    <span className="text-red-600">Disabled</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileCheck className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Compliance</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>Document Verification</span>
                    <span className="text-green-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Compliance Reports</span>
                    <span className="text-green-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Audit Access</span>
                    <span className="text-red-600">Disabled</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Sub-vendors</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Total Sub-vendors: <span className="font-medium">3</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Active Sub-vendors: <span className="font-medium text-green-600">3</span>
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Sub-vendors
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