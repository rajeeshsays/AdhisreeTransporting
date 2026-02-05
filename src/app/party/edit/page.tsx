'use client'

import React, { useState } from "react";
import  './partyEdit.css';
import Select from 'react-select';
import { PartyFormData } from "@/app/types/types";
import styles from "./party.module.css";

export default function PartyEntryForm({party, onClose, onSave,onDelete,operationMode})  {
  
  let partyData : PartyFormData = {
    id: party?.id || "",
    name: party?.name || "",
    code : party?.code || "",
    gstNo : party?.gstNo || "",
    addressLine1: party?.addressLine1 || "",
    addressLine2: party?.addressLine2 || "",
    mobile: party?.mobile || "",
    officePhone : party?.officePhone || "",
    email: party?.email || "",
    contactPerson : party?.contactPerson || "",
    pincode: party?.pincode || "",
    accountId: party?.accountId || "",  
    isActive: party?.isActive || "true",
  }

  const [formData, setFormData] = useState<PartyFormData>(partyData);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Form data---->>>",formData);
    console.log("Changing field:", name, "to value:", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const actives = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  const handleDelete = () => {
    console.log("Deleting party...", formData.id);
    onDelete(formData.id);
  }

  const handleClose = () => {
  console.log("Closing form...");
  onClose();
}


  const changeActives = () => {
   setFormData(prevData => ({
        ...prevData,
        isActive: prevData.isActive === "true" ? "false" : "true"
      }));
  }
  const handleSave = async (e: React.FormEvent) => {
  
    e.preventDefault();
    console.log("Saving form data...", formData);
    if(operationMode === 'Edit'){
      console.log("Updating party entry..."+formData.id);
      onSave(formData.id,formData);
  
    } else {
      console.log("Creating new party entry..."+formData.name);
      onSave(0,formData);
    }
    };
    return (
     <div className={styles.overlay}>
        <div className={styles.modal}>

    <form onSubmit = {handleSave} className="party-form">
            <h2>party Entry Form</h2>

    <div className="form-grid">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </div>
    


      <div>
        <label>GST No:</label>
        <input
          type="text"
          name="gstNo"
          value={formData.gstNo}
          onChange={handleChange}
          required
        />
      </div>

      

      <div>
        <label>Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />

        
      </div>

      <div>
        <label>Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          required
        />

        
      </div>
            <div>
        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        
      </div>

      <div>
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Office Phone</label>
        <input
          type="text"
          name="officePhone"
          value={formData.officePhone}
          onChange={handleChange}
          required
        />
      </div>
  <div>
        <label>Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
      </div>

      <div>
  <label>Is Active</label>
  <Select
    name="isActive"
    value={actives.find(option => option.value === formData.isActive)}
    onChange={changeActives}
    options={actives}
    required
  >

  
  </Select>
      </div>
      
      <div className="form-actions">
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" onClick={handleSave}>
            Submit
          </button>
      </div>
       

    </div>
    </form>
    </div>
    </div>
  );
}


