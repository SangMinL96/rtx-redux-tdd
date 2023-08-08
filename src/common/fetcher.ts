export const fetcher = async (url: string) => {
  try {
    const baseUrl = "http://127.0.0.1:4444/api/v1";
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJubyI6IjAwNjk4NTE0Iiwid2ViX2lkIjoidGVzdDEiLCJ3aXRoX2lkIjoiaXdkNDM1OTkwIiwidXNlcl9ubyI6IjI2MDYwIiwiaWF0IjoxNjg5OTE5ODcyLCJleHAiOjE3Njg5NzU4NzJ9.Itbt0MuAP3if-y1omE63blIxzwA0SRh8fIxi_yed5Cs";
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    } as RequestInit;
    const res = await fetch(`${baseUrl}${url}`, options);
    if (!res.ok) {
      throw new Error(String("Fetcher Error"));
    }
    return await res.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};

const methodFetch = async (method: string, url: string, body?: any) => {
  try {
    const baseUrl = "http://127.0.0.1:4444/api/v1";
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJubyI6IjAwNjk4NTE0Iiwid2ViX2lkIjoidGVzdDEiLCJ3aXRoX2lkIjoiaXdkNDM1OTkwIiwidXNlcl9ubyI6IjI2MDYwIiwiaWF0IjoxNjg5OTE5ODcyLCJleHAiOjE3Njg5NzU4NzJ9.Itbt0MuAP3if-y1omE63blIxzwA0SRh8fIxi_yed5Cs";
    const options = {
      method,
      body,
      headers: { Authorization: `Bearer ${token}` },
    } as RequestInit;
    const res = await fetch(`${baseUrl}${url}`, options);
    if (!res.ok) {
      throw new Error(String("Fetcher Error"));
    }
    return await res.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};

export const execFetcher = {
  POST: (url: string, body?: any) => methodFetch("POST", url, body),
  PUT: (url: string, body?: any) => methodFetch("PUT", url, body),
  DELETE: (url: string, body?: any) => methodFetch("DELETE", url, body),
};
