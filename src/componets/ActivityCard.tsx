interface Props {
  name: string;
  status: string;
  image: string;
  date: string;
  desc: string;
}

export default function ActivityCard(props: Props) {
  return (
    <div className="shadow bg-white rounded text-left m-3 scrChi d-flex flex-column justify-content-between">
      <div className="row p-3">
        <img src={props.image} className="col-5" />
        <div className="col-7">
          <p className="actDate noSpace">{props.date}</p>
          <p className="font-weight-bold noSpace">{props.name}</p>
          <p className="noSpace">{props.desc}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between px-3 pt-2 noSpace bGray">
        <p>{props.status}</p>
        <p>...</p>
      </div>
    </div>
  );
}
