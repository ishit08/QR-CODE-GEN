"use client";

import { useEffect, useState } from 'react';

export default function ComingSoon() {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        function calculateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        function updateCountdown() {
            setCountdown(calculateCountdown());
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-black text-5xl font-extrabold tracking-wide drop-shadow-lg animate-bounce">
                Welcome to CodeSnaps!
            </h1>
            <h1 className="text-5xl font-bold mb-6 animate-pulse">Coming Soon</h1>
            <p className="text-xl mb-4">We&#39;re working hard to bring you something amazing. Stay tuned!</p>
            <div className="text-3xl text-red-500 font-mono animate-pulse">{countdown}</div>
        </div>
    );
}
