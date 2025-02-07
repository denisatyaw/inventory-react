const express = require("express");
const { getAllMenus, createMenu, updateMenu, deleteMenu } = require("../controllers/menuController");

const router = express.Router();

router.get("/menus", getAllMenus);
router.post("/menus", createMenu);
router.put("/menus/:menu_id", updateMenu);
router.delete("/menus/:menu_id", deleteMenu);

module.exports = router;
