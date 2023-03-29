import { List } from './List.js';
import { NonExistentLink, InvalidValue, ExistingValue } from './Errors.js';
export class Graph {
    constructor() {
        this.vertices = new Map();
    }
    addVertex(vertex) {
        if (this.vertices.get(vertex)) {
            throw new ExistingValue(`Заданная вершина ${vertex} уже существует`);
        }
        this.vertices.set(vertex, new List());
        return this;
    }
    addEdge(vertex1, vertex2, weight) {
        var _a, _b;
        if (weight < 0) {
            throw new InvalidValue(` ${weight} - Недопустимый вес графа`);
        }
        if (!this.vertices.get(vertex1) || !this.vertices.get(vertex2)) {
            throw new NonExistentLink(`Заданной(-ых) вершины(вершин) не существует`);
        }
        (_a = this.vertices.get(vertex1)) === null || _a === void 0 ? void 0 : _a.add(vertex2, weight);
        (_b = this.vertices.get(vertex2)) === null || _b === void 0 ? void 0 : _b.add(vertex1, weight);
        return this;
    }
    printGraph() {
        for (let entry of this.vertices) {
            console.log(entry);
        }
    }
    removeVertex(vertex) {
        var _a;
        if (!this.vertices.get(vertex)) {
            throw new NonExistentLink("Заданной вершины не существует");
        }
        let neighbors = this.vertices.get(vertex);
        let node = neighbors === null || neighbors === void 0 ? void 0 : neighbors.head;
        while (node != null) {
            (_a = this.vertices.get(node.vertex)) === null || _a === void 0 ? void 0 : _a.delete(vertex);
            node = node.next;
        }
        this.vertices.delete(vertex);
        return this;
    }
    removeEdge(vertex1, vertex2) {
        var _a, _b;
        if (!this.vertices.get(vertex1) || !this.vertices.get(vertex2)) {
            throw new NonExistentLink("Заданной(-ых) вершины(вершин) не существует");
        }
        (_a = this.vertices.get(vertex1)) === null || _a === void 0 ? void 0 : _a.delete(vertex2);
        (_b = this.vertices.get(vertex2)) === null || _b === void 0 ? void 0 : _b.delete(vertex1);
        return this;
    }
    minDistance(distances, vizited) {
        let minDistance = Infinity;
        let vertex = null;
        for (let v in distances) {
            if (distances[v] < minDistance && !vizited.includes(v)) {
                minDistance = distances[v];
                vertex = v;
            }
        }
        return vertex;
    }
    dijkstra(startVertex, endVertex) {
        if (!this.vertices.get(startVertex) || !this.vertices.get(endVertex)) {
            throw new NonExistentLink("Заданной(-ых) вершины(вершин) не существует");
        }
        let distances = {};
        let vizited = [];
        for (let i of this.vertices.keys()) {
            if (i == startVertex) {
                distances[i] = 0;
            }
            else {
                distances[i] = Infinity;
            }
        }
        let currentVertex = this.minDistance(distances, vizited);
        while (currentVertex != null) {
            let neighbors = this.vertices.get(currentVertex);
            let node = neighbors === null || neighbors === void 0 ? void 0 : neighbors.head;
            while (node != null) {
                let newDistance = distances[currentVertex] + node.weight;
                if (distances[node.vertex] > newDistance) {
                    distances[node.vertex] = newDistance;
                }
                node = node.next;
            }
            vizited.push(currentVertex);
            currentVertex = this.minDistance(distances, vizited);
        }
        return distances;
    }
}
//# sourceMappingURL=Graph.js.map