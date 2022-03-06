import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { CardAssetEmployee } from "../components/CardAsset";
import ImgDummy from "../assets/img/dummy-asset.png";

type item = {
  photo: string;
  category: string;
  name: string;
  avail_quantity: number;
  description: string;
  initial_quantity: number;
  id: number;
  is_maintenance: boolean;
  id_category: number;
};

const EmployeeAssets = () => {
  const [asset, setAsset] = useState<any>([]);
  const category = [
    { id: 1, name: "laptop" },
    { id: 2, name: "monitor" },
    { id: 3, name: "printer" },
    { id: 4, name: "proyektor" },
    { id: 5, name: "speaker" },
    { id: 6, name: "headset" },
    { id: 7, name: "keybord" },
    { id: 8, name: "mouse" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("/assets?&avail=yes")
      .then((res) => {
        const { data } = res;
        console.log(data);
        setAsset(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterCategory = async (id: number) => {
    await axios
      .get(`/assets?category=${id}&avail=yes`)
      .then((res) => {
        const { data } = res;
        setAsset(data.data.data);
        console.log(asset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row my-3 text-center heading">
        <h1>Daftar Aset</h1>
        <p className="sub">
          berikut merupakan daftar aset karyawan yang tersedia
        </p>
      </div>
      <div className="row justify-content-start filter my-5">
        <div className="col-10 col-lg-2 pr-0">
          <Form.Select
            className="text-capitalize btn-status text-wrap"
            aria-label="Default select example"
            onChange={(e: any) => filterCategory(e.target.value)}
          >
            <option>Filter Ketegori</option>
            {category.map((item: any, index: number) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-10 col-lg-2">
          <button className="btn btn-status" onClick={() => fetchData()}>
            All
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-center my-4">
        {asset ? (
          asset.map((item: item, index: number) => (
            <div className="col-10 col-md-6 col-lg-3" key={index}>
              <CardAssetEmployee
                name={item.name}
                photo={item.photo !== "" ? item.photo : `${ImgDummy}`}
                category={item.category}
                avail={item.avail_quantity}
                description={item.description}
                initial={item.initial_quantity}
                id={item.id}
                is_maintenance={item.is_maintenance}
                id_category={item.id_category}
              />
            </div>
          ))
        ) : (
          <> Asset Tidak Tersedia </>
        )}
      </div>
    </div>
  );
};

export default EmployeeAssets;
