// nav data
import {
  BannerList,
  CategoryList,
  Attribute,
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
  LabelList,
} from "../containers";

export const getNavData = [
  /* {
    name: 'Dashboard',
    icon: 'line-chart',
    path: 'dashboard',
    component: Home,
  }, */
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
        path: 'Attribute',
        component: Attribute,
      },
      {
        name: 'Барааны жагсаалт',
        path: 'list',
        component: ProductList,
      },
      {
        name: 'Брэнд',
        path: 'brands',
        component: BrandList,
      },
      {
        name: 'Info',
        path: 'info-transfer',
        component: InfoList,
      },
      {
        name: 'Багцын бараа',
        path: 'collection',
        component: CollectionList,
      },
      {
        name: 'Хоолны жор',
        path: 'e-how',
        component: EhowList,
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
        name: 'Нүүрний виджет',
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
      {
        name: 'Шошго',
        path: 'label',
        component: LabelList,
      },
      {
        name: 'Статик хуудас',
        path: 'static-pages',
        component: StaticPage,
      },
    ],
  },
];
