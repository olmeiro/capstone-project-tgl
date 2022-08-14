import { act, renderHook } from '@testing-library/react'
import { useForm } from '../../src/hooks/useForm'

describe('test on useForm', () => {
  const initialForm = {
    alias: 'John',
    password: 'John2021*'
  }

  test('should return default values', () => {
    const { result } = renderHook(() => useForm(initialForm))
    // console.log(result.current)
    expect(result.current).toEqual(
      {
        alias: initialForm.alias,
        password: initialForm.password,
        formState: initialForm,
        onInputChange: expect.any(Function),
        onResetForm: expect.any(Function),
        isFormValid: true
      }
    )
  })

  test('should change form name', () => {
    const newValue = 'Smith'
    const { result } = renderHook(() => useForm(initialForm))
    // console.log(result.current);
    const { onInputChange } = result.current

    act(() => {
      onInputChange({ target: { name: 'alias', value: newValue } })
    })
    // console.log(result.current.name);

    expect(result.current.alias).toBe(newValue)
    expect(result.current.formState.alias).toBe(newValue)
  })

  test('should reset form', () => {
    const newValue = 'Smith'
    const { result } = renderHook(() => useForm(initialForm))
    // console.log(result.current.name)
    const { onInputChange, onResetForm } = result.current

    act(() => {
      onInputChange({ target: { name: 'alias', value: newValue } })
      onResetForm()
    })

    expect(result.current.alias).toEqual(initialForm.alias)
    expect(result.current.formState.alias).toEqual(initialForm.alias)
  })
})
