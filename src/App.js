import Main from './components/Main';
import { BoardContextProvider } from './context/BoardContext';
import './App.css';

function App() {
    return (
        <div className="c-root">
            <h1>Minesweeper</h1>
            <BoardContextProvider>
                 <Main />
            </BoardContextProvider>
        </div>
    );
}

export default App;
