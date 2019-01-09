import AuthModel from './AuthModel';
import CrudModel from './CrudModel';
import FormModel from './FormModel';
import FilterModel from './FilterModel';
import EhowModel from './EhowModel';

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
  url: '/api/core/filter',
  model: 'filter',
  initialState: {
    filters: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
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
  model: 'attribute',
});

const Productlist = new CrudModel({
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

const GeneralInfoList = new CrudModel({
  model: 'generalinfolist',
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

const StaticPage = new CrudModel({
  model: 'staticpage',
});

const Ehow = new EhowModel({
  url: '/mn/api/ehow',
  model: 'ehow',
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
  GeneralInfoList,
  Widgetslist,
  Menulist,
  Language,
  StaticPage,
  Ehow,
};
