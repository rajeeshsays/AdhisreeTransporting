"use client";

import React, { useEffect, useState } from "react";
import styles from "./vehicleList.module.css";
import { VehicleFormData } from "@/app/types/types";
import { createVehicle, deleteVehicle, getVehicleAll, updateVehicle } from "@/app/services/vehicleService";
import VehicleEntryForm from "../edit/page";

export default function VehicleListPage() {
  const [vehicleList, setVehicleList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [operationMode , setOperationMode] = useState('');
  
  useEffect(() => {
    async function fetchVehicleList() {
      let isMounted = true;
      try {
        const response = await getVehicleAll(1,100);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setVehicleList(data);
          }
        }

      } catch (error) {
        console.error(error);
      }
      return () => {
        isMounted = false;
      }
    }
    fetchVehicleList();
  }, []);

const handleAdd = () => {
  setSelectedVehicle(null);
  setIsModalOpen(true);
  setOperationMode('Add');
};

const handleEdit = (vehicle: any) => {
  console.log('Editing vehicle:', vehicle);
  setSelectedVehicle(vehicle);
  setIsModalOpen(true)
  setOperationMode('Edit');
};

useEffect(()=>{

},[selectedVehicle])


const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this vehicle?")) return;

  await deleteVehicle(id);
  setVehicleList(prev => prev.filter(t => t.id !== id));
  
};


const handleSave = async (id : number,formData : VehicleFormData) => {
  try {

  console.log("formdata te list " +formData)

   //const response =  await createTransport(formData);
    const response = selectedVehicle?.id
      ? await updateVehicle(selectedVehicle.id, formData)
      : await createVehicle(formData);

    if (response.ok) {
      const savedVehicle = await response.json();
      setVehicleList(prev => {
        const existingIndex = prev.findIndex(t => t.id === savedVehicle.id);
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = savedVehicle;
          return updatedList;
        } else {
          return [...prev, savedVehicle];
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
      <h1 className={styles.title}>🚚 Vehicle List</h1>

      <div className={styles.tableWrapper}>
        <button className={styles.addBtn} onClick={handleAdd}>
  + Add Vehicle
</button>
{/* <pre>{JSON.stringify(driverList, null, 2) }</pre> */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration</th>
              <th>Model</th>
           
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
            vehicleList.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  No vehicle records found
                </td>
              </tr>
           ) : (
             vehicleList.map((vehicle) => ( 

                 <tr key={vehicle.id}>
                     
                  <td>{vehicle.id}</td>
                   <td>{vehicle.registration}</td>
                   <td>{vehicle.model}</td>
                
                   <td className={vehicle.isActive === "1" ? styles.active : styles.inactive}>
                     {vehicle.isActive ? "Active" : "Inactive"}                    
                   
                    </td>
                    <td>
<button
className={styles.editBtn}
onClick={() => handleEdit(vehicle)}
   >
     Edit
   </button>

   <button
     className={styles.deleteBtn}
     onClick={() => handleDelete(vehicle.id)}
   >
     Delete
   </button></td>
  
  </tr>
  )))}
   
            
 </tbody>
             
        </table>

 {isModalOpen && (
   <VehicleEntryForm
     vehicle={selectedVehicle}
     onClose={() => setIsModalOpen(false)}
     operationMode={operationMode}
     onSave={(id : number,formData : any) => {
       console.log("Saving vehicle entry with id:", id, "and data:", formData);
       setIsModalOpen(false);
       handleSave(id, formData);
       getVehicleAll(1,100);
     }}
     onDelete={(id : number) => {
       setIsModalOpen(false);
       deleteVehicle(id);
       getVehicleAll(1,100);
     }}
     />
   
)}
      </div>
    </div>
  );
}

