const Gameboard = (() => {
    let gameboard = []
    const container = document.querySelector(".container").children
    
    for (i = 0; i < container.length; i++) {
        gameboard.push(container[i])
    }

    console.log(gameboard, container)
    
})()


const PlayerFactory = name => {                    // Factory Function
    const getName = () => console.log(name)
    return {
        getName,
    }
}


const displayController = (() => {                  // Module

    const container = document.querySelector(".container").children


    Array.from(container).forEach(div => {           // need to convert HTMLCollection to array before using forEach
        div.addEventListener('click', () => {        // normal 'for' loop works as well
            div.style.background = 'white'           // for/of loops also works
            div.textContent = 'X'
        })
    })
    

    return {};
})();






Gameboard
displayController
let player1 = PlayerFactory('player1')
let player2 = PlayerFactory('player2')

player1.getName()
player2.getName()

