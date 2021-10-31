import joi from "joi";
import { createForm } from "@jmondi/form-validator";

export const createZombieSchema = createForm({
  zombieName: joi.string().required(),
});
