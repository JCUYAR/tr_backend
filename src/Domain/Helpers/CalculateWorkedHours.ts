function calculateHours(start: string, end: string): number {
  const [sh, sm, ss] = start.split(':').map(Number);
  const [eh, em, es] = end.split(':').map(Number);

  const startSeconds = sh * 3600 + sm * 60 + ss;
  const endSeconds = eh * 3600 + em * 60 + es;

  const diffSeconds = endSeconds - startSeconds;

  return Math.round((diffSeconds / 3600) * 100) / 100;
}


export {
    calculateHours
}