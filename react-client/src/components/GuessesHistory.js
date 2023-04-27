import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

const GuessesHistory = ({ guesses }) => {
    const TABLE_HEIGHT = '300px';
    const rowStyle = {
        marginTop: '20px',
        color: '#97cba9',
    };
    const headerStyle = {
        WebkitTextStroke: '1px white'
    }
    const tableStyle = {
        tableLayout: 'fixed',
        marginBottom: '0',
        border: `2px solid #668ba4`, // add this line to set the border color
        borderRadius: '0px',
    };
    if(guesses)
        return(
            <></>
        )
    return (
            guesses ? <Row style={rowStyle}>
                <Col>
                    <h3 style={headerStyle}>Guesses History</h3>
                    <div style={{ height: TABLE_HEIGHT, overflowY: 'scroll' }}>
                        <Table striped bordered hover style={tableStyle}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Guess</th>
                                <th>Bulls</th>
                                <th>Cows</th>
                            </tr>
                            </thead>
                            <tbody>
                            {guesses.reverse().map((guess, index) => (
                                <tr key={index}>
                                    <td>{guesses.length - index}</td>
                                    <td>{guess.guess}</td>
                                    <td>{guess.bulls}</td>
                                    <td>{guess.cows}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row> : <></>
    );
};

export default GuessesHistory;
