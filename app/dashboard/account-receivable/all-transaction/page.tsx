"use client";
import FinanceTableOfAllTransaction from '@/components/Table/AllTransactionTable'
import FinanceTableOfRaisedInvoice, { RaisedInvoice } from '@/components/Table/RaisedInvoiceTable'
import { updateFormSubmitted } from '@/redux/slices/AllTransaction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const [allTransactionData, setAllTransactionData] = useState<RaisedInvoice[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/all-transactions`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.projects, "transaction data");
        setAllTransactionData(data.projects, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 

  const settledInvoiceDataState = useSelector((state: any) => state.allTransactionData)
  const formSubmitted = useSelector((state: any) => state.allTransactionForm.formSubmitted);
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
      <FinanceTableOfAllTransaction data={allTransactionData} />

    </div>
  )
}

export default Page