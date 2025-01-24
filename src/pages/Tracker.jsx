import React, { useState } from "react";
import { DatePicker, Select, Button, message, Card } from "antd";
import "antd/dist/reset.css"; // Ant Design styles

const { RangePicker } = DatePicker;

function Tracker() {
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showResults, setShowResults] = useState(false);

  const employees = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "Robert Brown",
    "Sarah Wilson",
    "David Martinez",
    "Emma Thompson",
  ]; // Dummy employee list

  const screenshots = ["Screenshot 1", "Screenshot 2", "Screenshot 3", "Screenshot 4", "Screenshot 5", "Screenshot 6", "Screenshot 7", "Screenshot 8"];

  const handleSearch = () => {
    if (selectedEmployee && selectedDates) {
      setShowResults(true);
      console.log(`Searching for ${selectedEmployee} from ${selectedDates[0]?.format("DD-MM-YYYY")} to ${selectedDates[1]?.format("DD-MM-YYYY")}`);
    } else {
      message.warning("🚨 Please select both an Employee and a Date Range before searching!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[500px] bg-white text-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">📊 Tracker Details</h1>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Employee Selector with Search */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 Select Employee</label>
          <Select
            showSearch
            placeholder="Search and select an Employee"
            optionFilterProp="label"
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            className="w-full"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {employees.map((employee, index) => (
              <Select.Option key={index} value={employee}>
                {employee}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Date Range Picker */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📅 Select Date Range</label>
          <RangePicker
            className="w-full"
            format="DD-MM-YYYY"
            onChange={(dates) => setSelectedDates(dates)}
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center">
          <Button type="primary" block onClick={handleSearch}>
            🔍 Search
          </Button>
        </div>
      </div>

      {/* Total Hours Burned Section */}
      {showResults && (
        <Card className="mb-6 text-center text-gray-800 font-semibold" bordered>
          ⏳ Total Hours Burned: <span className="text-blue-600">5 hours</span> {/* Replace with dynamic value */}
        </Card>
      )}

      {/* Screenshots Section */}
      {showResults ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">📸 Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <Card key={index}  className="text-center shadow-md h-[150px] hover:shadow-lg transition-all">
                {screenshot}
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          ℹ️ Select an **Employee & Date Range**, then click **Search** to view results.
        </p>
      )}
    </div>
  );
}

export default Tracker;
