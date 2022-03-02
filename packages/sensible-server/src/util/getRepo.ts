export const getRepo = (
  repository: { [key: string]: string | undefined } | string | undefined
) => (typeof repository === "object" ? repository.url : repository);
