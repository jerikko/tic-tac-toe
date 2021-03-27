const Gameboard = (() => {
    let gameboard = []
    const container = document.querySelector(".container").children
    
    for (i = 0; i < container.length; i++) {
        gameboard.push(container[i])
    }

    // console.log(gameboard, container)        // test
    
})()


const PlayerFactory = name => {                    // Factory Function
    const getName = () => console.log(name)
    return {
        getName,
    }
}


const displayController = (() => {                  // Module

    const container = document.querySelector(".container").children

    let isXTurn = true;

    const takeTurn = function(event) {

        let div = event.target
        div.style.background = '#595761'         
        if (isXTurn) {
            div.textContent = 'X'
        } else {
            div.textContent = 'O'
        }
        isXTurn = !isXTurn
        div.style.color = 'white'

        div.removeEventListener('mouseup', takeTurn)
    }


    Array.from(container).forEach(div => {              // need to convert HTMLCollection to array before using forEach --> normal 'for' loop and for/of loop works as well
        div.addEventListener('mouseup', takeTurn)       // REMEMBER: event is automatically passed to function
    })
    

    return {};
})();






Gameboard
displayController
let player1 = PlayerFactory('player1')
let player2 = PlayerFactory('player2')

// player1.getName()        // test
// player2.getName()        // test

