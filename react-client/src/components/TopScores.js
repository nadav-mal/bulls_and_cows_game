import React from 'react';
import { Table } from 'react-bootstrap';

const TopScores = ({ scores }) => {

    const renderScores = () => {
        if (scores.length === 0) {
            return (
                <tr>
                    <td colSpan="2">No scores found.</td>
                </tr>
            );
        }

        return scores.map((record, index) => (
            <tr key={index}>
                <td>{record.name}</td>
                <td>{record.score}</td>
            </tr>
        ));
    };

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Guesses</th>
            </tr>
            </thead>
            <tbody>
            {renderScores()}
            </tbody>
        </Table>
    );
};

export default TopScores;
