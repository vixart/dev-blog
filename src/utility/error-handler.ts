import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface Exception {
    message: string
    code: number
}

function isException(obj: any): obj is Exception {
    return 'message' in obj && 'code' in obj;
}

export const withErrorHandler = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            return handler(req, res);
        } catch (error) {
            let response = { message: 'Something went wrong' };
            let code = 400;
            if (isException(error)) {
                response = { message: error.message };
                code = error.code
            }
            return res.status(code).json(response);
        }
    }