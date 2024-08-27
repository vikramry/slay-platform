import { getCookie } from "cookies-next";

export async function serverFetch(query:string, variables:any, options:any) {
  try {
    const data = await fetch(
      `/api/graphql`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "profile": "SystemAdmin",
          "Authorization": getCookie("session") || undefined
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        ...options
      }
    );
    let parseData = await data.json();
    
    if (parseData?.errors) {
      return { error: parseData?.errors[0] };
    }
    return parseData?.data;
  } catch (error) {
    return { error: error}
  }
}