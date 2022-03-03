import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AddAssetModal from "./Modal/AddAssetModal";
import UsageHistoryModal from "./Modal/UsageHistoryModal";
import RequestAssetModal from "./Modal/RequestAssetModal";

type Props = {
  photo: string;
  category: string;
  avail: number;
  name: string;
  description: string;
  id: number;
};

const CardAsset = (props: Props) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  return (
    <div className="card card-asset mb-3">
      <div className="card-body">
        <div className="row mt-3">
          <img
            src={require(`../assets/img/` + `${props.photo}` + `.png`)}
            alt=""
            className="rounded-3 img-asset"
          />
        </div>
        <div className="row mt-3 asset-info justify-content-between">
          <div className="col-6">{props.category}</div>
          <div className="col-6 text-end">{props.avail} item tersedia</div>
        </div>
        <div className="row mt-3 asset-content">
          <h5 className="card-title"> {props.name} </h5>
          <p className="card-text">
            {props.description.length > 20
              ? `${props.description.substring(0, 20)} ...`
              : props.description}
          </p>
        </div>
        <div className="row pinjam justify-content-center mt-3">
          <button
            className="btn col-10 col-xl-11 btn-aset"
            onClick={() => setIsRequestOpen(true)}
          >
            Ajukan Peminjaman
          </button>
        </div>
      </div>
      <RequestAssetModal
        show={isRequestOpen}
        closeModal={() => setIsRequestOpen(false)}
      />
    </div>
  );
};

const CardAssetAdmin = (props: Props) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  return (
    <div className="card card-asset admin mb-3">
      <div className="card-body">
        <div className="row mt-3">
          <img
            src={require(`../assets/img/` + `${props.photo}` + `.png`)}
            alt=""
            className="rounded-3 img-asset"
          />
        </div>
        <div className="row mt-3 asset-info justify-content-between">
          <div className="col-6">{props.category}</div>
          <div className="col-6 text-end">{props.avail} item tersedia</div>
        </div>
        <div className="row mt-3 asset-content">
          <h5 className="card-title mb-0"> {props.name} </h5>
          <p className="card-text">
            {props.description.length > 20
              ? `${props.description.substring(0, 20)} ...`
              : props.description}
          </p>
        </div>
        <div className="row mt-2 d-flex justify-content-start aset-user">
          <div className="col-2 text-center px-0">
            <FaUserCircle className="ico-user w-100" />
          </div>
          <div className="col-10" onClick={() => setIsUsageOpen(true)}>
            <p className="count-user px-0 curs">3 pengguna</p>
          </div>
        </div>
        <div className="row pinjam justify-content-center mt-2">
          <button
            className="btn col-10 col-xl-11 btn-aset"
            onClick={() => setIsDetailOpen(true)}
          >
            Lihat Detail
          </button>
        </div>
      </div>
      {/*MODAL*/}
      <AddAssetModal
        show={isDetailOpen}
        closeModal={() => setIsDetailOpen(false)}
        name={props.name}
        description={props.description}
        id_category={props.category}
        initial_quantity={props.avail.toString()}
        is_maintenance={false}
        id={props.id}
      />
      <UsageHistoryModal
        show={isUsageOpen}
        closeModal={() => setIsUsageOpen(false)}
        id={props.id}
      />
    </div>
  );
};

export { CardAsset, CardAssetAdmin };