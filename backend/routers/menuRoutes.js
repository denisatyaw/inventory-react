const express = require("express");
const { getAllMenus, createMenu, updateMenu, deleteMenu, getAllMenuRows, getParentMenu, updateMenuById, upsertMenu } = require("../controllers/menuController");
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get("/get-menu", getAllMenus);
router.post("/add-menus", authenticateToken, authorizeRoles('Admin'), createMenu);

router.put("/menus/:menu_id", updateMenu);
router.delete("/menus/:menu_id", deleteMenu);

router.get("/get-all-menu-rows", getAllMenuRows);
router.get("/get-parent-menu", getParentMenu);

router.put("/update-menu/:menu_id", authenticateToken, authorizeRoles('Admin'), updateMenuById);

router.post("/upsert-menu", authenticateToken, authorizeRoles('Admin'), upsertMenu);

module.exports = router;
