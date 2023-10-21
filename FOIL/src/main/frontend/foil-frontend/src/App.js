import React, { useState } from 'react';
import './App.css';



function App() {
    const [file, setFile] = useState(null);
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [param3, setParam3] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [additionalParams, setAdditionalParams] = useState('');
    const [tableData, setTableData] = useState({ headers: [], data: [] });
    const [numOfRules, setNumOfRules] = useState('');




    const parseFile =  async (file) => {
        const content = await file.text();
        const rows = content.split('\n').filter(row => row).slice(0, 10); // slice(0, 10) to get only the top 10 rows
        const headers = rows[0].split(','); // Assuming CSV format
        const data = rows.slice(1).map(row => row.split(','));

        setTableData({ headers, data });
    };



    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        parseFile(event.target.files[0]).then(()=>{console.log("file uploaded")});
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        // Parsing the additionalParams to append to the URL
        const paramsArray = additionalParams.split(',')
            .filter(p => p.trim() !== '')
            .map(p => `args=${p.trim()}`);

        const allParams = [
            `args=${param1}`,
            `args=${param2}`,
            ...paramsArray,
            `args=${param3}`,
            `args=${numOfRules}`
        ].filter(Boolean); // This will remove any falsey values, just in case any parameter is undefined or empty

        const url = `http://localhost:8080/upload?${allParams.join('&')}`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const result = await res.text();
            setResponse(result);
        } catch (error) {
            console.error('Error uploading file:', error);
            setResponse('Error uploading file: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    function DataTable({ headers, data }) {
        return (
            <table>
                <thead>
                <tr>
                    {headers.map((header, index) => <th key={index}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }


    return (
        <div className="app-container">
            <header className="app-header">
                First-order Rule Learner
            </header>
            <div className="App">
                <div className="left-section">
                    <label>
                        Upload File:
                        <input type="file" onChange={handleFileChange} />
                    </label>

                    <label>
                        Target Literal:
                        <input placeholder="Enter value for Param 1" value={param1} onChange={(e) => setParam1(e.target.value)} />
                    </label>

                    <label>
                        Num of args:
                        <input placeholder="Enter value for Param 2" value={param2} onChange={(e) => setParam2(e.target.value)} />
                    </label>

                    <label>
                        Arguments (comma separated):
                        <input
                            placeholder="Enter comma separated values"
                            value={additionalParams}
                            onChange={(e) => setAdditionalParams(e.target.value)}
                            rows="3"
                        />
                    </label>

                    <label>
                        Rule Size :
                        <input placeholder="Enter value for Param 3" value={param3} onChange={(e) => setParam3(e.target.value)} />
                    </label>

                    <label>
                        Number of Rules:
                        <input
                            placeholder="Enter number of rules"
                            value={numOfRules}
                            onChange={(e) => setNumOfRules(e.target.value)}
                        />
                    </label>

                    <button onClick={handleSubmit}>Upload</button>

                    {isLoading && <div>Loading...</div>}
                </div>

                <div className="intro-section">
                    <strong>Introduction:</strong>
                    <p>This is your introduction content. You can expand on this as needed.</p>
                </div>

            </div>

            <div className="data-section">
                <strong>Dataset:</strong>
                {tableData.data && tableData.headers && <DataTable headers={tableData.headers} data={tableData.data} />}
            </div>


            <div className="response-container">
                <strong>Response:</strong>
                <div className="response-box">
                    {response.split('\n').map((line, index) => (
                        <div className="response-line" key={index}>
                            {line.includes(':') ? (
                                <>
                                <span className="confidence-value">
                                    {line.split(':')[0]}
                                </span>
                                    <span className="rule">
                                    {line.split(':')[1]}
                                </span>
                                </>
                            ) : (
                                line
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
