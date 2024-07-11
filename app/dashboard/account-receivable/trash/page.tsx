"use client";
import { RaisedInvoice } from '@/components/Table/RaisedInvoiceTable';
import FinanceTableOfTrash from '@/components/Table/TrashTable'
import { updateFormSubmitted } from '@/redux/slices/TrashSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const [trashData, setTrashData] = useState<RaisedInvoice[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/trash`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.trash, "transaction data");
        setTrashData(data.trash, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 

  const TashDataState = useSelector((state: any) => state.trashData)
  const formSubmitted = useSelector((state: any) => state.trash.formSubmitted);
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
      <FinanceTableOfTrash data={trashData} />
    </div>
  )
}

export default Page