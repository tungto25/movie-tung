import { useContext, useEffect, useMemo, useState } from 'react';
import Paymentmethod from './Paymentmethod';
import PackagesPay from './PackagesPay';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { getOjectById } from '../../../services/reponsitory';
import { ContextAuth } from '../../../contexts/AuthProvider';

function PaymentPage(props) {
    const { isLogin } = useContext(ContextAuth);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selected, setSelected] = useState(1);
    const packages = useContext(ContextPackages);
    const plans = useContext(ContextPlans);
    const selectedPackage = packages.find(p => p.id === selected);
    const selectedPlanId = getOjectById(plans, selectedPackage?.plan);

    const selectedPackageTime = selectedPackage ? Number(selectedPackage.time) : 0;
    const basePrice = selectedPlanId?.price || 0;

    const price = selectedPackage?.discount
        ? basePrice - (basePrice * selectedPackage.discount / 100)
        : basePrice;
    useEffect(() => {
        if (selectedPackage && selectedPlanId) {
            const finalPrice = selectedPackage.discount
                ? basePrice - (basePrice * selectedPackage.discount / 100)
                : basePrice;

            setSelectedPlan({
                ...selectedPlanId,
                time: selectedPackage.time,
                discount: selectedPackage.discount,
                finalPrice: finalPrice
            });
        }
    }, [selectedPackage, selectedPlanId]);
// về đổi qua usemo

    const createSubscription = async (transactionId) => {
        try {
            const plan = selectedPlanId;
            const priceUsd = (price / 25000).toFixed(2);
            const today = new Date();
            const autoRenewDate = new Date(today);
            autoRenewDate.setMonth(today.getMonth() + selectedPackageTime);
            await addDocument('Subscriptions', {
                idUser: isLogin.id,
                plan: plan.id,
                startDate: today,
                expiryDate: autoRenewDate,
                paymentMethod: "paypal",
                transactionId: transactionId,
                price: priceUsd
            });
            message.success('Subscription created successfully!');
            navigate("/");
        } catch (error) {
            console.error('Error creating subscription:', error);
            alert('Failed to create subscription. Please try again.');
        }
    }
// tạo provider cho sub  => sửa hàm này lại  đặt lại cái gói này chưa hết hạn gói cũ  cộng thêm thời gian cho họ
// mình đặt gói vip 3 thì có đăng ký gói vip 2 ko ? // cho
// gói thuê 
    return (
        <div className='mt-30 text-white'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Phương thức thanh toán</h1>
                <p>Hủy bất cứ lúc nào</p>
                <div className='border border-yellow-500 w-[10%] mx-auto my-3'></div>
            </div>
            <div className='flex items-start justify-center px-5'>

                <PackagesPay onPlanChange={setSelectedPlan} basePrice={basePrice} selectedPackage={selectedPackage}
                    price={price} selectedPackageTime={selectedPackageTime} plans={plans}
                    packages={packages} selected={selected} setSelected={setSelected} />
                <Paymentmethod selectedPlan={selectedPlan} price={price} createSubscription={createSubscription} />
            </div>
        </div>
    );
}

export default PaymentPage;