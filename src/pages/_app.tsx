import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import {
  Hydrate,
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/utility/query-client';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer style={{ width: "500px" }} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
