interface InputFieldProps {
  type?: "text" | "password" | "number" | "radio" | "checkbox"; 
  size?: "sm" | "md" | "lg" |"default";
  placeholder?: string;
  label?: string;
  errorMessage?: string | undefined | string[];
  error?: boolean | undefined | string | any;
  disabled?: boolean;
  required?:boolean;
}

export function InputField({ type = "text", size = "sm", placeholder,label,errorMessage,error,...rest }: InputFieldProps) {
  const sizeStyles = {
    sm: "p-[5px]",
    md: "p-[10px]",
    lg: "p-[15px]",
    default:'p-[0px]'
  };

  return (
    <div >
        {label &&
        <label className='dark:text-white'>{label}  {rest.required && (
            <span >
              <strong className='text-[red]'>*</strong>
            </span>
          )}</label>}
      <input type={type} placeholder={placeholder} className={`${sizeStyles[size]} bg-transparent rounded-md border-2 border-black w-[100%]  ${error&& "border-[red]"} dark:border-white dark:text-white`}/>
    </div>
  );
}

