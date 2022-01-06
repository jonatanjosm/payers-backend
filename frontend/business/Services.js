import { IO } from './IO';

async function getService(data, endpoint, method) {
    return IO.query(data, endpoint, method);
}


export { 
    getService
}