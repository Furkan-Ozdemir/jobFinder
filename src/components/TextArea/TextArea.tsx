import "./index.scss";

type Props = React.HTMLProps<HTMLTextAreaElement> & {
  label: string;
};

export default function TextArea(props: Props) {
  const { name, label, required, ...restProps } = props;
  return (
    <div className="textarea">
      <label
        htmlFor={name}
        className={`textarea__label ${required && "required"}`}
      >
        {label}
      </label>
      <textarea
        className="textarea__field"
        placeholder="Enter your description..."
        {...restProps}
      ></textarea>
    </div>
  );
}
