const Gameboard = (() => {
    let gameboard = []
    const container = document.querySelector(".container").children
    
    for (i = 0; i < container.length; i++) {
        gameboard.push(container[i])
    }

    // console.log(gameboard, container)        // test

    return {
        gameboard,
    }
    
})()


const PlayerFactory = name => {                    // Factory Function
    const getName = () => console.log(name)
    return {
        getName,
    }
}


const displayController = (() => {                  // Module

    const container = document.querySelector(".container").children
    const bottomDiv = document.querySelector(".results")
    const motivation = document.querySelector(".motivation")
    const title = document.querySelector(".title")

    let isXTurn = true;
    let XArray = []
    let OArray = []

    // const winningArrays = [
    //     [1,2,3],                // 6
    //     [1,5,9],                // 15
    //     [1,4,7],                // 12
    //     [2,5,8],                // 15
    //     [3,6,9],                // 18
    //     [3,5,7],                // 15
    //     [4,5,6],                // 15
    //     [7,8,9]                 // 24
    // ]

    const takeTurn = function(event) {

        let div = event.target
        div.style.background = '#595761'
        div.style.cursor = 'default'      
        if (isXTurn) {
            div.textContent = 'X'
            div.style.fontSize = '3.3rem'
            div.style.textAlign = 'center'
            div.style.verticalAlign = 'middle'
            div.style.lineHeight = '150px'
            div.style.color = 'whitesmoke'
            div.style.background = '#000d40'
            div.style.borderColor = '#000d40'
            XArray.push(Number(div.classList.toString().slice(-1)))
        } else {
            div.textContent = 'O'
            div.style.fontSize = '3.3rem'
            div.style.textAlign = 'center'
            div.style.verticalAlign = 'middle'
            div.style.lineHeight = '150px'
            div.style.color = '#000d40'
            div.style.background = 'whitesmoke'
            div.style.borderColor = 'whitesmoke'
            OArray.push(Number(div.classList.toString().slice(-1)))
        }
        isXTurn = !isXTurn

        div.removeEventListener('mouseup', takeTurn)
        div.removeEventListener('mouseover', addHover)
        div.removeEventListener('mouseout', removeHover)

        /*if (XArray.length >= 3)*/ checkWin()

    }

    const checkWin = () => {
        console.log('X -->', XArray, ' | O -->', OArray)

        let XWins
        let OWins
        let tieCondition
        let isGameEnd
        let turnTotal = XArray.length + OArray.length


        // X win conditions
        if (XArray.includes(1)) {
            if (XArray.includes(2) && XArray.includes(3)) XWins = true
            if (XArray.includes(5) && XArray.includes(9)) XWins = true
            if (XArray.includes(4) && XArray.includes(7)) XWins = true
        }

        if (XArray.includes(2)) {
            if (XArray.includes(5) && XArray.includes(8)) XWins = true
        }

        if (XArray.includes(3)) {
            if (XArray.includes(5) && XArray.includes(7)) XWins = true
            if (XArray.includes(6) && XArray.includes(9)) XWins = true
        }

        if (XArray.includes(4)) {
            if (XArray.includes(5) && XArray.includes(6)) XWins = true
        }

        if (XArray.includes(7)) {
            if (XArray.includes(8) && XArray.includes(9)) XWins = true
        }


        // O win conditions
        if (OArray.includes(1)) {
            if (OArray.includes(2) && OArray.includes(3)) OWins = true
            if (OArray.includes(5) && OArray.includes(9)) OWins = true
            if (OArray.includes(4) && OArray.includes(7)) OWins = true
        }

        if (OArray.includes(2)) {
            if (OArray.includes(5) && OArray.includes(8)) OWins = true
        }

        if (OArray.includes(3)) {
            if (OArray.includes(5) && OArray.includes(7)) OWins = true
            if (OArray.includes(6) && OArray.includes(9)) OWins = true
        }

        if (OArray.includes(4)) {
            if (OArray.includes(5) && OArray.includes(6)) OWins = true
        }

        if (OArray.includes(7)) {
            if (OArray.includes(8) && OArray.includes(9)) OWins = true
        }


        if (XWins || OWins) {

            isGameEnd = true
            Array.from(container).forEach(div => {
                div.removeEventListener('mouseup', takeTurn)
                div.removeEventListener('mouseover', addHover)       
                div.removeEventListener('mouseout', removeHover)     
            })

        }

        if (XWins) {
            console.log('X wins!')
            title.textContent = 'X wins!'
        } else if (OWins) {
            console.log('O wins!')
            title.textContent = 'O wins!'
        } else if (!XWins && !OWins) {
            tieCondition = true
        }

        if (tieCondition && turnTotal == 9) {
            isGameEnd = true
            Array.from(container).forEach(div => {
                div.removeEventListener('mouseup', takeTurn)
                div.removeEventListener('mouseover', addHover)   
                div.removeEventListener('mouseout', removeHover)         
            })

            title.textContent = "Tie game!"

        }

        if (isGameEnd) {
            const resetButton = document.createElement('button')
            resetButton.classList.add('reset')
            resetButton.textContent = 'New game'
            resetButton.style.color = 'red'
            resetButton.style.font = 'inherit'
            resetButton.style.type = 'button'
            resetButton.style.cursor = 'pointer'
            bottomDiv.appendChild(resetButton)

            motivation.style.display = 'none'

            resetButton.addEventListener('mouseup', () => {
                console.log('test')
                isXTurn = true;
                XArray = []
                OArray = []
                Array.from(container).forEach(div => {              // need to convert HTMLCollection to array before using forEach --> normal 'for' loop and for/of loop works as well
                    div.addEventListener('mouseup', takeTurn)       // REMEMBER: event is automatically passed to function
                    div.addEventListener('mouseover', addHover)
                    div.addEventListener('mouseout', removeHover)
                    div.textContent = ''
                    div.style.background = 'whitesmoke'
                    div.style.borderColor = 'whitesmoke'

                    motivation.style.display = 'inline'
                    resetButton.style.display = 'none'
                    title.textContent = 'Tic-Tac-Toe'
                })

            })

        }

    }

    const addHover = event => {
        let div = event.target
        div.style.cursor = 'pointer'
        if (isXTurn) {
            div.textContent = 'X'
            div.style.fontSize = '3.3rem'
            div.style.textAlign = 'center'
            div.style.verticalAlign = 'middle'
            div.style.lineHeight = '150px'
            div.style.color = 'whitesmoke'
            div.style.background = '#000d40'
            div.style.borderColor = '#000d40'
        } else if (!isXTurn) {
            div.textContent = 'O'
            div.style.fontSize = '3.3rem'
            div.style.textAlign = 'center'
            div.style.verticalAlign = 'middle'
            div.style.lineHeight = '150px'
            div.style.color = '#000d40'
            div.style.background = 'whitesmoke'
            div.style.background = 'whitesmoke'
        }
    }

    const removeHover = event => {
        let div = event.target
        div.style.cursor = 'default'
        if (!isXTurn) {
            div.style.background = 'whitesmoke'
        } else {
            div.style.background = '#000d40'
        }
        div.textContent = ''
        div.style.background = 'whitesmoke'
        div.style.borderColor = 'whitesmoke'
    }



    Array.from(container).forEach(div => {              // need to convert HTMLCollection to array before using forEach --> normal 'for' loop and for/of loop works as well
        div.addEventListener('mouseup', takeTurn)       // REMEMBER: event is automatically passed to function
        div.addEventListener('mouseover', addHover)
        div.addEventListener('mouseout', removeHover)
    })
    

    return {};
})();






Gameboard
displayController
let player1 = PlayerFactory('player1')
let player2 = PlayerFactory('player2')

// player1.getName()        // test
// player2.getName()        // test

