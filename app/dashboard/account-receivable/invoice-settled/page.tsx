"use client";
import FinanceTableOfRaisedInvoice, { RaisedInvoice } from '@/components/Table/RaisedInvoiceTable'
import FinanceTableOfSettledInvoice from '@/components/Table/SettledInvoice'
import { updateFormSubmitted } from '@/redux/slices/SettledInvoiceFormSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const [settledInvoiceData, setSettledInvoiceData] = useState<RaisedInvoice[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/settled-invoice`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.projects, "transaction data");
        setSettledInvoiceData(data.projects, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 

  const settledInvoiceDataState = useSelector((state: any) => state.settledInvoiceData)
  const formSubmitted = useSelector((state: any) => state.settledForm.formSubmitted);
  console.log(formSubmitted, "formSubmitted");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTable()
  }, [])



  useEffect(() => {
    if (formSubmitted) {
      fetchTable();
      console.log('reftch table')
      dispatch(updateFormSubmitted(false)); // Reset formSubmitted state
    }
  }, [dispatch, formSubmitted])
  return (
    <div>
      <FinanceTableOfSettledInvoice data={settledInvoiceData} />

    </div>
  )
}

export default Page