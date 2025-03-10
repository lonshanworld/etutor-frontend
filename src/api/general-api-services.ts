async function fetchData(method: string, apiString?: string, body? : any) : Promise<any> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
        {
            method : method,
            body: body ? JSON.stringify(body) : undefined
        }
    )

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
}

export function GetRequest(apiString? : string) : Promise<any>{
    return fetchData("GET", apiString);
}

export function PostRequest(body : any, apiString? : string ) : Promise<any>{
    return fetchData("POST", apiString, body);
}