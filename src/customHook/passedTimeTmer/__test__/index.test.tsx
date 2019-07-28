import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import * as jestDom from '@testing-library/jest-dom'
import { usePassedTimeTimer } from '../index'

expect.extend(jestDom)

afterEach(cleanup)
// jest.useFakeTimers()

const _sleep = (times) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      console.log('wake up')
      res()
    }, times)
  })

test('it can update the present passed time from `00:00` to `00:01` after one second', async () => {
  const expect1Str = '00:00'
  let passedTimeStr: string
  function MyComponent() {
    passedTimeStr = usePassedTimeTimer()
    console.log('passedTimeStr', passedTimeStr)
    return null
  }

  render(<MyComponent />)

  expect(passedTimeStr).toBe(expect1Str)
  await _sleep(1000)

  expect(passedTimeStr).toBe('00:01')
})
