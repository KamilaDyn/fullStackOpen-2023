interface FieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Field = ({ label, name, value, handleChange }: FieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input name={name} type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default Field;
