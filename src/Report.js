import React, { useState, useEffect } from 'react';

function Report({ Failure, Index, handleStatusChange, handleDelete, handleDescriptionChange, handlePriceChange, handleDateChange }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editedFailure, setEditedFailure] = useState({
        potentialPrice: '',
        potentialDate: '',
        repairDescription: '',
        status: ''
    });

    useEffect(() => {
        setEditedFailure({
            potentialPrice: Failure.potentialPrice,
            potentialDate: Failure.potentialDate,
            repairDescription: Failure.repairDescription
        });
    }, [Failure]);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedFailure({
            potentialPrice: Failure.potentialPrice,
            potentialDate: Failure.potentialDate,
            repairDescription: Failure.repairDescription,
            status: Failure.status
        });
    };

    const saveEditedData = (index) => {
        setEditIndex(null);
    };

    const onStatusChange = (newValue: string, index: number) => {
        console.log(newValue);
        console.log(index);

        setEditedFailure({
            potentialPrice: Failure.potentialPrice,
            potentialDate: Failure.potentialDate,
            repairDescription: Failure.repairDescription,
            status: newValue
        });

        handleStatusChange(newValue, index);
    }


    return (
        <li key={Index} className="failure-item">
            <div className="failure-details">
                {Index === editIndex ? (
                    <div>
                        <p>Rodzaj awarii: {Failure.failureType}</p>
                        <p>Nazwa urzadzenia: {Failure.name}</p>
                        <p>Data zgloszenia: {Failure.date}</p>
                        <p>Szacowany koszt: <input type="number" value={editedFailure.potentialPrice} onChange={(e) => handlePriceChange(e.target.value, Index)} className="form-control"></input> </p>
                        <p>Szacowany termin ukonczenia: <input type="date" value={editedFailure.potentialDate} onChange={(e) => handleDateChange(e.target.value, Index)} placeholder className="form-control"></input></p>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={editedFailure.status} onChange={(e) => onStatusChange(e.target.value, Index)} className="form-control">
                                <option value="NEW">NEW</option>
                                <option value="IN PROGRESS">IN PROGRESS</option>
                                <option value="FINISHED">FINISHED</option>
                                <option value="UNREPAIRABLE">UNREPAIRABLE</option>
                            </select>
                        </div>
                        <p>Opis podjetych krokow: <input type="text" value={editedFailure.repairDescription} onChange={(e) => handleDescriptionChange(e.target.value, Index)} className="form-control"></input></p>

                        <div>
                            <button onClick={() => saveEditedData(Index)} className="btn btn-save">Zapisz</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Rodzaj awarii: {Failure.failureType}</p>
                        <p>Nazwa urzadzenia: {Failure.name}</p>
                        <p>Data zgloszenia: {Failure.date}</p>
                        <p>Szacowany koszt: {Failure.potentialPrice}</p>
                        <p>Szacowany termin ukonczenia: {Failure.potentialDate}</p>
                        <p>Status: {Failure.status}</p>
                        <p>Opis podjetych krokow: {Failure.repairDescription}</p>


                        <div className="failure-actions">
                            <button onClick={() => handleEdit(Index)} className="btn btn-edit">Edytuj</button>
                            <button onClick={() => handleDelete(Index)} className="btn btn-delete">Usun</button>
                        </div>
                    </div>
                )}
            </div>
        </li>
    );

}

export default Report;