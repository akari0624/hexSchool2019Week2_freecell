import { getAllCards } from '../index'
import { cleanup } from '@testing-library/react'

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
