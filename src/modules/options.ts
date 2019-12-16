export interface Options<Body> {
    method: string;
    mode: "cors" | "same-origin" | "navigate" | "no-cors" | undefined;
    origin: boolean;
    credentials: "include" | "omit" | "same-origin" | undefined;
    body: Body | undefined;
}
