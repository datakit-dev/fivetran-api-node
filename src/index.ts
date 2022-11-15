import './fetch_polyfill';
import { Client } from './client'

const { FIVETRAN_API_KEY, FIVETRAN_API_SECRET } = process.env

const client = new Client(FIVETRAN_API_KEY, FIVETRAN_API_SECRET)
export const Fivetran = {
    ...client.operations,
};