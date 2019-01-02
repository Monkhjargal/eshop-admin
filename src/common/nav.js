// nav data
import {
  BannerList,
  CategoryList,
  AttributeList,
  ProductList,
  BrandList,
  InfoList,
  CollectionList,
  EhowList,
  Home,
  GeneralInfoList,
  WidgetsList,
  MenuList,
  Language,
  StaticPage,
} from "../containers";

export const getNavData = [
  {
    name: 'Dashboard',
    icon: 'line-chart',
    path: 'dashboard',
    component: Home,
  },
  {
    name: 'Products',
    icon: 'switcher',
    path: 'products',
    children: [
      {
        name: 'Category',
        path: 'category',
        component: CategoryList,
      },
      {
        name: 'Attribute',
        path: 'attribute',
        component: AttributeList,
      },
      {
        name: 'List',
        path: 'list',
        component: ProductList,
      },
      {
        name: 'Brands',
        path: 'brands',
        component: BrandList,
      },
      {
        name: 'Info',
        path: 'info-transfer',
        component: InfoList,
      },
      {
        name: 'Collection',
        path: 'collection',
        component: CollectionList,
      },
      {
        name: 'E-How',
        path: 'e-how',
        component: EhowList,
      },
    ],
  }, {
    name: 'Settings',
    icon: 'setting',
    path: 'settings',
    children: [
      {
        name: 'General info',
        path: 'general-info',
        component: GeneralInfoList,
      },
      {
        name: 'Widgets',
        path: 'widgets',
        component: WidgetsList,
      },
      {
        name: 'Menus',
        path: 'menus',
        component: MenuList,
      },
      {
        name: 'Languages',
        path: 'languages',
        component: Language,
      },
      {
        name: 'Banner',
        path: 'banner',
        component: BannerList,
      },
      {
        name: 'Static pages',
        path: 'static-pages',
        component: StaticPage,
      },
    ],
  },
];
