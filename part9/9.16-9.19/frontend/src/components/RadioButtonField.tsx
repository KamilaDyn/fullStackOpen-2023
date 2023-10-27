interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  id: string;
  checked: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
const RadioButtonField = ({
  label,
  name,
  value,
  id,
  checked,
  handleChange,
}: RadioButtonProps) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="cloudy">{label}</label>
    </div>
  );
};

export default RadioButtonField;
