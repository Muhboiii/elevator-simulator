
// Sets the travel time per floor
const FLOOR_TRAVEL_TIME = 10;

// Used to retrieve user input from terminal/command line arguments. Returns an initialFloor as int and floors as Array<int>.
function getUserInput() {
    const userInput = process.argv.slice(2);
    
    let initialFloor = null;
    let floors = null;
    
    // Gets user input
    userInput.forEach((input) => {
        if (input.includes('start')) {
            try {
                initialFloor = parseInt(input.slice(6));
            } catch (e) {
                console.error(`Error: Issue with parseing initial floor. How to use: node elevatorSimulater.js start=12 floors=2,9,1,32`);
            }
        } 
        else if (input.includes('floors')) {
            try {
                let floorArrayStr = input.slice(7);
                let floorArray = floorArrayStr.split(',').map((value) => {
                    return parseInt(value);
                });
                floors = floorArray;
                
            } catch (e) {
                console.error(`Error: Issue with parseing floors. How to use: node elevatorSimulater.js start=12 floors=2,9,1,32`);
            }
        }
    });
    
    if (!initialFloor || !floors) {
        throw new Error('Error: Issue with parseing floors. How to use: node elevatorSimulater.js start=12 floors=2,9,1,32')
    }
    
    return { initialFloor: initialFloor, floors: floors }
}

// Used to simulate elevator movement. Returns totalTravelTime as int and visitedFloors as Array<int>.
function elevatorSimulater(simulatorData){
    const {initialFloor, floors} = simulatorData;
    
    let visitedFloors = [initialFloor, ...floors];
    
    let totalTravelTime = 0;
    for (let i = 1; i < visitedFloors.length; i++) {
        // Get floor diffrence and multiply against floor travel time constant
        totalTravelTime += Math.abs((visitedFloors[i] - visitedFloors[i - 1] ) * FLOOR_TRAVEL_TIME);
    }
    
    return {totalTravelTime: totalTravelTime, visitedFloors: visitedFloors}
}


try {
    let simulatorResult = elevatorSimulater(getUserInput());
    console.log(`${simulatorResult.totalTravelTime} ${simulatorResult.visitedFloors.join(',')}`)
} catch (e) {
    console.log(e);
}
