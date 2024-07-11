"use client";
import FinanceTableWithLocalizationProvider from '@/components/Table/Table2'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Employee } from "@/types/EmplyeeTypes";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormSubmitted } from '@/redux/slices/LeadFormSlice';


const Page = () => {
  const [accountData, setAccountData] = useState<Employee[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/active-transaction`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.transactions, "transaction data");
        setAccountData(data.transactions, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 



  

  const accountDataState = useSelector((state: any) => state.accountData)
  const formSubmitted = useSelector((state: any) => state.leadForm.formSubmitted);
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
  
  console.log(accountData, "account data")
   return (
    <div>
      <FinanceTableWithLocalizationProvider data={accountData}/>
    </div>
  )
}

export default Page

