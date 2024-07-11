"use client";
import ProjectTableWithLocalizationProvider from '@/components/Table/ProjectListTable'
import FinanceTableWithLocalizationProvider from '@/components/Table/Table2'
import { Project } from '@/types/EmplyeeTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const fetchTable = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/projects`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data.projects, "transaction data");
        setProjectData(data.projects, ) // You can handle the data here as needed
      } else {
        console.error('Failed to fetch data');
      }
  } 

  useEffect(() => {
    fetchTable()
  }, [])
  return (
    <div>
      <ProjectTableWithLocalizationProvider data={projectData} />
    </div>
  )
}

export default Page