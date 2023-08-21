import axios, { AxiosRequestConfig } from 'axios';

const requestConfig: AxiosRequestConfig = {
  baseURL: process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const apiClient = axios.create(requestConfig);

export default async function Home() {
  const messageRequest = await apiClient.get('/v1/greet');

  return (
    <main>
      <h1>Gurt</h1>
      Message:{' '}
      {messageRequest?.data?.data
        ? JSON.stringify(messageRequest.data.data)
        : ''}
    </main>
  );
}