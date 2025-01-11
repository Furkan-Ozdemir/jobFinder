import "./index.scss";

type Props = React.HTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  showLabel?: boolean;
  required?: boolean;
  name?: string;
};

export default function Select(props: Props) {
  const { label, options, defaultValue, showLabel, required, name, ...rest } =
    props;
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
      <select className={`select__select `} name={name || label} {...rest}>
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
