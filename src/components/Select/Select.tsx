import "./index.scss";

type Props = {
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  showLabel?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: Props) {
  const {
    label,
    options,
    defaultValue,
    showLabel,
    required,
    name,
    value,
    ...rest
  } = props;
  return (
    <div className="select">
      {showLabel && (
        <label
          htmlFor={label}
          className={`select__label ${required && "required"}`}
        >
          {label}
        </label>
      )}
      <select
        className={`select__select `}
        name={name || label}
        value={value}
        {...rest}
      >
        <option value="" defaultChecked>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
