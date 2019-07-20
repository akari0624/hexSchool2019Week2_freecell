import { getCards } from '../index'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

describe('can get correct card number array', () => {
  const cards = getCards(30)
  test('there has 52 cards', () => {
    expect(cards.length).toBe(52)
  })
})
