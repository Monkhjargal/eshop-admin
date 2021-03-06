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
  ColorList,
  GeneralInfoList,
  WidgetsList,
  MenuList,
  Language,
  StaticPage,
  LabelList,
  AttrValue,
  Promotion,
  Infotrans,
  Product,
  OrderList,
  EmergencyOrder,
  RestDelivery,
} from "../containers";

export const getNavData = [
  {
    name: 'Захиалга',
    icon: 'ordered-list',
    path: 'order',
    children: [
      {
        name: 'Захиалгын жагсаалт',
        path: 'list',
        component: OrderList,
      },
      {
        name: 'Яаралтай шийдвэрлэх',
        path: 'emergency',
        component: EmergencyOrder,
      },
    ],
  },
  {
    name: 'Бараа',
    icon: 'appstore',
    path: 'products',
    children: [
      {
        name: 'Барааны жагсаалт',
        path: 'list',
        component: Product,
      },
      {
        name: 'Брэнд',
        path: 'brands',
        component: BrandList,
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
  },
  {
    name: 'Категори',
    icon: 'switcher',
    path: 'category',
    children: [
      {
        name: 'Аттрибутын утга',
        path: 'attr-value',
        component: AttrValue,
      },
      {
        name: 'Аттрибут мастер',
        path: 'attribute-master',
        component: Attribute,
      },
      {
        name: 'Үндсэн ангилал',
        path: 'main-category',
        component: CategoryList,
      },
      {
        name: 'Улирлын цэс',
        path: 'promotion',
        component: Promotion,
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
      // {
      //   name: 'Орчуулга',
      //   path: 'languages',
      //   component: Language,
      // },
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
      {
        name: 'Мэдээлэл солилцоо',
        path: 'info-transfer',
        component: Infotrans,
      },
      {
        name: 'Өнгө',
        path: 'color',
        component: ColorList,
      },
      {
        name: 'Хүргэлтгүй өдөр',
        path: 'restdelivery',
        component: RestDelivery,
      },
    ],
  },
  {
    name: 'Dashboard',
    icon: 'line-chart',
    path: 'dashboard',
    component: Home,
  // children: [],
  },
];
