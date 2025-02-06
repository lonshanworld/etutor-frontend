import { Provider } from "react-redux";
import Store from "./store";

export default function Providers(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    return (
        <Provider store={Store}>{children}</Provider>
    );
}