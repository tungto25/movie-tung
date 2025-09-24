import React from 'react';
import Paymentmethod from './Paymentmethod';
import PackagesPay from './PackagesPay';
import MoviePackages from './MoviePackages';

function PaymentPage(props) {
    return (
        <div className='mt-30 text-white'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Phương thức thanh toán</h1>
                <p>Hủy bất cứ lúc nào</p>
                <div className='border border-yellow-500 w-[10%] mx-auto my-3'></div>
            </div>
            <div className='flex items-start justify-center px-5'>
                {/* <MoviePackages /> */}
                <PackagesPay />
                <Paymentmethod />
            </div>
        </div>
    );
}

export default PaymentPage;