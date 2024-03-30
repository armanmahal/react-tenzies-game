import React from 'react'
import Dice from './components/dice.js'
import { nanoid } from 'nanoid'  //generates a unique random id that you can use



export default function App() {

    function allNewDice() {
        const array = []
        let i = 0;

        for (i = 0; i < 10; i++) {
            let x = Math.floor((Math.random() * 6) + 1)
            array.push({
                value: x,
                isHeld: false,
                id: nanoid()
            })
        }

        return array
    }

    const [numbers, setNumbers] = React.useState(allNewDice())

    const diceElements = numbers.map(function whatever(currentVal) {
        return (
            <Dice
                key={currentVal.id}
                id={currentVal.id}
                value={currentVal.value}
                selected={currentVal.isHeld}
                hold={() => holdDice(currentVal.id)}
            />
        )
    })

    function changeNumbers() {
        setNumbers((prevNumbers) => {
            return (
                prevNumbers.map((dice)=>{
                    return(
                        dice.isHeld === true ? dice : {
                            value: Math.floor((Math.random() * 6) + 1),
                            isHeld: false,
                            id: nanoid()
                        }
                    )
                })
            )
        })
    }

    function holdDice(id) {
        setNumbers((prevNumbers) => {
            return (
                prevNumbers.map((dice) => {
                    return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
                })
            )

        })
    }

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = numbers.every( (number) => {
            return (number.isHeld)
        })
        const firstvalue = numbers[0].value
        const allsamevalue = numbers.every((number) => {
            return (number.value)
        })

        if (allHeld && allsamevalue){
            setTenzies(true)
            console.log("YOU WIN")
        }
    }, [numbers])

    function restart(){
        setNumbers(allNewDice())
        setTenzies(false)
    }

    return (
        <main>
            <div className='dice-container'>
                {diceElements}
            </div>

            <button onClick={tenzies === true ? restart : changeNumbers} className='change-button'>
                {tenzies === true ? "YOU WON! restart?" : "ROLL"}
            </button>

        </main>
    )
}