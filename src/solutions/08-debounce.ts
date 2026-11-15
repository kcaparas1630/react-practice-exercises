// Reference solution for exercise 08. Open it only after your own attempt.

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  function debounced(...args: Args) {
    clearTimeout(timer); // cancel the pending call
    timer = setTimeout(() => fn(...args), waitMs); // schedule a new one
  }

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}
