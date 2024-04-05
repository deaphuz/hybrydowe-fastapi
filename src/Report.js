import React, { useState, useEffect } from 'react';

function Report({ Failure, Index }) {
    const [failures, setFailures] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedName(failures[index]?.name || '');
        setEditedDescription(failures[index].repair_description);
    };

    const handleDelete = (index) => {
        const updatedFailures = [...failures];
        updatedFailures.splice(index, 1);
        setFailures(updatedFailures);
    };

    const saveEditedData = (index) => {
        const updatedFailures = [...failures];
        updatedFailures[index].name = editedName;
        updatedFailures[index].repair_description = editedDescription;
        setFailures(updatedFailures);
        setEditIndex(null);
        setEditedName('');
        setEditedDescription('');
    };

	return(
            <li key={Index} className="failure-item">
                <div className="failure-details">
                    <p>Rodzaj awarii: {Failure.failureType}</p>
                    <p>Nazwa urzadzenia: {Failure.name}</p>
                    <p>Data zgloszenia: {Failure.date}</p>
                    <p>Szacowany koszt: {Failure.potentialPrice}</p>
                    <p>Szacowany termin ukonczenia: {Failure.potentialDate}</p>
                    <p>Status: {Failure.status}</p>
                    <p>Opis podjetych krokow: {Failure.repairDescription}</p>
                    {Index === editIndex ? (
                        <div>
                            <button onClick={() => saveEditedData(Index)} className="btn btn-save">Zapisz</button>
                            <button onClick={() => setEditIndex(null)} className="btn btn-cancel">Anuluj</button>
                        </div>
                    ) : (
                        <div className="failure-actions">
                            <button onClick={() => handleEdit(Index)} className="btn btn-edit">Edytuj</button>
                            <button onClick={() => handleDelete(Index)} className="btn btn-delete">Usun</button>
                        </div>
                    )}
                </div>
            </li>
	);

}

export default Report;