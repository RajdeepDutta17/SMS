import { Fragment, useEffect, useState } from "react";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";

const MarksTable = () => {
  const [data, setData] = useState(null);

  const getMarksData = async () => {
    const res = await apiCallFunction("GET", "marks", null, null);

    if (res?.status) {
      setData(res.data);
    } else {
      toast.warn(res.msg);
    }
  };

  useEffect(() => {
    getMarksData();
  }, []);

  return (
    <table className="table table-warning table-striped-columns table-hover text-center">
      <thead>
        <tr>
          <th scope="col">Student Id</th>
          <th scope="col">Student Name</th>
          <th scope="col">Teacher Name</th>
          <th scope="col">Subject</th>
          <th scope="col">Marks</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <Fragment key={i}>
            <tr>
              <th data-cell="Student Id" scope="row">
                {item?.studentId}
              </th>
              <td data-cell="Student Name">{item?.studentName}</td>
              <td data-cell="Teacher Name">{item?.teacherName}</td>
              <td data-cell="Subject">{item?.subject}</td>
              <td data-cell="Marks">{item?.marks}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MarksTable;
