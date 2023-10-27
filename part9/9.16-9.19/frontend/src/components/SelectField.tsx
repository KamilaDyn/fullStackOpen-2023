interface SelectField {
  options: string[];
  label: string;
  value: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectField = ({
  options,
  label,
  value,
  handleChange,
  name,
}: SelectField) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={handleChange}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
