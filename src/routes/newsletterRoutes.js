import { Router } from "express";
import { subscribe, unsubscribe ,getAllNewsLetter} from "../controllers/newsletterController.js";


const router = Router()


router.route("/subscribe").post(subscribe)
router.route("/unsubscribe").delete(unsubscribe)
router.route("/").get(getAllNewsLetter)



export default router