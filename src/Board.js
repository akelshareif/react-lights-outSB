import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = Math.random() }) {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];
        // TODO: create array-of-arrays of true/false values
        for (let row = 0; row < nrows; row++) {
            let newRow = [];
            for (let col = 0; col < ncols; col++) {
                const randomChance = Math.random();

                if (randomChance > chanceLightStartsOn) {
                    newRow.push(false);
                } else {
                    newRow.push(true);
                }
            }
            console.log(newRow);
            initialBoard.push(newRow);
        }
        return initialBoard;
    }

    function hasWon() {
        // TODO: check the board in state to determine whether the player has won.
        const isWinner = board.reduce((arr, row) => {
            if (row.includes(false)) {
                arr.push(false);
            } else {
                arr.push(true);
            }
            return arr;
        }, []);
        if (isWinner.includes(false)) {
            return false;
        } else {
            return true;
        }
    }

    function flipCellsAround(coord) {
        setBoard((oldBoard) => {
            const [y, x] = coord.split('-').map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };

            // TODO: Make a (deep) copy of the oldBoard
            let boardCopy = oldBoard.map((row) => row);

            // TODO: in the copy, flip this cell and the cells around it
            //flips clicked cell
            flipCell(y, x, boardCopy);

            //flips cells around clicked cell
            flipCell(y - 1, x, boardCopy);
            flipCell(y + 1, x, boardCopy);
            flipCell(y, x - 1, boardCopy);
            flipCell(y, x + 1, boardCopy);

            // TODO: return the copy
            return boardCopy;
        });
    }

    // TODO: if the game is won, just show a winning msg & render nothing else
    if (hasWon()) {
        return <div>You have won!</div>;
    } else {
        // TODO: make table board
        return (
            <table className="Board">
                <tbody>
                    {board.map((row, y) => {
                        return (
                            <tr key={y}>
                                {row.map((cell, x) => (
                                    <Cell key={x} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default Board;
