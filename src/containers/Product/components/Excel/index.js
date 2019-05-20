// import React from "react";
// import { Button } from "antd";
// import kendo from '@progress/kendo-ui';
// import PropTypes from 'prop-types';

// class Component extends React.Component {
//   onClickExcel = () => { this.xlsxDownload(); }

//     // JSON data болон title ийг excel рүү хувиргах function
//     xlsxDownload = () => {
//       const { data, headers, filename } = this.props;
//       // Title-ийг бэлтгэх хэсэг
//       let mainTitle = [];

//       headers.map((element) => {
//         mainTitle.push({
//           value: element.Header,
//           vAlign: "center",
//           hAlign: "center",
//           bold: true,
//           data: element.dataIndex,
//           background: "#D3D3D3",
//         });
//         return null;
//       });
//       //   console.log(mainTitle);


//       let DataSource = new kendo.data.DataSource({
//         type: "",
//         transport: {
//           read: data,
//           dataType: "",
//         },
//       });
//       console.log(DataSource);

//       // ExportTitle = MainTitle
//       let rows = [
//         { cells: mainTitle },
//       ];

//       // Хүснэгтийн гарчигийн өргөн нь auto
//       let columsWidth = [];
//       headers.map(() => columsWidth.push({ autoWidth: true }));

//       DataSource.fetch(() => {
//         // data-г excel рүү оруулахад шаардлагтай format-д хөрвүүлж байгаа ба [cells: [{mainTitle}], cells: [{subTitle}], cells: [{data}]]
//         data.map((i) => {
//           let rowData = [];

//           mainTitle.map((element) => {
//             if (element.data !== undefined) {
//               rowData.push({ value: i[element.data] });
//             }
//             return null;
//           });
//           return rows.push({
//             cells: rowData,
//           });
//         });

//         // Excel-ийн workbook үүсгэж буй хэсэг
//         let workbook = new kendo.ooxml.Workbook({
//           sheets: [
//             {
//               columns: columsWidth,
//               title: filename,
//               rows,
//             },
//           ],
//         });

//         // .xlsx file-ийг татаж буй хэсэг
//         kendo.saveAs({
//           dataURI: workbook.toDataURL(),
//           fileName: `${filename}.xlsx`,
//         });
//       });
//     }
//     render() {
//       return <Button type="primary" icon="file-excel" onClick={this.onClickExcel} style={{ float: 'left' }} />;
//     }
// }

// Component.defaultProps = {
//   data: [],
//   headers: [],
//   filename: 'EmartOnline',
// };

// Component.propTypes = {
//   data: PropTypes.array,
//   headers: PropTypes.array,
//   filename: PropTypes.string,
// };

// export default Component;
