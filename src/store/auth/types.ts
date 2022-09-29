import {ExternalState} from "../types/stateTypes";

export interface AuthState extends ExternalState {
    authenticated: boolean;
    expiresAt: string;
    tokenType: string;

    // For requesting accessToken
    authCode: string

    // For accessing resources on server
    accessToken: string;

    // For requesting a new accessToken
    refreshToken: string;
}