import { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } from "../controllers/authorController.js"


import { Router } from "express"


const router = Router();



router.route("/").post(createAuthor)
router.route("/getAllAuthors").get(getAllAuthors)
router.route("/:id").get(getAuthorById)
router.route("/:id").put(updateAuthor)
router.route("/:id").delete(deleteAuthor)


export default router;