import React from 'react';
import { Table } from 'react-bootstrap';

/**
 A React component that displays a table of top scores.
 @param {Object} scores An object containing an array of scores to display in the table.
 @param {Array} scores.scores An array of score records containing the name and number of guesses.
 @returns {JSX.Element} A React component that displays a table of top scores.
 */
const TopScores = ({ scores }) => {

    /**
     * Renders the rows of the score table based on the scores passed as a prop.
     */
    const renderScores = () => {
        if(!scores)
            return (<></>)
        if (scores.length === 0) {
            return (
                <tr>
                    <td colSpan="2">No scores found.</td>
                </tr>
            );
        }

        return scores.scores.map((record, index) => (
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
