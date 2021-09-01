import React from "react";
import { Dropdown } from "semantic-ui-react";

export default function SubDepartmentDropDown({
  handleOnSubDepartmentSearch,
  handleOnSubDepartmentChange,
  subDepartments: data,
  selected,
  multiple = true,
}) {
  let allSubDepartments = [];
  data.forEach((subDepartment) => {
    allSubDepartments.push({
      key: subDepartment.id,
      text: subDepartment.subDepartmentName,
      value: subDepartment.id,
    });
  });
  return (
    <div>
      {allSubDepartments && (
        <Dropdown
          placeholder="Select department"
          fluid
          search
          clearable
          multiple={multiple}
          selection
          required
          defaultValue={selected}
          onChange={handleOnSubDepartmentChange}
          onSearchChange={handleOnSubDepartmentSearch}
          options={allSubDepartments}
        />
      )}
    </div>
  );
}
