import React, { useState, useEffect } from 'react';
import './App.css';
import Report from './Report.js';
import axios from 'axios'; 



function App() {

    const [failures, setFailures] = useState([]);
    const [newFailure, setNewFailure] = useState({
        name: '',
        failureType: '',
        potentialPrice: '',
        potentialDate: '',
        status: 'NEW',
        repairDescription: '',
        date: ''
    });

    useEffect(() => {
        fetchFailures();
    }, []);

    const fetchFailures = async () => {
        try {
            const response = await axios.get('/failures/');
            setFailures(response.data);
        } catch (error) {
            console.error('Error fetching failures:', error);
        }
    };

    const addFailure = async () => {

        if (newFailure.name.trim().length < 3 || newFailure.failureType.trim().length < 3) {
            alert("Nazwa urzadzenia i rodzaj awarii musza zawierac co najmniej 3 znaki.");
            return;
        }

        if (isNaN(newFailure.potentialPrice) || newFailure.potentialPrice <= 0) {
            alert("Szacowany koszt musi byc liczba wieksza niz 0.");
            return;
        }

        const potentialDate = new Date(newFailure.potentialDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (potentialDate <= today) {
            alert("Szacowana data musi byc pozniejsza niz dzisiejsza data.");
            return;
        }


        const newFailureEntry = { ...newFailure, date: new Date().toISOString().slice(0, 10) };
        console.log(newFailureEntry);
        setFailures([...failures, newFailureEntry]);

        try {
            await axios.post('/failures/', newFailure);
            setNewFailure({
                name: '',
                failureType: '',
                potentialPrice: '',
                potentialDate: '',
                status: 'NEW',
                repairDescription: '',
                date: ''
            });
            fetchFailures();
        } catch (error) {
            console.error('Error adding failure:', error);
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewFailure(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStatusChange = (value, index: number) => {
        console.log(value);
        console.log(index);
        console.log(failures);

        setFailures(failures.map((item, indexx) => indexx === index ? { ...item, status: value } : item));
        console.log(failures);
    };

    const handleDelete = async (id, index) => {
        try {
            const failureToDelete = failures[id];
            console.log('ID:', id);
            console.log(failures);
            console.log(failureToDelete);
            if (!failureToDelete) {
                console.error('Failure not found');
                return;
            }

            const { name } = failureToDelete;
            await axios.delete(`/failures/${encodeURIComponent(name)}`);
            
            setFailures(prevFailures => prevFailures.filter((_, i) => i !== index));
            fetchFailures();
        } catch (error) {
            console.error('Error deleting failure:', error);
        }
    };

    const handleDescriptionChange = (newDesc: string, index: number) => {
        console.log(index);
        console.log(newDesc);

        setFailures(failures.map((item, indexx) => indexx === index ? { ...item, repairDescription: newDesc } : item));
    }

    const handleDateChange = (newDate: Date, index: number) => {
        const potentialDate = new Date(newDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(newDate);
        console.log(today);

        if (potentialDate <= today) {
            alert("Szacowana data musi byc pozniejsza niz dzisiejsza data.");
            return;
        }

        setFailures(failures.map((item, indexx) => indexx === index ? { ...item, potentialDate: newDate } : item));
    }

    const handlePriceChange = (newPrice: number, index: number) => {
        if (isNaN(newPrice) || newPrice < 0) {
            alert("Szacowany koszt musi byc liczba wieksza niz 0.");
            return;
        }

        setFailures(failures.map((item, indexx) => indexx === index ? { ...item, potentialPrice: newPrice } : item));
    }

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
                            <label>Rodzaj awarii:</label>
                            <input type="text" name="failureType" value={newFailure.failureType} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Szacowany koszt:</label>
                            <input type="number" name="potentialPrice" value={newFailure.potentialPrice} onChange={handleInputChange} className="form-control" />
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
                            <Report Failure={failure}
                                Index={index}
                                handleStatusChange={handleStatusChange}
                                handleDelete={handleDelete}
                                handleDescriptionChange={handleDescriptionChange}
                                handleDateChange={handleDateChange}
                                handlePriceChange={handlePriceChange}>
                            </Report>
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default App;