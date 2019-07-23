import { getAllCards } from '../index'
import { cleanup } from '@testing-library/react'
import { isCanPut_BelowDecks } from '../index'
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
    expect(isCanPut_BelowDecks(0, 14)).toBe(true)
  })

  test('Squade 1 can not put under Club 2', () => {
    expect(isCanPut_BelowDecks(0, 27)).toBe(false)
  })

    test('Squade 1 can not put under Squade 2', () => {
    expect(isCanPut_BelowDecks(0, 1)).toBe(false)
  })

    test('Heart 2 can not put under Club 2', () => {
    expect(isCanPut_BelowDecks(14, 30)).toBe(false)
  })

      test('Heart 2 can put under Club 3', () => {
    expect(isCanPut_BelowDecks(14, 28)).toBe(true)
  })

     test('squade 10 can put under diamond 11', () => {
    expect(isCanPut_BelowDecks(9, 49)).toBe(true)
  })

   test('Diamond 11 can put under Club 12', () => {
    expect(isCanPut_BelowDecks(49, 37)).toBe(true)
  })

   test('club 6 can not put under heart 8', () => {
    expect(isCanPut_BelowDecks(31, 20)).toBe(false)
  })

  test('squade 9 can put under heart 10', () => {
    expect(isCanPut_BelowDecks(8, 22)).toBe(true)
  })

   test('diamond 1 can not put under heart 8', () => {
    expect(isCanPut_BelowDecks(39, 20)).toBe(false)
  })

})
