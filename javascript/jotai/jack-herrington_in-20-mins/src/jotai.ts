import React from 'react'

interface Atom<AtomType> {
  get: () => AtomType
  set: (newValue: AtomType) => void
  subscribe: (callback: (newValue: AtomType) => void) => () => void
}

type AtomGetter<AtomType> = (
  get: <TargetAtom>(a: Atom<TargetAtom>) => TargetAtom
) => AtomType

function isFunction(thing: any): thing is Function {
  return thing instanceof Function
}

function isPromise<T>(thing: any): thing is Promise<T> {
  return thing && thing?.then instanceof Function
}

export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> {
  let value = isFunction(initialValue) ? (null as AtomType) : initialValue

  const subscribers = new Set<(newValue: AtomType) => void>()

  function get<TargetAtom>(atom: Atom<TargetAtom>) {
    let currentValue = atom.get()

    atom.subscribe(newValue => {
      if (currentValue === newValue) return

      currentValue = newValue
      computeValue()
      subscribers.forEach(callback => callback(value))
    })

    return currentValue
  }

  function computeValue() {
    const newValue = isFunction(initialValue) ? initialValue(get) : value

    if (isPromise<AtomType>(newValue)) {
      value = null as AtomType
      newValue.then(resolvedValue => {
        value = resolvedValue
        subscribers.forEach(subscriber => subscriber(value))
      })
    } else {
      value = newValue
    }
  }
  computeValue()

  return {
    get: () => value,
    set: newValue => {
      value = newValue

      subscribers.forEach(callback => callback(value))
    },
    subscribe: callback => {
      subscribers.add(callback)

      return () => {
        subscribers.delete(callback)
      }
    },
  }
}
export function useAtom<AtomType>(atom: Atom<AtomType>) {
  // these are to force the re-render in React
  // const [value, setValue] = React.useState(atom.get())

  // React.useEffect(() => {
  //   const unsubscribe = atom.subscribe(setValue)

  //   return () => unsubscribe()
  // }, [atom])
  // return [value, atom.set]

  // -------------------------
  // this replaces the above
  return [React.useSyncExternalStore(atom.subscribe, atom.get), atom.set]
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return React.useSyncExternalStore(atom.subscribe, atom.get)
}
