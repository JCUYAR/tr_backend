function normalizeTime(time: string): string {
  const parts = time.split(':');

  if (parts.length === 2) {
    return `${time}:00`; // agrega segundos
  }

  return time;
}

function calculateHours(start: string, end: string): number {

  const normalize = (time: string) => {
    const [h, m, s = "00"] = time.split(':');
    return [
      Number(h),
      Number(m),
      Number(s)
    ];
  };

  const [sh, sm, ss] = normalize(start);
  const [eh, em, es] = normalize(end);

  const startSeconds = sh * 3600 + sm * 60 + ss;
  const endSeconds = eh * 3600 + em * 60 + es;

  const diffSeconds = endSeconds - startSeconds;

  return Math.round((diffSeconds / 3600) * 100) / 100;
}


export {
  calculateHours
}