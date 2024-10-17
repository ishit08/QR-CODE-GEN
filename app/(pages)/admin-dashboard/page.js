'use client';

import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllUsers, getPlans, createPlan, updatePlan } from '../(auth)/api/api'; // Ensure your API functions are imported

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanDuration, setNewPlanDuration] = useState('');
  const [newPlanPrice, setNewPlanPrice] = useState('');
  const [newPlanFeatures, setNewPlanFeatures] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editPlanId, setEditPlanId] = useState(null); // State for tracking the plan being edited

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      setIsLoading(true);

      try {
        const usersData = await getAllUsers(token);
        setUsers(usersData);

        const plansData = await getPlans(token);
        setPlans(plansData);
      } catch (error) {
        setError('Error fetching data');
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle new plan creation
  const handleCreatePlan = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // setIsLoading(true); // Set loading to true while creating a plan

    try {
      const newPlan = {
        name: newPlanName,
        duration: newPlanDuration,
        price: parseFloat(newPlanPrice), // Ensure price is a number
        features: newPlanFeatures.split(',').map(feature => feature.trim()), // Split features into an array and trim spaces
      }; // Prepare new plan data

      const createdPlan = await createPlan(token, newPlan); // Call the API to create the new plan

      // Update the plans state to include the new plan
      setPlans((prevPlans) => [...prevPlans, createdPlan]);
      
      alert('Plan created successfully!'); // Show success alert

      // Delay the reload to allow the alert to be seen
      setTimeout(() => {
        window.location.reload(); 
      }, 500); // Adjust the time as needed (1000 ms = 1 second)

    } catch (error) {
      setError('Error creating plan: ' + (error.response?.data?.error || 'An error occurred'));
      console.error('Create plan error:', error);
    } finally {
      setIsLoading(false); // Reset loading state after the process
    }
  };
  

  const handleEditPlan = (plan) => {
    setEditPlanId(plan.id); // Set the current plan ID to be edited
    setNewPlanName(plan.name); // Prefill the form with plan details
    setNewPlanDuration(plan.duration);
    setNewPlanPrice(plan.price);
    setNewPlanFeatures(plan.features.join(', ')); // Convert features array to string
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const updatedPlan = {
        name: newPlanName,
        duration: newPlanDuration,
        price: parseFloat(newPlanPrice),
        features: newPlanFeatures.split(',').map((feature) => feature.trim()),
      };

      const response = await updatePlan(token, editPlanId, updatedPlan);
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === editPlanId ? response : plan))
      );

      alert('Plan updated successfully!');
      setEditPlanId(null);
      setTimeout(() => {
        window.location.reload(); 
      }, 500); // Adjust the time as needed (1000 ms = 1 second) // Clear edit state
    } catch (error) {
      setError('Error updating plan: ' + (error.response?.data?.error || 'An error occurred'));
      console.error('Update plan error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="circle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={editPlanId ? handleUpdatePlan : handleCreatePlan} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editPlanId ? 'Edit Plan' : 'Create New Plan'}
        </h2>
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
          placeholder="Plan Name"
          required
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <input
          type="text"
          value={newPlanDuration}
          onChange={(e) => setNewPlanDuration(e.target.value)}
          placeholder="Plan Duration"
          required
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <input
          type="number"
          value={newPlanPrice}
          onChange={(e) => setNewPlanPrice(e.target.value)}
          placeholder="Plan Price"
          required
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <input
          type="text"
          value={newPlanFeatures}
          onChange={(e) => setNewPlanFeatures(e.target.value)}
          placeholder="Plan Features"
          required
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          {editPlanId ? 'Update Plan' : 'Create Plan'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Users:</h2>
      <ul className="list-disc pl-5 mb-4">
        {users.length > 0 ? users.map((user) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        )) : <li>No users found.</li>}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Plans:</h2>
      <ul className="list-disc pl-5">
        {plans.length > 0 ? plans.map((plan) => (
          <li key={plan.id}>
            {plan.name} - {plan.duration} - ${plan.price} - Features: {plan.features}
            <button onClick={() => handleEditPlan(plan)} className="bg-yellow-500 text-white rounded p-1 ml-2">
              Edit
            </button>
          </li>
        )) : <li>No plans available.</li>}
      </ul>
    </div>
  );
};

export default AdminDashboard;
