export function debounceSearchForm(
  fn: (data: { search: string }) => void,
  delay: number
): (data: { search: string }) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (data: { search: string }) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(data);
    }, delay);
  };
}
