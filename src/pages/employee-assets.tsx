import { useState, useEffect } from "react";
import { CardAsset } from "../componets/CardAsset";
import axios from "axios";
// import { Link } from "react-router-dom";

const EmployeeAssets = () => {
  const [category, setCategory] = useState([
    { id: 1, name: "laptop" },
    { id: 2, name: "monitor" },
    { id: 3, name: "printer" },
    { id: 4, name: "proyektor" },
    { id: 5, name: "speaker" },
    { id: 6, name: "headset" },
    { id: 7, name: "keybord" },
    { id: 8, name: "mouse" },
  ]);

  const [asset, setAsset] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/assets`)
      .then((res) => {
        if (!res.data.data.data) {
          setAsset([]);
        } else {
          setAsset(res.data.data.data);
        }
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
        <div className="col-10 col-lg-2" id="accordionExample">
          <div className="dropdown">
            <div
              className="btn btn-status dropdown-toggle "
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter Ketegori
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {category.map((item) => {
                return (
                  <li key={item.id}>
                    <button className="dropdown-item text-capitalize">
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center my-4">
        {asset?.map((item: any, index) => {
          return (
            <div className="col-10 col-md-6 col-lg-3" key={index}>
              <CardAsset
                photo={item.photo}
                category={item.category}
                avail={item.avail_quantity}
                name={item.name}
                description={item.description}
                id={item.id}
                initial={item.initial_quantity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeAssets;
