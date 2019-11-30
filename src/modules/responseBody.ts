export interface MyResponse {
    body: ResponseBody;
}

export interface ResponseBody {
    user: unknown;
    users: unknown;
    token: string | null | undefined;
    message: string | null | undefined;
}

export interface ResponseUser {
    avatar_path: string;
    name: string;
    id: number;
}
