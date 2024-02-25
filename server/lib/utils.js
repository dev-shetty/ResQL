import { customAlphabet } from "nanoid"

/**
 * @description Generate a random unique id
 * @param {number} length - Length of the nanoid
 * @param {string} prefix - Add prefix to the ID
 * @returns {string} Random Id of desired length and prefix
 */

function generate_nanoId(length, prefix) {
  const length_to_generate = length - prefix.length
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    length_to_generate
  )
  return `${prefix}${nanoid()}`
}

console.log(generate_nanoId(7, ""))
