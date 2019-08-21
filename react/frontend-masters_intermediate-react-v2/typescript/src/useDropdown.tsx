import React, {
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react"

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, updateState] = useState(defaultState)
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`
  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={e => updateState(e.target.value)}
        onBlur={e => updateState(e.target.value)}
        disabled={!options.length}
      >
        <option />
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
  return [state, Dropdown, updateState] as [
    string,
    FunctionComponent,
    Dispatch<SetStateAction<string>>
  ]
}

export default useDropdown
