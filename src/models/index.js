import AuthModel from './AuthModel';
import CrudModel from './CrudModel';
import FormModel from './FormModel';
import FilterModel from './FilterModel';
import PromotionModel from './PromotionModel';
import ProductModel from './ProductModel';

const Auth = new AuthModel({
  model: 'auth',
});

const Form = new FormModel({
  url: '/api/core/form',
  model: 'form',
  initialState: {
    forms: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
});

const Filter = new FilterModel({
  url: '/mn/api/filter',
  model: 'filter',
  initialState: {
    filters: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
});

const Promotion = new PromotionModel({
  url: '/mn/api/promotioncategory',
  model: 'promotion',
});

const Product = new ProductModel({
  url: '/mn/api/productfilter/all',
  model: 'productfilter',
});

const Banner = new CrudModel({
  url: '/mn/api/banner',
  model: 'banner',
});

const Category = new CrudModel({
  url: '/mn/api/category',
  model: 'category',
});

const Attribute = new CrudModel({
  url: '/mn/api/attr',
  model: 'attribute',
});

const Productlist = new ProductModel({
  url: '/mn/api/product',
  model: 'productlist',
});

const Brandlist = new CrudModel({
  url: '/mn/api/brand',
  model: 'brandlist',
});

const Infolist = new CrudModel({
  model: 'infolist',
});

const CollectionList = new CrudModel({
  model: 'collectoinlist',
});

const EhowList = new CrudModel({
  model: 'ehowlist',
});

const General = new CrudModel({
  url: '/mn/api/generalinfo',
  model: 'general',
});

const Widgetslist = new CrudModel({
  url: '/mn/api/widget',
  model: 'widgetslist',
});

const Menulist = new CrudModel({
  url: '/mn/api/menu',
  model: 'menulist',
});

const Language = new CrudModel({
  url: '/api/language',
  model: 'language',
});

const Static = new CrudModel({
  url: '/mn/api/staticpage',
  model: 'static',
});

const LabelList = new CrudModel({
  url: '/mn/api/tag',
  model: 'labelList',
});

const Color = new CrudModel({
  url: '/mn/api/color',
  model: 'color',
});

const AttrValue = new CrudModel({
  url: '/mn/api/attrvalue',
  model: 'attrValue',
});

const Infotrans = new CrudModel({
  url: '/api/dataexchange',
  model: 'infotrans',
});

export {
  Auth,
  Filter,
  Form,
  Category,
  Banner,
  Attribute,
  Productlist,
  Brandlist,
  Infolist,
  CollectionList,
  EhowList,
  General,
  Widgetslist,
  Color,
  Menulist,
  Language,
  Static,
  LabelList,
  AttrValue,
  Promotion,
  Product,
  Infotrans,
};
