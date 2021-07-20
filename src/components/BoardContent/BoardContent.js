import React, { useEffect } from 'react';
import { number } from 'prop-types';
import BoardPlayground from '../BoardPlayground';
import { useBoardContext } from '../../context/BoardContext';
import { STARTGAME } from '../../constants';

const BoardContent = ({width, height, mines}) => {
    useEffect(() => {
        boardDispatch({ 
            type: STARTGAME,
            board: startGame()
        });
    }, []);

    const  { boardDispatch } = useBoardContext();

    const getRandomPosition = num => {
        return Math.floor(Math.random() * (num - 1));
    };

    const setupBombs = (board) => {
        let setupX = 0;
        let setupY = 0;
        let setupMines = 0;
        let mineBoard = board;

        while (setupMines < mines) {
            setupX = getRandomPosition(width);
            setupY = getRandomPosition(height);

            if (!mineBoard[setupY][setupX].isMine) {
                mineBoard[setupY][setupX].isMine = true;
                setupMines++;
            }
        }

        return mineBoard;
    };

    const countBombs = (i, j, board) => {
        let count = 0;

         // top left
         if (i-1 > -1 && j-1 > -1 && board[i-1][j-1].isMine) {
            count++;
        }

        // up
        if (i-1 > -1 && board[i-1][j].isMine) {
            count++;
        }

        // top right
        if (i-1 > -1 && j+1 < width && board[i-1][j+1].isMine) {
            count++;
        }

        // left
        if (j-1 > -1 && board[i][j-1].isMine) {
            count++;
        }

        // right
        if (j+1 < width  && board[i][j+1].isMine) {
            count++;
        }

        // bottom left
        if (i+1 < height && j-1 > -1  && board[i+1][j-1].isMine) {
            count++;
        }

        // down 
        if (i+1 < height && board[i+1][j].isMine) {
            count++;
        }

        // bottom right
        if (i+1 < height && j+1 < width && board[i+1][j+1].isMine) {
            count++;
        }

        return count;
    };

    const startGame = () => {
        const initArr =  new Array(height).fill(0).map(() => new Array(width).fill(0));
        let initBoardArr = initArr.map((item, i) => {
            return item.map((innerItem, j) => {
                return {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false
                }
            });
        });

        initBoardArr = setupBombs(initBoardArr);

        let neighborBoard = initBoardArr.map((iItem, i) => {
            return iItem.map((jItem, j) => {
                let number = initBoardArr[i][j].isMine ? 9 : countBombs(i, j, initBoardArr);
    
                return {
                    ...initBoardArr[i][j],
                    neighbour: number,
                    isEmpty: number === 0
                }
            })
        });

        console.log('@@!!neighborBoard', neighborBoard);

        return neighborBoard;
    };

    return (
        <BoardPlayground width={width} height={height}/>  
    )
};

BoardContent.propTypes = {
    width: number,
    height: number,
    mines: number
};

export default BoardContent;
