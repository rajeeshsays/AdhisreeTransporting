"use client";

import React, { useEffect, useState } from "react";
import styles from "./vehicleTypeList.module.css";
import { PartyFormData, VehicleTypeFormData } from "@/app/types/types";
import { createVehicleType, deleteVehicleType, getVehicleTypeAll, updateVehicleType } from "@/app/services/vehicleTypeService";
import VehicleTypeEntryForm from "../edit/page";

export default function VehcileListPage() {
  const [partyList, setVehicleTypeList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState<any | null>(null);
  const [operationMode , setOperationMode] = useState('');
  

  useEffect(() => {
    async function fetchVehicleTypeList() {
      let isMounted = true;
      try {
        const response = await getVehicleTypeAll(1,100);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setVehicleTypeList(data);
          }
        }

      } catch (error) {
        console.error(error);
      }
      return () => {
        isMounted = false;
      }
    }
    fetchVehicleTypeList();
  }, []);

const handleAdd = () => {
  setSelectedVehicleType(null);
  setIsModalOpen(true);
  setOperationMode('Add');
};

const handleEdit = (party: any) => {
  console.log('Editing VehicleType:', party);
  setSelectedVehicleType(party);
  setIsModalOpen(true)
  setOperationMode('Edit');
};

useEffect(()=>{

},[selectedVehicleType])


const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this VehicleType?")) return;

  await deleteVehicleType(id);
  setVehicleTypeList(prev => prev.filter(t => t.id !== id));
  
};


const handleSave = async (id : number,formData : VehicleTypeFormData) => {
  try {

  console.log("formdata te list " +formData)

   //const response =  await createTransport(formData);
    const response = selectedVehicleType?.id
      ? await updateVehicleType(selectedVehicleType.id, formData)
      : await createVehicleType(formData);

    if (response.ok) {
      const savedVehicleType = await response.json();
      setVehicleTypeList(prev => {
        const existingIndex = prev.findIndex(t => t.id === savedVehicleType.id);
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = savedVehicleType;
          return updatedList;
        } else {
          return [...prev, savedParty];
        }
      });
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🚚 Vehicle Type List</h1>

      <div className={styles.tableWrapper}>
        <button className={styles.addBtn} onClick={handleAdd}>
  + Add Vehicle Type
</button>
{/* <pre>{JSON.stringify(driverList, null, 2) }</pre> */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Desc</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
            partyList.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  No party records found
                </td>
              </tr>
           ) : (
             partyList.map((party) => ( 

                 <tr key={party.id}>
                     
                  <td>{party.id}</td>
                   <td>{party.desc}</td>
                   <td className={party.isActive === "1" ? styles.active : styles.inactive}>
                     {party.isActive ? "Active" : "Inactive"}                    
                   
                    </td>
                    <td>
<button
className={styles.editBtn}
onClick={() => handleEdit(party)}
   >
     Edit
   </button>

   <button
     className={styles.deleteBtn}
     onClick={() => handleDelete(party.id)}
   >
     Delete
   </button></td>
  
  </tr>
  )))}
   
            
 </tbody>
             
        </table>

 {isModalOpen && (
   <VehicleTypeEntryForm
     vehicleType={selectedVehicleType}
     onClose={() => setIsModalOpen(false)}
     operationMode={operationMode}
     onSave={(id : number,formData : any) => {
       console.log("Saving party entry with id:", id, "and data:", formData);
       setIsModalOpen(false);
       handleSave(id, formData);
       getVehicleTypeAll(1,100);
     }}
     onDelete={(id : number) => {
       setIsModalOpen(false);
       deleteVehicleType(id);
       getVehicleTypeAll(1,100);
     }}
     />
   
)}
      </div>
    </div>
  );
}

