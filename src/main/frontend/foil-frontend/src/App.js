import React, { useState } from 'react';
import './App.css';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';

import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';


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



    const handleFileChange = (file) => {
        setFile(file);
        parseFile(file).then(()=>{console.log("file uploaded")});
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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    return (
        <div className="app-container">
            <header className="app-header">
                First-order Rule Learner
            </header>

            <div className="introduction-box">
                <h2>Welcome to the First-Order Rule Learner</h2>
                <p>This tool utilizes the FOIL (First-Order Inductive Learner) algorithm to derive first-order rules in the form of Horn clauses from relational datasets. Please note that the current version is optimized for categorical data.</p>
            </div>

            <div className="App">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    layout="horizontal"
                >
                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload beforeUpload={(file) => {
                                handleFileChange((file)) ;
                                return false} }
                                multiple="false"
                                maxCount={1}
                                listType="picture-card"
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Target Literal"
                               onChange={(e) => setParam1(e.target.value)}>
                        <Input />
                    </Form.Item>


                    <Form.Item label="Num of args"
                               onChange={(e) => setParam2(e.target.value)}>
                        <Input />
                    </Form.Item>


                    <Form.Item label="Arguments"
                               onChange={(e) => setAdditionalParams(e.target.value)}>
                        <Input />
                    </Form.Item>


                    <Form.Item label="Rule Size"
                               onChange={(e) => setParam3(e.target.value)}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Num of Rules"
                               onChange={(e) => setNumOfRules(e.target.value)}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Submit">
                        <Button
                            type="primary"
                            loading={isLoading}
                            onClick={handleSubmit}>
                            Upload
                        </Button>
                    </Form.Item>
                </Form>


                <div className="intro-section">
                    <h3>How to Use</h3>
                    <ol>
                        <li>
                            <strong>DataSet:</strong> Upload your relational data in a .csv format. After successful upload, the first 10 rows of your dataset will be showcased in the DataSet section below.
                        </li>
                        <li>
                            <strong>Target Literal:</strong> Specify the target literal you aim to predict. It typically represents a column in your dataset and serves as the positive literal in a Horn Clause.
                        </li>
                        <li>
                            <strong>Num of Args:</strong> Indicate the number of arguments for your target literal. For instance, isGreater(X) contains a single argument, while <>Education(X, Bachelors)</> contains two.
                        </li>
                        <li>
                            <strong>Arguments:</strong> Provide any additional arguments you'd like to set for the target literal. For example, if the target literal is <>Education(X, Bachelors)</>, input 'Bachelors' in this field.
                        </li>
                        <li>
                            <strong>Rule Size:</strong> Define the number of (negative) literals in the first order rule you wish to learn
                        </li>
                        <li>
                            <strong>Num of Rules:</strong> Set the upper limit for the number of rules you'd like the algorithm to generate.
                        </li>
                    </ol>
                    <p>After setting your preferences, proceed to initiate the learning process. Learned rules will be displayed in the bottom section with their empirical probability. (Larger dataset like Adult.csv might take a while to finish if you wish to learn multiple rules)</p>

                    <p>Here are some available DataSet you can use:</p>

                    <ol>
                        <li>
                            <strong> <a href="https://drive.google.com/file/d/103Lh1MC24oDpLSuIVow3BewFPRXN4OxU/view?usp=sharing">Adult.csv</a> (Target Literal: isGreater, Num of Args: 1, Arguments: (empty)) </strong>
                            Predict whether income exceeds $50K/yr based on census data. Also known as "Census Income" dataset.

                        </li>
                        <li>
                            <strong><a href="https://drive.google.com/file/d/1DISTIC0lIXsjjvWBXk9gN7K-7ur89Ot1/view?usp=sharing">Car.csv</a> </strong>
                            Used to predict the quality of a Car. Find more info <a href="https://archive.ics.uci.edu/dataset/19/car+evaluation">here</a>
                        </li>
                        <li>
                            <strong><a href="https://drive.google.com/file/d/11tGaRIkIT1IxB56C1TVLcXaxiJUetOEa/view?usp=sharing">House.csv</a> </strong>
                            1984 United Stated Congressional Voting Records; Classify as Republican or Democrat. Find more info <a href="https://archive.ics.uci.edu/dataset/105/congressional+voting+records">here</a>
                        </li>
                        <li>
                            <strong><a href="https://drive.google.com/file/d/1H7lwSgg3siikVKcbWALGRi59TaCheQje/view?usp=sharing">Mushroom.csv</a> </strong>
                            From Audobon Society Field Guide; mushrooms described in terms of physical characteristics; classification: poisonous or edible. Find more info <a href="https://archive.ics.uci.edu/dataset/73/mushroom">here</a>
                        </li>
                    </ol>

                </div>

            </div>

            <div className="data-section">
                <strong>Dataset (displaying first ten rows):</strong>
                {tableData.data && tableData.headers && <DataTable headers={tableData.headers} data={tableData.data} />}
            </div>


            <div className="response-container">
                <strong>Rules Learned:</strong>
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
