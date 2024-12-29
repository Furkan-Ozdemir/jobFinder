import "./index.scss";

type Props = {
  color: "dark" | "transparent";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ color, children, className, ...rest }: Props) {
  return (
    <button {...rest} className={`button button--${color} ${className || ""}`}>
      {children}
    </button>
  );
}
