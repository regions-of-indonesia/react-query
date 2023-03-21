import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useProvinces } from "./regions-of-indonesia";

const AsyncComponent = () => {
  const { data } = useProvinces();

  return (
    <div>
      {data?.map((item) => {
        return (
          <div data-testid={`code-${item.code}`} key={item.code}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

const client = new QueryClient();
const Component = () => {
  return (
    <QueryClientProvider client={client}>
      <AsyncComponent />
    </QueryClientProvider>
  );
};

export default Component;
