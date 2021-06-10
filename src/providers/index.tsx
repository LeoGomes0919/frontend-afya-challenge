export function cpfMask(value: string) {
  value = value.replace(/[^\d]/g, '');

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function phoneMask(value: string) {
  value = value.replace(/[^\d]/g, '');
  if (value.length >= 11) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
}
