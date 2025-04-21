export default function ReportDropDownSelect(
    {
        selectedValue,
        valueList,
        onChange
    } : {
        selectedValue : string,
        valueList : string[],
        onChange : (value : string) => void,
    }
){

    function handler(e: any){
        const selectedValue = e.target.value;
        onChange(selectedValue);
        console.log('Selected:', selectedValue);
    }

    return (
        <div className="w-full">
            <select
            value={selectedValue}
            onChange={handler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-theme focus:border-theme block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-theme dark:focus:border-theme">
                {/* <option defaultValue="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option> */}
                {
                    valueList.map((item, index)=>(
                        <option key={index} value={item} className="">{item}</option>
                    ))
                }
            </select>
        </div>
    );
}