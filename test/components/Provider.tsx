import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const Provider = (props: React.PropsWithChildren) => {
  return <QueryClientProvider client={client}>{props.children}</QueryClientProvider>;
};

export default Provider;
