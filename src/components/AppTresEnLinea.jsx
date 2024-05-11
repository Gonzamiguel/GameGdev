import { useState } from 'react';
import '../index.css'
import confetti from 'canvas-confetti'
import { Square } from './Square.jsx'
import { TURNS } from '../constants/constantTicTacToe.jsx'
import { checkWinner, checkEndGame } from '../utils/logicTicTacToe.jsx'
import { WinnerModalTicTacToe } from './WinnerModalTicTacToe.jsx';
import Title from './Title.jsx';

export function AppTresEnLinea() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)


    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }


    const updateBoard = (index) => {

        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }

    }

    return (
        <main className="board">
            <Title title={"Tres en linea"}/>
            <button onClick={resetGame}>Resetar juego</button>
            <section className='game gradient-text-1'>
                {
                    board.map((square, index) => (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    ))
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>

            <WinnerModalTicTacToe resetGame={resetGame} winner={winner} />

        </main>
    )
}


