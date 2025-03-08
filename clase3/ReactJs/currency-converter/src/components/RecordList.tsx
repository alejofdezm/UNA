// src/components/RecordList.tsx
import React, { useState } from "react";
import "./RecordList.css";

const RecordList: React.FC = () => {
  const [records, setRecords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddRecord = () => {
    if (inputValue.trim() !== "") {
      setRecords([...records, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  return (
    <div className='record-list-container'>
      <h2>Lista de Registros</h2>
      <div className='input-container'>
        <input type='text' placeholder='Agregar registro...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} data-testid='record-input' />
        <button onClick={handleAddRecord} data-testid='add-button'>
          Agregar
        </button>
      </div>
      <ul data-testid='record-list'>
        {records.map((record, index) => (
          <li key={index} className='record-item'>
            {record}
            <button onClick={() => handleDeleteRecord(index)} data-testid={`delete-button-${index}`}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
