// import { firestore } from "./firebase";

// const col = firestore.collection("LiveTruckData");

// // const getLiveTruckData = async() => {
// //   const snapshot = await col.doc("PB30XXXX").get();
// //   console.log(snapshot.data());
// // };

// const getLiveTruckData = async () => {
//   col.onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         console.log(change.doc.data());
//         console.log("Document added successfully!");
//       }
//       if (change.type === "modified") {
//         console.log(change.doc.data());
//         col.doc("PB30XXXX").update({
//           Status: "doc is changed",
//         })
//         .then(() => {
//           console.log("Document successfully updated!");
//         })
//         .catch((error) => {
//           console.error("Error updating document: ", error);
//         });
//       }
//     });
//   });
// };

// export { getLiveTruckData };

// // col.onSnapshot((snapshot) => {
// //   snapshot.docChanges().forEach((change) => {
// //     if (change.type === "modified") {
// //       col.doc("PB30XXXX").update({
// //         Status: "doc is changed"
// //       }).then(() => {
// //         console.log("Document successfully updated!");
// //       }).catch((error) => {
// //         console.error("Error updating document: ", error);
// //       });
// //     }
// //   });
// // });
