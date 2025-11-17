import { Router } from "express";
import { getAdminAnalytics } from "../controllers/adminAnalyticsController.js";


const router = Router();



router.route("/").get(getAdminAnalytics)


export default router