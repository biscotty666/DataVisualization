export const Dropdown = ({options, id, selectedValue,selected, onSelectedValueChange}) => (
  <select value={selected} id={id} onChange={event => onSelectedValueChange(event.target.value)} >
    {options.map(({value, label}) => (
    <option key={value} value={value}>{label}</option>
    ))}
  </select>

)

