'use client';
import React, { useState } from "react";
import Select from "react-select";
import "./../transportentry/entryform.css";

type TransportEntryForm = {
  id: string;
  date: string;
  vehicleNo: string;
  vehicleType: string;
  driverId: string;
  party1: string;
  party2: string[];
  from: string;
  to: string;
  startKM: string;
  closeKM: string;
  total: string;
  loading: string;
  unloading: string;
  loadingCommision: string;
  unloadingCommision: string;
};

interface FieldOption {
  value: string;
  label: string;
}

const fields: {
  name: keyof TransportEntryForm;
  type: string;
  label: string;
  options?: FieldOption[];
}[] = [
  { name: "id", type: "number", label: "ID" },
  { name: "date", type: "date", label: "Date" },
  { name: "vehicleNo", type: "select", label: "Vehicle No" },
  { name: "vehicleType", type: "select", label: "Vehicle Type" },
  { name: "driverId", type: "select", label: "Driver ID" },
   { name: "party1", type: "select", label: "Party 1" },
  {
    name: "party2",
    type: "multiselect",
    label: "Party 2",
    options: [
      { value: "mon", label: "Monday" },
      { value: "tue", label: "Tuesday" },
      { value: "wed", label: "Wednesday" },
      { value: "thu", label: "Thursday" },
      { value: "fri", label: "Friday" },
    ],
  },
  { name: "from", type: "select", label: "From" },
  { name: "to", type: "select", label: "To" },
  { name: "startKM", type: "number", label: "Start KM" },
  { name: "closeKM", type: "number", label: "Close KM" },
  { name: "total", type: "number", label: "Total" },
  { name: "loading", type: "number", label: "Loading" },
  { name: "unloading", type: "number", label: "Unloading" },
  { name: "loadingCommision", type: "number", label: "Loading Commision" },
  { name: "unloadingCommision", type: "number", label: "Unloading Commision" },
];

const TransportEntryForm = () => {
  const [formData, setFormData] = useState<TransportEntryForm>({
    id: "",
    date: "",
    vehicleNo: "",
    vehicleType: "",
    driverId: "",
    party1: "",
    party2: [],
    from: "",
    to: "",
    startKM: "",
    closeKM: "",
    total: "",
    loading: "",
    unloading: "",
    loadingCommision: "",
    unloadingCommision: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    selectedOption: any,
    fieldName: keyof TransportEntryForm
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMultiSelectChange = (
    selectedOptions: any,
    fieldName: keyof TransportEntryForm
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOptions ? selectedOptions.map((o: any) => o.value) : [],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-2xl mx-auto space-y-4 bg-white rounded shadow"
    >
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ name, type, label, options }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>
              {label}
            </label>

            {type === "select" && options ? (
              <Select
                id={name}
                name={name}
                options={options}
                value={options.find((opt) => opt.value === formData[name]) || null}
                onChange={(selected) => handleSelectChange(selected, name)}
                placeholder="Select an option"
              />
            ) : type === "multiselect" && options ? (
              <Select
                id={name}
                name={name}
                options={options}
                isMulti
                value={options.filter((opt) =>
                  (formData[name] as string[]).includes(opt.value)
                )}
                onChange={(selected) => handleMultiSelectChange(selected, name)}
                placeholder="Select multiple options"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name] as string}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
export default TransportEntryForm;
