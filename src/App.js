import React, { useState, useEffect } from 'react';
import './App.css';
import Report from './Report.js';

function App() {
    const [failures, setFailures] = useState([]);
    const [newFailure, setNewFailure] = useState({
        name: '',
        potentialPrice: '',
        potentialDate: '',
        status: 'NEW',
        repairDescription: ''
    });

    useEffect(() => {
        // Mockowy przyk³ad danych
        const mockData = [
            {
                failureType: 'High',
                name: 'Komputer stacjonarny',
                date: '2024-04-05',
                potentialPrice: '100',
                potentialDate: '2024-04-10',
                status: 'NEW',
                repairDescription: 'Testowy opis'
            },
        ];
        setFailures(mockData);
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewFailure(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addFailure = () => {
        const newFailureEntry = { ...newFailure, date: new Date().toISOString().slice(0, 10) };
        console.log(newFailureEntry);
        setFailures([...failures, newFailureEntry]);
        setNewFailure({
            name: '',
            potentialPrice: '',
            potentialDate: '',
            status: 'NEW',
            repairDescription: ''
        });
    };


    


    return (
        <div className="App">
            <header className="App-header">
                <h1>Serwis Komputerowy</h1>
                <div className="form-container">
                    <h2>Dodaj nowa usterke</h2>
                    <form className="failure-form">
                        <div className="form-group">
                            <label>Nazwa urzadzenia:</label>
                            <input type="text" name="name" value={newFailure.name} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Szacowany koszt:</label>
                            <input type="text" name="potentialPrice" value={newFailure.potentialPrice} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Szacowany termin ukonczenia:</label>
                            <input type="date" name="potentialDate" value={newFailure.potentialDate} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Opis podjetych krokow:</label>
                            <textarea name="repairDescription" value={newFailure.repairDescription} onChange={handleInputChange} className="form-control" />
                        </div>
                        <button type="button" onClick={addFailure} className="btn btn-primary">Dodaj</button>
                    </form>
                </div>
                <div className="failures-list">
                    <h2>Lista usterek</h2>
                    <ul className="failure-items">
                        {failures.map((failure, index) => (
                            <Report Failure={failure} Index={index}></Report>
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default App;
