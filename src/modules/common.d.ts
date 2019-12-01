declare module "common-api" {
    export interface StandartJSONResponseData {
        message: "ok" | "error";
    }

    export type StandartJSONResponse<T> = StandartJSONResponseData & T;
}
