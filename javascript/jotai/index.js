import { atom, useAtom } from './jotai'

const salaryAtom = atom(100_000)

function App () {
  const [salary, setSalary] = useAtom(salaryAtom)

  return <div></div>
}

export default App