import React from 'react';
import {
    Dropdown, Icon
} from 'semantic-ui-react';

export default function DepartmentDropDown({ handleOnDepartmentSearch, handleOnDepartmentChange, departments: data, selected, multiple = true }) {


    let allDepartments = []
    data.forEach(department => {

        allDepartments.push({
            key: department.id,
            text: department.departmentName,
            value: department.id
        })
    })
    return (
        <div>
            {allDepartments && <Dropdown
                placeholder='Select department'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnDepartmentChange}
                onSearchChange={handleOnDepartmentSearch}
                options={allDepartments}
                />}
        </div>

    )
}
