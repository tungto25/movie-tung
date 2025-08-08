// src/services/firebaseService.js
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../config/firebaseConfig";


// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
  try {
    // Thêm tài liệu vào bộ sưu tập
    const docRef = await addDoc(collection(db, collectionName), values);

    // Lấy tài liệu đã thêm (bao gồm ID của tài liệu)
    const addedDoc = await getDoc(doc(db, collectionName, docRef.id));

    // Trả về tài liệu đã thêm, bao gồm ID và các trường dữ liệu
    return { id: docRef.id, ...addedDoc.data() };

  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};


export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};
// Delete a document from a given collection and its associated image

export const deleteDocument = async (collectionName, docId, imgUrl) => {

  // Xóa tài liệu khỏi Firestore
  await deleteDoc(doc(collection(db, collectionName), docId));
};
// ✏️ Sửa
export const updateDocument = async (collectionName, values, imgUpload = null, oldImgUrl = null) => {
  let updatedValues = { ...values };
  if (imgUpload) {
    const imgRef = ref(storage, `images/${imgUpload.name}`);
    await uploadBytes(imgRef, imgUpload);
    const newImgUrl = await getDownloadURL(imgRef);
    updatedValues.image = newImgUrl;
    if (oldImgUrl) {
      const oldImgRef = ref(storage, oldImgUrl);
      await deleteObject(oldImgRef).catch(() => { });
    }
  }
  await updateDoc(doc(db, collectionName, values.id), updatedValues);
};

