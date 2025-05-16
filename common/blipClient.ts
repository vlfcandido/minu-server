import axios from 'axios';
import { BlipMessage } from './types';

export class BlipClient {
  private apiKey: string;
  private baseUrl = 'https://msging.net';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getActiveMessages(contractId: string): Promise<BlipMessage[]> {
    const url = `${this.baseUrl}/messages/active?contract=${contractId}`;
    const { data } = await axios.get<{ items: BlipMessage[] }>(url, {
      headers: { Authorization: `Key ${this.apiKey}` }
    });
    return data.items;
  }
}

export const blipClient = new BlipClient(process.env.BLIP_API_KEY!);
