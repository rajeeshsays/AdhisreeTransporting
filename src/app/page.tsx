'use client'
import React from "react";
import TransportEntryForm from "./transportentry/page";

export default function Home()  {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   age: "",
  //   dob: "",
  // });

  // const handleChange = (e: { target: { name: any; value: any; }; }) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   console.log("Submitted Data:", formData);
  //   // Optionally reset form
  //   setFormData({ name: "", age: "", dob: "" });
  // };

  return (
    <TransportEntryForm/>
  );
};


