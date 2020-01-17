import { WidgetDef } from "../widget";
import Button from "./button";
declare type Validator = (value: string) => string | undefined;
declare type StateValidator = (e: Event) => void;
export interface FormState {
    pending: boolean;
    error?: string;
    onSubmit?: (e: Event) => Promise<void>;
    submitButton: ReturnType<typeof Button>;
    validate: {
        [name: string]: StateValidator;
    };
    update: {
        [name: string]: StateValidator;
    };
    notification?: {
        title: string;
        message?: string;
    };
}
interface Fields {
    [field: string]: {
        decimals: number;
        label?: string;
    };
}
export default function createForm(params: {
    id: string;
    className?: string;
    fields: string[] | Fields;
    handler: (data?: FormData) => Promise<void>;
    validate?: {
        [name: string]: Validator;
    };
    notification?: {
        title: string;
        message?: string;
    };
}): {
    id: string;
    className: string | undefined;
    type: WidgetDef<FormState, {}>;
    element: string;
};
export {};
