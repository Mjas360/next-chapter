
export const buildQueryString = (params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });

  return query.toString();
};

export const capitalizeString = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
