// nav data
import {
  BannerList,
  CategoryList,
  AttributeList,
  ProductList,
  BrandList,
  InfoList,
  CollectionList,
  Recipe,
  Home,
  GeneralInfoList,
  WidgetsList,
  MenuList,
  Language,
  StaticPage,
} from "../containers";

export const getNavData = [
  // {
  //   name: 'Dashboard',
  //   icon: 'line-chart',
  //   path: 'dashboard',
  //   component: Home,
  // },
  {
    name: 'Бараа',
    icon: 'switcher',
    path: 'products',
    children: [
      {
        name: 'Категори',
        path: 'category',
        component: CategoryList,
      },
      {
        name: 'Аттрибут',
        path: 'attribute',
        component: AttributeList,
      },
      {
        name: 'Бренд',
        path: 'brands',
        component: BrandList,
      },
      {
        name: 'Барааны жагсаалт',
        path: 'list',
        component: ProductList,
      },
      {
        name: 'Багцын бараа',
        path: 'collection',
        component: CollectionList,
      },
      {
        name: 'Хоолны жор',
        path: 'recipe',
        component: Recipe,
      },
    ],
  }, {
    name: 'Тохиргоо',
    icon: 'setting',
    path: 'settings',
    children: [
      {
        name: 'Ерөнхий мэдээлэл',
        path: 'general-info',
        component: GeneralInfoList,
      },
      {
        name: 'Нүүр хуудасны виджет',
        path: 'widgets',
        component: WidgetsList,
      },
      {
        name: 'Цэс',
        path: 'menus',
        component: MenuList,
      },
      {
        name: 'Орчуулга',
        path: 'languages',
        component: Language,
      },
      {
        name: 'Баннер',
        path: 'banner',
        component: BannerList,
      },
      // {
      //   name: 'Статик хуудас',
      //   path: 'static-pages',
      //   component: StaticPage,
      // },
    ],
  },
];
