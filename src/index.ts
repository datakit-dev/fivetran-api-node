import './fetch_polyfill';
import { Client } from './client'

interface Args {
    apiKey: string;
    apiSecret: string;
}

export const FivetranAPI = (args: Args) => {
    let client: Client;
    if (args && args.apiKey && args.apiSecret) {
        client = new Client(args.apiKey, args.apiSecret);
    } else if (process.env.FIVETRAN_API_KEY && process.env.FIVETRAN_API_SECRET) {
        client = new Client(process.env.FIVETRAN_API_KEY, process.env.FIVETRAN_API_SECRET);
    } else {
        throw new Error('Fivetran API key and secret are required');
    }
    return client.operations;
};