import CustomException from "@/exceptions/CustomException";
import { withErrorHandler } from "@/utility/error-handler";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  throw new CustomException()
}

export default withErrorHandler(handler);