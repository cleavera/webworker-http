export class JSONResponse {
    headers: Headers;
    status: number;
    body: any;

    constructor(response: Response) {
        this.headers = response.headers;
        this.status = response.status;
        this.body = response.json();
    }
}