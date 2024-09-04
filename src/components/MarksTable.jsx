import { Fragment, useEffect, useState } from "react";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignId } from "../redux/slices/idSlice";

const MarksTable = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMarksData = async () => {
    const res = await apiCallFunction("GET", "marks", null, null);

    if (res?.status) {
      setData(res?.data);
      setFilterData(res?.data);
    } else {
      toast.warn(res.msg);
    }
  };
  const editMarks = async (value) => {
    dispatch(assignId(value._id));
    navigate("/marks/edit");
  };
  const deleteMarks = async (value) => {
    const res = await apiCallFunction(
      "DELETE",
      "marks/" + value._id,
      null,
      null
    );
    if (res?.status) {
      toast.success(res.msg);
    } else {
      toast.warn(res.msg);
    }

    getMarksData();
  };

  const handleSearch = () => {
    const searchData = data?.filter((item) => {
      return (
        item.studentInfo.name
          .toLowerCase()
          .includes(inputText?.toLowerCase()) ||
        item.teacherInfo.name
          .toLowerCase()
          .includes(inputText?.toLowerCase()) ||
        item.studentInfo.studentId
          .toLowerCase()
          .includes(inputText?.toLowerCase()) ||
        item.subject.toLowerCase().includes(inputText?.toLowerCase()) ||
        item.marks === Number(inputText)
      );
    });

    setFilterData(searchData);
  };

  const handleClick = () => {
    navigate("/marks/add");
  };

  useEffect(() => {
    getMarksData();
  }, [inputText]);

  return (
    <>
      <div className="inputBox">
        <input
          className="form-control"
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="Type to search...."
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="my-3">
        <button className="btn btn-primary" onClick={handleClick}>
          Add New Marks
        </button>
      </div>
      <table className="table table-warning table-striped-columns table-hover text-center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Teacher Name</th>
            <th scope="col">Subject</th>
            <th scope="col">Marks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterData?.map((item, i) => (
            <Fragment key={i}>
              <tr>
                <th data-cell="Student Id" scope="row">
                  {item?.studentId}
                </th>
                <td data-cell="Student Name">{item?.studentInfo.name}</td>
                <td data-cell="Teacher Name">{item?.teacherInfo.name}</td>
                <td data-cell="Subject">{item?.subject}</td>
                <td data-cell="Marks">{item?.marks}</td>
                <td data-cell="Action">
                  <div>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => editMarks(item)}
                    >
                      <i className="ri-pencil-line"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => deleteMarks(item)}
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
    </>
  );
};

export default MarksTable;
