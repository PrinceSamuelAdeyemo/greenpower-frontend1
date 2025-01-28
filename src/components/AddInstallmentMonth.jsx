import React, { useEffect, useRef } from "react";
import { Label, TextInput } from "flowbite-react";

const AddInstallmentMonth = ({ month, installmentDetails, setInstallmentDetails, showInstallment }) => {
  const downPaymentRef = useRef(null);
  const installmentAmountRef = useRef(null);
  const installmentCommissionRef = useRef(null);

  const updateInstallmentDetails = (event) => {
    event.preventDefault();

    const downPayment = Number(downPaymentRef.current.value);
    const installment_amount = Number(installmentAmountRef.current.value);
    const installmentCommission = Number(installmentCommissionRef.current.value);

      
    setInstallmentDetails((prevDetails) =>
        prevDetails.map((installmentDetail) =>
          installmentDetail.month === month
            ? {
                ...installmentDetail,
                downPayment,
                installment_amount,
                installmentCommission,
              }
            : installmentDetail
        )
      );
  };

  useEffect(() => {
    /* if (showInstallment === false){
      console.log("show Installment value", showInstallment)
      let downPayment = 0;
      let installment_amount = 0;
      let installmentCommission = 0;

      setInstallmentDetails((prevDetails) =>
        prevDetails.map((installmentDetail) =>
          installmentDetail.month === month
            ? {
                ...installmentDetail,
                downPayment,
                installment_amount,
                installmentCommission,
              }
            : installmentDetail
        )
      );
    } */
  }, [showInstallment, installmentDetails])

  useEffect(() => {
  }, [installmentDetails]);

  return (
    <form onSubmit={updateInstallmentDetails}>
      <p className="font-bold text-c-lightgreen">{month} months payment plan</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-3">
          <Label value="Down Payment" htmlFor="downpayment" className="w-3/4" />
          <TextInput
            type="text"
            id="downpayment"
            ref={downPaymentRef}
            className="flex-grow w-[60rem]"
            required
          />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Label
            value="Installment Amount"
            htmlFor="installmentAmount"
            className="w-3/4"
          />
          <TextInput
            type="text"
            id="installmentAmount"
            ref={installmentAmountRef}
            className="flex-grow w-[60rem]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Label
            value="Installment Commission"
            htmlFor="installmentCommission"
            className="w-3/4"
          />
          <TextInput
            type="text"
            id="installmentCommission"
            ref={installmentCommissionRef}
            className="flex-grow w-[60rem]"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="text-c-lightgreen font-semibold">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddInstallmentMonth;
