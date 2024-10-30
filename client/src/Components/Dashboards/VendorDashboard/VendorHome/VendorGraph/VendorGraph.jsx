import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useUserProfile from '../../../../../hooks/useUserProfile';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const VendorGraph = () => {

    const vendorMail = useUserProfile();
    const vendorProducts = useAxiosSecure();

    const { data: allOrders = [] } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await vendorProducts.get('/all-orders');
            console.log(res.data);
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const allVendorOrders = allOrders?.filter(product => product?.vendorEmail === vendorMail.profile[0]?.email);

    let total = allVendorOrders?.reduce((previousValue, currentValue) => {
        return (previousValue + (currentValue.itemsCount * currentValue.totalAmount));
    }, 0);

    const data = [
        { month: 'Jan', earnings: 200, expenses: 400 },
        { month: 'Feb', earnings: 100, expenses: 200 },
        { month: 'Mar', earnings: 50, expenses: 300 },
        { month: 'Apr', earnings: 50, expenses: 300 },
        { month: 'May', earnings: 50, expenses: 300 },
        { month: 'Jun', earnings: 50, expenses: 300 },
        { month: 'Jul', earnings: 50, expenses: 300 },
        { month: 'Aug', earnings: 50, expenses: 300 },
        { month: 'Sep', earnings: 50, expenses: 300 },
        { month: 'Oct', earnings: 50, expenses: 300 },
        { month: 'Nov', earnings: 50, expenses: 300 },
        { month: 'Dec', earnings: 50, expenses: 300 },

        // Add more data
    ];

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Graph</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VendorGraph;