const Gameboard = (() => {
    let gameboard = []
    const container = document.querySelector(".container").children
    
    for (i=0; i<container.length; i++) {
        gameboard.push(container[i])
    }

    console.log(gameboard, container)
    
})()


const Player = name => {                    // Factory Function
    const getName = () => console.log(name)
    return {
        getName,
    }
}


const displayController = (() => {
    return {};
})();

// const calculator = (() => {              // Module
//     const add = (a, b) => a + b;
//     const sub = (a, b) => a - b;
//     const mul = (a, b) => a * b;
//     const div = (a, b) => a / b;
//     return {
//       add,
//       sub,
//       mul,
//       div,
//     };
//   })();

Gameboard
let player1 = Player('player1')
let player2 = Player('player2')

player1.getName()
player2.getName()

