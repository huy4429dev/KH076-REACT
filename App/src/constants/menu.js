import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart, Settings, Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Tổng quan', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Sản phẩm', icon: Box, type: 'sub', active: false, children: [

            { path: '/admin/products/category', title: 'Danh mục', type: 'link' },
            // { path: '/admin/products/physical/sub-category', title: 'Sub Category', type: 'link' },
            { path: '/admin/products/list', title: 'Sản phẩm', type: 'link' },
            { path: '/admin/products/detailt', title: 'Product Detail', type: 'link' },
            { path: '/admin/products/add', title: 'Add Product', type: 'link' },

            // {
            //     title: 'digital', type: 'sub', active: false, children: [
            //         { path: '/products/digital/digital-category', title: 'Category', type: 'link' },
            //         { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
            //         { path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
            //         { path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
            //     ]
            // },
        ]
    },
    {
        title: 'Khách hàng', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/admin/customer', title: 'Danh sách khách hàng', type: 'link' },
            { path: '/admin/customer/add', title: 'Create User', type: 'link' },
        ]
    },
    // {
    //     title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
    //         { path: '/sales/orders', title: 'Orders', type: 'link' },
    //         { path: '/sales/transactions', title: 'Transactions', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Coupons', icon: Tag, type: 'sub', active: false, children: [
    //         { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
    //         { path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Pages', icon: Clipboard, type: 'sub', active: false, children: [
    //         { path: '/pages/list-page', title: 'List Page', type: 'link' },
    //         { path: '/pages/create-page', title: 'Create Page', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
    // },
    // {
    //     title: 'Menus', icon: AlignLeft, type: 'sub', active: false, children: [
    //         { path: '/menus/list-menu', title: 'List Menu', type: 'link' },
    //         { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
    //     ]
    // },
    {
        title: 'Nhân viên', icon: Chrome, type: 'sub', active: false, children: [
            { path: '/admin/user', title: 'Danh sách nhân viên', type: 'link' },
            { path: '/admin/user/add', title: 'Create User', type: 'link' },
        ]
    },
    {
        title: 'Tin tức', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/admin/blog', title: 'Danh sách bài viết', type: 'link' },
            { path: '/admin/blog/add', title: 'Thêm bài viết', type: 'link' },
        ]
    },
    // {
    //     title: 'Vendors', icon: Users, type: 'sub', active: false, children: [
    //         { path: '/vendors/list_vendors', title: 'Vendor List', type: 'link' },
    //         { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Localization', icon: Chrome, type: 'sub', children: [
    //         { path: '/localization/transactions', title: 'Translations', type: 'link' },
    //         { path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
    //         { path: '/localization/taxes', title: 'Taxes', type: 'link' }
    //     ]
    // },
    // {
    //     title: 'Reports', path: '/reports/report', icon: BarChart, type: 'link', active: false
    // },
    {
        title: 'Thiết lập', icon: Settings, type: 'sub', children: [
            { path: '/admin/profile', title: 'Profile', type: 'link' },
        ]
    },
    // {
    //     title: 'Invoice', path: '/invoice', icon: Archive, type: 'link', active: false
    // },
    // {
    //     title: 'Login', path: '/auth/login', icon: LogIn, type: 'link', active: false
    // }
]
