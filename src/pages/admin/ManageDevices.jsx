import React from 'react';
import devices from '../../data/devices.json';
import Layout from '../../components/layout/AdminLayout';

const ManageDevices = () => {
  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Manage Devices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devices.map(device => (
          <div key={device.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{device.id}</h3>
            <p>Status: <span className={device.status === 'online' ? 'text-green-500' : 'text-red-500'}>{device.status}</span></p>
            <p>Last Sync: {device.lastSync}</p>
            <p>Assigned To: {device.assignedTo}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ManageDevices;
