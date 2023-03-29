import { Graph } from "./Modules/Graph.js";
import promptSync from "prompt-sync";
import { InvalidValue } from "./Modules/Errors.js";
let inputValues = function (graph) {
    const prompt = promptSync();
    let message = "Введите список городов и цен -> ";
    let regex = /^[a-zA-Z]*;[a-zA-Z]*=[0-9]*$/;
    let result;
    while (result != "") {
        result = prompt(message);
        if (!regex.test(result)) {
            if (/^[a-zA-Z]*;[a-zA-Z]*$/.test(result)) {
                let arr = result.split(";");
                return arr;
            }
            else {
                throw new InvalidValue("Неправильный ввод");
            }
        }
        else {
            let arr = result.split(/[;=]+/);
            let vertex1 = arr[0], vertex2 = arr[1], weight = Number(arr[2]);
            graph.addEdge(vertex1, vertex2, weight);
        }
    }
};
let graph = new Graph();
let cities = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
for (let i of cities) {
    try {
        graph.addVertex(i);
    }
    catch (err) {
        console.log(err.message);
    }
}
let arr;
;
try {
    arr = inputValues(graph);
}
catch (err) {
    console.log(err.message);
}
let distances = null;
try {
    distances = graph.dijkstra(arr[0], arr[1]);
}
catch (err) {
    console.log(err.message);
}
if (distances != null) {
    if (distances[arr[1]] === Infinity) {
        console.log("Undefined");
    }
    else {
        console.log(`Наименьшая стоимость дороги: ${distances[arr[1]]}`);
    }
}
else {
    console.log("Undefined");
}
//# sourceMappingURL=Main.js.map