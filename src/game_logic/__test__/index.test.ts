import { getAllCards } from '../index'
import { cleanup } from '@testing-library/react'
import { isCanPut } from '../index'
afterEach(cleanup)

describe('can get correct card number array', () => {
  const cards = getAllCards(30)
  test('there has 52 cards', () => {
    expect(cards.length).toBe(52)
  })

  test('the number is start from 0, not 1', () => {
    expect(cards.includes(0)).toBe(true)
    expect(cards.includes(1)).toBe(true)
    expect(cards.includes(51)).toBe(true)
    expect(cards.includes(52)).toBe(false)
  })
})

describe('test is can put logic', () => {

  test('Squade 1 can put under heart 2', () => {
    expect(isCanPut(0, 14)).toBe(true)
  })

  test('Squade 1 can not put under Club 2', () => {
    expect(isCanPut(0, 27)).toBe(false)
  })

    test('Squade 1 can not put under Squade 2', () => {
    expect(isCanPut(0, 1)).toBe(false)
  })

    test('Heart 2 can not put under Club 2', () => {
    expect(isCanPut(14, 30)).toBe(false)
  })

      test('Heart 2 can  put under Club 3', () => {
    expect(isCanPut(14, 28)).toBe(true)
  })

})
