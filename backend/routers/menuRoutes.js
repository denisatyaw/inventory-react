const express = require("express");
const { getAllMenus, createMenu, updateMenu, deleteMenu } = require("../controllers/menuController");

const router = express.Router();

router.get("/get-menu", getAllMenus);
router.post("/add-menus", createMenu);
router.put("/menus/:menu_id", updateMenu);
router.delete("/menus/:menu_id", deleteMenu);

module.exports = router;
