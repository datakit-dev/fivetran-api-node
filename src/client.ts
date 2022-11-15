import { fivetranApiSpec } from './fivetran_api_spec';
import { paths } from './fivetran_api_types'
import { Fetcher } from 'openapi-typescript-fetch'
import { operations } from './operations'

class Client {
    private fetcher: any;
    public operations: { [key: string]: any };
    constructor(
        readonly apiKey: string | undefined,
        readonly apiSecret: string | undefined,
    ) {
        if (!apiKey || !apiSecret) throw new Error('Fivetran API key and secret are required');
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.fetcher = Fetcher.for<paths>();
        this.fetcher.configure({
            baseUrl: fivetranApiSpec.servers[0].url,
            init: {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`,
                }
            }
        });
        this.operations = operations(this.fetcher);
    }
}

export { Client };