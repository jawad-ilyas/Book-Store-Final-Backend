import { Router } from "express";
import { subscribe, unsubscribe } from "../controllers/newsletterController.js";


const router = Router()


router.route("/subscribe").post(subscribe)
router.route("/unsubscribe").delete(unsubscribe)



export default router