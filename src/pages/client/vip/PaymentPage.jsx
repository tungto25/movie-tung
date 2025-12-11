import { useState } from 'react';
import Paymentmethod from './Paymentmethod';
import PackagesPay from './PackagesPay';

function PaymentPage(props) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    return (
        <div className='mt-30 text-white'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Phương thức thanh toán</h1>
                <p>Hủy bất cứ lúc nào</p>
                <div className='border border-yellow-500 w-[10%] mx-auto my-3'></div>
            </div>
            <div className='flex items-start justify-center px-5'>

                <PackagesPay onPlanChange={setSelectedPlan}/>
                <Paymentmethod selectedPlan={selectedPlan}/>
            </div>
        </div>
    );
}

export default PaymentPage;