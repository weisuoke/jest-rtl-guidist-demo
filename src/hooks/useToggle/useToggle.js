import { useState, useMemo } from 'react'

function useToggle(defaultValue, reverseValue) {
  const [state, setState] = useState(defaultValue)

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue)

    const toggle = value => {
      if (value !== undefined) {
        setState(value)
        return
      }

      setState(s => s === defaultValue ? reverseValueOrigin : defaultValue)
    }

    const setLeft = () => setState(defaultValue)

    const setRight = () => setState(reverseValueOrigin)

    return {
      toggle,
      setLeft,
      setRight
    }
  }, [defaultValue, reverseValue])

  return [state, actions]
}

export default useToggle