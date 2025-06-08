
import React from 'react';
import Layout from '../../components/layout/AdminLayout';
import users from '../../data/users.json'; // dummy data

const ManageUsers = () => {
  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-2 text-center">{idx + 1}</td>
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.role}</td>
              <td className="py-2 space-x-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded" disabled={u.disabled}>Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default ManageUsers;