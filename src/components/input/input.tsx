
interface InputProps{
    type: string;
    placeholder?: string;
    name: string;
    value?: string | number | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Input({type, placeholder, name, value, onChange}:InputProps){

    return(
        <div>
            <input
                className="w-full border-2 rounded-md h-11 p-2 bg-gray-100" 
                type= {type}
                placeholder={placeholder}
                name={name}
                value={value ?? ''}
                onChange={onChange}
            />
        </div>
    )
}