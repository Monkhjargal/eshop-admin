const test = {
  title: 'qwenjqwneqkw enqwejk',
  type: 'object',
  properties: {
    general: {
      type: 'object',
      label: 'Ерѳнхий мэдээлэл',
      required: ['university', 'department'],
      properties: {
        university: {
          type: 'string',
          classNames: 'col-lg-12',
          label: 'Сургууль',
          widget: 'select',
          options: [{
            _id: '5a01644c494401216cb1a3af',
            name: 'Хууль зүйн сургууль',
          }, {
            _id: '5a01644d494401216cb1a3b0',
            name: 'Хүмүүнлэгийн сургууль',
          }, {
            _id: '5a01644d494401216cb1a3b1',
            name: 'Эдийн засгийн бизнесийн ухааны сургууль',
          }],
        },
        department: {
          type: 'string',
          classNames: 'col-lg-12',
          label: 'Tenhim',
          parent: 'general.university',
          options: [{
            _id: '5a0177875cfc6428fae3b324',
            parent: "5a01644c494401216cb1a3af",
            name: "Бизнесийн эрх зүйн танхим",
          }, {
            _id: '5a0177875cfc6428fae3b327',
            parent: '5a01644d494401216cb1a3b0',
            name: 'Дорно дахины хэлний тэнхим',
          }],
        },
      },
    },
    personal: {
      type: 'object',
      label: 'Хувийн мэдээлэл',
      properties: {
        name: {
          type: 'string',
          label: 'name',
        },
      },
    },
    date: {
      type: 'string',
      label: 'Бүртгэсэн огноо',
    },
  },
};

const testui = {
  general: {
    university: {
      "ui:widget": "select",
    },
    department: {
      "ui:placeholder": "select",
      "ui:widget": "select",
    },
  },
};

const studentData = {
  _id: "5a199760f73db867211b9eb6",
  __v: 0,
  status: "5a17a3b26c4d931b4019b002",
  created: "2017-11-26T08:26:34.413Z",
  personal: {
    address: "БЗД, 8-р хороо, Харуул-Алтай, 108-9 тоот", before_join: "5a1552878fcad7340ab8567e", birth_country: "5a1552878fcad7340ab8567a", birth_year: 1991, city: "5a1552878fcad7340ab85682", country: "5a1552878fcad7340ab8567a", district: "5a15528c8fcad7340ab85687", email: "enxtur.mon@gmail.com", ethnicity: "5a1552878fcad7340ab8567b", gender: "male", join_year: 2017, mobile: 99585821, passport: "ЖЯ91022116", phone: 99585821, registration_number: "ЖЯ91022116", name: "Энхтөр", last_name: "Энхбат", family_name: "Арслант",
  },
  image: "/api/core/images/5a199760f73db867211b9eb5",
  access: true,
  code: "LAW17C11",
  general: {
    university: "5a1552878fcad7340ab85680", department: "5a1552c93bdc9e3413eaa47b", profession: "5a17cf665d40723cf72cd772", class_type: "5a1552878fcad7340ab85681", class: "5a1552878fcad7340ab85684", degree: "5a17ceb3ac46493ca3cf1946", group: "5a1552878fcad7340ab8567f",
  },
  id: "5a199760f73db867211b9eb6",
};

export { test, testui, studentData };


// const test = {
//   title: 'qwenjqwneqkw enqwejk',
//   type: 'object',
//   properties: {
//     general: {
//       type: 'object',
//       label: 'Ерѳнхий мэдээлэл',
//       required: ['university', 'department'],
//       properties: {
//         university: {
//           type: 'string',
//           classNames: 'col-lg-12',
//           label: 'Сургууль',
//           widget: 'select',
//           enum: ['', '5a01644c494401216cb1a3af', '5a01644d494401216cb1a3b0', '5a01644d494401216cb1a3b1'],
//           enumNames: ['Сонгох', 'Хууль зүйн сургууль', 'Хүмүүнлэгийн сургууль', 'Эдийн засгийн бизнесийн ухааны сургууль'],
//         },
//         department: {
//           type: 'string',
//           classNames: 'col-lg-12',
//           label: 'Tenhim',
//         },
//       },
//       dependencies: {
//         university: {
//           oneOf: [
//             {
//               properties: {
//                 university: {
//                   enum: ['5a01644c494401216cb1a3af'],
//                 },
//                 department: {
//                   enum: [1, 2, 3],
//                   enumNames: ['huuli zui dep1', 'huuli zui dep2', 'huuli zui dep3'],
//                 },
//               },
//               required: ['department'],
//             },
//             {
//               properties: {
//                 university: {
//                   enum: ['5a01644d494401216cb1a3b0'],
//                 },
//                 department: {
//                   enum: [4, 5, 6],
//                   enumNames: ['humuunleg1', 'humuunleg2', 'humuunleg3'],
//                 },
//               },
//               required: ['department'],
//             },
//             {
//               properties: {
//                 university: {
//                   enum: ['5a01644d494401216cb1a3b1'],
//                 },
//                 department: {
//                   enum: [7, 8],
//                   enumNames: ['ediin zasag', 'ediinz zasag 1'],
//                 },
//               },
//               required: ['department'],
//             },
//           ],
//         },
//       },
//     },
//     personal: {
//       type: 'object',
//       label: 'Хувийн мэдээлэл',
//       properties: {
//         name: {
//           type: 'string',
//           label: 'name',
//         },
//       },
//     },
//     date: {
//       type: 'string',
//       label: 'Бүртгэсэн огноо',
//     },
//   },
// };
