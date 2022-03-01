import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
}
//Mapping Category
export default function RequestAssetModal(props: Props) {
  const [category, setCategory] = useState<string>("laptop");
  const [asset, setAsset] = useState<string>("1");
  const [assetData, setAssetData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [description, setDescription] = useState("")
  
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/assets`)
      .then((res) => {
        setAssetData(res.data.data.data);
        console.log(assetData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCategoryData = () => {
    axios
      .get(`/assets/categories`)
      .then((res) => {
        setCategoryData(res.data.data)
        console.log(categoryData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(category, asset)
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title className="primeCol">Peminjaman Aset</Modal.Title>
        <i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
      </Modal.Header>
      <Modal.Body className="ModalForm">
      <p>Kategori Aset</p>
        <select
          className="form-select"
          name="category"
          aria-label="Default select example"
          onChange={(e) => setCategory(e.target.value)}
        >
              {categoryData?.map((item: any) => {
            return (
              <option value={item.description}>
                {item.description}
              </option>
            );
          })}
            );
        </select>
        <p>Nama Aset</p>
        <select
          className="form-select"
          name="category"
          aria-label="Default select example"
          onChange={(e) => setAsset(e.target.value)}
        >
          {assetData?.map((item: any) => {
            if(item.category===category){
            return (
              <option value={item.id}>
                {item.name}-{item.category}
              </option>
            )}
          })}
        </select>
        <p>Deskripsi Aset</p>
        <textarea
          className="w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <p onClick={props.closeModal} className="curs">
          Kembali
        </p>
        <p className="modalBtn curs">Assign Ke Karyawan</p>
      </Modal.Footer>
    </Modal>
  );
}
