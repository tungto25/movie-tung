import React, { useState } from 'react';
import Paymentmethod from './Paymentmethod';
import MoviePackages from './MoviePackages';

function MoviePayment() {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <div className='mt-30 text-white'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Phương thức thanh toán</h1>
                <div className='border border-yellow-500 w-[10%] mx-auto my-3'></div>
            </div>

            <div className='flex items-start justify-center px-5'>
                <MoviePackages setSelectedPlan={setSelectedPlan} />
                <Paymentmethod selectedPlan={selectedPlan} />
            </div>
        </div>
    );
}

export default MoviePayment;
