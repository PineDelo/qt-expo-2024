import { QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
    // onSuccess: (data) => {
    //   //   console.log(data);
    // },
    // onSettled: (data, error) => {
    //   //   console.log(data, error);
    // },
  }),
});
export { queryClient };
