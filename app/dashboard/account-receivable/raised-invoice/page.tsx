"use client";
import FinanceTableOfRaisedInvoice, { RaisedInvoice } from '@/components/Table/RaisedInvoiceTable'
import { updateFormSubmitted } from '@/redux/slices/RaisedInvoiceForm';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const [raisedInvoiceData, setRaisedInvoiceData] = useState<RaisedInvoice[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/raised-invoice`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.invoices, "transaction data");
        setRaisedInvoiceData(data.invoices, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 

  const raisedInvoiceDataState = useSelector((state: any) => state.raisedInvoiceData)
  const formSubmitted = useSelector((state: any) => state.raisedForm.formSubmitted);
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
      <FinanceTableOfRaisedInvoice data={raisedInvoiceData} />
    </div>
  )
}

export default Page