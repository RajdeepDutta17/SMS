import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assignId } from "../redux/slices/idSlice";

const TeacherTable = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTeacherData = async () => {
    const res = await apiCallFunction("GET", "teachers", null, null);

    if (res?.status) {
      setData(res.data);
    } else {
      toast.warn(res.msg);
    }
  };
  const editTeacher = async (value) => {
    dispatch(assignId(value._id));
    navigate("/teacher/edit");
  };
  const deleteTeacher = async (value) => {
    const res = await apiCallFunction(
      "DELETE",
      "teachers/" + value._id,
      null,
      null
    );
    if (res?.status) {
      toast.success(res.msg);
    } else {
      toast.warn(res.msg);
    }

    getTeacherData();
  };
  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <table className="table table-warning table-striped-columns table-hover text-center">
      <thead>
        <tr>
          <th scope="col">Teacher Id</th>
          <th scope="col">Name</th>
          <th scope="col">Subject</th>
          <th scope="col">Department</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <Fragment key={i}>
            <tr>
              <th data-cell="Teacher Id" scope="row">
                {item?.teacherId}
              </th>
              <td data-cell="Name">{item?.name}</td>
              <td data-cell="Subject">{item?.subject}</td>
              <td data-cell="Department">{item?.department}</td>

              <td data-cell="Action">
                <div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => editTeacher(item)}
                  >
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => deleteTeacher(item)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
