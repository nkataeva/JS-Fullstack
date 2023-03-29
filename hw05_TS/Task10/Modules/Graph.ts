import {List} from './List.js';
import {NonExistentLink, InvalidValue, ExistingValue} from './Errors.js';

export interface Distances {
    [key: string]: number;
  }

export class Graph {
    vertices: Map<string, List>;
    constructor() {
        this.vertices = new Map();
    }

    addVertex(vertex: string) {
        if (this.vertices.get(vertex)) {
            throw new ExistingValue(`Заданная вершина ${vertex} уже существует`);
        }
        this.vertices.set(vertex, new List()); 
        return this;
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        if (weight < 0) {
            throw new InvalidValue(` ${weight} - Недопустимый вес графа`);
        }
        if (!this.vertices.get(vertex1) || !this.vertices.get(vertex2)) {
            throw new NonExistentLink(`Заданной(-ых) вершины(вершин) не существует`);
        }
        this.vertices.get(vertex1)?.add(vertex2, weight);
        this.vertices.get(vertex2)?.add(vertex1, weight);
        return this;
    }

    printGraph() {
        for (let entry of this.vertices) { 
            console.log(entry);
        }
    }

    removeVertex(vertex: string) {
        if (!this.vertices.get(vertex)) {
            throw new NonExistentLink("Заданной вершины не существует");
        } 
        let neighbors = this.vertices.get(vertex);
        let node = neighbors?.head;
            while(node != null) {
                this.vertices.get(node.vertex)?.delete(vertex);
                node = node.next;
            }
        this.vertices.delete(vertex);
        return this;
    }

    removeEdge(vertex1: string, vertex2:string) {
        if (!this.vertices.get(vertex1) || !this.vertices.get(vertex2)) {
            throw new NonExistentLink("Заданной(-ых) вершины(вершин) не существует");
        }
        this.vertices.get(vertex1)?.delete(vertex2);
        this.vertices.get(vertex2)?.delete(vertex1);
        return this;
    }


    // возвращает вершину с минимальным весом
    minDistance(distances: Distances, vizited: Array<string>) {
        let minDistance = Infinity;
        let vertex: string | null = null;
        for (let v in distances) {
            if (distances[v] < minDistance && !vizited.includes(v)) {
                minDistance = distances[v];
                vertex = v;
            }
        }
        return vertex;
    }

    dijkstra(startVertex: string, endVertex: string) {
        if (!this.vertices.get(startVertex) || !this.vertices.get(endVertex)) {
            throw new NonExistentLink("Заданной(-ых) вершины(вершин) не существует");
        }
        let distances: Distances = {};
        let vizited: string[] = [];

        // присвоить Infinity всем вершинам кроме начальной
        for (let i of this.vertices.keys()) {
            if (i == startVertex) {
                distances[i] = 0;
            } else {
                distances[i] = Infinity;
            }
        }

        let currentVertex = this.minDistance(distances, vizited);

        while(currentVertex != null) {
            let neighbors = this.vertices.get(currentVertex);
            let node = neighbors?.head;
            while(node != null) {
                let newDistance = distances[currentVertex] + node.weight;
                if (distances[node.vertex] > newDistance) {
                    distances[node.vertex] = newDistance;
                }
                node = node.next;
            }
            vizited.push(currentVertex);
            currentVertex = this.minDistance(distances, vizited)
        }
        return distances;
    }
}

// "тест-драйв"
// let graph = new Graph();
// graph.addVertex("A").addVertex("B").addVertex("C").addVertex("D").addVertex("E").addVertex("F").addVertex("G");
// graph.addEdge("B","A", 1).addEdge("A","G", 1).addEdge("A","F", 7);
// graph.addEdge("F","E", 3).addEdge("B","F", 2);
// graph.addEdge("F","C", 6).addEdge("F", "D", 5);
// graph.addEdge("B","C", 2).addEdge("C","D", 4).addEdge("E","D", 10).addEdge("F", "G", 2);
// graph.printGraph();
// graph.dijkstra("A", "D");
// graph.removeVertex("F");
// graph.removeEdge("A", "G");
// graph.printGraph();