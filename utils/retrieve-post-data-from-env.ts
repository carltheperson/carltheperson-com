export const retrievePostDataFromEnv = () => {
  return (process.env.posts as unknown) as {
    filename: string;
    fileContents: string;
  }[];
};
