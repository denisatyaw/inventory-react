const Menu = require("../models/Menu");

// Ambil Semua Menu dalam Format Tree
const getAllMenus = async (req, res) => {
    try {
        // Ambil semua menu yang aktif (is_active = true)
        const menus = await Menu.findAll({
            where: { is_active: true }, // Hanya ambil menu yang aktif
            raw: true
        });

        // Bangun menu tree dengan pengurutan yang benar
        const menuTree = buildMenuTree(menus);

        res.json({ success: true, data: menuTree });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Fungsi Membentuk Menu Tree dengan Pengurutan
const buildMenuTree = (menus, parentId = null) => {
    return menus
        .filter(menu => menu.parent_id === parentId) // Filter berdasarkan parent_id
        .sort((a, b) => {
            // Urutkan parent menu berdasarkan parent_order, jika null urutkan berdasarkan nama
            if (parentId === null) {
                return (a.parent_order ?? Infinity) - (b.parent_order ?? Infinity) || a.name.localeCompare(b.name);
            }
            // Urutkan submenu berdasarkan submenu_order, jika null urutkan berdasarkan nama
            return (a.submenu_order ?? Infinity) - (b.submenu_order ?? Infinity) || a.name.localeCompare(b.name);
        })
        .map(menu => ({
            ...menu,
            children: buildMenuTree(menus, menu.menu_id) // Ambil submenu
        }));
};

// Tambah Menu Baru
const createMenu = async (req, res) => {
    const { menu_id, name, parent_id, route, icon, created_by } = req.body;

    try {
        // Pastikan menu_id unik
        const existingMenu = await Menu.findByPk(menu_id);
        if (existingMenu) {
            return res.status(400).json({ success: false, message: "menu_id sudah digunakan!" });
        }

        const newMenu = await Menu.create({ menu_id, name, parent_id, route, icon, created_by });
        res.status(201).json({ success: true, message: "Menu created", data: newMenu });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Update Menu
const updateMenu = async (req, res) => {
    const { menu_id } = req.params;
    const { name, parent_id, route, icon, is_active, updated_by } = req.body;

    try {
        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        await menu.update({ name, parent_id, route, icon, is_active, updated_by });
        res.json({ success: true, message: "Menu updated", data: menu });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Hapus Menu
const deleteMenu = async (req, res) => {
    const { menu_id } = req.params;

    try {
        await Menu.destroy({ where: { menu_id } });
        res.json({ success: true, message: "Menu deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

module.exports = { getAllMenus, createMenu, updateMenu, deleteMenu };
