"use client"

interface ButtonPropType {
  variant: "primary" | "secondary" | "textButton";
  size: "sm" | "md" | "lg";
  buttonText: string;
  [key: string]: any;
}

const variantStyles = {
  primary:
    "bg-[#18181b] text-white rounded-md dark:text-[#18181b] dark:bg-[#FAFAFA] hover:bg-[#18181b]/80",
  secondary:
    "bg-transparent border-[1px] text-[#18181b] rounded-md dark:text-[#FAFAFA] dark:bg-transparent",
  textButton:
    "bg-transparent text-[#18181b] dark:text-[#FAFAFA] dark:bg-transparent",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-4 py-1 text-sm",
  lg: "px-6 py-2 text-base",
};
const Button = (props: ButtonPropType) => {
  return (
    <div
      className={`${variantStyles[props.variant]} ${
        sizeStyles[props.size]
      } cursor-pointer w-fit`}
      {...props}
    >
      {props.buttonText}
    </div>
  );
};

export default Button;
