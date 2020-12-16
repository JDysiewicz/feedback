class SocketError {

    error: Error | string;
    message: string;

    constructor(error: Error | string, message: string){
        this.error = error;
        this.message = message;
    }
}

export default SocketError;