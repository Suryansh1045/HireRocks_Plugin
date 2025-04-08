import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Select,
  Button,
  message,
  Card,
  Skeleton,
  Modal,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { RangePicker } = DatePicker;

function Tracker() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([
    { firstName: "John", lastName: "Doe", email: "johndoe@example.com" },
    { firstName: "Jane", lastName: "Smith", email: "janesmith@example.com" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");

  const screenshots = ["Screenshot 1", "Screenshot 2", "Screenshot 3"];

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/");
    }
  }, []);

  const handleSearch = () => {
    if (selectedEmployee && selectedDates) {
      setShowResults(true);
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    } else {
      messageApi.warning("🚨 Please select an Employee and a Date Range!");
    }
  };

  const handleAddEmployee = async () => {
    setLoading(true);

    if (!newEmployeeFirstName || !newEmployeeEmail || !newEmployeeLastName) {
      messageApi.error("Please enter both name and email!");
      return;
    }

    try {
      const data = {
        FirstName: newEmployeeFirstName,
        LastName: newEmployeeLastName,
        Email: newEmployeeEmail,
        IsRegisterationSuccessFull: false,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };

      const resposne = await axios.post("/api/Account/AddWorker", data, config);
      const empData = await resposne.data;
      if (empData.IsRegisterationSuccessFull) {
        messageApi.success("Employee added successfully!");
        setModalVisible(false);
        setNewEmployeeFirstName("");
        setNewEmployeeLastName("");
        setNewEmployeeEmail("");
        setEmployees([
          ...employees,
          {
            firstName: newEmployeeFirstName,
            lastName: newEmployeeLastName,
            email: newEmployeeEmail,
          },
        ]);
      }
    } catch (error) {
      messageApi.error("Error adding Employee!");
      console.error("Error adding employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="max-w-7xl mx-auto min-h-[500px] bg-white text-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          📊 Tracker Details
        </h1>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Employee Selector with Search */}
          <div className="flex flex-col">
            <label className="font-medium mb-2">👤 Select Employee</label>
            <div className="flex gap-2">
              <Select
                showSearch
                placeholder="Search and select an Employee"
                optionFilterProp="label"
                value={selectedEmployee}
                onChange={setSelectedEmployee}
                className="w-full"
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              >
                {employees.map((employee, index) => (
                  <Select.Option
                    key={index}
                    value={employee.email} // Store email as value
                    label={employee.name} // Use name for filtering
                  >
                    {employee.name} ({employee.email}) {/* Display both */}
                  </Select.Option>
                ))}
              </Select>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              />
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col">
            <label className="font-medium mb-2">📅 Select Date Range</label>
            <RangePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={setSelectedDates}
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button type="primary" block onClick={handleSearch}>
              🔍 Search
            </Button>
          </div>
        </div>

        {/* Employee Modal */}
        <Modal
          title="Add Employee"
          open={modalVisible}
          onOk={handleAddEmployee}
          onCancel={() => setModalVisible(false)}
          confirmLoading={loading}
        >
          <Input
            placeholder="Employee First Name"
            className="mb-3"
            value={newEmployeeFirstName}
            onChange={(e) => setNewEmployeeFirstName(e.target.value)}
          />
          <Input
            placeholder="Employee Last Name"
            className="mb-3"
            value={newEmployeeLastName}
            onChange={(e) => setNewEmployeeLastName(e.target.value)}
          />
          <Input
            placeholder="Employee Email"
            value={newEmployeeEmail}
            onChange={(e) => setNewEmployeeEmail(e.target.value)}
          />
        </Modal>

        {/* Results Section */}
        {showResults && (
          <>
            <Card className="mb-6 text-center font-semibold" bordered>
              ⏳ Total Hours Burned:{" "}
              <span className="text-blue-600">5 hours</span>
            </Card>
            <h2 className="text-2xl font-semibold mb-4">📸 Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading
                ? screenshots.map((_, index) => (
                    <Skeleton.Image
                      key={index}
                      active
                      className="h-[150px] w-full"
                    />
                  ))
                : screenshots.map((screenshot, index) => (
                    <Card
                      key={index}
                      className="text-center shadow-md h-[150px]"
                    >
                      {screenshot}
                    </Card>
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tracker;
