export type MajorSubject = {
  id: number;
  name: string;
};

export function majorSubjectFromJson(jsonData: any): MajorSubject {
  const data: MajorSubject = {
    id: jsonData.id,
    name: jsonData.name,
  };
  return data;
}
