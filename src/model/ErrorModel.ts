export type ErrorModel = {
    errorCode: number;
    errorText: string;
  };
  
export function isErrorModel(response: any): response is ErrorModel {
    return (
      response &&
      typeof response.errorCode === 'number' &&
      typeof response.errorText === 'string'
    );
  }
  