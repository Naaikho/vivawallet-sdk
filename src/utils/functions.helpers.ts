export function querifyDatas(datas: Record<string, any>): string {
  return Object.keys(datas)
    .map((key) => {
      const k: keyof typeof datas = key as keyof typeof datas;
      return (
        key + '=' + encodeURIComponent(datas[k] as string | number | boolean)
      );
    })
    .join('&');
}

export function querifyDefinedDatas(datas: Record<string, any>): string {
  return querifyDatas(
    Object.fromEntries(
      Object.entries(datas).filter(
        ([, value]) => value !== undefined && value !== null
      )
    )
  );
}

export function withQuery(url: string, query: object): string {
  const queries = querifyDefinedDatas(query as Record<string, unknown>);
  return url + (queries ? '?' + queries : '');
}
