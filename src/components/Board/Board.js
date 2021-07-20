import React from 'react';
import { number } from 'prop-types';
import BoardContent from '../BoardContent';

const Board = ({width, height, mines}) => {
    const initBoard = () => {
        const initBoardArr =  new Array(height).fill(0).map(() => new Array(width).fill(0));
        const boardArr = initBoardArr.map((item, i) => {
            return item.map((innerItem, j) => {
                return {
                    x: j,
                    y: i,
                    flagged: false,
                    value: 0,
                    isMine: false,
                    reveled: false,
                    empty: false
                }
            });
        });

        return boardArr;
    };

    const getRandomPosition = num => {
        return Math.floor(Math.random() * (num - 1));
    };

    const setupBombs = (board) => {
        let setupX = 0;
        let setupY = 0;
        let setupMines = 0;
        let mineBoard = board;

        while (setupMines < mines) {
            setupX = getRandomPosition(height);
            setupY = getRandomPosition(width);

            if (!mineBoard[setupX][setupY].isMine) {
                mineBoard[setupX][setupY].isMine = true;
                setupMines++;
            }
        }

        console.log(`mineBoard`, mineBoard );
        // // return mineBoard;

        // for (let i = 0; i < height; i++) {
        //     for (let j = 0; j < width; j++) {
        //        // console.log(i, j,'!!', mineBoard[i][j].x, mineBoard[i][j].y, mineBoard[i][j],mineBoard);
        //         if (mineBoard[i][j].isMine !== true) {
        //         //     let bomb = 0;

        //             console.log('i', i, j, mineBoard[i][j].x, mineBoard[i][j].y, mineBoard);
        //            // countBombs(i, j, mineBoard);
        //         }
        //     }
        // }


        // for (let i = 0; i < height; i++) {
        //     for (let j = 0; j < width; j++) {
        //         // console.log(i, j,'!!',mineBoard[j][i], mineBoard[j][i].isMine);
        //         if (mineBoard[i][j].isMine !== true) {
        //             let bomb = 0;

        //             console.log('i', i, j, mineBoard[i][j].x, mineBoard[i][j].y, mineBoard);
        //             countBombs(mineBoard[i][j].x, mineBoard[i][j].y, mineBoard);
        //         }
        //     }
        // }

    };

    const countBombs = (i, j, board) => {
        let count = 0;
        console.log('i:', i, '; j:', j, board);

        // top left
        if (i-1 > 0 && j-1 > 0 && board[i-1][j-1].isMine) {
            count++;
        }

        // up
        if (i-1 > 0 && board[i-1][j].isMine) {
            count++;
        }

        // top right
        if (i-1 > 0 && j+1 < width - 1 && board[i-1][j+1].isMine) {
                count++;
        }

        // left
        if (j-1 > 0 && board[i][j-1].isMine) {
            count++;
        }

        // right
        if (j+1 < width - 1 && board[i][j+1].isMine) {
            count++;
        }

        // bottom left
        if (i+1 < height -1 && j-1 > 0 && board[i+1][j-1].isMine) {
            count++;
        }

        // down 
        if (i+1 < height -1 && board[i+1][j].isMine) {
            count++;
        }

        // botton right
        if (i+1 < height -1 && j+1 < width -1 && board[i+1][j+1].isMine) {
            count++;
        }

        console.log('count:', count);
    };


    let board = initBoard();
    let mineBoard = setupBombs(board);

    return (
        <div>
            <BoardContent />
        </div>
    )
}

Board.propTypes = {
    width: number,
    height: number,
    mines: number
};

export default Board;
