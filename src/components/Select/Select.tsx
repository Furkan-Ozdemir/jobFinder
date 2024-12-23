import "./index.scss";

type SelectProps = {
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
};

export default function Select(props: SelectProps) {
  const { label, options, defaultValue } = props;
  return (
    <div className="select">
      <select className="select__select" name={label}>
        <option value="" selected>
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
