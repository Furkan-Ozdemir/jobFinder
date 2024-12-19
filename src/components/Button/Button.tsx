import "./button.scss";

type Props = {
  color: "dark" | "transparent";
  children: React.ReactNode;
};

export default function Button(props: Props) {
  const { color, children } = props;
  return (
    <button type="button" className={`button button--${color}`}>
      {children}
    </button>
  );
}
