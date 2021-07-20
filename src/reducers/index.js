import { STARTGAME, CLICKBRICK, CLICKEMPTYBRICK, RESETGAME } from '../constants';

export default function(state, action) {
    switch (action.type) {
        case CLICKBRICK:
            const triggerItem = action.triggerItem;
            let board = state.boardArr;
            board[action.i][action.j].isRevealed = true;

            return !state.gameIsOver ? { 
                ...state, 
                result: triggerItem.isMine ? ' Game over!' : state.result,
                gameIsOver: triggerItem.isMine,
                boardArr: board,
                displayAll: triggerItem.isMine
            } : state;

        case CLICKEMPTYBRICK:
            let updateBoard = action.updateBoard;
            updateBoard[action.i][action.j].isRevealed = true;

            return { ...state, boardArr: updateBoard };

        case STARTGAME:
            return { ...state, boardArr: action.board };

        case RESETGAME:
            return {
                boardArr: null,
                result: 'Game is on progress!',
                displayAll: false, 
                gameIsOver: false
            };

        default:
            return state;
    }
};