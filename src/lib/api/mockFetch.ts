const MIN_DELAY = 300
const MAX_DELAY = 800
const ERROR_RATE = 0.2

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getRandomDelay() {
  return Math.floor(
    Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY,
  )
}

export async function mockFetch<T>(data: T): Promise<T> {
  await wait(getRandomDelay())

  if (Math.random() < ERROR_RATE) {
    throw new Error('Network error')
  }

  return data
}