import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors'; // Create custom error class

export const validate = (schema: any) => 
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
    next();
  };