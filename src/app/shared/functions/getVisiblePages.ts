export function getVisiblePages(
  totalPages: number,
  currentPage: number
): number[] {
  const visiblePages = 5;

  let startPage: number, endPage: number;

  if (totalPages <= visiblePages) {
    // Less than 5 total pages, show all
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      // Close to the beginning
      startPage = 1;
      endPage = visiblePages;
    } else if (currentPage + 2 >= totalPages) {
      // Close to the end
      startPage = totalPages - visiblePages + 1;
      endPage = totalPages;
    } else {
      // Somewhere in the middle
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
}
