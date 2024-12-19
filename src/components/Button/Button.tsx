import "./index.scss";

type Props = {
  color: "dark" | "transparent";
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
};

export default function Button(props: Props) {
  const { color, children, type } = props;
  return (
    <button type={type} className={`button button--${color}`}>
      {children}
    </button>
  );
}
