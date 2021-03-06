const playerNames = document.querySelectorAll(".player-name")   // selects both input boxes
const playerOneForm = document.querySelector(".player-one")
const playerTwoForm = document.querySelector(".player-two")
let playerOne = {}
let playerTwo = {}


/*  Change inputs to player names with "Enter" */
Array.from(playerNames).forEach(player => {
    player.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault()      // prevents page refresh
            
            
            if (player.id == 1) {
                playerOne = Object.create(Player(player.value))

                playerOneForm.style.display = 'none'
                const playerOneName = document.createElement('h2')
                playerOneName.textContent = playerOne.name
                playerOneName.style.color = 'red'
                playerOneName.classList.add('versus-fix')

                playerOneForm.replaceWith(playerOneName)
            }
            if (player.id == 2) {
                playerTwo = Object.create(Player(player.value))

                playerTwoForm.style.display = 'none'
                const playerTwoName = document.createElement('h2')
                playerTwoName.textContent = playerTwo.name
                playerTwoName.style.color = 'red'
                playerTwoName.classList.add('versus-fix')

                playerTwoForm.replaceWith(playerTwoName)

            }
        }
    })
})

// Player Factory Function
const Player = (name) => {

    const getName = () => {
        console.log(name)
    }
    return {
        name,
        getName,
    }
}


// Clears input box values on window refresh
function init() {
    Array.from(playerNames).forEach(player => {
        player.value = ''
    })
}

// displayController Module
const displayController = (() => {

    const container = document.querySelector(".container").children
    const bottomDiv = document.querySelector(".results")
    const motivation = document.querySelector(".motivation")
    const title = document.querySelector(".title")

    let isXTurn = true;
    let XArray = []
    let OArray = []


// function runs when user takes a turn (clicks on a box)
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

        if (XArray.length >= 3) checkWin()

    }

// checks for win conditions and determines tie after 9 turns 
    const checkWin = () => {

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

// add mouse-over-box hover styling
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

// remove mouse-over-box hover styling
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


// Event listeners for taking a turn, and hover events
    Array.from(container).forEach(div => {              // need to convert HTMLCollection to array before using forEach --> normal 'for' loop and for/of loop works as well
        div.addEventListener('mouseup', takeTurn)       // REMEMBER: event is automatically passed to function
        div.addEventListener('mouseover', addHover)
        div.addEventListener('mouseout', removeHover)
    })
    

    return {};
})();



displayController
window.onload = init;

