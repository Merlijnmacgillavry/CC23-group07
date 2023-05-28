import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function CSVData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Read the CSV file
                const csvData = await fetch('intakeQuestions.csv').then((response) => response.text());

                // Parse the CSV data
                const parsedData = Papa.parse(csvData, { header: true }).data;

                // Update the state with the parsed data
                setData(parsedData);
            } catch (error) {
                console.error('Error reading CSV file:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>CSV Data</h1>
            <table>
                <thead>
                    <tr>
                        {data.length > 0 &&
                            Object.keys(data[0]).map((header) => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CSVData;