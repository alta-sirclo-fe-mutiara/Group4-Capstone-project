import { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
  name?: string;
  description?: string;
  id_category?: string;
  initial_quantity?: string;
  photo?: any;
  is_maintenance?: boolean;
  id?: number;
}

export default function AddAssetModal(props: Props) {
  const initialName = props.name ? props.name : "";
  const initialDescription = props.description ? props.description : "";
  const initialCategory = props.id_category ? props.id_category : "1";
  const initialQuantity = props.initial_quantity ? props.initial_quantity : "";
  const initialPhoto = props.photo ? props.photo : "";
  const initialMaintenanceStatus = props.is_maintenance
    ? props.is_maintenance
    : false;
  const [name, setName] = useState<string>(initialName);
  const [description, setDescription] = useState<string>(initialDescription);
  const [id_category, setIDCategory] = useState<string>(initialCategory);
  const [initial_quantity, setQuantity] = useState<string>(initialQuantity);
  const [photo, setPhoto] = useState<any>(initialPhoto);
  const [previewPhoto, setPreviewPhoto] = useState<any>();
  const [is_maintenance, setIsMaintenance] = useState<boolean>(
    initialMaintenanceStatus
  );

  const addAssetHandle = () => {
    let formData = new FormData();
    formData.append("photo", photo, photo.name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("id_category", id_category);
    formData.append("initial_quantity", initial_quantity);
    formData.append("is_maintenance", is_maintenance.toString());
    axios
      .post(`/assets/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const UpdateAssetHandle = () => {
    let formData = new FormData();
    formData.append("photo", photo, photo.name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("id_category", id_category);
    formData.append("initial_quantity", initial_quantity);
    formData.append("is_maintenance", is_maintenance.toString());
    axios
      .post(`/assets/update/${props.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (props.name) {
    return (
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title className="primeCol">Detail Asset</Modal.Title>
          <i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
        </Modal.Header>
        <Modal.Body className="ModalForm">
          <div>
            <p>Gambar Aset</p>
            <div className="d-flex align-items-end">
              <img src={previewPhoto} className="previewphoto" />
              <input
                type="file"
                placeholder="photo"
                accept=".png, .jpg, .jpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const fileList = e.target.files;
                  if (!fileList) return;
                  setPhoto(fileList[0]);
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setPreviewPhoto(reader.result);
                  });
                  reader.readAsDataURL(fileList[0]);
                }}
              />
            </div>
          </div>
          <p>Nama Aset</p>
          <input
            type="text"
            className="w-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Deskripsi Aset</p>
          <input
            type="textarea"
            className="w-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Kategori Aset</p>
          <select
            className="form-select"
            name="category"
            aria-label="Default select example"
            onChange={(e) => setIDCategory(e.target.value)}
            value={id_category}
          >
            <option value="1">Laptop</option>
            <option value="2">Monitor</option>
            <option value="3">Earphone</option>
            <option value="4">Keyboard</option>
            <option value="5">Mouse</option>
            <option value="6">Speaker</option>
            <option value="7">Printer</option>
            <option value="8">Proyektor</option>
          </select>
          <p>Total Jumlah Aset</p>
          <input
            type="number"
            className="w-100"
            value={initial_quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="d-flex my-2">
            <div
              onClick={() => setIsMaintenance(!is_maintenance)}
              className={is_maintenance ? "toggleOn" : "toggleOff"}
            >
              <div className="toggleBtn"></div>
            </div>
            <p className="mt-0">Maintenance</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p onClick={props.closeModal} className="curs">
            Kembali
          </p>
          <p className="modalBtn curs" onClick={() => addAssetHandle()}>
            Tambahkan Aset
          </p>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title className="primeCol">Add Asset</Modal.Title>
          <i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
        </Modal.Header>
        <Modal.Body className="ModalForm">
          <div>
            <p>Gambar Aset</p>
            <div className="d-flex align-items-end">
              <img src={previewPhoto} className="previewphoto" />
              <input
                type="file"
                placeholder="photo"
                accept=".png, .jpg, .jpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const fileList = e.target.files;
                  if (!fileList) return;
                  setPhoto(fileList[0]);
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setPreviewPhoto(reader.result);
                  });
                  reader.readAsDataURL(fileList[0]);
                }}
              />
            </div>
          </div>
          <p>Nama Aset</p>
          <input
            type="text"
            className="w-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Deskripsi Aset</p>
          <input
            type="textarea"
            className="w-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Kategori Aset</p>
          <select
            className="form-select"
            name="category"
            aria-label="Default select example"
            onChange={(e) => setIDCategory(e.target.value)}
            value={id_category}
          >
            <option value="1">Laptop</option>
            <option value="2">Monitor</option>
            <option value="3">Earphone</option>
            <option value="4">Keyboard</option>
            <option value="5">Mouse</option>
            <option value="6">Speaker</option>
            <option value="7">Printer</option>
            <option value="8">Proyektor</option>
          </select>
          <p>Total Jumlah Aset</p>
          <input
            type="number"
            className="w-100"
            value={initial_quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="d-flex my-2">
            <div
              onClick={() => setIsMaintenance(!is_maintenance)}
              className={is_maintenance ? "toggleOn" : "toggleOff"}
            >
              <div className="toggleBtn"></div>
            </div>
            <p className="mt-0">Maintenance</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p onClick={props.closeModal} className="curs">
            Kembali
          </p>
          <p className="modalBtn curs" onClick={() => UpdateAssetHandle()}>
            Perbarui Aset
          </p>
        </Modal.Footer>
      </Modal>
    );
  }
}
