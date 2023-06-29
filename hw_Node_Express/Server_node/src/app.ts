import http from "http";
import { handleRequest } from './requestHandler';

const port = 3000;

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})