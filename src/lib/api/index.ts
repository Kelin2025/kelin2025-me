type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const req = <T extends {}>(method: Method, path: string, body: T) => {
  return fetch(`https://kelin2025.me/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    ...(method !== "GET" ? { body: JSON.stringify(body) } : {})
  }).then(r => r.json());
};

export const createReq = <T extends {}>(method: Method, path: string) => (
  body: T
) => req(method, path, body);
