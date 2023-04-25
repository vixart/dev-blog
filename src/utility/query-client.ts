import { QueryClient, QueryCache } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ExpectedError {
  response: {
    data: {
      message: string
    }
  }
}

const isExpectedError = (error: any): error is ExpectedError => {
  return 'response' in error &&
    'data' in error.response &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_error, query) => {
      let queryError = query.state.error;
      let message = 'Something went wrong';
      if (isExpectedError(queryError)) {
        message = queryError.response.data.message
      }
      toast.error(message)
    }
  }),
})