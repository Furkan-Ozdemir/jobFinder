import "./index.scss";

type InputFieldProps = {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField(props: InputFieldProps) {
  const { label, required, ...rest } = props;
  return (
    <div className="input">
      <label
        className={`input__label ${required && "required"}`}
        htmlFor={rest.name}
      >
        {label}
      </label>
      <input className="input__field" {...rest} />
    </div>
  );
}
