import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmpLogin from "../components/EmpLogin";

function Organization() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationPass, setOrganizationPass] = useState("");
  const [email, setEmail] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  // Handle View Click (Step 1 for Viewing Organization)
  const handleViewClick = () => {
    if (organizationName) {
      alert(`Viewing Organization: ${organizationName}`);
      navigate("/tracker");
    } else {
      alert("Please enter your organization name.");
    }
  };

  // Handle Create Organization Mode Activation
  const handleCreateOrganization = () => {
    setCreateMode(true);
    setStep(1);
  };

  // Handle Next Step
  const handleNextStep = () => {
    if (step === 1 && !organizationName) {
      alert("Please enter your organization name.");
    } else if (step === 2 && !email) {
      alert("Please enter your email.");
    } else if (step === 3 && !mailContent) {
      alert("Please enter the OTP.");
    } else {
      setStep(step + 1);
    }
  };

  // Handle Adding Employee
  const handleAddEmployee = () => {
    if (employeeName && employeeEmail) {
      setEmployees([
        ...employees,
        { name: employeeName, email: employeeEmail },
      ]);
      setEmployeeName("");
      setEmployeeEmail("");
    } else {
      alert("Please enter both employee name and email.");
    }
  };

  // Handle Done Button (Confirm Employee Addition)
  const handleDone = () => {
    setStep(5); // Finalize and move to the next step after employees are added
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-950  to-green-200  text-white flex items-center justify-center">
      <div className="bg-white relative tempo text-black p-8 rounded-lg w-[85%] h-[90vh] shadow-lg ">
        {/* <h2 className="absolute ml-[40%] text-center text-[40px] text-green-700">HireRocks</h2> */}
        {/* Step 1: Organization Input for Viewing */}
        {step === 1 && !createMode && (
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex w-[80%] h-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              {/* Left Section */}
              <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Enter Your Organization Name
                </h2>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Organization Name"
                />

                <input
                  type="password"
                  value={organizationPass}
                  onChange={(e) => setOrganizationPass(e.target.value)}
                  className="w-full p-3 mt-4 rounded-md border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Password"
                />
                <button
                  onClick={handleViewClick}
                  className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md mt-4 transition-all"
                >
                  View
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  New to HireRocks?{" "}
                  <button
                    onClick={handleCreateOrganization}
                    className="text-green-600 hover:underline"
                  >
                    Create Organization
                  </button>
                </p>
              </div>

              {/* Vertical Separator */}
              <div className="w-[2px] bg-gray-300"></div>

              {/* Right Section */}
              <div className="w-1/2 p-8 flex flex-col justify-center bg-gray-100">
                <EmpLogin />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Create Organization Flow */}
        {createMode && step === 1 && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-6 ">
              <label className="block text-4xl font-bold text-gray-700 text-center">
                Create Organization
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
                placeholder="Enter your Organization Name"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
                placeholder="Enter Your Email"
              />

              <input
                type="password"
                value={organizationPass}
                onChange={(e) => setOrganizationPass(e.target.value)}
                className="w-full p-3 mt-4 rounded-md border border-gray-300 text-gray-800 outline-none"
                placeholder="Enter Your Password"
              />
              <button
                onClick={handleNextStep}
                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enter Email */}
        {/* {createMode && step === 2 && (
          <div className="space-y-6 w-[350px]">
            <label className="block text-lg font-bold text-gray-700">
              Enter Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
              placeholder="Email Address"
            />
            <button
              onClick={handleNextStep}
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Next
            </button>
          </div>
        )} */}

        {/* Step 3: Enter OTP */}
        {createMode && step === 2 && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-6 w-[450px]">
              <label className="block text-lg font-bold text-gray-700">
                Enter the OTP sent to your email{" "}
                <span className="font-extrabold text-green-700">{email}</span>
              </label>
              <input
                type="text"
                value={mailContent}
                onChange={(e) => setMailContent(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-800"
                placeholder="OTP"
              />
              <button
                onClick={() => {
                  alert(
                    `Organization Created: ${organizationName}, Email: ${email}, OTP: ${mailContent}`
                  );
                  setStep(4); // Move to employee addition step after OTP submission
                }}
                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Add Employees */}
        {createMode && step === 4 && (
          <div className="space-y-6" style={{ width: "70vw", height: "70vh" }}>
            <label className="block text-lg font-bold text-gray-700">
              Add Employees to Your Organization
            </label>
            <div className="space-y-4">
              <div className="flex justify-between items-center w-full">
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-1/2 p-3 rounded-md border border-gray-300 text-gray-800 outline-none mr-2"
                  placeholder="Employee Name"
                />
                <input
                  type="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="w-1/2 p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
                  placeholder="Employee Email"
                />
                <button
                  onClick={handleAddEmployee}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 rounded-md ml-2"
                >
                  Add Employee
                </button>
              </div>

              {/* Employee List Section */}
              {employees.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-4">
                    Employees Added:
                  </h3>
                  <div className="space-y-4">
                    {employees.map((emp, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                      >
                        <div>
                          <p className="text-gray-800 font-medium">
                            {emp.name}
                          </p>
                          <p className="text-sm text-gray-600">{emp.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedEmployees = employees.filter(
                              (_, i) => i !== index
                            );
                            setEmployees(updatedEmployees);
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white p-2 w-12 h-12 rounded-full"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Done Button */}
            <button
              onClick={handleDone}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md mt-6"
            >
              Done
            </button>
          </div>
        )}

        {/* Step 5: Final Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Setup Complete!
            </h2>
            <p className="text-gray-600">
              Your organization is ready with employees added. You can now
              proceed to the dashboard or any other actions.
            </p>
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md mt-4"
              onClick={() => navigate("/tracker")}
            >
              Go To Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organization;
