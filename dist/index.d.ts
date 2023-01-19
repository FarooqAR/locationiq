import { AxiosInstance } from 'axios';
import { LocationIqSearchRequest, LocationIqSearchResponse } from './search';
import { LocationIqReverseRequest, LocationIqReverseResponse } from './reverse';
export interface LocationIqOptions {
    key: string;
    region?: string;
    timeout?: number;
    format?: string;
}
export declare class LocationIq {
    private key;
    region: string;
    basePath: string;
    timeout: number;
    request: AxiosInstance;
    format: string;
    constructor(options: LocationIqOptions);
    search(searchParams: LocationIqSearchRequest | string): Promise<LocationIqSearchResponse>;
    reverse(options: LocationIqReverseRequest): Promise<LocationIqReverseResponse>;
}
