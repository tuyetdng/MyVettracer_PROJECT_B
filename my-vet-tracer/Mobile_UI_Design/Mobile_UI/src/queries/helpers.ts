type ApiCall = (..._args: any[]) => Promise<any>;
// eslint-disable-next-line require-await
export async function responseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = [],
): Promise<T> {
  // eslint-disable-next-line no-async-promise-executor, promise/param-names
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.status >= 200 && response.status < 300) res(response.data);
      if (response?.originalError?.message === "CONNECTION_TIMEOUT") {
        console.log(
          "Connection timeout. Please check your network and try again.",
        );
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export interface ApiResponseListType<T> {
  code: number;
  result: T[];
  message?: string;
}
export interface ApiResponseType<T> {
  code: number;
  result: T;
  message?: string;
}
