import React, { useState, useEffect } from 'react';

function Report({ Failure, Index, handleStatusChange }) {
    const [failures, setFailures] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedFailure, setEditedFailure] = useState({
        potentialPrice: '',
        potentialDate: '',
        repairDescription: ''
    });

    useEffect(() => {
        setFailures(Failure);
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
            repairDescription: Failure.repairDescription
        });
    };

    const handleDelete = (index) => {
        const updatedFailures = [...failures];
        updatedFailures.splice(index, 1);
        setFailures(updatedFailures);
    };

    const saveEditedData = (index) => {
        handleStatusChange(editedFailure, index);
        setEditIndex(null);
    };


	return(
            <li key={Index} className="failure-item">
            <div className="failure-details">
                {Index === editIndex ? (
                    <div>
                        <p>Rodzaj awarii: {Failure.failureType}</p>
                        <p>Nazwa urzadzenia: {Failure.name}</p>
                        <p>Data zgloszenia: {Failure.date}</p>
                        <p>Szacowany koszt: <input type="number" placeholder={Failure.potentialPrice} className="form-control"></input> </p>
                        <p>Szacowany termin ukonczenia: <input type="date" placeholder className="form-control"></input></p>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={Failure.status} onChange={(e) => handleStatusChange(e, Index)} className="form-control">
                                <option value="NEW">NEW</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="FINISHED">FINISHED</option>
                                <option value="UNREPAIRABLE">UNREPAIRABLE</option>
                            </select>
                        </div>
                        <p>Opis podjetych krokow: <input type="text" placeholder={Failure.repairDescription} className="form-control"></input></p>
                    
                        <div>
                            <button onClick={() => saveEditedData(Index)} className="btn btn-save">Zapisz</button>
                            <button onClick={() => setEditIndex(null)} className="btn btn-cancel">Anuluj</button>
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