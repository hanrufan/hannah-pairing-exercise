import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Frown } from 'react-feather';

const BoardButton = ({handleTrigger, value}) => {
    const {neighbour, isMine, isRevealed} = value;
    

    // useEffect(() => {
    //     console.log('useEffect!!');
    //     getText();
    // }, [value]);

    const getText = () => {
        console.log('neighbour, isMine, isRevealed:', neighbour, isMine, isRevealed);
        // const {neighbour, isMine, isRevealed} = value;

        if (isRevealed) {
            return neighbour;
        }

        // if (isMine) {
        //     return <Frown/>;
        // }
    };

    return (
        <>
            <button
                onClick={handleTrigger}
            >
                {getText()}
            </button>
        </>
    )
}

BoardButton.propTypes = {

}

export default BoardButton
