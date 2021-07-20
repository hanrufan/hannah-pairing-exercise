import React, { useState } from 'react';
import BoardContent from '../BoardContent';
import { useBoardContext } from '../../context/BoardContext';
import { RESETGAME } from '../../constants';
import './Main.css';

const Main = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mines, setMines] = useState(0);
    const [showGame, setShowGame] = useState(false);
    const { gameIsOver, boardDispatch } = useBoardContext();

    const startGame = () => {
        if (width && height && mines) {
            setShowGame(true);
        }
    };

    const reset = () => {
        setWidth(0);
        setHeight(0);
        setMines(0);
        setShowGame(false);

        boardDispatch({
            type: RESETGAME
        });
    };

    return (
        <div className='c-main'>
            <div className='c-input'>
                <label className='c-input--label'>Width</label>
                <input 
                    name='width' 
                    type='number'
                    value={width}
                    className='c-input--input'
                    placeholder='Please type a number for width'
                    onChange={e => setWidth(Number(e.target.value))}
                    disabled={showGame}
                />
            </div>

            <div className='c-input'>
                <label className='c-input--label'>Height</label>
                <input 
                    name='height' 
                    type='number'
                    value={height}
                    className='c-input--input'
                    placeholder='Please type a number for height'
                    onChange={e => setHeight(Number(e.target.value))}
                    disabled={showGame}
                />
            </div>

            <div className='c-input'>
                <label className='c-input--label'>Mines</label>
                <input 
                    name='mines' 
                    type='number'
                    value={mines}
                    className='c-input--input'
                    placeholder='Please type a number for creating mines'
                    onChange={e => setMines(Number(e.target.value))}
                    disabled={showGame}
                />
            </div>

            {
                gameIsOver ? 
                (
                    <div className='c-input'>
                        <button
                            className='c-input--btn c-input--btn-primary'
                            onClick={reset}>
                                Reset Game
                        </button>
                    </div>
                ) : null
            }

            {
                showGame ?
                <BoardContent width={width} height={height} mines={mines}/> :
                (
                    <div className='c-input'>
                        <button 
                            className='c-input--btn c-input--btn-primary'
                            onClick={startGame} 
                            disabled={width === 0 || height === 0 || mines === 0}>
                                Start Game
                        </button>
                    </div>
                )
            }
        </div>
    )
}

Main.propTypes = {

}

export default Main
