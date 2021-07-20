import React from 'react';
import { Frown } from 'react-feather';
import { number } from 'prop-types';
import { useBoardContext } from '../../context/BoardContext';
import { CLICKBRICK, CLICKEMPTYBRICK } from '../../constants';
import './BoardPlayground.scss';

const BoardPlayground = ({width, height}) => {
    const { boardArr, result, displayAll, boardDispatch } = useBoardContext();

    const emptyArea = (i, j, board) => {
        let checkArr = [];

        // top left
        if (i-1 > -1 && j-1 > -1) {
            checkArr.push(board[i-1][j-1]);
        }

        // up
        if (i-1 > -1) {
            checkArr.push(board[i-1][j]);
        }

        // top right
        if (i-1 > -1 && j+1 < width) {
            checkArr.push(board[i-1][j+1]);
        }

        // left
        if (j-1 > -1) {
            checkArr.push(board[i][j-1]);
        }

        // right
        if (j+1 < width) {
            checkArr.push(board[i][j+1]);
        }

        // bottom left
        if (i+1 < height && j-1 > -1) {
            checkArr.push(board[i+1][j-1]);
        }

        // down 
        if (i+1 < height) {
            checkArr.push(board[i+1][j]);
        }

        // bottom right
        if (i+1 < height && j+1 < width) {
            checkArr.push(board[i+1][j+1]);
        }

        return checkArr;
    };

    const discoverEmptyArea = (i, j, board) => {
        let area = emptyArea(i, j, board);
        
        area.map(item => {
            if (!item.isRevealed && (item.isEmpty || !item.isMine)) {
                board[item.x][item.y].isRevealed = true;
                
                if (item.isEmpty) {
                    discoverEmptyArea(item.x, item.y, board);
                }
            }
        });

        return board;
    };

    const handleDispatch = (i, j) => {
        const triggerItem = boardArr[i][j];
        let tempBoard = boardArr;

        if (triggerItem.isEmpty) {
            let updateBoard = discoverEmptyArea(i, j, tempBoard);

            boardDispatch({ 
                type: CLICKEMPTYBRICK,
                updateBoard,
                i,
                j
            });
        } else {
            boardDispatch({ 
                type: CLICKBRICK,
                triggerItem,
                i,
                j
            });
        }
    };
   
    const getText = (item) => {      
        const {neighbour, isMine, isRevealed} = item;
        let text = isMine ? <Frown/> : <span className='c-playground__btn--revealed'>{neighbour}</span>;

        return isRevealed || displayAll ? text : <span>?</span>;
    };

    return (
        <div>
            <div className='c-result'>
                {result}
<<<<<<< HEAD
            </div>
            <div className='c-playground'>
                {
                    boardArr ?
                    boardArr.map((iItem, i) => {
                        const widthItem = iItem.length;
                        return iItem.map((jItem, j) => {
                            const item = boardArr[i][j];
                            const btnItem = `btn-${i}-${j}`;
                            const eleItem = `element-${i}-${j}`;

                            return (
                                <div key={eleItem} className='c-playground__content'>
                                    <button
                                        onClick={() => handleDispatch(i, j)}
                                        key={btnItem}
                                        className='c-playground__btn'
                                    >
                                        {getText(item)}
                                    </button>
                                    { 
                                        j === widthItem - 1 ? <br/> : null
                                    }
                                </div>
                            );
                        })
                    }) :
                    null
                }
            </div>
=======
            </div>
            
            {
                boardArr ?
                boardArr.map((iItem, i) => {
                    const widthItem = iItem.length;
                    return iItem.map((jItem, j) => {
                        const item = boardArr[i][j];
                        const btnItem = `btn-${i}-${j}`;
                        const eleItem = `element-${i}-${j}`;

                        return (
                            <div key={eleItem} className='c-playground'>
                                <button
                                    onClick={() => handleDispatch(i, j)}
                                    key={btnItem}
                                    className='c-playground__btn'
                                >
                                    {getText(item)}
                                </button>
                                { 
                                    j === widthItem - 1 ? <br/> : null
                                }
                            </div>
                        );
                    })
                }) :
                null
            }
>>>>>>> c6acd44ff57601143998641e86fca00c7100966d
        </div>
    )
}

BoardPlayground.propTypes = {
    width: number,
    height: number,
}

export default BoardPlayground
