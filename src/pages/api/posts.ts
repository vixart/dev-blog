import { NextApiHandler } from "next";
import matter from 'gray-matter'
import fs from 'fs';
import path from "path";

export interface PostApi {
  title: string,
  meta: string,
  slug: string    
}

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET': {
      return res.json(readPostsInfo());
    }
    default:
      return res.status(404).send("Not Found")
  }
}

export const readPostsInfo = (): PostApi[] => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(dirPathToRead);
  return files.map(filename => {
    const filePathToRead: string = path.join(process.cwd(), `posts/${filename}`)
    const fileContent: string = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
    return matter(fileContent).data as PostApi
  })
}

export default handler;