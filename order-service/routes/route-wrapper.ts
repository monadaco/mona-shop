import {NextFunction, Request, Response} from "express";

export const routeWrapper = (cb: (req: Request, res: Response) => Promise<void>) => {
  const errorHandled = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("something went wrong");
    }
  };
  return errorHandled;
};
